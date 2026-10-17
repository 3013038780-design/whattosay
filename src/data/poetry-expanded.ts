import type {Toast,Source,Scene,Target,Topic,Festival} from '../core/types';

type Form=NonNullable<Source['form']>;
export const collectedSources:Record<string,Source>={};
export const collectedToasts:Toast[]=[];
// {q} is an editorial placeholder resolved once to the checked excerpt, never random fragments.
function p(id:string,author:string,work:string,path:string,q:string,topics:Topic[],meaning:string,scene:Scene,target:Target,title:string,short:string,full:string,english:string,translation:string,book='自主补充收录',pages='原作电子文本',festivals?:Festival[],form:Form='古诗'){
 const source='poem-'+id;
 collectedSources[source]={id:source,title:author+'《'+work+'》',book,pages,original:q,excerpts:[q],url:path.startsWith('https:')?path:'https://zh.wikisource.org/wiki/'+encodeURIComponent(path),meaning,form,note:'2026-10-17对照所列原作／出版机构文本，繁体转简体，标点按现代习惯整理。引句以外为独立编辑；诗中天气、地点和关系不自动等于现场。'+(book==='自主补充收录'?'此条为主动补充，未声称出自用户所供PDF。':'书页是语料线索，引句另与原作核对。')};
 collectedToasts.push({id:'verse-'+id,version:1,source,scene,target,title,short:short.split('{q}').join(q),full:full.split('{q}').join(q),english,translation,kind:'引句后整理',tone:'poetic',delivery:'spoken',theme:'verse',topics,festivals,tip:meaning,teaLine:'我以茶代酒，心意一样。',englishTeaLine:'With tea in my cup and the same warm wishes.'});
}
p('bai-invite','白居易','问刘十九','問劉十九','晚来天欲雪，能饮一杯无？',['night','wine','friend'],'原诗以炉火、新酒和雪意邀友；今天借的是愿意相陪的心意，不预报现场天气。','general','table','这份心意，比酒贵',
 '“{q}”外面什么天气不重要，难得的是大家愿意把时间留给这一桌。这份心意，比酒贵。',
 '白居易有句“{q}”外面什么天气不重要，重要的是这桌上的人，愿意把这一段时间交出来。这份心意，比酒贵。今天这杯敬大家：愿往后忙归忙，总还有人可约，有话可聊。',
 'Here’s to the time we make for one another. That kindness is worth more than what is in the glass.','敬彼此愿意留出的时间，这份心意比杯中的酒更珍贵。','《诗酒风流赋华章》','PDF 6、118、202—203');
p('bai-fire','白居易','问刘十九','問劉十九','绿蚁新醅酒，红泥小火炉。',['wine','reunion'],'绿蚁是新酿酒表面的浮沫；原诗小炉邀饮，取朴素款待的暖意，不把今天酒种说成唐代新醅。','host','table','不讲排场，先讲暖意',
 '“{q}”古人的款待不必多大排场，有一份暖意就好。今天谢谢大家来，饭趁热吃，话慢慢聊。',
 '“{q}”我喜欢白居易这份待客的心：没有铺张，却把朋友放在心上。今天这一桌，也想让各位坐得自在、吃得舒心。先敬大家一杯，愿来时有兴，回去有暖，下次还愿意再来。',
 'Welcome to this table. May you feel at home, enjoy the food, and leave with a warm memory.','欢迎大家，愿吃得舒心、相处自在，带着暖意回去。','《诗酒风流赋华章》','PDF 6');
p('su-cupmoon','苏轼','月夜与客饮酒杏花下','月夜與客飲酒杏花下','山城薄酒不堪饮，劝君且吸杯中月。',['moon','wine','night'],'原诗把月光写进酒杯，以想象增添雅兴；不是评价今天酒差，也不要求客人饮尽。','friends','table','杯中不只酒，还有好光景',
 '“{q}”今天也借一份杯中月：酒随各位的意，情谊照咱们的心。来，敬这一桌好光景。',
 '苏轼请客，连月光都能斟进杯里：“{q}”今天咱们也不论酒有多贵，能坐在一起，把近况说给懂的人听，就是好光景。来，敬你们，愿日子有奔头，身边有老友。',
 'To the company that makes a simple gathering special, and to friends who know how to listen.','敬让平常相聚变得珍贵的人，也敬愿意倾听的朋友。','《诗酒风流赋华章》','PDF 228');
p('su-flower','苏轼','月夜与客饮酒杏花下','月夜與客飲酒杏花下','花间置酒清香发，争挽长条落香雪。',['wine','night'],'诗中花间设酒、挽枝落花；取待客有兴味，不声称现场有杏花或雪。','thanks','host','款待不止在饭菜里',
 '“{q}”好款待，不只在饭菜里，也在让人放松的心意里。这杯敬主人，谢谢今天这一桌好时光。',
 '读苏轼的“{q}”，觉得待客最动人的，是愿意替朋友添一点兴致。今天坐在这里，也能感受到这份用心。饭菜有滋味，相处不拘束，这杯我敬主人：谢谢款待，愿以后也有机会好好招待你。',
 'Thank you for a thoughtful welcome and a gathering where everyone can relax. I hope to return that kindness.','谢谢用心款待，也愿以后有机会回应这份好意。');
p('li-askmoon','李白','把酒问月','把酒問月','唯愿当歌对酒时，月光长照金樽里。',['moon','wine','night'],'原诗从问月想到古今人生；取珍惜相聚的愿望，不宣称杯中真有月影。','general','table','好时光，愿它长一点',
 '“{q}”今天借李白这一愿：好时光长一点，知心话多一点，大家往后的日子，也亮堂一点。',
 '有些时候，不需要多热闹，有人同桌，有话可聊，就想把时间留得长一点。李白说“{q}”今天我也借这一愿敬各位：愿忙碌之外有相聚，平常日子有欢喜，好时光总有人一起记。',
 'May good moments last, may conversations be warm, and may we have more days worth sharing.','愿好时光长一点，交谈暖一点，值得分享的日子多一点。','《诗酒风流赋华章》','PDF 175');
p('li-followmoon','李白','把酒问月','把酒問月','人攀明月不可得，月行却与人相随。',['moon','reunion'],'诗里写月不可攀却与人相随；此处转为相伴的祝愿，不把原诗说成家庭诗。','family','elder','牵挂，不必说得很大',
 '“{q}”有些牵挂也这样，不用天天挂在嘴边，却一直在心里。这杯敬您，愿日子舒心，咱们常聚。',
 '“{q}”李白写的是月亮，我今天借它说一份牵挂：不一定天天说出口，却一直放在心里。这杯敬您，盼您少操一点心，多留一点闲；往后咱们多坐一桌，家常慢慢说。',
 'To you, with affection that stays close even when we do not say it every day. May we spend more time together.','敬您，也把平日未常说出口的牵挂送到，盼多些相聚。');
