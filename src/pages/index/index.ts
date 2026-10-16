import {Session} from '../../core/session';
Page({
 session:undefined as Session|undefined,
 data:{} as ReturnType<Session['view']>,
 onLoad(query:Record<string,string>){this.session=new Session({get:()=>wx.getStorageSync('whattosay.saved.v1')||[],set:v=>wx.setStorageSync('whattosay.saved.v1',v)},query);this.sync();},
 sync(){this.setData(this.session!.view());},
 scene(e:WechatMiniprogram.BaseEvent){this.session!.change({scene:e.currentTarget.dataset.id});this.sync();},
 target(e:WechatMiniprogram.BaseEvent){this.session!.change({target:e.currentTarget.dataset.id});this.sync();},
 tone(e:WechatMiniprogram.BaseEvent){this.session!.change({tone:e.currentTarget.dataset.id});this.sync();},
 length(e:WechatMiniprogram.BaseEvent){this.session!.change({length:e.currentTarget.dataset.id});this.sync();},
 calendarMode(e:WechatMiniprogram.BaseEvent){this.session!.change({calendarMode:e.currentTarget.dataset.id});this.sync();},
 date(e:WechatMiniprogram.PickerChange){this.session!.change({date:String(e.detail.value)});this.sync();},
 tea(){this.session!.change({tea:!this.session!.choice.tea});this.sync();},
 next(){this.session!.pick();this.sync();},save(){this.session!.toggleSave();this.sync();},
 details(){this.session!.details=!this.session!.details;this.sync();},big(){this.session!.big=!this.session!.big;this.sync();},
 tab(e:WechatMiniprogram.BaseEvent){this.session!.tab=e.currentTarget.dataset.id;this.sync();wx.pageScrollTo({scrollTop:0,duration:150});},
 openSaved(e:WechatMiniprogram.BaseEvent){this.session!.openSaved(e.currentTarget.dataset.query);this.sync();},
 removeSaved(e:WechatMiniprogram.BaseEvent){this.session!.removeSaved(e.currentTarget.dataset.query);this.sync();},
 copy(){wx.setClipboardData({data:this.session!.view().text,success:()=>{this.session!.notice='已复制，可以直接粘贴。';this.sync();},fail:()=>{this.session!.notice='复制未成功，请重试。';this.sync();}});},
 copySource(){const s=this.session!.view().source;wx.setClipboardData({data:[s.title,s.book+' '+s.pages,s.url||''].join('\n')});},
 about(){wx.showModal({title:'关于这张小笺',content:'轮到我了，帮你在席间找到有出处、合场景的话。当前为试读版。收藏只保存在这台设备；我们不要求注册，不收集手机号、定位或通讯录。分享仅携带精选内容和选项。',showCancel:false});},
 onShareAppMessage(event:WechatMiniprogram.Page.IShareAppMessageOption){const home=event.target?.dataset.home;return {imageUrl:'/assets/share-cover.png',title:home?'轮到我了：饭局上，一句话说得漂亮':'送你一张席间小笺：'+this.session!.toast.title,path:'/pages/index/index'+(home?'':'?'+this.session!.query())};}
});
