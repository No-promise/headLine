
//	itemId地址栏获取
function getRequest() {
	var url = location.href; //获取整个地址栏地址
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
		var str = url.split('?')[1];//截取？之后的所有参数
		str = str.split("&");  //将每个参数截取放置到数组
		for (var i = 0; i < str.length; i++) {
			theRequest[str[i].split("=")[0]] = unescape(str[i].split("=")[1]);//将属性及属性值分别归属到数组
		}
	}
	return theRequest;
}
var url = window.reqUrl;
var itemId = getRequest()['itemId']||getRequest()['itemid']
	userId = getRequest()['userId']||getRequest()['userid']
 

            // mui.previewImage(); //启动图片快捷查看
			mui.init();
            echo.init({
                offset: 1200,//离可视区域多少像素的图片可以被加载
                throttle: 0 //图片延时多少毫秒加载
            });

			
			mui.plusReady(
               document.querySelectorAll('.article_content img').forEach(function(obj,index) {
                        obj.setAttribute('data-preview-src', '')
                        obj.setAttribute('data-preview-group', '1')
                }),
				mui('.link').on('tap','#openApp',function(e){ 
                 	   location.href='http://yun.janesi.net/web/NEWS/kandianDown.html'
				})  
			)

			//增加金币
			
			var param = {
				userId:userId,
				appId:10010,
				content:itemId,
				code:"share"
			}

			$.ajax({
				type:"POST",
				url:url+"/app/interest/task/add_coin",
				data:param,
				success:function(data){}
			});
			