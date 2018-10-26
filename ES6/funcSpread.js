//函数的扩展
// 在Es6之前不能直接为函数的参数指定默认值，只能采用变通的方法
function log(x,y){
	y == y || 'world';
	console.log(x,y);
}
//在ES6中函数可以直接指定默认值
function log2 (x,y='world'){
	console.log(x,y);
}
/////
//参数的默认值不是传值的，而是每次都重新计算默认值表达式的值，也就是参数默认值是惰性求值的。
let x = 100;
function add(p=x+1){
 console.log(p)
}
add();//101
add();//101
add();//101
add();//101
x = 101;
add();//102
//与解构赋值默认值结合使用
function foo({x,y=100}){
	console.log(x,y);
}
foo({})//undefined,100
foo({x:1})//1,100
foo({x:2,y:9})//2,9
foo()//typeError:can not read property 'x' of undefined


//参数默认值的参数应该是函数尾参数，如果不是尾参数，必须传，否则报错

//指定了默认值以后，函数的length属性将返回没有指定默认值的参数个数，也就是指定了默认参数length属性将失真
(function (a){}).length //1
(function(a==5){}).length//0
(function(a,y=2,z)).length//2

//作用域
//一旦设置参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域(context).等到初始化结束时，作用域就会消失。

var x = 1;
function f(x,y=x){
	console.log(y);
}
f(2)//2

//
let z = 1 ;
function f(y=z){
	let z = 2;
	console.log(y);
}
f()//1

//----------
var x = 1;
function foo(x,y=function(){x=2;}){
	var x = 3;
	y();
	console.log(x)
}
foo()//3
x//1

var x = 1;
function foo(x,y=function(){x=2;}){
	console.log(x)
    x = 3;
	console.log(x)
	y();
	console.log(x)
}
foo()//2
x//1


var x = 1;
function foo(x,y=function(){
	console.log(x)
	x=2;
	console.log(x)
	}){
	console.log(x)
	y();
	console.log(x)
    x = 3;
	console.log(x)
}
foo()
x//


//rest参数(形式...变量名)利用rest参数可以向该函数传入任意数目的参数

//arguments 变量的写法
function sortNumbers(){
	return Array.prototype.slice.call(arguments).sort();
}

//rest参数写法
const sortNumbers = (...numbers) => numbers.sort();


//利用rest改写数组的push方法
function push(array,...items){
	items.forEach((item)=>{
		array.push(item)
		console.log(item)
	})
}
var a = [];
push(a,1,2,3)

//rest之后不能再有其他的参数，否则会报错


//6、绑定this
// 箭头函数可以绑定this对象，大大减少了显式绑定this对象的写法（call、apply、bind）。但是箭头函数并非适用于所有的场景。
// es7提出了“函数绑定”运算符::
// 左边是一个对象，右边是一个函数，该运算符会自动将左边的对象作为上下文环境绑定到右边的函数上
foo::bar;
//等同于
bar.bind(foo);
//由于双冒号返回的还是原对象，因此可以采用链式写法
import {map,takeWhile,forEach} from "iterlib"
getPlay()
::map(x=>x.character())
::takeWhile(x=>x.length>100)
::forEach(x=>console.log(x));

//尾调用：函数式编程的概念，指某个函数的最后一步式调用另一个函数

// 函数调用会在内存形成一个“调用记录”，又称“调用帧”，保存调用位置和内部变量等信息。A->B->C->D 会形成一个“调用栈”
// 尾调用式最后一步，不回保留外层的函数的调用帧

//尾调用--尾调用优化
//原
function factorial(n){
	if(n===1) return 1;
	return n*factorial(n-1);
}
//尾调用
function factorial(n,total){
	if(n===1) return total;
	return factorial(n-1,n*total)
}
factorial(5,1);
// 递归非常消耗内存，需要同事保存成千上百个调用帧，易发生栈溢出
//尾递归
//fibonacci数列
//原
function Fibonacci(n){
	if(n<=1){return 1};
	return Fibonacci(n-1)+Fibonacci(n-2);
}
Fibonacci(10)//89
Fibonacci(100)//栈溢出

//尾递归
function Fibonacci(n,ac1=1,ac2=1){
	if(n<=1){return ac2};
	return Fibonacci(n,ac2,ac1+ac2);
}

//不会栈溢出

// 柯里化：将多参数的函数转换成单函数的形式
function currying(fn,n){
	return function (m){
		return fn.call(this,m,n);
	}
}
function factorial(n){
	if(n===1){return 1}
	return n*factorial(n-1);
}
// O(n)
function tailFactorial(n,total){
	if(n===1) return total;
	return tailFactorial(n-1,n*total);
}
// O(1)
const factorial = currying(tailFactorial,1);
factorial(5);//120
//第二种
function fatorial(n,total=1){
	if(n===1) return total;
	return factorial(n-1,n*total);
}
factorial(5)//120

//蹦床函数---
//可以将递归执行转为循环执行
function tramponline(f){
	while(f && typeof f instanceof Function){
		f = f();
	}
	return f;
}

function sum(x,y){
	if(y>0){
		return sum.bind(null,x+1,y-1);
	}else{
		return x;
	}
}
//sum函数每次执行返回自身的另一个版本
// 现在使用蹦床函数不会出现栈溢出
tramponline(sum(1,100000));


//尾递归优化  ---->  使用“循环”替换“递归”
function tco(f){
	var value;
	var active = false;
	var accumulated = [];//存在参数的数组--积累

	return function accumulator(){
		console.log(arguments)
		//传入参数存在数组里
		accumulated.push(arguments);
		// accumulated   [arguments,arguments,arguments] [[],[],[]...]
		if(!active){
			active = true;
			while(accumulated.length){
				value = f.apply(this,accumulated.shift());
			}
			active = false;
			return value;
		}
	}
}

var sum = tco(function(x,y){
	if(y>0){
		return sum(x+1,y-1);
	}else{
		return x;
	}
})

sum(1,10);


