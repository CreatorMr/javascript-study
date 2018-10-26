const Event = function(){//使用闭包，把EventPool变量私有化，防止外部访问
	const EventPool = new Map();
	const isFunction = func => typeof func === 'function';


	//注册事件
	const on = (event,callback)=>{
		EventPool.get(event) || EventPool.set(event,[])
	}
}()