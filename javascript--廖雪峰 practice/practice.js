function Foo() {
  getName = function () { 
   console.log (1); 
  };
  return this;
 }
 Foo.getName = function () { 
  console.log (2); 
 };
 Foo.prototype.getName = function () { 
  console.log('baidu' && 'google'); 
 };
 var getName = function () { 
  console.log (4);
 };
 function getName() { 
  console.log (5);
 }
 
 /* 
 在JavaScript预编译的时期 
 变量、函数声明 提前
 Foo(){}
 Foo.getName;
 Foo.prototype.getName;
 var getName;
 getName(){}


 最后getName ---4
 */
 // 请写出一下的输出结果
 Foo.getName(); //2
 getName(); //4
 Foo().getName();//1  
 getName();  //1
 new Foo.getName();//2  
 new Foo().getName();  //google
 new new Foo().getName();//google
/* 
分析按”@小小沧海“博客很清晰。
首先定义了一个叫Foo的函数，
之后为Foo创建了一个叫getName的静态属性存储了一个匿名函数，
之后为Foo的原型对象新创建了一个叫getName的匿名函数。
之后又通过函数变量表达式创建了一个getName的函数，最后再声明一个叫getName函数。

第一问的 Foo.getName 自然是访问Foo函数上存储的静态属性，自然是2，没什么可说的。
第二问，直接调用 getName 函数。既然是直接调用那么就是访问当前上文作用域内的叫getName的函数，所以跟1 2 3都没什么关系。
此处有两个坑，一是变量声明提升，二是函数表达式。
function Foo() {
    getName = function () { alert (1); };
    return this;
}
var getName;//只提升变量声明
function getName() { alert (5);}//提升函数声明，覆盖var的声明

Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
getName = function () { alert (4);};//最终的赋值再次覆盖function getName声明

getName();//最终输出4

第三问的 Foo().getName(); 先执行了Foo函数，然后调用Foo函数的返回值对象的getName属性函数。

Foo函数的第一句  getName = function () { alert (1); };  是一句函数赋值语句，注意它没有var声明，所以先向当前Foo函数作用域内寻找getName变量，没有。再向当前函数作用域上层，即外层作用域内寻找是否含有getName变量，找到了，也就是第二问中的alert(4)函数，将此变量的值赋值为 function(){alert(1)}。 

此处实际上是将外层作用域内的getName函数修改了。

注意：此处若依然没有找到会一直向上查找到window对象，若window对象中也没有getName属性，就在window对象中创建一个getName变量

简单的讲，this的指向是由所在函数的调用方式决定的。而此处的直接调用方式，this指向window对象。

遂Foo函数返回的是window对象，相当于执行 window.getName() ，而window中的getName已经被修改为alert(1)，所以最终会输出1

此处考察了两个知识点，一个是变量作用域问题，一个是this指向问题
第四问
直接调用getName函数，相当于 window.getName() ，因为这个变量已经被Foo函数执行时修改了，遂结果与第三问相同，为1

第五问 new Foo.getName(); ,此处考察的是js的运算符优先级问题。
（.）的优先级高于new操作 new (Foo.getName)();
第六问 new Foo().getName() ，首先看运算符优先级括号高于new，实际执行为
(new Foo()).getName()
遂先执行Foo函数，而Foo此时作为构造函数却有返回值，所以这里需要说明下js中的构造函数返回值问题。

第七问, new new Foo().getName(); 同样是运算符优先级问题。

最终实际执行为：

new ((new Foo()).getName)();
先初始化Foo的实例化对象，然后将其原型上的getName函数作为构造函数再次new。

遂最终结果为3


这里确实是(new Foo()).getName()，但是跟括号优先级高于成员访问没关系，
实际上这里成员访问的优先级是最高的，因此先执行了 .getName，但是在进行左侧取值的时候，
 new Foo() 可以理解为两种运算：new 带参数（即 new Foo()）和函数调用（即 先 Foo() 取值之后再 new），
 而 new 带参数的优先级是高于函数调用的，因此先执行了 new Foo()，或得 Foo 类的实例对象，再进行了成员访问 .getName。
 */

/* 
  构造函数返回值问题
  在传统语言中，构造函数不应该有返回值，实际执行的返回值就是此构造函数的实例化对象。
  而在js中构造函数可以有返回值也可以没有。

  1、没有返回值则按照其他语言一样返回实例化对象。
  2、若有返回值则检查其返回值是否为引用类型。如果是非引用类型，
   如基本类型（string,number,boolean,null,undefined）则与无返回值相同，实际返回其实例化对象。
  3、若返回值是引用类型，则实际返回值为这个引用类型

*/

