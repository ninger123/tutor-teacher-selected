export function formatDate(date) { 
    var date = new Date(date);
    var year=date.getFullYear();  //取得4位数的年份
    var month=date.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
    var day=date.getDate();      //返回日期月份中的天数（1到31）
    return year+"."+month+"."+day; 
}

export function formatTime(date) {
    var date = new Date(date);
    var hour = date.getHours();
    var minutes = date.getMinutes();
    if(minutes<=9) {
        minutes = '0'+minutes;
    }
    return hour+":"+minutes;
}

export function formatDay(date) { 
    var date = new Date(date);
    var month=date.getMonth()+1;  //取得日期中的月份，其中0表示1月，11表示12月
    var day=date.getDate();      //返回日期月份中的天数（1到31）
    return month+"月"+day+"日"; 
}