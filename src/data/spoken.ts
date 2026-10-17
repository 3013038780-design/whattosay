import type {Scene,Target,Toast} from '../core/types';

// Each row is a complete, separately edited speech, never a random splice of fragments.
// Classical quotations use the already checked source registry. English is independently edited.
type Row=[style:'plain'|'verse'|'fun',source:string,title:string,short:string,full:string,english:string,translation:string];
const drafts:Toast[]=[];
function group(key:string,scene:Scene,target:Target,tip:string,rows:Row[]){
 const offset=drafts.filter(t=>t.id.startsWith(`spoken-${key}-`)).length;
 const tea=scene==='dating'?['今天我以茶代酒，咱们随意就好。','我用茶敬你，很高兴今天见面。','杯里是茶，心意一样。']:scene==='farewell'?['今天我以茶代酒，这份珍重一样。','我用茶送你一句珍重，愿一路顺利。','杯里是茶，祝福一样认真。']:scene==='thanks'?['今天我以茶代酒，认真说声谢谢。','我用茶敬这份好意，心里记着。','杯里是茶，这份感谢一样。']:scene==='reply'?['我以茶代酒，也把祝福送给你。','我用茶回敬一份好意，祝你顺心。','杯里是茶，祝福照样送到。']:target==='leader'?['今天我以茶代酒，敬意一样。','我用茶敬您，祝您身体好、心情好。','杯里是茶，祝福是认真的。']:target==='elder'?['我用茶敬您，您多保重。','今天以茶代酒，祝您每天都舒心。','茶也能敬人，这份牵挂一样。']:['今天我以茶代酒，心意都在。','杯里是茶，祝福一样认真。','我用茶陪大家，咱们自在就好。'];
 rows.forEach(([style,source,title,short,full,english,translation],i)=>drafts.push({id:`spoken-${key}-${String(offset+i+1).padStart(2,'0')}`,version:1,scene,target,title,source,short,full,english,translation,tip,tone:style==='fun'?'fun':'poetic',kind:style==='verse'?'引句后整理':'依据表达方法整理',delivery:'spoken',theme:style,teaLine:tea[(offset+i)%tea.length],englishTeaLine:'I’m raising a cup of tea, with the same warm wishes.'}));
}

group('table','general','table','先看看同桌的人，再开口；不用背出致辞的语气。',[
 ['plain','rhythm','能坐到一起，就挺好','能坐到一桌就是缘分。今天别光顾着客气，吃好、聊好，以后有机会咱们再聚。','平时各有各的忙，今天能坐下来吃顿饭，就挺好。我先敬大家，祝各位忙的时候有收获，闲下来的时候，也有人一起吃饭聊天。','Here’s to a good meal, good conversation, and another chance to meet.','敬一顿好饭、愉快的交谈，也盼下次相聚。'],
 ['plain','rhythm','借今天认识大家','今天先把人认熟，把话聊热。敬大家一杯，往后见了面，咱们就算认识了。','今天同桌，有熟面孔，也可能有刚认识的朋友。我就借这杯酒跟大家打个招呼。祝各位日子过得顺心，也希望以后碰见了，都能笑着说一句：咱们一起吃过饭。','To getting acquainted today and greeting each other as friends next time.','敬今天相识，也盼下次像朋友一样打招呼。'],
 ['plain','rhythm','祝点实在的','我祝大家一点实在的：身体好，睡得香，手头的事顺顺当当。来，敬各位。','漂亮话我慢慢学，今天先祝大家一点实在的：累了能歇，忙了有成，回到家还有个好心情。能在这一桌碰杯，是今天的好事，我敬大家。','Good health, restful nights, and a little less worry. Cheers, everyone.','祝大家身体好、睡得好，少一点烦心事。'],
 ['verse','lanting','聊得来，比说得好重要','“一觞一咏”，说到底就是有话可聊。今天我敬大家，愿这顿饭吃完，彼此都更亲近一点。','“一觞一咏，亦足以畅叙幽情。”今天不比谁说得漂亮，聊得来就很难得。我敬大家一杯，祝各位有人说心里话，也常有这样坐下来慢慢聊的好时候。','To conversations that bring us closer and people we can speak openly with.','敬让人亲近的交谈，也愿身边有人可以说心里话。'],
 ['verse','welcoming','相聚就是件高兴事','“有朋自远方来，不亦乐乎？”不管从哪儿来，今天坐到一起，我就很高兴。来，敬大家。','“有朋自远方来，不亦乐乎？”今天借这句话表达一下我的心情：相聚就是件高兴事。谢谢大家这一桌的陪伴，祝各位事顺、人安，往后还有饭可约、有话可聊。','It’s a pleasure to share this table. Here’s to good company and meeting again.','很高兴能同桌，敬有人相伴，也盼再会。'],
 ['verse','lantingMeet','把这一顿饭吃开心','借一句“欣于所遇”：今天碰上大家，是件开心事。我敬各位，咱们把这顿饭吃高兴了。','借一句“欣于所遇”，说说今天这份高兴。事情可以慢慢忙，这顿饭咱们好好吃。我敬在座各位，祝大家生活里多几次这样的相遇，坐得下来，也聊得到一起。','To enjoying this meal and making room for more happy meetings.','敬这一顿饭的愉快，也盼生活里有更多欢喜的相遇。'],
 ['fun','rhythm','临时发言，祝福管够','突然叫我说两句，词儿还没到，祝福先到了：大家吃好、聊好，好事常有！','突然叫我说两句，我这脑子还在找开场白，心里已经开始祝大家好了。今天就说简单点：烦心事少来，好消息多来，朋友常来。来，我敬大家。','My speech may be improvised, but the good wishes are ready. Cheers, everyone!','话是临时想的，祝福是早已准备好的，敬大家。'],
 ['fun','rhythm','话可以短，饭慢慢吃','话我说短点，饭咱慢慢吃。祝大家胃口好、心情好，今天都尽兴！','轮到我了，那我就负责说短一点，让大家多吃两口。祝各位手里的事好办，心里的事好说，桌上的菜合口。来，敬这一桌好心情。','A short toast, more time for dinner. Here’s to good food and good spirits!','话说短一点，多留时间吃饭，祝大家吃得好、心情好。']
]);

group('colleagues','work','table','目光照顾全桌；普通同事说自己的感受，不替团队作承诺。',[
 ['plain','thanks','先把这杯敬给大家','今天这杯敬大家。工作上有事一起商量，吃饭的时候咱们就放松点，祝各位忙得有收获，也过得有滋味。','平时聊工作多，像今天这样坐下来聊聊生活，也挺好。这杯我敬在座各位，祝大家做事顺手、身体健康；工作之外，也别忘了给自己留点开心的时间。','To good work together and a good life beyond work.','敬一起把事做好，也祝工作之外的生活开心。'],
 ['plain','thanks','多聊一点，就多懂一点','同桌吃顿饭，多聊几句，往后共事也多一分了解。敬各位，祝大家工作顺、生活也顺。','工作里认识一个人，和饭桌上认识一个人，感觉还真不一样。今天能多聊几句，我很高兴。敬大家一杯，愿以后有事好沟通，遇到难处有人商量，好消息也能一起分享。','To understanding one another better and keeping the conversation open.','敬更多了解，也愿往后沟通顺畅。'],
 ['plain','rhythm','忙，也要有个好心情','事情做不完，饭总要好好吃。这杯敬大家，祝我们忙有所得，闲有所乐。','事情一件接一件，今天既然坐到一起，就先把这顿饭吃好。我敬各位，祝工作上的认真都有回报，也祝下班以后的日子有意思，别总把好心情留到放假。','May our efforts pay off, and may ordinary evenings bring us joy too.','愿努力有回报，也愿平常的夜晚有开心的事。'],
 ['verse','practice','事做好，人处好','“敏于行”这三个字，我先送给自己：话慢慢学，事认真做。敬大家，愿咱们事做得好，人也处得好。','“君子欲讷于言而敏于行。”今天用这句话提醒我自己：光说漂亮话不算，事情还得认真做。这杯敬大家，祝我们共事能商量，相处能体谅，把事做好，也把日子过好。','To doing our work with care and treating one another with understanding.','敬认真做事，也愿彼此多一分体谅。'],
 ['verse','lanting','饭桌上也多认识一点','借“一觞一咏”的意思，今天咱们好好聊聊。工作上是同事，饭桌上也多认识彼此一点。','借“一觞一咏”，给今天这顿饭添点雅兴。平时大家看见的是彼此忙工作的样子，今天也聊聊各自的生活。这杯敬大家，祝各位工作顺心，回到家也舒心。','To the people behind the job titles, and to happy days at work and at home.','敬工作身份之外的每一个人，也祝工作和生活都顺心。'],
 ['verse','welcoming','同桌就是好机会','“有朋自远方来”，高兴的是相聚。今天同桌也是个好机会，敬大家，往后咱们多了解、多照应。','“有朋自远方来，不亦乐乎？”今天不论远近，能同桌就是个好机会。我敬各位一杯，希望我们在工作里配合得顺，也在生活里记得彼此的好。','To a shared table, better understanding, and looking out for one another.','敬同桌相聚、彼此了解，也愿相互照应。'],
 ['fun','rhythm','今天先聊点轻松的','开会咱们讲重点，吃饭咱们讲开心。这杯敬大家，今天先聊点轻松的。','平时在工作群里，大家都挺有效率；今天坐饭桌上，咱们就别赶进度了。我敬各位，祝手头的难题少一点，生活里的乐子多一点，饭还得好好吃。','Less rushing today, more good conversation. Cheers to all of you!','今天少一点赶进度，多一点好交谈，敬大家。'],
 ['fun','rhythm','这次不发长消息','这次我不发长消息，直接碰个杯：祝各位工作有好结果，下班有好节目！','我今天这段发言，就按“短消息”来：祝大家工作有好结果，下班有好节目，周末有好心情。说完了，来，敬各位，咱们接着吃。','Good results at work, good plans after work, and a cheerful weekend. Cheers!','祝工作有好结果，下班有好安排，周末有好心情。']
]);

