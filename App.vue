<script>
import Vue from 'vue'
import newhost from 'host.js';
import request from 'common/request.js';
export default {
	data: {
		host: newhost.host,
		programsId: newhost.programsId,
		dologin: false,
		userInfo: null,
		imgHost: newhost.imgHost,
		access_token: false,  //带有微信手机号的token
		wx_token: false,  //带有微信openid的token
		members_id: false,
		version: newhost.version
	},

	onLaunch: function(options) {
		console.log("获取到的用户信息是",this.userInfo)
		this.globalData.userInfo = this.userInfo;
		this.globalData.programsId = this.programsId;
		this.globalData.dologin = this.dologin;
		this.globalData.imgHost = this.imgHost;
		this.globalData.version = this.version;
		this.globalData.host = this.host;
		this.globalData.members_id = this.members_id;
		this.globalData.access_token = this.access_token;
		this.globalData.wx_token = this.wx_token;
		Vue.prototype.clientType = function(){
			let c = 1; //默认为电脑
			// #ifdef APP-PLUS
			switch(uni.getSystemInfoSync().platform){
			    case 'android':
			        c = 3;
					break;
			    case 'ios':
			        c = 4;
					break;
				default:
					
			}
			// #endif	
			
			// #ifdef h5
			c = 2;
			// #endif	
			
			// #ifdef MP-WEIXIN
			c = 5;
			// #endif
			return  c
		}
		
		uni.getSystemInfo({
			success: function(e) {
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				};
				// #endif
		
				// #ifdef MP-WEIXIN
				Vue.prototype.StatusBar = e.statusBarHeight;
				let custom = wx.getMenuButtonBoundingClientRect();
				Vue.prototype.Custom = custom;
				Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				// #endif		
		
				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = e.statusBarHeight;
				Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
			}
		})
		
		//关闭页面
		Vue.prototype.closePage=function(){
			console.log(getCurrentPages());
			if(getCurrentPages().length>1){
				uni.navigateBack();
			}else{
				// #ifdef H5
				history.back()
				// #endif
				// #ifndef H5
				uni.reLaunch({
				    url: '/pages/index/index'
				});
				// #endif
				
			}
		}
		
	},
	onShow: function(options) {
		console.log('App Show', options);
		console.log('获取到的配置信息是', newhost.host);
	},
	methods: {
		//获取路由地址
		getNetAddresss: function(action) {
			this.getExtJson();
			let host = this.globalData.host;
			let programsId = this.globalData.programsId;
			let wx_token = this.getWxToken();
			let access_token = this.getAccessToken();
			let store_token = this.getStoreToken();
			let members_id = this.getStorage('members_id');
			let url = host + '/' + action + '?platform_id=' + programsId + '&wx_token=' + wx_token + '&store_token=' + store_token + '&members_id=' + members_id + '&access_token=' + access_token;
			console.log('APP____URL:::', url);
			return url;
			// return host + '/' + action;
		},
		//获取登录token 带有微信openid的token
		getWxToken: function() {
			var value = uni.getStorageSync('wx_token');
			if (value) {
				return value;
			} else {
				return 0;
			}
		},
		//获取access_token 带有微信手机号的token
		getAccessToken:function(){
			var value = uni.getStorageSync('access_token');
			if (value) {
				console.log('同步登录access_token', value);
				return value;
			} else {
				console.log('access_token失败');
				return 0;
			}
		},
		//获取store_token 带有门店信息的token
		getStoreToken:function(){
			var value = uni.getStorageSync('store_token');
			if (value) {
				console.log('store_token', value);
				this.dologin = true;
				this.globalData.dologin = true;
				return value;
			} else {
				console.log('store_token失败');
				return 0;
			}
		},
		//获取缓存信息
		getStorage:function(mark){
			var value = uni.getStorageSync(mark);
			if (value) {
				console.log('获取缓存信息', value);
				return value;
			} else {
				console.log('获取缓存信息失败',value);
				return 0;
			}
		},
		//获取用户信息
		getUserInfo: function(loginType, cb) {
			var that = this;
			if (this.globalData.userInfo) {
				typeof cb == 'function' && cb(this.globalData.userInfo, true);
				console.log("已经有用户信息了",this.globalData.userInfo)
				uni.navigateTo({
				    url: '/pages/login/login'
				});
				return true;
			} else {
				//1.调用登录接口
				uni.login({
					provider: 'weixin',
					success: function(e) {
						console.log("1.调用登录接口",e);
						if(e.code){
							var code = e.code;
							if(code){
								uni.setStorage({
									key:'wx_code',
									data:code
								})
							}
							that.request().postRequest(that.getNetAddresss('mag/login/index'), {
								'code':code,
							}, {
								'content-type': 'application/x-www-form-urlencoded'
							}).then(res => {
								if (res.code === 1) {
									var result = res.result.wx_token;
									uni.setStorage({
										key:'wx_token',
										data:result
									})
									that.wx_token = result;
									uni.setStorage({
										key:'members_id',
										data:res.result.members_id
									})
									that.members_id = res.result.members_id;
									that.userLogin();
									if(loginType != "getUserInfo:fail auth deny" && loginType != "undefined" && loginType){
										uni.navigateTo({
										    url: '/pages/login/login'
										});
									}
									return true;
								} else {
									uni.showToast({
										title: '温馨提醒：' + res.msg,
										icon: 'none',
										duration: 2000
									})
								}
							})
						}
						return true;
					},
					fail: function(e) {
						console.log('授权登录失败', e);
						uni.showModal({
							title:"授权登录失败",
							content:"因长时间未点击授权允许，授权失败，请重新点击"
						})
						return false;
					}
				});
			}
		},
		//授权用户登录
		userLogin:function(){
			var that = this;
			//2.检查按钮登录是否已过期
			uni.checkSession({
				success: function(c) {
					console.log('没有过期，登录成功', c);
					//3.检查用户设置的授权信息
					uni.getSetting({
						success(res) {
							console.log("检查用户设置的授权信息",res)
							if(res.errMsg == "getSetting:ok"){
								that.loginAuth();
							}else{
								uni.showModal({
									title:'温馨提示',
									content:'请允许用户信息授权!',
									showCancel:false
								})
								uni.authorize({
								    scope: 'scope.userInfo',
								    success(a) {
										that.loginAuth();
								    }
								})
							}
							return;
						},
						fail:function(res){
							console.log("用户授权信息获取失败",res)
							uni.showModal({
								title:'温馨提示',
								content:'请允许用户信息授权',
								showCancel:false
							})
						}
					});
				},
				fail: function(c) {
					console.log('已经过期，登录失败', c);
					uni.showModal({
						title:"登录超时失败",
						content:"因长时间未点击授权允许，授权失败，请重新点击",
						showCancel:false
					})
					return false;
				}
			});
		},
		loginAuth:function(){
			var that = this;
			//4.获取登录微信的信息
			uni.getUserInfo({
				provider: 'weixin',
				lang:"zh_CN",
				withCredentials: true,
				success: function(res) {
					console.log('获取用户信息成功', res);
					that.userInfo = res.userInfo;
					that.globalData.userInfo = res.userInfo;
					uni.setStorageSync('userInfo', res.userInfo);
					uni.setStorage({
					    key: 'userInfo',
					    data: res.userInfo,
					    success: function () {
					        console.log('用户授权信息保存成功');
					    }
					});
					that.setUserInfo(res.userInfo);
					typeof cb == "function" && cb(that.globalData.userInfo);
					uni.navigateTo({
					    url: '/pages/login/login'
					});
					return true;
				},
				fail: function(u) {
					console.log('获取用户信息失败', u);
					return false;
				}
			});
		},
		//设置用户信息
		setUserInfo:function(userInfo,encryptedData='',iv='',session_key=''){
			var that = this;
			if(userInfo){
				uni.setStorage({
				    key: 'userInfo',
				    data: userInfo,
				    success: function () {
				        console.log('用户授权信息保存成功');
				    }
				});
			}
			var nickName = userInfo.nickName;
			var avatarUrl = userInfo.avatarUrl;
			var gender = userInfo.gender;
			var province = userInfo.province;
			var city = userInfo.city;
			var country = userInfo.country;
			var access_token = that.getAccessToken();
			var wx_token = that.getWxToken();
			var members_id = that.getStorage('members_id');
			var code = that.getStorage('wx_code');
			if(encryptedData && iv){
				that.request().postRequest(that.getNetAddresss('api/login/userInfo'), {
					'members_id': members_id,
					'session_key':session_key,
					'avatarUrl':avatarUrl,
					'gender':gender,
					'province':province,
					'city':city,
					'country':country,
					'encryptedData':encryptedData,
					'iv':iv,
					'code':code,
				}, {
					'content-type': 'application/x-www-form-urlencoded',
					'access_token': access_token,
					'wx_token': wx_token,
				}).then(res => {
					if (res.code === 1) {
						var result = res.result;
						console.log("返回的信息是",result)
						if(result.access_token){
							var mobile = result.phoneNumber;
							uni.setStorage({
								key:'mobile',
								data:mobile
							})
							uni.setStorageSync('mobile',mobile);
							uni.setStorage({
							    key: 'access_token',
							    data: result.access_token,
							});
							return mobile;
						}else{
							return false;
						}
					} else {
						uni.showToast({
							title: '温馨提醒：' + res.msg,
							icon: 'none',
							duration: 2000
						})
						return false;
					}
				})
			}
		},
		//获取开放平台缓存数据
		getExtJson: function() {
			var that = this;
			console.log('getExtConfig', uni.getExtConfig);
			console.log('getExtConfigSync', uni.getExtConfigSync);
			if (uni.getExtConfig || uni.getExtConfigSync) {
				const extConfig = uni.getExtConfigSync ? uni.getExtConfigSync() : {};
				console.log('********extConfig*********', extConfig);
				if (extConfig.host) {
					console.log('================extJson exists===============');
					that.globalData.host = extConfig.host;
					that.globalData.programsId = extConfig.programsId;
					that.globalData.version = extConfig.version;
					console.log('设置version', that.globalData.version);
				} else {
					console.log('================extJson not exists===============');
					uni.getExtConfigSync({
						success: function(res) {
							console.log('================extJson===============', res.extConfig);
							that.globalData.host = res.extConfig.host;
							that.globalData.programsId = res.extConfig.programsId;
							that.globalData.version = res.extConfig.version;
							console.log('设置version', that.globalData.version);
						},
						fail: function(res) {
							console.log('================error.extJson===============', res);
						}
					});
				}
			} else {
				that.globalData.host = newhost.host;
				that.globalData.programsId = newhost.programsId;
				that.globalData.version = newhost.version;
			}
		},
		//网络请求
		request: function() {
			return new request();
		}
	},
	globalData: {
		userInfo: null
	},
	//隐藏卸载页面
	onHide: function(options) {
		console.log('隐藏卸载页面', options);
	}
};
</script>

