/**
 * name: api.js
 * description: request处理基础类
 */
class request {
	constructor() {
		this._header = {}
	}

	/**
	 * 设置统一的异常处理
	 */
	setErrorHandler(handler) {
		this._errorHandler = handler;
	}

	/**
	 * GET类型的网络请求
	 */
	getRequest(url, data, header = this._header) {
		return this.requestAll(url, data, header, 'GET')
	}

	/**
	 * DELETE类型的网络请求
	 */
	deleteRequest(url, data, header = this._header) {
		return this.requestAll(url, data, header, 'DELETE')
	}

	/**
	 * PUT类型的网络请求
	 */
	putRequest(url, data, header = this._header) {
		return this.requestAll(url, data, header, 'PUT')
	}

	/**
	 * POST类型的网络请求
	 */
	postRequest(url, data, header = this._header) {
		return this.requestAll(url, data, header, 'POST')
	}
	
	isJSON(str){
	    if (typeof str == 'string') {
	        try {
	            var obj=JSON.parse(str);
	            if(typeof obj == 'object' && obj ){
	                return true;
	            }else{
	                return false;
	            }
	        } catch(e) {
	            console.log('error：'+str+'!!!'+e);
	            return false;
	        }
	    }else{
			return false;
		}
	}
	/**
	 * 网络请求
	 */
	requestAll(url, data, header, method) {
		return new Promise((resolve, reject) => {
			uni.showLoading({
				title: "加载中，请稍候！"
			})
			console.log(url + '请求url请求的数据为', data);
			uni.request({
				url: url,
				data: data,
				header: header,
				method: method,
				success: (res => {
					uni.showLoading({
						title: "加载成功！正在渲染显示……"
					})
					console.log(url + '请求url访问到的数据为', res.data);
					if (res.data) {
						//200: 服务端业务处理正常结束
						resolve(res.data)
					} else {
						//其它错误，提示用户错误信息
						if (this._errorHandler != null) {
							//如果有统一的异常处理，就先调用统一异常处理函数对异常进行处理
							this._errorHandler(res)
						}
						reject(res.data)
					}
					uni.hideLoading()
				}),
				fail: (res => {
					console.log(res)
					uni.hideLoading()
					if (res.errMsg !== "request:fail ") {
						var msg = res.data.msg;
					} else {
						var msg = "网络错误，请打开流量进行尝试！";
					}
					if(msg != "系统wx_token不能为空"){
						uni.showModal({
							title: '温馨提示',
							content: msg,
						})
					}
					if (this._errorHandler != null) {
						this._errorHandler(res)
					}
					reject(res)
				})
			})
		}).catch((e) => console.log('promise catch err',e)); //捕获异常
	}
}

export default request