group('leader','work','leader','用平常说话的速度；玩笑版本只适合已经熟悉、气氛轻松的场合。',[
 ['plain','thanks','敬意放在这杯里','今天有机会，我单独敬您一杯。祝您身体好、心情好，忙归忙，也多保重。','今天能坐下来聊聊，我很高兴。这杯我单独敬您，祝您工作顺心、身体健康。我话说得简单，敬意都在里面，也希望往后有机会多向您学习。','With respect and warm wishes for your health and happiness.','向您致敬，祝您健康、开心。'],
 ['plain','thanks','话说到，事做到','这杯敬您。好听的话我慢慢学，该做的事我认真做，祝您一切顺心。','我敬您一杯，也给自己提个醒：话说到了，事情也得做到。以后有机会，我会认真听、踏实学。今天先祝您身体健康，工作顺心，忙里也有清闲。','With respect. I hope to keep learning and put that learning into practice.','向您致敬，也愿自己不断学习，把学到的落实到行动。'],
 ['plain','rhythm','先问一声好','平时见面常聊事情，今天先借这杯问声好：祝您工作顺利，生活舒心。','工作场合常常一开口就聊事情，今天在饭桌上，我先向您问声好。祝您工作顺利，也祝您忙了一天，回家能放松、能休息。这杯敬您。','Wishing you success at work and time to rest and enjoy life.','祝您工作顺利，也有时间休息、享受生活。'],
 ['verse','practice','先把自己这一步走好','“见贤思齐”，我愿意把这句话记在心里。这杯敬您，也提醒自己多学一点、把事做扎实一点。','“见贤思齐焉。”今天借这句话敬您，也勉励我自己。要学的还有很多，我先把自己该做的事做扎实。祝您工作顺心、生活舒心，这杯向您致意。','With respect, and a reminder to myself to keep learning and do my part well.','向您致敬，也提醒自己持续学习、认真尽责。'],
 ['verse','practice','敬在心里，用在事上','借“敏于行”三个字给自己提个醒：敬在心里，也要用在事上。敬您，祝您顺心、安康。','“敏于行”，说起来三个字，做起来要下功夫。我就用这三个字提醒自己，少一点想当然，多一点认真做。这杯敬您，祝您身体好，事情也办得顺。','To thoughtful action, with sincere respect and good wishes for you.','敬认真行动，也向您送上敬意与祝福。'],
 ['verse','lanting','今天也聊点轻松的','借“一觞一咏”的雅意，今天也聊点轻松的。这杯敬您，祝您忙得有成，闲得自在。','借“一觞一咏”的意思，今天有机会，也想听听您工作之外的见闻。我敬您一杯，祝您忙得有成、闲得自在，身体和心情都照顾好。','With respect, and a wish for rewarding work and relaxing moments.','向您致敬，祝工作有收获，闲下来能放松。'],
 ['fun','rhythm','祝福先说清楚','今天不把敬酒说成汇报，我先把祝福说清楚：祝您身体好、心情好，工作生活都顺心。','今天我就不把饭桌变成汇报现场了。先把这一杯敬您，祝您身体好、心情好。工作上我认真做，饭桌上也争取把话说得让人听着舒服。','A simple toast today: good health, good spirits, and warm wishes to you.','今天说句简单的祝福：祝您健康、开心，一切顺心。'],
 ['fun','rhythm','句子不长，敬意不少','我这句话不长，敬意可不少。敬您一杯，祝您手头的事好办，心里的事舒坦。','一轮到我，漂亮话还得现想，敬意倒不用准备。我敬您一杯，祝您手头的事好办，心里的事舒坦。也祝咱们今天吃得好，聊得开心。','My words are brief, but my respect is sincere. Wishing you ease and happiness.','话虽简短，敬意是真，祝您顺心、开心。']
]);

group('friends','friends','table','熟朋友可以带点笑意；别把共同经历编进话里。',[
 ['plain','rhythm','先把这顿饭吃高兴','朋友聚一顿，别把自己绷得太紧。今天有话就聊，有菜就吃，敬咱们这一桌的自在。','平时有平时的忙，今天坐到一块儿，咱们就放松一点。开心的事拿出来说说，烦心的事愿意说就说。我先敬你们，祝大家日子过得顺，也别少了见面的机会。','To a table where we can relax, talk freely, and be ourselves.','敬这一桌自在，也愿大家都能放心做自己。'],
 ['plain','rhythm','有空就见，别太客气','大事小事都能聊两句，这样的朋友挺难得。敬你们，有空就见，别太客气。','朋友之间，能说大事，也能聊点没什么要紧的小事，我觉得就挺好。今天这杯敬你们，祝大家各自过得好，也别忙着忙着，就把见面这件事忘了。','To the friends we can share both big news and little everyday stories with.','敬能一起聊大事，也能说日常小事的朋友。'],
 ['plain','rhythm','有好消息，记得说','这杯祝你们都好。以后有好消息记得说，没什么大事，也可以约顿饭。','今天先祝大家都好：忙的事有进展，惦记的人都平安。有好消息，别忘了告诉我们；日子平平常常，也值得约顿饭庆祝一下。来，敬你们。','May good news come your way, and may ordinary days still give us reasons to meet.','愿大家常有好消息，平常日子也有见面的理由。'],
 ['verse','reunion','桑麻换成咱们的近况','“把酒话桑麻”，咱们今天就聊聊近况。饭能吃到一起，话能说到一起，这杯就值得敬。','“把酒话桑麻”，朋友坐下来聊的，本来就是平常事。今天咱们也不用找什么大话题，聊聊最近忙什么、惦记什么。我敬你们，愿往后的日子，有事能商量，没事也能聚。','To everyday stories, easy conversation, and friends who make time for each other.','敬日常小事、自在交谈，也敬愿意相聚的朋友。'],
 ['verse','zhang','各忙各的，也记得彼此','“相知无远近”，咱们各忙各的，也记得彼此。今天先碰杯，下回再慢慢聊。','“相知无远近”，我喜欢这句话里的踏实劲儿。朋友不一定天天见，见了面，话还接得上就很好。今天敬你们，祝大家各自顺利，想聚的时候，也总能约得上。','To friendships that stay close even when life gets busy.','敬忙碌中依然亲近的友情。'],
 ['verse','lanting','聊到一起，就是雅兴','“一觞一咏”，咱们未必会作诗，会聊天也行。敬你们，今天把想说的话慢慢说。','“一觞一咏”，古人有古人的雅兴，咱们有咱们的开心。朋友坐一桌，哪怕说的都是小事，也能聊得有滋味。这杯敬你们，祝以后还有很多这样的晚上。','To evenings made special by familiar voices and good conversation.','敬熟悉的人、聊得来的话，也敬这样的好时光。'],
 ['fun','rhythm','改天，这回算数','今天总算把“改天约饭”过成了今天。来，碰一个，祝咱们下回也别只停在聊天框里！','朋友最容易说的一句话是“改天约”，今天咱们把这话落实了，值得碰个杯。祝大家工作有进展，生活有乐子，下回约饭有日期，不用翻聊天记录找证据。','Here’s to turning “let’s meet sometime” into an actual dinner. Cheers!','敬终于成行的聚餐，也盼下次约饭落到实处。'],
 ['fun','rhythm','先给开心留个位子','烦心事先往旁边坐坐，给开心留个位子。来，敬你们，今天咱们好好吃饭。','今天这一桌，我建议给开心留个位子。烦心事愿意聊，大家听着；暂时不想聊，就先吃点好吃的。来，敬你们，祝咱们都有把日子过得有滋味的本事。','To making room for joy, with friends who listen when we need them.','敬生活里的开心，也敬愿意倾听的朋友。']
]);

group('new','meeting','table','初识先让人放松；不预设对方从远方来或已经是多年好友。',[
 ['plain','rhythm','先认识，再慢慢熟','今天先认识，往后慢慢熟。我敬大家一杯，聊到哪儿算哪儿，咱们别拘束。','今天很高兴认识大家。名字可能还得再记一遍，故事可以慢慢听。我先敬各位一杯，希望这顿饭吃完，下次见面就不用再那么客气了。','It’s lovely to meet you all. Here’s to an easy conversation and meeting again.','很高兴认识大家，祝交谈轻松，也盼再见。'],
 ['plain','rhythm','先碰个杯，打个招呼','借这个杯跟大家打声招呼：很高兴认识各位，今天多聊聊，以后碰见了也好说话。','第一次同桌，我先借这一杯跟大家打个招呼。各位平时忙什么、喜欢什么，有机会都想听听。祝大家今天吃得开心，也希望往后有缘常见。','A toast to saying hello, sharing a little about ourselves, and keeping in touch.','敬今天打个招呼、互相了解，也盼以后保持来往。'],
 ['plain','rhythm','从一顿饭开始','认识一个人，从一起吃顿饭开始挺好。今天敬大家，愿这次见面轻松愉快。','第一次认识，不一定要说出什么大道理。一起吃顿饭，听听彼此的想法，就已经挺有意思。我敬大家，祝今天聊得舒服，往后见面也能自然地打个招呼。','Getting to know each other over dinner is a lovely place to start. Cheers.','从一起吃饭开始认识彼此，是个很好的开头。'],
 ['verse','welcoming','相聚这份高兴，是真的','“有朋自远方来，不亦乐乎？”今天先借这份高兴，敬新认识的各位，咱们慢慢聊。','“有朋自远方来，不亦乐乎？”我借这句话说一声欢迎，也说一声很高兴认识大家。交情不用着急，先把今天这顿饭吃好，彼此多认识一点。','To the pleasure of meeting new people and letting friendship grow at its own pace.','敬新相识的高兴，也愿友情慢慢生长。'],
 ['verse','lantingMeet','遇见就是个好开头','借一句“欣于所遇”，今天能认识大家，我很开心。这杯敬新相识，也祝各位顺心。','“欣于所遇”，今天借这四个字说说自己的心情。能坐到一桌，本身就是个好开头。我敬大家一杯，愿接下来的交谈轻松一点，以后的来往自然一点。','To a happy first meeting and conversations that come naturally.','敬愉快的初见，也愿交谈自然自在。'],
 ['verse','zhang','不急着熟，先好好聊','“相知无远近”，咱们先从相识开始。敬大家，不急着熟，先好好聊。','“相知无远近”，今天我们刚认识，就先借这份愿意了解彼此的心意。我敬各位，名字慢慢记，话慢慢聊，愿这顿饭过后，多几个见面能笑着招呼的人。','To getting acquainted without a rush and leaving with a few familiar faces.','敬慢慢认识彼此，也愿散席后多几个熟悉的面孔。'],
 ['fun','rhythm','名字再问一遍，也没关系','名字一时没记住，我可能还得再问一遍。先敬大家，咱们把生分聊成不见外。','我先声明一下，名字没记全，待会儿可能还得请教一遍，绝不是不重视。今天先碰个杯，祝各位聊得开心，也希望下次见面，咱们能少客气一点。','If I ask your name twice, please forgive me. Here’s to feeling at ease together!','如果名字问了两次，请多包涵；愿大家相处轻松。'],
 ['fun','rhythm','先不找标准答案','第一次见面，咱们先不找标准答案，聊点自己喜欢的。来，敬新朋友。','初次见面，有时候比开会还容易紧张。今天咱们换个轻松的聊法，说点喜欢吃的、喜欢玩的也挺好。我敬大家一杯，祝这顿饭吃完，笑声比客套话多。','No perfect answers needed today. Here’s to a few laughs and getting acquainted.','今天不用标准答案，敬几声欢笑，也敬认识彼此。']
]);

