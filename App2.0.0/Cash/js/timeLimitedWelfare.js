var scrollTimes = 0 // 跑马灯加载数据的次数
var intervalId = null // 计时器

//  itemId地址栏获取
function getRequest() {
  var url = location.href; //获取整个地址栏地址
  var theRequest = new Object()
  if (url.indexOf("?") != -1) {
    var str = url.split('?')[1];//截取？之后的所有参数
    str = str.split("&");  //将每个参数截取放置到数组
    for (var i = 0; i < str.length; i++) {
      theRequest[str[i].split("=")[0]] = unescape(str[i].split("=")[1]);//将属性及属性值分别归属到数组
    }
  }
  console.log(theRequest)
  return theRequest
}

window.onload = function () {
  // 全局定义请求地址
  init()
}

function init() {
  var success = '' //true:有资格，false：无资格
  var completeToday = '' //true:今日已活跃，false：今日未活跃
  var residueDays = '' //剩余可提现天数
  var userId = '' //用户id
  var everApply = '' //是否提现过（1：提现过，0：未提现）
  var readCount = '' //当日阅读文章数
  var appVersion = '' // app版本号
  var todayApply = '' // 今日是否提现过
  getUserInfo()
  getUserList()
}

// 获取用户信息
function getUserInfo() {
  var reqApi = '/app/interest/user_wallet/one_apply_info'
  window.JanesiApi.sendApi(reqApi, 'post', {
    'appId': getRequest()['appId'],
    'userId': getRequest()['userId'],
    'appVersion': window.JanesiBridge.isNative ? getRequest()['appVersion'] : '2.2.1',
    // 'appId': appId,
    // 'userId': userId,
  }, function (data) {  
    if (data.code === '0') {
      var res = data.result;
      success = res.success
      completeToday = res.completeToday
      residueDays = res.residueDays
      userId = res.userId
      everApply = res.everApply
      readCount = res.readCount
      appVersion = res.appVersion
      todayApply = res.todayApply
      if (res.everApply !== '0') {
        // 有过提现记录
        document.getElementById("done-process").style.display = "none"
        document.getElementById("undo-process").style.display = "flex"
        document.getElementById("done-process-icon").style.display = "none"
        document.querySelector(".undo-btn").style.lineHeight = "1"
        document.getElementById("done-bottom").style.display = "none"
        document.getElementById("undo-bottom").style.display = "block"
        document.querySelector(".undo-btn").style.lineHeight = "1"

        var daysDom = document.querySelectorAll(".day-box")
        if (residueDays === '5') {
          document.querySelector(".active-line").style.width = '0%'
        } else {
          document.querySelector(".active-line").style.width = (5 - residueDays) / 5 * 100 + '%'
        }
        for (var i in daysDom) {
          if (i < 5 - residueDays) {
            daysDom[i].className += ' active'
          }
        }
      } else {
        // 无提现记录
        document.getElementById("done-process").style.display = "block"
        document.getElementById("undo-process").style.display = "none"
        document.getElementById("done-process-icon").style.display = "inline-block"
        document.querySelector(".undo-btn").style.lineHeight = "1.18rem"
        document.getElementById("done-bottom").style.display = "block"
        document.getElementById("undo-bottom").style.display = "none"
        if (readCount - 5 > 0) {
          readCount = 5
        }
        document.getElementById("now-article").innerHTML = readCount
        document.querySelector(".active-bar").style.width = readCount / 5 * 100 + '%'
      }
    } else {
      alert('网络异常！')
      console.log(data.msg)
    }
  })
}

// 获取提现用户列表
function getUserList() {
  var reqApi = '/app/interest/user_wallet/get_apply_flow';
  window.JanesiApi.sendApi(reqApi, 'post', {
    // 'appId': appId,
    // 'userId': userId,
    'num': 50
  }, function (data) {
    var res = data.result
    if (data.code === '0') {
      scrollData = data.result
      var tpl = ''
      var listHtml = document.createElement("ul")
      listHtml.setAttribute("class", "scroll-item-list")
      tpl = '<li class="scroll-item"><span class="item-img"><img src="' + (scrollData[scrollTimes].avator === null ? '../images/defaultUserImg.png' : scrollData[scrollTimes].avator) + '">' +
        '</span><span class="item-name"><span class="item-name-box">' + scrollData[scrollTimes].nickName + '</span><span class="item-money-box">提现' + scrollData[scrollTimes].amount.substring(0, scrollData[scrollTimes].amount.length - 3) + '元</span></span></li>'
      listHtml.innerHTML = tpl
      document.querySelector(".scroll-list").appendChild(listHtml)
      scrollTimes++
      creatScrollList(scrollData)
    } else {
      console.log(data.msg)
    }
  })
}

