function signIn(){
    window.JanesiBridge.callNative('open', signPage);
}
function signProgress() {
    // window.JanesiApi.reqUrl = requestUrl

    var signApi = '/api/ucs/sign/show_sign';
    window.JanesiApi.sendApi(signApi, 'post', {
        // userId:'1336'
    }, function (res) {
        console.log(res);
        if (res.code == '0') {
            if (res.result.isSign == '1') {//1已签到，更换签到按钮
                $('.signBtn').html('签到收益')
                $('.signBtn').css({ 'backgroundColor': '#fff', 'border': '1px solid #FD4844', 'color': '#FD4844' })
    
            } else {
                $('.signBtn').html('签到')
                $('.signBtn').css({ 'backgroundColor': '#FD4844', 'border': 'none', 'color': '#fff' })
            }
            //签到进度条
                for (var i = 0; i < res.result.signDays; i++) {
                    console.log($('.line').children('div')[i])
                    $('.line').children('div')[i].classList.add('signed')
                }
                //10 26 42 58 74 90 100
                if(res.result.signDays == '0'){
                    var circles=document.querySelectorAll('.circle');
                    console.log(circles)
                    for(var i=0;i<circles.length;i++){
                        circles[i].classList.remove('signed')
                    }
                    $('.changeLine').css('width', '0%');
                }else if (res.result.signDays>'0'&&res.result.signDays < '7') {
                    $('.changeLine').css('width', (res.result.signDays - 1) * 16 + 10 + '%');
                } else  {
                    $('.changeLine').css('width', '100%');
                    $('.gift').addClass('sevenGift');
                    console.log($('.line div:nth-of-type(7)'))
                    $('.line div:nth-of-type(7)').removeClass('signed')
                }

            //    if(res.result.isComplete=='1'){//1已完成，更换宝箱状态
            // 		$('.gift').addClass('sevenGift');
            // 		console.log($('.line div:nth-of-type(7)'))
            // 		$('.line div:nth-of-type(7)').removeClass('signed')
            //    }
        }
    })
}

//点击签到进度条位置，弹框弹出和关闭
var signBottom=document.querySelector('.signBottom');
var fullMask=document.querySelector('.fullMask');
var getCoinTip=document.querySelector('.getCoinTip');
signBottom.addEventListener('click',function(){
	fullMask.style.display='block';
})
fullMask.addEventListener('click',function(e){
	fullMask.style.display='none';
})
getCoinTip.addEventListener('click',function(e){
	e.stopPropagation();
})
var tipBtn=document.querySelector('.tipBtn');
tipBtn.addEventListener('click',function(e){
	fullMask.style.display='none';
})
var close=document.querySelector('.close');
close.addEventListener('click',function(e){
	fullMask.style.display='none';
})


function didClickCell(cell) {
    var rect = cell.getBoundingClientRect()
    var screenHeight = window.screen.height
    var bottomHeight=window.innerHeight-cell.getBoundingClientRect().bottom;
    console.log(bottomHeight)
    var parent = cell.parentNode;
    if (parent.id) {

    }
    var img = cell.childNodes[3].childNodes[5];
    if (parent.className.match('mui-active')) {

       
        parent.classList.remove("mui-active");
        if (img) {
            img.src = '../icon/welfare_task_jiantou2@2x.png';
        }
    } else {

    setTimeout(function() {
        console.log(cell.parentNode.lastChild.getBoundingClientRect().height);
        if(cell.parentNode.lastChild.getBoundingClientRect().height>bottomHeight){
            var parentDiv = cell.parentNode;
            parentDiv.scrollIntoView(false);
        }
        
    }, 0);
        
        parent.classList.add("mui-active");
        if (img) {
            img.src = '../icon/welfare_task_jiantou@2x.png';
        }
        
    }
}

window.onload = function () {
    // 全局定义请求地址
    window.JanesiApi.reqUrl = requestUrl;
    console.log( window.JanesiApi.reqUrl)
    reloadData();

}

window.JanesiBridge.commonNativeCallJS = function (res) {
    if (res.action == 'reloadData') {
        reloadData();
    }
}



