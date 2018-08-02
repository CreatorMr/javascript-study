import cal from './calculator'
Vue.prototype.$filter = function (filterName) {
    return Vue.filter(filterName)
}
/**
 *涉及到金额的计算（避免类似0.1+0.7=0.7999999...等），add、sub、mul、div加减乘除
 */

Vue.filter('calculator', function (v1, v2,type) {
    return cal(v1,v2,type)
})