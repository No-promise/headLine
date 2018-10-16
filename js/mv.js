//mv.js
//渲染相关推荐

function getList(e) {
	var recommendList = e.result.contents;
	var detailUrl;
	// var sourceIco="&#xe622;";
	for (var i = 0; i < recommendList.length; i++) {
		// if(recommendList[i].source==''){
		// 	sourceIco=''
		// }
		if (recommendList[i].count.length >= 5) {
			recommendList[i].count = recommendList[i].count.substr(0, recommendList[i].count.length - 4) + '万'
		}
		if (recommendList[i].contentType == 'ARTICLE') {
			detailUrl = 'http://zq.janesi.com/app/interest/item/detail/?itemId=' + recommendList[i].itemId
			if (recommendList[i].layout == 'NOP') {
				var li = document.createElement('li');
				li.setAttribute('listUrl', detailUrl);
				li.setAttribute('lid', i);
				li.innerHTML =`
					<div class="three_tit mui-ellipsis-2">
						<span> ${recommendList[i].title} </span>
					</div>
					<div class="correlation">
						<div class="pho comeFrom">
							<span> ${recommendList[i].source} </span>
						</div>
						<div class="read">
							<span> ${recommendList[i].count} </span>
							<span class="iconfont txtIco">阅读</span>
						</div>
					</div>
				`
					

				document.getElementById('list').appendChild(li);

			} else if (recommendList[i].layout == 'LARP'||recommendList[i].layout == 'TWB3P') {
				var li = document.createElement('li');
				li.setAttribute('listUrl', detailUrl);
				li.setAttribute('lid', i);
				li.innerHTML =`
					<div class="one_top">
                        <div class="one_tit ">
                            <div class="font mui-ellipsis-2"> ${recommendList[i].title} </div>
                            <div class="correlation">
                                <div class="pho comeFrom">
                                    <span> ${recommendList[i].source} </span>
                                </div>
                                <div class="read">
                                    <span> ${recommendList[i].count} </span>
                                    <span class="iconfont txtIco">阅读</span>
                                </div>
                            </div>
                        </div>
                        <div class="thurmd" style="background:url(${recommendList[i].medias[0].url}) no-repeat center/cover">
                        </div>
                    </div>
				`
					
				document.getElementById('list').appendChild(li);
			}
		} else if (recommendList[i].contentType == 'VIDEO') {
			detailUrl = 'http://zq.janesi.com/app/interest/item/video_detail?itemId=' + recommendList[i].itemId
			var li = document.createElement('li');
			li.setAttribute('listUrl', detailUrl);
			li.setAttribute('lid', i);
			li.innerHTML =`
				<div class="one_top">
                        <div class="one_tit ">
                            <div class="font mui-ellipsis-2"> ${recommendList[i].title}</div>
                            <div class="correlation">
                                <div class="pho comeFrom">
                                    <span> ${recommendList[i].source}  </span>
                                </div>
                                <div class="read">
                                    <span> ${recommendList[i].count}  </span>
                                    <span class="iconfont">次播放</span>
                                </div>
                            </div>
                        </div>
                        <div class="thurmd" id="thurmd" style="background:url(${recommendList[i].medias[0].cutUrl}) no-repeat center/cover">
                            <div class="playTime"> ${recommendList[i].medias[0].duration}  </div>
                        </div>
                    </div>
			`
			document.getElementById('list').appendChild(li);

		}else if(recommendList[i].contentType == 'AD'){
            if(recommendList[i].layout == 'NOP'||recommendList[i].layout == null){
                var li = document.createElement('li');
				li.setAttribute('listUrl', detailUrl);
                li.setAttribute('lid', i);
                li.innerHTML =`
                    <div class="text_ad">
                        <div class="ad_top">
                            <div class="ad_title_font mui-ellipsis-2">${recommendList[i].title}</div>
                        </div>
                        <div class="ad_foot">
                            <div class="ad_tipShow">
                                广告
                            </div>
                            <div class="ad_coin">
                                <img class="coinsSrc" src="../icon/welfare_daily_gold@2x.png" alt="">
                                <p class="ad_number">+<span class="plusCoin">${recommendList[i].reward}</span></p>
                            </div>
                        </div>
                    </div>
                `
                document.getElementById('list').appendChild(li);
               
            }else if(recommendList[i].layout == 'IMAGE'){
                var li = document.createElement('li');
				li.setAttribute('listUrl', detailUrl);
                li.setAttribute('lid', i);
                li.innerHTML =`
                    <div class="big_img_ad">
                        <div class="ad_top">
                            <div class="ad_title_font mui-ellipsis-2">${recommendList[i].title}</div>
                        </div>
                        <div class="big_main">
                            <img class="big_one" src="${recommendList[i].medias[0].url}" alt="">
                        </div>
                        <div class="ad_foot">
                            <div class="ad_tipShow">
                                广告
                            </div>
                            <div class="ad_coin">
                                <img class="coinsSrc" src="../icon/welfare_daily_gold@2x.png" alt="">
                                <p class="ad_number">+<span class="plusCoin">${recommendList[i].reward}</span></p>
                            </div>
                        </div>
                    </div>
                `
                document.getElementById('list').appendChild(li);

            }else if(recommendList[i].layout == 'TWB3P'){
                var li = document.createElement('li');
				li.setAttribute('listUrl', detailUrl);
                li.setAttribute('lid', i);
                li.innerHTML = `
                    <div class="three_img_ad">
                        <div class="ad_top">
                            <div class="ad_title_font mui-ellipsis-2">${recommendList[i].title}</div>
                        </div>
                        <div class="three_main">
                            <div class="three_one">
                                <img class="three_img" src="${recommendList[i].medias[0].url}" alt="">
                            </div>
                            <div class="three_two">
                                <img class="three_img" src="${recommendList[i].medias[1].url}" alt="">
                            </div>
                            <div class="three_three">
                                <img class="three_img" src="${recommendList[i].medias[2].url}" alt="">
                            </div>
                        </div>
                        <div class="ad_foot">
                            <div class="ad_tipShow">
                                广告
                            </div>
                            <div class="ad_coin">
                                <img class="coinsSrc" src="../icon/welfare_daily_gold@2x.png" alt="">
                                <p class="ad_number">+<span class="plusCoin">${recommendList[i].reward}</span></p>
                            </div>
                        </div>
                    </div>
                `
                document.getElementById('list').appendChild(li);

            }else if(recommendList[i].layout == 'LARP'){
                var li = document.createElement('li');
				li.setAttribute('listUrl', detailUrl);
                li.setAttribute('lid', i);
                li.innerHTML =`
                    <div class="left_img_ad">
                        <div class="ad_left">
                            <div class="ad_title_font mui-ellipsis-2"> ${recommendList[i].title} </div>
                            <div class="ad_foot foot_left">
                                <div class="ad_tipShow">
                                    广告
                                </div>
                                <div class="ad_coin">
                                    <img class="coinsSrc" src="../icon/welfare_daily_gold@2x.png" alt="">
                                    <p class="ad_number">+<span class="plusCoin">${recommendList[i].reward}</span></p>
                                </div>
                            </div>
                        </div>
                        <div class="ad_right">
                            <img class="three_img" src="${recommendList[i].medias[0].url}" alt="">
                        </div>
                    </div>
                `
                document.getElementById('list').appendChild(li);
                
            }
        } 

    }
    // 判断金币是否展现
    var plusCoins=document.querySelectorAll('.plusCoin');
        for(var i=0;i<plusCoins.length;i++){
            if(plusCoins[i].innerHTML=='0'||plusCoins[i].innerHTML=='null'){
               console.log(plusCoins[i])
               console.log(plusCoins[i].parentNode.parentNode.parentNode )
               var coinFather=plusCoins[i].parentNode.parentNode.parentNode ;
           var removeCoin=plusCoins[i].parentNode.parentNode;
           coinFather.removeChild(removeCoin)
            }
        }
}