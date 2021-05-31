<template>
	<view class="content">
		<aloys-tab :tabs="tabs" :circular="circular" @change="onTabChange">
			<view slot="content0" style="margin-top: 10rpx;">
				<view class="content-info">
					
					<view class="cu-form-group section">
						<view class="title">选择商品：</view>
						<input type="text" name="Name" @click="gotoChooseGoods" disabled="true" placeholder="请选择销售的商品" />
						<text class="cuIcon-unfold text-orange"></text>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">账单金额：</view>
						<input type="text" name="Name" placeholder="请先选择销售的商品" />
						<text>元</text>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">优惠金额：</view>
						<input type="text" name="Name" placeholder="请先选择销售的商品" />
						<text>元</text>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">减免金额：</view>
						<input type="text" name="Name" placeholder="请先选择销售的商品" />
						<text>元</text>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">实付金额：</view>
						<input type="text" name="Name" placeholder="请先选择销售的商品" />
						<text>元</text>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">支付方式：</view>
						<input type="text" name="Name" placeholder="请选择付款方式" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">人员业绩：</view>
						<input type="text" name="Name" placeholder="请选择销售人员" />
					</view>
					
					<view class="button_submit">
						<button type="primary"  form-type="submit">确认收款</button>
					</view>
					
				</view>
			</view>
			<view slot="content1">
				<view class="content-info">
					
					<view class="cu-form-group section">
						<view class="title">选择商品：</view>
						<input type="text" name="Name" placeholder="请选择销售的商品" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">账单金额：</view>
						<input type="text" name="Name" placeholder="请选择销售的商品" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">优惠金额：</view>
						<input type="text" name="Name" placeholder="请选择销售的商品" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">减免金额：</view>
						<input type="text" name="Name" placeholder="请选择销售的商品" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">实付金额：</view>
						<input type="text" name="Name" placeholder="请选择销售的商品" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">支付方式：</view>
						<input type="text" name="Name" placeholder="请选择付款方式" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">人员业绩：</view>
						<input type="text" name="Name" placeholder="请选择销售人员" />
					</view>
					
					<view class="button_submit"><button type="primary"  form-type="submit">确认收款</button></view>
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
						title: '卖场销售'
					},
					{
						title: '会员销售'
					},
					{
						title: '销售记录'
					},
					{
						title: '销售统计'
					}
				],
				circular:true,
			}
		},
		methods: {
			//选择商品进行销售
			gotoChooseGoods(){
				console.log("点击了选择商品");
				uni.navigateTo({
					url:"../chooseGoods/chooseGoods"
				})
			},
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