// 给原生的参数
var linkPupil1 = {
    'url': urlBase + '/janesi-headline/ZQFL/templete/teachersdisciple.html',
    'data': {
        'address': 'teacher',
        'from': 'banner'
    }
}
var linkPupil2 = {
    'url': urlBase + '/janesi-headline/ZQFL/templete/teachersdisciple.html',
    'data': {
        'address': 'teacher',
        'from': 'task'
    }
}
var inviteCode = {
    'url': urlBase + '/janesi-headline/ZQFL/templete/bindingCode.html'
}
var questionUrl = {
    'url': urlBase + '/janesi-headline/ZQFL/templete/question.html'
}

var jumpTipUrlString = {
    // 'url':'https://api.nicetui.cn/niceapi/addpostion/4D3D112BA363497A'
}

 var signPage = {
    'url': urlBase + '/janesi-headline/ZQFL/templete/todySign.html'
}


var dailyTaskList;
var adTaskName;

// 新手任务
function fetchNewbieData() {
    var reqApi = '/app/interest/task/newbie_task';
    window.JanesiApi.sendApi(reqApi, 'post', reqParams, function (res) {
        var noobSection = document.getElementById('noobTaskSection');

        if (res.code == 9000) {

            if (!noobSection.className.match('isNotNoob')) {

                noobSection.classList.add('isNotNoob');
            }
            return;
        }

        if (res.code != 0) {
            return;
        }
        var array = res.result.taskList;
        if (res.result.taskTip == 1) {
            if (!noobSection.className.match('isNotNoob')) {

                noobSection.classList.add('isNotNoob');
            }
            return;
        };
        var ul = document.createElement('ul');
        ul.className = 'mui-table-view';
        for (var i = 0; i < array.length; i++) {

            var task = array[i];
            if (task.taskTip == 1) continue;
            var li = document.createElement('li');
            li.className = 'mui-table-view-cell mui-collapse';
            if (task.taskName.match('新手阅读奖励')) {
                var tasks = task.taskList;
                var taskUl = document.createElement('ul');
                for (var j = 0; j < tasks.length; j++) {
                    var model = tasks[j];
                    var taskLi = document.createElement('li');
                    var template;
                    if (model.taskTip == 1) {
                        template = `
                            <div class="signRow">
                                <p class="rowCommonLeft isSign">${model.content}</p>
                                <div class="SignRight">
        
                                    <p class="commonRight isSignRight">+<span class="commonRight isSignRight">${model.awardCount}</span>
                                    </p>
                                    <img class="IsSignRightIcon" src="../icon/signRowIconGray@2x.png">
                                    <img class="isDoneSignIcon" src="../icon/welfare_finish@2x.png">
                                </div>
                            </div>`
                    } else {
                        template = `
                            <div class="signRow">
                            <p class="rowCommonLeft">${model.content}</p>
                            <div class="SignRight">
    
                                <p class="commonRight">+<span class="commonRight">${model.awardCount}</span>
                                </p>
                                <img class="IsSignRightIcon" src="../icon/signRowIconYellow@2x.png">
                            </div>
                        </div>`
                    }
                    taskLi.innerHTML = template;
                    taskUl.appendChild(taskLi);
                }

                row = `<div class="collapseSectionBG" onclick="didClickCell(this)" id = "新手阅读奖励">
                <div class="collapseSectionLeftBg">
                    <div class="noobSection2LeftLine">
                        <div class="noobSectionCircle"></div>
                    </div>
                    <p class="sectionCommonLeftTitle">新手阅读奖励</p> 
                </div> 
                <dic class="sectionRightBg">
                    <p class="collapseSectionRightCommonTitle">+<span class="collapseSectionRightCommonTitle">${task.awardCount}</span>
                    </p>
                    <img class="collapseSectionYellowIcon" src="../icon/welfare_daily_gold@2x.png">
                    <img class="collapseSectionArrow" src="../icon/welfare_task_jiantou2@2x.png">
                </dic>
            </div>` +
                    `
                <div class="mui-collapse-content">
                <div class="signDetail">    
                <div class="noobSectionProfileTitleBg">     
                <p class="noobSectionProfileString">首次登录日起20天内，完成以下任务可获得相应金币奖励（必须连续完成）</p>
                </div>${taskUl.innerHTML}
                </div>            
                </div>`;

                li.innerHTML = row;
                ul.appendChild(li);
            } else {

                createRow(li,task);
                ul.appendChild(li);
            }            
        }
        var lastLi = ul.lastElementChild;
        var lastHideDiv = lastLi.getElementsByClassName('collapseSectionBG')[0];
        lastHideDiv.classList.add('hideLine');
        var temp = ` <div class="sectionHeaderBG"  onclick="collapseAllAction(this)">
    
            <div class="sectionTitleBG">
                <img class="sectionLeftIcom" src="../icon/welfare_daily_person@2x.png">
                <p class="sectionLeftTitle">新手任务</p>
            </div>
        </div>`
        noobSection.innerHTML = temp;
        noobSection.appendChild(ul);
    })
}
// 日常任务
function fetchDailyData() {
    var reqApi = '/app/interest/task/daily_task';
    window.JanesiApi.sendApi(reqApi, 'post', reqParams, function (res) {
        if (res.code != 0) {
            return;
        }
        var dailyTaskSection = document.getElementById('dailyTaskSection');
        var headerSectionTemplate = `
            <div class="sectionHeaderBG" onclick="collapseAllAction(this)">
            <div class="sectionTitleBG">
            <img class="sectionLeftIcom" src="../icon/welfare_daily_task@2x.png">
            <p class="sectionLeftTitle">${res.result.content}</p>
            </div>
            </div>
            `
        var ul = document.createElement('ul');
        ul.className = 'mui-table-view';
        var tasks = res.result.taskList;
        dailyTaskList = tasks;
        for (var i = 0; i < tasks.length; i++) {

            var model = tasks[i];
            if (model.taskTip == 1) continue;
            var li = document.createElement('li');
            li.className = 'mui-table-view-cell mui-collapse';
            createRow(li,model);
            ul.appendChild(li);
        }
        var lastLi = ul.lastElementChild;
        var lastHideDiv = lastLi.getElementsByClassName('collapseSectionBG')[0];
        lastHideDiv.classList.add('hideLine');
        dailyTaskSection.innerHTML = headerSectionTemplate;
        dailyTaskSection.appendChild(ul);
    })
}
// 点击签到
function clickSignAction() {
    var reqApi = '/api/ucs/sign/checkout';
    window.JanesiApi.sendApi(reqApi, 'post', reqParams, function (res) {
        fetchSignData();
        var jsonStr = res;

        window.JanesiBridge.callNative('signSuccess', jsonStr);
    })
}


