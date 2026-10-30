import type {Choice,Toast,Occasion,Purpose,Scene} from './types';
export const occasionOptions=[{id:'general',name:'直接给我一句'},{id:'friends',name:'朋友聚会'},{id:'work',name:'同事聚餐'},{id:'family',name:'家庭聚会'},{id:'meeting',name:'认识新朋友'},{id:'dating',name:'相亲约会'}] as const;
export const purposeOptions=[{id:'toast',name:'敬大家'},{id:'personal',name:'单独敬一位'},{id:'reply',name:'回应祝福'},{id:'thanks',name:'表达感谢'},{id:'welcome',name:'主人开场'},{id:'closing',name:'收尾告别'}] as const;
// Old shared cards retain their original purpose and exact wording.
export const acceptedPurposes=[...purposeOptions,{id:'farewell',name:'收尾告别'},{id:'gratitude',name:'表达感谢'},{id:'finish',name:'收尾告别'}] as const;
export const visiblePurpose=(purpose:string)=>purpose==='gratitude'?'thanks':purpose==='farewell'||purpose==='finish'?'closing':purpose;
export const flavorOptions=[{id:'verse',name:'诗意自然'},{id:'fun',name:'轻松有趣'},{id:'formal',name:'郑重得体'}] as const;
export const imageryOptions=[{id:'any',name:'不限意象'},{id:'night',name:'夜晚'},{id:'moon',name:'月色'},{id:'wine',name:'茶酒待客'}] as const;
export const purposeScene:Partial<Record<Purpose,Scene>>={reply:'reply',thanks:'thanks',welcome:'host',closing:'closing',farewell:'farewell',gratitude:'thanks',finish:'closing'};
// Reviewed, relationship-neutral speeches may serve more than one occasion.
// Familiar-group legacy entries have a separate route below; old links remain valid.
const shared=new Set([
 'reply-01','reply-02','spoken-reply-03','spoken-reply-06','spoken-reply-09','verse-liu-renew','verse-xu-light-reply','r04-shi-44-2','r04-shi-702-2','r04-shi-991-2',
 'verse-li-askmoon-midautumn','host-01','host-02','spoken-host-02','spoken-host-04','verse-li-spring','verse-du-guest','verse-zhang-world','r04-shi-469-1','r04-shi-683-1','r04-shi-687-1','r04-shi-706-1','r04-story-13-1',
 'thanks-verse-02','thanks-host-01','spoken-guest-01','spoken-guest-02','spoken-guest-03','spoken-guest-04','spoken-guest-08','spoken-guest-09','spoken-guest-12','verse-wang-welcome','verse-qian-tea-guest','r04-shi-1074-2','r04-ci-09-1','r04-story-05-2','r04-story-13-2','r04-story-23-2',
 'r04-shi-1192-2','r04-ci-01-2','r04-ci-07-2','r04-ci-12-2',
 'farewell-01','farewell-02','spoken-farewell-02','verse-dai-reunion-farewell','r04-shi-765-1','r04-ci-01-1','r04-ci-05-1','r04-ci-06-1','r04-ci-07-1'
]);
export function matchesContext(t:Toast,c:Choice):boolean {
 if(!c.occasion)return true;
 const purpose=c.purpose||'toast';
 if(t.purpose)return t.purpose===purpose&&!!t.occasions?.includes(c.occasion);
 if(c.occasion==='general'&&(purpose==='toast'||purpose==='personal'))return !t.purpose;
 if(purpose==='gratitude')return t.scene==='thanks'&&t.target==='table'&&c.occasion!=='dating';
 if(purpose==='finish')return t.scene==='closing'&&!t.id.startsWith('r04-')&&c.occasion!=='dating';
 // Familiar-group legacy texts remain available in the friends occasion.
 if(c.occasion==='friends'&&purpose!=='closing')return true;
 if(c.occasion==='family'&&t.id==='r04-shi-642-2')return purpose==='closing';
 if(c.occasion==='friends'&&purpose==='closing'&&t.id.startsWith('r04-')&&t.id!=='r04-shi-642-2')return true;
 if(purpose==='toast'||purpose==='personal')return t.scene===c.occasion;
 // First meetings do not inherit familiar-group promises or plural host scripts.
 if(c.occasion==='dating')return purpose==='reply'&&shared.has(t.id);
 if(t.id==='r04-ci-12-2'&&c.occasion==='meeting')return false;
 return shared.has(t.id);
}
export function choiceLabel(c:Choice){return c.occasion?`${occasionOptions.find(o=>o.id===c.occasion)?.name} · ${purposeOptions.find(p=>p.id===visiblePurpose(c.purpose||'toast'))?.name||'敬大家'}`:'';}
export function targetOptions(c:Choice){if(c.purpose!=='personal')return [];return c.occasion==='work'?[{id:'leader',name:'领导／前辈'},{id:'person',name:'一位同事'}]:c.occasion==='family'?[{id:'elder',name:'家中长辈'},{id:'person',name:'一位家人'}]:[];}
