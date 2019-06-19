const s = new Set();

[2,3,5,4,5,2,2].forEach(x=>s.add(x));
for(let key of s){
    console.log(key);
}

const set = new Set([1,2,3,4,4]);
console.log(
    [...set]
)

const item = new Set([1,2,3,4,5,5,5,5])
item.size;

[...new Set(array)];

// 向set加入值时不会发生类型转换，所以5和‘5’是两个不同的值。


let set = new Set();
set.add({});
set.size;//1
set.add({});
set.size;//2

//set实例有一下属性
// Set.prototype.constructor构造函数，默认set函数
Set.prototype.size
// 方法
let set = new Set();
set.add("first");
set.delete(value);//删除某一个值，返回一个布尔值，表示是否成功
set.has(value);//是否有某个成员
set.clear();//清除所有成员

const properties = new Set();
properties.add("width");
properties.add("height");
console.log(properties)
// Array.from方法可以将Set结构转为数组
const items = new Set([1,2,3,4,5]);
console.log(items)
const array = Array.from(items);

function dedupe(arr){
    return Array.from(new Set(arr));
};

dedupe([1,1,2,3,4,5,4,6])

//遍历操作
// set 结构实例有4个遍历方法

// keys()
// values()
// entries()
// forEach()

// set遍历顺序就是插入顺序

//并集
const arr = new Set([...a,...b]);
//交集
const arr = new Set([...a].filter((x)=>b.has(x)));
//差集
const arr = new Set([...a].filter((x)=>!b.has(x)));


let set  = new Set([1,2,3]);
console.log(Array.from(set,val=>val*2));

// WeakSet结构于set类似;也是不重复的值的集合;但是与set有两个区别
// 第一WeakSet的成员只能是对象，而不能是其他类型
//可以接受一个数组或类似数组的对象作为参数

const ws = new WeakSet();
ws.add({a:1})
console.log(ws)

console.log(typeof [[1,2],[3,4],{a:1}])
console.log(typeof [3,4])

const d = [[1,2],[3,4]];
const ws = new WeakSet(d);
console.log(ws.has([1,2]))

const m = new Map()
m.set("a",111);
console.log(m)

m.get('a');

// 最为map的构造函数，map也可以接受一个数组作为参数，该数组的成员是一个个表示键值对的数组
const map  = new Map([
    ['name','zhangsan'],
    ['age',12]
]);

//Map与其他数据的转换
// Map转为数组
const myMap = new Map();
myMap.set(true,7);
myMap.set({foo:3},['abc']);
[...myMap];
//[[true,7],[{foo:3},['abc']]]
//数组转为map
new Map([
    [true,7],
    [{foo:3},['abc']]
])


// map转为对象
function strMapToObj(strMap){
    let obj = Object.create(null);
    for(let [key,value] of strMap){
        obj[key] = value;
    }
    return obj;
}
//对象转为map
function objToMap(obj){
    let map = new Map();
    for(let k of Object.keys(obj)){
        map.set(k,obj[k]);
    }
}

//map转为json
function strMapToJson(strMap){
    //map键名都是字符串
    return JSON.stringify(strMapToObj(strMap));
}
//有非字符串
function strMapToJson(strMap){
    return JSON.stringify([...strMap])
}

//json转map
function jsonToMap(json){
    //所有键名都是字符串
    return objToMap(JSON.parse(json));
}
//非字符串
function jsonToMap(json){
    return new Map(JSON.parse(json));
}
/* 
WeakMap与Map的区别
1、WeakMap只接受独享最为键名
2、WeakMap的键名所指向的对象不计入垃圾回收机制
 */

 