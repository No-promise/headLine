 var baseImg = 'http://yun.janesi.net/web-test/zhiqu-web/img/userPhoto.jpg'

 // lunbo
//  var mySwiper = new Swiper('.swiper-container', {

//  })
 console.log(requestUrl)

 // 给原生的参数
 var jumpLeft = {
     'url': urlBase + '/janesi-headline/ZQFL/templete/prenticeProfile.html?action=prentice'
 }

 var strategic = {
     'url': urlBase + '/janesi-headline/ZQFL/templete/makeMoneyStrategic.html'
 }

 var invitateCode = {
     'url': urlBase + '/janesi-headline/ZQFL/templete/inviteCodeProfile.html'
 }

 var teach = {
     'url': urlBase + '/janesi-headline/ZQFL/templete/teach.html'
 }

 console.log(teach)

 if (window.JanesiBridge.isAndroid == true) {
     $('#friends').css('display', 'block');
}else{
    $('#msg').css('display', 'block');      
    $('.bottom').css('display', 'block')
}

window.onload = function () {
    // 全局定义请求地址
    window.JanesiApi.reqUrl = requestUrl;
    getPacket();
    getWallet();
    getRanking();
    getInviteCode();
    window.JanesiBridge.callNativeWithCallBack('shouldShowGuide', {
        'position': 1
    }, function (res) {
        if (res.action == 1) {
            showAlert();
        }
    });
}


// 获取钱包数
function getPacket(){
    var reqApi = '/app/interest/task/packet_num';
    window.JanesiApi.sendApi(reqApi, 'post',{
        'appId':appId,
        'userId':userId
    }, function (e) {
        var res = e.result;
        console.log(e); 
        var a = 1;
        // if(a==0){
        if(res.packetNum==0){
            // 没有红包 弹alert_noneBag
            $('.stateMore').css('display','none');
            $('.activity_btnMore').css('display','none');
            $('.stateLess').css('display','block');
            $('.activity_btnLess').css('display','block');
            
            
        }else{
            // 有红包   弹alert_active
            $('.stateLess').css('display','none');
            $('.activity_btnLess').css('display','none');
            document.querySelector('.redBagNum').innerHTML=res.packetNum;
            $('.stateMore').css('display','block');
            $('.activity_btnMore').css('display','block');
            
            
        }
    })
}
//本身没有红包   点击去赚钱  分享  alert_noneBag
    var btnLess = document.querySelector('.activity_btnLess');
    btnLess.onclick = function () {
        $('.alert_noneBag').css('display','block'); 
        $('html,body').addClass('scrollbox'); //使网页不可滚动
    }
    // 
    setInterval(function () {
        var display = $('#share').css('display');

        if (display == 'block') {
            $('.alert_noneBag').css('display', 'none');
            $('html,body').removeClass('scrollbox'); //使网页恢复可滚动
            
        }
    }, 100);

// 有红包  点击领取   alert_active
    function btnMore() {
        var reqApi = '/app/interest/task/get_packet';
        window.JanesiApi.sendApi(reqApi, 'post',reqParams, function (e) {
            console.log(e); 
            var res = e.result;
            $('html,body').addClass('scrollbox'); //使网页不可滚动
            var num=0;
            // if(num==1){
            if (res.num == 0) {
                $('.statusNum').css('display', 'none');
                $('.alert_getBtn').css('display','none');
                $('.statusNone').css('display', 'block');
                $('.alert_makeBtn').css('display','block');
                
            } else {
                $('.statusNone').css('display', 'none');
                 $('.alert_makeBtn').css('display','none');
                $('.statusNum').css('display', 'block');
                $('.alert_getBtn').css('display','block');
               

            }
            document.querySelector('.getMoey').innerHTML = res.money;
            document.querySelector('.numberBags').innerHTML = res.num;
        })
        $('#alert_active').css('display', 'block');
        getPacket();
    }

    // 继续领取 
    var alert_getBtn = document.querySelector('.alert_getBtn');
    alert_getBtn.onclick = function () {
             $('#alert_active').css('display', 'none')
            setTimeout(function () {
                btnMore();
                $('#alert_active').css('display', 'block')

            }, 100);
    }
    // 继续赚钱  弹出分享
    var alert_makeBtn = document.querySelector('.alert_makeBtn');
    alert_makeBtn.onclick = function(){
       console.log(111)
    }
    setInterval(function () {
        // 再次获得钱包数
        var display = $('#share').css('display');

        if (display == 'block') {
            getPacket();
           $('#alert_active').css('display', 'none')
            $('html,body').removeClass('scrollbox'); //使网页恢复可滚动
            
        }
    }, 100);

    // 关闭弹框按钮  
    function closeBtn(){
        $('.alert_noneBag').css('display', 'none');
        $('#alert_active').css('display', 'none')
        $('html,body').removeClass('scrollbox'); //使网页恢复可滚动
        // 再次获得钱包数
        getPacket();
    }
    
// 打开新手引导
    function showAlert() {

        $('.newGuide').css('display', 'block');
        $('html,body').addClass('scrollbox'); //使网页不可滚动

    }

    function newClose() {
        $('.newGuide').css('display', 'none');
        $('html,body').removeClass('scrollbox'); //使网页恢复可滚动
    }


