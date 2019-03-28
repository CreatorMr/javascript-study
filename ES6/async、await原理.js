/* 
async 就是将Generator和自动执行器，包装在一个函数里
*/
async function fn(args) {
    // todo
}

// 等同于
function fn(args){
    return spawn(function*(){
        // todo
    })
}