function collapseAllAction(section) {

    var img = section.childNodes[3];
    console.log('section', img.src);

    if (img.src.match('welfare_task_jiantou2@2x.png')) {

        img.src = '../icon/welfare_task_jiantou@2x.png';
    } else {
        img.src = '../icon/welfare_task_jiantou2@2x.png';
    }
    var ul = section.parentNode.lastChild;
    var liArray = ul.childNodes;
    for (var i = 0; i < liArray.length; i++) {

        var li = liArray[i];
        var row = li.childNodes;
        var rowList = li.childNodes;
        for (var j = 0; j < rowList.length; j++) {

            var target = rowList[j];
            if (target.tagName == 'DIV') {

                if (target.className.match('collapseSectionBG')) {

                    target.onclick();
                    break;
                }
            }
        }
    }
    if (section.id) {

    }
}



//点击任务按钮事件
function didClickRowBtnAction(key) {

    var keyName = key.classList[1];
    console.log(keyName)
    if (keyName == '输入邀请码') {

        window.JanesiBridge.callNative('open', inviteCode);

    } else if (keyName == '邀请收徒，现金可提现') {
        window.JanesiBridge.callNative('open', linkPupil2);
        _czc.push(["_trackEvent", FUlIDisciple, tap]);


    } else if (keyName == '绑定手机号') {
        window.JanesiBridge.callNative('welfareInterfaceTask', {
            'taskName': 'bindPhone'
        });


    } else if (keyName == '绑定微信号') {
        window.JanesiBridge.callNative('welfareInterfaceTask', {
            'taskName': 'bindWechat'
        });


    } else if (keyName == '阅读资讯') {
        window.JanesiBridge.callNative('open', {
            'page': 'homePage'
        });


    } else if (keyName == '分享资讯') {
        window.JanesiBridge.callNative('open', {
            'page': 'homePage'
        });


    } else if (keyName == '阅读时长30分钟') {
        window.JanesiBridge.callNative('open', {
            'page': 'homePage'
        });


    } else if (keyName == '观看视频') {
        window.JanesiBridge.callNative('open', {
            'page': 'videoPage'
        });


    } else if (keyName == '阅读推送资讯') {
        window.JanesiBridge.callNative('welfareInterfaceTask', {
            'taskName': 'sample'
        });


    } else if (keyName == '问卷调查') {
        window.JanesiBridge.callNative('open', questionUrl)

    } else if (keyName == '幸运大转盘') {

        // window.JanesiBridge.callNative('open', jumpTipUrlString);

        // for (var i = 0; i < dailyTaskList.length; i++) {

        //     var task = dailyTaskList[i];
        //     console.log(1111, task);
        //     if (task.taskName == '拆红包领奖励') {

        //     }
        // }
    } else if (keyName == adTaskName) {
        console.log(jumpTipUrlString);
        window.JanesiBridge.callNative('open', jumpTipUrlString);

        // for (var i = 0; i < dailyTaskList.length; i++) {

        //     var task = dailyTaskList[i];
        //     console.log(1111, task);
        //     if (task.taskName == '拆红包领奖励') {

        //     }
        // }
    }
}

