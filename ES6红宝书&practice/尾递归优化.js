function sum(x, y) {
    if (y >0) {
        return sum(x+1, y-1)
    } else {
        return x;
    }
}
// 1   4
console.log(sum(1,4))
console.log(sum(1,1000000))

function tco(f){
    var value;
    var active = false;
    var accumulated = [];
    var num = 0
    
    return function accumnlator(){
        // console.log(arguments)  //  { '0': 1, '1': 10 }
        // console.log(Array.prototype.slice.call(arguments))  //  [ 1, 10 ]
        accumulated.push(arguments)
        // console.log(accumulated)    //  [ { '0': 1, '1': 10 } ]
        if (!active) {
            active = true
            console.log('进入active判断成功' + num)
            num++
            while(accumulated.length) {

                value = f.apply(this, accumulated.shift());
                // console.log('执行一次之后')
                // console.log(accumulated)
            }
            active = false
            return value;
        }
        
    }

}

var sum = tco(function(x, y) {
    if (y >0) {
        console.log('调用sum次数')
        return sum(x+1, y-1)
    } else {
        return x;
    }
})
sum(1,10000000)