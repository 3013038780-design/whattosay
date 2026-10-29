export interface PersonalDraft {
 id:string; title:string; text:string; scene:string; target:string;
 createdAt:number; updatedAt:number; reference?:{sourceId:string; query:string};
}
export const DRAFT_LIMIT=200;
export function validateDraft(d:PersonalDraft):string {
 if(!d.title.trim())return '给这张小笺起个标题吧。';
 if(!d.text.trim())return '先写一句自己的话吧。';
 if(d.title.length>40)return '标题最多40字。';
 if(d.text.length>2000)return '正文最多2000字。';
 if(d.scene.length>40||d.target.length>40)return '场景和对象各最多40字。';
 return '';
}
export function readDrafts(raw:unknown):PersonalDraft[]{
 if(!Array.isArray(raw))return [];
 const ids=new Set<string>();
 return raw.filter((v):v is PersonalDraft=>{
  if(!v||typeof v!=='object')return false;
  const d=v as PersonalDraft;
  if(!['id','title','text','scene','target'].every(k=>typeof (d as unknown as Record<string,unknown>)[k]==='string')||!d.id||d.id.length>100||ids.has(d.id)||!Number.isFinite(d.createdAt)||!Number.isFinite(d.updatedAt)||validateDraft(d))return false;
  ids.add(d.id);return true;
 }).slice(0,DRAFT_LIMIT).map(d=>({id:d.id,title:d.title,text:d.text,scene:d.scene,target:d.target,createdAt:d.createdAt,updatedAt:d.updatedAt,...(d.reference&&typeof d.reference.sourceId==='string'&&typeof d.reference.query==='string'&&d.reference.query.length<1024?{reference:{sourceId:d.reference.sourceId,query:d.reference.query}}:{})}));
}
