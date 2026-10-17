export type Scene = 'general'|'work'|'friends'|'meeting'|'dating'|'family'|'host'|'farewell'|'thanks'|'reply'|'closing';
export type Target = 'table'|'leader'|'elder'|'host';
export type Tone = 'auto'|'poetic'|'verse'|'fun'|'english';
export type Length = 'short'|'full';
export type Topic = 'any'|'night'|'moon'|'wine'|'friend'|'reunion';
export type Festival = 'midautumn'|'lantern'|'doubleNinth'|'newyear';
export interface Choice { scene:Scene; target:Target; tone:Tone; length:Length; tea:boolean; calendarMode:'none'|'day'|'season'|'term'|'festival'; date:string; topic:Topic }
export interface Source { id:string; title:string; book:string; pages:string; original?:string; url?:string; meaning:string; note:string; form?:'古诗'|'词'|'古文／语录'|'现代诗'; excerpts?:string[] }
export interface Toast { active?:boolean; archiveReason?:'common'; id:string; version:number; title:string; scene:Scene; target:Target; tone:'poetic'|'fun'; source:string; kind:'引句后整理'|'依据表达方法整理'; short:string; full:string; english:string; translation:string; tip:string; seasons?:string[]; delivery?:'spoken'; theme?:string; teaLine?:string; englishTeaLine?:string; topics?:Topic[]; festivals?:Festival[] }
export interface Selection { toast:Toast; exhausted:boolean; relaxed:boolean; poolIds:string[]; topicRelaxed?:boolean }