function fun(n,o) {
  console.log(o)
  return {
    fun:function(m){
      return fun(m,n);
    }
  };
}

var a = fun(0);  a.fun(1);  a.fun(2);  a.fun(3);
var b = fun(0).fun(1).fun(2).fun(3);
var c = fun(0).fun(1);  c.fun(2);  c.fun(3);


//如何在js代码中消除for循环
//问题一： 将数组中的 "0" 和空值去除
const arrContainsEmptyVal = [3, 4, 5, 2, 3, undefined, null, 0, ""];
const compact = arr => arr.filter(Boolean)
// 问题二： 判断字符串中是否含有元音字母
const randomStr = "hdjrwqpi";
const isVowel = char => ["a", "e", "o", "i","u"].includes(char); 
const containsVowel = str => [...str].some(isVowel); 
var falg = containsVowel(randomStr);//true
// 將數組中的 VIP 用户餘額加 10
const VIPUsers = [
  { username: "Kelly", isVIP: true, balance: 20 },
  { username: "Tom", isVIP: false, balance: 19 },
  { username: "Stephanie", isVIP: true, balance: 30 }
];

VIPUsers.map((user) => {
  user.isVIP?user.balance+10:user
})
VIPUsers.map(
  user => (user.isVIP?{...user,balance:user.balance+10}:user)
)
// 問題四：判斷用户是否全部是成年人

const users = [
  { name: "Jim", age: 23 },
  { name: "Lily", age: 17 },
  { name: "Will", age: 25 }
];

const t = users.every(user => {
  return user.age<18;
})
//查询用户不是成年人的
const arr = users.find( user => user.age<18)

// 問題六：將數組中重複項清除

const dupArr = [1, 2, 3, 3, 3, 3, 6, 7];
const uniq = [...new Set(dupArr)]

// 問題七：生成由随机整数组成的数组，数组长度和元素大小可自定义
const genNumArr = (length,limit) => {
  return Array.from({length}, _ => Math.floor(Math.random()*limit))
}
genNumArr(10,100)
// Array.from(arrayLike, mapFn, thisArg) <==>Array.from(arrayLike).map(mapFn, thisArg)
/* 
  参数：
    arrayLike：想要转换成数组的伪数组对象或可迭代对象。
    mapFn（可选）：如果指定了该参数，新数组中的每个元素会执行该回调函数，就是在生成的数组上在执行一次map方法在返回。
    thisArg（可选）：执行回调函数mapFn时this对象
  作用：
    将类似数组的对象和可遍历对象 转换成真正的数组
    1、伪数组对象（拥有一个length属性和若干索引属性的任意对象）
    2、可迭代对象（可以获取对象中的元素，如map和set等
 */
//字符串转换
Array.from('function')
//将字符串转为数组，然后返回字符串的长度。
//因为它能正确处理各种 Unicode 字符，可以避免 JavaScript 将大于\uFFFF的 Unicode 字符，算作两个字符的 bug。
Array.from('qwerty').length
//6

//含有length的类似数组对象转换
let arrayLike = {
  '0':'a',
  '1':'b',
  '2':'c',
  'length':3
}
let arr2 = Array.from(arrayLike);//['a','b','c']
//只含有length的对象转换
Array.from({length:2})
//[undefined,undefined]

//set转换
let s = new Set(['foo', 'aa']); 
Array.from(s); 
// ["foo", 'aa']

//map转换
let m = new Map([[1, 2], [2, 4], [4, 8]]);
Array.from(m); 
// [[1, 2], [2, 4], [4, 8]]

//arguments数组转换
function f() {
  return Array.from(arguments);
}
f(1, 2, 3);
// [1, 2, 3]
// 实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，转换成数组
let ps = document.querySelectorAll('p');
let a = Array.from(ps);

//使用第二个参数
Array.from([1,3,4],x=>x+10)//[11,13,14]

Array.from({length: 5}, (v, i) => i);
// [0, 1, 2, 3, 4]
//取出一组 DOM 节点的文本内容。
let ps = document.querySelectorAll('span');
let a = Array.from(ps,s => s.textContent);
//["1", "2", "3", "4", "5"]

