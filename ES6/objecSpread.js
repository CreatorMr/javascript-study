//对象的扩展
// 属性的简洁表示法
// ES6允许直接写入变量和函数作为对象的属性和方法
var foo = 'bar';
var baz = {foo};
baz //{foo:'bar'}

var obj = {
	method:function(){
		//...
	}
}
var obj = {
	method(){
		//...
	}
}
//属性的赋值器setter和取值器getter也采用了这种方法
var card = {
	_wheels:4,

	set _wheels(value){
		if(value<this._wheels){
			throw new Error("")
		}
		this._wheels = value;
	},
	get _wheels(){
		return this._wheels;
	}
}

//Object.is()比较两个值是否严格相等，与严格的相等运算符===基本一致
// ES5中比较两个值是否相等，只有两个运算符，相等运算符==和严格相等运算符===
// 前者会自动转换数据类型，后者NaN不等与自身，+0等-0.
Object.is('foo','foo')//true
Object.is(+0,-0)//false
Object.is(NaN,NaN)//true

Object.assign()//将源对象的所有可枚举的属性复制到目标对象中
var a = {a:1};
var b = {b:2};
var c = {c:3};
Object.assign(a,b,c);
//{a:1,b:2,c:3}a目标对象，由同名的属性，后面的会覆盖前面的

// 如果参数不是对象，会先转成对象
typeof Object.assign(2) === 'object'// true
// 由于undefined和null不能转成对象，所以传入这两者均报错。但是，除了字符串会以数组的形式复制到目标对象，其他的值都不会产生效果

Object.assign()//方法实行的是浅复制、而不是深复制。也就是说：如果源对象某个属性上的值是对象，那么目标对象复制得到的是这个对象的引用

var obj = {a:{b:1}}
var obj2 = Object.assign({},obj);
obj.a.b = 2;
obj2.a.b//2

//常见用途
//1、为对象添加属性
class Point{
	constructor(x,y){
		Object.assign(this,{x,y});
	}
}
//为对象

//2、为对象添加方法
Object.assign(SomeClass.prototype,{
	someMethod(arg1,arg2){
		// ...
	}
})

//3、克隆对象
function clone(obj){
	return Object.assign({},obj);
}

//4、合并多个对象
const merge = (...source)=>Object.assign({},...source);

//5、为属性指定默认值
const DEFAULTS = {
	logLevel:0,
	outputFormat:'html'
}
function processContent(options){
	options = Object.assign({},DEFAULTS,options)
}
//利用同名属性覆盖的原理


// 属性的可枚举行
// 对象的每一个属性都具有一个描述对象，用于控制该属性的行为。

// Object.getOwnPropertyDescriptor()方法可以获取该属性的描述对象
let obj = {foo:123};
Object.getOwnPropertyDescriptor(obj,'foo');
// {
// 	value:123,
// 	writable:true,
// 	enumerable:true,
// 	configurable:true
// }

// enumerable:false 某些操作会被忽略
// ES5中for...in循环：只遍历对象自身的和继承的可枚举属性 ---会返回继承的属性
// Object.keys(),返回对象自身的所有可枚举属性的键名
// JSON.stringif(),只串行化对象自身的可枚举的属性
// ES6新增一个操作，Objec.assign()也会忽略enumerable:false的属性

// ES6规定所有class的原型的方法都是不可枚举的
// 尽量不要用for。。。in，而用Object.keys()代替


// 属性的遍历   ES6一共有5种方法可以遍历对象的属性
for(let item in items){

}
// 返回一个数组，包含对象自身和继承的所有可枚举的属性（不含Symol的属性）

Object.keys()
// 返回一个数组，包含对象自身（不含继承）的所有可枚举的属性（不含Symol的属性）
Object.getOwnPropertyNames(obj);
// 返回一个数组，包含对象自身的所有属性（不含Symbol属性，但是包含不可枚举的属性）
Object.getOwnPropertySymbols(obj);
// 返回一个数组，包含对象的自身的所有Symbol属性
Reflect.ownKeys(obj);
//返回一个数组，包含对象自身的所有属性
// __proto__属性、Object.setPrototypeOf()、Object.getPrototypeOf()

