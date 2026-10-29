import {test} from 'node:test';
import assert from 'node:assert/strict';
import {sources} from '../src/data/sources';
const plain=(s:string)=>s.replace(/[\s\p{P}\p{S}]/gu,'');
test('Every existing cited original has complete text with an honest scope label',()=>{
 const cited=Object.values(sources).filter(s=>s.original);
 assert.equal(cited.length,148);
 for(const s of cited){
  assert.ok(s.fullOriginal,s.id);
  assert.ok(s.fullOriginalLabel,s.id);
  assert.ok(!/Wikimedia Error|IP address|一作「|Public domain|注解|校勘记/.test(s.fullOriginal!),s.id);
  for(const excerpt of s.excerpts||(s.id==='practice'?['见贤思齐焉。','君子欲讷于言而敏于行。']:[s.original!]))assert.ok(plain(s.fullOriginal!).includes(plain(excerpt)),s.id+': '+excerpt);
 }
});
test('Complete poems retain beginning, ending and selected stanza',()=>{
 const bai=sources['poem-bai-invite'];assert.equal(bai.fullOriginal,sources['poem-bai-fire'].fullOriginal);
 assert.equal(bai.fullOriginal,'绿蚁新醅酒，红泥小火炉。\n晚来天欲雪，能饮一杯无？');
 assert.ok(sources.longevity.fullOriginal!.startsWith('七月流火'));
 assert.ok(sources.longevity.fullOriginal!.endsWith('万寿无疆。'));
 assert.ok(sources.reciprocate.fullOriginal!.includes('投我以桃，报之以李。'));
 assert.ok(sources.practice.fullOriginalLabel!.includes('完整章'));
 assert.ok(sources.folkEight.fullOriginalLabel!.includes('完整用语'));
});
