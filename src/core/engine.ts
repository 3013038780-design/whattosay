import type {Choice,Selection,Toast,Scene,Target,Tone,Length} from './types';
import {toasts} from '../data/toasts';
import {sources} from '../data/sources';
import {calendar,calendarLine,calendarEnglishLine,today,validDate} from './calendar';
export const sceneOptions = [{id:'general',name:'临场救急',hint:'突然轮到我'}, {id:'work',name:'领导同事',hint:'有敬意，有分寸'}, {id:'friends',name:'朋友小聚',hint:'熟人，自在聊'}, {id:'meeting',name:'认识新朋友',hint:'轻松破个冰'}, {id:'dating',name:'相亲约会',hint:'初见，慢慢了解'}, {id:'family',name:'家人长辈',hint:'家常里见心意'}, {id:'host',name:'我是主人',hint:'欢迎大家来'}, {id:'farewell',name:'送别珍重',hint:'愿前路顺遂'}, {id:'thanks',name:'致谢回敬',hint:'接住这份好意'}] as const;
export const defaults = ():Choice=>({scene:'general',target:'table',tone:'poetic',length:'full',tea:false,calendarMode:'none',date:today()});
export function normalize(raw:Partial<Choice>):Choice {const d=defaults();return {...d,scene:sceneOptions.some(s=>s.id===raw.scene)?raw.scene!:d.scene,target:raw.scene==='work'&&raw.target==='leader'?'leader':'table',tone:['poetic','verse','fun','english'].includes(raw.tone||'')?raw.tone!:d.tone,length:raw.length==='short'?'short':'full',tea:raw.tea===true,date:raw.date&&validDate(raw.date)?raw.date:d.date,calendarMode:['none','day','season','term'].includes(raw.calendarMode||'')?raw.calendarMode!:d.calendarMode};}
export function select(choice:Choice,seen:string[],rng=Math.random):Selection {
 const season=calendar(choice.date).season;
 let pool=toasts.filter(t=>t.scene===choice.scene&&t.target===choice.target&&(!t.seasons||t.seasons.includes(season)));
 const preferred=pool.filter(t=>choice.tone==='english'||(choice.tone==='verse'?t.kind==='引句后整理':t.tone===choice.tone));
 const relaxed=preferred.length===0;if(preferred.length)pool=preferred;
 if(!pool.length)throw new Error('该场景暂无合适内容');
 let available=pool.filter(t=>!seen.includes(t.id));const exhausted=available.length===0;if(exhausted)available=pool;
 return {toast:available[Math.min(available.length-1,Math.max(0,Math.floor(rng()*available.length)))],exhausted,relaxed};
}
export function speech(t:Toast,c:Choice):string {
 if(c.tone==='english') return [calendarEnglishLine(c),t.english+(c.tea?' With tea in my cup and warm wishes in my heart.':' Cheers.')].filter(Boolean).join('\n');
 const line=calendarLine(c),main=c.length==='short'?t.short:t.full;
 return [line,main,c.tea?'今天以茶代酒，心意一样真。':'借这一杯，敬大家。'].filter(Boolean).join('\n');
}
export function ending(t:Toast,c:Choice):string {let s=speech(t,c);if(c.tone!=='english'&&!c.tea&&t.target==='leader')s=s.replace(/借这一杯，敬大家。$/,'借这一杯，敬您。');return s;}
export function shareQuery(t:Toast,c:Choice):string {return Object.entries({id:t.id,v:String(t.version),scene:c.scene,target:c.target,tone:c.tone,length:c.length,tea:c.tea?'1':'0',mode:c.calendarMode,date:c.date}).map(([k,v])=>encodeURIComponent(k)+'='+encodeURIComponent(v)).join('&');}
export function restore(params:Record<string,string>){const choice=normalize({scene:params.scene as Scene,target:params.target as Target,tone:params.tone as Tone,length:params.length as Length,tea:params.tea==='1',calendarMode:params.mode as Choice['calendarMode'],date:params.date});const toast=toasts.find(t=>t.id===params.id&&String(t.version)===params.v);if(!toast||toast.scene!==choice.scene||toast.target!==choice.target||(!validDate(params.date))||(toast.seasons&&!toast.seasons.includes(calendar(choice.date).season)))return {choice,toast:undefined};return {choice,toast};}
export function sourceFor(t:Toast){return sources[t.source];}
export function wrapLines(text:string):string[]{return text.split('\n');}

export function parseQuery(query:string):Record<string,string> {
 const result:Record<string,string>={};
 try {for(const pair of query.split('&')){const split=pair.indexOf('=');if(split<0)continue;const key=decodeURIComponent(pair.slice(0,split));if(['id','v','scene','target','tone','length','tea','mode','date'].includes(key))result[key]=decodeURIComponent(pair.slice(split+1));}}catch{return {};}
 return result;
}