group('date','dating','table','初见保留余地；把话说给面前的人听，不替对方许诺下一次见面。',[
 ['plain','rhythm','今天先聊开心','很高兴今天见到你。咱们不着急，边吃边聊，把这顿饭吃开心就好。','第一次见面，能坐下来聊聊，我挺高兴的。不用急着把所有事都说完，先从喜欢的东西慢慢聊起。这一杯，敬今天的相识，希望你也吃得舒服、聊得自在。','It’s lovely to meet you. Let’s enjoy dinner and take our time getting acquainted.','很高兴认识你，愿我们好好吃饭、慢慢了解。'],
 ['plain','rhythm','说点真的，比说得好重要','漂亮话我可能说不多，不过很高兴认识你是真的。敬今天的见面，咱们自在一点。','第一次见面，我也想留个好印象。不过想来想去，还是说点真的比较好：很高兴认识你，也愿意听你慢慢讲自己的故事。这杯敬你，祝今天是个轻松愉快的晚上。','I’m glad to meet you, and I’d love to hear your stories. Here’s to a relaxed meal.','很高兴认识你，也愿意听你的故事，祝今天轻松愉快。'],
 ['plain','rhythm','别把见面弄得太累','今天先不急着聊出什么结论。能吃顿好饭，说几句心里话，就挺好。','两个人第一次见面，难免会想怎么表现才好。今天咱们都放松一点，聊得来就多聊几句，停一停吃点东西也没关系。我先敬你，愿今天的见面是舒服的。','No need to rush to conclusions. Let’s enjoy the meal and feel comfortable being ourselves.','不用急着下结论，愿我们吃得开心，也自在做自己。'],
 ['verse','lantingMeet','有点欣喜，也留点从容','借一句“欣于所遇”：今天见到你，是件高兴事。来，咱们慢慢聊。','“欣于所遇”，这四个字挺适合今天的心情。第一次见面，有点新鲜，也有点期待。我先敬你一杯，希望接下来的话题都聊得自在，也愿你做自己就好。','I’m happy we met today. Here’s to an easy conversation and feeling free to be ourselves.','很高兴今天相识，愿交谈自在，也都能做自己。'],
 ['verse','lanting','心意慢慢聊，就好','借“一觞一咏”的雅意，今天不用急着把故事讲完。敬你，咱们边吃边聊。','“一觞一咏”，让人喜欢的也许就是能好好说话的这段时间。今天不赶着把故事讲完，我愿意慢慢听。这一杯敬你，也祝这顿饭吃得开心。','Here’s to taking our time, listening well, and enjoying dinner together.','敬慢慢交谈、认真倾听，也愿一起吃得开心。'],
 ['verse','welcoming','很高兴，今天认识你','“不亦乐乎”，我今天想借的就是这份高兴。很高兴认识你，先敬这次见面。','“有朋自远方来，不亦乐乎？”我今天借的不是远近，是这份见到新朋友的高兴。这杯敬你，愿我们有话愿意说，也有耐心听对方说，慢慢认识就好。','To a happy first meeting, honest conversation, and listening to one another.','敬愉快的初见、真诚交谈，也愿彼此认真倾听。'],
 ['fun','rhythm','先把面试感放下','今天咱们先把面试感放下，喜欢吃什么，就从吃什么聊起。来，先敬轻松。','第一次见面，要是把问题问成面试，饭菜都快凉了。今天咱们先吃好，聊点真正感兴趣的；偶尔接不上话也没关系。我先敬你一杯，希望你今天过得愉快。','Less like an interview, more like a good dinner. Here’s to a pleasant meal.','少一点面试感，多一点吃饭聊天的自在，祝今天愉快。'],
 ['fun','rhythm','话题想不到，先吃一口','一时想不到聊什么，咱们就先吃一口。好吃的总能帮忙开个头，敬今天的相识。','我刚才想了好几个开场白，还是觉得边吃边聊最自然。要是突然没话题，咱们就先尝尝菜，不用为了热闹硬找话。这杯敬你，很高兴今天能见面。','If we run out of things to say, there’s always the food. I’m glad we met today.','如果一时没话题，就先聊聊饭菜；很高兴今天相识。']
]);

group('family','family','table','像平时和家人说话；不预设谁结婚、谁有孩子或谁负责做饭。',[
 ['plain','family','一家人，好好吃顿饭','一家人坐在一起，饭都吃得香一点。这杯祝大家平平安安，有空就多聚聚。','一家人能围着桌子好好吃饭，就挺让人高兴的。这杯我敬大家，祝咱们各自忙得顺利，也别忘了照顾自己。有时间就见见面，没什么大事，也可以一起吃顿饭。','To our family: peaceful days, good health, and more meals together.','祝一家人日子平安、身体健康，也愿多些一起吃饭的时候。'],
 ['plain','family','都把自己照顾好','这杯不祝别的，就祝咱们都把自己照顾好。出门顺利，回家有笑声，比什么都强。','一家人的心愿，说到底也挺简单：在外面顺利，回到家舒心，想说话的时候有人听。这杯祝大家身体好、心情好，各自把日子过好，聚在一起就更高兴了。','May we take care of ourselves, feel at home, and always have someone willing to listen.','愿我们照顾好自己，回家舒心，也总有人愿意倾听。'],
 ['plain','family','家常话，也值得好好说','平时觉得是一家人，有些好话反而说得少。今天借这杯说一句：愿大家都好，咱们常聚。','因为是一家人，有些关心总觉得不用说，今天就借这杯说出来。愿大家出门有人惦记，回家有人说话；手里的事顺顺利利，平常的日子也能过得热热乎乎。','To the care we sometimes leave unspoken, and to keeping our family close.','敬那些平时没说出口的关心，也愿一家人常亲近。'],
 ['verse','reunion','家常里就有好滋味','“把酒话桑麻”，放到咱家，就是坐下来聊聊家常。这杯祝大家吃得香、过得好。','“把酒话桑麻”，聊的是日常的小事。咱们今天也聊聊近况，说说惦记的事，一家人不用讲得多漂亮。我敬大家，愿平常的日子有滋味，围着桌子的时候有笑声。','To everyday family conversations and the warmth of being together.','敬一家人的家常话，也敬相聚的温暖。'],
 ['verse','lantingMeet','珍惜这一桌人','借一句“欣于所遇”，今天我最想珍惜的就是这一桌人。来，祝咱们都平安、都顺心。','借一句“欣于所遇”，说说今天坐在这儿的高兴。一家人各有各的事，能在这一桌说笑，就值得珍惜。这杯祝大家少点烦心，多点舒心，也给见面多留点时间。','To treasuring the people at this table and making more time for one another.','敬珍惜同桌的家人，也愿多留时间相聚。'],
 ['verse','lanting','有话慢慢说','“畅叙幽情”，在家里也不用说得玄乎，就是有话慢慢说。这杯祝咱们一家，越处越亲。','借“畅叙幽情”四个字，今天咱们把想说的话慢慢说。外面的事情可以先放一放，一家人一起吃饭，就先关心关心彼此。这杯祝大家平安，也祝家里的笑声多一点。','To unhurried conversations and a family that keeps growing closer.','敬慢慢说的话，也愿一家人越来越亲近。'],
 ['fun','family','先别只顾着夹菜','菜要趁热，心里话也趁今天说：祝咱们一家人都好，吃饭有胃口，生活有盼头。','咱们一家人吃饭，最容易忙着夹菜，把好话都忘了说。今天我补一句：祝大家吃饭有胃口，睡觉少操心，日子有点小盼头。来，一起高兴一下。','Good appetites, peaceful nights, and something happy to look forward to. Cheers, family!','祝大家吃得香、睡得好，日子里有开心的盼头。'],
 ['fun','family','把见面排进日程','一家人别只在手机里碰头，吃饭也得排上号。这杯祝大家都顺利，下回咱们再聚。','手机上的消息可以慢慢回，一家人的饭也得找时间吃。今天这杯祝大家都顺顺当当，也给咱们提个醒：有空多见面，哪怕只是吃碗面，也比光发个表情热乎。','To seeing one another in person, even if it’s only over a simple meal.','敬真正见上一面，哪怕只是一起吃顿简单的饭。']
]);

group('elders','family','elder','称呼可以换成自己平时用的称呼；关心说具体一点，不把长辈当成致辞听众。',[
 ['plain','family','您舒心，我们就踏实','这杯敬您。别总惦记别人，也多顾着自己；您吃得好、睡得好，我们心里就踏实。','今天借这杯跟您说句家常话：事情不用样样操心，自己的身体和心情也得顾好。祝您吃得香、睡得安稳，每天都有点开心的事，我们也多找时间陪您聊聊。','To your health and peace of mind. Please take good care of yourself too.','祝您健康、舒心，也请您好好照顾自己。'],
 ['plain','family','陪您慢慢吃顿饭','这杯先敬您。愿您每天都舒心，咱们以后多找时间，像今天这样慢慢吃顿饭。','今天坐在一块儿，能陪您慢慢吃顿饭，我很高兴。好听的话就说一句：愿您身体好、心里舒坦。也提醒我自己，有空多见面，多听您说说话。','To your well-being and to more unhurried time together.','祝您安康，也愿我们多些从容相伴的时间。'],
 ['plain','family','过得高兴，最要紧','祝您身体好，也祝您天天有高兴的事。想吃的吃一点，喜欢的事多做一点，这杯敬您。','这杯我想祝您两件事：身体好，心情也好。日子不光要过得安稳，也得有自己喜欢的事。愿您有空出去走走，想见的人常见，想聊的话有人陪着聊。','May you stay well, enjoy what you love, and have good company around you.','愿您身体好，常做喜欢的事，也总有人相伴。'],
 ['verse','longevity','把长寿祝愿说成家常话','“以介眉寿”，换成咱们的家常话，就是盼您健健康康，咱们还有好多顿饭一起吃。','“为此春酒，以介眉寿。”这份祝愿，今天我也想送给您。说得家常一点，就是盼您身体好、心情好，以后这样的饭，咱们还要一起吃很多回。这杯敬您。','Wishing you many healthy, happy years and many more meals together.','愿您长久健康、开心，也盼往后常常一起吃饭。'],
 ['verse','longevity','长长久久，多些欢笑','借“以介眉寿”这份祝愿，敬您安康长久。也愿咱们家里，多一些像今天这样的欢笑。','借“以介眉寿”这份祝愿，我敬您一杯。长寿是好心愿，眼前也愿您少操一点心，多享一点清闲。以后咱们多聚聚，把平常的日子也过得高高兴兴。','To a long, healthy life, a peaceful heart, and a home full of laughter.','祝您健康长久、心里安稳，也愿家中常有笑声。'],
 ['verse','reunion','多陪您说说家常','“把酒话桑麻”，今天我就想多陪您说说家常。敬您身体好、心情好，咱们以后常坐一桌。','“把酒话桑麻”，聊的都是日常小事。今天跟您坐在这儿，也想多听听您的近况，不用赶着说完。我敬您一杯，祝您生活舒心，也愿我们多有这样坐在一起的时候。','To your well-being and to taking time to listen to your everyday stories.','祝您安康，也愿我们多留时间听您说说日常。'],
 ['fun','family','今天您先负责开心','今天这杯敬您，先给您安排件轻松的事：好好吃饭，好好开心，别什么都替我们惦记。','今天好不容易坐一起，您先把操心的事放一放，负责吃得好、聊得开心就行。这杯敬您，祝您身体好、精神好，往后的日子有自己的乐子，也有我们陪着。','Today, your job is to enjoy yourself. Wishing you good health and plenty of happy moments.','今天您先好好开心，祝您健康，也常有高兴的事。'],
 ['fun','family','好话不能只留到过年','好话不能只留到过年。今天也祝您身体好、心情好，想笑的时候有人陪您一起笑。','平时一说祝福，好像非得等到逢年过节。今天我先提前说：祝您吃得香、睡得好，出门有兴致，回家有笑声。这杯敬您，咱们把平常日子也过好。','Warm wishes shouldn’t wait for a holiday. To your health and happiness, today and every day.','祝福不用等到节日，愿您今天和往后都健康开心。']
]);

