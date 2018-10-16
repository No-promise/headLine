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
var itemId = window.itemId;

var data=[];
var userId = getRequest()['userId']||getRequest()['userid']//获取某参数的对应参数值
	contentType = document.body.getAttribute('contenttype');
// 从客户端拿userId
	function getUserId(value){
		userId=value;
	}

//传递总评论数
function remarkCount() {
	var num = document.body.getAttribute('comment');
	return num;
}

// 发表评论入库		
function updateRemark(val){
		var chil = document.getElementById('newRemarkList');
		mui.ajax(url+'/app/interest/comment/add_new', {
			type: 'post',
			data: {
				'userId': userId,
				'itemId': itemId,
				'words': val
			},
			headers: headers,
			dataType: "json",
			success: function(e) {
				console.log(e);
				if(e.result.avator == null){
					e.result.avator = userPhotoUrl
				}
				
				if(e.code == '0'){
					document.getElementById('firstRemarkHit').style.display = 'none';
					var li = document.createElement('li');
					li.innerHTML = `
									<div class="listLeft">
										<div>
											<img src=${e.result.avator} alt="" />
										</div>
									</div>
									<div class="ListRight">
										<div class="ListRightTop">
											<div class="user">${e.result.userNickName}</div>
												<div class="remarkHit" flag='true' num=${e.result.commentId}>
													<span class="iconfont">&#xe621;</span>
													<span></span>
												</div>
											</div>
										<div class="remarkCon">
											${val}
										</div>
										<div class="ListRightBot">
											<div class="pubdate">
												<span></span>
												<span>刚刚</span>
											</div>
											<div class="replyNum" num=${e.result.commentId}>
											<span></span>
											<span>回复</span>
										</div>
										</div>
									</div>															
							`;
						chil.insertBefore(li, chil.children[0]);
						var taskTip = e.result.taskTip;
						window.android.androidDialog(taskTip);
				}else{
					mui.toast(e.msg);
				}
			}
		})
}

// 评论查询
var userPhotoUrl="http://yun.janesi.net/web-test/zhiqu-web/img/userPhoto.jpg"
var lastRemarkTime=''
var remarkNum = document.getElementById('remarkNum');

if(!lastRemarkTime){
	load.innerHTML='没有更多了';
}

