import type {Choice,Selection,Toast,Scene,Target,Tone,Length,Topic} from './types';
import {toasts} from '../data/toasts';
import {sources} from '../data/sources';
import {calendar,calendarLine,calendarEnglishLine,today,validDate} from './calendar';
export const sceneOptions = [{id:'general',name:'临场救急',hint:'突然轮到我'}, {id:'work',name:'领导同事',hint:'有敬意，有分寸'}, {id:'friends',name:'朋友小聚',hint:'熟人，自在聊'}, {id:'meeting',name:'认识新朋友',hint:'轻松破个冰'}, {id:'dating',name:'相亲约会',hint:'初见，慢慢了解'}, {id:'family',name:'家人长辈',hint:'家常里见心意'}, {id:'host',name:'我是主人',hint:'欢迎大家来'}, {id:'farewell',name:'送别珍重',hint:'愿前路顺遂'}, {id:'thanks',name:'致谢答谢',hint:'感谢用心与款待'}, {id:'reply',name:'别人敬我',hint:'接住祝福，回敬心意'}, {id:'closing',name:'收个尾',hint:'把话漂亮地收住'}] as const;
export const topicOptions=[{id:'any',name:'随席取意'},{id:'night',name:'夜晚小酌'},{id:'moon',name:'月色入杯'},{id:'wine',name:'邀饮待客'},{id:'friend',name:'好友知己'},{id:'reunion',name:'团圆相聚'}] as const;
export const defaults = ():Choice=>({scene:'general',target:'table',tone:'verse',length:'short',tea:false,calendarMode:'none',date:today(),topic:'any'});
export function normalize(raw:Partial<Choice>):Choice {const d=defaults();const choice:Choice={...d,scene:sceneOptions.some(s=>s.id===raw.scene)?raw.scene!:d.scene,target:raw.scene==='work'&&raw.target==='leader'?'leader':raw.scene==='family'&&raw.target==='elder'?'elder':raw.scene==='thanks'&&raw.target==='host'?'host':'table',tone:['auto','poetic','verse','fun','english'].includes(raw.tone||'')?raw.tone!:d.tone,length:raw.length==='full'?'full':raw.length==='short'?'short':d.length,tea:raw.tea===true,date:raw.date&&validDate(raw.date)?raw.date:d.date,calendarMode:['none','day','season','term','festival'].includes(raw.calendarMode||'')?raw.calendarMode!:d.calendarMode,topic:topicOptions.some(t=>t.id===raw.topic)?raw.topic!:d.topic};if(choice.calendarMode==='festival'&&!calendar(choice.date).festivalId)choice.calendarMode='none';return choice;}
export function select(choice:Choice,seen:string[],rng=Math.random):Selection {
 const cal=calendar(choice.date),season=cal.season;
 let pool=toasts.filter(t=>t.active!==false&&t.scene===choice.scene&&t.target===choice.target&&(!t.seasons||t.seasons.includes(season))&&(!t.festivals||!!cal.festivalId&&t.festivals.includes(cal.festivalId)));
 const themed=choice.topic==='any'?pool:pool.filter(t=>t.topics?.includes(choice.topic));
 const topicRelaxed=choice.topic!=='any'&&!themed.length;if(themed.length)pool=themed;
 const preferred=pool.filter(t=>choice.tone==='auto'||choice.tone==='english'||(choice.tone==='verse'?t.kind==='引句后整理':t.tone===choice.tone&&(choice.tone!=='poetic'||t.kind!=='引句后整理')));
 const relaxed=preferred.length===0;if(preferred.length)pool=preferred;
 if(!pool.length)throw new Error('该场景暂无合适内容');
 const visits=seen.filter(id=>pool.some(t=>t.id===id));
 let available=pool.filter(t=>!seen.includes(t.id));const allSeen=available.length===0;
 const exhausted=allSeen&&visits.length%pool.length===0;
 const lastId=visits[visits.length-1],last=pool.find(t=>t.id===lastId);
 if(allSeen){
  const recent=new Set(visits.slice(-Math.max(1,pool.length-1)));
  available=pool.filter(t=>!recent.has(t.id));
  if(!available.length)available=pool.length>1?pool.filter(t=>t.id!==lastId):pool;
 }
 // Festival relevance first, then new works, then style: another rewrite is not another poem.
 const contextual=cal.festivalId?available.filter(t=>t.festivals?.includes(cal.festivalId!)):[];
 if(contextual.length)available=contextual;
 const sourceKey=(t:Toast)=>{const id=t.source==='lumingGuest'?'luming':t.source;return sources[id]?.url||id;};
 const visitedSources=new Set(seen.map(id=>toasts.find(t=>t.id===id)).filter((t):t is Toast=>!!t).map(sourceKey));
 const newSources=available.filter(t=>!visitedSources.has(sourceKey(t)));if(newSources.length)available=newSources;
 const recentThemes=visits.slice(-2).map(id=>pool.find(t=>t.id===id)?.theme);
 const freshStyle=available.filter(t=>!recentThemes.includes(t.theme));
 const differentStyle=available.filter(t=>t.theme!==last?.theme);
 if(freshStyle.length)available=freshStyle;else if(differentStyle.length)available=differentStyle;
 const differentSource=available.filter(t=>sourceKey(t)!==(last&&sourceKey(last)));if(differentSource.length)available=differentSource;
 return {toast:available[Math.min(available.length-1,Math.max(0,Math.floor(rng()*available.length)))],exhausted,relaxed,topicRelaxed,poolIds:pool.map(t=>t.id)};
}
export function speech(t:Toast,c:Choice):string {
 if(t.delivery==='spoken'){
  if(c.tone==='english')return [calendarEnglishLine(c),t.english,c.tea?t.englishTeaLine:''].filter(Boolean).join('\n');
  return [calendarLine(c),c.length==='short'?t.short:t.full,c.tea?t.teaLine:''].filter(Boolean).join('\n');
 }
 if(c.tone==='english') return [calendarEnglishLine(c),t.english+(c.tea?' With tea in my cup and warm wishes in my heart.':' Cheers.')].filter(Boolean).join('\n');
 const line=calendarLine(c),main=c.length==='short'?t.short:t.full;
 return [line,main,c.tea?'今天以茶代酒，心意一样真。':'借这一杯，敬大家。'].filter(Boolean).join('\n');
}
export function ending(t:Toast,c:Choice):string {let s=speech(t,c);if(c.tone!=='english'&&!c.tea&&t.target==='leader')s=s.replace(/借这一杯，敬大家。$/,'借这一杯，敬您。');if(c.tone!=='english'&&!c.tea&&t.target==='elder')s=s.replace(/借这一杯，敬大家。$/,'这一杯，敬家中长辈。');if(c.tone!=='english'&&!c.tea&&t.target==='host')s=s.replace(/借这一杯，敬大家。$/,'这一杯，谢款待，也敬心意。');return s;}
export function shareQuery(t:Toast,c:Choice):string {return Object.entries({id:t.id,v:String(t.version),scene:c.scene,target:c.target,tone:c.tone,length:c.length,tea:c.tea?'1':'0',mode:c.calendarMode,date:c.date,...(c.topic!=='any'?{topic:c.topic}:{})}).map(([k,v])=>encodeURIComponent(k)+'='+encodeURIComponent(v)).join('&');}
export function restore(params:Record<string,string>){const choice=normalize({scene:params.scene as Scene,target:params.target as Target,tone:params.tone as Tone,length:params.length as Length,tea:params.tea==='1',calendarMode:params.mode as Choice['calendarMode'],date:params.date,topic:params.topic as Topic});const toast=toasts.find(t=>t.id===params.id&&String(t.version)===params.v);if(!toast||toast.scene!==choice.scene||toast.target!==choice.target||(!validDate(params.date))||(toast.seasons&&!toast.seasons.includes(calendar(choice.date).season))||(toast.festivals&&(!calendar(choice.date).festivalId||!toast.festivals.includes(calendar(choice.date).festivalId!))))return {choice,toast:undefined};return {choice,toast};}
export function sourceFor(t:Toast){return sources[t.source];}
export function wrapLines(text:string):string[]{return text.split('\n');}

export function parseQuery(query:string):Record<string,string> {
 const result:Record<string,string>={};
 try {for(const pair of query.split('&')){const split=pair.indexOf('=');if(split<0)continue;const key=decodeURIComponent(pair.slice(0,split));if(['id','v','scene','target','tone','length','tea','mode','date','topic'].includes(key))result[key]=decodeURIComponent(pair.slice(split+1));}}catch{return {};}
 return result;
}