p('li-spring','李白','春夜宴从弟桃花园序','春夜宴從弟桃花園序','开琼筵以坐花，飞羽觞而醉月。',['night','wine','reunion'],'原作是与从弟春夜宴聚的序文；取雅兴与相伴，不搬用罚酒规则，不将散文计为古诗。','host','table','把雅兴留在席上',
 '李白写“{q}”今天咱们不必有桃花满园，能有一桌谈笑，就有一席雅兴。来，先欢迎大家。',
 '“{q}”李白的宴席有花、有月，今天这一桌，最值得高兴的是大家都来了。不用急着说场面话，菜慢慢尝，故事慢慢讲。先敬各位，愿这一席坐得自在，往后的来往也总有兴致。',
 'Thank you for coming. Let us enjoy the food, take our time with our stories, and make a warm memory together.','谢谢各位到来，愿慢慢吃饭、从容交谈，留下好记忆。','《诗酒风流赋华章》','PDF 14；另核原序',undefined,'古文／语录');
p('li-mountain','李白','山中与幽人对酌','山中與幽人對酌','我醉欲眠卿且去，明朝有意抱琴来。',['friend','wine'],'原诗写朋友间不拘礼数的自在；只借明日再来的亲近，不以喝醉或困倦作为程序判断。','friends','table','来去自在，情谊还在',
 '“{q}”老朋友的好，就在不用时时客气。今天随意，往后常来；话没聊完，下回接着聊。',
 '李白对朋友说“{q}”，那份熟悉真让人羡慕：来了不拘束，走了还惦记，下次见面话还能接上。今天这杯敬你们，咱们都按自己的意思来，酒随意，情谊放长，没聊完的话留给下一回。',
 'To friendships where we can feel at ease, come and go freely, and always pick up the conversation again.','敬自在的交情，来去随心，再见还能接着聊。');
p('li-rest','李白','下终南山过斛斯山人宿置酒','下終南山過斛斯山人宿置酒','欢言得所憩，美酒聊共挥。',['wine','friend'],'原诗写山行后受到款待；取能歇下来交谈的自在，不预设今日赶路、登山或饮酒量。','general','table','能歇下来，说两句',
 '“{q}”这杯敬的，就是忙里能歇一歇，坐下来能说两句。愿大家事情有进展，心里有闲处。',
 '“{q}”李白写山行之后的相聚，我喜欢其中“得所憩”三个字。人总在忙，能有一席让自己歇下来，也有人愿意听几句，就很难得。今天敬各位，愿事情有进展，心里有闲处，饭桌上常有说得来的人。',
 'To a place to rest, people who listen, and moments of ease within our busy lives.','敬忙碌里能歇一歇，也敬身边愿意倾听的人。','《诗酒风流赋华章》','PDF 169');
p('li-stars','李白','下终南山过斛斯山人宿置酒','下終南山過斛斯山人宿置酒','长歌吟松风，曲尽河星稀。',['night','friend'],'原诗欢聚长歌直至星稀；取交谈投缘，不要求熬夜、不把诗中星空当现场。','closing','table','话有余味，下回再续',
 '“{q}”聊得来，时间就过得快。我先把话收到这里，把相聚的余味留长一点。来，敬大家。',
 '李白写“{q}”，好相聚往往让人忘了时间。我就把自己的话收到这里，不把祝福说尽：愿大家各自忙得顺，也常有这样的闲；今天没说完的好故事，往后咱们接着聊。来，敬各位。',
 'I will leave my toast here and keep some stories for next time. Here’s to more unhurried conversations.','话先到这里，故事留给下回，也盼更多从容交谈。');
p('wang-lake','王维','临湖亭','輞川集_(王維)/臨湖亭','当轩对尊酒，四面芙蓉开。',['wine','reunion'],'原诗湖亭迎客赏荷；尊为酒器，取好客与雅兴，不虚构现场湖亭和花景。','host','table','花可以没有，心意不能少',
 '“{q}”今天没有王维那样的湖亭花景，也想把这份好客的心意送到。谢谢大家来，咱们自在地吃、痛快地聊。',
 '王维的“{q}”，把待客写得很美。今天这一桌，不必与古人的景致相比，我只愿各位坐得舒服，聊得投缘。这杯先欢迎大家，也祝往后常来常往，把平常一顿饭，吃出朋友间的好滋味。',
 'Welcome, everyone. May a simple meal become a good memory through the pleasure of one another’s company.','欢迎大家，愿一顿平常饭因为彼此相伴而留下好记忆。','《诗酒风流赋华章》','PDF 96');
p('wang-welcome','王维','临湖亭','輞川集_(王維)/臨湖亭','轻舸迎上客，悠悠湖上来。',['wine','friend'],'上客指贵客；借迎客的郑重表达主人的用心，不说今天乘船而来。','thanks','host','这一杯，谢你把大家放在心上',
 '“{q}”古人用船迎客，今天你用一桌饭把大家聚起来。这杯敬主人，谢谢你把我们放在心上。',
 '王维写“{q}”，待客的认真，隔着诗也能感觉到。今天大家能坐在一起，也有人提前张罗、费心安排。作为来宾，我先敬主人一杯：谢谢你的用心，愿你招待朋友的热情，也常有人回应。',
 'Thank you for bringing us together and making us feel welcome. May your kindness find a warm response.','谢谢张罗相聚，也愿你的用心常有温暖回应。');
p('meng-ninth','孟浩然','秋登兰山寄张五','秋登蘭山寄張五','何当载酒来，共醉重阳节。',['wine','friend','reunion'],'原诗盼友人来同过重阳；取相约重聚，不把共醉转为必须喝醉。','friends','table','重阳有约，朋友常来',
 '“{q}”今天重阳，借这句敬老朋友：杯里随意，心里常念，愿这样的相聚，往后还常有。',
 '“{q}”孟浩然的心思，说到底就是盼朋友来。今天重阳，能同桌就很高兴；不比谁喝得多，只盼往后见面的时候多。敬你们，愿各自安稳，来往长久，下一次相聚也早点有着落。',
 'On the Double Ninth Festival, here’s to old friends, good health, and making time to meet again.','重阳敬老友，愿平安健康，也愿往后多相聚。','《诗酒风流赋华章》','PDF 101',['doubleNinth']);
p('du-guest','杜甫','客至','客至','花径不曾缘客扫，蓬门今始为君开。',['wine','friend'],'原诗主人因友人来访而欣喜；借郑重欢迎，不预设家贫，不贬低今天的饭菜。','host','table','门为客开，心因人暖',
 '“{q}”今天借杜甫这份高兴欢迎各位：门为客开，心因人暖。来了就别见外，咱们好好聚一聚。',
 '“{q}”杜甫写客人到来，字里都是高兴。今天我也有这份心情：把大家请到一起，是想好好吃顿饭，也好好说说话。先敬各位，愿来时自在，席间开怀，走后想起来，还愿意下回再来。',
 'It is a pleasure to welcome you. May you feel at ease today and look forward to meeting again.','欢迎大家，愿今天相处自在，下次还盼再聚。','《一杯酒醉尽盛唐》','PDF 56—57');
