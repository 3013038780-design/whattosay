import {defaults,normalize,select,ending,shareQuery,restore,sourceFor,sceneOptions,parseQuery} from './engine';
import {calendar,calendarLine} from './calendar';
import type {Choice,Toast} from './types';
export interface Storage {get():string[];set(value:string[]):void}
export class Session {
 choice=defaults(); toast!:Toast; seen:string[]=[]; notice=''; big=false; details=false; about=false; tab:'home'|'saved'='home'; saved:string[]=[];
 constructor(private storage:Storage,query:Record<string,string>={}){
  try{const raw=storage.get();this.saved=Array.isArray(raw)?raw.filter(x=>typeof x==='string'&&x.length<1024).slice(0,100):[];}catch{this.notice='暂时无法读取收藏；仍可正常找词。';}
  const shared=restore(query);this.choice=shared.choice;if(query.id&&shared.toast){this.choice=shared.choice;this.toast=shared.toast;this.seen.push(this.toast.id);this.notice='朋友分享的这一句，已为你留住。';}else {if(query.id)this.notice='这条分享暂时无法恢复，先为你准备一句新的。';this.pick(false);}
 }
 pick(announce=true){const result=select(this.choice,this.seen);this.toast=result.toast;if(result.exhausted)this.seen=[];this.seen.push(this.toast.id);this.details=false;if(announce)this.notice=result.relaxed?(this.choice.tone==='verse'?'这个场景的诗词素材还在核对，先为你准备一条有文采的表达。':'这个场景暂以雅致表达为主，已为你选好合适的一句。'):result.exhausted?'这一组已看完，重新从中挑一句。':'';}
 change(patch:Partial<Choice>){const previous=this.choice;this.choice=normalize({...this.choice,...patch});if(previous.scene!==this.choice.scene||previous.target!==this.choice.target||previous.tone!==this.choice.tone||(this.toast.seasons&&!this.toast.seasons.includes(calendar(this.choice.date).season))){this.pick();}else this.notice="";}
 query(){return shareQuery(this.toast,this.choice);}
 toggleSave(){const query=this.query(),next=this.saved.includes(query)?this.saved.filter(q=>q!==query):[query,...this.saved].slice(0,100);try{this.storage.set(next);this.saved=next;this.notice=next.includes(query)?'已收进我的小笺。':'已取消收藏。';}catch{this.notice='收藏未能保存，请稍后重试。';}}
 openSaved(query:string){const params=parseQuery(query);const result=restore(params);if(!result.toast){this.notice='这条收藏版本暂不可用，可删除后重新收藏。';return;}this.choice=result.choice;this.toast=result.toast;this.tab='home';this.details=false;this.notice='已打开收藏的原句。';}
 removeSaved(query:string){try{const next=this.saved.filter(q=>q!==query);this.storage.set(next);this.saved=next;this.notice='已移除这条收藏。';}catch{this.notice='移除失败，请稍后重试。';}}
 view(){const c=calendar(this.choice.date),source=sourceFor(this.toast),text=ending(this.toast,this.choice);return {choice:this.choice,sceneOptions,toast:this.toast,source,text,kind:this.choice.tone==='english'?'英文独立整理':this.toast.kind,translation:[calendarLine(this.choice),this.toast.translation,this.choice.tea?'以茶在杯，祝福在心。':'举杯致意。'].filter(Boolean).join(' '),lines:text.split('\n'),calendar:c,big:this.big,details:this.details,about:this.about,tab:this.tab,notice:this.notice,isSaved:this.saved.includes(this.query()),favorites:this.saved.map(query=>{try{const p=parseQuery(query);const r=restore(p);return {query,title:r.toast?.title||'旧版本小笺',excerpt:r.toast?ending(r.toast,r.choice):'内容暂不可用，可移除后重新收藏。',scene:sceneOptions.find(s=>s.id===r.choice.scene)?.name||'',valid:!!r.toast};}catch{return {query,title:'旧版本小笺',excerpt:'内容暂不可用，可移除。',scene:'',valid:false};}})};}
}
