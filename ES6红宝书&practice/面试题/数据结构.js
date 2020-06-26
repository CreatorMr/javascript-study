function printN(n) {
  var i;
  for(i=1; i<=n; i++) {
    console.log(i)
  }
}
console.time('func1')
printN(10000)
console.timeEnd('func1')

function printN2(n) {
  if(n) {
    printN2(n-1)
    console.log(n)
  }
}
console.time('func2')
printN2(10000)
console.timeEnd('func2')
/**
 * n 100 1000 10000 100000 等
 * 递归的程序 非常容易占用空间资源
 */

//  T(N) = O(f(n))

//  T1(n) + T2(2) = max(O(f1(n)), O(f2(n)))
// T1(n) * T2(2) = O(f1(n) * f2(n))

// 最大子列和的问题
// 给定N个证书的序列{A1， A2......An},求函数f(i,j) = max{0, j,k=i ΣAk} 的最大值


// 分而治之，把一个大的复杂的问题切分成小的块解决，在总结在一起