p('du-lamplight','杜甫','赠卫八处士','贈衛八處士','今夕复何夕，共此灯烛光。',['night','friend','reunion'],'原诗久别重逢，兼有岁月感慨；此处只借同灯相坐的珍惜，不编造二十年未见。','friends','table','灯下能相聚，就是好时候',
 '“{q}”今天不论隔了多久，能坐在一起，把彼此的近况听一听，就是好时候。这杯敬你们。',
 '“{q}”杜甫把重逢写成灯下的一声感叹。我今天借这句，不说别的，只觉得能坐下来听你们讲讲近况，很好。这杯敬相聚，愿大家各有收获，也总有人记得你最近过得怎么样。',
 'To being together again, sharing the stories of our lives, and caring enough to ask how each other is doing.','敬相聚与近况，也敬彼此认真关心的心意。','《诗酒风流赋华章》','PDF 18、186');
p('du-meal','杜甫','赠卫八处士','贈衛八處士','夜雨翦春韭，新炊间黄粱。',['wine','reunion','night'],'翦通剪，间为掺入；诗中家常饭菜表达久别待客。借饭里心意，不声称现场下雨。','family','table','一顿家常，最见心意',
 '“{q}”让人记住一顿饭的，常常不是多贵，是有人惦记你的口味。今天敬咱们一家，愿常有热饭，也常有团圆。',
 '杜甫写“{q}”，一顿家常饭，就把待客的心意写出来了。咱们家里也是，饭菜上桌，问一声够不够、合不合口，都是牵挂。这杯敬一家人，愿各自忙得顺当，围在一起吃得舒心，平常日子也常有团圆。',
 'To the care in an ordinary meal, and to a family that keeps making room for one another.','敬家常饭里的牵挂，也愿一家人常能为彼此留出时间。');
p('bai-next','白居易','与梦得沽酒闲饮，且约后期','與夢得沽酒閑飲，且約後期','更待菊黄家酝熟，共君一醉一陶然。',['wine','friend','reunion'],'原诗与刘禹锡闲饮并约下次；取把再会放在心上的亲近，醉字是诗意，不作饮量要求。','friends','table','这一席，也约下一席',
 '“{q}”白居易喝着这一席，已经惦记下一席。咱们也借这份心意：今天尽兴，往后有约，别把相聚都留给改天。',
 '“{q}”我喜欢白居易这句里的“更待”：眼前相聚高兴，往后还有期待。今天这杯敬你们，愿咱们各自的生活有好消息，朋友之间有新话题；下一次见面，能早点定个日子。',
 'To the pleasure of this gathering and the promise of another. May “soon” become a date we can keep.','敬眼前相聚，也盼下一次早些有日期。','《诗酒风流赋华章》','PDF 63');
p('bai-history','白居易','与梦得沽酒闲饮，且约后期','與夢得沽酒閑飲，且約後期','闲征雅令穷经史，醉听清吟胜管弦。',['wine','friend'],'原诗朋友以经史作雅令、以诗助兴；取交谈见闻的趣味，不要求背书作诗或饮醉。','work','table','有见识，也有好兴致',
 '“{q}”古人席上聊经史，咱们今天也多聊点工作之外的见闻。敬各位的见识，也敬这一桌好兴致。',
 '白居易写朋友相聚：“{q}”诗里不只写喝酒，也写聊得投缘、各有见识。今天能同桌，我也想多听听大家工作之外的故事。这杯敬各位，愿共事多一分了解，相处多一点趣味，忙碌之外也有好兴致。',
 'To the stories and knowledge each of us brings, and to knowing the people beyond their work.','敬各位的故事与见识，也愿工作之外多了解彼此。');
p('bai-city','白居易','江楼夕望招客','江樓夕望招客','灯火万家城四畔，星河一道水中央。',['night','moon'],'诗中登楼招客，灯火与星河交映；借灯火中的相聚，不将江楼景色当今天实景。','general','table','万家灯火，难得这一桌',
 '“{q}”万家灯火里，能和各位坐到这一桌，也是自己的好光景。今天敬大家，愿家中有人等，席上有人懂。',
 '白居易写“{q}”，把一城灯火写得很动人。今天借这句，敬我们自己的这一桌：各人忙过各人的一天，还愿意坐下来一起吃顿饭。愿大家忙时有所得，回家有暖意，想说话的时候也总有人听。',
 'To this table among a city full of lights, and to having people who wait for us and listen to us.','敬万家灯火中的这一桌，也愿有人等候、有人倾听。');
p('bai-moonfriend','白居易','八月十五日夜禁中独直对月忆元九','八月十五日夜禁中獨直對月憶元九','三五夜中新月色，二千里外故人心。',['moon','night','wine','friend','reunion'],'三五指十五，原诗中秋独直思友，也担心友人遇阴天；月圆是节日意象，不断言现场见月。','general','table','中秋，敬眼前也念远方',
 '“{q}”今天中秋，这杯敬眼前同桌的人，也念远方惦记的人。愿相聚有暖，牵挂有回音。',
 '白居易中秋想念朋友，写“{q}”今天借这句，敬眼前能同桌的人，也念远方还没见上的人。月圆是个好意头，能把彼此放在心上，更是实在的团圆。祝各位中秋安好，愿想见的人，总有相见的时候。',
 'On Mid-Autumn, to those at this table and those far away. May the people we miss find their way back to us.','中秋敬同桌之人，也念远方之人，愿牵挂终有相见。','自主补充收录','原作电子文本',['midautumn']);
p('wei-reunion','韦应物','淮上喜会梁川故人','淮上喜會梁川故人','欢笑情如旧',['friend','reunion'],'原诗重逢有岁月与鬓斑之感；只引欢笑如旧，不替大家设定年岁或十年未见。','friends','table','见了面，笑声还熟悉',
 '韦应物说“{q}”。朋友的好，就在各自忙了一阵，见了面笑声还熟悉。这杯敬你们，愿好日子有分享，好朋友常见面。',
 '“{q}”韦应物这五个字，把老朋友重逢的高兴说得真好。平时各有各的忙，坐回一桌，话又接上了，笑声也还是熟悉的。今天敬你们，愿大家把日子过好，也给相聚多留一点时间。',
 'To the familiar laughter that returns as soon as old friends sit down together. May we meet more often.','敬一见面就熟悉的笑声，也愿朋友常聚。','《一杯酒醉尽盛唐》','PDF 118');