group('host','host','table','主人先把客人照顾到；不用自谦菜不好，也不用催客人喝酒。',[
 ['plain','thanks','谢谢大家愿意来','谢谢大家今天来，愿意坐到这一桌，就是给我面子。吃好、聊好，有什么需要尽管说。','今天把大家聚到一起，我很高兴。谢谢各位愿意腾出时间来，到了这儿就别太拘束，想吃什么、想聊什么，咱们慢慢来。这杯先欢迎大家。','Thank you for coming. Make yourselves comfortable, and let’s enjoy the meal.','谢谢大家来，请自在一些，一起度过愉快的时光。'],
 ['plain','rhythm','别光顾着客气','大家今天别光顾着客气，喜欢的菜多吃点，想说的话慢慢说。这杯先欢迎各位。','今天是我做东，先跟大家说声欢迎。饭菜合口，就多吃一点；话题投缘，就多聊一会儿。我先敬大家，愿各位来得高兴，吃得舒心，回去也觉得这趟没白来。','Welcome to the table. Enjoy the food, stay for the conversation, and make yourselves at home.','欢迎入席，愿大家吃得好、聊得来，像在家一样自在。'],
 ['plain','thanks','你们一来，就热闹了','这一桌有人，才有意思。谢谢大家来，今天先把饭吃好，把天聊热，我敬各位。','一顿饭好不好，除了吃什么，也看跟谁吃。今天各位都在，我就觉得这顿饭有意思。先敬大家一杯，谢谢赏光，也希望往后还有很多机会像这样坐一桌。','The people make the meal special. Thank you for being here, and here’s to meeting again.','有你们在，这顿饭才特别；谢谢大家，也盼再聚。'],
 ['verse','luming','嘉宾到了，欢喜就到了','“我有嘉宾”，我今天最想说的就是这四个字。谢谢大家来，今天咱们吃得自在、聊得开心。','“我有嘉宾，鼓瑟吹笙。”古人的排场咱们不讲，珍惜客人的心意是一样的。今天谢谢大家来，这杯先欢迎各位。到了这里别见外，咱们好好吃饭，慢慢聊天。','Welcome, dear guests. It means a lot to have you here. Let’s enjoy this time together.','欢迎各位，大家能来我很珍惜，愿今天相聚愉快。'],
 ['verse','luming','待客的心意，都在这桌上','借“我有嘉宾”表达今天的高兴。饭慢慢吃，话慢慢聊，这杯先敬远近来的各位。','“我有嘉宾”，今天借这四个字说一声欢迎。把各位请来，是想好好聚一聚，不用赶着说场面话。这杯敬大家，愿这顿饭吃完，咱们的交情也更近一点。','To our guests, to an unhurried meal, and to growing closer through conversation.','敬各位来宾，也愿慢慢吃饭聊天，让彼此更亲近。'],
 ['verse','welcoming','有朋相聚，心里就高兴','“有朋自远方来，不亦乐乎？”今天不论远近，大家来了，我就高兴。先欢迎各位。','“有朋自远方来，不亦乐乎？”今天这句话，我这个做东的人最有感触。谢谢各位愿意来，咱们先碰个杯，愿今天多一点笑声，往后多几次见面。','Having friends here is a joy. Welcome, and here’s to more happy gatherings.','有朋友来就是高兴，欢迎大家，也盼更多欢聚。'],
 ['fun','rhythm','客气话先放桌边','今天客气话先放桌边，筷子拿起来，喜欢的多吃两口。这杯欢迎大家，咱们自在就好。','今天我做东，有个小愿望：大家别忙着客气，先把喜欢的菜吃到嘴里。聊得开心，比我说多少欢迎词都强。来，我先敬各位，谢谢你们来。','My wish as your host: less formality, more good food and happy conversation. Cheers!','作为主人，我就盼大家少些客气，多吃好吃的、多聊开心的。'],
 ['fun','rhythm','今天先不赶时间','既然来了，就先把这顿饭吃高兴。菜可以慢慢尝，天可以慢慢聊，欢迎各位！','人一到齐，我这做东的就高兴了。今天不追求什么标准流程，喜欢吃的多尝尝，聊得来的多聊聊。这杯先敬大家，愿各位吃得舒服，也笑得痛快。','No formal programme today—just good food, good conversation, and plenty of laughter.','今天不赶流程，愿大家吃得好、聊得来、笑得开心。']
]);

group('farewell','farewell','table','普通朋友送行口吻；不预设赴任、退休、目的地或永远离别。',[
 ['plain','farewell','到了，记得说一声','这杯送你，到了记得说一声。换个地方也照顾好自己，往后有空，咱们再约饭。','今天先把祝福送给你：一路平安，到了那边慢慢适应，别什么事都自己硬扛。有开心的消息，记得跟我们说；想聊的时候，也随时招呼一声。这杯敬你。','Safe travels. Let us know when you arrive, and remember you can always call.','祝一路平安，到了说一声，想聊的时候随时联系。'],
 ['plain','farewell','日子过好，别急着样样都好','新的地方，慢慢来，先把自己照顾好。这杯祝你顺利，也等着听你的新故事。','要换个地方、换段生活，总有新鲜，也难免有不习惯。今天这杯祝你顺利，日子慢慢过，事情一件件来。等下次见面，你讲新的故事，我们接着听。','May your new chapter unfold gently, one day at a time. We look forward to your stories.','愿新的生活慢慢展开，也盼下次听你讲新故事。'],
 ['plain','farewell','见面少一点，牵挂不会少','以后见面可能没这么方便，想起了就打个电话。这杯敬你，祝一路顺利，咱们常联系。','今天这顿饭有点舍不得，不过更多还是替你祝福。以后就算见面没那么方便，电话和消息也都还在。这杯敬你，愿你在新的地方过得踏实、过得开心。','We may meet less often, but we’ll stay in touch. Wishing you a happy life ahead.','见面或许少一些，联系不会断，祝你往后的生活开心。'],
 ['verse','bode','远了，也还是朋友','“海内存知己，天涯若比邻。”话不用说得太重，意思就是：远了，也还是朋友。来，祝你顺利。','“海内存知己，天涯若比邻。”今天把这句话送给你。距离会有，朋友还在；各自忙的时候，也别忘了照顾自己。这杯祝你一路顺利，下回见面，咱们接着聊。','Distance won’t change our friendship. Safe travels, and here’s to the next time we meet.','距离不会改变友情，祝一路平安，也盼下次见面。'],
 ['verse','gaoshi','带着底气往前走','“莫愁前路无知己。”这句话送给你，带着底气往前走，也记得身后有朋友。','“莫愁前路无知己。”我喜欢这句话里的开阔，今天也把这份祝愿送给你。新的路上，愿你遇见聊得来的人，做着心里认定的事。这杯道一声珍重，也盼再见。','May you find good company and worthwhile work on the road ahead. Take care, my friend.','愿前路有聊得来的人、有值得做的事，朋友，多保重。'],
 ['verse','zhang','万里也不耽误惦记','“相知无远近，万里尚为邻。”现在联系方便，远一点也不耽误惦记。来，敬你一路平安。','“相知无远近，万里尚为邻。”这话放到今天，我就想说：有事没事都能联系，别因为远了就客气。今天先送你一杯祝福，愿你出发顺利，往后的日子也顺心。','Near or far, please stay in touch. Wishing you a safe journey and good days ahead.','不论远近，都记得联系，祝一路平安、往后顺心。'],
 ['fun','farewell','行李你装，祝福我送','行李你自己装，祝福我替你多装一点。来，祝你一路顺利，下回带点新鲜事回来聊！','这次行李我就不帮你挑了，祝福倒可以多送一点。祝你一路顺利，饭能吃好，觉能睡好，新地方能找到合得来的朋友。下回见面，记得带点新鲜事，我们听个够。','Pack a few extra good wishes from us. We can’t wait to hear your new stories.','把我们的祝福也带上，下回等着听你的新故事。'],
 ['fun','farewell','别只发风景，也报个平安','到了新地方，风景可以多拍，平安也记得报。来，祝你顺利，咱们下顿饭以后再约。','以后去到新地方，朋友圈可以发风景，咱们聊天也别断了近况。这杯祝你顺利，开心的事多一点，犯难的时候也能找到人商量。下回聚，听你慢慢讲。','Send us the views, but let us know how you’re doing too. Safe travels!','风景可以分享，近况也别忘了说，祝一路平安。']
]);

