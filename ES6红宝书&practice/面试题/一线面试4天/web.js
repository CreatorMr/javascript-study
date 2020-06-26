console.log([] == false) // true
console.log(![] == false) // true

let arr = [10.18, 0, 10, 25, 23]
arr = arr.map(parseInt)
console.log(arr) // 10, NaN, 2, 2, 11

var a = {
  i = 0,
  toString() {
    return ++this.i
  }
};
if (a == 1 && a == 2 && a == 3) {
    console.log(1);
}

var x = 1;
function func(x, y = function anonymous1() {x = 2}) {
    var x = 3;
    y();
    console.log(x);
}
func(5);
console.log(x);
// 3 1

function fun(n, o) {
  console.log(o);
  return {
      fun: function (m) {
          return fun(m, n);
      }
  };
}
var c = fun(1,2).fun(3,4);
c.fun(5);
c.fun(6);
// 2 1 3 3

function Foo() {
  getName = function () {
      console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  console.log(4); 
};
function getName() {
  console.log(5);
}
Foo.getName(); // 2
getName(); // 4 
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 2
new Foo().getName(); // 3
new new Foo().getName(); // 3