// ES6按照一定模式从数组和对象中提取值
let [a,b,c] = [1,2,3];
//解构不成功变量的值默认undefined
//不完全解构
let [x,y] = [1,2,3]
//x -->1
//y -->2
let [foo] = 1;//error
let [foo] = false;//error
let [foo] = NaN;//error
let [foo] = undefined;//error
let [foo] = null;//error
let [foo] = {};//error
//右边的值或是转为对象以后不具备Iterator接口
//Set
let [x,y,z] = new Set(['a','b','c']);
//事实上，只要某种数据具备iterator接口的都可以采用数组形式的解构赋值
//默认赋值
let [foo=true] = [];//foo == true
//ES6内部使用严格相等运算符=== 默认赋值不等undefined的时候不起作用

//对象
let [foo:foo,bar:bar] = [foo:"aaa",bar:"bbb"];
//对象的解构赋值的内部机制，先找到同名属性，然后再赋值给对应的变量。
let [foo,bar] = ["aaa","bbb"];
//解构赋值的规则是：只要等号右边的值不是数组或者对象，都先转成对象，undefined和null无法转成对象，所以解构赋值会报错

//数值和布尔值的解构
//一个式子到底是模式还是表达式，必须解析到（或者解析不到）等号才能知道
//用途
//1、交换变量
let x = 1;
let y = 2;
[x,y] = [y,x]
//2、从函数返回多个值
function example(){
	return [1,2,3];
}
let [a,b,c] = example();
//3、函数参数的定义
function example2([x,y,z]){
	return x+y+z;
}
example2([1,2,3]);//6
//4、提取JSON数据
let jsonData = {
	id:42,
	status:'ok',
	data:[867,5332]
};

let [id,status,data:number] = jsonData;
//5、函数参数默认值

jQuery.ajax = function(url,{
	async = true,
	beforeSend = function(){},
	cache = true,
	complete = function(){},
	crossDomain = false,
	global = true,
	//
}){
	//...do stuff
}
//6、遍历map结构
var map = new Map();
map.set('first','hello');
map.set('second','world');

for (let [key,value] of map){
	console.log(key + ": " + value);
}
//指获取键名或者只获取键值
for (let [key] of map){
	//todo
}
for (let [,vlaue] of map) {
	//todo 
}
//7、输入模块的指定方法
//加载模块时，往往需要指定输入的方法。解构赋值使得输入语句非常清晰
const {SourceMapConsumer,SourceNode} = require("source-map");