//点击中间banner 事件   进入师徒页面

function clickBannerAction() {
    window.JanesiBridge.callNative('open', linkPupil1);
    _czc.push(["_trackEvent", FUlIBanner, tap]);
}

//原生触发 刷新请求
function reloadData() {
    fetchDailyData();
    fetchNewbieData();
    signProgress();
}



function createRow(li, model) {

    var sectionRightBg = document.createElement('div');
    sectionRightBg.className = 'sectionRightBg';
    if (model.awardUnit.match('元')) {
        if(model.taskName == "输入邀请码"){
            
            var count = 0.5;
            sectionRightBgTemplate = `
            <p class="collapseSectionRightCommonTitle redRightTitle">+<span class="collapseSectionRightCommonTitle redRightTitle">${count}${model.awardUnit}</span>
            </p>
            <img class="collapseSectionHongbaoIcon" src="../icon/welfare_daily_hongbao@2x.png">
            <img class="collapseSectionArrow" src="../icon/welfare_task_jiantou2@2x.png">
            `
        }else{


            sectionRightBgTemplate = `
            <p class="collapseSectionRightCommonTitle redRightTitle">+<span class="collapseSectionRightCommonTitle redRightTitle">${model.awardCount}${model.awardUnit}</span>
            </p>
            <img class="collapseSectionHongbaoIcon" src="../icon/welfare_daily_hongbao@2x.png">
            <img class="collapseSectionArrow" src="../icon/welfare_task_jiantou2@2x.png">
            `
        }

    } else if (model.awardUnit.match('金币')) {

        sectionRightBgTemplate = `
                    <p class="collapseSectionRightCommonTitle">+<span class="collapseSectionRightCommonTitle">${model.awardCount}</span>
                    </p>
                    <img class="collapseSectionYellowIcon" src="../icon/welfare_daily_gold@2x.png">
                    <img class="collapseSectionArrow" src="../icon/welfare_task_jiantou2@2x.png">
                    `
    } else {
        console.log(model.taskName);
         adTaskName = model.taskName
        // 将广告链接提出来
        jumpTipUrlString.url = model.linkUrl;
        sectionRightBgTemplate = `
                    <p class="collapseSectionRightCommonTitle redRightTitle">+<span class="collapseSectionRightCommonTitle redRightTitle">${model.awardUnit}</span>
                    </p>
                    <img class="collapseSectionHongbaoIcon" src="${model.imageUrl}">
                    <img class="collapseSectionArrow" src="../icon/welfare_task_jiantou2@2x.png">
                    `
    }
    sectionRightBg.innerHTML = sectionRightBgTemplate;
    var rowTemplate = `
                    <div class="collapseSectionBG" onclick="didClickCell(this)" id = "${model.taskName}">
                        <div class="collapseSectionLeftBg">
                            <div class="noobSection2LeftLine">
                                <div class="noobSectionCircle"></div>
                            </div>
                            <p class="sectionCommonLeftTitle">${model.taskName}</p>
                        </div>
                        ${sectionRightBg.outerHTML}
                    </div>
                    <div class="mui-collapse-content">
                        <div class="rightBtnRowBg">
                            <p class="rightBtnRowBgLeftTitle">${model.content}</p>
                            <div class="rightBtn ${model.taskName}" onclick='didClickRowBtnAction(this)'>${model.param}</div>
                        </div>
                    </div>`
    li.innerHTML = rowTemplate;
}