p('wei-kindness','韦应物','寄全椒山中道士','寄全椒山中道士','欲持一瓢酒，远慰风雨夕。',['wine','friend','night'],'原诗惦念山中友人，想携酒慰问；借牵挂与关心，不判断对方正遇困境或把酒当疗愈。','thanks','table','有人记挂，比热闹难得',
 '“{q}”有时难得的不是一杯酒，是有人愿意记挂你。今天这杯，谢谢这份好意，愿你的用心也常被人放在心上。',
 '韦应物写“{q}”，动人的地方，是心里忽然想起了一个人。今天借这句认真说声谢谢：被人惦记、被人好好对待，是很暖的事。这杯敬这份好意，也祝你往后的日子，常遇见愿意关心你的人。',
 'Thank you for thinking of me. May the kindness you offer return to you through people who care.','谢谢惦记，也愿你的善意常得到关心与回应。');
p('qian-tea','钱起','与赵莒茶宴','https://www.tup.tsinghua.edu.cn/upload/books/yz/089682-01.pdf','竹下忘言对紫茶，全胜羽客醉流霞。',['wine','friend'],'原诗写茶宴的清趣；取以茶相聚也能有兴致，不比较饮品高低，也不声称有仙人。','general','table','茶也能敬一席好时光',
 '“{q}”古人茶席也能尽兴。今天杯里无论是什么，这份相聚都值得敬；祝大家心里舒展，日子有味。',
 '钱起写茶宴：“{q}”可见相聚的好，不只靠杯里是什么。能同桌，能说上话，心里觉得自在，就有一席好时光。今天我敬各位，愿平常日子有滋味，忙碌之外有清闲，朋友之间有真话。',
 'Whatever is in our cups, good company is worth celebrating. To easy conversation and a little peace in busy days.','无论杯中是什么，都敬相伴的人，也愿忙里有清闲。','自主补充收录','清华大学出版社公开试读文本');
p('liu-renew','刘禹锡','酬乐天扬州初逢席上见赠','酬樂天揚州初逢席上見贈','今日听君歌一曲，暂凭杯酒长精神。',['wine','friend'],'原诗回应白居易对坎坷经历的关切；取朋友交谈给予精神支持，不说酒有提神疗效。','reply','table','好话收到，精神也添了',
 '“{q}”借刘禹锡这句接住你的好话：暖心的不只在杯里，更在你这份心意。我也敬你，愿咱们都顺心。',
 '“{q}”刘禹锡是在回应朋友，我今天也借这句接住你的祝福。让人添精神的，往往不是酒，是有人愿意把好话认真说给你听。谢谢你，我也回敬一份祝愿：愿你忙有所获，闲有所乐，心里有底气，身边有好意。',
 'Thank you for the encouragement. May you find the same warmth, confidence, and kindness you have offered me.','谢谢鼓励，也愿你得到同样的暖意、底气与善意。');
p('wang-same','王昌龄','送柴侍御','送柴侍御','青山一道同云雨，明月何曾是两乡。',['moon','friend'],'送别诗以共在云雨月光之中宽慰友人；借相隔仍相亲，不预设赴任。','farewell','table','路有远近，情意相通',
 '“{q}”今天借这句送你：路有远近，情意相通。愿你新的一程顺心，下次相聚，多带几个好故事回来。',
 '王昌龄送朋友，说“{q}”。今天咱们不把离别说得太重，认真道一声珍重就好。这杯祝你新的一程走得稳、过得好；各自忙碌的时候，也别忘了还有朋友惦记。等下次同桌，再慢慢听你的新故事。',
 'To a good journey, steady steps, and friendship that stays close across the distance. We look forward to your new stories.','祝新一程顺利，愿距离不隔情谊，也盼再听新故事。');
p('cen-joke','岑参','戏问花门酒家翁','戲問花門酒家翁','道傍榆荚仍似钱，摘来沽酒君肯否？',['wine','friend'],'诗人把榆荚比作钱，向酒家翁打趣；借想象的幽默，不冒称今天赊账或未付饭钱。','friends','table','买酒不靠榆钱，相聚靠真心',
 '岑参问“{q}”古人连榆钱都想拿来买酒。咱们今天不比谁排场大，敬的是能坐在一起，有话可聊。',
 '“{q}”岑参这玩笑开得有趣：榆树上长的“钱”，能不能换一杯酒？今天借这点雅趣敬你们。饭可以吃家常的，话可以说自在的；咱们不比谁的排场大，就盼朋友真诚，见面开心。',
 'To a little imagination, a shared laugh, and friendships that do not need an expensive setting.','敬一点雅趣、一份笑意，也敬不必讲排场的交情。','《中国品酒诗话》','PDF 102—103为榆钱沽酒线索');
p('li-flower','李商隐','花下醉','花下醉','更持红烛赏残花。',['night','friend'],'原诗客散酒醒后仍赏花，既有留恋也有余兴；此处取珍惜眼前，不鼓励深夜独饮或说这是纯欢乐诗。','closing','table','把余兴留给下一回',
 '“{q}”有些好时光，人散了还舍不得忘。我先把话收到这里，愿大家今天有余兴，往后有再会。',
 '李商隐写“{q}”，相聚之后还有回味。今天我就把话收到这里，把这份高兴留长一点。愿各位往后的日子，既有忙碌的收获，也有舍不得匆匆过完的好时光；下次见面，咱们接着聊。',
 'May this gathering leave a warm afterglow, and may we have more good moments to look forward to.','愿这次相聚留有余味，也愿往后还有好时光可盼。');
p('du-ninth','杜牧','九日齐山登高','九日齊山登高','尘世难逢开口笑，菊花须插满头归。',['reunion','friend'],'原诗重阳登高自宽，兼有时光感慨；只借开怀与珍惜，不沿用酩酊要求。','family','table','重阳，把笑声留在家里',
 '“{q}”今天重阳，借古人的好兴致，祝咱们一家多些笑声，少些操心；平常常惦记，有空多团聚。',
 '杜牧重阳登高，写“{q}”。今天咱们借这份好兴致，不一定登高插菊，能陪着家人吃顿饭、说几句，也很好。这杯祝大家安康顺心，忙时有人体谅，闲时有人相伴，把笑声多留一点在家里。',
 'On the Double Ninth Festival, to our family’s health, shared laughter, and time together.','重阳祝一家安康，愿笑声多些，相聚多些。','《中国品酒诗话》','PDF 180',['doubleNinth']);
p('tao-reading','陶渊明','移居二首·其一','移居二首','奇文共欣赏，疑义相与析。',['friend','wine'],'原诗写移居后与邻里谈论文章；取各有所见、共同讨论，不把不同意见变成席间考问。','work','table','各有见识，彼此添光',
 '“{q}”共事的好，也在各有见识、遇事能商量。这杯敬各位，愿相处多些理解，做事多些默契。',
 '“{q}”陶渊明说邻里相处，好的文章一起看，不明白的地方一起聊。我觉得共事也有这样的好处：各有见识，彼此启发。今天这杯敬大家，愿做事能商量，相处能体谅，把各自的长处，慢慢合成一起向前的力气。',
 'To different perspectives, thoughtful discussion, and the understanding that helps us work well together.','敬不同见识与认真商量，也愿共事更加默契。');
