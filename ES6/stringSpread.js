//1、ES6对字符的unicode表示方法做了改进，将码点放入大括号内，就能正确的解读该字符
"\u{20BB7}"
// javascript内部是以utf-16存储的

codePointAt();//参数为位置，返回十进制码点
//for of遍历可以识别大雨0xFFFF的码点

var text = String.fromCodePoint(0x20BB7);

for (var i = 0;i<text.length; i++) {
 	console.log(text[i]);
 } 

 //" "
 //" "

 for(let i of text){
 	 console.log(i);
 }
 //"𠮷"

 //同时charAt()也不能识别大于0xFFFF的字符---ES6新增at()方法

 //新增的includes()、startsWith()、endsWith()
 //includes():返回布尔值，并表示是否找到了参数字符串。
 //startsWith():返回布尔值，参数字符串是否在源字符串的头部
 //endsWith(): 返回布尔值，表示参数字符串是否在源字符串的尾部

 var str = 'Hello world!';

 s.startsWidth('Hello');
 s.endsWith('!');
 s.includes('o');
 //该三个方法都可以传入第二个参数,表示开始搜索的位置
 //repeat();方法返回一个新的字符串，表示将原字符串重复n次
 'x'.repeat(3);

 //padStart()、padEnd()字符串补全长度
 'x'.padStart(5,'ab');//'ababx'
 'x'.padEnd(5,'ab');//'xabab'


 'xxx'.padStart(2,'ab');//'xxx'

 'abc'.padStart(10,'0123456789');//'0123456abc'
