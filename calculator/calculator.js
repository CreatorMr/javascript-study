/**
	 金额的加减乘
        JavaScript是64位计算

*/
var CalculatorFilter = function(v1,v2,type){
	if(type == "add"){
		return Calculator.add(v1,v2);
	}else if(type == "sub"){
		return Calculator.sub(v1,v2);
	}else if(type == "mul"){
		return Calculator.mul(v1,v2);
	}else if(type == "div"){
		return Calculator.div(v1,v2);
	}
}
// 运算
let Calculator;

Calculator = {
	// 加
	add : function(v1, v2) {
		var r1 = 0, r2 = 0, m;
		try {
			r1 = v1.toString().split(".")[1].length;
		} catch (e) {
		}
		try {
			r2 = v2.toString().split(".")[1].length;
		} catch (e) {
		}
		m = Math.pow(10, Math.max(r1, r2));
		v1 = calculatorFilter(v1, m, 'mul');
       v2 = calculatorFilter(v2, m, 'mul');
		
		return (v1 + v2) / m;
	},
	// 减
	sub : function(v1, v2) {
		return this.add(v1, -v2);
	},
	// 乘
	mul : function(v1, v2) {
		var m = 0;
		var s1 = v1.toString();
		var s2 = v2.toString();

		try {
			m += s1.split(".")[1].length;
		} catch (e) {
		}

		try {
			m += s2.split(".")[1].length;
		} catch (e) {
		}

		return Number(s1.replace(".", "")) * Number(s2.replace(".", ""))
				/ Math.pow(10, m);
	},
	// 除
	div : function(v1, v2) {
		var t1 = 0;
		var t2 = 0;
		var r1, r2;

		try {
			t1 = v1.toString().split(".")[1].length;
		} catch (e) {
		}

		try {
			t2 = v2.toString().split(".")[1].length;
		} catch (e) {
		}


		r1 = Number(v1.toString().replace(".", ""));
		r2 = Number(v2.toString().replace(".", ""));
		if(r2 == 0){
			alert("除数不能为零");
			return;
		}else{
			if((t2-t1)<0){
				return (r1 / r2) / Math.pow(10, t1 - t2);
			}else{
				return (r1 / r2) * Math.pow(10, t2 - t1);
			}
			
		}
	}
};
export default CalculatorFilter;
