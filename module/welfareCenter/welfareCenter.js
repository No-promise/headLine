(function ($) {


});

function didClickCell(cell) {

    var parent = cell.parentNode;
    if (parent.id) {

    }
    var img = cell.childNodes[3].childNodes[5];
    if (parent.className.match('mui-active')) {

        if (cell.id != '输入邀请码' && cell.id != '阅读推送资讯') {

            cell.classList.remove('hideLine');
        }
        parent.classList.remove("mui-active");
        if (img) {
            img.src = 'http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_task_jiantou2@2x.png';
        }
    } else {

        if (cell.id != '输入邀请码' && cell.id != '阅读推送资讯') {

            cell.classList.add('hideLine');
        }
        parent.classList.add("mui-active");
        if (img) {
            img.src = 'http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_task_jiantou@2x.png';
        }
    }
}

window.onload = function () {

}

// 给安卓的参数
var teacherLink = {
    'url': 'http://yun1.janesi.net/web-test/zhiquFuli/templete/teacherAndPupil.html'}
var linkPupil = JSON.stringify(teacherLink);

// 定义公共参数：
// let url = 'http://10.10.10.41:8090';

let url = '';
var appId = '';
var userId = '';
// 获取公参：
window.android.updateRemark("ok");

// publicListParams()
// function publicListParams() {

    function publicListParams(listPara) {
    var val = JSON.parse(listPara)
    appId=val.appId;
    userId=val.userId;
    url = val.url;
    // userId = 606;
    // appId = 10010;
    reloadData();
};



// 签到表
function fetchSignData() {

    $.ajax({
        type: 'post',
        data: {
    
            userId: userId,
            appId: appId
        },
        url: url + '/app/interest/task/show_sign',
        success: function (res) {
            if (res.code != 0) {
                alert(res.msg);
                return;
            }
            var coinList = res.result.coinList;
            var ul = document.getElementById('k_signList');
            ul.innerHTML = '';
            var btn = document.getElementById('k_signBg');
            var p = document.getElementById('k_signBtnTitle');
            if (res.result.signInApply == 0) {

                var btn = document.getElementById('k_signBg');
                btn.onclick = clickSignAction;
            } else {
                p.innerHTML = '已签到';
                btn.classList.add('unSign');
            }
            for (var i = 0; i < coinList.length; i++) {

                var li = document.createElement('li');
                li.className = "commonItem";
                var day = i + 1;
                if (day <= res.result.signTimes) {

                    li.innerHTML = `
                    <p class="selectedTopString commonTopItem"> ${'第'+day+'天'} </p>
                    <img class="selectedImg" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_signed_jinbi@2x.png">
                    <p class="selectedBottomString commonBottomItem">+${coinList[i]}</p>`
                } else {
                    li.innerHTML = `
                    <p class="unselectedTopString commonTopItem"> ${'第'+day+'天'} </p>        
                    <img class="unselectedImg" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_jinbi_gray@2x.png">        
                    <p class="unselectedBottomString commonBottomItem">+${coinList[i]}</p>`
                }
                ul.appendChild(li);
            }
        }
    });
}

