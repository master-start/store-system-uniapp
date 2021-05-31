<template>
	<view class="customer-list-content">
		<view v-for="(item,index) in GoodsList" :key="index" :id="item.id">
			<!-- :hover-class="hoverClass" @click="gotoGoodsInfo" -->
			<view class="c-list" :id="item.id">
				<view class="c-list-title" v-if="item.ProductNo">产品编码：{{item.ProductNo}}</view>
				<view class="c-list-title" v-if="item.Title">产品名称：{{item.Title}}</view>
				<view class="c-list-title">商品类型：{{TypeText(item.Type)}}</view>
				<view class="c-list-title" v-if="item.Description">产品描述：{{item.Description}}</view>
				<view class="c-list-title" v-if="item.Price">销售价格：{{item.Price}}</view>
				<view class="c-list-title" v-if="item.MarketPrice">商品原价：{{item.MarketPrice}}</view>
				<view class="c-list-title" v-if="item.CostPrice">商品进价：{{item.CostPrice}}</view>
				<view class="c-list-title" v-if="item.Stock">商品库存：{{item.Stock}}</view>
				<view class="c-list-title" v-if="item.Sort">商品排序：{{item.Sort}}</view>
				<view class="c-list-title">商品状态：{{StatusText(item.Status)}}</view>
				<view class="c-list-title">是否可退：{{IsNoRefundText(item.IsNoRefund)}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	var globalData = app.globalData;
	var imgHost = globalData.imgHost;
	export default {
		data() {
			return {
				
			}
		},
		props:[
			'GoodsList',
			'CategoryId',
		],
		onLoad() {
			console.log("aaaaaaaaaaaaaaaaa",props.CategoryId);
			console.log("加载的子组件数据为",CategoryId)
		},
		methods: {
			//获取商品列表
			getGoodsList:function(){
				var that = this;
				app.request().postRequest(
					app.getNetAddresss('api/Goods/getList'),
					{
						BrandId: uni.getStorageSync('BrandId'),
						UserMobile: uni.getStorageSync('mobile')
					},
					{
						'content-type': 'application/x-www-form-urlencoded',
						'access_token': uni.getStorageSync('access_token'),
						'members_id': uni.getStorageSync('members_id'),
						'wx_token': uni.getStorageSync('wx_token')
					}
				).then(res => {
					if (res.code === 1) {
						console.log("获取到的商品数据为",res.result);
						let GoodsList = res.result;
						this.GoodsList = GoodsList;
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
			TypeText(value){
				if(value == 0){
					return '实物';
				}
				if(value == 1){
					return '虚拟';
				}
			},
			//是否可退: 0=可退，1=不可退款
			IsNoRefundText(value){
				if(value == 0){
					return '可退';
				}
				if(value == 1){
					return '不可退款';
				}
			},
			//商品状态：0=正常，1=下架，2=删除
			StatusText(value){
				if(value == 0){
					return '正常';
				}
				if(value == 1){
					return '下架';
				}
				if(value == 2){
					return '删除';
				}
			},
		}
	}
</script>

<style>

</style>
