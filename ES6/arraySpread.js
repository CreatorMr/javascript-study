//扩展运算符
// ...  如同rest参数的逆运算，将一个数组转为用逗号分隔的参数序列
console.log(...[1,2,3]);
function push(array,...items){
	array.push(...items)
}

function add (x,y){
	return x+y;
}
var number = [3,8];
add(...number);//11

//替代数组的apply方法
// 由于扩展运算符可以展开数组，所以不在需要使用apply方法将数组转为函数参数
//ES5写法
function f(x,y,z){
	//...
}
var args = [1,2,3]
f.apply(null,args);


//ES6写法
function f(x,y,z){
	//...
}

var args = [1,2,3];
f(...args);

//例子
//ES5写法
Math.max.apply(null,[14,3,23]);

//Es6
Math.max(...[14,3,23]);
//Math.max(14,3,23)

// 通过push函数将一个数组添加到另一个数组的尾部
let a = [2,34,5,8];
let b = [3,4,1];
Array.prototype.push.apply(a,b);

//ES6
a.push(...b);

//扩展运算符的应用
//1、合并数组
[1,2].concat(more);
//ES6
[1,2,...more];

var arr1 = ['a','b']
var arr2 = ['c','d']
var arr3 = ['e','f'];
[...arr1,...arr2,...arr3]

//2、与解构赋值结合
//ES5
a = list[0],rest = list.slice(1);
//ES6
[a,...rest] = list;

const [first,...rest] = [1,2,3,4,5];

const [firtt,...rest] = [];//firtst==undefined,rest===[]
//如果将扩展运算用于数组赋值，则只能将其放在参数的最后一位。

//3、函数返回值
//函数只能返回一个值，如果需要返回多个值，只能返回一个数组或者对象。扩展运算符提供了解决这个问题的一种变通方法
var dateFields = readDateFilds(database)

var d = new Date(...dataFields);

//4、字符串--将字符串转为真正的数组
[...'hello']
//['h','e','l','l','o'];
//能正确识别32位的unicode字符
// 字符串处理时遇到32位unicode用扩展运算符
let str = 'x\uD83D\uDE80y';
str.length;//4
[...str].length//3

str.split('').reverse().join('');
//'y\uDE80\uD83Dx'

[...str].reverse().join('');
//'y\uD83D\uDE80x'

//5、实现了iterator接口的对象
//任何iterator接口的对象都可以用扩展运算符转为真正的数组
var nodeList = document.querySelectorAll('div');
//nodeList 类数组，可以使用扩展运算符可以转为数组，原因在于实现了iterator
var array = [...nodeList];

//没有实现iterator的类数组，可以使用Array.form()转为真正的数组

//Map和Set结构、Generator函数

// 扩展运算符内部调用的是数据结构的iterator接口，因此只要具有iterator接口的对象都可以使用扩展运算符。
let map = new Map([
	[1,'one'],
	[2,'two'],
	[3,'three'],
	]);
let arr = [...map.keys()];//[1,2,3]

// Generator函数运行后会返回一个遍历器对象，因此也可以使用扩展运算符
var go = function*(){
	yield 1;
	yield 2;
	yield 3;
};

[...go]//[1,2,3]

Array.form()
//将两类对象转为真正的数组：一类是类似数组的对象，另一类可遍历(iterator)的对象（包括ES6新增的set和map）
let arrlike = {
	'0':'a',
	'1':'b',
	'2':'c',
	length:3
}
//Es5
var t = Array.prototype.slice.call(arrlike);

//ES6
let arr2 = Array.form(arrlike);

//实际应用中，常见的类似数组的对象是DOM操作返回的nodeList集合，以及函数内部的arguments对象

// 扩展运算符背后调用的是遍历器接口(Symbol.iterator)，如果一个对象没有部署该接口，就无法转换。Array.form方法还支持类似数组的对象
// 。所谓类似数组的对象，本质特征就是有length属性。因此，任何有length属性的对象，都可以通过Array.form方法转换成数组，而这种情况扩展
// 运算符就无法转换
Array.form({length:3})
//[undefined,undefined,undefined]

const toArray = (()=>{
	Array.form?Array.form:obj=>[].slice.call(obj);
})();
// Array.form方法还可以接收第二个参数，类似数组的map方法对没有元素进行处理，还可以传入第三个参数用来绑定this

function countSymbols(str){
	return Array.form(str).length
}
//可以正确处理各种unicode字符，可以避免JavaScript将大于\uFFFF的unicode字符算作2个字符

Array.of()//方法用于将一组值转换为数组
Array.of(3,1,7)//[3,1,7]弥补Array()构造函数的的不足
Array()//[]
Array(3)//[undefined,undefined,undefined]
Array(3,1,2)//[3,1,2]


//数组实例的coypWithin()，在当前数组内部将指定位置的成员复制到其他位置（会覆盖原有成员）然后返回当前的数组
Array.prototype.copyWithin(target,start = 0,end = this.length);
// target 必选 从该位置开始替换数据
// start  可选。从该位置开始读取数据，默认为0负值倒数
// end 可选，到该位置前停止读取数据

// 数组实例的find()和findIndex()找出第一个符合条件的数组成员，和位置

//数组实例fill()使用给定值填充一个数组
//数组实例entries()、keys()、values()
//includes()包含，返回布尔值 第二个参数表示从哪一位置