//ES6写法
var obj = {
	method:function(){
		// ....
	}
}
obj.__proto__ = someOtherObj;

//es5写法
var obj = Object.create(someOtherObj);
obj.method = function(){
	// ...
}

// 在实现上，实际上__proto__调用的是Object.prototype.__proto__具体实现
Object.defineProperty(Object.prototype,'__proto__',{
	get (){
		let _thisObj = Object(this);
		return Object.getPrototypeOf(_thisObj);
	},
	set(proto){
		if(this === undefined || this === null){
			throw new TypeError();
		}
		if(!isObject(this)){
			return undefined;
		}
		if(!isObject(proto)){
			return undefined;
		}
		let status = Reflect.setPrototypeOf(this,proto);
		if(!status){
			throw new TypeError();
		}
	},
});
function isObject(value){
	return Object(value) === value;
}

// Object.setPrototypeOf()方法作用与__proto__相同用来设置一个prototype对象，返回参数对象本身。
//es6推荐设置原型的方法
Object.setPrototypeOf(object,proto);
//该方法等同于
function setPrototypeOf (obj,proto){
	obj.__proto__ = proto;
	return obj;
}

let proto = {};
let obj = {x:10}
Object.setPrototypeOf(obj,proto);
proto.y = 2;
proto.z = 3;

obj.x//10
obj.y//2
obj.z//3

Object.getPrototypeOf()//获取一个对象的prototype对象
// 参数不是对象的自动转成对象
Object.keys()
Object.values()
Object.entries()
var obj = {foo:'bar',baz:42}
Object.entries(obj)
//[['foo','bar'],['baz',42]]如果原对象是Symbol值会忽略
// 基本用途是遍历对象的属性
let obj = {one:1,two:2};
for(let [k,v] in Object.entries(obj)){
	console.log(	
		`${JSON.stringify(k)}:${JSON.stringify(v)}`
		);
}

// 另一个用处将对象转为真正的Map结构
var obj = {
	foo:'bar',
	baz:42
}

var map = new Map(Object.entries(obj));

// 实现entries
// Generator函数的版本
function* entries(obj){
	for(let key in Object.keys(obj)){
		yield [key,obj[key]];
	}
}

//非Generator版本
function entries(obj){
	let arr = [];
	for(let key in Object.keys(obj)){
		arr.push([key,obj[key]]);
	}
	return arr;
}

// 对象的扩展运算符
// 解构赋值-对象的解构赋值用于从一个对象取值，相当于将所有的可遍历、但尚未被读取的属性分配到指定的对象上面。所有的键和他们的值
// 都会赋值到新的对象上面
let {x,y,...z} = {x:1,y:2,a:3,b:4}
x//1
y//2
z//{a:3,b:4}
// 解构赋值的复制是浅复制

// 解构赋值的一个用处是扩展某个函数的参数
function baseFunc({a,b}){
	console.log(a+" : " +b);
}

let z = {a:3,b:4};
let n = {...z};
n//{a:3,b:4}

let aClone = {...a};
//等同于
let aClone = Object.assign({},a);

// 上面的例子只是复制了对象实例的属性，如果想完整的克隆一个对象，还要复制对象原型的属性
//写法一
const clone1 = {
	__proto__:Object.getPrototypeOf(obj),
	...obj
}
//写法二---推荐
const clone2 = Object.assign(
		Object.create(Object.getPrototypeOf(obj)),
		obj
	)
//利用扩展运算符修改部分属性
const a = {
	...previosVersion,
	name:'New name'
}
//null 传导运算符
var message = {
	body:{
		user:{
			firstName:1
		}
	}
}
const a = (message&& message.body&&message.body.user&&message.body.user.firstName)||'sds';
// const b = message?.body?.user?.firstName :'sds';提案
