import type {Toast,Scene,Target} from '../core/types';

// Complete edited speeches: rhythm serves meaning; quotations and original bridges stay distinct.
function draft(id:string,scene:Scene,target:Target,title:string,source:string,short:string,full:string,english:string,translation:string,tip:string,fun=false):Toast {
 return {id,version:1,scene,target,title,source,short,full,english,translation,tip,tone:fun?'fun':'poetic',kind:'依据表达方法整理',delivery:'spoken',theme:fun?'fun':'rhymed',teaLine:'今天以茶代酒，心意一样真。',englishTeaLine:'With tea in my cup and the same warm wishes.'};
}
export const culturalToasts:Toast[]=[
 draft('culture-table-01','general','table','一席欢笑，来日再邀','rhythm',
 '一席相逢，满桌欢笑。这杯敬大家：愿各位心头少烦恼，日子越过越好；有空咱们再相邀。',
 '一席相逢，满桌欢笑。今天能坐到一桌，就是值得高兴的事。借这一杯，敬在座各位：愿忙时有收获，闲时有说笑；心头少烦恼，日子越过越好。有空咱们再相邀。',
 'To a table full of conversation and laughter, happier days, and another chance to meet.',
 '敬同桌的交谈与欢笑，愿日子更好，也盼再次相聚。','原创顺口稿；“笑／恼／好／邀”按普通话口语韵脚处理，不称古诗。'),
 draft('culture-friends-01','friends','table','酒有深浅，情有长久','rhythm',
 '杯中有酒，心中有友；各自奔忙，情谊长久。今天先好好吃饭，好好说话，往后有空常聚首。',
 '杯中有酒，心中有友；各自奔忙，情谊长久。平时各有各的事，今天坐下来，就多聊两句近况。这杯敬咱们的情谊：愿烦心事少留，好消息常有；见面不必挑大日子，有空就常聚首。',
 'To friendship that lasts through busy lives, and to finding time for one another.',
 '敬忙碌中长久的情谊，也愿彼此常有相聚的时间。','原创祝愿，“酒／友／久／首”呼应；只用于熟朋友。'),
 draft('culture-family-01','family','table','家常有味，团圆有光','family',
 '饭菜有香，家常有暖；心里有念，桌前有伴。敬咱们这一家，愿出门顺当，回家心安。',
 '饭菜有香，家常有暖；心里有念，桌前有伴。一家人吃顿饭，不用把话说得多大，能彼此惦记就好。这杯敬咱们这一家：愿出门顺当，回家心安；忙时有人体谅，闲时常能团圆。',
 'To the warmth of home, peace of mind, and more meals together.',
 '敬家中的温暖，愿心里安稳，也愿常能同桌吃饭。','原创对偶稿；照顾全家，不假定家庭成员、婚育或健康状况。'),
 draft('culture-leader-01','work','leader','敬意入杯，用心入事','rhythm',
 '杯中敬您，心中自勉；多学一分见识，多尽一分心力。祝您忙有所获，闲有所乐，事做得顺，日子也过得舒心。',
 '杯中敬您，心中自勉；多学一分见识，多尽一分心力。今天借这一杯，向您致意，也提醒自己把事做细、把话说真。祝您忙有所获，闲有所乐；手头的事顺心，生活里的好时光也别错过。',
 'With sincere respect. May your work be rewarding and your time away from it happy too.',
 '致以敬意，愿工作有收获，生活也有欢喜。','原创对偶稿；敬意后接实在关心，不编造提携经历。'),
 draft('culture-rescue-01','general','table','饺子倒不出，心意说得出','folkDumplings',
 '突然让我说两句，有点“茶壶里煮饺子——有货倒不出”。先把心意说出来：祝大家饭吃得香，事办得顺，有空咱们常来往！',
 '突然让我说两句，我这会儿有点“茶壶里煮饺子——有货倒不出”。好在心意不用打草稿：这杯敬大家，祝各位饭吃得香，事办得顺，平常的日子也常有好消息。话慢慢学，往后咱们多来往。',
 'I’m a little lost for words, but the good wishes are clear: good meals, good news, and more time together!',
 '临时有点词穷，祝福却很清楚：吃得好，好消息多，也常能相聚。','只用于自嘲救急，轻松场合可选；不拿他人开玩笑。',true),
 draft('culture-friends-02','friends','table','芝麻开花，好事来到','folkSesame',
 '芝麻开花——节节高。祝咱们烦恼少一点，笑声多一点；日子越过越有味，好事一个接一个来到！',
 '借句老话讨个好彩头：芝麻开花——节节高。今天敬大家，祝咱们烦恼少一点，笑声多一点；手头的事慢慢做成，心里的盼一点点变好。日子越过越有味，好事一个接一个来到！',
 'May life keep getting better, with fewer worries, more laughter, and good things ahead.',
 '愿日子越来越好，烦恼少些，笑声多些，好事常来。','民间歇后语接原创祝愿；祝生活向好，不限定升职发财。',true),
 draft('culture-work-01','work','table','各显神通，也相互照应','folkEight',
 '八仙过海——各显神通。敬在座各位的本事，也敬彼此的照应；愿做事各有所长，共事彼此帮忙。',
 '八仙过海——各显神通。每个人都有自己的长处，能坐在一起，也多一个互相了解的机会。这杯敬各位的本事，也敬彼此的照应；愿做事各有所长，共事彼此帮忙，忙得有收获，也过得有滋味。',
 'To everyone’s different strengths, and to helping one another make good use of them.',
 '敬各有所长，也愿彼此照应，一起把事做好。','民间典故接原创对偶；夸各有所长，不比较酒量，不替领导布置任务。',true),
 draft('culture-family-02','family','table','好日子，节节高','folkSesame',
 '芝麻开花——节节高。咱们一家不比谁酒量好，就盼人人身体好、心情好；饭常一起吃，话常一起聊。',
 '芝麻开花——节节高，借这句老话祝咱们一家日子越过越好。不比谁酒量好，就盼人人身体好、心情好。忙的时候彼此惦记，闲下来了就坐一桌：饭常一起吃，话常一起聊，有说有笑就是好。',
 'To better days for our family, good health, good spirits, and more time around this table.',
 '祝一家人日子更好，身体和心情都好，也常有同桌的时光。','民间歇后语接家常祝愿；有未成年人也不劝饮。',true)
];
