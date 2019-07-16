### ES6学习 书籍  标准入门第三版 （阮一峰）
##### Babel转码

配置文件   .babelrc 存放在根目录下 ，用来设置转码规则和插件
{
	"presets":[],
	"plugins":[]
}


命令行转码 babel-cli
npm install --global babel-cli

# 转码结果输出到标准输出
$ babel example.js

# 转码结果写入文件
# --out-file 或 -o 参数指定输出文件
$ babel example.js --out-file compiled.js
# 或
$ babel example.js -o compiled.js

# 整个目录转码 --out-dir 或 -d 参数指定目录
$ babel src --out-dir lib
# 或
$ babel src -d lib

# -s 参数生成source map文件
$ babe src -d lib -s
