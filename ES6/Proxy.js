/* 

Proxy用于修改某秀操作的默认行为，等同于在语言层面作出修改，所以属于一种“元编程”
可以理解为在目标对象前架设一个“拦截层”，外界对象访问都必须先通过这层拦截，因此提供了一种机制可以对外界的访问进行过滤和改写

*/

var obj = new Proxy({},{
    get:function(target,key,receiver){
        console.log(`getting ${key}!`);
        return Reflect.get(target,key,receiver);
    },
    set:function(target,key,value,receiver){
        console.log(`setting ${key}`);
        return Reflect.set(target,key,value,receiver);
    }
});

var proxy = new Proxy({},{
    get:function(target,property){
        return 35;
    }
})
console.log(proxy.time)


var handler = {
    get:function(target,name){
        if(name == 'prototype'){
            return Object.prototype;
        }
        return 'Hello,'+name;
    },
    apply:function(target,thisBuilding,args){
        return args[0];
    },
    construct:function(target,args){
        return {value:args[1]};
    }
};

// Proxy实例方法
var person = {
    name:"张三"
};
var proxy = new Proxy(person,{
    get:function(target,property){
        if(property in target){
            return target[property];
        }else{
            throw new ReferenceError("Property \" "+property +"\" does not exist.");
        }
    }
});
console.log(window)


// 将get属性执行某个函数，从而实现属性的链式操作

var pipe = (function(){
    return function(value){
        var funcStack = [];
        var proxy = new Proxy({},{
            get:function(pipeObject,fnName){
                if(fnName === 'get'){
                    return funcStack.reduce(function(val,fn){
                        return fn(val);
                    },value)
                }
                funcStack.push(window[fnName]);
                return proxy;
            }
        });
        return proxy;
    }
})()

var double = n=>n*2;
var pow = n=>n*n;
var reverseInt = n=>n.toString().split("").reverse().join("") | 0;

pipe(3).double.pow.reverseInt.get;
