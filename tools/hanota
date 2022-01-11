// 玩汉诺塔工具
var move = (N , A, B, C) => {
    if(N === 1) {
       console.log(A, '->', C)
    } else {
        move(N-1, A, C, B)
        console.log(A, '->', C)
        move(N-1, B, A, C)
    }
   }
console.log(move(3,'A', 'B', 'C'))