// 日常任务
function fetchDailyData() {
    $.ajax({
        type: 'post',
        data: {
    
            userId: userId,
            appId: appId
        },
        url: url + '/app/interest/task/daily_task',
        success: function (res) {

            if (res.code != 0) {
                alert(res.msg);
                return;
            }
            var dailyTaskSection = document.getElementById('dailyTaskSection');
            var headerSectionTemplate = `
            <div class="sectionHeaderBG" onclick="collapseAllAction(this)">
            <div class="sectionTitleBG">
            <img class="sectionLeftIcom" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_daily_person@2x.png">
            <p class="sectionLeftTitle">${res.result.content}</p>
            </div>
            <img class="sectionArrowIcon" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_task_jiantou2@2x.png" />
            </div>
            `
            var ul = document.createElement('ul');
            ul.className = 'mui-table-view';
            var tasks = res.result.taskList;
            for (var i = 0; i < tasks.length; i++) {

                var model = tasks[i];
                var li = document.createElement('li');
                li.className = 'mui-table-view-cell mui-collapse';
                var sectionRightBg = document.createElement('div');
                sectionRightBg.className = 'sectionRightBg';
                console.log('jb', model.awardUnit);
                if (!model.awardUnit.match('金币')) {
                    sectionRightBgTemplate = `
                    <p class="collapseSectionRightCommonTitle redRightTitle">+<span class="collapseSectionRightCommonTitle redRightTitle">${model.awardCount}${model.awardUnit}</span>
                    </p>
                    <img class="collapseSectionHongbaoIcon" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_daily_hongbao@2x.png">
                    <img class="collapseSectionArrow" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_task_jiantou2@2x.png">
                    `
                } else {
                    sectionRightBgTemplate = `
                    <p class="collapseSectionRightCommonTitle">+<span class="collapseSectionRightCommonTitle">${model.awardCount}</span>
                    </p>
                    <img class="collapseSectionYellowIcon" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_daily_gold@2x.png">
                    <img class="collapseSectionArrow" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_task_jiantou2@2x.png">
                    `
                }
                sectionRightBg.innerHTML = sectionRightBgTemplate;
                var rowTemplate
                if (i == tasks.length - 1) {
                    // 最后一个 隐藏线
                    rowTemplate = `
                    <div class="collapseSectionBG hideLine" onclick="didClickCell(this)" id = "${model.taskName}">
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
                } else {
                    rowTemplate = `
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
                }

                li.innerHTML = rowTemplate;
                ul.appendChild(li);
            }
            dailyTaskSection.innerHTML = headerSectionTemplate;
            dailyTaskSection.appendChild(ul);
        }
    });
}

