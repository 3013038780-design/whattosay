import {Solar} from 'lunar-javascript';
import {dayThemes,termCopy,seasonCopy,dayEnglish,termEnglish,seasonEnglish} from '../data/calendar-copy';
import type {Choice} from './types';
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
 return {date,day:d,theme:dayThemes[d-1][0],dayText:dayThemes[d-1][1],term,termDay:boundary===date,season,lunar:lunar.getMonthInChinese()+'月'+lunar.getDayInChinese()};
}
export function calendarLine(choice:Choice):string {const c=calendar(choice.date);return choice.calendarMode==='day'?c.dayText:choice.calendarMode==='term'?termCopy[c.term]:choice.calendarMode==='season'?seasonCopy[c.season]:'';}

export function calendarEnglishLine(choice:Choice):string {const c=calendar(choice.date);return choice.calendarMode==='day'?dayEnglish[c.day-1]:choice.calendarMode==='term'?termEnglish[c.term]:choice.calendarMode==='season'?seasonEnglish[c.season]:'';}
