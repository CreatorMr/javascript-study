/**
 * call:
 * apply:
 * bind:方法创建一个新的函数，在调用时设置this关键字为提供的值。
 *      并在调用新函数时，将给定参数列表作为原函数的参数序列的前若干项。
 * call、apply的使用
 * bind的使用
 * 对比
 * 实现原理
 */
//  bind
var obj = {
    value:'obj',
    getValue:function(){
        return this.value;
    }
}
var obj2 = {
    value:'obj-new'
}
var result = obj.getValue.bind(obj2)
console.log(result())


