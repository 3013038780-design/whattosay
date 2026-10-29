import {writeFile,mkdir} from 'node:fs/promises';
import {toasts} from '../src/data/toasts';
import {sources} from '../src/data/sources';
import {eligiblePool,normalize} from '../src/core/engine';
import {occasionOptions,purposeOptions,flavorOptions} from '../src/core/context';
const dates=['2026-10-29','2026-01-15','2026-04-15','2026-07-15','2026-09-25','2026-10-18'];
const active=toasts.filter(t=>t.active!==false),reachable=new Set<string>(),today=new Set<string>(),routes:Record<string,string[]>={},groups=[];
const workKey=(id:string)=>(sources[id].fullOriginal||sources[id].original||id).replace(/[\s\p{P}]/gu,'');
for(const o of occasionOptions)for(const p of purposeOptions)for(const f of flavorOptions)for(const target of ['table','leader','elder','person'] as const)for(const date of dates){
 const c=normalize({occasion:o.id,purpose:p.id,flavor:f.id,target,date});const {pool}=eligiblePool(c);
 for(const t of pool){reachable.add(t.id);if(date===dates[0])today.add(t.id);const label=[o.name,p.name,f.name,c.target,date].join(' / ');if(!routes[t.id])routes[t.id]=[];if(routes[t.id].length<3&&!routes[t.id].includes(label))routes[t.id].push(label);}
 if(date===dates[0]&&target==='table')groups.push({occasion:o.id,purpose:p.id,flavor:f.id,count:pool.length,works:new Set(pool.filter(t=>t.kind==='引句后整理').map(t=>workKey(t.source))).size});
}
const report={date:dates[0],version:'0.6.1',active:active.length,quoted:active.filter(t=>t.kind==='引句后整理').length,totalVersions:toasts.length,todayReachable:today.size,seasonAndFestivalReachable:reachable.size,unreachable:active.filter(t=>!reachable.has(t.id)).map(t=>t.id),groups,routes};
await mkdir('docs/verification',{recursive:true});await writeFile('docs/verification/0.6.1-visibility.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({...report,groups:undefined,routes:undefined},null,2));
