import './build.mjs';
import {readFile,mkdir,stat,writeFile} from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {resolve,join} from 'node:path';
import {createHash} from 'node:crypto';
const app=process.env.WECHAT_DEVTOOLS_APP||'/Applications/wechatwebdevtools.app';
const compiler=join(app,'Contents/Resources/app.asar.unpacked/node_modules/wcc-exec');
const root=resolve('dist/miniprogram'),output=resolve('dist/validation');await mkdir(output,{recursive:true});
const config=JSON.parse(await readFile(join(root,'app.json'),'utf8'));
const wxml=config.pages.map(p=>p+'.wxml');
const wxss=['app.wxss',...config.pages.map(p=>p+'.wxss')];
const results=[];
try {
 execFileSync(join(compiler,'wcc'),['-o',join(output,'wxml.js'),...wxml],{cwd:root,stdio:'pipe'});
 if((await stat(join(output,'wxml.js'))).size===0)throw Error('WXML output is empty');
 results.push({type:'WXML',files:wxml,status:'compiled'});
 for(let index=0;index<wxss.length;index++){
  const file=wxss[index],dest=join(output,'wxss-'+index+'.js');
  execFileSync(join(compiler,'wcsc'),['-lc','-o',dest,file],{cwd:root,stdio:'pipe'});
  if((await stat(dest)).size===0)throw Error('WXSS output is empty: '+file);
  results.push({type:'WXSS',files:[file],status:'compiled'});
 }
 const fingerprint=createHash('sha256');for(const file of [...wxml,...wxss])fingerprint.update(await readFile(join(root,file)));
 const report={timestamp:new Date().toISOString(),toolApp:app,scope:'Official WXML/WXSS compilation only; no device or share-send verification',inputSHA256:fingerprint.digest('hex'),results};
 await writeFile(join(output,'wechat-compile.json'),JSON.stringify(report,null,2)+'\n');
 console.log('Official WeChat compiler passed: '+wxml.length+' WXML page(s), '+wxss.length+' WXSS roots. Report: dist/validation/wechat-compile.json');
}catch(error){console.error(error.stderr?.toString()||error.message);process.exitCode=1;}
