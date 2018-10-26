// es引入的新的原始数据类型symbol，表示独一无二的值，第7中数据类型

let s = Symbol();

Symbol.for('bar') === Symbol.for('bar');//全局环境的
//true

Symbol('baz') === Symbol('baz');
//false


//实例：模块的singleton模式

// singleton模式：调用一个类不管在什么时候都返回同一个实例




var a = require('./mod.js')
global.foo = 123;
console.log(a);

//es6提供了11个内置的symbol值
//···········～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～～


Symbol.hasInstance
// 对象的Symbol.hasInstance方法指向一个内部属性，对象使用instacnof会调用这个方法，判断该对象是否为某个构造函数的实例。
foo instanceof Foo;
//在语言内部实际调用的是Foo[Symbol.hasInstance](foo)

class MyClass{
	[Symbol.hasInstance](foo){
		return foo instanceof Array;
	}
}
console.log([1,2,3] instanceof new MyClass());

class Even{
	[Symbol.hasInstance](obj){
		return Number(obj)%2 === 0;
	}
}

console.log(1 instanceof new Even());
console.log(2 instanceof new Even());
console.log(12345 instanceof new Even());

//Symbol.isConcatSpreadable属于一个布尔值，表示该对象使用Array.prototypr.concat()时是否可以展开

let arr1 = ['c','d'];
['a','b'].concat(arr1,'e')
//['a','b','c','d','e']
arr1[Symbol.isConcatSpreadable]//undefined

let arr2 = ['c','d'];
arr2[Symbol.isConcatSpreadable] = false;
['a','b'].concat(arr2,'e');
//['a','b',['c','d'],'e']

//类似数组的对象也可以展开，但它的Symbol.isConcatSpreadable属性的默认为false，需要手动打开

Symbol.species
/* 对象的Symbol.species属性指向当前对象的构造函数。创造实例时默认会调用这个方法，即使用这个属性返回的函数当作构造函数来
*创造新的实例对象。
*/

class MyArray extends Array{
	//覆盖父类的构造函数
	static get [Symbol.species](){
		return Array;
	}
}

/*
// 子类MyArray继承了父类Array。创建实例对象时，本来会调用它自己的构造函数，但是由于定义了Symbol.species属性，
	所以会使用这个属性返回的函数来创建实例。
 */

var a = new MyArray(1,2,3);
var mapped = a.map(x=>x * x);

mapped instanceof MyArray;//false
mapped instanceof Array;//true

/* 
	Symbol.match属性指向一个函数，当执行str.match(myObject)时，如果该属性存在时，会调用它返回该方法的返回值
 */

 String.prototype.match(regExp);
 //等同于
 regExp[Symbol.match](this)

 class MyMatcher{
	 [Symbol.match](string){
		 return 'hello world'.indexOf(string)
	 }
 }
 'e'.match(new MyMatcher()) //1

//  Symbol.replace指向一个方法，当对象被String.prototype.replace方法调用的时候会返回该方法的返回值

String.prototype.require(searchValue,replaceValue);
//等同于
searchValue[Symbol.replace](this,replaceValue)

const x = {};
x[Symbol.replace] = (...s) => console.log(s);

'Hello'.replace(x,'world')

Symbol.search

String.prototype.search(regexp);
//等同于
regexp[Symbol.search](this);

class MySearch{
	constructor(value){
		this.value = value
	}
	[Symbol.search](string){
		return string.indexOf(this.value)
	}
}

Symbol.split

String.prototype.split(separator,limit)

separator[Symbol.split](this,limit);

class MySplit{
	constructor(value){
		this.value = value;
	}
	[Symbol.split](string){
		console.log(string)
		var index = string.indexOf(this.value);
		if(index == -1){
			return string;
		}
		return [
			string.substr(0,index),
			string.substr(index,this.value.length)
		]
	}
}

console.log('foobar'.split(new MySplit('foo')))//['','bar])

Symbol.iterator

var myIterable = {};
myIterable[Symbol.iterator] = function *(){
	yield 1;
	yield 2;
	yield 3;
};
[...myIterable]//[1,2,3]

class Collection{
	*[Symbol.iterator](){
		let i = 0;
		while(this[i] !== undefined){
			yield this[i];
			++i;
		}
	}
}

let myCollection = new Collection();
myCollection[0] = 1;
myCollection[0] = 2;

for(let value of myCollection){
	console.log(value);
}
//1
//2

// Symbol.toPrimitive返回对像的原始类型
// Symbol.toStringTag在对象上调用Object.prototype.toString方法时，如果这个属性存在，其返回值会出现在toString方法返回的字符串中
// Symbol.unscopables指定使用with关键字时那些属性会被with环境排除