import {editorialRevisions} from './editorial-revisions';
import {expansionToasts} from './expansion-06';
import {contextualToasts} from './contextual';
import {readingToasts} from './reading-batch';
import {spokenToasts} from './spoken';
import {collectedToasts} from './poetry-expanded';
import {culturalToasts} from './cultural';
import type {Toast,Scene,Target} from '../core/types';
// All speeches are independently edited after reading; quoted fragments are tracked in sources.ts.
function entry(id:string,scene:Scene,title:string,source:string,short:string,full:string,english:string,translation:string,tip:string,tone:'poetic'|'fun'='poetic',target:Target='table',seasons?:string[]):Toast {
 return {id,version:1,scene,target,title,source,kind:!['rhythm','thanks','season','farewell','family'].includes(source)?'引句后整理':'依据表达方法整理',short,full,english,translation,tip,tone,...(seasons?{seasons}:{})};
}
export const toasts:Toast[] = [
 entry('general-01','general','相逢有幸','rhythm','相逢有幸，同席有缘；愿此刻有欢，来日有盼。','一席相聚，是忙碌日子里难得的留白。借这一杯，敬今日相逢，也祝来日顺遂。愿大家心中有暖，脚下有路；行有所获，归有所安。','To the pleasure of meeting, and to good things ahead.','敬相聚的欢喜，也祝前路有美好。','停顿放在“心中有暖／脚下有路”之间。'),
 entry('general-02','general','杯中见心意','rhythm','杯中有深浅，心意无轻重；愿大家所行皆坦荡，所遇多温良。','杯中有深浅，心意无轻重。今天与大家同席，借这一杯送一份祝愿：愿忙碌有所成，闲暇有所乐；眼前有相聚，往后有好音。','May our work be rewarding and our time together joyful.','愿忙碌有收获，相聚有欢喜。','不必加快，两个“有所”读出同样的节奏。'),
 entry('general-03','general','话短情长','rhythm','我的话可以短，祝福一定长：愿大家日日有喜，岁岁有光。','突然轮到我，先把长篇大论留给下回。今天话说短一点，心意放长一点：愿大家忙得有收获，闲得有滋味；好事常登门，好朋友常见面。','A short toast, but a lasting wish: good days and good company.','话虽短，祝愿长：愿日子好，身边有人相伴。','开头可以笑着说，停一下再接祝福。','fun'),
 entry('work-table-01','work','同席，也同行','thanks','敬前辈的见识，敬同事的用心；愿我们议事有方，行事有成。','今天借这一杯，敬前辈的见识，也敬同事的用心。同席是缘分，同行靠彼此。愿我们往后议事有方、行事有成；各尽所长，也相互成全。','To shared effort, thoughtful guidance, and good work ahead.','敬共同的努力、用心的指引，也祝未来工作顺利。','敬全桌时目光照顾大家，不只望着领导。'),
 entry('work-table-02','work','把敬意给全桌','rhythm','一席相聚，多一分了解；一路同行，多一分照应。愿大家所谋有成，所行有得。','一席相聚，多一分了解；一路同行，多一分照应。借今天这杯，向在座各位致意。愿我们做事有章法，相处有温度；把眼前的事做好，也把往后的路走稳。','To understanding one another and moving forward together.','敬彼此了解，也祝一路同行。','普通参与者口吻，不代表公司宣布目标。'),
 entry('work-table-03','work','稳稳向前','thanks','愿我们做事有分寸，同行有默契；每一步走得稳，每一程走得远。','今天不说大话，只送一份实在的祝愿：愿我们做事有分寸，同行有默契；难题有人商量，好消息一起分享。敬大家，愿往后的每一步，走得稳，也走得远。','May we face challenges together and share the good news.','愿难题一起面对，好消息共同分享。','“不说大话”轻轻带过，不暗指别人夸张。','fun'),
 entry('work-leader-01','work','敬意与自勉','thanks','这一杯向您致敬：愿您行事从容，也愿我勤学笃行。','今天借这一杯，向您致一份敬意。愿您谋事有方，行事从容；也愿我勤学笃行，做事更周全，待人更真诚。以这杯为意，祝您顺遂，也勉励自己继续向前。','To you, with respect, and to learning through thoughtful work.','向您致敬，也以用心做事勉励自己。','适合晚辈或下属单独致意，不虚构受过提携。','poetic','leader'),
 entry('work-leader-02','work','学有所得','rhythm','敬您一杯，愿您所行顺意；我也愿多学一分见识，多尽一分心力。','能在这一席向您致意，我很珍惜。借这一杯，祝您所行顺意，所谋有成。我也愿多学一分见识，多尽一分心力，把敬意放在杯中，把用心落在事上。','With respect and warm wishes. May I keep learning and do my work well.','致以敬意和祝愿，也愿自己不断学习、认真做事。','“把用心落在事上”慢下来，收尾有落点。','poetic','leader'),
 entry('work-leader-03','work','话不多，意不轻','thanks','话不多，意不轻；敬您一杯，愿您事事从容，日日顺心。','轮到我，我就不把饭局开成汇报会了。话不多，意不轻：敬您一杯，愿您事事从容，日日顺心。我也提醒自己，少一点空话，多一点实干。','A few words, with sincere respect. Wishing you calm and rewarding days.','话不多，敬意真；祝您从容顺遂。','只在气氛轻松时用，自嘲指向自己。','fun','leader'),
 entry('friends-01','friends','把酒话桑麻','reunion','古人把酒话桑麻，我们举杯叙日常；愿各有奔忙，也常有相聚。','孟浩然写“把酒话桑麻”，老朋友的好，就在能把平常日子聊得有滋有味。今天借这一杯，愿我们各有奔忙，也常有相聚；说得了心事，接得住笑话，往后还有许多这样的时光。','To everyday stories, familiar laughter, and many more gatherings.','敬日常的故事、熟悉的笑声，也盼更多相聚。','适合熟朋友；桑麻原指农事，这里转到日常闲谈。'),
 entry('friends-02','friends','相聚不必等改天','reunion','把酒话桑麻，举杯叙近况；愿改天有日期，下次有着落。','古人“把酒话桑麻”，咱们今天聊聊近况，也挺风雅。借这一杯祝大家：忙有所得，闲有所乐；更祝下次聚会，改天有日期，约饭有下文。','May “sometime soon” become a date on the calendar. Cheers to meeting again.','愿“改天再聚”真有日期，敬下一次见面。','最后一句留一点笑意，不点名指责谁失约。','fun'),
 entry('friends-03','friends','秋意自开阔','autumn','我言秋日胜春朝；愿各自有收获，相聚有欢笑。','刘禹锡说“我言秋日胜春朝”。秋天也可以明朗开阔。借这一杯，愿我们各自的忙碌都有收获，相聚的时候都有欢笑；把好日子过得有滋味，把好朋友放在心上。','To a generous autumn, meaningful work, and the joy of old friends.','祝秋日丰盈、忙碌有意义，也敬老友相聚之乐。','仅在秋季推荐；不把诗中晴空当作现场天气。','poetic','table',['秋']),
 entry('meeting-01','meeting','由初见到相知','rhythm','初见是缘，交谈是桥；愿这一席有笑语，往后的日子有好音。','今天的名字刚刚记下，彼此的故事才开了个头。借这一杯，敬初见的缘分，也祝这份相识：聊得从容，来往自然；此刻有笑语，往后有好音。','To new faces, good conversation, and friendships that grow naturally.','敬新相识、好交谈，也愿情谊自然生长。','适合混合社交，不默认异性之间有恋爱意图。'),
 entry('meeting-02','meeting','新名字，新故事','rhythm','一席新相识，几分好兴致；愿彼此聊得尽兴，来往随心。','今天添几个新名字，也听几段新故事。相识不必急，投缘自会近。借这一杯，愿大家聊得尽兴，来往随心；把初见的生分，慢慢换成再见的熟悉。','Here’s to good conversation and getting to know one another.','敬愉快交谈，也敬慢慢了解彼此。','“相识不必急”平稳说，不渲染暧昧。'),
 entry('meeting-03','meeting','先把生分放一放','rhythm','名字可以再记一遍，笑声不妨先多一点；敬今天的新相识。','名字如果没记全，待会儿请允许我再问一遍。先借这一杯，祝大家说话不用打草稿，聊天不用找标准答案。愿今天开个好头，往后见面，都能自然地说声“又见面了”。','To easy conversation, a few laughs, and meeting again.','敬轻松交谈、几声欢笑，也盼再会。','轻松破冰，笑点留在自己的记性上。','fun'),
 entry('dating-01','dating','相识，留一点从容','rhythm','初见有礼，相处随心；愿今天聊得愉快，往后各有欢喜。','第一次见面，能坐下来好好说话，就已经是很好的开始。借这一杯，敬今天的相识。愿我们都从容一点，真诚一点；此刻聊得愉快，往后的日子各有欢喜。','To a lovely first meeting and an easy, honest conversation.','敬美好的初见，也愿交谈轻松真诚。','初次相亲或约会，不暗示已确立关系。'),
 entry('dating-02','dating','把故事慢慢讲','rhythm','相识有缘，了解有时；愿好故事慢慢讲，好心情慢慢来。','彼此的故事都很长，今天先从这一席慢慢认识。借这一杯，愿我们说话自在，听得用心。相识有缘，了解有时；愿今晚留下一份愉快，也留一点期待。','To taking our time, listening well, and enjoying this evening.','愿慢慢了解、认真倾听，享受此刻相聚。','“期待”点到为止，不替对方许诺再见。'),
 entry('dating-03','dating','先敬轻松','rhythm','今天先敬轻松：问题不必像面试，答案不必像简历。愿我们聊得自在。','今天先敬轻松一杯：问题不必像面试，答案不必像简历。愿我们少一点标准答案，多一点真实想法；吃得合口，聊得投缘，把这次见面过得自在一点。','Less like an interview, more like a good conversation. Here’s to a relaxed evening.','少一点面试感，多一点好交谈；祝今晚轻松愉快。','只有双方气氛已放松时使用。','fun'),
 entry('family-01','family','家常最有味','family','桌上有家常，心里有牵挂；愿长辈安康，家人和乐。','桌上有家常，心里有牵挂。借这一杯，祝长辈安康，祝家人和乐。愿忙碌的时候彼此惦记，闲下来的时候围坐说话；日子不用多热闹，平安相伴就很好。','To our family: good health, warm hearts, and time together.','祝家人安康、心中温暖，也愿多些相聚。','适合长辈在场的家宴；其他家庭状态可换句。'),
 entry('family-02','family','团圆在眼前','family','一桌饭菜，一席团圆；愿家中常有笑，心中常有暖。','一桌饭菜，一席团圆，就是日子里踏实的欢喜。借这一杯，愿家中常有笑，心中常有暖；各自忙碌时顺顺当当，围坐一起时和和美美。','To a warm home, peaceful days, and the happiness of being together.','祝家中温暖、日子平安，也敬团聚的欢喜。','不用默认每个家庭都有子女或夫妻。'),
 entry('family-03','family','把日子过香','family','饭菜趁热，心意趁此刻；愿一家人平安相伴，把日子过得有滋味。','饭菜要趁热，心意也趁此刻说。今天借这一杯，祝一家人吃饭有香气，说话有笑意；平安常在，牵挂常通，把平常的日子过出好滋味。','To warm meals, shared laughter, and ordinary days made special.','敬热饭、笑声，也愿平常日子有滋有味。','轻松亲切，避免变成要求别人承担做饭任务。','fun'),
 entry('host-01','host','我有嘉宾','luming','我有嘉宾，鼓瑟吹笙；今天以一席相聚，谢大家拨冗而来。','《诗经》说“我有嘉宾，鼓瑟吹笙”。今天不敢说有古人的盛宴，却有一份认真待客的心。感谢大家拨冗而来，愿这一席吃得舒心、聊得尽兴；今日相聚有欢，来日往来有情。','Welcome, and thank you for making time to be here. May we enjoy good food and good conversation.','欢迎大家，也感谢拨冗而来；愿饭菜可口，交谈愉快。','主人或明确受托迎宾者使用，普通来宾请选致谢。'),
 entry('host-02','host','待客贵在心','luming','“我有嘉宾”，便是一席好时光；愿大家宾至如归，尽兴而返。','“我有嘉宾”，便是一席好时光。今天把感谢放在杯中，把欢迎放在席上。愿大家不拘束、不见外，吃得合意，聊得开怀；来时有期待，回去有余欢。','Make yourselves at home. Here’s to a welcoming table and a happy gathering.','请大家自在一些，敬这一席温暖相聚。','主人欢迎全桌，避免冒用主办机构身份。'),
 entry('host-03','host','菜有家常，心有诚意','rhythm','菜有家常，心有诚意；欢迎大家，愿这一席有味，也有欢。','今天做东，先把欢迎送到：菜有家常，心有诚意。愿大家把客气放一放，把筷子拿起来；一席吃得有味，一晚聊得有欢。借这一杯，谢大家赏光，也盼往后常来常往。','Welcome to the table. Please enjoy the food, the conversation, and the company.','欢迎入席，请自在享用饭菜、交谈与相聚。','“做东”需确实是主人。','fun'),
 entry('farewell-01','farewell','山水有程，相见有期','farewell','山水有程，相见有期；愿此去一路顺遂，往后常有好音。','今天这一杯，有惜别，也有祝愿。愿此去一路顺遂，遇事从容，遇人温暖。山水有程，相见有期；等下次同席，再把新的故事慢慢讲给彼此听。','Safe travels, good people along the way, and stories to share when we meet again.','祝旅途平安、路遇良人，再见时有故事可讲。','适合普通送行，不预设退休、永久离别或目的地。'),
 entry('farewell-02','farewell','把珍重放进杯里','farewell','把珍重放进杯里，把祝愿送到路上；愿你向前有光，回首有暖。','有些珍重，说得轻，放在心里却很重。今天借这一杯，祝你此去顺意，前路从容。愿向前有光，回首有暖；既有新的风景，也记得我们随时欢迎你回来坐坐。','May the road ahead be kind, and may you always feel welcome here.','愿前路温柔，也愿你一直感受到这里的欢迎。','熟朋友送行，语气温和，不当返乡义务。'),
 entry('farewell-03','farewell','下次带故事回来','farewell','行李装好，祝福带上；下次见面，记得带些新故事回来。','行李你来装，祝福我们来送。愿这一路少些波折，多些顺意；忙有所得，闲有新景。今天先敬你一杯，下次见面，带些新故事回来，我们再慢慢听。','Pack our good wishes too. We look forward to hearing your new stories.','也把祝愿带上，盼下次听你的新故事。','朋友间轻松送行，不安排实际饮量。','fun'),
 entry('thanks-01','thanks','情意有回响','thanks','承一份好意，还一份真诚；借这一杯致谢，愿往来皆有回响。','有些心意，值得认真接住，也值得好好道谢。今天借这一杯，表达我的感谢。愿这一席的情意不只停在杯中，往后的来往，也有照应、有回响。','Thank you for your kindness. May we have many chances to return it.','感谢这份好意，也盼以后有机会回应。','具体帮助可当场补一句真实事项，不自动编造。'),
 entry('thanks-02','thanks','谢这一席款待','thanks','佳肴有味，款待有情；谢谢这份用心，愿往后常有相聚。','今天这一席，佳肴有味，款待有情。借这一杯，认真谢谢主人的用心。愿往后常有这样的相聚：饭菜可以不同，情谊总有回响；话题慢慢说，好日子慢慢过。','Thank you for bringing us together and making us feel welcome.','谢谢你让大家相聚，也让我们感受到欢迎。','来宾感谢主人，主人自己请选择迎宾。'),
 entry('thanks-03','thanks','接住祝福，再敬心意','rhythm','好话我收下，心意敬回来；愿这份祝福，也照亮你的日常。','刚才的好话我认真收下，这一杯把心意敬回来。愿你送来的祝福，也照亮自己的日常；愿我们说好话、做好事，把彼此的日子照应得更温暖。','Thank you for your kind words. May those good wishes come back to you.','谢谢你的祝福，也愿这份美好回到你身边。','用于回敬；未听到别人祝福时请选择其他致谢。','fun')
 ];
