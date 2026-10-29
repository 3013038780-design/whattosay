import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calendar,today,validDate} from '../src/core/calendar';
import {dayThemes,termCopy,dayEnglish,termEnglish} from '../src/data/calendar-copy';
import {defaults,normalize,select,ending,shareQuery,restore,sceneOptions} from '../src/core/engine';
import {toasts} from '../src/data/toasts';
import {sources} from '../src/data/sources';
import {Session} from '../src/core/session';
const parse=(s:string)=>Object.fromEntries(new URLSearchParams(s));
test('Beijing today, leap dates and supported years',()=>{assert.equal(today(new Date('2026-10-16T16:00:00Z')),'2026-10-17');assert.equal(today(new Date('2026-10-16T15:59:59Z')),'2026-10-16');assert.ok(validDate('2024-02-29'));for(const d of ['2025-02-29','2026-04-31','2026-13-01','1999-01-01','2100-01-01','bad'])assert.equal(validDate(d),false,d);});
test('actual solar term dates differ across years, and period is explicit',()=>{assert.equal(calendar('2024-04-04').term,'清明');assert.equal(calendar('2024-04-04').termDay,true);assert.equal(calendar('2026-04-04').termDay,false);assert.equal(calendar('2026-04-05').term,'清明');assert.equal(calendar('2026-04-05').termDay,true);assert.equal(calendar('2026-04-06').termDay,false);assert.equal(calendar('2026-10-17').term,'寒露');assert.equal(calendar('2026-02-04').season,'春');assert.equal(calendar('2026-02-03').season,'冬');});
test('all 31 themes and 24 solar terms exist; every day across leap/cross-year boundaries resolves',()=>{assert.equal(dayThemes.length,31);assert.equal(Object.keys(termCopy).length,24);const terms=new Set<string>();for(let stamp=Date.UTC(2024,0,1);stamp<Date.UTC(2027,0,1);stamp+=86400000){const d=new Date(stamp).toISOString().slice(0,10),c=calendar(d);assert.ok(c.theme);assert.ok(termCopy[c.term],d+' '+c.term);terms.add(c.term);}assert.equal(terms.size,24);});
test('scene, target, season are hard constraints even when soft preferences relax',()=>{for(const s of sceneOptions)for(const tone of ['auto','poetic','verse','fun','english'] as const)for(const date of ['2026-01-02','2026-04-04','2026-07-21','2026-10-17'])for(const target of s.id==='work'?['table','leader'] as const:['table'] as const){const c=normalize({scene:s.id,target,tone,date});const out=select(c,[],()=>.999);assert.equal(out.toast.scene,s.id);assert.equal(out.toast.target,target);assert.ok(!out.toast.seasons||out.toast.seasons.includes(calendar(date).season));assert.ok(ending(out.toast,c));}});
test('a full eligible pool is seen before repeating, and the next cycle never immediately repeats the last speech',()=>{const c=normalize({tone:'auto'}),ids:string[]=[];const count=select(c,[],()=>0).poolIds.length;assert.ok(count>=12);for(let i=0;i<count;i++){const r=select(c,ids,()=>0);assert.equal(r.exhausted,false);assert.ok(!ids.includes(r.toast.id));ids.push(r.toast.id);}const next=select(c,ids,()=>0);assert.equal(next.exhausted,true);assert.notEqual(next.toast.id,ids.at(-1));});
test('every scene/language/length/tea/calendar combination round-trips the exact shared speech',()=>{for(const t of toasts)for(const tone of ['auto','poetic','verse','fun','english'] as const)for(const length of ['short','full'] as const)for(const tea of [true,false])for(const mode of ['none','day','season','term'] as const){const c=normalize({scene:t.scene,target:t.target,tone,length,tea,calendarMode:mode,date:t.festivals?.includes('midautumn')?'2026-09-25':t.festivals?.includes('doubleNinth')?'2026-10-18':'2026-10-17'});const r=restore(parse(shareQuery(t,c)));assert.ok(r.toast);assert.equal(ending(t,c),ending(r.toast!,r.choice));if(t.target==='leader'&&tone!=='english')assert.ok(!ending(t,c).endsWith('敬大家。'));}});
test('missing/version-mismatched/forged/invalid-date shares do not restore',()=>{const t=toasts[0],p=parse(shareQuery(t,defaults()));for(const bad of [{id:'gone'},{v:'999'},{scene:'dating'},{date:'2026-02-30'}])assert.equal(restore({...p,...bad}).toast,undefined);});
test('source metadata, unique IDs, independent English and nonempty variants',()=>{assert.equal(new Set(toasts.map(t=>t.id+'@'+t.version)).size,toasts.length);const active=toasts.filter(t=>t.active!==false);assert.equal(new Set(active.map(t=>t.id)).size,active.length);for(const t of toasts){assert.ok(Number.isSafeInteger(t.version)&&t.version>0);assert.ok(sources[t.source]);for(const field of ['short','full','english','translation','tip'] as const)assert.ok(t[field].trim(),t.id+' '+field);if(t.source==='luming')assert.equal(t.scene,'host');}assert.equal(sources.reunion.original,'把酒话桑麻');});
test('length, tea and calendar change keeps current toast; collections restore and persist',()=>{let store:string[]=[];const adapter={get:()=>store,set:(v:string[])=>{store=v;}};const s=new Session(adapter);const id=s.toast.id;s.change({length:'short',tea:true,calendarMode:'day'});assert.equal(s.toast.id,id);s.toggleSave();assert.equal(store.length,1);const text=s.view().text;const s2=new Session(adapter);s2.openSaved(store[0]);assert.equal(s2.view().text,text);s2.toggleSave();assert.equal(store.length,0);});
test('storage failures are visible and do not falsely mark saved',()=>{const s=new Session({get:()=>[],set:()=>{throw Error('quota');}});s.toggleSave();assert.equal(s.view().isSaved,false);assert.match(s.notice,/未能保存/);});

