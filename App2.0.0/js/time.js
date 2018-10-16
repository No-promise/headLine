function formatMsgTime (timespan) {

    var dateTime = new Date(parseInt(timespan));
  
    var year = dateTime.getFullYear();
    var month = (dateTime.getMonth()+1 < 10 ? '0'+(dateTime.getMonth()+1) : dateTime.getMonth()+1);
    var day = dateTime.getDate()<10?'0'+dateTime.getDate():dateTime.getDate();
    var hour = dateTime.getHours()<10?'0'+dateTime.getHours():dateTime.getHours();
    var minute = dateTime.getMinutes()<10?'0'+dateTime.getMinutes():dateTime.getMinutes();
    var second = dateTime.getSeconds()<10?'0'+dateTime.getSeconds():dateTime.getSeconds();
    var now = new Date().getTime();
  
    var milliseconds = 0;
    var timeSpanStr;
  
    milliseconds =now - timespan;
  
    if (milliseconds <= 1000 * 60) {
      timeSpanStr = '刚刚';
    }
    else if (1000 * 60 * 1 <milliseconds && milliseconds <= 1000 * 60 * 60) {
      timeSpanStr = Math.round((milliseconds / (1000 * 60))) + '分钟前';
    }
    else if (1000 * 60 * 60 * 1 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60)) + '小时前';
    }
    else if (1000 * 60 * 60 * 24 < milliseconds && milliseconds <= 1000 * 60 * 60 * 24 * 15) {
      timeSpanStr = Math.round(milliseconds / (1000 * 60 * 60 * 24)) + '天前';
    } else {
      timeSpanStr = year + '-' + month + '-' + day + ' ' + hour + ':' + minute+':'+second ;
    }
    return timeSpanStr;
  };
