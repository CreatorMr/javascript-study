var obj = {
    value:'obj',
    getValue:function(){
        console.log('打印this')
        console.log(this)
        return this.value;
    }
}
var obj2 = {
    value:'obj-new'
}

var result = obj.getValue.bind(obj2)
console.log(result)