test('poetry filter chooses verified quote entries when available; English calendar phrases change with the requested day',()=>{const c=normalize({scene:'friends',tone:'verse',date:'2026-10-17'});assert.equal(select(c,[],()=>0).toast.kind,'引句后整理');assert.equal(select(c,[],()=>0).relaxed,false);assert.equal(select(normalize({scene:'dating',tone:'verse'}),[],()=>0).relaxed,false);assert.equal(dayEnglish.length,31);assert.equal(Object.keys(termEnglish).length,24);const t=toasts[0];const en=normalize({tone:'english',calendarMode:'day',date:'2026-10-17'});assert.ok(ending(t,en).startsWith(dayEnglish[16]));assert.notEqual(ending(t,en),ending(t,{...en,date:'2026-10-18'}));});

test('corrupted saved queries fail gently instead of crashing the native page',()=>{const s=new Session({get:()=>['id=%ZZ&v=1'],set:()=>{}});assert.equal(s.view().favorites[0].valid,false);s.openSaved('id=%ZZ&v=1');assert.match(s.notice,/暂不可用/);});

test('all first-release scene/target groups have a classic option, and old reply/host/elder entries remain shareable but leave generic pools',()=>{for(const s of sceneOptions){const targets=s.id==='work'?['table','leader']:s.id==='family'?['table','elder']:s.id==='thanks'?['table','host']:['table'];for(const target of targets){const c=normalize({scene:s.id,target:target as any,tone:'verse'});assert.equal(select(c,[],()=>0).relaxed,false,s.id+'/'+target);}}for(const id of ['thanks-03','thanks-02','family-01']){const t=toasts.find(x=>x.id===id)!;assert.equal(t.active,false);assert.ok(restore(parse(shareQuery(t,normalize({scene:t.scene,target:t.target})))).toast);}assert.ok(!toasts.filter(t=>t.active!==false&&t.scene==='family'&&t.target==='table').some(t=>t.short.includes('长辈')));});

test('a cold start keeps poetry central, while explicit full-length shares remain full',()=>{const s=new Session({get:()=>[],set:()=>{}});assert.equal(s.choice.length,'short');assert.equal(s.choice.tone,'verse');assert.equal(s.toast.kind,'引句后整理');const c=normalize({length:'full'});assert.equal(c.length,'full');});