// Keep the old entry available to existing v1 shares, but separate replies in new recommendations.
toasts.find(t=>t.id==='thanks-03')!.active=false;
toasts.push(
 entry('general-verse-01','general','一觞一咏，畅叙心意','lanting','古人一觞一咏，畅叙幽情；愿今日同席有欢，来日往来有情。','古人说“一觞一咏，亦足以畅叙幽情”。相聚的好，不只在杯中，也在能坐下来，好好说几句话。今天敬大家：愿忙碌有所得，相处有温度；此刻尽欢，往后顺遂。','To good conversation, thoughtful company, and a warm memory of this gathering.','敬好交谈、好相伴，也愿这次相聚留下温暖的记忆。','觞读shāng；说完引句稍停，再接自己的祝愿。'),
 entry('general-verse-02','general','乐在相逢','welcoming','“有朋自远方来，不亦乐乎？”愿远近都能相聚，心意总有回响。','“有朋自远方来，不亦乐乎？”古人的欢喜，今天这一席也能懂。相聚不论远近，心意总有轻重。借这一杯，愿大家眼前有欢，往后有盼；来往有情，日常有光。','To the joy of meeting, near or far, and to kindness that stays with us.','敬远近相聚的欢喜，也愿心意长留。','引用古句，不声称大家都是远道而来。'),
 entry('work-verse-01','work','敏于行，暖于心','practice','古人说“敏于行”，愿我们把话说真，把事做实；同行有默契，日常有温度。','《论语》讲“君子欲讷于言而敏于行”。今天借这一杯，也给自己提个醒：把话说真，把事做实。愿我们同行有默契，遇事能商量；每一份用心，都慢慢落成看得见的进益。','To thoughtful words, purposeful action, and good work together.','敬真诚的话、踏实的行动，也祝共事顺利。','讷读nè，是言语谨慎；用于自勉，不批评他人话多。'),
 entry('work-verse-02','work','同席，畅叙','lanting','一觞一咏，畅叙心意；愿同席多一分了解，共事多一分默契。','古人雅集，“一觞一咏”，重在畅叙心意。今天难得同席，也愿我们多一分了解，多一分默契。借这一杯，敬大家各有所长，也祝往后共事相互照应，把用心落在事上，把情谊留在心里。','To knowing one another better and bringing our strengths together.','敬更多了解，也愿彼此所长汇成合力。','照顾全桌，不擅自代表公司作承诺。'),
 entry('leader-verse-01','work','见贤思齐','practice','“见贤思齐焉。”敬您一杯，也勉励自己：心有所敬，行有所学。','《论语》说“见贤思齐焉”。今天借这一杯，向您致敬，也勉励自己：心有所敬，行有所学。愿您所行从容、所谋顺遂；我也愿多学一分见识，多做一分实事，把每一步走得更扎实。','With sincere respect, and a wish to keep learning and act with care.','致以敬意，也愿自己持续学习、用心做事。','尊重落在敬贤与自勉，不虚构长期提携。','poetic','leader'),
 entry('leader-verse-02','work','言有分寸，行有用心','practice','古人讲“敏于行”，我愿把敬意落在用心里；敬您一杯，祝您顺遂从容。','古人讲“敏于行”，我也愿以这三个字自勉：言有分寸，行有用心。今天敬您一杯，祝您所谋有成，日常有乐。我会珍惜学习的机会，把该做的事做好，把每一份信任认真对待。','To you, with respect, and to putting care into every task.','向您致敬，也愿自己把每件事做得更用心。','“信任”作为今后做事态度，不宣称已有具体任命或提拔。','poetic','leader'),
 entry('meeting-verse-01','meeting','相逢有乐','welcoming','“有朋自远方来，不亦乐乎？”愿这一席由相识到了解，由生分到自在。','孔子说“有朋自远方来，不亦乐乎？”今天先借古人的欢喜，敬大家的新相识。名字慢慢记，故事慢慢听；愿这一席由生分到自在，往后的来往由客气到真诚。','To learning new names, hearing new stories, and feeling at ease together.','敬新名字、新故事，也愿大家相处自在。','不预设所有人远道而来或已是知己。'),
 entry('meeting-verse-02','meeting','相知，从此刻开始','zhang','古人说“相知无远近”，愿我们先聊得投缘，再慢慢熟悉。','张九龄说“相知无远近”。今天我们还在相识的开头，先把这份开阔的心意借来：愿彼此说话从容，听得用心；不急着熟悉，却愿意了解。敬这一席初见，也祝往后各有好音。','To open minds, attentive listening, and the pleasure of getting acquainted.','敬开阔的心意、认真倾听，也敬相识之乐。','明确刚认识，不把送别诗原有知己关系移植给彼此。'),
 entry('dating-verse-01','dating','一觞之间，慢慢了解','lanting','古人“一觞一咏”，畅叙心意；今天愿我们说得自在，听得用心。','古人“一觞一咏”，就能畅叙心意。今天不必急着把故事讲完，先把这一席过得自在。借这一杯，愿我们说得真诚，听得用心；初见有欢喜，相处有从容。','To honest words, attentive listening, and taking our time to get acquainted.','敬真诚交谈、认真倾听，也愿慢慢了解彼此。','幽情不是专指爱情，不暗示已建立亲密关系。'),
 entry('dating-verse-02','dating','欣于所遇，自在于心','lantingMeet','借古人“欣于所遇”的心意，愿今天聊得愉快，也都自在做自己。','《兰亭集序》里有“欣于所遇”。今天借这四个字，祝我们都能享受此刻的交谈。相识不必急，了解慢慢来；愿说话有真意，听话有耐心，留一份愉快，也留一份从容。','May we enjoy this conversation and feel free to be ourselves.','愿我们享受交谈，也自在地做自己。','只祝此刻愉快，不替对方许诺下一次见面。'),
 entry('family-verse-01','family','以介眉寿，敬长辈','longevity','古人“以介眉寿”，今天愿长辈安康、家人和乐；一席团圆，常有笑颜。','《诗经》有“为此春酒，以介眉寿”，把珍重长辈的心意放进杯中。今天借这份祝愿，敬家中长辈，愿您安康从容，也愿我们多些围坐说话的时光。家常有味，团圆有暖，就是好日子。','To our elders’ well-being, a warm family, and more time together.','祝长辈安康、家人温暖，也愿多些相聚。','眉寿为长寿祝愿，不把酒说成延寿之物；需长辈在场。'),
 entry('family-verse-02','family','家常里的桑麻','reunion','古人“把酒话桑麻”，我们围坐话家常；愿一桌有暖，家人安康。','古人“把酒话桑麻”，说的是田间日常。今天围坐一起，也把心意放进家常里：问一声近况，说几句牵挂。愿家人各自忙得顺意，聚在一起说得舒心；平常的日子，也常有温暖。','To everyday conversations, thoughtful care, and warmth at our family table.','敬家常交谈、彼此牵挂，也祝一家温暖。','这是从原作农事闲谈转到家常的编辑用法，不称原诗写家宴。'),
 entry('farewell-verse-01','farewell','天涯若比邻','bode','“海内存知己，天涯若比邻。”愿此去顺遂，远行仍有牵挂，再见仍有笑语。','王勃说“海内存知己，天涯若比邻”。今天的惜别不必说得太重，珍重却要认真送到。愿你此去顺遂，忙碌有成；相隔的日子，各自安好，下次同席，再把新故事慢慢讲。','Distance need not lessen friendship. Safe travels, and may we meet again with new stories.','距离不必冲淡情谊；祝旅途顺利，再见时有新故事。','适合熟朋友送行，不默认对方赴任。'),
 entry('farewell-verse-02','farewell','前路有知己','gaoshi','“莫愁前路无知己。”愿你带着底气出发，也带着欢喜归来。','高适送友人，说“莫愁前路无知己”。今天也把这份开阔的祝愿送给你：愿前路有人欣赏，遇事自有从容；带着底气出发，也带着欢喜归来。我们这一杯，既道珍重，也盼再会。','May the road ahead bring people who appreciate you, and may we meet again with joy.','愿前路有人欣赏，也盼欢喜再会。','诗意鼓励，不承诺人人认识或必然成功。'),
 entry('farewell-verse-03','farewell','万里尚为邻','zhang','“相知无远近，万里尚为邻。”愿一路顺意，心意常通。','张九龄说“相知无远近，万里尚为邻”。今天借这一杯，愿你的新一程有收获，也有从容。山水有距离，牵挂有回响；往后各自忙碌，也记得有空说说近况。','To a rewarding new chapter and a friendship that stays close across the miles.','祝新的旅程有收获，也愿情谊不因距离疏远。','熟朋友送行，不强求联系频率。'),
 entry('thanks-verse-01','thanks','好意有回应','reciprocate','“投我以桃，报之以李。”承一份好意，还一份真诚；愿往来有情，心意有回响。','《诗经》说“投我以桃，报之以李”。有些好意，不必计较轻重，却值得认真记在心里。今天借这一杯表达感谢；愿往后的来往，我也能以真诚相待，让这份心意有回应、有回响。','Thank you for your kindness. May I return it with the same sincerity.','感谢好意，也愿我以同样的真诚回应。','不计算礼物价值，不暗示利益交换。'),
 entry('thanks-verse-02','thanks','谢这一席嘉意','lumingGuest','“我有嘉宾”，是主人的心意；这一杯，是来宾的感谢。愿款待有回响，情谊有来日。','《诗经》里“我有嘉宾”，写的是主人的厚意。今天我是来宾，就把感谢认真说给主人：谢谢这一席款待，也谢谢让大家相聚的用心。愿这份情谊往后常有回响，好时光常能同享。','Thank you for welcoming us and bringing us together. May there be many more happy gatherings.','感谢款待与相聚的用心，也盼更多欢聚。','明确引用描述主人、随后以客人身份致谢；不冒用主人口吻。'),
 entry('reply-01','reply','好话收下，心意敬回','rhythm','好话我收下，心意敬回来；愿你送来的祝福，也照亮自己的日常。','刚才的好话我认真收下，这一杯把心意敬回来。愿你送来的祝福，也照亮自己的日常；愿我们说好话、做好事，把彼此的日子照应得更温暖。','Thank you for your kind words. May those good wishes come back to you.','谢谢你的祝福，也愿这份美好回到你身边。','先听完对方的话，再自然接住。'),
 entry('reply-02','reply','接一份祝愿，回一份好意','rhythm','承你吉言，也祝你所行顺意；一来一往，情谊更暖。','承你吉言，这份祝愿我记在心里。今天也借这一杯，祝你忙碌有成，闲暇有乐。好意一来一往，日子就多一分温暖；愿我们各自顺遂，也常有相聚。','Thank you for your good wishes. May your days be rewarding and joyful too.','谢谢你的祝愿，也祝你的日子有收获、有欢喜。','“承你吉言”对平辈适用；不指定酒量。'),
 entry('reply-03','reply','投桃报李，祝福相还','reciprocate','“投我以桃，报之以李。”你的好话我收下，我的祝福敬回来。','《诗经》有“投我以桃，报之以李”。今天就借这份善意相还的心意，接住你的祝福，也敬回我的祝愿：愿你所行顺意，所爱有回应；往后的日子，有忙碌的收获，也有相聚的欢喜。','I receive your kindness with gratitude and return my warmest wishes.','感谢这份心意，也回敬真挚的祝愿。','回敬祝福，不把善意变成人情债。'),
 entry('closing-01','closing','话有尽，意有余','rhythm','话有尽，意有余；愿今日相聚有欢，来日往来有情。','好话不必说尽，心意留在杯中。今天这一席，愿大家尽兴，也愿往后的日子顺遂安稳。话有尽，意有余；把欢喜留给今天，把好音留给来日。','May this gathering leave us happy memories and warm wishes for the days ahead.','愿相聚留下好回忆，也把祝福带向来日。','结束自己的讲话，不代表主人宣布散席。'),
 entry('closing-02','closing','祝福留长一点','rhythm','我把话收短，把祝福留长；愿大家日日有喜，往后常聚。','我的话就收到这里，祝福还想留得长一点：愿大家手头的事做得顺，心里的盼慢慢成。今天相聚有欢，往后来往有情；好饭慢慢吃，好日子慢慢过。','I will keep my words short and my good wishes lasting. Here’s to many good days ahead.','话说短，祝福留长；祝前路有许多好日子。','适合轻松收尾，不命令别人继续饮酒。','fun'),
 entry('closing-verse-01','closing','畅叙有余，来日可期','lanting','古人“一觞一咏”，畅叙幽情；我把话收到这里，把祝福留给来日。','古人“一觞一咏”，便能畅叙心意。今天这一席，我把话收到这里，把祝福留给来日：愿各自的生活有好音，彼此的来往有余温；此刻尽兴，往后常聚。','To the stories we have shared and the good days still to come.','敬此刻分享的故事，也祝来日美好。','只结束自己的致辞，不代表全桌结束宴席。')
);

