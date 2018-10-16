// 加载提示
var load = document.createElement('div')
load.setAttribute('id', 'loading');
load.innerHTML = `
				<div class="load_left">正在加载</div>
				<div class="load_right">
					<img src="http://yun.janesi.net/web-test/zhiqu-web/img/zhuan.gif" alt="" />
				</div>
`


var body = document.documentElement ? document.documentElement : document.body;
var headers = {
	'Content-Type': 'application/x-www-form-urlencoded'
};

var conunts=document.querySelector('.num').innerHTML
if(conunts.length > 4){
     document.querySelector('.num').innerHTML=conunts.substr(0,conunts.length-4)+'万'
 }

var hit = document.getElementById('hit');
var collect = document.getElementById('collect');



//文章滚动到底部
// //传递总评论数

//传递列表参数

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



var flag = true,
	flag1 = true, 
	flag2 = true,
	flag3 = true;
	flag4 = false;//判断 查看全文 5/4 16.30 

var url = window.reqUrl;

var data=[];
var itemId = getRequest()['itemId']||getRequest()['itemid']//获取某参数的对应参数值
	userId = getRequest()['userId']||getRequest()['userid']
	currentTime = getRequest()['currentTime']
	contentType = document.body.getAttribute('contenttype');

	//详情内容收缩
if(contentType=='ARTICLE'){
	 document.querySelector('.au_read>.iconfont').innerHTML='阅读'  
	echo.init({
     	   offset: 1000,//离可视区域多少像素的图片可以被加载
     	   throttle: 0 //图片延时多少毫秒加载
		});
		 
}

 //去掉视频控制条的下载控件
 if(contentType=='VIDEO'){

	document.getElementById('myvideo').setAttribute('controlslist','nodownload');
	if (currentTime == undefined) {
		   currentTime = 0;
	} 
	function videoStart() {
		//进入视频页 按传过来的时间 开始播放

		var myvideo = document.getElementById('myvideo');
		myvideo.currentTime = currentTime;
		// alert(myvideo.currentTime);

		myvideo.play();
		
	}
    //页面跳转 视频暂停  将失去焦点的方法删掉
	function videoDestory(){
		document.getElementById('myvideo').pause();
	}
		
}



//相关列表推荐
document.querySelectorAll('.reg>button').forEach(function (obj,index) { 	
	data.push(obj.innerHTML);	
})
data=JSON.stringify(data);


//页面滚动
function pageScroll() {
	var top = document.getElementById('remark').offsetTop;
	var scrollTop = document.body.scrollTop | document.documentElement.scrollTop;
	if(flag3) {					
		$('html,body').animate({
			'scrollTop': top+'px'
		});
		flag3 = !flag3;
	} else {
		$('html,body').animate({
			'scrollTop': '0px'
		});
		flag3 = !flag3;
	}
}

// 发表评论入库		


// 评论查询


// function tryWakeUp(){
// 	try{
//         if(!document.images||!document.images.length){
//            window.android.androidwebbin('firstImg');
// 		   return;
//         }
// 		tryWakeUp0(document.images[0]);
// 	}catch(e){
// 		console.log(e);
// 	}
// }

// function tryWakeUp0(image){
// 	if(image.complete){
// 		window.android.androidwebbin('firstImg');
// 		return;
// 	}
// 	image.onload = function(){
// 		image.onload = null;
// 		setTimeout(function(){
// 			window.android.androidwebbin('firstImg');
// 		},1000);
// 	}
// 	setTimeout(function(){
// 		window.android.androidwebbin('firstImg');
// 	},3*1000);
// }

window.onload=function(){
	//文章收起
	// if(contentType=='ARTICLE'){

	// 	var con=document.getElementById('content');
	// 	var seeMore=document.querySelector('.seeMore');
	// 	var hit=document.querySelector('.article_love');
	// 	var label=document.querySelector('.article_label');
	// 	// var clientHeight=window.innerHeight;
		var clientHeight=window.screen.availHeight;
	// 	console.log(con.offsetHeight)
	// 	if(con.offsetHeight>=2*clientHeight){
	// 		con.style.height=2*clientHeight+'px';

	// 		console.log(con.offsetHeight)
	// 		con.style.overflowY='hidden '
			
	// 		console.log(con.offsetHeight)
	// 		seeMore.style.display='block';
	// 		hit.style.display='none';
	// 		label.style.display='none';
	// 	}else{
	// 		flag4=true;
	// 	}
	// 	seeMore.addEventListener('tap', function() {
	// 		con.style.height='auto';
	// 		con.style.overflowY='auto '
	// 		console.log(con.offsetHeight)
			
	// 		seeMore.style.display='none';
	// 		hit.style.display='block';
	// 		label.style.display='block';
	// 		flag4=true;
	// 	})
	// }
	// tryWakeUp();
		   

}

var title = document.querySelector("#article .article_tittle").innerHTML;
if(title){
   title = title.trim();
}

