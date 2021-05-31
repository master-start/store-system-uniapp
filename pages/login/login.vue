<template>
	<view class="content">
		<block v-if="authCode">
			<view class="siteName">
				{{siteName}}
			</view>
		</block>
		<view class="login-input">
			<block v-if="authCode">
				<form @submit="formSubmit" @reset="formReset">
					<view class="list">
						<input type="number" name="mobile" maxlength="11"  placeholder="请输入手机号" />
					</view>
					<view class="list">
						<input type="password" name="code" @input="onKeyInput" maxlength="-1"  placeholder="请输入验证码" />
					</view>
					<view class="list">
						<button type="primary" :disabled="disabled" @click="getVerify" form-type="submit"> {{buttonName}} </button>
					</view>
				</form>
			</block>
			<block v-else>
				<view class="list">
					<view class="logo">
						<image :src="iconUrl + 'images/common/logo.png'"></image>
					</view>
				</view>
				<view class="list">
					<button type="primary" open-type="getPhoneNumber" @getphonenumber="getphonenumber"> 微信用户一键登录 </button>
				</view>
			</block>
			<view class="login-menu">
				<view class="left">
					<block v-if="!authCode">
						<text @click="verifyLogin">验证码登陆</text>
					</block>
					<block v-else>
						<text @click="verifyLogin">微信授权登陆</text>
					</block>
				</view>
				<view class="right">
					<button class='button' open-type="feedback">
						<text class="button_title">问题反馈</text>
					</button>
				</view>
			</view>
		</view>
		<view class="login-other">
			
			<view>
				<button class='button' open-type="getPhoneNumber" @getphonenumber="getphonenumber">
				<image :src="iconUrl + 'images/common/weixin.png'"></image>
				</button>
			</view>
			
			<view>
				<image @click="checkMsg" :src="iconUrl + 'images/common/weibo.png'"></image>
			</view>
			
			<view>
				<image @click="checkMsg" :src="iconUrl + 'images/common/qq.png'"></image>
			</view>
			
		</view>
		<!-- 底部导航组件 -->
		<foot :footCopyRightTime="footCopyRightTime" :footVersion="footVersion"></foot>
		<chunLei-modal v-model="modelValue"
		:mData="selectData"
		maskEnable = "false"
		:titleMsg = "titleMsg"
		type="select"
		@onConfirm="onConfirm"
		@cancel="cancel"
		:navHeight="0"
		>
		</chunLei-modal>
		
	</view>
</template>

