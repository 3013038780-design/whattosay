"""Draw documentation diagrams (not app screenshots). Requires Pillow and CJK fonts.
Run on macOS: python3 scripts/draw-readme-panels.py
Other systems: supply --serif and --sans paths to installed CJK fonts.
"""
from pathlib import Path
import argparse
from PIL import Image, ImageDraw, ImageFont
p=argparse.ArgumentParser();p.add_argument('--serif',default='/System/Library/Fonts/Supplemental/Songti.ttc');p.add_argument('--sans',default='/System/Library/Fonts/STHeiti Light.ttc');a=p.parse_args()
OUT=Path(__file__).resolve().parent.parent/'docs/media';OUT.mkdir(parents=True,exist_ok=True)
S=2; BG='#f4f0e6'; INK='#263b32'; RED='#954c3d'; MUTED='#6d776b'; LINE='#d8d7c9'; WHITE='#fffdf7'
class Panel:
 def __init__(self,n,title,sub):
  self.im=Image.new('RGB',(1280*S,800*S),BG);self.d=ImageDraw.Draw(self.im)
  self.text(56,35,n+'  /  WHAT TO SAY',18,MUTED,sans=True)
  self.text(56,83,title,44);self.text(56,153,sub,23,MUTED,sans=True)
  self.line(56,209,1224,209)
 def text(self,x,y,t,size=24,color=INK,sans=False):self.d.text((x*S,y*S),t,font=ImageFont.truetype(a.sans if sans else a.serif,size*S),fill=color)
 def line(self,x,y,x2,y2):self.d.line((x*S,y*S,x2*S,y2*S),fill=LINE,width=2)
 def box(self,x,y,w,h,fill=WHITE):self.d.rounded_rectangle((x*S,y*S,(x+w)*S,(y+h)*S),radius=14*S,fill=fill)
 def pill(self,x,y,w,t,active=False):
  self.box(x,y,w,46,INK if active else '#e8e8dc');self.text(x+16,y+10,t,21,WHITE if active else INK,sans=True)
 def save(self,name):
  self.line(56,737,1224,737);self.text(56,755,'0.3 已有功能示意 · 为说明功能重新排版，非应用截图',18,MUTED,sans=True)
  self.im.resize((1280,800),Image.Resampling.LANCZOS).save(OUT/name)
p=Panel('01','先看这一席，再看眼前人','场景决定怎么开口，对象决定分寸。')
scenes=['临场救急','领导同事','朋友小聚','认识新朋友','相亲约会','家人长辈','我是主人','送别珍重','致谢答谢','别人敬我','收个尾']
for i,t in enumerate(scenes):p.pill(56+(i%3)*180,247+(i//3)*67,164,t,t=='领导同事')
p.text(56,561,'全桌的祝福，单独的敬意，',27);p.text(56,604,'不必说成同一种话。',27)
for i,(title,opts,hint) in enumerate([
 ('领导同事',['敬全桌','单独敬领导'],'有敬意，也留有分寸'),('家人长辈',['敬全家','敬长辈'],'家常里的惦记，说得暖一点'),('致谢答谢',['感谢好意','谢主人款待'],'把感谢，落在对方的用心上')]):
 y=247+i*150;p.box(656,y,568,132);p.text(680,y+15,title,27);p.text(680,y+58,'  /  '.join(opts),23,RED);p.text(680,y+94,hint,20,MUTED,sans=True)
p.save('feature-scenes.png')
p=Panel('02','这一句，有来头','看原句、懂原意，再把心意说给眼前的人。')
p.box(56,245,564,447);p.text(82,267,'席间表达 / 引句后整理',20,MUTED,sans=True);p.text(82,315,'这份心意，比酒贵',34)
for i,t in enumerate(['“晚来天欲雪，能饮一杯无？”','外面什么天气不重要，难得的是','大家愿意把时间留给这一桌。','这份心意，比酒贵。']):p.text(82,389+i*48,t,25,RED if i==0 else INK)
p.line(82,607,593,607);p.text(82,631,'一句版  /  短段版  /  大字读',22,MUTED,sans=True)
p.box(650,245,574,447);p.text(676,267,'出处展开 / 白居易《问刘十九》',25)
for y,label,body in [(326,'原句','晚来天欲雪，能饮一杯无？'),(409,'原意','炉火、新酒与雪意中，邀友相陪。'),(492,'书目线索','《诗酒风流赋华章》'),(575,'页码与用法','PDF 6、118、202—203')]:
 p.text(676,y,label,18,MUTED,sans=True);p.text(676,y+30,body,23)
p.text(676,650,'点击“复制出处”，留住来源',21,MUTED,sans=True)
p.save('feature-sources.png')
p=Panel('03','借一点时令，添一份心意','日期、四季、节气与农历节日，让同一句祝福有不同的开场。')
p.box(56,245,1168,124);p.text(85,265,'2026年9月25日  ·  农历八月十五  ·  中秋',31);p.text(85,317,'借月圆的好意，敬眼前团聚，也念远方牵挂。',25,RED)
for i,(title,body,detail) in enumerate([
 ('01—31号','每天一个祝愿主题','也可以先不加开场'),('四季 · 二十四节气','按所选日期匹配时令','可以提前准备下一次聚会'),('农历传统节日','春节 / 元宵 / 中秋 / 重阳','中秋、重阳已有专用稿')]):
 x=56+i*396;p.box(x,395,376,188);p.text(x+23,416,title,26);p.text(x+23,473,body,22);p.text(x+23,525,detail,20,MUTED,sans=True)
p.text(56,620,'还可以挑意境：',24);p.text(56,666,'夜晚小酌  /  月色入杯  /  邀饮待客  /  好友知己  /  团圆相聚',24,RED)
p.save('feature-calendar.png')
p=Panel('04','好话可以收藏，也可以送人','留住自己喜欢的表达，让朋友打开同一张小笺。')
for i,(num,title,lines) in enumerate([
 ('1','选中一句',['场景、对象、风格','挑到合适的表达']),('2','分享这句',['微信好友或群聊入口','附带文案ID、版本与选项']),('3','打开原句',['按分享参数恢复内容','保留当时的表达与选择'])]):
 x=56+i*396;p.box(x,245,376,253);p.text(x+24,265,num,38,RED);p.text(x+24,326,title,29)
 for j,t in enumerate(lines):p.text(x+24,390+j*40,t,23)
for i,(title,desc) in enumerate([('收进小笺','最多100张，保存在当前设备'),('复制这句 / 复制出处','主动点击后，将所选文字写入剪贴板')]):
 x=56+i*594;p.box(x,528,574,125);p.text(x+24,548,title,27);p.text(x+24,601,desc,22,MUTED,sans=True)
p.text(56,684,'微信分享待双账号实测；网页试读通过复制体验链接分享。',22,MUTED,sans=True)
p.save('feature-sharing.png')
print('Created 4 feature diagrams, each 1280 × 800.')
