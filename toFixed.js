// toFixed兼容方法
Number.prototype.toFixed = function(len){
    if(len>20 || len<0){
        throw new RangeError('toFixed() digits argument must be between 0 and 20');
    }
    // 先把不是标准数字的转成数字 例如：.123转为0.123
    var number = Number(this);


    if (isNaN(number) || number >= Math.pow(10, 21)) {
        //针对一个大于21位的数字，之后使用时会出现科学计数法的形式，在此处转成字符串
        return number.toString();
    }

    //在使用toFixed的时候若不传入参数，不保留小数。
    if (typeof (len) !== 'number' || len == 0 ) {
        return (Math.round(number)).toString();
    }
   

    var result = number.toString();
    if(result.indexOf(".") === -1){//补零
        return padNum(result);
    }
   
    var [intNum,deciNum] = result.split(".");
        lastNum = deciNum.substr(len, 1);//最后一个数字
    
    if(deciNum.length == len){
        //需要截取的长度等于当前长度
        return result;
    }
    if(deciNum.length < len){
        //需要截取的长度大于当前长度   小数位不够继续补零
        return padNum(result)
    }

    //需要截取的长度小于当前长度，需要判断最后一位数字
    result = intNum + '.' + deciNum.substr(0, len);
    if(parseInt(lastNum, 10)>=5){
        //最后一位数字大于5，要进位
        var times = Math.pow(10, len); //需要放大的倍数
        var changedInt = Number(result.replace('.',''));//截取后转为整数
        changedInt++;//整数进位
        changedInt /= times;//整数转为小数，注：有可能还是整数
        result = padNum(changedInt+'');
    }
    return result;
    //对数字末尾加0
    function padNum(num){
        var dotPos = num.indexOf('.');
        if(dotPos === -1){
            //整数的情况
            num += '.';
            for(var i = 0;i<len;i++){
                num += '0';
            }
            return num;
        } else {
            //小数的情况
            var need = len - (num.length - dotPos - 1);
            for(var j = 0;j<need;j++){
                num += '0';
            }
            return num;
        }
    }
}