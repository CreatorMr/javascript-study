// 如何在仅支持es5的浏览器中  支持map、reduce 方法

var t = [1,2,3,4,5,6]
console.log(t.map((currentValue,index,arr) => {return x*2;}),window)
console.log(t.reduce((pre,current,arr)=>{return pre+current;},0))
/**
 * @param {*} fn currentValue,index,arr 
 * @param {*} context  
 */
Array.prototype.mapNew = function (callback, context) {
    let result = []
    for(let i = 0; i < this.length; i ++) {
        result.push(callback.call(context,this[i],i,this));
    }
    return result;
}
console.log(t.mapNew((x) => {
    return x*2;
}))

/**
 * @param {*} fn (pre,current,index,array)
 * @param {*} initVal  初始值 
 */
if('function' !== typeof Array.prototype.reduce) {
    Array.prototype.reduce = function (callback, initVal) {
        'use strict';
        if (null === this || 'undefined' === typeof this) {
          throw new TypeError(
              'Array.prototype.reduce called on null or undefined');
        }
        if ('function' !== typeof callback) {
          throw new TypeError(callback + ' is not a function');
        }
        let result;
        if(arguments.length > 1) { // 传入初始值
            result = initVal;
        } 
        if(arguments.length === 1 && this.length ===0) {
            throw new TypeError(
                'Reduce of empty array with no initial value'
            )
        }
        for(let i =0;i<this.length;i++) {
            if(this.hasOwnProperty(i)) {
                result = callback(result, this[i], i, this)
            } else {
                result = this[i]
            }
        }
        return result;
    }
}

console.log(t.reduceNew((pre,current)=> {
    return pre+current;
}, 0))




