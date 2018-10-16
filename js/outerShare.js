
//	itemId地址栏获取
function getRequest() {
  var url = document.querySelector("iframe").src; //获取整个地址栏地址
  
	var theRequest = new Object();
	if (url.indexOf("?") != -1) {
    var str = url.split('?')[1];//截取？之后的所有参数
    console.log(str)
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

var userId = getRequest()['userId'] 

console.log(userId)

document.querySelector('#openApp').onclick = function(){
	location.href = 'http://yun.janesi.net/web/NEWS/newActivity/articleGuideDownLoad.html'
}



	// 滑动到底部
	setTimeout(function() {
    // openRed()
    clickFloat()
		
		$('.share_activity').css('display', 'none')
		$('.maskPopup').css('display', 'block')
    $('.popup_bag').css('animation','showPopup .5s')
  }, 5000);

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
  var share_activity = document.querySelector('.share_activity');
  share_activity.addEventListener('touchstart',function(){
    // 阻止事件冒泡
		event.stopPropagation();
    clickFloat()
		
		$('.share_activity').css('display', 'none')
		$('.maskPopup').css('display', 'block')
    $('.popup_bag').css('animation','showPopup .5s')
    
  })

	// function openRed(){
		// clickFloat()
		
		// $('.share_activity').css('display', 'none')
		// $('.maskPopup').css('display', 'block')
		// $('.popup_bag').css('animation','showPopup .5s')
		

	// }

	

	// 点击遮罩关闭弹框
	var maskPopup = document.querySelector('.maskPopup');
	maskPopup.addEventListener('touchstart',function(){
	
		$('.popup_bag').css('animation','closePopup .5s')
		setTimeout(function() {
			$('.maskPopup').css('display', 'none')	
			$('.share_activity').css('display', 'block')
    }, 500)
    	// 阻止事件冒泡
		event.stopPropagation();
  })
  
	// 关闭按钮
	var closeCancle = document.querySelector('.closeCancle')
	closeCancle.addEventListener('touchstart',function(){
		
		$('.popup_bag').css('animation','closePopup .5s')
		setTimeout(function() {
			$('.maskPopup').css('display', 'none')	
			$('.share_activity').css('display', 'block')
		}, 500)
  })
  
	// 点击红包  跳转页面
	var popup_bag = document.querySelector('.popup_bag')
	popup_bag.addEventListener('touchstart',function(){
		clickOPenButton()
		 window.location.href = urlBase+'/janesi-headline/ZQFL/templete/wechatCash.html?userId='+getRequest()['userId']
		// 阻止事件冒泡
		event.stopPropagation();
	})

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
