import {test} from 'node:test';
import assert from 'node:assert/strict';
import {Session} from '../src/core/session';
import {readDrafts} from '../src/core/drafts';
import type {PersonalDraft} from '../src/core/drafts';
function setup(){let drafts:PersonalDraft[]=[];const storage={get:()=>[],set:()=>{},getDrafts:()=>structuredClone(drafts),setDrafts:(v:PersonalDraft[])=>{drafts=structuredClone(v);}};return {storage,session:new Session(storage),get:()=>drafts};}
test('adaptation saves an independent exact snapshot, custom scene and source reference across reopening',()=>{
 const x=setup(),s=x.session,original=s.view().text,share=s.query();s.beginDraft(true);assert.equal(s.editor!.text,original);assert.equal(s.draftDirty(),false);
 s.updateDraft('title','陈老师生日');s.updateDraft('scene','老师生日宴');s.updateDraft('target','陈老师');s.updateDraft('text','感谢您。\n愿每天有好心情！');assert.ok(s.draftDirty());assert.ok(s.saveDraft());
 assert.equal(s.view().text,original);assert.equal(s.query(),share);assert.equal(s.personal!.text,'感谢您。\n愿每天有好心情！');assert.equal(s.personal!.reference!.query,share);
 const reopened=new Session(x.storage);assert.equal(reopened.drafts.length,1);assert.equal(reopened.drafts[0].scene,'老师生日宴');reopened.openDraft(reopened.drafts[0].id);assert.equal(reopened.view().personalSource!.id,s.toast.source);
 reopened.editDraft(reopened.personal!.id);reopened.updateDraft('text','第二次修改');assert.ok(reopened.saveDraft());assert.equal(reopened.drafts.length,1);assert.equal(reopened.drafts[0].createdAt,s.personal!.createdAt);
});
test('blank drafts, cancellation and validation never overwrite the stored original',()=>{
 const {session:s,get}=setup();s.beginDraft();assert.equal(s.editor!.reference,undefined);assert.equal(s.saveDraft(),false);assert.match(s.notice,/标题/);s.updateDraft('title','我写的');assert.equal(s.saveDraft(),false);s.updateDraft('text','a'.repeat(2001));assert.equal(s.saveDraft(),false);assert.match(s.notice,/2000/);s.cancelDraft();assert.equal(s.editor,null);assert.equal(get().length,0);
 s.beginDraft();s.updateDraft('title','自己的');s.updateDraft('text','自己写的一句');assert.ok(s.saveDraft());assert.equal(s.view().personalSource,null);
});
test('failed persistence keeps edit buffer and deletion does not falsely succeed',()=>{
 const {session:s,storage}=setup();s.beginDraft(true);storage.setDrafts=()=>{throw Error('disk full');};assert.equal(s.saveDraft(),false);assert.ok(s.editor);assert.equal(s.drafts.length,0);assert.match(s.notice,/没有保存成功/);
 s.drafts=[{id:'a',title:'标题',text:'原文',scene:'家宴',target:'全桌',createdAt:1,updatedAt:1}];s.removeDraft('a');assert.equal(s.drafts.length,1);assert.match(s.notice,/删除失败/);
});
test('limit is explicit, malformed records are ignored and private drafts never enter sharing parameters',()=>{
 const x=setup(),s=x.session;s.drafts=Array.from({length:200},(_,i)=>({id:String(i),title:'标题',text:'正文',scene:'家宴',target:'全桌',createdAt:1,updatedAt:1}));s.beginDraft();s.updateDraft('title','第201张');s.updateDraft('text','私密名字123');assert.equal(s.saveDraft(),false);assert.ok(s.editor);assert.match(s.notice,/200张/);assert.ok(!s.query().includes('123'));
 assert.equal(readDrafts([null,{},s.drafts[0],s.drafts[0],{...s.drafts[1],text:'x'.repeat(2001)}]).length,1);
 s.cancelDraft();s.draftScene='家宴';assert.equal(s.view().drafts.length,200);s.draftScene='别的场景';assert.equal(s.view().drafts.length,0);
});