// 历史提现
function creatScrollList(scrollData) {
  intervalId = setInterval(function () {
    var tpl = ''
    var listHtml = document.querySelector(".scroll-item-list")
    tpl = '<li class="scroll-item"><span class="item-img"><img src="' + (scrollData[scrollTimes].avator === null ? '../images/defaultUserImg.png' : scrollData[scrollTimes].avator) + '">' +
      '</span><span class="item-name"><span class="item-name-box">' + scrollData[scrollTimes].nickName + '</span><span class="item-money-box">提现' + scrollData[scrollTimes].amount.substring(0, scrollData[scrollTimes].amount.length - 3) + '元</span></span></li>'
    listHtml.innerHTML = tpl
    document.querySelector(".scroll-list").appendChild(listHtml)
    scrollTimes++
    console.log(scrollTimes)
    if (scrollTimes === 50) {
      scrollTimes = 0
    }
  }, 2000)
}

// 去阅读
function toRead() {
  window.JanesiBridge.callNative('open', {
    'page': 'homePage'
  })
}

//提现
function getCash() {
  if (!window.JanesiApi.isNative) {
    document.getElementById("cover").style.display = "block"
    document.getElementById("cover-tips").style.display = "block"
    document.querySelector(".done-modal-title").style.display = "none"
    document.querySelector(".done-modal-content").style.display = "none"
    document.querySelector(".undo-modal-title").style.display = "none"
    document.querySelector(".undo-modal-content").style.display = "none"
    document.querySelector(".low-modal-title").style.display = "block"
    document.querySelector(".low-modal-content").style.display = "block"
    document.getElementById("close-modal").style.display = "block"
  } else if (todayApply === '0') { // 今日未提现
    document.getElementById("cover").style.display = "block"
    document.getElementById("cover-tips").style.display = "block"
    if (everApply !== '0') { // 提现过
      if (residueDays !== '0') {
        // 阅读未满5天
        document.querySelector(".done-modal-title").style.display = "none"
        document.querySelector(".done-modal-content").style.display = "none"
        document.querySelector(".undo-modal-title").style.display = "block"
        if (parseInt(residueDays) >= 2 && completeToday !== true) {
          document.querySelector(".undo-modal-title span").innerHTML = "&nbsp;" + (residueDays - 1) + "天&nbsp;"
        } else {
          document.querySelector(".undo-modal-title span").innerHTML = "&nbsp;" + residueDays + "天&nbsp;"
        }

        document.querySelector(".undo-modal-content").style.display = "block"
        document.getElementById("close-modal").style.display = "block"
        document.querySelector(".low-modal-title").style.display = "none"
        document.querySelector(".low-modal-content").style.display = "none"
      } else {
        // 阅读满5天
        window.JanesiBridge.callNative('open', {
          "page": 'app_withdrawCash',
          "money": '1'
        })
        closeModal()
      }
    } else if (everApply === '0') { // 未提现过
      if (readCount < 5) {
        // 阅读未满5篇文章
        document.querySelector(".done-modal-title").style.display = "block"
        document.querySelector(".done-modal-title span").innerHTML = "&nbsp;" + (5 - readCount) + "篇文章&nbsp;"
        document.querySelector(".done-modal-content").style.display = "block"
        document.querySelector(".undo-modal-title").style.display = "none"
        document.querySelector(".undo-modal-content").style.display = "none"
        document.getElementById("modal-to-read").style.display = "block"
        document.querySelector(".low-modal-title").style.display = "none"
        document.querySelector(".low-modal-content").style.display = "none"
      } else {
        // 阅读满5篇文章
        window.JanesiBridge.callNative('open', {
          "page": 'app_withdrawCash',
          "money": '1'
        })
        closeModal()
      }
    }
  } else { // 今日已提现过
    document.querySelector(".tips").className = 'tips active'
    var clock = setTimeout(function () {
      document.querySelector(".tips").className = 'tips'
    }, 5000)
  }

}

// 关闭modal
function closeModal() {
  document.getElementById("cover").style.display = "none"
  document.getElementById("cover-tips").style.display = "none"
  document.querySelector(".done-modal-title").style.display = "none"
  document.querySelector(".done-modal-content").style.display = "none"
  document.querySelector(".undo-modal-title").style.display = "none"
  document.querySelector(".undo-modal-content").style.display = "none"
  document.getElementById("modal-to-read").style.display = "none"
  document.getElementById("close-modal").style.display = "none"
}