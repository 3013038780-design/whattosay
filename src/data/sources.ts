import type {Source} from '../core/types';
export const sources:Record<string,Source> = {
 rhythm:{id:'rhythm',title:'把话写给耳朵听',book:'《祝酒辞全书》',pages:'PDF 352—359',meaning:'从口头表达方法学习短句、停顿、长短相间与幽默转折。',note:'这里借鉴表达方法，正文是阅读后的独立整理，不是书中范文或古人原话。'},
 thanks:{id:'thanks',title:'感谢要有落点',book:'《祝酒辞全书》',pages:'PDF 296—308',meaning:'答谢要分清谢谁、为何而谢，以及说话人的位置。',note:'正文独立整理；没有提供具体经历时，不代编领导指导、项目成果或多年交情。'},
 reunion:{id:'reunion',title:'相聚与再会',book:'《中国品酒诗话》',pages:'PDF 104（书内84）',original:'把酒话桑麻',url:'https://zh.wikisource.org/zh-hans/過故人莊',meaning:'孟浩然《过故人庄》写拜访老友、田家款待、闲谈农事，并约定重阳再来。这里取老友相聚的从容。',note:'该短句已对照原页和原作电子文本。全诗另有开轩／开筵异文；祝词其余部分为独立整理。桑麻指农事，不把今天的饭局写成田庄实景。'},
 luming:{id:'luming',title:'《诗经·小雅·鹿鸣》',book:'《中国品酒诗话》',pages:'PDF 35（书内15）',original:'我有嘉宾，鼓瑟吹笙。',url:'https://zh.wikisource.org/wiki/詩經/鹿鳴',meaning:'原诗写宴请嘉宾，以音乐和礼物表达主人的厚意。用在主人的欢迎词中，取珍重来客之意。',note:'引句已对照原页与原作电子文本，转为简体字。祝词其余部分为独立整理；只在主人迎宾场景出现。'},
 autumn:{id:'autumn',title:'刘禹锡《秋词》其一',book:'《一杯酒醉尽盛唐》',pages:'PDF 64',original:'我言秋日胜春朝',url:'https://zh.wikisource.org/wiki/秋詞二首',meaning:'原诗反转悲秋传统，用昂扬的秋意表达开阔心境。这里借来祝愿，不推断现场一定晴空有鹤。',note:'引句已对照原页与原作电子文本。祝词其余部分为独立整理，适合秋日相聚。'},
 season:{id:'season',title:'借景入情，首尾照应',book:'《祝酒辞全书》',pages:'PDF 355—356',meaning:'选择一处贴切意象，从时令说到心意，再落到祝愿。',note:'日号、四季及节气句为学习构思后的编辑文案，不是古诗或真实天气报告。'},
 farewell:{id:'farewell',title:'送行有惜别，也有祝愿',book:'《祝酒辞全书》',pages:'PDF 233—252',meaning:'先表达珍重，再祝愿前程。分别处理送行事由，不替对方承诺一定成功。',note:'正文独立整理，默认普通朋友送行，不预设调任、退休或永不相见。'},
 family:{id:'family',title:'一件日常，托住一份心意',book:'《祝酒辞全书》',pages:'PDF 309—319、455',meaning:'从共同生活的温度出发，比堆叠财富和地位更能表达亲情。',note:'正文独立整理，不代编家事、子女、婚姻年数或健康状况。'}
};
