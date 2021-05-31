<template>
	<view class="container">
		<view class="remind-box" v-if="remind">
			<image class="remind-img" src="../../static/images/more/loading.gif"></image>
		</view>
		<block v-else>
			<image class="title" src="../../static/images/more/title8.png"></image>
			<view class="content">
				<view class="hd" :style="'transform:rotateZ('+angle+'deg)'">
					<!--#ifdef MP-WEIXIN -->
						<view class="logo">
							<open-data type="userAvatarUrl"></open-data>
						</view>
						<view class="userNickName">
							<open-data type="userNickName"></open-data>
						</view>
						<!-- <image class="logo" src="userInfo.avatarUrl"></image> -->
					<!--#endif-->
					<image class="wave" src="../../static/images/more/wave.png" mode="aspectFill"></image>
					<image class="wave wave-bg" src="../../static/images/more/wave.png" mode="aspectFill"></image>
					
				</view>
				<view class="bd">
					<image class="smalltitle" src="../../static/images/more/confirm-word1.png"></image>
					<view class="confirm-btn" @click="getCode"><text>立刻使用</text></view>
					<text class="copyright"> @ 门店记账助手 版权所有 </text>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	const app = getApp();
	const globalData = app.globalData;
	const imgHost = globalData.imgHost;
	export default {
		data() {
			return {
				remind: '加载中',
				angle: 0,
				userInfo: {}
			};
		},
		methods: {
			getCode:function(){
				let that = this;
				uni.login({
				  provider: 'weixin',
				  success: function (e) {
					console.log("调用login登录接口",e);
					if(e.code){
						var code = e.code;
						if(code){
							uni.setStorage({
								key:'wx_code',
								data:code
							})
						}
						app.request().postRequest(app.getNetAddresss('mag/login/index'), {
							'code':code,
						}, {
							'content-type': 'application/x-www-form-urlencoded'
						}).then(res => {
							if (res.code === 1) {
								uni.setStorage({
									key:'members_id',
									data:res.result.members_id
								})
								uni.setStorage({
									key:'wx_token',
									data:res.result.wx_token,
									success() {
										that.goToIndex();
									}
								})
							} else {
								uni.showToast({
									title: '温馨提醒：' + res.msg,
									icon: 'none',
									duration: 2000
								})
							}
						})
					}
				  },fail() {
				  	uni.showModal({
				  		title:'温馨提示',
						content:'网络错误，请重新进行尝试',
						showCancel:true
				  	})
				  }
				});
			},
			goToIndex: function() {
				uni.switchTab({
					url: '/pages/index/index',
				});
			},
		},
		onLoad: function() {
			console.log("页面初始化执行一次 onLoad")
			var that = this
			uni.setNavigationBarTitle({
				title: uni.getStorageSync('mallName')
			})
			enablePullDownRefresh:false
		},
		onReady: function() {
			console.log("页面初始化执行一次 onReady")
			var that = this;
			that.angle = 0;
			// setTimeout(function() {
			// 	that.remind = '';
			// }, 1000);
			// uni.onAccelerometerChange(function(res) {
			// 	console.log("初始化页面res的值",res)
			// 	var angle = -(res.x * 30).toFixed(1);
			// 	if (angle > 14) {
			// 		angle = 14;
			// 	} else if (angle < -14) {
			// 		angle = -14;
			// 	}
			// 	if (that.angle !== angle) {
			// 		that.angle = angle;
			// 	}
			// });
		},
		onShow: function() {
			console.log("页面初始化执行一次 onShow")
			let that = this
			let userInfo = uni.getStorageSync('userInfo')
			if (userInfo) {
				this.userInfo = userInfo;
			}
			this.remind = '';
		},
		onHide: function() {
			console.log("页面初始化执行一次 onHide")
		},
		onError: function() {
			console.log('出错了')
		},
		onUnload: function() {
			console.log('页面卸载监听')
		},
		onResize: function() {
			console.log('监听窗口尺寸变化')
		},
		onUniNViewMessage: function() {
			console.log('对nvue页面发送的数据进行监听')
		},
		onReachBottom: function() {
			console.log("页面上拉触底事件的处理函数	")
		},
		onPullDownRefresh: function() {
			console.log("用户执行了下拉动作")
		},
		onPageScroll: function() {
			console.log("监听页面滚动，参数为Object")
		},
		onShareAppMessage: function() {
			console.log("用户点击右上角分享	")
		},
		onTabItemTap: function() {
			console.log("点击 tab 时触发，参数为Object")
		}
	}
</script>

