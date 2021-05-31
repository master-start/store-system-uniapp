<template>
	<view class="content">
		<aloys-tab :tabs="tabs" :circular="circular" @change="onTabChange">
			<view slot="content0" style="margin-top: 10rpx;">
				<view class="content-info">
					1dasdas
				</view>
			</view>
			<view slot="content1">
				<view class="content-info">
					2
				</view>
			</view>
			<view slot="content2">
				<view class="content-info">
					3
				</view>
			</view>
			<view slot="content3">
				<view class="content-info">
					4
				</view>
			</view>
		</aloys-tab>
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
				tabs: [{
						title: '库存预警'
					},
					{
						title: '客户预警'
					},
					{
						title: '预约预警'
					},
					{
						title: '总部通知'
					}
				],
				circular:true,
			}
		},
		methods: {
			//滑动菜单促发事件
			onTabChange(res) {
				console.log("onTabChange", res);
			},
		}
	}
</script>

<style>
	@import '/static/css/main.css';
	@import '/static/css/icon.css';
	.content {
			position: absolute;
			height: 100%;
			/* background-color: #f1f5f8; */
		}
		.content-info{
			margin-top: 20rpx;
		}

</style>