<style>
/*每个页面公共css */
	@import "/common/iconfont/iconfont.css";
	/* #ifndef APP-PLUS-NVUE */
	@import "/common/main.css";
	/* #endif */
	
	/* 骨架屏方案 */
	.Skeleton {
		background-color: #f3f3f3;
		padding: 20upx 0;
		border-radius: 6upx;
	}
/**app.wxss**/
page {
	background: #f1f5f8;
	font-size: 32rpx;
	/* height: 100%; */
}
.background {
	width: 100%;
	height: 100%;
	position: fixed;
	background-size: 100% 100%;
	z-index: -1;
}
swiper-item {
	display: flex;
	flex-direction: column;
}
.ContentBackground {
	width: 96%;
	background-color: white;
	margin: 0rpx auto;
	border-radius: 10rpx;
	padding-bottom: 50rpx;
	padding-top: 10rpx;
	box-shadow: 0 0.05rem 0.5rem 0.25rem rgba(80, 136, 230, 0.1);
}
.swiper-tab {
	width: 100%;
	text-align: center;
	height: 88rpx;
	line-height: 88rpx;
	display: flex;
	flex-flow: row;
	justify-content: space-between;
	background-color: #ffffff;
}

.swiper-tab-item {
	width: 30%;
	font-size: 12pt;
	color: #000000;
}
.switch-group {
	flex: 1;
	display: flex;
}

