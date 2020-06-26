
const shape = {
  radius: 10,
  diameter() {
    return this.radius * 2;
  },
  perimeter: () => 2 * Math.PI *  this.radius
}

console.log(shape.diameter()) // 20 
console.log(shape.perimeter())// NaN

const add = x => x + x;
function myFunc(num=2 , value=add(num)) {
  console.log(num, value)
}
myFunc() // 2 4
myFunc(3)// 3 6

let t = [...'Lyida']
console.log(t) // ["L", "y", "i", "d", "a"]

const a = {}
const b = {key:'b'}
const c = {key:'c'}
a[b] = 123
a[c] = 456
console.log(a[b]) // 456

let name = 'aa'
// var name = 'aa'
function myName () {
  console.log(name)
  let name = 'bbb'
  // var name = 'bbb'
}
myName()

console.log('begin')
setTimeout(() => {
  console.log('setTimeout 1');
  Promise.resolve().then(() => {
    console.log('promise 1')
    setTimeout(()=>{
      console.log('setTimeout2 between promise1&2')
    })
  }).then(()=>{
    console.log('promise2')
  }).then( (r)=> {
    console.log(r, '333')
  })
}, 0)
console.log('end')


Array.prototype.map = function (callback, thisArg) {
  return this.reduce((accumulator, cur, index, array) => {
    accumulator.push(callback.bind(thisArg)(cur, index, array))
    return accumulator;
  }, [])
}
// 1、prototype
// 2、map的参数 callback thisArg
// 3、callback 的参数 value index array
// var new_array = arr.map(function callback(currentValue[, index[, array]]) {
//   // Return element for new_array 
//  }[, thisArg])

// 实现  
/**
 * 使用js实现一个repeat方法 输入输出如下：
 */
function repeat(func, times, wait) {}
const repeatFunc = repeat(alter, 4, 3000);
repeatFunc('hello world') // 会alter 4 次 hello world  每次间隔3秒


function repeat(func, times, wait) {
  return function () {
    let i = 0;
    var interval = setInterval(() => {
      i+=1
      console.log(arguments)
      if(i === times) {
        clearInterval(interval)
        return;
      }
      func.apply(null, arguments)
    }, wait)
  }
}
const repeatFunc = repeat(alter, 4, 3000);
repeatFunc('hello world')

// 输入一位数组array和n , 找出和值为sum 的n 个元素即可
let array = [2,3,1,10,4,30],n = 2,sum = 31;
function findGroup(arr,n,sum){
  // 动态规划
}
let result = findGroup(array, 2, 31)
console.log(result)
// result =[1,30] TOD



/**
 * 数组扁平化处理  原数组[[0],[2,3,4],1,[1,[2,3]]]，输出[0,2,3,4,1,1,2,3]
 */
var t  = [[0],[2,3,4],1,[1,[2,3]]]
var normalizeList = arr => arr.reduce((pre, cur, index, arr) => Array.isArray(cur) ? pre.concat(normalizeList(cur)) : pre.concat(cur), [])
console.log(normalizeList(t))



var b = 10;
(function b(){
  b = 20
  console.log(b)
})()