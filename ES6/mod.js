//mod.js 
function A(){
	this.foo = 'hello';
}

if(!global.foo){
	global._foo = new A();
}

module.exports = global._foo;