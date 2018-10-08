//traceur 的node用法，前提先安装traceur模块
var traceur = require('traceur');
var fs = require('fs');

//将es6脚本转为字符串
var contents = fs.readFileSync('es6-file.js').toString();

var result = traceur.compile(contents,{
	filename:'es6-file.js',
	sourceMap:true,
	//其他设置
	modules:'commonjs'
});
if(result.error)
	throw result.error;

//result 对象的js属性就是转换后的es5代码
fs.writeFileSync('out.js',result.js);
//sourceMap属性对应map文件
fs.writeFiileSync('out.js.map',result.sourceMap);