.swtich-label {
	margin-right: 30rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
.active {
	color: #09bb07;
	border-bottom: 5rpx solid #09bb07;
}

/* 幻灯片 */
.slide {
	width: 93%;
	margin: 0rpx auto;
	border-radius: 10rpx;
}

.swiper-wrapper .swiper-item-wrapper {
	height: 100%;
}
.swiper-wrapper .swiper-item-wrapper image {
	width: 100%;
	height: 100%;
}
.swiper-wrapper .swiper-item-wrapper {
	height: 100%;
}

.swiper-wrapper .swiper-item-wrapper image {
	width: 100%;
	height: 100%;
}

.container {
	height: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
	/* padding: 200rpx 0; */
	box-sizing: border-box;
}
.foot {
	display: flex;
	justify-content: center;
}
.copyright {
	font-size: 28rpx;
	color: #999;
	bottom: 0;
	left: 0;
	right: 0;
	padding: 28rpx;
	text-align: center;
}

button {
	width: 97%;
	height: 3.5rem;
	line-height: 3.5rem;
	/* margin: 20rpx; */
}

.btn1 {
	margin-top: 20rpx;
	height: 3.5rem;
	line-height: 3.5rem;
	background-color: rgb(0, 148, 123);
	color: white;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
}

.btn2 {
	background-color: #69c3aa;
}

.button-hover {
	background-color: #69c3aa;
	opacity: 0.9;
}
.btnImg {
	margin-right: 8rpx;
	width: 46rpx;
	height: 46rpx;
}

.btn1::after {
	border-radius: 8rpx;
	width: 90%;
}

.click_icon {
	padding: 0.5rem;
}

.click_icon image {
	width: 2.5rem;
	height: 2.5rem;
}
</style>
