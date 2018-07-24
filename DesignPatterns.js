var singleton = function(fn){
	var result;
	return function(){
		return result || (result = fn.apply(this,arguments));
	}
}

var createMask = singleton(function(){
	return document.body.appendChild(document.createElement('div'))
})

function ObjectFun(name){
	this.name = name;
}

var obj = new ObjectFun("singleton");
console.log(obj.name);

function ObjectFactory(){
	let obj = {},
	Constructor = Array.prototype.shift.call(arguments);
	obj.__proto__ = typeof Constructor.prototype === 'number' ? Object.prototype : Constructor.prototype;
	var ret = Constructor.apply(obj,arguments);
	return typeof ret === 'object' ? ret : obj;
}

var a = ObjectFactory(ObjectFun,"svenzeng");
console.log(a.name);
//订阅者-发布者
Events = function(){
	var listen,log,obj,one,remove,trigger,__this;

	obj = {};
	__this = this;
	listen = function(key,eventfn){//key电话
		var stack,_ref;//stack盒子
		stack = (_ref = obj[key]) != null ? _ref :obj[key] = [];
		return stack.push(eventfn);
	}
	one = function(key,eventfn){
		remove(key);
		return listen(key,eventfn);
	}
	remove = function(key){
		var _ref;
		return (_ref = obj[key]) != null ? _ref.length = 0 : void 0
	}

	trigger = function(){
		var fn,stack,_i,_len,_ref,key;
		key = Array.prototype.shift.call(arguments);
		stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];
		for(_i = 0; _len = stack.length;_i++){
			fn = stack[_i];
			if(fn.apply(__this,arguments)  === false){
				return false;
			}
		}
	}
	return {
		listen: listen,
		one:one,
		remove:remove,
		trigger:trigger
	}

}

var adultTv = Events();
//订阅
adultTv.listen('play',function(data){
	console.log("今天是谁的电影 ： " + data.name);
})

//发布
adultTv.trigger("play",{name:"周润发"})
