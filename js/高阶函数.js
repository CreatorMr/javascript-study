//map
function pow(x){
    return x*x;
}
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var results = arr.map(pow); // [1, 4, 9, 16, 25, 36, 49, 64, 81]
console.log(results);

// map()作为高阶函数，事实上它把运算规则抽象了，因此，我们不但可以计算简单的f(x)=x2，还可以计算任意复杂的函数，比如，把Array的所有数字转为字符串：

var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
arr.map(String); // ['1', '2', '3', '4', '5', '6', '7', '8', '9']

//reduce

// 要把[1, 3, 5, 7, 9]变换成整数13579，reduce()也能派上用场：
var arr = [1, 3, 5, 7, 9];
arr.reduce(function (x, y) {
    return x * 10 + y;
}); // 13579

// 不要使用JavaScript内置的parseInt()函数，利用map和reduce操作实现一个string2int()函数：?
'use strict';

function string2int(s) {
    return s.split('').map(x=>x-0).reduce((x,y)=>{
        return x*10+y
    })
}

// 请把用户输入的不规范的英文名字，变为首字母大写，其他小写的规范名字。输入：['adam', 'LISA', 'barT']，输出：['Adam', 'Lisa', 'Bart']。

function normalize(arr){
    return arr.map(x=>x.toLowerCase()).map(x=>{
        return x.slice(0,1).toUpperCase() + x.slice(1)
    })
}

// 利用map()把字符串变成整数，他写的代码很简洁：

'use strict';

var arr = ['1', '2', '3'];
var r;
r = arr.map(str => parseInt(str))
r = arr.map(parseInt)//1,NaN,NaN

// 在一个Array中，删掉偶数，只保留奇数
var arr = [1, 2, 4, 5, 6, 9, 10, 15];
arr.filter(x=>{
    return x%2 !==0;
})

// 把一个Array中的空字符串删掉
var arr = ['A', '', 'B', null, undefined, 'C', '  '];
arr.filter(x=>{
    return x && s.trim();
})

// 利用filter，可以巧妙地去除Array的重复元素
'use strict';

var r,
    arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
r = arr.filter((element,index,selfArray)=>{
    return selfArray.indexOf(element) === index
})

// 请尝试用filter()筛选出素数?
function get_primes(){
    return arr.filter((element)=>{
        var flag = true
        if(element<2)
            return false
        for(let i = 2; i < element;i++){
            if(element%i===0){
                flag = false
            }
        }
        return flag
    });
}

//闭包
function lazy_sum(arr) {
    var sum = function () {
        return arr.reduce(function (x, y) {
            return x + y;
        });
    }
    return sum;
}
/* 
当我们调用lazy_sum()时，返回的并不是求和结果，而是求和函数
 */
var f = lazy_sum([1, 2, 3, 4, 5])
f()//15
/* 
在这个例子中，我们在函数lazy_sum中又定义了函数sum，
并且，内部函数sum可以引用外部函数lazy_sum的参数和局部变量，
当lazy_sum返回函数sum时，相关参数和变量都保存在返回的函数中，
这种称为“闭包（Closure）”的程序结构拥有极大的威力 
请再注意一点，当我们调用lazy_sum()时，每次调用都会返回一个新的函数，即使传入相同的参数
*/

var f1 = lazy_sum([1, 2, 3, 4, 5]);
var f2 = lazy_sum([1, 2, 3, 4, 5]);
f1 === f2; // false
//f1()和f2()的结果互不影响

function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push(function () {
            return i * i;
        });
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];

// 在上面的例子中，每次循环，都创建了一个新的函数，然后，把创建的3个函数都添加到一个Array中返回了。

// 你可能认为调用f1()，f2()和f3()结果应该是1，4，9，但实际结果是：

f1(); // 16
f2(); // 16
f3(); // 16

//********* */ 返回闭包时牢记的一点就是：返回函数不要引用任何循环变量，或者后续会发生变化的变量。
/* 
// 如果一定要引用循环变量怎么办？方法是再创建一个函数，用该函数的参数绑定循环变量当前的值，
无论该循环变量后续如何更改，已绑定到函数参数的值不变
 */
function count2(){
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push((function (n){
            return function(){
                return n*n;
            }
        })(i));
    }
    return arr;
}
var results = count2();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];

f1(); // 1
f2(); // 4
f3(); // 9

// 在没有class机制，只有函数的语言里，借助闭包，同样可以封装一个私有变量。我们用JavaScript创建一个计数器

function create_counter(initial){
    var x = initial || 0
    return {
        icon:function(){
            x++
            return x;
        }
    }
}
var t = create_counter()
t.icon()
t.icon()
t.icon()
var t2 = create_counter(12)
t2.icon()
t2.icon()
t2.icon()
function create_counter(initial){
    var x = initial || 0
    return (function(n){
        return function(){
            n++
            return n
        }
    } )(x)  
}


//使用函数进行加法

// 定义数字0:
var zero = function (f) {
    return function (x) {
        return x;
    }
};

// 定义数字1:
var one = function (f) {
    return function (x) {
        return f(x);
    }
};

// 定义加法:
function add(n, m) {
    return function (f) {
        return function (x) {
            return m(f)(n(f)(x));
        }
    }
}
var two = add(one,one)