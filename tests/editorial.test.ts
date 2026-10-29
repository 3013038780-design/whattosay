import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {toasts} from '../src/data/toasts';
import {sources} from '../src/data/sources';
import {readingToasts} from '../src/data/reading-batch';
import {editorialRevisions,editorialSourcePatches} from '../src/data/editorial-revisions';
import {Session} from '../src/core/session';
import {normalize,shareQuery,parseQuery,restore} from '../src/core/engine';
const latest=(id:string)=>toasts.find(t=>t.id===id&&t.active!==false)!;
test('editorial corrections are new versions; all 580 baseline speech bodies remain exact',()=>{
 const report=JSON.parse(readFileSync('docs/verification/editorial-review.json','utf8'));assert.equal(report.records.length,580);assert.equal(new Set(report.records.map((r:any)=>r.id+'@'+r.version)).size,580);
 assert.equal(report.unresolvedOriginalFindings,0);assert.equal(Object.keys(editorialRevisions).length,261);assert.equal(Object.keys(editorialSourcePatches).length,14);
 for(const r of report.records){const old=toasts.find(t=>t.id===r.id&&t.version===r.version)!;for(const k of ['short','full','english','translation'] as const)assert.equal(old[k],r.before[k],r.id+' '+k);if(r.resolution==='revised'){assert.equal(old.active,false);assert.ok(latest(r.id).version>old.version);}}
 const final=JSON.parse(readFileSync('docs/verification/editorial-audit-final.json','utf8'));assert.equal(final.records.length,261);assert.equal(final.counts.must_fix||0,0);
 // Mutable recommendation flags must not leak back into imported editorial inputs.
 assert.ok(readingToasts.every(t=>t.active!==false&&!t.editorialNote));
});
test('Su Shi revision names the author and retains one connected quotation without a return-to-work admonition',()=>{
 const t=latest('r04-ci-12-2');for(const text of [t.short,t.full]){assert.match(text,/苏轼/);assert.equal(text.split('敲门都不应，倚杖听江声。').length-1,1);assert.doesNotMatch(text,/回去还是要把日子过好|借诗词中的一句/);}assert.match(sources[t.source].meaning,/家童熟睡/);assert.match(sources[t.source].meaning,/身不由己/);
});
test('source meaning and copied characters reflect the checked originals',()=>{
 assert.match(sources['r04-shi-357'].fullOriginal!,/鸡鸣胶胶/);assert.doesNotMatch(sources['r04-shi-357'].fullOriginal!,/㬵/);assert.match(sources['r04-story-14'].meaning,/谢奉却把话引向/);assert.match(sources['r04-story-16'].meaning,/不含折屐/);assert.match(sources['r04-story-21'].meaning,/不是借食物/);
});
test('English and Chinese keep the same speaking role after changing a source',()=>{
 for(const id of ['r04-story-06-1','r04-story-06-2'])assert.doesNotMatch(latest(id).english,/wealth|appearances|contest/i);
 assert.match(latest('r04-story-13-2').english,/Thank you/);assert.match(latest('r04-story-23-1').english,/Welcome/);
 assert.doesNotMatch(latest('r04-shi-655-2').english,/effort|growth/i);assert.doesNotMatch(latest('r04-shi-691-2').english,/habits/i);
});
test('an old shared draft offers its reviewed version without changing the original share',()=>{
 const old=toasts.find(t=>t.id==='r04-ci-12-2'&&t.version===1)!;const c=normalize({scene:'closing',length:'full',date:'2026-10-29'});const q=parseQuery(shareQuery(old,c));const session=new Session({get:()=>[],set:()=>{}},q);assert.equal(session.toast.version,1);assert.ok(session.view().revisionAvailable);session.reviewed();assert.equal(session.toast.version,2);assert.equal(session.choice.length,'full');assert.equal(session.view().revisionAvailable,false);assert.equal(restore(q).toast!.full,old.full);
});
test('identical wording does not advertise a fake length choice and styles and languages stay available',()=>{
 const t=latest('c05-work-closing-2'),c=normalize({occasion:'work',purpose:'closing',date:'2026-10-29'});const s=new Session({get:()=>[],set:()=>{}},parseQuery(shareQuery(t,c)));assert.equal(s.view().hasLengthVariants,false);assert.equal(s.view().flavorOptions.length,3);s.choose('language','en');assert.equal(s.toast.id,t.id);assert.equal(s.choice.language,'en');
 const short=latest('c06-eyes-personal');assert.notEqual(short.short.replace(/\s/g,''),short.full.replace(/\s/g,''));assert.match(short.full,/阿堵.*眼睛/);
});
