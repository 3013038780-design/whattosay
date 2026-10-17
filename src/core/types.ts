export type Scene = 'general'|'work'|'friends'|'meeting'|'dating'|'family'|'host'|'farewell'|'thanks'|'reply'|'closing';
export type Target = 'table'|'leader'|'elder'|'host';
export type Tone = 'auto'|'poetic'|'verse'|'fun'|'english';
export type Length = 'short'|'full';
export interface Choice { scene:Scene; target:Target; tone:Tone; length:Length; tea:boolean; calendarMode:'none'|'day'|'season'|'term'; date:string }
export interface Source { id:string; title:string; book:string; pages:string; original?:string; url?:string; meaning:string; note:string }
export interface Toast { active?:boolean; id:string; version:number; title:string; scene:Scene; target:Target; tone:'poetic'|'fun'; source:string; kind:'引句后整理'|'依据表达方法整理'; short:string; full:string; english:string; translation:string; tip:string; seasons?:string[]; delivery?:'spoken'; theme?:string; teaLine?:string; englishTeaLine?:string }
export interface Selection { toast:Toast; exhausted:boolean; relaxed:boolean; poolIds:string[] }
