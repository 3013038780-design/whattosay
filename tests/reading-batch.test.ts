import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readingSources,readingToasts} from '../src/data/reading-batch';
import {toasts} from '../src/data/toasts';
const plain=(s:string)=>s.replace(/[\s\p{P}\p{S}]/gu,'');
test('80 independently sourced complete originals support 160 distinct usable drafts',()=>{
 const sources=Object.values(readingSources);
 assert.equal(sources.length,80);assert.equal(new Set(sources.map(s=>s.title)).size,80);
 assert.equal(sources.filter(s=>s.form==='古诗').length,28);
 assert.equal(sources.filter(s=>s.form==='词').length,28);
 assert.equal(sources.filter(s=>s.form==='古文／语录').length,24);
 assert.equal(readingToasts.length,160);assert.equal(new Set(readingToasts.map(t=>t.full)).size,160);
 for(const s of sources){assert.ok(s.fullOriginal,s.id);assert.ok(plain(s.fullOriginal!).includes(plain(s.original!)),s.id);assert.ok(s.pages.startsWith('PDF '));assert.equal(readingToasts.filter(t=>t.source===s.id).length,2);assert.doesNotMatch(s.fullOriginal!,/待核|今名茵陈|土山|置办酒食|词无实义/);}
 for(const t of readingToasts){assert.ok(readingSources[t.source]);assert.ok(t.short.length<240,t.id);assert.ok(t.full.length<400,t.id);assert.ok(t.english&&t.translation);}
 assert.equal(toasts.filter(t=>t.active!==false).length,482);
});
test('anecdote caveats distinguish disputed stories, unsuccessful visits and unreadable characters',()=>{
 assert.match(readingSources['r04-story-04'].meaning,/矛盾/);
 assert.match(readingSources['r04-story-18'].meaning,/没有见到/);
 assert.match(readingSources['r04-story-24'].fullOriginal!,/●/);
 assert.match(readingSources['r04-shi-702'].meaning,/不沿用劝醉/);
});