group('thanks','thanks','table','泛指收到好意后致谢；如果愿意，可以当面补一句真实的感谢事项。',[
 ['plain','thanks','这份好意，我记着','谢谢你的这份好意，我记在心里了。这杯敬你，往后有我能帮上忙的地方，也别跟我客气。','今天这杯，是想认真跟你说声谢谢。有些话说得简单，心里是记着的。也祝你往后的事顺顺利利，哪天有我能搭把手的地方，尽管招呼。','Thank you for your kindness. Please know I’d be glad to help when I can.','谢谢你的好意，有我能帮上忙的时候也请告诉我。'],
 ['plain','thanks','好意得好好接住','这份好意我收到了，也想当面说声谢谢。来，敬你，祝你也常遇到真心待你的人。','有些好意，不能只在心里觉得感动，还是得当面说声谢谢。今天就借这杯把感谢送给你，愿你往后的日子顺心，也常有人认真接住你的心意。','Thank you for your thoughtfulness. May you receive the same kindness you give.','谢谢你的用心，也愿你收到同样的善意。'],
 ['plain','thanks','不说客套话，说句谢谢','客套话我就不绕了，这杯就是谢谢你。愿你忙的事有结果，惦记的人都平安。','今天不绕客套话，先把“谢谢”两个字说清楚。你这份好意，我很珍惜。这杯祝你事情顺利，心里安稳，也希望往后的来往，咱们都能真诚一点、轻松一点。','A simple, sincere thank-you. Wishing you good results and peace of mind.','真诚说声谢谢，祝你事情有好结果、心里安稳。'],
 ['verse','reciprocate','真心，得用真心来回','“投我以桃，报之以李。”你的好意，我想用真心来回。这杯谢谢你，也祝你一切顺心。','“投我以桃，报之以李。”我喜欢这句话里真心有回应的意思。今天借这杯好好谢谢你，往后的来往，我也会认真相待。祝你做事顺利，过日子舒心。','Thank you for your kindness. I hope to return it with the same sincerity.','感谢你的好意，也愿以同样的真心回应。'],
 ['verse','reciprocate','感谢说出口，也记在心里','借“投桃报李”的意思，今天先把感谢说出口。你的好意我记着，这杯敬你。','借“投桃报李”这份心意，今天先认真说一声谢谢。不是算来算去，是别人待自己的好，值得记着。这杯敬你，愿你常有顺心事，也常被人好好对待。','Your kindness matters to me. Here’s to being thoughtful toward one another.','你的好意我很珍惜，也愿彼此真心相待。'],
 ['verse','lantingMeet','遇到善意，是件好事','借一句“欣于所遇”，谢谢遇到的这份善意。这杯敬你，愿你的好意也常有回应。','借一句“欣于所遇”，说说我对这份好意的珍惜。生活里能碰到愿意真诚待人的人，是件好事。今天这杯谢谢你，也祝你往后常遇见同样温暖的人。','I’m grateful for your kindness. May good people and good things come your way too.','感谢你的好意，也愿你常遇见好人、好事。'],
 ['fun','thanks','谢谢不能只发个表情','谢谢不能只发个表情，今天得当面说。这杯敬你，祝你顺心的事多，操心的事少。','要是只在手机上说谢谢，我可能又发个表情就过去了。今天见着面，得认真一点：谢谢你，这份心意我记着。来，也祝你顺心的事多一点，操心的事少一点。','An emoji wouldn’t be enough today. Thank you, sincerely, and cheers to good days ahead.','今天一个表情可不够，要认真谢谢你，也祝往后日子顺心。'],
 ['fun','thanks','心意不走过场','今天这杯不能走过场，得认真谢谢你。好话我不凑一大段，真心这一句就够。','有些谢谢，说得越绕反而越像客气。今天我不凑长篇了，就认真敬你一杯。祝你手头的事顺，生活里的乐子多，这份心意我也会好好记着。','No long speech today—just a heartfelt thank-you and warm wishes for you.','今天不说长篇，只真心道谢，也把祝福送给你。']
]);

group('guest','thanks','host','来宾感谢主人；把张罗的用心说到，不抢主人安排饭局的角色。',[
 ['plain','thanks','张罗这一桌，费心了','张罗这一桌，费心了。我敬你一杯，谢谢你的款待，也谢谢把大家聚到一起。','一桌饭从张罗到坐下，处处都得用心。今天我作为来宾，先敬主人一杯。谢谢这份款待，也祝你忙完能好好坐下来吃，今天咱们都聊得开心。','Thank you for hosting and bringing us together. Please enjoy the meal too.','谢谢款待，也谢谢让大家相聚，你也要一起好好享受今天。'],
 ['plain','thanks','吃在嘴里，记在心里','今天这顿饭，吃在嘴里，也记在心里。这杯谢谢主人，愿以后常有机会聚。','今天这顿饭，我最想谢的不只是菜，也是让大家能坐到一桌的这份用心。这杯敬主人，祝你事事顺心。往后有机会，咱们还像今天这样好好聚。','Thank you for the meal and, above all, for making this gathering happen.','谢谢这顿饭，更谢谢你让这次相聚成行。'],
 ['plain','thanks','你也坐下来，慢慢吃','今天辛苦张罗了，你也坐下来慢慢吃。这杯敬主人，谢谢让我们在这一桌相聚。','主人最容易忙着照顾大家，自己反而顾不上吃。今天这杯先谢谢你的用心，也请你放松一点，跟我们一起慢慢聊。这份款待我记着，祝你生活顺心、常有欢喜。','Thank you for taking care of everyone. Sit down with us and enjoy the meal too.','谢谢你照顾大家，也请坐下来，一起好好吃饭。'],
 ['verse','lumingGuest','主人的嘉意，客人收到了','“我有嘉宾”，是主人的心意；今天这份心意，我们收到了。来，我敬主人，谢谢款待。','“我有嘉宾”，写的是主人的厚意。今天我是来宾，这份被欢迎的心情，也想认真说给主人。谢谢你的款待，也谢谢给我们这一桌好时光，来，我敬你。','Your welcome means a lot. Thank you for sharing your table and your time with us.','这份欢迎我们很珍惜，谢谢你让大家同桌相聚。'],
 ['verse','welcoming','相聚的高兴，要谢谢主人','“有朋自远方来，不亦乐乎？”今天这份相聚的高兴，也得谢谢主人。来，敬你，费心了。','“有朋自远方来，不亦乐乎？”今天大家能坐得这么开心，得谢谢主人的张罗。我作为来宾，先把这份感谢说到，祝你忙得有收获，也常有被朋友好好款待的时候。','To our host, who made this happy gathering possible. Thank you for everything.','敬让今天这场欢聚成行的主人，谢谢你的用心。'],
 ['verse','reunion','一桌家常，就是好款待','“把酒话桑麻”，好朋友的款待就在这份自在里。今天谢谢主人，让我们吃得好，也聊得来。','“把酒话桑麻”，一桌饭，几句家常，就是很好的相聚。今天谢谢主人的用心，让大家能这样自在地坐着说话。这杯敬你，也祝你往后的日子越过越有滋味。','Thank you for a table where we can eat well, talk freely, and feel at home.','谢谢这份款待，让大家吃得好、聊得自在，也像在家一样舒服。'],
 ['fun','rhythm','夸菜，也得夸张罗的人','菜要夸，张罗的人更要谢。这杯敬主人，今天让你费心了，咱们以后常聚。','吃得高兴，不能只顾着夸菜，把张罗的人忘了。今天这杯先敬主人：谢谢你费心，让我们有饭吃、有话聊、有朋友见。来，祝你往后也常有这样热闹又舒心的日子。','The food deserves praise, and our host deserves thanks. Here’s to you!','菜值得夸，主人更值得谢，这杯敬你。'],
 ['fun','rhythm','回去可得说这顿饭的好','今天回去，可得说说这顿饭的好。先敬主人，谢谢你把大家招呼得这么自在。','今天我这个来吃饭的，也得尽一点责任：当面好好谢谢主人。这顿饭吃得开心，话也聊得投缘。这杯敬你，祝你费的心都有回响，下回咱们还愿意来。','A happy guest has one job left: to thank the host properly. Cheers to you!','吃得开心的客人，还得认真谢谢主人，这杯敬你。']
]);

group('reply','reply','table','先听完对方的祝福再接话；这里不额外区分辈分，按平辈口吻使用。',[
 ['plain','rhythm','好话我收到了','谢谢你，好话我都收到了。也祝你最近的事顺顺利利，咱们一起往好的地方走。','谢谢你的祝福，我听着心里挺暖的。今天也把这份好意还给你，祝你工作顺利，生活开心，惦记的事慢慢有好结果。来，我也敬你。','Thank you for those warm words. Wishing you good days and good things ahead too.','谢谢这份温暖，也祝你往后日子顺、好事多。'],
 ['plain','rhythm','借你吉言，也祝你好','借你吉言，也把祝福送回给你。愿咱们各自都好，有空还坐一桌。','借你吉言，这份祝福我认真收下了。今天也祝你手头的事办得顺，心里的事想得开。往后大家各自忙得有收获，也别少了像今天这样见面的机会。','Thank you for your good wishes. May they come true for both of us.','谢谢你的祝愿，也愿我们都能过得顺心。'],
 ['plain','thanks','心意比话更暖','谢谢你这句话，我记住了。今天这杯也敬你，愿你常有好消息，也常有人惦记。','有些话不用说得很长，听得出里面的心意，就挺暖的。谢谢你今天的祝福，我也敬你一杯。祝你日子过得踏实，身边常有愿意听你说话的人。','Your thoughtfulness means a lot. Here’s to good news and people who care about you.','这份用心很珍贵，也祝你常有好消息、身边有人关心。'],
 ['verse','reciprocate','祝福也要有来有往','“投我以桃，报之以李。”你的祝福我收下，我的祝福也送给你。愿咱们都顺心。','“投我以桃，报之以李。”今天就用这句话接住你的好意。谢谢你把好话送给我，我也愿把好祝福送回给你：愿你忙有所得，闲有所乐，平常日子也常有笑声。','I receive your wishes with gratitude and send the same warmth back to you.','谢谢你的祝福，也把同样的温暖送回给你。'],
 ['verse','reciprocate','回敬一份真心','借“投桃报李”的意思，我也回敬一份真心。谢谢你，也祝你平安、顺利、心里踏实。','借“投桃报李”这份心意，你刚才的祝福，我好好收下。今天这一杯，也祝你平安、顺利，想做的事有进展，累了的时候能歇一歇。咱们都把日子过好。','Thank you. Wishing you peace, progress, and time to rest when you need it.','谢谢你，也祝你平安、有进展，累了能好好休息。'],
 ['verse','lantingMeet','相遇有这份好意，值得敬','借一句“欣于所遇”，谢谢今天遇到的这份好意。我也敬你，愿你往后常有开心事。','借一句“欣于所遇”，你的这份祝福，正是今天值得高兴的事。谢谢你，我也回敬一杯。愿你忙的事都慢慢有着落，身边的人也都平平安安。','Your kind words are part of what makes today special. Warm wishes to you too.','你的祝福让今天更开心，也把好祝愿送给你。'],
 ['fun','rhythm','好话收下，好事一起等','好话我先收下，好事咱们一起等。来，也祝你顺顺当当，开心的事多一点。','你这几句好话，把我都说高兴了。那我也不光顾着收，祝福得有来有往：祝你工作顺，生活甜，睡个好觉，醒来又有好消息。来，我也敬你。','I’ll gladly take those good wishes—and send a whole lot back your way!','好祝福我开心收下，也把满满的祝福送回给你。'],
 ['fun','rhythm','这份好意，必须接住','这么好的祝福，我得稳稳接住。也敬你一杯，祝你事好办、人好处、日子好过。','这份祝福说得这么到位，我可得稳稳接住。谢谢你，今天也祝你事好办、人好处，日子越过越有滋味。来，我这杯敬回来，咱们都高高兴兴。','Thank you for such lovely wishes. Here’s to easier days and more reasons to smile.','谢谢这么好的祝福，也愿大家日子轻松些、笑容多一些。']
]);

