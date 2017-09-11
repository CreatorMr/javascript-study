/*
依赖jQuery数据校验插件开发,
挂在jQuery上
*/
(function(root,factory,plug){//factory传入的工厂函数,plug接受插件名称
	factory(jQuery,plug);
})(this,function(jQuery,plug){//.工厂函数
	//默认配置
	var DAFALUT  = {
		initEvent:"input",
		plugName :"dr"
	}

	//提供基础的默认规则
	var RULES = {
		
		"required" : function(){ //element对象
			// console.log(this);//this指向的window对象
			return this.val();
		},
		"Reg" : function(data){
			return new RegExp(data).test(this.val());
		},
		"min-length" : function(data){
			return this.val().length >= data;
		},
		"confirm" : function(data){
			var passElement = $(":password")[0];
			if(passElement.value == "" || this.value != password){
				return false;
			}else{
				return true;
			}
		}

	}

    jQuery.prototype[plug] = function(opstions) {//jQuery对象上扩展一个方法
    	if (!this.is("form")) {return;}//限制一下，只有在form才起作用(this为jQuery实对象)
    		this.$file = this.find("input");//存储所有的input


    		//将DAFALUT 扩展到jQuery的实对象上
    		$.extend(this,DAFALUT,opstions);//越往后的越覆盖,即以默认为优先，用户配置为覆盖
    			console.log(this.initEvent)

    		//给input绑定事件
    		this.$file.on(this.initEvent,function(){    //this  Elenment对象
    			//触发了事件函数获取自身配置，跟默认规则相同，有对应的调用默认规则里的方法
    			//先去遍历默认规则里面的东西
    			var _this = $(this);//data 为jQuery上的方法，element对象上没有，需要包装
 
    				_this.siblings('p').remove();
              
    			$.each(RULES,function(key,fn){
    				var $fileName = _this.data(DAFALUT.plugName + "-" + key)//检索有哪些属性，有哪些配置的值
    				var $message = _this.data(DAFALUT.plugName + "-" + key+"-"+"message")//检索有哪些属性，有哪些配置的值
    				if($fileName){//配置了这个key，代表了配置了默认规则
    					var result = fn.call(_this,$fileName);
    					if(!result){
    						_this.after("<p style='color:red;'>"+ $message +"</p>")
    					}

    				}
    			});
    		});
    };
    //扩展，  当做对象对待，往上面扩展静态属性的东西，告诉用户如果你要扩展，就必须调用extendResult的方法
    //$.fn = jQuery.prototype是一样的
    $.fn[plug].extendResult = function(options){
    	$.extend(RULES,options);//没有的有添加到RULES中去
    }
    
},"dataResult");   