p('tao-neighbor','陶渊明','移居二首·其二','移居二首','过门更相呼，有酒斟酌之。',['wine','friend','reunion'],'原诗邻里农忙各归、闲暇相聚；取自然往来，不要求随时来访或有酒必饮。','friends','table','有空招呼一声，就能相聚',
 '“{q}”好的交情，就是有空招呼一声，就能坐下来聊聊。今天这杯敬你们，愿来往自然，情谊长久。',
 '陶渊明的朋友往来很可爱：“{q}”各自忙时不打扰，闲下来愿意走动走动。今天咱们也借这份自在碰个杯，愿往后的日子，忙有所得，闲有所伴；不必每次都有大事，想见了就能约一顿饭。',
 'To friendships that fit naturally into everyday life: room for our own work, and time to meet when we can.','愿朋友来往自然，各有自己的忙碌，也有相聚的空闲。');
p('tao-talk','陶渊明','移居二首·其二','移居二首','相思则披衣，言笑无厌时。',['friend','reunion'],'原诗写邻里相思即往、谈笑不厌；借相处自在，不把相思限定为恋情。','meeting','table','先聊投缘，再慢慢熟悉',
 '“{q}”古人邻里谈笑，讲的是相处舒服。咱们今天刚认识，先把话聊自在，再慢慢熟悉。这杯敬新相识。',
 '“{q}”陶渊明写的是熟悉邻里之间的谈笑。咱们今天还在相识的开头，就先借这一份愿意了解彼此的心意。这杯敬各位，愿说话不拘束，听人有耐心；这一桌聊过以后，下次见面多一分熟悉。',
 'To a comfortable first conversation, attentive listening, and getting to know one another at our own pace.','敬自在的初次交谈，也愿彼此从容了解。');
p('tao-friend','陶渊明','饮酒二十首·其十四','飲酒_(陶淵明)','故人赏我趣，挈壶相与至。',['friend','wine'],'原诗朋友携酒而至，看重相投之趣；后文涉及醉后失序，这里只借懂得彼此的情谊。','friends','table','懂你的兴致，也肯陪你坐坐',
 '“{q}”难得的朋友，是懂你的兴致，也肯陪你坐坐。今天敬你们，愿各自的日子过好，也常能一起说笑。',
 '“{q}”陶渊明这句，说的不是带来多少酒，是朋友懂得自己的趣味。今天能和你们坐一桌，也是这样高兴。这杯敬咱们的情谊，愿忙的时候有底气，闲的时候有兴致，想说话时，总有人听得懂。',
 'To friends who understand what matters to us and gladly make time to share it.','敬懂得彼此趣味，也愿意留时间相陪的朋友。');
p('su-tea','苏轼','浣溪沙·细雨斜风作晓寒','東坡詞_(四庫全書本)','雪沫乳花浮午盏',['wine','reunion'],'雪沫乳花是点茶时的白沫，并非下雪或牛奶；后文春盘有蓼芽／蓼茸异文，本条不引该处。','family','table','茶里有清趣，家常有滋味',
 '“{q}”，苏轼写的是一盏茶。今天咱们也把平常的一顿饭吃得有滋味，祝一家人忙得顺，坐得闲，心里暖。',
 '苏轼写一盏茶，说“{q}”，连茶沫都写得有兴致。日子的滋味，有时就在这些小事里：饭菜合口，家人同桌，能慢慢说几句。这杯敬咱们一家，愿平常有牵挂，相聚有笑声，日子越过越舒心。',
 'To the small pleasures in an ordinary day: a warm cup, a good meal, and our family around the table.','敬平常日子里的小欢喜，也敬一家人同桌相伴。','自主补充收录','《东坡词》四库全书本电子文本',undefined,'词');
p('su-midautumn','苏轼','阳关曲·中秋月','陽關曲（中秋作。本名《小秦王》，入腔即《陽關曲》）','暮云收尽溢清寒，银汉无声转玉盘。',['moon','night','wine','reunion'],'原词中秋赏月，后半有好景难常的感慨；借珍惜团圆，不把云开见月当作现场天气。','family','table','中秋团圆，珍惜眼前',
 '“{q}”今天中秋，借这份月圆的好意，祝咱们一家平安有伴，见面有笑，牵挂常通。',
 '“{q}”苏轼把中秋月色写得很美。今天不论窗外能不能看见月亮，这一桌团圆都很实在。这杯敬咱们一家，愿忙时彼此惦记，闲时常能相聚；月圆是好意头，人安、家暖，才是最好的中秋。',
 'Whether or not the moon is visible, being together makes Mid-Autumn special. To a peaceful family and a warm home.','不论是否见月，同桌相聚就是好中秋，祝家人平安、家中温暖。','《诗酒风流赋华章》中秋线索','PDF 53—54；引句另核苏轼原词',['midautumn'],'词');
p('su-breeze','苏轼','水调歌头·黄州快哉亭赠张偓佺','水調歌頭_(落日繡簾捲)','一点浩然气，千里快哉风。',['friend','wine'],'原词以开阔胸襟面对境遇；用于敬意与自勉，不宣称对方德行完美或借势拍马。','work','leader','敬胸襟，也勉励自己',
 '“{q}”这杯向您致意，也勉励自己做事有担当，心里有坦荡。祝您忙有所成，闲有好心情。',
 '苏轼有句“{q}”，我很喜欢其中的开阔。今天借这一杯向您致意，也提醒自己：遇事认真做，待人坦荡些。祝您手头的事顺利，生活里的好时光也常有；忙有所成，闲有好心情。',
 'With sincere respect, and a wish to meet our work with courage and openness. May your days be rewarding and happy.','致以敬意，也愿自己认真担当、坦荡待人，祝您工作生活顺心。','自主补充收录','原作电子文本',undefined,'词');
p('huang-friend','黄庭坚','寄黄几复','寄黃幾復','桃李春风一杯酒，江湖夜雨十年灯。',['night','friend'],'原诗怀念远方友人，回望相聚与多年别后；不宣称在座恰好十年未见。','friends','table','把想念，落成这次见面',
 '“{q}”朋友之间，总有各自奔忙的时候。难得今天又能同桌，把想念落成见面，这杯值得敬。',
 '“{q}”黄庭坚写远方朋友，一边是相聚的春风，一边是别后的灯火。今天能坐在一起，就把各自奔忙的日子也聊聊。这杯敬你们，愿往后想见的时候，不总隔着一句“改天”；见面有话，分别也惦记。',
 'To turning thoughts of our friends into time spent together, and to keeping room for the next gathering.','敬把想念变成见面，也愿为下一次相聚留出时间。','《中国品酒诗话》','PDF 211');
