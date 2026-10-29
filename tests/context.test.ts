import {test} from 'node:test';
import assert from 'node:assert/strict';
import {occasionOptions,purposeOptions,flavorOptions,matchesContext} from '../src/core/context';
import {normalize,select,shareQuery,restore,ending,parseQuery} from '../src/core/engine';
import {sources} from '../src/data/sources';
import {toasts} from '../src/data/toasts';
import {Session} from '../src/core/session';
test('occasion and purpose jointly select usable cultural speeches in every supported combination',()=>{
 for(const o of occasionOptions)for(const p of purposeOptions)for(const f of flavorOptions)for(const language of ['zh','en'] as const){
  const c=normalize({occasion:o.id,purpose:p.id,flavor:f.id,language,date:'2026-10-29'}),r=select(c,[],()=>0);
  assert.ok(r.poolIds.length,o.id+'/'+p.id+'/'+f.id);assert.ok(matchesContext(r.toast,c));assert.equal(r.toast.scene,c.scene);assert.equal(r.toast.target,c.target);
  assert.ok(ending(r.toast,c));assert.ok(sources[r.toast.source]);
  if(f.id==='verse')assert.equal(r.toast.kind,'引句后整理',o.id+'/'+p.id);
  const restored=restore(parseQuery(shareQuery(r.toast,c)));assert.ok(restored.toast);assert.equal(ending(restored.toast!,restored.choice),ending(r.toast,c));assert.equal(restored.choice.occasion,o.id);assert.equal(restored.choice.purpose,p.id);
 }
});
test('ending a family meal does not use generic keep-eating speeches or a colleague address',()=>{
 for(const occasion of ['family','work','dating'] as const){const c=normalize({occasion,purpose:'closing',date:'2026-10-29'}),pool=select(c,[],()=>0).poolIds.map(id=>toasts.find(t=>t.id===id)!);assert.ok(pool.some(t=>t.occasions?.includes(occasion)));assert.ok(select(c,[],()=>0).toast.occasions?.includes(occasion));for(const t of pool){assert.doesNotMatch(t.full,/咱们接着吃|咱们接着聊|不耽误大家吃饭/);assert.ok(!t.occasions||t.occasions.includes(occasion));}}
 const family=toasts.find(t=>t.id==='c05-family-closing-1')!;assert.match(family.short,/家里人/);assert.match(toasts.find(t=>t.id==='c05-work-closing-1')!.short,/共事/);
});
test('new language selection preserves the chosen card, full source and custom editor; legacy shares stay exact',()=>{
 const s=new Session({get:()=>[],set:()=>{}});assert.equal(s.choice.occasion,'general');assert.equal(s.optionsOpen,false);s.choose('occasion','work');s.choose('purpose','closing');const id=s.toast.id;s.choose('language','en');assert.equal(s.toast.id,id);assert.equal(s.choice.tone,'english');s.choose('language','zh');assert.equal(s.toast.id,id);s.beginDraft(true);assert.equal(s.editor!.scene,'同事聚餐 · 结束收尾');assert.equal(s.editor!.text,s.view().text);
 s.cancelDraft();const old=toasts.find(t=>t.id==='general-verse-02'&&t.version===1)!;const c=normalize({scene:'general',length:'full',date:'2026-10-17'});const oldShare=shareQuery(old,c),r=restore(parseQuery(oldShare));assert.equal(r.choice.occasion,undefined);assert.equal(ending(r.toast!,r.choice),ending(old,c));
 const newQ=parseQuery(s.query());assert.equal(restore({...newQ,scene:'dating'}).toast,undefined);assert.equal(restore({...newQ,occasion:'dating'}).toast,undefined);
});
test('single-person toasts distinguish a leader, a colleague, an elder and a peer',()=>{
 for(const [occasion,target] of [['work','leader'],['work','person'],['family','elder'],['family','person'],['friends','person'],['meeting','person'],['dating','person'],['general','person']] as const){const c=normalize({occasion,purpose:'personal',target,date:'2026-10-29'});const r=select(c,[],()=>0);assert.equal(r.toast.target,target);assert.ok(r.toast.kind==='引句后整理');assert.ok(matchesContext(r.toast,c));}
});

test('lunar festival-specific poetry still precedes generic context speeches',()=>{const c=normalize({occasion:'friends',purpose:'welcome',date:'2026-09-25'});assert.ok(select(c,[],()=>0).toast.festivals?.includes('midautumn'));const ordinary=normalize({...c,date:'2026-09-24'});assert.ok(!select(ordinary,[],()=>0).toast.festivals);});

test('after the first context speech, another source is preferred over its second rewrite',()=>{const c=normalize({occasion:'work',purpose:'closing',date:'2026-10-29'});const first=select(c,[],()=>0).toast;assert.ok(first.occasions?.includes('work'));const next=select(c,[first.id],()=>0).toast;assert.notEqual(next.source,first.source);});

test('malformed single-person parameters cannot create an empty host or closing pool',()=>{for(const scene of ['host','closing','thanks','reply','farewell'] as const){const c=normalize({scene,target:'person'});assert.notEqual(c.target,'person');assert.ok(select(c,[],()=>0).toast);}});