<script>
	import foot from "../../components/foot.vue"
	import TabMask from '@/components/chunLei-modal/chunLei-modal.vue'
	const app = getApp();
	const globalData = app.globalData;
	const imgHost = globalData.imgHost;
	export default {
		data() {
			return {
				siteName:"欢迎登陆门店管理助手",
				selectData:[{title:'请选择门店进行登录'},{title:'从照片选择'}],
				titleMsg:'请选择登录的门店',
				modelValue:false,
				iconUrl: globalData.imgHost,
				authCode:false,
				footCopyRightTime: 2010,
				footVersion:'v' + globalData.version,
				buttonName:'点击获取验证码',
				buttonStatus:0,
				disabled:false
			};
		},
		components: {
			foot,TabMask
		},
		methods:{
			//选择确认需要登录的门店
			onConfirm:function(e){
				console.log("弹窗的选择",e)
				var that = this;
				var mobile = e.mobile;
				var code = e.code;
				var Id = e.Id;
				var BrandId = e.BrandId;
				var StoreId = e.StoreId;
				app.request().postRequest(app.getNetAddresss('mag/login/verifyCodeLogin'), {
					'mobile': mobile,
					'code': code,
					'Id': Id,
					'BrandId': BrandId,
					'StoreId': StoreId,
				}, {
					'content-type': 'application/x-www-form-urlencoded',
				}).then(res => {
					if (res.code == 1) {
						//登录成功
						uni.setStorage({
							key:'StoreId',
							data:res.result.StoreId
						})
						uni.setStorage({
							key:'BrandId',
							data:res.result.BrandId
						})
						uni.setStorage({
							key:'ManagerId',
							data:res.result.ManagerId
						})
						uni.setStorage({
							key:'StoreMobile',
							data:res.result.StoreMobile
						})
						uni.setStorage({
							key:'store_token',
							data:res.result.store_token
						})
						uni.showModal({
							title:'温馨提示',
							content:'恭喜您登录成功了！',
							showCancel:false,
							success() {
								globalData.dologin = true;
								uni.switchTab({
									url:"/pages/manager/manager?mobile=" + mobile
								})
							}
						})
					}else{
						//验证码获取失败，提示请重新获取验证码
						that.buttonStyle(2);
						// that.buttonStyle(1,'验证码已发送'); //开发使用
						// that.sendCode(); //开发使用
						uni.showModal({
							title:'登录失败，请重新进行登录！',
							content:res.msg,
							showCancel:false
						})
					}
				})
			},
			checkMsg:function(){
				uni.showToast({
					title:'暂不支持！',
					duration:2000,
					icon:Error
				})
			},
			//验证码登录提交
			formSubmit:function(e){
				console.log('form发生了submit事件，携带数据为：',e.detail)
				var mobile = e.detail.value.mobile;
				var code = e.detail.value.code;
				if(mobile==undefined || !mobile){
					console.log(mobile)
					uni.showModal({
						title:'验证提示',
						content:'请输入手机号',
						showCancel:false
					})
					return;
				}
				var that = this;
				var buttonStatus = that.buttonStatus;
				if(buttonStatus == 0 || !code){
					//获取验证码
					that.getVerifyCode(mobile);
					return;
				}else if(buttonStatus == 1){
					//验证码倒计时
					that.sendCode();
					return;
				}else{
					//登陆按钮
					if(!code){
						uni.showModal({
							title:'错误提示',
							content:'验证码不能为空',
							showCancel:false
						})
						return;
					}
					that.managerLogin(mobile,code);
				}
			},
			//验证码登录
			managerLogin:function(mobile,code=''){
				var that = this;
				var data = {};
				var url = 'mag/login/verifyCodeLogin';
				if(code){
					data = {
						'mobile': mobile,
						'code': code,
					};
				}else{
					data = {
						'mobile': mobile
					};
				}
				app.request().postRequest(app.getNetAddresss(url),data,{
					'content-type': 'application/x-www-form-urlencoded',
				}).then(res => {
					console.log("登录提示",res);
					if (res.code == 1) {
						//登录成功
						uni.setStorage({
							key:'StoreId',
							data:res.result.StoreId
						})
						uni.setStorage({
							key:'BrandId',
							data:res.result.BrandId
						})
						uni.setStorage({
							key:'ManagerId',
							data:res.result.ManagerId
						})
						uni.setStorage({
							key:'store_token',
							data:res.result.store_token
						})
						uni.setStorage({
							key:'StoreMobile',
							data:res.result.StoreMobile
						})
						uni.showModal({
							title:'温馨提示',
							content:'恭喜您登录成功了！',
							showCancel:false,
							success() {
								globalData.dologin = true;
								uni.switchTab({
									url:"/pages/manager/manager?mobile=" + res.result.StoreMobile
								})
							}
						})
					}else if(res.code == 2){
						//没有创建门店管理人员 账号，跳转到创建门店管理人员
						uni.reLaunch({
							url:'/store/create/create'
						})
					}else if(res.code == 3){
						//弹出选择需要登录的门店
						that.modelValue = !that.modelValue;
						let data = res.result;
						let i = 0;
						let list = [];
						let resultData = [];
						for(i; i<data.length; i++){
							list = {
								"title" : data[i].has_fy_store.StoreName,
								"StoreId" : data[i].StoreId,
								"BrandId" : data[i].BrandId,
								"Id" : data[i].Id,
								"mobile" : data[i].Mobile,
								"code" : code,
								"content" : data[i].has_fy_store.StoreAddress
							}
							resultData.push(list)
						}
						console.log("返回的类型是",resultData)
						that.selectData = resultData;
					}else{
						//验证码获取失败，提示请重新获取验证码
						that.buttonStyle(2);
						// that.buttonStyle(1,'验证码已发送'); //开发使用
						// that.sendCode(); //开发使用
						uni.showModal({
							title:'登录失败，请重新进行登录！',
							content:res.msg,
							showCancel:false
						})
					}
				})
			},
			//按钮样式刷新
			buttonStyle:function(status,text){
				console.log("样式刷新" + status + text)
				if(status == 0){
					this.buttonStatus = 0
					this.buttonName = '点击获取验证码';
					this.disabled = false;
				}else if(status == 1){
					this.buttonStatus = 1
					this.buttonName = text;
					this.disabled = true;
				}else{
					this.buttonStatus = 2
					this.buttonName = ' 登 录 ';
					this.disabled = false;
				}
				return;
			},
			//输入验证
			onKeyInput: function(event) {
				console.log(this.buttonStatus + "输入的值是",event)
				var value = event.detail.value;
				if(value && value != undefined){
					this.sendCode(2);
					this.buttonStyle(2);
				}
				if(!value || value == undefined){
					var value = event.target.value;
					if(value && value != undefined){
						this.sendCode(2);
						this.buttonStyle(2);
					}else{
						this.buttonStyle(0);
					}
				}
			},
			//获取验证按钮
			getVerify:function(e){
				console.log('form发生了getVerify事件，携带数据为：',e)
			},
			//倒计时
			sendCode:function(e) {
				if (this.buttonStatus == 2) {
					clearInterval(set);
					return;
				}
				let time = 60;
				let that = this;
				let set = setInterval(function() {
					if (that.buttonStatus == 2 || e == 2) {
						clearInterval(set);
						that.buttonStyle(0);
						return;
					}
					that.buttonStyle(1,"(" + --time + ")秒后重新获取");
				}, 1000);
				if(e == 2){
					clearInterval(set);
					return;
				}
				setTimeout(function() {
					that.buttonStyle(0);
					clearInterval(set);
					return;
				}, 60000);
			},
			//获取验证码
			getVerifyCode:function(mobile){
				var that = this;
				var access_token = uni.getStorageSync('access_token'); //获取access_token 带有微信手机号的token
				var wx_token = uni.getStorageSync('wx_token'); //获取登录token 带有微信openid的token
				var members_id = uni.getStorageSync('members_id');
				app.request().postRequest(app.getNetAddresss('mag/login/getVerifyCode'), {
					'members_id': members_id,
					'access_token': access_token,
					'mobile': mobile,
					'wx_token': wx_token
				}, {
					'content-type': 'application/x-www-form-urlencoded',
					'access_token': access_token,
					'wx_token': wx_token,
				}).then(res => {
					if (res.code == 1) {
						//验证码获取成功，进行倒计时
						that.buttonStyle(1,'验证码已发送');
						that.sendCode();
						uni.showModal({
							title:'验证码发送提示',
							content:'验证码发送成功！',
							showCancel:false
						})
					}else{
						//验证码获取失败，提示请重新获取验证码
						that.buttonStyle(0);
						// that.buttonStyle(1,'验证码已发送'); //开发使用
						// that.sendCode(); //开发使用
						uni.showModal({
							title:'验证码发送提示',
							content:res.msg,
							showCancel:false
						})
					}
				})
			},
			//验证码登陆
			verifyLogin:function(){
				console.log(this.authCode)
				if(!this.authCode){
					this.authCode = true;
				}else{
					this.authCode = false;
				}
			},
			//回调授权
			getphonenumber:function(e){
				console.log("用户获取手机号回调",e)
				var that = this;
				var errMsg = e.detail.errMsg;
				var mobile = '';
				if(errMsg == "getPhoneNumber:ok"){
					var encryptedData = e.detail.encryptedData;
					var iv = e.detail.iv;
					var userInfo = app.getStorage('userInfo');
					app.setUserInfo(userInfo,encryptedData,iv);
					mobile = that.setUserInfo(userInfo,encryptedData,iv);
					console.log("授权返回的信息是",mobile)
					
				}else{
					uni.showModal({
						title:"授权提示",
						content:"请点击允许授权，才能使用本软件哦！",
						showCancel:false
					})
				}
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
				var code = app.getStorage('wx_code');
				if(encryptedData && iv){
					app.request().postRequest(app.getNetAddresss('api/login/userInfo'), {
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
						'content-type': 'application/x-www-form-urlencoded'
					}).then(res => {
						if (res.code === 1) {
							var result = res.result;
							console.log("返回的信息是",result)
							if(result.access_token){
								var mobile = result.phoneNumber;
								if(mobile){
									uni.setStorage({
										key:'mobile',
										data:mobile
									})
									uni.setStorageSync('mobile',mobile);
									uni.setStorage({
									    key: 'access_token',
									    data: result.access_token,
									});
									that.managerLogin(mobile);
								}else{
									uni.showModal({
										title:"授权提示",
										content:"网络错误，授权失败，请重新点击授权！",
										showCancel:false
									})
								}
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
			
		}
	}
</script>

<style lang="scss">
	.button {
	 border: none;
	 text-align: right;
	 margin: 0;
	 border-radius: 0;
	 background: #f1f5f8;
	 padding: 0;
	 overflow:visible;
	}
	 
	.button::after {
	 border: none;
	 border-radius: 0;
	}
	 
	.button_title {
	 color: #09BB07;
	}

	.content{
		width: 80%;
		margin: 0 auto;
	}
	.siteName{
		margin: 80rpx auto;
		font-size: 46rpx;
	}
	.login-input{
		line-height: 100rpx;
	}
	.login-input .list{
		line-height: 150rpx;
		margin-top: 50rpx;
	}
	.login-input .list .logo{
		width: 80%;
		text-align: center;
		margin: 0 auto;
	}
	.login-input .list image{
		width: 350rpx;
		height: 350rpx;
	}
	.login-input input{
		border-bottom: solid 1rpx #808080;
		height: 60rpx;
		line-height: 60rpx;
		font-size: 36rpx;
		padding: 20rpx;
	}
	.login-input button{
		width: 100%;
	}
	.login-menu{
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		padding: 10rpx;
		color: #09BB07;
	}
	.login-menu .left{
		line-height: 3.5rem;
		height: 3.5rem;
		font-size: 18px;
	}
	.login-other{
		margin: 50rpx auto;
		width: 70%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		padding: 10rpx;
	}
	.login-other image{
		width: 80rpx;
		height: 80rpx;
	}
</style>