// 新手任务
function fetchNewbieData() {

    $.ajax({
        type: 'post',
        data: {
    
            userId: userId,
            appId: appId
        },
        url: url + '/app/interest/task/newbie_task',
        success: function (res) {
            if (res.code != 0) {
                alert(res.msg);
                return;
            }
            var array = res.result.taskList;
            var noobSection = document.getElementById('noobTaskSection');
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
                if (task.taskName.match('新手阅读奖励') && task.taskTip == 0) {
                    var li = document.createElement('li');
                    li.className = 'mui-table-view-cell mui-collapse';
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
                                    <img class="IsSignRightIcon" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/signRowIconGray@2x.png">
                                    <img class="isDoneSignIcon" src="http://yun1.janesi.net/web-test/zhiquFuli/icon//welfare_finish@2x.png">
                                </div>
                            </div>`
                        } else {
                            template = `
                            <div class="signRow">
                            <p class="rowCommonLeft">${model.content}</p>
                            <div class="SignRight">
    
                                <p class="commonRight">+<span class="commonRight">${model.awardCount}</span>
                                </p>
                                <img class="IsSignRightIcon" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/signRowIconYellow@2x.png">
                            </div>
                        </div>`
                        }
                        taskLi.innerHTML = template;
                        taskUl.appendChild(taskLi);
                    }
                    var showline = false;
                    if (array.length > 1) {
                        var codeTask = array[1];
                        showline = codeTask.taskTip=='0';
                    }
                    var row;

                        if (showline) {

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
                        <img class="collapseSectionYellowIcon" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_daily_gold@2x.png">
                        <img class="collapseSectionArrow" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_task_jiantou2@2x.png">
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
                        } else {
                            row = `<div class="collapseSectionBG hideLine" onclick="didClickCell(this)" id = "新手阅读奖励">
                        <div class="collapseSectionLeftBg">
                        <div class="noobSection2LeftLine">
                        <div class="noobSectionCircle"></div>
                        </div>
                        <p class="sectionCommonLeftTitle">新手阅读奖励</p> 
                        </div> 
                        <dic class="sectionRightBg">
                        <p class="collapseSectionRightCommonTitle">+<span class="collapseSectionRightCommonTitle">${task.awardCount}</span>
                        </p>
                        <img class="collapseSectionYellowIcon" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_daily_gold@2x.png">
                        <img class="collapseSectionArrow" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_task_jiantou2@2x.png">
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
                        }
                    li.innerHTML = row;
                    ul.appendChild(li);
                }
                if (task.taskName.match('输入邀请码') && task.taskTip == 0) {
                    var li = document.createElement('li');
                    li.className = 'mui-table-view-cell mui-collapse';
                    var template = `<div class="collapseSectionBG hideLine" onclick="didClickCell(this)"welfareCenter.html id ="输入邀请码">
                    <div class="collapseSectionLeftBg">
                        <div class="noobSection2LeftLine">
                            <div class="noobSectionCircle"></div>
                        </div>
                        <p class="sectionCommonLeftTitle">${task.taskName}</p>
                    </div>
                    <dic class="sectionRightBg">
    
                        <p class="collapseSectionRightCommonTitle redRightTitle">+<span class="collapseSectionRightCommonTitle redRightTitle">0.5${task.awardUnit}</span>
                        </p>
                        <img class="collapseSectionHongbaoIcon" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_daily_hongbao@2x.png">
                        <img class="collapseSectionArrow" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_task_jiantou2@2x.png">
                    </dic>
                </div>
                <div class="mui-collapse-content">
                    <div class="rightBtnRowBg">
                        <p class="rightBtnRowBgLeftTitle">找个师父，输入师父邀请码可获得奖励</p>
                        <div class="rightBtn ${task.taskName}" onclick='didClickRowBtnAction(this)'source>去输入</div>
                    </div>
                </div>`
                    li.innerHTML = template;
                    ul.appendChild(li);
                }
            }

            var temp = ` <div class="sectionHeaderBG"  onclick="collapseAllAction(this)">
    
            <div class="sectionTitleBG">
                <img class="sectionLeftIcom" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_daily_person@2x.png">
                <p class="sectionLeftTitle">新手任务</p>
            </div>
            <img class="sectionArrowIcon" src="http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_task_jiantou2@2x.png" />
        </div>`
            noobSection.innerHTML = temp;
            noobSection.appendChild(ul);
        }
    })
}

function collapseAllAction(section) {

    var img = section.childNodes[3];
    console.log('section', img.src);
    if (img.src.match('welfare_task_jiantou2@2x.png')) {

        img.src = 'http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_task_jiantou@2x.png';
    } else {
        img.src = 'http://yun1.janesi.net/web-test/zhiquFuli/icon/welfare_task_jiantou2@2x.png';
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

// 点击签到
function clickSignAction() {

    $.ajax({
        type: 'post',
        data: {
    
            userId: userId,
            appId: appId
        },
        url: url + '/api/ucs/sign/checkout',
        success: function (res) {

            fetchSignData();
            window.android.signSuccess();
        }
    });
}

//点击任务按钮事件
function didClickRowBtnAction(key) {

    var keyName = key.classList[1];
    console.log(keyName)
    if (keyName == '输入邀请码') {
        window.android.welfareTaskAndroid("inviteCode");

    } else if (keyName == '邀请收徒，现金可提现') {
        window.android.welfareTaskAndroid("acceptDisciple");

    } else if (keyName == '阅读资讯') {
        window.android.welfareTaskAndroid("read");

    } else if (keyName == '分享资讯') {
        window.android.welfareTaskAndroid("share");

    } else if (keyName == '精彩评论') {
        window.android.welfareTaskAndroid("comment");

    } else if (keyName == '阅读推送资讯') {
        window.android.welfareTaskAndroid("sample");

    }
}

//点击中间banner 事件   进入师徒页面

function clickBannerAction() {
    window.android.PupilLinkAndroid(linkPupil);
}

//原生触发 刷新请求
function reloadData() {

    fetchDailyData();
    fetchNewbieData();
    fetchSignData();

}