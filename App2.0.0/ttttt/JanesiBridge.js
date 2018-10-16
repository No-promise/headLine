(function (window) {

	function JanesiBridge() {

		this._init();
	}

	JanesiBridge.prototype = {

		_init: function (options) {

			var userAgentInfo = navigator.userAgent; 
			var isAndroid = userAgentInfo.indexOf('Android') > -1 || userAgentInfo.indexOf('Linux') > -1;
			var isiOS = userAgentInfo.indexOf('iPhone') > -1;
			var Agents = ["Android", "iPhone",
				"SymbianOS", "Windows Phone",
				"iPad", "iPod"
			];
			var isPc = true;
			for (var v = 0; v < Agents.length; v++) {
				if (userAgentInfo.indexOf(Agents[v]) > 0) {
					isPc = false;
					break;
				}
			}
			this.isPc = isPc;
			this.isAndroid = isAndroid;
			this.isiOS = isiOS;
			this.eventCallBackMap = {};
			this.tCallId = 0;
		},

		callNative: function (functionName, params) {

			if (this.isPc) {

			} else {

				if (this.isiOS) {
					var name = 'window.webkit.messageHandlers.' + functionName + '.postMessage' + '(' + 'params' + ')';
					eval(name);
				} else {
					var name = 'window.android.' + functionName + '(' + 'params' + ')';
					eval(name);
				}
			}
		},
		callNativeWithCallBack: function (functionName, params, callBack) {

			if (this.isPc) {

			} else {

				var callId = this.getCallId();
				this.eventCallBackMap[callId] = callBack;
				var dic = params;
				dic.callId = callId;
				dic.action = functionName;
				var tParams = JSON.stringify(dic);
				if (this.isiOS) {
					var name = 'window.webkit.messageHandlers.' + functionName + '.postMessage' + '(' + 'tParams' + ')';
					eval(name);
				} else {
					var name = 'window.android.' + functionName + '(' + 'tParams' + ')';
					eval(name);
				}
			}
		},
commonNativeCallJS:function(params){


},
		getCallId: function () {

			var tId = this.tCallId++;
			return tId;
		},
	}
	var jb = new JanesiBridge();
	window.JanesiBridge = jb;
})(window)

function nativeCallBack(callId, result) {

	var func = window.JanesiBridge.eventCallBackMap[callId];
	func(result);
}

function nativeCallJS(params) {

	window.JanesiBridge.commonNativeCallJS(params);
}