// 提现金额
function getWallet(){
     var reqApi = '/app/interest/user_wallet/summary';
     window.JanesiApi.sendApi(reqApi, 'post', reqParams, function (e) {
         // console.log(e)
         document.querySelector('#eightNum1').innerHTML = e.result.balance;
     })
 }
 // 排行榜 列表
 function getRanking() {
     var reqApi = '/app/interest/statistics/ranking';
     var listInfo = document.querySelector('.listInfo');
     window.JanesiApi.sendApi(reqApi, 'post', reqParams, function (e) {
        //  console.log(e);
         listInfo.innerHTML = '';
         for (let i = 0; i <= e.result.length - 1; i++) {
             if (e.result[i].avator == '') {
                 e.result[i].avator = baseImg;
             }
             let li = document.createElement('li');
             li.innerHTML = `
                    <div class="row">
                        <div class="leftRank">
                            <div class='order isRanking'><span>${i + 1}</span></div>
                        </div>
                        <img class="avatar isRanking" src=${e.result[i].avator} />
                        <div class="nameMobile">
                            <p class="name">${e.result[i].nickName} </p>
                            <p class="enlightening">收徒 ${e.result[i].inviteCount}人</p>
                        </div>
                        <div class="sumGrow">
                            <p class="doller">${e.result[i].totalBalance}元</p>
                        </div>
                    </div >
                       <hr class="liLine">
                 `
             listInfo.appendChild(li);
         }
         if (e.code == 0) {
             $('#showTip').css('display', 'block')
         }
     })
 }

 // 获得邀请码 .inviteNum.innerHTML 获取今日收徒人数 .plusPeople  获取今日徒弟贡献  .plusNumber
 function getInviteCode() {
     var reqApi = '/app/interest/invite/summary';
     window.JanesiApi.sendApi(reqApi, 'post', reqParams, function (e) {
        //  console.log(e);
         document.querySelector('.inviteNum').innerHTML = e.result.inviteCode;
     })
 }


 function clickSegmentAction(segmentId) {

     var segmentOne = document.getElementById("k_segmentOne");
     var segmentTwo = document.getElementById("k_segmentTwo");
     var segmentThree = document.getElementById("k_segmentThree");

     var segmentOneContent = document.getElementById("k_segmentOneContent");
     var segmentTwoContent = document.getElementById("k_segmentTwoContent");
     var segmentThreeContent = document.getElementById("k_segmentThreeContent");

     if (segmentId == 'k_segmentOne') {

         segmentTwoContent.style.display = 'none';
         segmentThreeContent.style.display = 'none';
         segmentOneContent.style.display = 'inline';

         if (!segmentOne.className.match('mui-active')) {

             segmentOne.classList.add('mui-active');
         }
         segmentTwo.classList.remove('mui-active');
         segmentThree.classList.remove('mui-active');

     } else if (segmentId == 'k_segmentTwo') {

         segmentOneContent.style.display = 'none';
         segmentThreeContent.style.display = 'none';
         segmentTwoContent.style.display = 'inline';

         if (!segmentTwo.className.match('mui-active')) {

             segmentTwo.classList.add('mui-active');
         }
         segmentOne.classList.remove('mui-active');
         segmentThree.classList.remove('mui-active');
     } else {

         segmentOneContent.style.display = 'none';
         segmentTwoContent.style.display = 'none';
         segmentThreeContent.style.display = 'inline';

         if (!segmentThree.className.match('mui-active')) {

             segmentThree.classList.add('mui-active');
         }
         segmentOne.classList.remove('mui-active');
         segmentTwo.classList.remove('mui-active');
     }
 }


 // 立即收徒
 mui('.immediately').on('tap', '.disciple', function () {
     //弹出底部弹框
     _czc.push(["_trackEvent", shiTuDisciple, tap]);

 })
 // 分享：
 mui('.bott').on('tap', '.weChat', function () {
     window.JanesiBridge.callNative('publicTurnShare', {
         'pathWay': 'weChat'
     });

 })
 mui('.bott').on('tap', '.friend', function () {
     window.JanesiBridge.callNative('publicTurnShare', {
         'pathWay': 'friend'
     });
     // console.log(13)

 })
 mui('.bott').on('tap', '.message', function () {
     window.JanesiBridge.callNative('publicTurnShare', {
         'pathWay': 'message'
     });
     // console.log(13)

 })
 mui('.bott').on('tap', '.QQ', function () {
     window.JanesiBridge.callNative('publicTurnShare', {
         'pathWay': 'QQ'
     });

 })
 mui('.bott').on('tap', '.sweepCode', function () {

     window.JanesiBridge.callNative('publicTurnShare', {
         'pathWay': 'sweepCode'
     });
 })
 mui('#share').on('tap', '.bottom', function () {

     window.JanesiBridge.callNative('open', teach);
 })


 // 邀请
 mui('#footer').on('tap', '.footLeft', function () {

     window.JanesiBridge.callNative('publicTurnShare', {
         'pathWay': 'sweepCode'
     });
     _czc.push(["_trackEvent", shiTuSweepCode, tap]);

 })
 mui('#footer').on('tap', '.footRight', function () {

     window.JanesiBridge.callNative('publicTurnShare', {
         'pathWay': 'weChat'
     });
     _czc.push(["_trackEvent", shiTuWeChat, tap]);


 })




 //进入徒弟界面
 mui('.justOnePic').on('tap', '.myPupil', function () {
     window.JanesiBridge.callNative('open', jumpLeft);
 })

 // 进入赚钱攻略
 mui('.justOnePic').on('tap', '.makeMoney', function () {
     window.JanesiBridge.callNative('open', strategic);
 })
 // 进入什么是邀请码界面
 mui('.invitation').on('tap', '.inviteNum', function () {
     window.JanesiBridge.callNative('open', invitateCode);
     // console.log(invitateCode)
 })
 // 立即提现
 mui('.withdrawal').on('tap', '.withdrawBtn', function () {
     window.JanesiBridge.callNative('open', {
         'page': 'app_money'
     });
 })
 // 点击链接直接领取
 mui('.introduce').on('tap', '.redFont', function () {
     console.log('点击链接直接领取')
 })