mui.plusReady(

	//相关列表推荐
	mui.ajax(url+'/app/interest/item/relevance',{
		type: 'post',
		data: {
			'tags': data,
			'itemType':contentType,
			'itemId':itemId,
			'osType':'ANDROID',
			'title':title
		},
		headers: headers,
		dataType: "json",
		success:function (e) {
			getList(e);
			window.android.getListParmars(JSON.stringify(e));	
			
		}
	}),

	// 评论查询
	// 上拉加载更多	
		
	// 内容收藏验证
	mui.ajax(url+'/app/interest/collection/check',{
		type: 'post',
		data: {
			'userId': userId,
			'itemId':itemId
		},
		headers: headers,
		dataType: "json",
		success:function (e) {  
			if(e.result == 'true'){
				collect.children[0].classList.toggle('but_hot');
				collect.children[0].innerHTML = '&#xe620;';
				collect.children[1].innerHTM = '已收藏';
				collect.style.border = '1px solid #ffd848';
				flag1=!flag1;
			}
		}
	}),
	// 内容点赞验证
	mui.ajax(url+'/app/interest/content/like_check',{
		type: 'post',
		data: {
			'userId': userId,
			'itemId':itemId
		},
		headers: headers,
		dataType: "json",
		success:function (e) {  
			if(e.result == 'true'){
				hit.classList.toggle('hit_but_hot');
				hit.children[1].innerHTML = '已赞';
				hit.children[1].style.borderRight = '1px solid #ef5757';
				flag=!flag;
			}
		}
	}),

	// 文章点赞收藏
	hit.addEventListener('tap', function() {		
		var num = parseInt(this.children[2].innerHTML);
		var that=this;
		if(flag) {
			if(num > 999) {
				that.children[2].innerHTML = num + "(+)";
			} 
			mui.ajax(url + '/app/interest/content/like', {
				type: 'post',
				data: {
					'userId': userId,
					'itemId': itemId,
					'likeBehavior': 'LIKE',
					'contentType': contentType
				},
				headers: headers,
				dataType: 'json',
				success: function(e) {
					console.log(e)
					if(e.code=='0'){
						mui.toast("点赞成功!");
						that.classList.toggle('hit_but_hot');
						that.children[2].innerHTML = num + 1;
						that.children[1].innerHTML = '已赞';
						that.children[1].style.borderRight = '1px solid #ef5757';
						flag = !flag;
					}else{
						mui.toast(e.msg);
					}	
				}
			});

		} else {
			mui.ajax(url + '/app/interest/content/like', {
				type: 'post',
				data: {
					'userId': userId,
					'itemId': itemId,
					'likeBehavior': 'UNLIKE',
					'contentType': contentType
				},
				headers: headers,
				dataType: 'json',
				success: function(e) {
					if(e.code == '0'){
						mui.toast("取消点赞!");
						that.classList.toggle('hit_but_hot');
						that.children[2].innerHTML = num - 1;
						that.children[1].innerHTML = '点赞';
						that.children[1].style.borderRight = '1px solid #A6A6A6'
						flag = !flag;
					}else{
						mui.toast(e.msg)
					}
				}
			});
			
		}

	}),
	collect.addEventListener('tap', function() {
		var that = this;
		if(flag1) {
			mui.ajax(url + '/app/interest/collection/collect', {
				type: 'post',
				data: {
					'userId': userId,
					'itemId': itemId,
					'contentType': contentType,
					'collect': 'COLLECT '
				},
				headers: headers,
				dataType: "json",
				success: function(e) {
					if(e.code=='0'){
						mui.toast('收藏成功！')
						that.children[0].classList.toggle('but_hot');
						that.children[0].innerHTML='&#xe620;';
						that.children[1].innerHTM='已收藏';
						that.style.border='1px solid #ffd848';
						flag1 = !flag1;
					}else{
						mui.toast(e.msg)
					}
				}
			})
			
		} else {
			mui.ajax(url + '/app/interest/collection/collect', {
				type: 'post',
				data: {
					'userId': userId,
					'itemId': itemId,
					'contentType': contentType,
					'collect': 'UNCOLLECT '
				},
				headers: headers,
				dataType: "json",
				success: function(e) {
					if(e.code == '0'){
						mui.toast('取消收藏！')
						that.children[0].classList.toggle('but_hot');
						that.children[0].innerHTML='&#xe607;';
						that.children[1].innerHTM='收藏';
						that.style.border='1px solid #A6A6A6';
						flag1 = !flag1
						
					}else{
						mui.toast(e.msg)
					}
				}
			})

		}

	}),

	

	//文章列表
	mui('#list').on('tap', 'li', function() {
		var lid = this.getAttribute('lid');
		window.android.androidList(lid);	
		console.log(lid)
	}),

	// 图集查看
	// document.querySelectorAll('.article_content img').forEach(function(obj,index) {
	// 	obj.setAttribute('data-preview-src', '')
	// 	obj.setAttribute('data-preview-group', '1')
	// }),
	// 评论回复

	//	评论点赞

	//举报
	document.getElementById('inform').addEventListener('tap', function() {
		//通知举报
		window.android.androidReport("jubao ");	
	})
)