p('chen-night','陈与义','临江仙·夜登小阁忆洛中旧游','臨江仙_(憶昔午橋橋上飲)','杏花疏影里，吹笛到天明。',['night','friend'],'原词回忆旧游，后半有二十余年与世变之感；此处只借记忆中相聚的美，不要求熬夜尽兴。','friends','table','值得记住的，是一起的人',
 '“{q}”有些聚会，后来记住的未必是吃了什么，是当时身边有谁。这杯敬你们，也敬往后还会有的好时光。',
 '陈与义回忆旧日相聚，写“{q}”。我想，好时光之所以记得住，常常是因为那时身边的人。今天这杯敬你们：愿咱们不只回味从前，也常有新的相聚、新的笑话，往后的日子，还有许多值得记住的时刻。',
 'To the people who make our memories special, and to new moments we will be glad to remember together.','敬让记忆珍贵的人，也盼共同创造新的好时光。','自主补充收录','原作电子文本',undefined,'词');
p('ou-calm','欧阳修','浪淘沙·把酒祝东风','浪淘沙_(歐陽修)','把酒祝东风，且共从容。',['wine','friend'],'原词春游惜别，含聚散匆匆之感；借且共从容邀请自在交谈，不断言春季天气。','dating','table','先把这一席，过得从容',
 '“{q}”今天借这句，不急着把彼此问明白，先把这一席过得从容。敬这次见面，也祝咱们聊得愉快。',
 '“{q}”欧阳修这句，今天最想借的是“从容”两个字。第一次见面，不必急着把故事讲完，也不用每句话都找标准答案。我先敬你，愿咱们说话自在，听得用心，把这一顿饭过得轻松又有意思。',
 'To an easy first meeting, honest conversation, and taking our time to get to know one another.','敬自在的初见、真诚的交谈，也愿彼此从容了解。','自主补充收录','原作电子文本',undefined,'词');
p('zhang-world','张孝祥','念奴娇·过洞庭','念奴嬌_(張孝祥)','尽挹西江，细斟北斗，万象为宾客。',['moon','wine','night'],'原词泛舟洞庭以江水北斗入想象，意境开阔；不是酒量比喻，不说今日场所就是洞庭。','host','table','席可以小，待客的心要宽',
 '“{q}”古人的想象真开阔。今天这一席，地方不论大小，各位都值得我认真欢迎。来，先敬大家。',
 '“{q}”张孝祥把天地都请进了一席，气象真好。今天借这一份开阔欢迎各位：这一桌也许不大，愿大家坐得自在，话题聊得开。先敬你们，愿今日有欢，来往有情，以后还常能同席。',
 'Welcome to this table. May there be room for everyone, generous conversation, and many more gatherings.','欢迎同桌，愿彼此自在、交谈开阔，以后常有相聚。','《中国品酒诗话》','PDF 40为北斗酌酒线索；原词另核',undefined,'词');
p('zhang-autumn','张孝祥','西江月·阻风山峰下','https://css.hunan.gov.cn/tslm/hxws/wssy/201602/sxrj_52819/201607/t20160728_3107871.html','满载一船秋色，平铺十里湖光。',['moon','friend'],'原词行舟遇阻风仍赏秋景；借从容与发现好意，不把今天不顺视为已知经历；题有山峰／三峰写法。','general','table','把日子过宽一点',
 '“{q}”张孝祥连路上的停顿都看出好景致。今天借这份从容敬大家，愿做事有收获，生活也留得下兴致。',
 '“{q}”张孝祥行舟遇风，仍能写出这样的兴致。我喜欢这份从容：事情慢慢做，日子也要好好过。今天这杯敬各位，愿手头的事有进展，心里的弦不总绷紧，忙碌之外，也常有能坐下来相聚的好时候。',
 'To steady progress, a little room to breathe, and keeping our curiosity and joy in everyday life.','愿做事有进展，生活有余地，日常也保有兴致。','自主补充收录','湖南省文史研究馆公开原词',undefined,'词');
p('lu-tea','陆游','临安春雨初霁','臨安春雨初霽','矮纸斜行闲作草，晴窗细乳戏分茶。',['wine','friend'],'原诗临安客居中有烦闷，也有作草分茶的闲景；只取片刻闲趣，不说全诗是安逸生活。','work','table','认真之外，也有闲趣',
 '“{q}”做事认真，也别把生活过得只剩做事。这杯敬大家，愿工作有好结果，闲下来也有自己的小兴致。',
 '陆游写“{q}”，在忙乱的人生里，留了一点写字、喝茶的闲趣。今天敬各位，也送一份这样的祝愿：工作认真做，饭也认真吃；手头有好结果，心里有小欢喜，别总把轻松留到很久以后。',
 'To good work, small pleasures, and making room for a life we enjoy beyond our responsibilities.','敬把事做好，也愿责任之外留有自己的小欢喜。');
p('cha-stars','查慎行','舟夜书所见','舟夜書所見','微微风簇浪，散作满河星。',['night','moon'],'诗里渔灯倒影被水波散作星点，并非满河真有星；借细小善意使相聚发亮。','meeting','table','各带一点光，照亮这一桌',
 '“{q}”一盏渔灯，能照出满河星意。今天各位带来一点故事、一点笑声，也就照亮了这一桌。敬新相识。',
 '查慎行写“{q}”，一盏小小渔灯，在水里散成了星光。今天借这份诗意敬各位：我们还不算熟，各自带来一点故事、一点笑声，这一桌就慢慢热起来了。愿这次相识轻松愉快，往后见面，也能自然地打声招呼。',
 'To the stories and laughter each new person brings, and to getting acquainted one warm conversation at a time.','敬每个人带来的故事与笑声，也愿相识从温暖交谈开始。');
p('dai-reunion','戴叔伦','客夜与故人偶集','客夜與故人偶集','还作江南会，翻疑梦里逢。',['night','friend','reunion'],'原诗异地偶逢故人，有惊喜也有羁旅惜别；借相见的珍惜，不编造今日巧遇或共同故乡。','friends','table','见面这件事，要认真高兴',
 '“{q}”古人重逢，欢喜得像在梦里。今天咱们踏踏实实坐到一桌，这件事，也值得认真高兴。敬你们。',
 '戴叔伦写“{q}”，故人相见，那份高兴很真。今天咱们能坐在这一桌，就别急着把话都说成客套。这杯敬你们，愿各自的近况都有人愿意听，往后的生活也有更多好消息，值得再约一顿饭慢慢聊。',
 'To the simple happiness of seeing one another, hearing how life has been, and making plans to meet again.','敬见面的欢喜、认真听取的近况，也盼再聚。');
p('xu-light','徐志摩','偶然','偶然','在这交会时互放的光亮！',['night','friend'],'原诗写短暂相逢与各自方向，既有光亮也有离散；只借相遇的善意，不转为恋爱或长久承诺。','meeting','table','相识，也能互相添一点光',
 '徐志摩写“{q}”今天刚认识，先借这份光亮敬各位：愿这一桌有真话、有笑声，往后来往也自然。',
 '“{q}”徐志摩写相逢，留下这样一句。今天我们各带着自己的生活坐到这里，不用急着熟悉，先认真聊几句，彼此添一点见闻，也添一点笑意。这杯敬各位，愿这次相识舒服，往后的来往自然。',
 'To the light a new encounter can bring: a story, a kind word, or a shared laugh. It is good to meet you.','敬初次相遇带来的故事、善意与笑声，很高兴认识各位。','自主补充收录','1926年作品电子文本',undefined,'现代诗');

