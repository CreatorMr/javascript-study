//数值的扩展
Number.isFinite()//检查一个数值是否是有限的
//ES5 部署Number.isFinite()
(function(global){
	var global_isFinite = global.isFinite;

	Object.defineProperty(Number,"isFinite",{
		value:function isFinite(value){
			return typeof value === 'number' && global_isFinite.isFinite(value);
		},
		configurable:true,
		enumerable:false,
		writeable:true
	})
})(this)
Number.isNan()//判断是不是NaN
//es5部署
(function(global){
	var global_isNan = global.isNaN;

	Object.defineProperty(Number,'isNaN',{
		value:function isNaN(value){
			return typeof value === 'number' && global_isNaN.isNaN(value);
		},
		configurable:true,
		enumerbale:false,
		writeable:true
	})
})(this)

//两个新方法与传统的全局方法isFinite和isNaN的区别在于，传统方法先调用Number（）将非数值转为数值，再进行判断，而新方法只对数值有效
parseInt()
parseFloat()
//移植到了Number上
Number.isInteger()//判断是否是整数，在javascript中整数和浮点数又同样的存储储存方法，3和3.0被视为同一个值
//ES5的部署
(function(global){
	var floor = Math.floor,
	isFinite = global.isFinite;

	Object.defineProperty(Number,"isInteger",{
		value:function isInteger(value){
			return typeof value === 'number' && isFinite(value) && floor(value) === value;
		},
		configurable:true,
		enumerbale:false,
		writeable:true
	})
})(this)

Number.EPSILON
//2.220446049250313e-16
Number.EPSILON.toFixed(20)
//0.00000000000000022204

// Number.EPSILON实际是一个可以接受的误差范围
Math.trunc()//方法用于去除一个数的小数部分，返回整数部分
//ES5部署
Math.trunc = Math.trunc || function(x){
	return x<0?Math.ceil(x):Math.floor(x);
}
Math.sign()//判断一个数是正数、负数、0---return5种值+1、-1、0、-0、NaN
//部署
Math.sign = Math.sign || function(x){
	x = +x;//convert to a number
	if(x == 0 || isNaN(x)){
		return x
	}
	return x > 0 ?1:-1
}
Math.cbrt()//立方根
Math.cbrt = Math.cbrt || function(x){
	var y = Math.pow(Math.abs(x),1/3);
	return y<0?-y:y;
}
Math.clz32()
Math.imul()
Math.fround()
Math.hypot()//所有参数平方和的平方根
Math.expm1()//e~x-1
Math.log1p()//ln(1+x)   <==> Math.log(1+x)
Math.log10()
Math.log2()