test('edited shared content retains both historical wordings even when the familiar reference is reserved',()=>{
 const original=toasts.find(t=>t.id==='general-verse-02'&&t.version===1)!;
 const revised=toasts.find(t=>t.id===original.id&&t.version===2)!;
 const c=normalize({scene:'general',tone:'verse',length:'full'});
 assert.equal(original.active,false);assert.equal(revised.active,false);assert.equal(revised.archiveReason,'common');
 const before=ending(original,c),after=ending(revised,c);
 assert.notEqual(before,after);assert.match(after,/心意贵在真诚/);
 for(const t of [original,revised]){const recovered=restore(parse(shareQuery(t,c)));assert.equal(ending(recovered.toast!,recovered.choice),ending(t,c));}
 for(const sample of [0,.25,.5,.75,.999]){const next=select(c,[],()=>sample).toast;assert.ok(next.id!==original.id||next.version===2);}
});


test('each scene and target offers twelve different complete speeches and four options per selected Chinese style',()=>{
 for(const scene of sceneOptions){const targets=scene.id==='work'?['table','leader']:scene.id==='family'?['table','elder']:scene.id==='thanks'?['table','host']:['table'];for(const target of targets){for(const tone of ['auto','poetic','verse','fun','english'] as const){const c=normalize({scene:scene.id,target:target as any,tone});const result=select(c,[],()=>0);assert.equal(result.relaxed,false);assert.ok(result.poolIds.length>=(tone==='auto'||tone==='english'?12:4),scene.id+'/'+target+'/'+tone);const pool=toasts.filter(t=>result.poolIds.includes(t.id)&&t.active!==false);assert.equal(new Set(pool.map(t=>t.short)).size,pool.length);assert.equal(new Set(pool.map(t=>t.english)).size,pool.length);assert.ok(pool.filter(t=>t.delivery==='spoken').every(t=>t.teaLine&&t.englishTeaLine));}}}
});
test('recent history survives reopening, stays separate from favorites, and does not erase unrelated scenes at exhaustion',()=>{
 let recent:string[]=[],saved:string[]=[];const adapter={get:()=>saved,set:(x:string[])=>{saved=x;},getRecent:()=>recent,setRecent:(x:string[])=>{recent=x;}};
 const first=new Session(adapter);const id=first.toast.id;assert.ok(recent.includes(id));const second=new Session(adapter);assert.notEqual(second.toast.id,id);assert.equal(saved.length,0);second.change({scene:'family'});const family=second.toast.id;second.change({scene:'general'});for(let i=0;i<30;i++)second.pick();assert.ok(second.seen.includes(family));
});
test('spoken versions have their own ending; tea and old shared versions keep their respective wording',()=>{
 const t=toasts.find(t=>t.active!==false&&t.scene==='friends'&&t.delivery==='spoken')!,c=normalize({scene:'friends',length:'full'});assert.equal(ending(t,c),t.full);assert.ok(!ending(t,c).endsWith('借这一杯，敬大家。'));assert.ok(ending(t,{...c,tea:true}).endsWith(t.teaLine!));const old=toasts.find(t=>t.id==='friends-01'&&t.version===1)!;assert.ok(ending(old,c).endsWith('借这一杯，敬大家。'));
});


test('recommendations rotate every eligible source work before another rewrite of the same source',()=>{const c=normalize({tone:'verse',date:'2026-10-17'}),pool=select(c,[],()=>0).poolIds;const count=new Set(toasts.filter(t=>pool.includes(t.id)).map(t=>sources[t.source].url||t.source)).size;assert.ok(count>=8);const ids:string[]=[],works=new Set<string>();for(let i=0;i<count;i++){const t=select(c,ids,()=>0).toast;ids.push(t.id);const key=sources[t.source].url||t.source;assert.ok(!works.has(key),key);works.add(key);}assert.equal(works.size,count);});