group('closing','closing','table','只结束自己的讲话；不代表主人宣布散席，也不催别人饮酒。',[
 ['plain','rhythm','话先到这儿，咱们慢慢吃','我的话先到这儿，咱们慢慢吃、慢慢聊。祝大家今天高兴，往后的日子也顺心。','我的话就先说到这儿，不耽误大家吃饭。祝各位今天吃得好、聊得开心，往后的事也顺顺利利。有机会咱们再坐一桌，我敬大家。','That’s all from me for now. Enjoy the meal, and here’s to good days ahead.','我的话先到这里，愿大家吃得开心，往后也顺心。'],
 ['plain','rhythm','把好心情带回去','我就说到这儿，祝大家把今天的好心情留住。以后有机会，咱们再聚。','话说到这儿，心意也都在里面了。祝大家今天高高兴兴，往后的日子忙得有收获，闲得有滋味。改天有机会，咱们再像这样好好吃顿饭。','May the good feeling from today stay with you. Here’s to meeting again.','愿今天的好心情多留一阵，也盼以后再聚。'],
 ['plain','thanks','谢谢这一桌的陪伴','谢谢大家这一桌的陪伴。我先说到这儿，祝各位都好，咱们接着聊。','说了这几句，最想表达的还是谢谢大家今天的陪伴。我就先收到这儿，祝各位日子过得踏实，心里常有开心的事。咱们饭慢慢吃，话接着聊。','Thank you for the company. Wishing you well, and let’s carry on enjoying the meal.','谢谢大家相伴，愿各位都好，咱们接着好好吃饭。'],
 ['verse','lanting','畅叙有余，不必把话说尽','“畅叙幽情”，也不用一口气把话说完。我先敬大家，咱们边吃边聊，把高兴留长一点。','借“畅叙幽情”的意思，我今天的心意也说到了。话不用一次说尽，饭桌上的好时光，咱们慢慢过。这杯敬大家，愿以后常有见面的机会。','No need to say everything at once. Here’s to an unhurried meal and more gatherings ahead.','话不必一次说尽，敬从容相聚，也盼以后常见。'],
 ['verse','lantingMeet','这一场相聚，记在心里','借一句“欣于所遇”，今天这份相聚的高兴，我记在心里。我的话先到这儿，祝大家都好。','“欣于所遇”，今天借这四个字给自己的话收个尾。能在这一桌聊天、碰杯，我很高兴。祝各位今天尽兴，往后顺心，咱们有机会再坐一桌。','I’m happy we shared this time. Wishing you well, and hoping we meet again soon.','很高兴一起度过这段时光，祝各位都好，也盼再见。'],
 ['verse','zhang','见面有欢喜，分别也惦记','借“相知无远近”这份心意，祝咱们见面有欢喜，平时也记得彼此。来，我先敬大家。','借“相知无远近”这份心意，我就把话收到这儿。见面的时候开心，平时各忙各的，也记得有朋友在。这杯敬大家，祝各位都把日子过好，往后有空再聚。','To staying close through busy days and being happy whenever we meet.','敬忙碌中依然亲近，也愿每次见面都开心。'],
 ['fun','rhythm','不耽误大家吃下一口','我就说到这儿，不耽误大家吃下一口。祝各位今天开心，明天也有好消息！','我的话就先到这儿，再说下去，大家喜欢的菜可能都该凉了。最后祝各位今天吃得香，明天事好办，往后的日子笑声多。来，咱们接着吃。','I’ll stop before the food gets cold. Enjoy dinner, and may tomorrow bring good news!','我先说到这里，别让菜凉了；祝大家吃得开心，明天有好消息。'],
 ['fun','rhythm','祝福续上，长篇就免了','祝福给大家续上，长篇我就不续了。来，祝各位事顺心、人平安，咱们接着聊。','我这段话就不续长篇了，祝福倒可以多留一点。祝大家事顺心、人平安，难题有人一起想，好事有人一起乐。来，敬各位，咱们接着聊。','No more long speeches—just more good wishes. Here’s to you all!','长篇就不继续了，祝福还想多送一点，这杯敬大家。']
]);

