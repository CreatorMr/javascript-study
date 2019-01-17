/* 
函数节流（throttle）与 函数防抖（debounce）都是为了限制函数的执行频次，
以优化函数触发频率过高导致的响应速度跟不上触发频率，出现延迟，假死或卡顿的现象。
 */
//函数节流
function throttle(func, gapTime) {
    let endTime = null
  
    return function() {
      // 当前时间
      let currentTime = new Date().getTime()
      if(!endTime || currentTime - endTime > gapTime) {
        func.apply(this, arguments)
        // 更新上次时间节点
        endTime += currentTime
      }
    }
  }
  //函数防抖
  function _debounce(func, wait) {
    let timer = null
    return function() {
      clearTimeout(timer)
      timer = setTimeout(() => {
        func()
      }, wait)
    }
  }