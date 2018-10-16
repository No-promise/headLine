(function (window) {

	function JanesiApi() {

		this._init();
	}

	JanesiApi.prototype = {

		_init: function (options) {

			var userAgentInfo = navigator.userAgent;
			var isNative = userAgentInfo.indexOf('js_nativeApp') > -1;
			var isAndroid = userAgentInfo.indexOf('Android') > -1 || userAgentInfo.indexOf('Linux') > -1;
			var isiOS = userAgentInfo.indexOf('iPhone') > -1;
			var Agents = ["Android", "iPhone",
				"SymbianOS", "Windows Phone",
				"iPad", "iPod"
			];
			this.isAndroid = isAndroid;
			this.isiOS = isiOS;
			this.isNative = isNative;
			this.apiCallBackMap = {};
			this.tCallId = 0;
			this.reqUrl = 'http://118.25.10.151:8090';
		},

		sendApi: function (api, type, params, callBack) {

			var callId = this.getCallId();
			this.apiCallBackMap[callId] = callBack;
			if (this.isNative) {

				var dic = {
					'api': api,
					'type': type,
					'params': params,
					'callId': callId
				};
				var tParams = JSON.stringify(dic);
				if (this.isiOS) {
					window.webkit.messageHandlers.sendApi.postMessage(tParams);
				} else {
					window.android.sendApi(tParams);
				}
			} else {

				var that = this;
				var reqType = type;
				var reqPath = api;
				$.ajax({
					type: reqType,
					data: params,
					url: this.reqUrl + reqPath,
					success: function (result) {
						var func = that.apiCallBackMap[callId];
						func(result);
					}
				})
			}
		},


		getCallId: function () {

			var tId = this.tCallId++;
			return tId.toString();
		},

	}
	var ja = new JanesiApi();
	window.JanesiApi = ja;
})(window)

function nativeCallBack(callId, result) {

    var func = window.JanesiApi.apiCallBackMap[callId];
    var res = JSON.parse(result);
    func(res);
}