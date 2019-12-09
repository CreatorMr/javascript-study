Array.prototype.map = function(callback,thisArg){
    // 判断this
    if(this == null) {
       throw new TypeError("Cannot read property 'map' of null or undefined");
    }
 
     
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function')
    } 
    let obj = Object(this);
    let len = obj.length >>> 0;// 右移0位 变成无符号32位整数  保证此处是非负数
    
    
    let k = 0;
    let newArray = new Array(len)
 
    while(k < len) {
         // 判断 k 是obj 的属性
        if(k in obj) {
 
           let kValue = obj[k];
           // callback传入的参数  currentValue、index、array
           let newKValue = callback.call(thisArg, kValue, k, obj)
           newArray[k] = newKValue
        }
        k++;
 
    }
    return newArray;
}