function extra(key:string,rows:Row[]){const base=drafts.find(t=>t.id.startsWith(`spoken-${key}-`))!;group(key,base.scene,base.target,base.tip,rows);}
extra('table',[
 ['plain','rhythm','有空坐坐，就很难得','日子再忙，也得有一起吃饭的人。这杯敬大家，愿各位忙得值得，聚得开心。','今天坐在这儿，我觉得一顿饭能把人拉近不少。这杯敬大家，祝各位忙的事都有进展，也总有时间和愿意相见的人坐一坐。','May we always make time for the people we enjoy sharing a table with.','愿我们总能为想一起吃饭的人留出时间。'],
 ['verse','welcoming','把相逢过成常来常往','“有朋自远方来”，是一份高兴；以后常来常往，又是一份情分。今天先敬大家。','“有朋自远方来”，今天借这份高兴敬各位。认识一回不难，往后愿意来往更难得。祝大家日子顺心，也盼这顿饭以后，咱们还有下一顿饭可约。','To meeting today and choosing to stay in touch tomorrow.','敬今天相识，也盼往后愿意继续来往。'],
 ['fun','rhythm','我先起个头','我先起个头，把祝福送到桌上：好事多一点，烦心少一点，大家吃得开心一点。','突然让我说两句，那我就先抛个砖，祝大家最近都有点值得高兴的事。事情办成了有人庆祝，饭菜好吃了有人分享。来，我敬大家。','I’ll get us started: more good news, fewer worries, and plenty of reasons to smile.','我先起个头，祝大家好消息多、烦心事少，笑容常有。'],
 ['fun','rhythm','好消息，欢迎插队','这杯祝大家好消息常来，最好还会插队。今天咱们先吃好、聊好，开心最要紧。','生活里要排队的事不少，我就祝大家的好消息会插队，早一点到。来，敬在座各位，愿各自都有盼头，也常有人一起分享高兴。','May good news find its way to the front of the queue. Cheers, everyone!','愿大家的好消息早一点到，敬各位。']
]);
extra('colleagues',[
 ['plain','thanks','多体谅，也多照应','做事各有各的认真，相处也多一分体谅。这杯敬大家，祝我们工作顺利，生活松快。','同事之间，事情要认真做，人也要好好相处。这杯我敬大家，愿咱们有话好商量，有难处能体谅；工作做得顺，生活也能过得松快些。','To thoughtful teamwork and treating one another with patience.','敬用心共事，也愿彼此多一分耐心。'],
 ['verse','practice','认真做，也别忘了歇','借“敏于行”提醒自己认真做事，也借这杯祝大家该忙时有劲，该歇时安心。','“敏于行”，说的是认真行动。今天也想把另一份祝福送给大家：该忙的时候做得顺，该歇的时候歇得下。来，敬各位的用心，也祝各位生活有自己的乐子。','To doing good work and being able to switch off and rest afterwards.','敬把工作做好，也愿忙完能安心休息。'],
 ['fun','rhythm','饭桌上不催回复','今天坐饭桌上，我就不催大家回复消息了。来，祝各位吃得香，手头的事都顺当。','平时消息一多，手机总放不下。今天既然坐在一桌，我先把祝福当面送到：工作顺，身体好，今天这顿饭也吃高兴。来，敬大家。','Here are my good wishes in person: good work, good health, and a happy dinner.','祝福当面送到：祝工作顺利、身体好、这顿饭吃得开心。'],
 ['fun','rhythm','好饭也得认真吃','认真工作的本事有了，认真吃饭也别落下。这杯祝大家工作有成绩，生活有胃口。','有些事值得认真，吃顿好饭也算一件。今天我敬各位，祝工作有成绩，生活有胃口，忙过这一阵，还能给喜欢的事情留点时间。','To taking work seriously and enjoying the rest of life just as much.','敬认真工作，也愿同样认真享受生活。']
]);
extra('leader',[
 ['plain','thanks','把祝福说得家常些','这杯敬您，祝福就说得家常些：身体健康，家里舒心，忙的事情都有好结果。','今天有机会敬您，想把祝福说得家常一点。祝您身体健康，家里舒心，忙的事情都有好结果。往后有机会，我也多听、多学，把自己的事情做好。','Wishing you good health, a happy home, and rewarding results in your work.','祝您身体健康、家庭舒心，工作有好结果。'],
 ['verse','practice','学一点，做好一点','“见贤思齐”，我先从多学一点、做好一点开始。这杯敬您，愿您忙有所成，闲有所乐。','借“见贤思齐”这句话，我也给自己定个实在的要求：多学一点，就争取做好一点。今天敬您一杯，祝您忙有所成、闲有所乐，工作生活都顺心。','With respect, and a wish to learn a little more and do a little better each day.','向您致敬，也愿自己每天多学一点、做好一点。'],
 ['fun','rhythm','敬意不用打草稿','漂亮话还得打草稿，敬意不用。这杯敬您，祝您工作顺心，生活也舒心。','一说到敬您，我脑子里的句子倒都排队去了。那就先说最实在的：祝您工作顺心、生活舒心。我把这杯敬到，也把该做的事认真做到。','My words may need practice, but my respect is sincere. Warm wishes to you.','话还需要练习，敬意是真，祝您顺心。'],
 ['fun','rhythm','先给好心情留点时间','事情忙不完，好心情也得排上号。这杯敬您，祝您忙得有收获，闲下能放松。','今天不讲太多，就祝您忙得有收获，闲下来也能真正放松。好心情不能总往后排。这杯敬您，也盼您身体好、每天都有值得高兴的事。','May good moods get a place in your schedule too. Wishing you health and happiness.','愿好心情也能排进日程，祝您健康、开心。']
]);
extra('friends',[
 ['plain','rhythm','不光有正事，闲聊也行','咱们之间，不光有正事，闲聊也行。这杯敬你们，愿朋友这件事一直热乎着。','今天这杯敬你们。有正事可以商量，没正事也能闲聊，这样的朋友相处起来踏实。愿咱们各自忙得好，也把这份来往一直留着。','To friends we can call without needing a special reason.','敬那些不用找特别理由，也能联系的朋友。'],
 ['verse','reunion','有滋味的，常是小事','“把酒话桑麻”，有滋味的常是这些小事。今天敬你们，愿咱们以后还有许多家常可聊。','“把酒话桑麻”，聊来聊去，也不过是生活里的小事。可跟朋友一起说，这些小事就有意思。今天敬你们，愿咱们日子里有点盼头，饭桌上总有话头。','To little stories that become special when we share them with friends.','敬那些和朋友一说，就变得有意思的小事。'],
 ['fun','rhythm','祝大家都不用硬撑','这杯祝大家都不用硬撑。开心就笑，累了就歇，想找人吃饭，咱们就约。','朋友一桌，咱们就不用把自己装得特别能扛。开心的事说出来热闹热闹，累的时候也能喊一声。来，敬你们，愿大家日子越过越顺，也越过越自在。','May we feel free to laugh, rest, and ask our friends for company.','愿我们想笑就笑，累了能歇，也能自在地找朋友相伴。'],
 ['fun','rhythm','别只赞照片，也来见见人','朋友圈的赞咱们照点，真人也得见见。这杯敬你们，祝下次见面还有好多话要聊。','照片看过，消息回过，还是坐一桌最带劲。今天敬你们，祝各位有好事可分享，也有闲心出来吃饭。下次见面，咱们还接着聊。','The photos are lovely, but seeing you in person is better. Cheers to meeting again!','照片很好看，见到本人更高兴，敬下次相聚。']
]);
extra('new',[
 ['plain','rhythm','先记住这顿饭','名字可以慢慢记，这顿饭的高兴先记住。这杯敬大家，往后有机会再见。','初次见面，要记的信息可能挺多。我先不急，记住今天这一桌的高兴就好。这杯敬大家，愿各位顺心，也盼以后遇见了，咱们还能自然地聊两句。','To remembering a happy meal and saying hello again when our paths cross.','敬记住这一顿饭的高兴，也盼以后再遇见时自然问候。'],
 ['verse','lanting','有话可聊，就是好开头','“一觞一咏”，先借一杯打开话头。今天能认识各位，我很高兴，咱们慢慢聊。','借“一觞一咏”的意思，今天先用这杯跟各位打开话头。相识的开头，不用把话说满，聊得舒服就很好。我敬大家，愿这次相遇留下点开心的记忆。','To a comfortable conversation and a happy memory of our first meeting.','敬舒服的交谈，也愿初见留下一份好记忆。'],
 ['fun','rhythm','先认识人，头衔慢慢记','先认识人，头衔慢慢记。今天敬大家，愿这桌饭吃完，咱们见面不再脸熟嘴生。','第一次见面，有时候头衔记住了，人还没来得及好好认识。今天我先敬大家，听听各位真正喜欢的事，下次碰面，就不光是“好像见过”了。','Here’s to getting to know the people beyond the introductions.','敬认识介绍词之外、更真实的彼此。'],
 ['fun','rhythm','好话不用比赛','今天咱们好话不用比赛，聊得开心就算赢。来，敬新认识的各位。','第一次同桌，大家别忙着比谁更会说话。我先说一句简单的：很高兴认识你们。祝这顿饭吃完，开心的记忆能留下，客气的距离能少一点。','No contest for the best speech today. Let’s simply enjoy getting acquainted.','今天不比谁最会说话，就轻松认识彼此。']
]);
extra('date',[
 ['plain','rhythm','先听听你喜欢的事','今天很高兴见到你。你喜欢的事，我愿意听；我的故事，也慢慢讲给你。','第一次见面，我想先听听你真正喜欢什么，不急着把话题都过一遍。这杯敬今天的相识，希望咱们这顿饭，吃得舒服，也聊得投缘。','I’d like to hear what you truly enjoy. Here’s to a comfortable first conversation.','我愿意听你真正喜欢的事，也愿第一次交谈轻松自在。'],
 ['verse','lantingMeet','先把眼前的相遇过好','“欣于所遇”，今天先把眼前这次相遇过好。来，敬你，愿今天轻松又开心。','“欣于所遇”，借这四个字提醒我自己，别忙着想下一句该怎么说，先好好听你说话。这杯敬你，希望今天这顿饭，让我们都觉得来得值得。','To being present, listening well, and enjoying this meeting as it is.','敬认真倾听，也愿我们好好享受眼前这次见面。'],
 ['fun','rhythm','不用一次把故事讲完','咱们今天又不是讲个人传记，不用一顿饭说完所有故事。来，先把饭吃开心。','第一次见面，故事可以挑喜欢的讲，不用急着从出生讲到今天。我先敬你，愿这顿饭少一点紧张，多一点好奇，能开心地认识彼此。','We don’t have to tell our whole life stories over one meal. Let’s just enjoy getting acquainted.','一顿饭不用讲完全部人生，轻松认识彼此就好。'],
 ['fun','rhythm','不小心笑场，也挺好','今天聊着聊着要是笑场，也算开了个好头。敬你，愿咱们都自在一点。','我想了想，第一次见面最好的状态，可能不是句句漂亮，是能放松地笑出来。今天先敬你一杯，愿咱们吃得开心，偶尔停顿也不尴尬。','Here’s to feeling comfortable enough to laugh, pause, and simply be ourselves.','愿我们能自在地笑、自然地停顿，轻松做自己。']
]);
extra('family',[
 ['plain','family','家里人都好，心就安稳','在外面各有各的忙，家里人都好，心就安稳。这杯祝咱们平安，也祝日子有滋味。','今天看到大家坐在一桌，心里就觉得挺安稳。这杯祝咱们都好，出门顺利，回家舒心。平时记得报个平安，有空也记得坐下来好好吃顿饭。','When our family is well, our hearts feel steadier. Wishing everyone peace and joy.','家人都好，心里就踏实，祝大家平安、开心。'],
 ['verse','reunion','饭桌上也有牵挂','“把酒话桑麻”，咱们围桌说家常。问的都是小事，惦记的都是自己人，来，祝一家都好。','“把酒话桑麻”，今天咱们就在饭桌上聊聊家常。问一句近况，听几句心事，都是一家人的牵挂。这杯祝大家平安顺利，也愿咱们常有这样的热乎劲儿。','To small questions that carry a family’s care, and to staying close.','敬家常问候里的关心，也愿一家人常亲近。'],
 ['fun','family','别把自己忙成勿扰模式','大家再忙，也别把自己过成勿扰模式。这杯祝咱们有事肯开口，没事也能多说两句。','一家人平时各忙各的，别忙着忙着，就只剩下手机里的表情包了。今天这杯祝咱们有事肯开口，没事也能多聊两句，把一家人的热乎劲儿留住。','May busy lives never put our family on “do not disturb.” Let’s keep talking.','愿忙碌别把家人变成勿扰模式，咱们常说说话。'],
 ['fun','family','幸福也可以很家常','今天先不说什么大目标，饭香、人齐、心情好，就够咱们高兴一会儿。来，敬一家人。','有时候把日子想得太复杂，倒忘了眼前这顿饭也挺幸福。今天我敬大家，愿咱们饭吃得香，心里少操心，平常日子也常有值得笑的事。','Happiness can be an ordinary meal with family. Here’s to enjoying more of those moments.','幸福也可以是一顿家常饭，愿这样的时刻多一点。']
]);
extra('elders',[
 ['plain','family','想做的事，慢慢做','这杯敬您。愿您身体好，也有自己的小乐趣，想做的事慢慢做，高兴的日子慢慢过。','除了祝您身体好，今天还想祝您日子过得有意思。喜欢的事多做一点，不想操心的事也能放一放。这杯敬您，愿您每天都有点盼头，也有我们惦记着。','Wishing you good health, little pleasures, and time for the things you enjoy.','祝您身体好、常有小乐趣，也有时间做喜欢的事。'],
 ['verse','longevity','长久的祝愿，落在每一天','“以介眉寿”，长久的祝愿送给您。眼前也盼您每天吃得香，过得舒心，这杯敬您。','“以介眉寿”，这份长久的祝愿，我也送给您。落到每天，就是盼您吃得香、睡得好、有人说话、常有笑声。今天这杯敬您，也祝咱们往后多多相聚。','May a long life be filled with restful nights, good company, and everyday happiness.','愿长久的日子里，有好睡眠、有人相伴，也有日常的开心。'],
 ['fun','family','开心的事，您也得排前头','家里的事要紧，您自己的开心也得排前头。这杯敬您，祝您天天有乐子，顿顿有胃口。','今天我想多祝您一点：家里的事要紧，您自己的开心也要紧。喜欢的事情别总往后放，好吃的也别总让给别人。这杯敬您，愿您舒心、安康。','Your happiness matters too. Wishing you good health and plenty of little joys.','您的开心也要紧，祝您健康，也常有小欢喜。'],
 ['fun','family','多笑一笑，咱们都高兴','您多笑一笑，咱们这一桌都高兴。这杯敬您，祝您身体有劲，生活有趣。','今天一家人坐在这儿，最愿意看到的就是您高兴。这杯祝您身体有劲，生活有趣，想出去走走就有兴致，想在家歇歇也能踏实。咱们往后常聚。','May you have energy for what you enjoy and peace when you choose to rest.','愿您有精神做喜欢的事，也能安心休息。']
]);
extra('host',[
 ['plain','thanks','来一趟，就得自在一点','今天请大家来，就是想好好聚聚。客气话咱们少说点，吃好、聊好，我先敬各位。','把大家请到一桌，是想找个机会多聊聊。今天不用赶，也不用拘束，我先敬各位。祝大家最近都顺心，也希望这顿饭，能让各位觉得舒服、开心。','I wanted a chance for us to spend time together. Welcome, and please feel at ease.','请大家来，就是想好好聚聚，欢迎各位自在一些。'],
 ['verse','luming','一声嘉宾，一份欢迎','“我有嘉宾”，今天这一桌，每位我都欢迎。谢谢大家来，咱们把这顿饭吃热闹了。','“我有嘉宾”，这四个字放到今天，就是一声真心的欢迎。谢谢大家来，饭菜咱们慢慢尝，想说的话慢慢聊。这杯敬各位，也祝往后来往常有。','A warm welcome to every guest at this table. Thank you for coming.','真心欢迎同桌的每一位，也谢谢大家来。'],
 ['fun','rhythm','欢迎词说短，饭局过好','欢迎词我就说短一点，这顿饭咱们好好过。各位吃得开心，就是今天最好的反馈。','作为今天做东的人，我有个很朴素的目标：大家吃得好，聊得开心。欢迎词说多了占时间，我先敬各位，咱们把热闹留给接下来的聊天。','A short welcome and a happy dinner—that’s my plan. Cheers to all our guests!','欢迎词说短一点，饭吃开心一点，敬各位来宾。'],
 ['fun','rhythm','别只顾着给我面子','大家给面子来了，就别再客气得不动筷子。喜欢的多吃点，咱们今天自在就好。','今天各位能来，我已经很高兴了。剩下就别只顾着给我面子，喜欢的菜多吃两口，聊得来的多聊一会儿。来，这杯欢迎大家，也祝各位都顺心。','You’ve already made me happy by coming. Now relax and enjoy yourselves.','大家能来我就很高兴，接下来请自在享用、开心相聚。']
]);
extra('farewell',[
 ['plain','farewell','有难处，别一个人扛','这杯祝你一路顺利。到了新地方，有难处别一个人扛，能联系的时候，咱们就多联系。','要说的话不少，今天最想说的还是一句：照顾好自己。新的地方慢慢熟，遇到难处别一个人硬扛。这杯敬你，也盼着下次听你讲些开心的新鲜事。','Take care of yourself, and don’t feel you have to face every difficulty alone.','照顾好自己，有难处也不用总是一个人面对。'],
 ['verse','bode','把牵挂带着，也安心往前走','“天涯若比邻”，今天就借这份心意送你。把朋友的牵挂带着，也安心往前走。','“天涯若比邻”，今天这杯不把离别说得太重，把牵挂送到就好。愿你往前走得安心，闲下来也想起跟我们说说近况。来，一路顺利，咱们再会。','Carry our good wishes with you, and step forward with confidence. Until we meet again.','把我们的祝福带上，安心往前走，咱们再会。'],
 ['fun','farewell','人过去了，消息别失联','人可以去远一点，消息别跟着失联。来，这杯祝你顺利，也等你给我们报好消息。','去新地方总有新鲜事，我们就等着你慢慢讲。今天这杯祝你顺利，人可以去远一点，消息别跟着失联。有空报个平安，开心了也让我们跟着高兴一下。','Go far, but don’t disappear from the group chat. We’ll be happy to hear your news.','可以去远方，别从聊天里消失，咱们等你的好消息。'],
 ['fun','farewell','下次见面，话题你准备','今天这杯我来敬，下次见面的新话题可就交给你了。祝你一路顺，天天有点新鲜事。','今天咱们送祝福，下次见面，就等着听你讲新故事了。这杯祝你一路顺利，遇到的人好相处，忙的事情有进展，闲下来还有心情看点新风景。','We’ll bring the good wishes today; you bring the new stories next time. Safe travels!','今天我们送祝福，下次你带新故事，祝一路平安。']
]);
extra('thanks',[
 ['plain','thanks','你的用心，我看见了','谢谢你这份用心，我很珍惜。今天借这杯敬你，也祝你常有被人好好对待的时候。','今天最想说的，是你的这份用心我收到了，也很珍惜。这杯好好谢谢你，愿你往后的事顺，身边的人也都真诚，付出的善意常能收到回应。','I appreciate your thoughtfulness. May you be treated with the same care.','谢谢你的用心，也愿你被同样认真地对待。'],
 ['verse','reciprocate','来往贵在认真','“投我以桃，报之以李。”来往贵在认真，这份好意，我也会认真记着。来，谢谢你。','“投我以桃，报之以李。”今天借这句话，不是客套地还一句，而是认真记住你的好意。这杯敬你，祝你日子顺心，也愿我们的来往一直真诚。','Thank you for your kindness. May we always treat one another sincerely.','感谢你的好意，也愿我们的来往始终真诚。'],
 ['fun','thanks','这句谢谢，不能省略','有些话可以省略，这句谢谢可不能。来，敬你一杯，祝你工作顺、心情好。','今天这杯，我就把谢谢两个字放前面。你的好意不能让它悄悄过去，我得当面认真说到。来，祝你工作顺、心情好，往后常有值得高兴的事。','Some words can be skipped; this thank-you can’t. Warm wishes to you.','有些话能省，这句谢谢不能省，祝你一切顺心。'],
 ['fun','thanks','把谢谢说得响一点','平时说谢谢容易一带而过，今天我得说得认真一点。这杯敬你，愿好事常找你。','平时一句谢谢，很容易说完就忙别的去了。今天坐到一起，我得把心意说得认真一点。来，敬你，祝你手里的事情好办，生活里的开心常有。','Today I want to say thank you properly. May good things keep coming your way.','今天想认真谢谢你，也愿好事常来。']
]);
extra('guest',[
 ['plain','thanks','把大家聚起来，也是一份用心','谢谢你把大家聚到一起。这杯敬主人，愿你的日子也常有这样的热闹和舒心。','一桌人各有各的忙，能把大家聚起来，本身就是一份用心。这杯谢谢主人，愿你忙的时候有人搭把手，闲的时候也有人陪着好好吃饭。','Thank you for bringing everyone together. May you have the same thoughtful company too.','谢谢你让大家相聚，也愿你常有这样用心的人相伴。'],
 ['verse','lumingGuest','嘉宾受款待，来宾敬主人','“我有嘉宾”，是待客的好心意。今天我这个来宾，先敬主人，认真说声谢谢。','“我有嘉宾”，古人的好心意，今天也能在这一桌体会到。作为来宾，我先敬主人一杯，谢谢你的款待，也祝你身体好、事情顺，常有朋友来相聚。','As your guest, I’d like to thank you for the welcome and raise a toast to you.','作为来宾，我想谢谢你的欢迎，也敬你一杯。'],
 ['fun','rhythm','今天这顿饭，得给用心点赞','今天这顿饭，得给张罗的人当面点个赞。这杯敬主人，费心了，咱们吃得挺高兴。','手机里的赞点得再快，也比不上今天当面谢一句。这杯敬主人，谢谢你费心，让大家有个好机会坐在一起。我祝你生活顺心，朋友常来。','A real-life thank-you for a thoughtful host. Here’s to you and many more happy meals.','当面谢谢用心的主人，也盼往后常有好饭、好相聚。'],
 ['fun','rhythm','我这个客人，也得说句好话','今天我这个客人不能光顾着吃，这杯得敬主人。谢谢款待，祝你往后的好日子也有滋有味。','吃得高兴，聊得开心，我这个客人也得站出来说句谢谢。今天让你费心了，这杯敬主人，祝你的日子有滋有味，也常有别人张罗好饭等着你。','I shouldn’t only enjoy the food—I should thank the host. Cheers, and thank you!','不能只顾着吃，也得谢谢主人，这杯敬你。']
]);
extra('reply',[
 ['plain','thanks','谢谢，也把好运送给你','谢谢你的祝福，我也把好运送给你。愿你手头的事顺，心里惦记的事也慢慢有结果。','你刚才的话，我认真收到了。也祝你忙的事情都慢慢有好结果，生活里有人关心，遇到难处有人商量。这杯我敬回来，咱们都好。','Thank you, and may good fortune come your way too. Wishing you progress and support.','谢谢，也愿你有好运、事情有进展，身边有人支持。'],
 ['verse','reciprocate','心意回敬，祝福不落下','“投我以桃，报之以李。”你的心意我接住，我的祝福也不落下。来，祝你顺心。','“投我以桃，报之以李。”今天就借这份真心有回应的意思，我也敬你一杯。祝你日子有盼头，忙碌有结果，身边常有说得上话的人。','I’m grateful for your wishes, and I’m sending mine right back to you.','谢谢你的祝愿，我也把祝福认真送回给你。'],
 ['fun','rhythm','先收好，再敬回来','这么好的祝福，我先收好，不能光收不回。这杯也敬你，祝你顺心又开心。','这份祝福我可不推辞，先好好收下。也不能让你白送一趟，我这杯敬回来：祝你每天都能碰到点好事，忙归忙，也有自己的开心。','I’ll happily accept those wishes—and send some back. Here’s to your happiness too!','祝福我开心收下，也送回给你，祝你同样开心。'],
 ['fun','rhythm','好事咱们都有份','承你吉言，好事咱们都有份。来，我也敬你，祝你顺顺利利，天天有点高兴事。','你把祝福说得这么好，我就先借你的吉言。今天这杯也敬你，愿好事咱们都有份，工作顺一点，生活甜一点，下回见面又有新消息。','May those good wishes come true for both of us. Here’s to more good news next time.','愿这些祝福我们都能实现，也盼下回都有好消息。']
]);
extra('closing',[
 ['plain','rhythm','心意说到了，话就先收住','心意说到了，话我就先收住。祝大家都好，咱们把这顿饭吃得舒舒服服。','该说的祝福都在心里，也都送到这一桌了。我就先收住，不耽误大家吃饭。愿各位今天开心，往后顺心，咱们接着慢慢聊。','The wishes are heartfelt, and I’ll leave it there. Enjoy the meal, everyone.','祝福都是真心的，我的话先收到这里，祝大家吃得开心。'],
 ['verse','lanting','话留点余地，相聚留点回味','借“一觞一咏”的意思，话就说到这儿，相聚的高兴慢慢回味。来，敬大家。','“一觞一咏”，有话可说，有人可听，这样的相聚就很好。我把话收到这儿，把祝福送给各位，愿往后的日子顺心，想见的时候也常能见到。','To having someone to talk to and more chances to share a table.','敬有人说话，也盼更多同桌相聚的机会。'],
 ['fun','rhythm','麦克风还给饭桌','我把发言先交回饭桌，大家该吃吃、该聊聊。祝各位高兴，往后常有好消息。','我的话先到这儿，接下来让好吃的接着发言。祝大家今天吃得好，平时睡得好，手头的事也都办得顺。来，敬各位，咱们接着聊。','I’ll let the food do the talking now. Enjoy dinner, and warm wishes to everyone!','接下来让饭菜继续表现，祝大家吃得开心，一切顺心。'],
 ['fun','rhythm','好话留点，下回还用得上','我就先说这么多，好话留一点，下回咱们见面还用得上。来，祝大家都好！','好话不用今天一次说完，下回见面，我还想接着祝各位好。今天就先敬到这儿，愿大家吃得开心，日子顺心，咱们改天有机会再聚。','I’ll save a few good wishes for our next gathering. Until then, wishing you all well!','留几句好话给下次相聚，也愿各位往后一切都好。']
]);

export const spokenToasts=drafts;