function combine(){ 
  let arr = [].concat.apply([], arguments);  //[1, 2, 2, 2, 3, 3]没有去重复的新数组 
  return Array.from(new Set(arr));//new Set(arr): Set(3) {1, 2, 3}
} 

var m = [1, 2, 2], n = [2,3,3]; 
console.log(combine(m,n)); // [1, 2, 3]
// 使用thisArg绑定this
//这里this就指向了{a:1}
Array.from([1, 2, 3],x=>{return  x + this.a},{a:1});   
//[2, 3, 4]
function args(){
return Array.prototype.slice.apply([],arguments)
}

//给出一个函数，传入三个参数，函数，执行次数，间隔时间
function func(fn,n,time){;
  return function(x){
    for(let i=0;i<n;i++){
      setTimeout(() => {
        fn(x)
      }, i*time);
    }
  }
}
var t = func(window.alert,4,3000);
t('hello')

// 类数组转成数组
function similarArrayToArray(arr){
  // return Array.prototype.slice.call(arguments)
  // return Array.from(arguments)
  return [...arguments]
  
}

console.log('beging')
setTimeout(()=>{
    console.log('setTimeout')
    Promise.resolve().then(()=>{
        console.log('promise1')
        setTimeout(()=>{
            console.log('setTimeout promis1 && promis2')
        })
    }).then(()=>{
        console.log('promise2')
        
    }).then(()=>{
        console.log('ssss')
    })
},0)
new Promise((resolve,reject)=>{
    console.log('eeeee')
    for(let i =0;i<99;i++){
        console.log('chuce')
        resolve();
    }
    console.log('sdfasd')
}).then(()=>{
    console.log('then')
})

if([] == []) {
  console.log('[] == [] 为' + ([] == []))
}
if([1] == [1]) {
  console.log('[1] == [1] 为' + ([1] == [1]))
}
if([] === []) {
  console.log('[] === [] 为' + ([] === []))
}
if([] == false) {
  console.log('[] == false 为' + ([] == false))
}
if({} == {} ){
  console.log('{} == {}' + " " + {}=={})
}
if({a:1} == {a:1} ){
  console.log('{a:1} == {a:1}' + " " + {a:1}=={a:1})
}
if({} == false) {
  console.log('{} == false 为' + ({} == false))
}
if([] === false) {
  console.log('[] === false 为' + ([] === false))
}
if({} === false) {
  console.log('{} === false 为' + ({} === false))
}
/* 
 javascript 的隐式转换。比如-, *, /,和%等算术运算符都会把操作数转换成数字的，
 但是“+”号就有点不一样了，有些情况下，它是算术加号，有些情况下，是字符串连接符号，
 具体的要看它的操作数
 */
3+true //4
// 字符串和数字相加，不管式数字在前还是在后，都是将数字转成字符串在相加
'2' + 3 //'23'
2 + '3' //'23'

// + 号的运算顺序式从左到右的
1 + 2 + '3' // '33'
1 + "2" + 3; // "123"

/*
 同时在隐式转换也存在一些错误的时候
 null会转成 0 。 undefined会转成NaN 

 JavaScript提供了isNaN来检测某个值是否为NaN，
 但是，这也不太精确的，因为，在调用isNaN函数之前，
 本身就存在了一个隐式转换的过程，它会把那些原本不是NaN的值转换成NaN的

*/
isNaN("foo"); // true
isNaN(undefined); // true
isNaN({}); // true
isNaN({ valueOf: "foo" }); // true


//那么就没有办法检测NaN了吗，不是的，！== 这个时候说我可以：哈哈，NaN不是不等于自身嘛那就自己和自己比
var x = NaN 
x !== x // true
var y = []
y !== y // false 一定是自己和自己比  【】！== 【】 这个不是自己和自己比

/* 
对象的隐式转换
1、对象是可以转换成原始值的，常见的是转成字符串
 */
'this is string' + Object
//"this is stringfunction Object() { [native code] }"
'this is string' + Array
//"this is stringfunction Array() { [native code] }"
'this is string' + Math
//"this is string[object Math]"
var t = {a:1}
'this is a Object' + t
// "this is a Object[object Object]"

/* 对象 */
//例如有时候需要判断是不是数组
var array = []
Object.prototype.toString.call(array)//"[object Array]"

function getFunctionName(fun){
  if(fun.name !== undefined) {
    return fun.name;
  }
  debugger
  console.log(fun)
  var res = fun.toString()
  console.log(res)
}
function test(){
}
console.log(getFunctionName(()=>{}))
