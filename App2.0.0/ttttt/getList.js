function getList(e){
    var recommendList = e.result.contents;
    var detailUrl;
    for(var i = 0; i < recommendList.length; i++){
        if(recommendList[i].contentType == 'AD'){
            if(recommendList[i].layout == 'NOP'){
                var li = document.createElement('li');
				li.setAttribute('listUrl', detailUrl);
                li.setAttribute('lid', i);
                li.innerHTML =`
                    <div class="text_ad">
                        <div class="ad_top comeFrom">
                            <div class="ad_title_font mui-ellipsis-2">${recommendList[i].title}</div>
                        </div>
                        <div class="ad_foot">
                            <div class="ad_tipShow">
                                广告
                            </div>
                        </div>
                    </div>
                `
                // document.getElementById('list').appendChild(li);
            }else if(recommendList[i].layout == 'TABP'){
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
                // li.innerHTML =`
                //     <div class="big_img_ad">
                //         <div class="ad_top">
                //             <div class="ad_title_font mui-ellipsis-2">${recommendList[i].title}</div>
                //         </div>
                //         <div class="big_main">
                //             <img class="big_one" src="${recommendList[i].medias[0].url}" alt="">
                //         </div>
                //         <div class="ad_foot">
                //             <div class="ad_tipShow">
                //                 广告
                //             </div>
                //         </div>
                //     </div>
                // `
                document.getElementById('list').appendChild(li);

            }else if(recommendList[i].layout == 'TWB3P'){
                var li = document.createElement('li');
				li.setAttribute('listUrl', detailUrl);
                li.setAttribute('lid', i);
                li.innerHTML = `
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
                // li.innerHTML = `
                //     <div class="three_img_ad">
                //         <div class="ad_top">
                //             <div class="ad_title_font mui-ellipsis-2">${recommendList[i].title}</div>
                //         </div>
                //         <div class="three_main">
                //             <div class="three_one">
                //                 <img class="three_img" src="${recommendList[i].medias[0].url}" alt="">
                //             </div>
                //             <div class="three_two">
                //                 <img class="three_img" src="${recommendList[i].medias[1].url}" alt="">
                //             </div>
                //             <div class="three_three">
                //                 <img class="three_img" src="${recommendList[i].medias[2].url}" alt="">
                //             </div>
                //         </div>
                //         <div class="ad_foot">
                //             <div class="ad_tipShow">
                //                 广告
                //             </div>
                //         </div>
                //     </div>
                // `
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
                            </div>
                        </div>
                        <div class="ad_right">
                            <img class="three_img" src="${recommendList[i].medias[0].url}" alt="">
                        </div>
                    </div>
                `
                // document.getElementById('list').appendChild(li);

            }
        } 




        
    }
}