// New target-specific versions keep old shared v1 entries recoverable.
for(const [oldId,newId,target] of [['family-01','family-elder-01','elder'],['thanks-02','thanks-host-01','host']] as const){const old=toasts.find(t=>t.id===oldId)!;old.active=false;toasts.push({...old,id:newId,target,active:true});}
toasts.find(t=>t.id==='family-verse-01')!.target='elder';
toasts.find(t=>t.id==='thanks-verse-02')!.target='host';

// Preserve the original version for shared links while correcting a misleading phrase.
const gatheringV1=toasts.find(t=>t.id==='general-verse-02'&&t.version===1)!;
gatheringV1.active=false;
toasts.push({...gatheringV1,version:2,active:true,full:'“有朋自远方来，不亦乐乎？”相聚不论远近，心意贵在真诚。今天借这一杯，敬此刻同席，也祝往后常聚；愿各位行有所成，归有所安。'});

// Poetry remains in recommendations. Conversational and rhythmic additions supplement it.
// Preserve every old wording; the latest request also reserves specific familiar sources below.
toasts.push(...[...spokenToasts,...culturalToasts,...collectedToasts,...readingToasts,...contextualToasts,...expansionToasts].map(t=>({...t})));
// User explicitly requested less overfamiliar references. Keep these exact versions for review/shares.
const commonReferences=new Set(['welcoming','practice','bode','gaoshi','reciprocate']);
for(const t of toasts)if(t.active!==false&&commonReferences.has(t.source)){t.active=false;t.archiveReason='common';}

// A corrected recommendation never overwrites the wording carried by an old share.
for(const [id,patch] of Object.entries(editorialRevisions)) {
 const old=toasts.filter(t=>t.id===id&&t.active!==false).sort((a,b)=>b.version-a.version)[0];
 if(!old)throw new Error('Editorial revision has no active original: '+id);
 const {reason,...fields}=patch;old.active=false;old.editorialNote=reason;
 toasts.push({...old,...fields,version:old.version+1,active:true,editorialNote:reason});
}