// 评论查询
	mui.ajax(url+'/app/interest/comment/list', {
		type: 'post',
		data: {
			'itemId': itemId
		},
		headers: headers,
		dataType: "json",
		success: function(e) {
			// console.log(e);
			
			if(e.result.hots.length != '0') {
				document.getElementById('hotRemarkTitle').style.display = 'block';
				for(var i = 0; i < e.result.hots.length; i++) {
					if(e.result.hots[i].avator == null){
						e.result.hots[i].avator=userPhotoUrl
					}	
					if(e.result.hots[i].replyCount == '0') {
						e.result.hots[i].replyCount = ''	
					}
					if(e.result.hots[i].likeCount == '0') {
						e.result.hots[i].likeCount = ''
					}
					var li = document.createElement('li');
					li.innerHTML = `
					<div class="listLeft">
						<div>
							<img src=${e.result.hots[i].avator} alt="" />
						</div>
					</div>
					<div class="ListRight">
						<div class="ListRightTop">
							<div class="user">${e.result.hots[i].userNickName}</div>
							<div class="remarkHit" flag='true' num=${e.result.hots[i].commentId} itemId=${e.result.hots[i].itemId}>
								<span class="iconfont">&#xe621;</span>
								<span>${e.result.hots[i].likeCount}</span>
							</div>
						</div>
						<div class="remarkCon">
							${e.result.hots[i].words}
						</div>
						<div class="ListRightBot">
							<div class="pubdate">
								<span>${formatMsgTime(e.result.hots[i].gmtCreate)}</span>
							</div>
							<div class="replyNum" num=${e.result.hots[i].commentId}>
								<span>${e.result.hots[i].replyCount}</span>
								<span>回复</span>
							</div>
						</div>
					</div>
					`
					document.getElementById('hotRemarkList').appendChild(li);
				}
			}
			if(e.result.comments.length != '0') {
				document.getElementById('firstRemarkHit').style.display = 'none';
				for(var i = 0; i < e.result.comments.length; i++) {
					if(e.result.comments[i].avator==null){
						e.result.comments[i].avator=userPhotoUrl
					};
					if(e.result.comments[i].replyCount == '0') {
						e.result.comments[i].replyCount = ''
					};
					if(e.result.comments[i].likeCount == '0') {
						e.result.comments[i].likeCount = ''
					};
					var li = document.createElement('li');			
					li.innerHTML = `
					<div class="listLeft">
						<div>
							<img src=${e.result.comments[i].avator} alt="" />
						</div>
					</div>
					<div class="ListRight">
						<div class="ListRightTop">
							<div class="user">${e.result.comments[i].userNickName}</div>
							<div class="remarkHit" flag='true' num=${e.result.comments[i].commentId}>
								<span class="iconfont">&#xe621;</span>
								<span>${e.result.comments[i].likeCount}</span>
							</div>
						</div>
						<div class="remarkCon">
							${e.result.comments[i].words}
						</div>
						<div class="ListRightBot">
							<div class="pubdate">
								<span>${formatMsgTime(e.result.comments[i].gmtCreate)}</span>
							</div>
							<div class="replyNum" num=${e.result.comments[i].commentId}>
								<span>${e.result.comments[i].replyCount}</span>
								<span>回复</span>
							</div>
						</div>
					</div>
					`
					document.getElementById('newRemarkList').appendChild(li);
				}
				
				// 最后一条评论的时间
				lastRemarkTime = e.result.comments[e.result.comments.length - 1].gmtCreate
			}
		}
		}),

		// 上拉加载更多	
		
		$(window).scroll(function() {　　
			var scrollTop = $(this).scrollTop();　　
			var scrollHeight = $(document).height();　　
			var windowHeight = $(this).height();　　
			if(scrollTop + windowHeight >= scrollHeight) {
				document.getElementById('newRemarkList').appendChild(load);
				mui.ajax(url + '/app/interest/comment/list', {
					type: 'post',
					data: {
						'itemId': itemId,
						'lastItemTime': lastRemarkTime
					},
					headers: headers,
					dataType: 'json',
					success: function(e) {
						// console.log(e);
						
						if(e.result.comments.length > 0) {
							document.getElementById('newRemarkList').removeChild(load);
							for(var i = 0; i < e.result.comments.length - 1; i++) {
								if(e.result.comments[i].avator==null){
									e.result.comments[i].avator=userPhotoUrl
								};
								if(e.result.comments[i].replyCount == '0') {
									e.result.comments[i].replyCount = ''
								}
								if(e.result.comments[i].likeCount = '0') {
									e.result.comments[i].likeCount = ''
								}
								var li = document.createElement('li');
								li.innerHTML = `
										<div class="listLeft">
											<div>
												<img src=${e.result.comments[i].avator} alt="" />
											</div>
										</div>
										<div class="ListRight">
											<div class="ListRightTop">
												<div class="user">${e.result.comments[i].userNickName}</div>
												<div class="remarkHit" flag='true' num=${e.result.comments[i].commentId}>
													<span class="iconfont">&#xe621;</span>
													<span>${e.result.comments[i].likeCount}</span>
												</div>
											</div>
											<div class="remarkCon">
												${e.result.comments[i].words}
											</div>
											<div class="ListRightBot">
												<div class="pubdate">
													<span>${formatMsgTime(e.result.comments[i].gmtCreate)}</span>
												</div>
												<div class="replyNum" num=${e.result.comments[i].commentId}>
													<span>${e.result.comments[i].replyCount}</span>
													<span>回复</span>
												</div>
											</div>
										</div>
										`
								document.getElementById('newRemarkList').appendChild(li);
							}
		
							lastRemarkTime = e.result.comments[e.result.comments.length - 1].gmtCreate
		
						} else {
							load.innerHTML='没有更多了';
						}
		
					}
				})　　
			}
		}),
	
	
	// 评论回复
	mui('.remarkList').on('tap', '.replyNum', function() {
		var num = this.getAttribute('num');
		var href = url+'/app/interest/comment/reply_new?id=' + num +'&itemId='+itemId + '&userId=' +userId;
		window.android.androidReply(href);	
	})

	//	评论点赞
	mui('.remarkList').on('tap', '.remarkHit', function() {
		var num = parseInt(this.children[1].innerHTML ? this.children[1].innerHTML : 0);
		this.classList.toggle('remarkHitHot');
		var flag = eval(this.getAttribute('flag'));
		var reNum = this.getAttribute('num')
		var that = this;
		if(flag) {
			mui.ajax(url + '/app/interest/comment/like', {
				type: 'post',
				data: {
					'commentId': reNum,
					'likeBehavior': 'LIKE',
					'userId': userId
				},
				headers: headers,
				dataType: 'json',
				success: function(e) {
					console.log(e)
					if(e.code == '0') {
						console.log(e.code)
						mui.toast("点赞成功!")
					}else{
						mui.toast("点赞成功!")
					}
				}
			});
			that.children[1].innerHTML = num + 1;

			this.setAttribute('flag', false)

		} else {
			mui.ajax(url + '/app/interest/comment/like', {
				type: 'post',
				data: {
					'commentId': reNum,
					'likeBehavior': 'UNLIKE',
					'userId': userId
				},
				headers: headers,
				dataType: 'json',
				success: function(e) {
					console.log(e)
				}
			});

			this.children[1].innerHTML = (num - 1) ? (num - 1) : '';
			this.setAttribute('flag', true)
		}
	})