<style>
	/**start.wxss**/
	page {
		font-family: -apple-system-font, Helvetica Neue, Helvetica, sans-serif;
		font-size: 10pt;
		line-height: 150%;
		min-height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;
		align-items: stretch;
	}

	.container {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		background: #69C3AA;
		align-items: stretch;
		padding: 0;
		height: 100%;
		overflow: hidden;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.content {
		flex: 1;
		display: flex;
		position: relative;
		z-index: 10;
		flex-direction: column;
		align-items: stretch;
		justify-content: center;
		width: 100%;
		height: 100%;
		padding-bottom: 450rpx;
		background: -webkit-gradient(linear, left top, left bottom, from(rgba(244, 244, 244, 0)), color-stop(0.1, #f4f4f4), to(#f4f4f4));
		opacity: 0;
		transform: translate3d(0, 100%, 0);
		animation: rise 3s cubic-bezier(0.19, 1, 0.22, 1) .25s forwards;
	}

	.remind-box {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding-bottom: 300rpx;
	}

	.remind-img {
		width: 250rpx;
		height: 250rpx;
		padding-bottom: 25rpx;
	}

	@keyframes rise {
		0% {
			opacity: 0;
			transform: translate3d(0, 100%, 0);
		}

		50% {
			opacity: 1;
		}

		100% {
			opacity: 1;
			transform: translate3d(0, 450rpx, 0);
		}
	}

	.title {
		position: absolute;
		top: 30rpx;
		left: 50%;
		width: 600rpx;
		height: 200rpx;
		margin-left: -300rpx;
		opacity: 0;
		animation: show 2.5s cubic-bezier(0.19, 1, 0.22, 1) .5s forwards;
	}

	.smalltitle {
		position: absolute;
		top: 70rpx;
		left: 53%;
		width: 600rpx;
		height: 200rpx;
		margin-left: -300rpx;
		opacity: 0;
		animation: show 2.5s cubic-bezier(0.19, 1, 0.22, 1) .5s forwards;
	}

	@keyframes show {
		0% {
			opacity: 0;
		}

		100% {
			opacity: .95;
		}
	}

	.hd {
		position: absolute;
		top: 0;
		left: 50%;
		width: 1000rpx;
		margin-left: -500rpx;
		height: 200rpx;
		transition: all .35s ease;
	}
	
	.logo {
		position: absolute;
		z-index: 2;
		left: 50%;
		bottom: 220rpx;
		width: 160rpx;
		height: 160rpx;
		margin-left: -80rpx;
		border-radius: 160rpx;
		animation: sway 10s ease-in-out infinite;
		opacity: .95;
		overflow: hidden;
	}
	.userNickName{
		position: absolute;
		z-index: 3;
		color: #000000;
		left: 50%;
		bottom: 160rpx;
		margin-left: -80rpx;
	}
	@keyframes sway {
		0% {
			transform: translate3d(0, 20rpx, 0) rotate(-15deg);
		}

		17% {
			transform: translate3d(0, 0rpx, 0) rotate(25deg);
		}

		34% {
			transform: translate3d(0, -20rpx, 0) rotate(-20deg);
		}

		50% {
			transform: translate3d(0, -10rpx, 0) rotate(15deg);
		}

		67% {
			transform: translate3d(0, 10rpx, 0) rotate(-25deg);
		}

		84% {
			transform: translate3d(0, 15rpx, 0) rotate(15deg);
		}

		100% {
			transform: translate3d(0, 20rpx, 0) rotate(-15deg);
		}
	}

	.wave {
		position: absolute;
		z-index: 3;
		right: 0;
		bottom: 0;
		opacity: 0.725;
		height: 250rpx;
		width: 2250rpx;
		animation: wave 10s linear infinite;
	}

	.wave-bg {
		z-index: 1;
		animation: wave-bg 10.25s linear infinite;
	}

	@keyframes wave {
		from {
			transform: translate3d(125rpx, 0, 0);
		}

		to {
			transform: translate3d(1125rpx, 0, 0);
		}
	}

	@keyframes wave-bg {
		from {
			transform: translate3d(375rpx, 0, 0);
		}

		to {
			transform: translate3d(1375rpx, 0, 0);
		}
	}

	.bd {
		position: relative;
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: stretch;
		animation: bd-rise 2s cubic-bezier(0.23, 1, 0.32, 1) .75s forwards;
		opacity: 0;
	}

	@keyframes bd-rise {
		from {
			opacity: 0;
			transform: translate3d(0, 60rpx, 0);
		}

		to {
			opacity: 1;
			transform: translate3d(0, 0, 0);
		}
	}

	.confirm-btn {
		font-size: 13pt;
		line-height: 85rpx;
		height: 85rpx;
		background: #69C3AA;
		color: #fff;
		text-align: center;
		border-radius: 100rpx;
		margin: 45% 20%;
	}

	.confirm-btn:active {
		opacity: .8;
	}

	.copyright {
		font-size: 28rpx;
		color: #999;
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		padding: 30rpx;
		text-align: center;
	}
</style>
