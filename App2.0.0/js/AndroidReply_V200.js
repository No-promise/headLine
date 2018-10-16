

function getRequest() {
    var url = location.href; //获取整个地址栏地址
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str=url.split('?')[1];//截取？之后的所有参数
         str = str.split("&");  //将每个参数截取放置到数组
        for(var i = 0; i < str.length; i++) {
            theRequest[str[i].split("=")[0]]=unescape(str[i].split(     "=")[1]);//将属性及属性值分别归属到数组
        }
    }
    return theRequest;
}

function getGreetings() {
      return 1;
}

			
			var flag1=true;
			var userPhotoUrl="http://yun.janesi.net/web-test/zhiqu-web/img/userPhoto.jpg"
			
			


			var load = document.createElement('div')
			load.setAttribute('id', 'loading');
			load.innerHTML = `
							<div class="load_left">正在加载</div>
							<div class="load_right">
								<img src="http://yun.janesi.net/web-test/zhiqu-web/img/zhuan.gif" alt="" />
							</div>
			`

			var url = window.reqUrl
			console.log(url)
			console.log(location.href)
				headers={'Content-Type': 'application/x-www-form-urlencoded'}
		
			var itemId = getRequest()['itemId'] || getRequest()['itemid']//获取某参数的对应参数值
			    userId = getRequest()['userId'] || getRequest()['userid']
			    commentId = getRequest()['Id'] || getRequest()['id']
   

			var lastRemarkTime = ''

			var remarkNum=document.getElementById('remarkNum');
			var parentUserId,parentUserNickName;

			// 评论回复查询	

			mui.ajax(url+'/app/interest/comment/list',{
				type:'post',
				data:{'itemId':itemId,'parentCommentId':commentId},
				headers: headers,
				dataType: "json",
				success:function(e){
					console.log(e);

					if(e.result.parent.avator == null){
						e.result.parent.avator=userPhotoUrl;
					}

					parentUserNickName=e.result.parent.userNickName;
					parentUserId=e.result.parent.userId;

					if(e.result.parent.likeCount=='0'){
						e.result.parent.likeCount=''
					}
					var li=document.createElement('li');
					li.innerHTML=`
					<div class="listLeft">
						<div>
							<img src=${e.result.parent.avator} alt="" />
						</div>
					</div>
					<div class="ListRight">
						<div class="ListRightTop">
							<div class="user">${e.result.parent.userNickName}</div>
							<div class="remarkHitTop" flag='true' id="remarkHit" style="float: right;" num=${e.result.parent.commentId}>
								<span class="iconfont">&#xe621;</span>
								<span>${e.result.parent.likeCount}</span>
							</div>
						</div>
						<div class="remarkCon">
							${e.result.parent.words}
						</div>

						<div class="ListRightBot">
							<div class="pubdate">
								<span>${formatMsgTime(e.result.parent.gmtCreate)}</span>
							</div>
						</div>
					</div>
								`
				document.getElementById('newRemarkList').appendChild(li);


				for(var i=0;i<e.result.comments.length;i++){
					if(e.result.comments[i].avator == null){
						e.result.comments[i].avator=userPhotoUrl;
					}
					var gmtCreate=formatMsgTime(e.result.comments[i].gmtCreate)
					
					if(e.result.comments[i].likeCount=='0'){
						e.result.comments[i].likeCount=''
					}

					var  li=document.createElement('li');
								li.innerHTML=`
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
											<span>${gmtCreate}</span>
										</div>
									</div>
								</div>
								`
								document.getElementById('remarkList').appendChild(li);

								lastRemarkTime=e.result.comments[e.result.comments.length-1].gmtCreate
							}
				}
			})

			
			if(!lastRemarkTime){
				load.innerHTML='没有更多了';
			}



			// 上拉加载更多	

			$(window).scroll(function(){
			　　var scrollTop = $(this).scrollTop();
			　　var scrollHeight = $(document).height();
			　　var windowHeight = $(this).height();
			　　if(scrollTop + windowHeight >= scrollHeight){
					document.getElementById('remarkList').appendChild(load);
					mui.ajax(url+'/app/interest/comment/list',{
						type:'post',
						data:{'itemId':itemId,'parentCommentId':commentId,'lastItemTime':lastRemarkTime},
						headers: headers,
						dataType:'json',
						success:function(e){
							
							console.log(e);

							if(e.result.comments.length>0){
								document.getElementById('remarkList').removeChild(load);
								for(var i=0;i<e.result.comments.length-1;i++){
									if(e.result.comments[i].avator == null){
										e.result.comments[i].avator=userPhotoUrl;
									}
									if(e.result.comments[i].likeCount=='0'){
										e.result.comments[i].likeCount=''
									}

									var li=document.createElement('li');
									li.innerHTML=`
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
										</div>
									</div>
									`
									document.getElementById('remarkList').appendChild(li);
									}

									lastRemarkTime=e.result.comments[e.result.comments.length-1].gmtCreate

							}else{
								load.innerHTML='没有更多了';
							}

							
						}
					})
			　　}
            });


            

            // 评论回复

            function reply(val){
                var chil = document.getElementById('remarkList');
										

						mui.ajax(url+'/app/interest/comment/add',{
							
							type:'post',
							data:{'userId':userId,'itemId':itemId,'words':val,'parentCommentId':commentId,'parentUserId':parentUserId,'parentUserNickName':parentUserNickName},
							headers: headers,
							dataType: "json",
							success:function(e){
                                console.log(e);
                                
                                if(e.result.avator== null){
                                    e.result.avator =userPhotoUrl;
                                }
                                if(e.code == '0'){
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
																</div>
															</div>
							`;
                                        chil.insertBefore(li, chil.children[0]);
                                        mui.toast("回复成功!")
                                }else{
                                    mui.toast("游客不能回复!")
                                }
								

							}
						})
            };

            // 点赞
            function like(){
					var hit=document.getElementById('remarkHit');
					var reNum=hit.getAttribute('num');
					var num = parseInt(hit.children[1].innerHTML?hit.children[1].innerHTML:0);
					hit.classList.toggle('remarkHitHot');
					if(flag1){
						mui.ajax(url+'/app/interest/comment/like',{
										type: 'post',
										data:{'commentId':reNum,'likeBehavior':'LIKE','userId':userId},
										headers:headers,
										dataType: 'json',
										success: function(e) {
											console.log(e)
											if(e.code=='0'){
												mui.toast("点赞成功!")
											}
										}
						});
						hit.children[1].innerHTML=num+1;
						flag1=!flag1;
					}else{
						mui.ajax(url+'/app/interest/comment/like',{
										type: 'post',
										data:{'commentId':reNum,'likeBehavior':'UNLIKE','userId':userId},
										headers: headers,
										dataType: 'json',
										success: function(e) {
											console.log(e)
										}
						});
						hit.children[1].innerHTML=(num-1)?(num-1):'';
						flag1=!flag1;
					}
            }


			mui.plusReady(

				//	评论点赞
				mui('.remarkList').on('tap', '.remarkHit', function(e) {
					var num = parseInt(this.children[1].innerHTML?this.children[1].innerHTML:0);
					this.classList.toggle('remarkHitHot');
					var flag = eval(this.getAttribute('flag'));

					var reNum=this.getAttribute('num')	
					var that=this;	
					if(flag) {
									mui.ajax(url+'/app/interest/comment/like',{
										type: 'post',
										data:{'commentId':reNum,'likeBehavior':'LIKE','userId':userId},
										headers: headers,
										dataType: 'json',
										success: function(e) {
											console.log(e)
											if(e.code=='0'){
												console.log(e.code)

											}else{
												mui.toast("不可重复点赞!")
											}
										}
									});
									that.children[1].innerHTML = num + 1;
									
									this.setAttribute('flag', false)
									
						
					} else {
						mui.ajax(url+'/app/interest/comment/like',{
										type: 'post',
										data:{'commentId':reNum,'likeBehavior':'UNLIKE','userId':userId},
										headers:headers,
										dataType: 'json',
										success: function(e) {
											console.log(e)
										}
									});

						this.children[1].innerHTML = (num - 1)?(num - 1):'';
						this.setAttribute('flag', true)
					}
				})
			)