// Relationship-specific complete drafts share the poem source but keep distinct stable IDs.
function more(sourceId:string,id:string,scene:Scene,target:Target,title:string,short:string,full:string,english:string,translation:string,festivals?:Festival[]){
 const base=collectedToasts.find(t=>t.source==='poem-'+sourceId)!;const q=collectedSources[base.source].original!;
 collectedToasts.push({...base,id:'verse-'+id,scene,target,title,short:short.split('{q}').join(q),full:full.split('{q}').join(q),english,translation,festivals:festivals||base.festivals});
}
more('bai-invite','bai-invite-friends','friends','table','有空相陪，比好酒难得',
 '“{q}”这一问里，最暖的是想和朋友待一会儿。今天谢谢你们来，愿咱们总有话可聊，也总有空再聚。',
 '“{q}”白居易问的像是一杯酒，其实也问：能不能来坐一会儿？今天有你们同桌，这份高兴就很实在。这杯敬咱们的交情，愿往后的日子，再忙也有人惦记，再累也有人愿意听几句。',
 'To friends who make time to sit with us, listen, and share an ordinary evening.','敬愿意留时间相陪、愿意倾听的朋友。');
more('li-rest','li-rest-leader','work','leader','做事有收获，生活有闲处',
 '“{q}”我借“得所憩”这份心意敬您：愿忙时有收获，闲时有好兴致，工作生活都顺心。',
 '李白写“{q}”，难得的不只是相聚，也是能歇下来好好说话。今天这杯向您致意，祝您忙时有收获，闲时有好兴致。我也勉励自己，把事做扎实，把人处真诚，让用心落在平常里。',
 'With respect. May your work be rewarding and your leisure restful and enjoyable.','致以敬意，愿您忙有所得、闲有所乐。');
more('tao-reading','tao-reading-leader','work','leader','借一席，学一点见识',
 '“{q}”今天借这一席，也想多学一点见识。这杯向您致意，愿您事顺心宽，我也愿认真学、踏实做。',
 '陶渊明说“{q}”，我喜欢这种能相互启发的交谈。今天有机会同席，也想多听听您的见闻。这杯向您致意，祝您所行顺遂，生活舒心；我也愿把听到的好见识，慢慢化成自己做事的用心。',
 'With sincere respect, and a wish to listen carefully, learn thoughtfully, and put good ideas into practice.','致以敬意，也愿认真听、用心学，把见识落到行动里。');
more('du-lamplight','du-lamplight-elder','family','elder','相陪，是最实在的祝愿',
 '“{q}”今天能坐在您身边，说几句家常，就很高兴。这杯敬您，愿您少点操心、多点舒心，咱们常相聚。',
 '“{q}”杜甫把重逢写得很珍重。我今天借这句，敬与您同桌的这一刻。好话不只留在杯里，以后也想多留些时间，坐下来陪您说说近况。祝您每天过得舒心，也愿咱们多有这样的团圆。',
 'To the pleasure of sitting with you, hearing your news, and making more time to be together.','敬与您相陪的时光，也愿以后常能坐下来聊家常。');
more('qian-tea','qian-tea-guest','thanks','host','好款待，让人自在',
 '“{q}”茶也好，酒也好，今天最难得的是这份自在。敬主人，谢谢你的款待，愿以后常有这样的相聚。',
 '“{q}”钱起写茶宴，有一种不拘束的清趣。今天坐在这里，也很喜欢这份自在：不用找场面话，饭吃得舒心，话聊得投缘。这杯我敬主人，谢谢用心张罗，也愿你往后的日子常有朋友相伴。',
 'Thank you for a warm, relaxed gathering. May the welcome you offer bring you good company in return.','谢谢温暖自在的款待，也愿你常有好朋友相伴。');
more('cha-stars','cha-stars-thanks','thanks','table','一点善意，也能亮很久',
 '“{q}”一点灯光，能照出满河星意；一份善意，也能让人记很久。今天这杯，认真谢谢你。',
 '查慎行写“{q}”，小小灯光，也能照出动人的景致。今天借这句说声谢谢：有些好意，未必要多大，却能让人心里亮很久。这杯敬你，愿你的认真也常被人看见，你的善意也常有人回应。',
 'Thank you for a kindness that stays with me. May your care be noticed and warmly returned.','谢谢这份会记在心里的好意，也愿你的用心被看见、被回应。');
more('dai-reunion','dai-reunion-farewell','farewell','table','这一席道珍重，也盼再相逢',
 '“{q}”今天先把再会的心意送给你。愿新的一程顺当，下次同桌，咱们都有好故事可讲。',
 '戴叔伦写重逢，说“{q}”。今天送你一杯祝愿，也提前盼下一次见面。愿你新的一程顺当，忙有所得，闲有所乐；各自过好日子，再相聚时，把新故事慢慢讲给彼此听。',
 'Safe travels and good days ahead. We look forward to meeting again and sharing the stories that come next.','祝新一程顺利，也盼再会时有新故事可聊。');
more('ou-calm','ou-calm-farewell','farewell','table','前路从容，来往有情',
 '“{q}”这一杯祝你，前路走得稳，心里留得宽。相聚有时，情意常在，咱们下回再会。',
 '欧阳修说“{q}”，词里有惜别，也有想把好时光留住的心。今天咱们认真道一声珍重，祝你往前走得稳，遇事想得开；带着自己的兴致出发，也带着朋友的牵挂。下次同席，再把一路的见闻说给我们听。',
 'To steady steps, an open heart, and knowing that friends will be glad to hear your stories when we meet again.','愿前路稳当、心里开阔，也记得朋友盼听你的新见闻。');
more('su-cupmoon','su-cupmoon-dating','dating','table','借杯中月，敬初次相识',
 '苏轼写“{q}”今天借一点诗意，敬这次相识。不急着熟，先好好聊，愿咱们都自在。',
 '“{q}”苏轼的想象很有趣，把月光也请进了杯里。今天借这点诗意，敬我们初次见面的缘分。不急着把故事讲完，也不用把话说得太满；聊得舒服，听得用心，这一席就很好。',
 'To a little poetry, an easy conversation, and taking our time to get acquainted.','敬一点诗意、一份自在，也愿从容了解彼此。');
more('xu-light','xu-light-dating','dating','table','初见有光，相处从容',
 '“{q}”借徐志摩这句，敬今天初见的好心情。希望咱们聊得自在，也都能自在做自己。',
 '徐志摩写“{q}”。今天借这份相遇的光亮，不急着给彼此什么答案，先认真说话，也认真听对方说。很高兴认识你，这杯敬初见，也祝咱们把这一顿饭过得轻松愉快。',
 'It is good to meet you. Here’s to honest words, attentive listening, and feeling free to be ourselves.','很高兴认识你，愿交谈真诚、倾听认真，也自在做自己。');
