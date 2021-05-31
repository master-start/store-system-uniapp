<template>
	<view class="content">
		<!-- <uni-nav-bar fixed="true" @clickLeft="clickLeft" @clickRight="clickRight" left-text="列表"  right-text="创建" title="连锁门店管理"></uni-nav-bar> -->
		<view class="ContentBackground">
			<form @submit="formSubmit">
				<view class="create-content">

					<view class="cu-form-group section">
						<view class="title">总店编码：</view>
						<input type="text" name="BrandChainsNum" :value="dataListInfo.BrandChainsNum" placeholder="请输入总店编码" />
					</view>

					<view class="cu-form-group section">
						<view class="title">品牌名称：</view>
						<input type="text" name="BrandName" :value="dataListInfo.BrandName" placeholder="请输入品牌名称" />
					</view>

					<view class="cu-form-group section">
						<view class="title">收入金额：</view>
						<input type="text" name="Money" :value="dataListInfo.Money" disabled="true" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">门店数量：</view>
						<input type="text" name="StoreNumber" :value="dataListInfo.StoreNumber" disabled="true" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">短信数量：</view>
						<input type="text" name="SmsNumber" :value="dataListInfo.SmsNumber" disabled="true"  />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">管理人数：</view>
						<input type="text" name="ManagerNumber" :value="dataListInfo.ManagerNumber" disabled="true" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">管理号码：</view>
						<input type="text" name="BrandChainsMobile" :value="dataListInfo.BrandChainsMobile" />
					</view>
					
					<view class="button_submit"><button type="primary" form-type="submit">提 交</button></view>
				</view>
			</form>
		</view>
		<!-- 底部导航组件 -->
		<foot :footCopyRightTime="footCopyRightTime" :footVersion="footVersion"></foot>	
	</view>
</template>

<script>
import foot from '../../components/foot.vue';
const app = getApp({ allowDefault: true });
const globalData = app.globalData;

export default {
	components: {
		foot
	},
	data() {
		return {
			msgType: 'error',
			message: '提示内容',
			dataListInfo: [],
		};
	},
	onLoad: function() {
		var dologin = globalData.dologin;
		if(!dologin){
			dologin = uni.getStorageSync('store_token');
			if(!dologin){
				uni.showModal({
					title:'温馨提示',
					content:'您还未登录，请先进行登录',
					showCancel:false,
					success:function(){
						uni.redirectTo({
							url:"/pages/login/login"
						})
					}
				})
			}
		}
		this.getDataList();
	},
	onReady() {
		// 页面打开自动打开对话框
		
	},
	methods: {
		getDataList:function(){
			app.request().postRequest(
				app.getNetAddresss('api/store/totalStoreData'),
				{
					BrandId: uni.getStorageSync('BrandId'),
					StoreMobile: uni.getStorageSync('mobile')
				},
				{
					'content-type': 'application/x-www-form-urlencoded',
					'access_token': uni.getStorageSync('access_token'),
					'members_id': uni.getStorageSync('members_id'),
					'wx_token': uni.getStorageSync('wx_token')
				}
			).then(res => {
				if (res.code === 1) {
					console.log("获取到的门店列表数据为",res);
					this.dataListInfo = res.result;
				}
				else {
					uni.showToast({
						title: '温馨提醒：' + res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			})
		},
		formSubmit: function(input) {
			console.log('输入的内容是', input);
			var that = this;
			let BrandChainsNum = input.detail.value.BrandChainsNum;
			if(!BrandChainsNum){
				uni.showModal({
					title:'操作提示',
					content:'连锁店编码不能为空',
					showCancel:false
				})
				return;
			}
			let BrandName = input.detail.value.BrandName;
			if(!BrandName){
				uni.showModal({
					title:'操作提示',
					content:'连锁店名称不能为空',
					showCancel:false
				})
				return;
			}
			let BrandChainsMobile = input.detail.value.BrandChainsMobile;
			if(!BrandChainsMobile){
				uni.showModal({
					title:'操作提示',
					content:'连锁管理员手机号错误！',
					showCancel:false
				})
				return;
			}
			app.request().postRequest(
				app.getNetAddresss('api/store/editStoreData'),
				{
					BrandId: uni.getStorageSync('BrandId'),
					BrandChainsNum: BrandChainsNum,
					BrandName: BrandName,
					BrandChainsMobile: BrandChainsMobile
				},
				{
					'content-type': 'application/x-www-form-urlencoded',
					'access_token': uni.getStorageSync('access_token'),
					'members_id': uni.getStorageSync('members_id'),
					'wx_token': uni.getStorageSync('wx_token')
				}
			).then(res => {
				if (res.code === 1) {
					uni.showModal({
						title:'温馨提示',
						content:res.msg,
						showCancel:false,
						success() {
							that.getDataList();
						}
					})
				} else {
					uni.showToast({
						title: '温馨提醒：' + res.msg,
						icon: 'none',
						duration: 2000
					});
				}
			})
		},

	}
};
</script>

<style lang="scss">
@import '/static/css/main.css';
@import '/static/css/icon.css';

.header {
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-content: center;
	padding: 0.5rem;
}

.header > view {
	line-height: 2.2rem;
	width: 25%;
	text-align: left;
	font-size: 31rpx;
}

.header > input {
	width: 75%;
	text-align: left;
	border: solid #d7d7d7 0.1pt;
	padding: 5pt;
	background: #ffffff;
}
.header > textarea {
	width: 75%;
	text-align: left;
	border: solid #d7d7d7 0.1pt;
	padding: 5pt;
	background: #ffffff;
}
.header > picker {
	width: 75%;
	text-align: left;
	border: solid #d7d7d7 0.1pt;
	padding: 5pt;
	background: #ffffff;
}
</style>
