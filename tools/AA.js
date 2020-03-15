// 优惠金额   配送费  拼团 人数金额数组
function AA (discount, delivery, array) {
    let arr = []
    let total = array.reduce((pre,cur,index,arr)=>{return pre+cur},0)
    array.forEach(element => {
        arr.push(element + delivery*(element/total) - discount*(element/total))
    });
    return arr
}
let t = AA(15,3,[16.99,23.99,21.89])