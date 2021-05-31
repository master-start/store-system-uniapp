<template>
	<view class="content">
		<form @submit="FormSubmit">
		<aloys-tab :tabs="tabs" :circular="circular" @change="onTabChange">
			<view slot="content0" style="margin-top: 10rpx;">
				<view class="content-info">
					<view class="cu-form-group section">
						<view class="title">每消费1元赠：</view>
						<input type="digit" name="GivePoint" :value="MarketingData.GivePoint" placeholder="每消费1元赠*积分" />
						<text>积分</text>
					</view>

					<view class="cu-form-group section">
						<view class="title">1积分等同于：</view>
						<input type="digit" name="PointPrice" :value="MarketingData.PointPrice" placeholder="1积分等同于*元" />
						<text>元钱</text>
					</view>

					<view class="button_submit"><button type="warn" form-type="submit">提 交</button></view>
				</view>
			</view>

			<view slot="content1" style="margin-top: 10rpx;">
				<view class="content-info">
					<view class="cu-form-group section">
						<view class="title">最多抵扣：</view>
						<input type="digit" name="MaxPointDeduct" :value="MarketingData.MaxPointDeduct" placeholder="单笔订单最多抵扣使用的积分" />
						<text>积分</text>
					</view>

					<view class="cu-form-group section">
						<view class="title">最少抵扣：</view>
						<input type="digit" name="MinPointDeduct" :value="MarketingData.MinPointDeduct" placeholder="单笔订单最少抵扣使用的积分" />
						<text>积分</text>
					</view>

					<view class="cu-form-group section">
						<view class="title">是否全额抵扣：</view>
						<radio-group class="switch-group" @change="radioIsAllPointDeductChange">
							<view class="swtich-label" name="IsAllPointDeduct" v-for="(ite, inx) in IsAllPointDeduct_Data" :key="inx">
								<radio :value="ite.value" name="IsAllPointDeduct" :checked="ite.checked" />
								<text>{{ ite.name }}</text>
							</view>
						</radio-group>
					</view>
					<view class="tips text-green">提示：关闭全额抵扣，所有全额抵扣都将被关闭！</view>

					<view class="button_submit"><button type="warn" form-type="submit">提 交</button></view>
				</view>
			</view>
		</aloys-tab>
		</form>
	</view>
</template>

<script>
//滑动菜单组件
import aloysTab from '@/components/aloys-tab/aloys-tab.vue';
const app = getApp();
var globalData = app.globalData;
var imgHost = globalData.imgHost;
export default {
	components: {
		aloysTab
	},
	data() {
		return {
			tabs: [
				{
					title: '积分设置'
				},
				{
					title: '积分抵扣'
				}
			],
			circular: true,

			IsAllPointDeduct_Data: [
					{ name: '关闭', value: '0', checked: false }, 
					{ name: '开启', value: '1', checked: false },
				],
			IsAllPointDeduct: 0,
			MarketingData:'',
		};
	},
	onLoad() {
		this.getData();
	},
	methods: {
		//是否开启商品全额抵扣
		radioIsAllPointDeductChange(res) {
			this.IsAllPointDeduct = res.detail.value;
		},
		getData(){
			app.request().postRequest(app.getNetAddresss('api/Marketing/getData'),
			{
				
			},
			{
				'content-type': 'application/x-www-form-urlencoded'
			}).then(res => {
				if (res.code === 1) {
					console.log("获取到的数据为",res.result);
					this.MarketingData = res.result.data;
					console.log("是否开启全局",res.result.data.IsAllPointDeduct)
					let i = res.result.data.IsAllPointDeduct;
					this.IsAllPointDeduct = res.result.data.IsAllPointDeduct;
					this.IsAllPointDeduct_Data[i].checked = true;
					return;
				}else {
						uni.showToast({
							title: '温馨提醒：' + res.msg,
							icon: 'none',
							duration: 2000
						})
						return;
					}
				})
		},
		FormSubmit(input){
			var that = this;
			let postData = input.detail.value;
			postData.IsAllPointDeduct = that.IsAllPointDeduct;
			console.log("获取到的input",postData)
			app.request().postRequest(app.getNetAddresss('api/Marketing/create'),
			postData,
			{
				'content-type': 'application/x-www-form-urlencoded'
			}).then(res => {
				if (res.code === 1) {
					uni.showModal({
						showCancel:false,
						title:"操作提示",
						content:res.msg,
						success:function(res){
							//调用成功刷新数据
							that.getData();
						}
					})
					return;
				}else {
						uni.showToast({
							title: '温馨提醒：' + res.msg,
							icon: 'none',
							duration: 2000
						})
						return;
					}
				})
		},
		//滑动菜单促发事件
		onTabChange(res) {
			console.log('onTabChange', res);
		}
	}
};
</script>

<style>
@import '/static/css/main.css';
@import '/static/css/icon.css';
.content {
	position: absolute;
	height: 100%;
	/* background-color: #f1f5f8; */
}
.tips {
	margin: 0rpx auto;
	text-align: center;
	height: 70rpx;
	line-height: 70rpx;
	width: 95%;
}
.content-info {
	margin-top: 20rpx;
	background-color: #ffffff;
}
.form-input {
	width: 90%;
	height: 50rpx;
	line-height: 100rpx;
	border: solid 1rpx #c9d9d9;
	padding: 8rpx;
	margin-top: 25rpx;
}
.form-submit {
	width: 220rpx;
	height: 65rpx;
	line-height: 60rpx;
	margin-top: 28rpx;
}
.c_list {
	background-color: #ffffff;
	height: auto;
	width: 100%;
	display: flex;
	line-height: 100rpx;
	flex-flow: row nowrap;
	justify-content: center;
	margin: 10rpx auto;
}
.left20 {
	text-align: left;
	width: 50%;
}
.colorhui {
	background-color: #108080;
	color: #ffffff;
}
.addHeight30 {
	padding-bottom: 30rpx;
}
.Sort {
	padding-left: 10rpx;
}
.c_list1 {
	float: left;
	line-height: 100rpx;
	text-align: left;
	width: 30%;
}
.c_list2 {
	float: left;
	line-height: 100rpx;
	text-align: left;
	width: 30%;
}
.c_list3 {
	float: left;
	line-height: 100rpx;
	text-align: left;
	width: 30%;
}
.c_list4 {
	float: right;
	line-height: 100rpx;
	text-align: right;
	width: 30%;
	display: flex;
	flex-flow: row nowrap;
}
.c_list_items {
	float: left;
	line-height: 100rpx;
	text-align: left;
	width: 27%;
	display: flex;
	flex-flow: row nowrap;
}
.c_list_item {
	float: left;
	line-height: 100rpx;
	text-align: left;
	padding-left: 20rpx;
	width: 30%;
	display: flex;
	flex-flow: row nowrap;
}
.idno {
	width: 10%;
	margin-left: 2rpx;
}
.left10 {
	margin-left: 10rpx;
}
.action {
	margin: 0rpx 15rpx;
}
</style>
