//监听source文件夹的的变化，创建文件删除等操作
var fs = require('fs');

var filedir = './souce'

fs.watch(filedir.function(ev,file){
	//这里不需要判断file 是否有内容
	//只要有一个文件发生了变化，就需要都这文件夹下的所有文件进行读取，然后合并
	fs.readdir(filedir,function(err,dataList){
		var arr = [];
		dataList.forEach(function(f){
			var info = f.statSync(filedir + '/' + f);
			console.log(info)
		})
	})
})