

function getDate(year,month) {
		let arr = []
		// 判断年 是不是闰年
		let leapYear = false
		if(year % 4 == 0 && year % 100 != 0 || year % 400 == 0){
		    console.log('闰年')
		    leapYear = true;
		}else{
		    console.log('平年');
		}

		let dataCount = 0

    if(month === 2) {
    	dataCount = leapYear ? 29 : 28
    }

    if(month === 1 || month ===3 ||month === 5 || month ===7||month === 8||month ===10||month ===12) {
    	dataCount = 31
    } else {
    	dataCount = 30
    }
    for (var i = 0;i<dataCount;i++){
    	let date = new Date(year + '-' + month + '-' + (i+1))

    	let day = date.getDay()
    	if(day !== 0 && day !== 6) {
    		arr.push(formatDate(date))
    	}
    }

    return arr.join('/')

}
 function formatDate(d){
        var yy = d.getFullYear(); // 年
        var mm = d.getMonth() + 1; // 月。
        var dd = d.getDate(); // 日
        var hh = d.getHours(); // 小时
        var min = d.getMinutes(); // 分钟
        var ss = d.getSeconds(); // 秒
        var qq = Math.floor((d.getMonth() + 3) / 3); // 季度
        var sss = d.getMilliseconds(); // 毫秒
        return mm + "." +  dd; 
    }
getDate(2019,12)