more('xu-light','xu-light-reply','reply','table','你的好话，也添了一点光',
 '“{q}”你的好话，正给这次相聚添了一点光。谢谢你，我也敬你，愿你往后的日子常有暖意。',
 '徐志摩写“{q}”，今天你的这份祝福，也给这一桌添了暖意。谢谢你把好话送给我，我也认真回敬一杯：愿你的用心常被人看见，忙的事慢慢有结果，平常的日子也不缺开心。',
 'Thank you for adding warmth to this gathering. May your efforts be seen and your days bring good news.','谢谢给相聚添暖，也愿你的用心被看见，日子常有好消息。');
more('su-midautumn','su-midautumn-elder','family','elder','中秋敬您，团圆常在',
 '“{q}”今天中秋，借月圆的好意敬您。愿您日子舒心，家常有伴，咱们不只过节才团圆。',
 '“{q}”苏轼的中秋月，写的是好景，也让人珍惜眼前相伴。今天这杯敬您，愿您少一点操心，多一点舒心；以后咱们多留些时间坐一桌，不只过节才团圆，平常也常来陪您说说话。',
 'On Mid-Autumn, warm wishes to you. May we make time to be together on ordinary days as well as holidays.','中秋敬您，也愿平常日子多些相陪，不只节日才团圆。',['midautumn']);
more('bai-moonfriend','bai-moonfriend-friends','friends','table','月圆有期，朋友常聚',
 '“{q}”今天中秋，敬同桌的朋友，也念远方的朋友。愿咱们各自安好，来往不断，下次相聚早点有期。',
 '“{q}”白居易中秋念友，隔着千里也把心意送到。今天有些朋友在眼前，有些朋友在远方，都值得惦记。这杯敬咱们的交情，愿各自过得好，想念有回音，月圆有期，相聚也常有期。',
 'To friends near and far this Mid-Autumn. May our lives be good and our next gathering come soon.','中秋敬远近朋友，愿各自安好，也愿下次相聚早些到来。',['midautumn']);
more('li-askmoon','li-askmoon-midautumn','host','table','中秋这一席，先敬来的人',
 '“{q}”今天中秋，先敬愿意来同桌的各位。愿月圆添好意，相聚暖人心，往后来往常有。',
 '李白说“{q}”。今天中秋，我先借这份好愿欢迎大家。窗外有没有月色都不妨碍这桌团圆，有人肯来，有话可聊，就是过节的好光景。这杯敬各位，愿今夜有欢，来往有情，往后的好日子也常能一起分享。',
 'Welcome this Mid-Autumn. Your company makes the gathering special, whether or not we can see the moon.','欢迎中秋同桌，不论能否见月，相伴就是好光景。',['midautumn']);
more('bai-history','bai-history-leader','work','leader','敬见闻，也敬认真倾听',
 '“{q}”借古人的雅兴，今天也想多听听您的见闻。这杯向您致意，愿您事顺心宽，我也愿多学、多做。',
 '白居易写朋友席间谈经史：“{q}”今天借这一份雅兴向您致意，也想多听听您的见闻。祝您工作顺心，生活有趣；我也愿认真听、踏实学，把增长的见识落到平常做事里。',
 'With respect, and a wish to learn from good conversation and put what I learn into practice.','致以敬意，也愿在交谈中增长见识、落实行动。');
more('qian-tea','qian-tea-thanks','thanks','table','谢这份相待，不论杯中物',
 '“{q}”古人以茶相聚，也能心满意足。今天不论杯里是什么，这声谢谢都认真：愿你的用心常有回响。',
 '“{q}”钱起写茶宴，杯里不必是酒，也能尽得相聚的兴味。今天我也借这一杯认真说声谢谢。好意不在东西轻重，贵在愿意把人放在心上；愿你往后的日子，也常遇到真诚相待的人。',
 'Thank you for treating me with care. Whatever is in the cup, the gratitude is sincere.','谢谢这份认真相待，杯中无论是什么，感谢都真诚。');
more('wei-kindness','wei-kindness-reply','reply','table','接住心意，也回敬牵挂',
 '“{q}”你的祝福我收到了，这份心意很暖。我也敬你，愿有人常惦记你，也愿好消息常找到你。',
 '“{q}”韦应物写的是惦记朋友。今天你的这份祝福，我也认真收下，心里很暖。我回敬你一杯，愿你忙的时候有好结果，歇下来的时候有好心情；你的好意，也常有人放在心上。',
 'Thank you for your warm wishes. May you be remembered with the same care and find joy in ordinary days.','谢谢暖心的祝愿，也愿你被同样认真地惦记。');
more('du-lamplight','du-lamplight-table','general','table','这一席相聚，值得珍惜',
 '“{q}”今天也借这份珍惜敬各位：能同桌，是缘分；愿往后的来往，有真话，也有笑声。',
 '杜甫重逢故人，写“{q}”。今天借这份珍惜，敬在座各位。相聚不一定要等一个多大的理由，愿意留点时间坐到一桌，就已经很好。这杯祝大家忙有所获，闲有所伴，往后的来往也总有真诚。',
 'To the time we make for this gathering, and to good company, honest words, and laughter in the days ahead.','敬为相聚留出的时间，也愿往后有真话、有相伴、有笑声。');

// Reading help for the less familiar words, attached to the relevant complete drafts.
const pronunciation:Record<string,string>={
 'poem-su-cupmoon':'“劝君”在这里借诗意邀请，不要求饮尽。',
 'poem-li-spring':'羽觞读yǔ shāng，是一种酒杯；在引句后停一下，再说今天的欢迎。',
 'poem-li-rest':'憩读qì，歇息；“得所憩”后稍停，接到愿大家能歇一歇。',
 'poem-li-stars':'河星指银河中的星；借相聚有余味，不要求大家聊到天明。',
 'poem-du-meal':'翦读jiǎn，通“剪”；间读jiàn，是掺入；粱读liáng。',
 'poem-zhang-world':'挹读yì，舀取；北斗在诗里被想象为酒器；三小句各停一下。',
 'poem-bai-next':'酝读yùn，酿成的酒；“更待”说的是把下次相聚放在心上。',
 'poem-cen-joke':'榆荚读yú jiá，也叫榆钱；先解释像钱的树果，再笑着接心意。',
 'poem-qian-tea':'流霞是传说中的仙酒；取茶席有清趣，不作饮品功效比较。'
};
for(const t of collectedToasts)if(pronunciation[t.source])t.tip=pronunciation[t.source]+' '+t.tip;
// When a quoted clause continues into our sentence, place its comma outside the quotation.
for(const t of collectedToasts){t.short=t.short.replace(/。”，/g,'”，');t.full=t.full.replace(/。”，/g,'”，');}