test('original culture stays available, while specifically overfamiliar references are reserved and remain shareable',()=>{
 const originals=toasts.filter(t=>!['spoken-','culture-','verse-','r04-'].some(prefix=>t.id.startsWith(prefix)));
 assert.equal(originals.length,56);
 for(const t of originals.filter(t=>t.active!==false)){const c=normalize({scene:t.scene,target:t.target,tone:t.kind==='引句后整理'?'verse':t.tone,date:'2026-10-17'});assert.ok(select(c,[],()=>0).poolIds.includes(t.id),t.id);}
 for(const t of toasts.filter(t=>t.archiveReason==='common')){assert.equal(t.active,false);const c=normalize({scene:t.scene,target:t.target,date:'2026-10-17'});assert.ok(restore(parse(shareQuery(t,c))).toast);assert.ok(!select(c,[],()=>0).poolIds.includes(t.id));}
 for(const id of ['folkSesame','folkEight','folkDumplings']){const entries=toasts.filter(t=>t.source===id);assert.ok(entries.length);assert.ok(sources[id].url);assert.match(sources[id].note,/独立整理/);}
});

test('Mid-Autumn follows the lunar date across years and excludes leap eighth months',async()=>{
 for(const d of ['2024-09-17','2025-10-06','2026-09-25']){assert.equal(calendar(d).festivalId,'midautumn');assert.equal(calendar(d).lunar,'八月十五');}
 assert.equal(calendar('2026-08-15').festivalId,undefined);assert.equal(calendar('2026-09-24').festivalId,undefined);
 const {LunarYear,Lunar}=await import('lunar-javascript');const year=Array.from({length:100},(_,i)=>2000+i).find(y=>LunarYear.fromYear(y).getLeapMonth()===8)!;assert.ok(year);const date=Lunar.fromYmd(year,-8,15).getSolar().toYmd();assert.equal(calendar(date).festivalId,undefined);
});
test('festival-specific speeches are preferred on the date and cannot leak to ordinary dates or forged shares',()=>{
 for(const scene of ['general','family','friends','host'] as const){const c=normalize({scene,date:'2026-09-25',tone:'verse'});const first=select(c,[],()=>0).toast;assert.ok(first.festivals?.includes('midautumn'),scene);const restored=restore(parse(shareQuery(first,c)));assert.ok(restored.toast);assert.equal(restore({...parse(shareQuery(first,c)),date:'2026-09-24'}).toast,undefined);}
 const ordinary=select(normalize({date:'2026-08-15'}),[],()=>0);assert.ok(ordinary.poolIds.every(id=>!toasts.find(t=>t.id===id)?.festivals));
 const s=new Session({get:()=>[],set:()=>{}});s.change({date:'2026-09-25'});assert.ok(s.toast.festivals?.includes('midautumn'));s.change({calendarMode:'festival'});s.change({date:'2026-09-26'});assert.equal(s.choice.calendarMode,'none');assert.ok(!s.toast.festivals);assert.equal(s.view().calendar.festivalName,'');
});
test('poetic topics filter in-scene, round-trip through shares, and preserve tea and length',()=>{
 for(const topic of ['night','moon','wine','friend','reunion'] as const){const c=normalize({scene:'general',topic,date:'2026-10-17'});const out=select(c,[],()=>0);assert.equal(out.topicRelaxed,false);assert.ok(out.toast.topics?.includes(topic));assert.equal(restore(parse(shareQuery(out.toast,c))).choice.topic,topic);}
 const c=normalize({scene:'general',topic:'moon',tea:true,length:'full'});const t=select(c,[],()=>0).toast;const s=new Session({get:()=>[],set:()=>{}},parse(shareQuery(t,c)));assert.equal(s.choice.topic,'moon');assert.equal(s.choice.tea,true);assert.equal(s.choice.length,'full');assert.ok(s.view().text.endsWith(t.teaLine!));
});
test('recommendation history keeps the recent window across repeated rounds and topic changes',()=>{
 let recent:string[]=[];const s=new Session({get:()=>[],set:()=>{},getRecent:()=>recent,setRecent:x=>{recent=x;}});s.change({topic:'moon'});const count=select(s.choice,[],()=>0).poolIds.length;assert.ok(count>1);const log:string[]=[];
 for(let i=0;i<count*3;i++){s.pick();assert.ok(!log.slice(-count+1).includes(s.toast.id));log.push(s.toast.id);}s.change({topic:'any'});assert.ok(recent.includes(log.at(-1)!));
});
