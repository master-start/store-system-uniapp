<template>
	<view class="content">
		<aloys-tab :tabs="tabs" :circular="circular" @change="onTabChange" @reachchange="reachchange">
			<block v-for="(item,index) in GoodsCategoryList" :key="item.id">
				<view :slot="contentTab + index" style="margin-top: 10rpx;">
					<view class="content-info">
						<view class="customer-search">
							<form @submit="searchForm">
								<view class="searchContent">
									<view class="form-search-input-view">
										<input class="form-search-input" type="text" name="searchContent" :value="searchContent" placeholder="请输入产品名称/编号进行搜索" />
									</view>
									<view class="form-search-button-view">
										<button class="form-search-button" type="warn" form-type="submit">搜索</button>
									</view>
								</view>
							</form>
						</view>
						
						<view class="customer-list-content">
							<view v-for="(item,index) in GoodsList"  :key="index" :id="item.id">
								<view class="c-list" :id="item.id" @click="gotoGoodsInfo(item.id)">
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
						
						<!-- <goods-list :GoodsList="GoodsList" :CategoryId="item.id"></goods-list> -->
					</view>
				</view>
			</block>
		</aloys-tab>
	</view>
</template>

<script>
	//商品列表
	import goodsList from "@/components/goods-list.vue"
	//滑动菜单组件
	import aloysTab from '@/components/aloys-tab/aloys-tab.vue';
	const app = getApp();
	var globalData = app.globalData;
	var imgHost = globalData.imgHost;
	export default {
		components: {
			aloysTab,goodsList
		},
		data() {
			return {
				tabs: [],
				circular:true,
				GoodsCategoryList:[],
				
				GoodsList:[],
				contentTab:'content',
				
				page:1,
				last_page:1,
				onTabChangeValue:0,
				searchContent:'',
				hoverClass:'hoverClass',
				
				tabIds:[],
				GoodsCategoryId:'',
			}
		},
		onLoad() {
			//产品分类
			this.getGoodsCategoryList();
		},
		//监听页面返回
		onBackPress() {
			this.getGoodsCategoryList();
		},
		//监听页面显示
		onShow() {
			this.getGoodsCategoryList();
		},
		methods: {
			//搜索
			searchForm:function(input){
				console.log("搜索的内容是",input);
				var searchContent = input.detail.value.searchContent;
				this.searchContent = searchContent;
				this.page = 1;
				this.GoodsList = [];
				this.getGoodsList();
			},
			//跳转到编辑
			gotoGoodsInfo(res){
				console.log("点击到编辑",res);
				// var id = res.currentTarget.id;
				uni.navigateTo({
					url:"../edit/edit?id=" + res,
					success(res) {
						console.log("跳转调用成功",res);
					},
					fail(res) {
						console.log("跳转调用失败",res)
						uni.showToast({
							title:"跳转失败，请联系业务人员！"
						})
					}
				})
			},
			//商品类型：0=实物，1=虚拟
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
			//获取分类列表
			getGoodsCategoryList:function(){
				app.request().postRequest(
					app.getNetAddresss('api/GoodsCategory/getDataLevel'),
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
						console.log("获取到的列表数据为",res.result);
						let GoodsCategoryList = res.result;
						let tab = [];
						let tabIds = [];
						
						
						let obj = {
							'title':'全部'
						}
						tab.push(obj)
						tabIds.push(0);
						GoodsCategoryList.map((g,index)=>{
							let obj = {
								'title':g.name
							}
							tabIds.push(g.id);
							tab.push(obj)
						})
						this.tabIds = tabIds;
						this.GoodsCategoryId = tabIds[0];
						this.tabs = tab;
						this.GoodsCategoryList = GoodsCategoryList;
						//商品
						this.getGoodsList();
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
			//获取商品列表
			getGoodsList:function(){
				var that = this;
				var page = that.page;
				var GoodsCategoryId = that.GoodsCategoryId;
				var searchContent = that.searchContent;
				app.request().postRequest(
					app.getNetAddresss('api/Goods/getList'),
					{
						page:page,
						searchContent:searchContent,
						GoodsCategoryId:GoodsCategoryId,
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
						let Goods = res.result;
						let data = Goods.data;
						that.GoodsList = [
							...that.GoodsList,...data
						];
						this.last_page = Goods.last_page;
						this.page = Goods.current_page;
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
			//滑动菜单促发事件
			onTabChange(res) {
				console.log("onTabChange", res);
				var tabIds = this.tabIds;
				var GoodsCategoryId = tabIds[res];
				this.GoodsCategoryId = GoodsCategoryId;
				this.page = 1;
				this.GoodsList = [];
				this.searchContent = '',
				console.log("获取的分类id是",GoodsCategoryId);
				this.getGoodsList();
			},
			//滚动到底部触发的事件
			reachchange(res){
				console.log("reachchange",res);
				var page = parseInt(this.page) + 1;
				if(this.last_page >= page){
					this.page = page;
					this.getGoodsList();
				}
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
	.searchContent{
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: space-between;
			margin: 20rpx auto;
			width: 95%;
			background-color: #FFFFFF;
			border-bottom: #CCCCCC solid 1rpx;
			border-radius: 20rpx;
		}
		.form-search-input-view{
			width: 65%;
		}
		.form-search-button-view{
			width: 30%;
		}
		.form-search-input{
			padding-left: 20rpx;
			height: 80rpx;
			line-height: 80rpx;
		}
		.form-search-button{
			height: 80rpx;
			line-height: 80rpx;
		}
		.customer-list-content{
			
		}
		.c-list{
			border-bottom: #CCCCCC solid 1rpx;
			margin: 20rpx auto;
			width: 90%;
			background-color: #FFFFFF;
			padding: 20rpx;
			border-radius: 20rpx;
		}
		.hoverClass{
			/* background-color: #fee4e4; */
			border: #ff0000 solid 1rpx;
		}
		.c-list-title{
			height: 90rpx;
			line-height: 90rpx;
			color: #333333;
			border-bottom: #D9D9D9 dotted 1rpx;
			justify-content: flex-start;
			flex-flow: row nowrap;
		}
</style>
