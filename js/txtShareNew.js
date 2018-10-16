
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

// var urlBase = 'http://yun1.janesi.net'
var urlBase = 'http://yun.janesi.com'
var url = window.reqUrl;
// url = 'http://118.25.10.151:8090'
var itemId = getRequest()['itemId'] || getRequest()['itemid']
userId = getRequest()['userId'] || getRequest()['userid']


// mui.previewImage(); //启动图片快捷查看
mui.init();
echo.init({
	offset: 1200,//离可视区域多少像素的图片可以被加载
	throttle: 0 //图片延时多少毫秒加载
});


mui.plusReady(
	document.querySelectorAll('.article_content img').forEach(function (obj, index) {
		obj.setAttribute('data-preview-src', '')
		obj.setAttribute('data-preview-group', '1')
	}),
	mui('.link').on('tap', '#openApp', function (e) {
		location.href = 'http://yun.janesi.net/web/NEWS/newActivity/articleGuideDownLoad.html'
	})
)

	//增加金币

	var param = {
		userId: userId,
		appId: 10010,
		content: itemId,
		code: "share"
	}

	$.ajax({
		type: "POST",
		url: url + "/app/interest/task/add_coin",
		data: param,
		success: function (data) { }
	});

	// 滑动到底部
		let timer = 0
		$(window).scroll(function () {
			var listTop = parseInt(document.querySelector('.article_label').offsetTop) - 650
			var scrollTop = document.body.scrollTop | document.documentElement.scrollTop
			if (scrollTop > (listTop - 100) && scrollTop < (listTop + 60)) {
				timer++
				if(timer<2){
					openRed()
				}
			}
		})

	// 判断是安卓还是ios  展现logo 
	console.log(window.JanesiBridge.isAndroid)
		var osType = ''
	if (window.JanesiBridge.isAndroid) {
		document.querySelector('.androidLogo').style.display = 'block'
		document.querySelector('.titAndroid').style.display = 'block'
		osType ="ANDROID"

	} else {
		document.querySelector('.iosLogo').style.display = 'block'
		document.querySelector('.titIos').style.display = 'block'
		osType ="IOS"
	}
	// 打开红包弹窗
	function openRed(){
		clickFloat()
		var height = window.scrollY;
		localStorage.setItem("height",height)
		
		document.querySelector('#article').style.transform= 'translateY(' + -height + 'px)'
		$('.share_activity').css('display', 'none')
		$('.maskPopup').css('display', 'block')
		$('.popup_bag').css('animation','showPopup .5s')
		setTimeout(function() {
			$('html,body').addClass('scrollbox');//使网页不可滚动
		}, 10);
		

	}


	// 点击遮罩关闭弹框
	var maskPopup = document.querySelector('.maskPopup');
	maskPopup.onclick = function () {
		var height = localStorage.getItem("height")
		height = parseInt(height)
		document.querySelector('#article').style.transform= 'translateY(' + 0 + 'px)'
	
		$('.popup_bag').css('animation','closePopup .5s')
		setTimeout(function() {
			$('.maskPopup').css('display', 'none')	
			$('.share_activity').css('display', 'block')
			$('html,body').removeClass('scrollbox') //使网页恢复滚动	
		  	$("body,html").scrollTop(height);
			// document.querySelector('#article').style.scrollTop= height +"px"
			// console.log(document.querySelector('#article').style.scrollTop)	
								
		}, 500)
	}
	// 关闭按钮
	var closeCancle = document.querySelector('.closeCancle')
	closeCancle.onclick = function(){
		var height = localStorage.getItem("height")
		height = parseInt(height)
		document.querySelector('#article').style.transform= 'translateY(' + 0 + 'px)'	
		$('.popup_bag').css('animation','closePopup .5s')
		setTimeout(function() {
			$('.maskPopup').css('display', 'none')	
			$('.share_activity').css('display', 'block')
			$('html,body').removeClass('scrollbox') //使网页恢复滚动	
		  	$("body,html").scrollTop(height);
		}, 500)
	}
	// 点击红包  跳转页面
	var popup_bag = document.querySelector('.popup_bag')
	popup_bag.onclick = function () {
		clickOPenButton()
		 window.location.href = urlBase+'/janesi-headline/ZQFL/templete/wechatCash.html?userId='+getRequest()['userId']
		// 阻止事件冒泡
		event.stopPropagation();
	}

// 埋点
// 外部文章 曝光
	
function showArtical(){
	console.log(osType)
	window.JanesiApi.reqUrl = "http://spm.janesi.com"
	let that = this
	let myDate = new Date().getTime()
	JanesiApi.sendApi('/log/spm', 'get', {
		// userId: getRequest()['userId'],
		appId: '10010',
		osType: osType,
		eventType: 'show',
		eventTime: myDate,
		end_type: 'h5',
		url: window.location.href,
		referrer: '',
		h5_locaiton: 'articleShow'
	}, function (res) {
	})
}	
// 调用
	showArtical()
// 定位红包点击
function clickFloat(){
	window.JanesiApi.reqUrl = "http://spm.janesi.com"
	let that = this
	let myDate = new Date().getTime()
	JanesiApi.sendApi('/log/spm', 'get', {
		// userId: getRequest()['userId'],
		appId: '10010',
		osType: osType,
		eventType: 'click',
		eventTime: myDate,
		end_type: 'h5',
		url: window.location.href,
		referrer: '',
		h5_locaiton: 'float_icon'
	}, function (res) {
	})
}
// 弹框按钮 点击
function clickOPenButton(){
	window.JanesiApi.reqUrl = "http://spm.janesi.com"
	let that = this
	let myDate = new Date().getTime()
	JanesiApi.sendApi('/log/spm', 'get', {
		// userId: getRequest()['userId'],
		appId: '10010',
		osType: osType,
		eventType: 'click',
		eventTime: myDate,
		end_type: 'h5',
		url: window.location.href,
		referrer: '',
		h5_locaiton: 'float_layer'
	}, function (res) {
	})
}
