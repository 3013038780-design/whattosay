import {Solar} from 'lunar-javascript';
import {dayThemes,termCopy,seasonCopy,dayEnglish,termEnglish,seasonEnglish} from '../data/calendar-copy';
import type {Choice,Festival} from './types';
export function today(now=new Date()):string {return new Date(now.getTime()+8*3600000).toISOString().slice(0,10);}
export function validDate(value:string):boolean {if(!/^20\d\d-\d{2}-\d{2}$/.test(value))return false; const d=new Date(value+'T12:00:00Z');return !isNaN(d.getTime())&&d.toISOString().slice(0,10)===value;}
export function calendar(date:string){
 if(!validDate(date))throw new Error('请选择2000—2099年间的有效日期');
 const [y,m,d]=date.split('-').map(Number), lunar=Solar.fromYmd(y,m,d).getLunar();
 // Whole-day terms use Beijing civil dates, not the device's timezone or fixed annual dates.
 const table=lunar.getJieQiTable(); let term='',boundary='';
 for(const value of Object.values(table) as any[]){const key=value.toYmd(); if(key<=date&&key>boundary){boundary=key;term=Solar.fromYmd(value.getYear(),value.getMonth(),value.getDay()).getLunar().getJieQi();}}
 if(!term || !termCopy[term]) {const q=lunar.getPrevJieQi(true);term=q.getName();boundary=q.getSolar().toYmd();}
 const order=Object.keys(termCopy),index=order.indexOf(term);
 const season=index>=0&&index<6?'春':index<12?'夏':index<18?'秋':'冬';
 const festivals:Record<string,{id:Festival;name:string;text:string;english:string}>={
  '8-15':{id:'midautumn',name:'中秋',text:'今天是农历八月十五。借月圆的好意，敬眼前团聚，也念远方牵挂。',english:'On the Mid-Autumn Festival, here’s to those around this table and those we hold close from afar.'},
  '1-15':{id:'lantern',name:'元宵',text:'今天是元宵。借一盏灯的暖意，愿家常有伴，往来有光。',english:'On the Lantern Festival, may our days be warm with good company.'},
  '9-9':{id:'doubleNinth',name:'重阳',text:'今天是重阳。借登高望远的心意，愿长辈安康，故友常聚。',english:'On the Double Ninth Festival, warm wishes to our elders and friends.'},
  '1-1':{id:'newyear',name:'春节',text:'今天是农历新年。敬新岁，也敬相伴的人；愿新的一年平安有喜。',english:'To the Lunar New Year, good company, and peaceful, happy days ahead.'}
 };
 const festival=festivals[lunar.getMonth()+'-'+lunar.getDay()];
 return {date,day:d,theme:dayThemes[d-1][0],dayText:dayThemes[d-1][1],term,termDay:boundary===date,season,lunar:lunar.getMonthInChinese()+'月'+lunar.getDayInChinese(),festivalId:festival?.id,festivalName:festival?.name||'',festivalText:festival?.text||'',festivalEnglish:festival?.english||''};
}
export function calendarLine(choice:Choice):string {const c=calendar(choice.date);return choice.calendarMode==='festival'?c.festivalText:choice.calendarMode==='day'?c.dayText:choice.calendarMode==='term'?termCopy[c.term]:choice.calendarMode==='season'?seasonCopy[c.season]:'';}

export function calendarEnglishLine(choice:Choice):string {const c=calendar(choice.date);return choice.calendarMode==='festival'?c.festivalEnglish:choice.calendarMode==='day'?dayEnglish[c.day-1]:choice.calendarMode==='term'?termEnglish[c.term]:choice.calendarMode==='season'?seasonEnglish[c.season]:'';}
