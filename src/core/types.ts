export type Scene = 'general'|'work'|'friends'|'meeting'|'dating'|'family'|'host'|'farewell'|'thanks';
export type Target = 'table'|'leader';
export type Tone = 'poetic'|'verse'|'fun'|'english';
export type Length = 'short'|'full';
export interface Choice { scene:Scene; target:Target; tone:Tone; length:Length; tea:boolean; calendarMode:'none'|'day'|'season'|'term'; date:string }
export interface Source { id:string; title:string; book:string; pages:string; original?:string; url?:string; meaning:string; note:string }
export interface Toast { id:string; version:1; title:string; scene:Scene; target:Target; tone:'poetic'|'fun'; source:string; kind:'引句后整理'|'依据表达方法整理'; short:string; full:string; english:string; translation:string; tip:string; seasons?:string[] }
export interface Selection { toast:Toast; exhausted:boolean; relaxed:boolean }
