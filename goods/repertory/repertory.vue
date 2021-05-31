<template>
	<view class="content">
		<aloys-tab :tabs="tabs" :circular="circular" @change="onTabChange" @reachchange="reachchange">
			<view slot="content0">
				<view class="content-list">
					<view v-for="(item,index) in GoodsStockAuditList"  :key="index" :id="item.id">
						<view class="c-list" :id="item.id" @click="gotoGoodsStockAudit(item)">
							<view class="c-list-title" v-if="item.GoodsId">产品ID：{{item.GoodsId}}</view>
							<view class="c-list-title" v-if="item.has_one_goods.Title">产品名称：{{item.has_one_goods.Title}}</view>
							<view class="c-list-title" v-if="item.has_one_goods_sku.Title"><text class="text-bold text-green">规格名称：{{item.has_one_goods_sku.Title}}</text></view>
							<view class="c-list-title text-orange" v-if="item.Stock"><text class="text-bold text-red">变动库存：{{item.Stock}}</text></view>
							<view class="c-list-title" v-if="item.Price">销售价格：{{item.Price}}</view>
							<view class="c-list-title" v-if="item.CostPrice">商品进价：{{item.CostPrice}}</view>
							<view class="c-list-title"><text class="text-bold text-grey">审计状态：{{StockAuditStatusText(item.Status)}}</text></view>
							<view class="c-list-title">操作类型：{{StockAuditTypeText(item.Type)}} -- (点击进行审计入库) </view>
						</view>
					</view>
				</view>
				<block class="content-info" v-if="GoodsStockAuditList.length == 0 ">
					<view class="none-images">
						<image src="../../static/img/none.jpg"  mode="scaleToFill" border="0" class="no_images"></image>
					</view>
					<view class="no-text">暂无审计事项</view>
				</block>
			</view>
			
			<view slot="content1" style="margin-top: 10rpx;">
				
				<view class="content-info">
					<form @submit="searchForm">
						<view class="cu-form-group section">
							<view class="title">查询条件：</view>
							<picker @change="SearchChange" header-text="请选择查询条件" :range="SearchArray">
							  <view class="picker">
								  当前选择：{{SearchArray[ConditionsId]}}
							  </view>
							</picker>
						</view>
						<view class="cu-form-group section">
							<view class="title">检索内容：</view>
							<input type="text" name="keywords" :value="keywords" placeholder="请输入搜索关键字" />
						</view>
						<view class="button_submit"><button type="primary"  form-type="submit">提交检索产品</button></view>
					</form>
				</view>
				
				<view class="content-list">
					<view v-for="(item,index) in GoodsList"  :key="index" :id="item.id">
						<view class="c-list" :id="item.id" @click="gotoGoodsInfo(item)">
							<view class="c-list-title" v-if="item.ProductNo">产品编码：{{item.ProductNo}}</view>
							<view class="c-list-title" v-if="item.Title"><text class="text-bold">产品名称：{{item.Title}}</text></view>
							<view class="c-list-title" v-if="item.Stock"><text class="text-red">商品库存：{{item.Stock}}</text></view>
							<view class="c-list-title" v-if="item.RegisterStock"><text class="text-red">寄存库存：{{item.RegisterStock}}</text></view>
							<view class="c-list-title">商品类型：{{TypeText(item.Type)}}</view>
							<view class="c-list-title" v-if="item.Description">产品描述：{{item.Description}}</view>
							<view class="c-list-title" v-if="item.Price">销售价格：{{item.Price}}</view>
							<view class="c-list-title" v-if="item.MarketPrice">商品原价：{{item.MarketPrice}}</view>
							<view class="c-list-title" v-if="item.CostPrice">商品进价：{{item.CostPrice}}</view>
							<view class="c-list-title">商品状态：{{StatusText(item.Status)}}</view>
							<view class="c-list-title">是否可退：{{IsNoRefundText(item.IsNoRefund)}}</view>
						</view>
					</view>
				</view>
				
				<!-- 直接入库 -->
				<pop ref="pop" direction="left" :is_close="true" :is_mask="true">
					<view>
						<form @submit="GoodsInStock" :id="goods_data.id">
						<view class="cu-form-group section">
							<view class="title">商品名称：</view>
							<input type="text" name="Title" :value="goods_data.Title" disabled="true" placeholder="请输入商品名称" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">商品描述：</view>
							<input type="text" name="Description" :value="goods_data.Description" disabled="true" placeholder="请输入商品描述,可含活动描述" />
						</view>
						
						
						
						<block v-if="goods_data.Stock">
							<view class="cu-form-group section">
								<view class="title text-red">原库存数量：</view>
								<input type="digit" name="OriginStock" :value="goods_data.Stock" disabled="true" />
							</view>
						</block>
						
						<view class="cu-form-group section">
							<view class="title">入库数量：</view>
							<input type="number" name="Stock" :disabled="skuDisabled" placeholder="请输入入库数量" />
						</view>
						
						<block v-if="goods_data.Stock">
							<view class="cu-form-group section">
								<view class="title text-red">原寄存数量：</view>
								<input type="digit" name="OriginRegisterStock" :value="goods_data.RegisterStock" disabled="true" />
							</view>
						</block>
						
						<view class="cu-form-group section">
							<view class="title">寄存入库：</view>
							<input type="number" name="RegisterStock" :disabled="skuDisabled" placeholder="入库寄存数量(无审计)" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">入库进价：</view>
							<input type="digit" name="CostPrice" :value="goods_data.CostPrice" :disabled="skuDisabled" placeholder="请输入商品在生产供应商的采购价格" />
							<text>元</text>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">销售价格：</view>
							<input type="digit" name="Price" :value="goods_data.Price" :disabled="skuDisabled" placeholder="请输入商品销售价格" />
							<text>元</text>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">商品原价：</view>
							<input type="digit" name="MarketPrice" :value="goods_data.MarketPrice" :disabled="skuDisabled" placeholder="请输入商品建议零售原价" />
							<text>元</text>
						</view>
						
						<view class="button_submit"><button type="warn" :id="goods_data.id" form-type="submit">提交入库</button></view>
						</form>
					</view>
				</pop>
		</view>
		<view slot="content2">
				
				<view class="content-info">
					<form @submit="stockSearchForm">
						<view class="cu-form-group section">
							<view class="title">查询条件：</view>
							<picker @change="stockSearchChange" header-text="请选择查询条件" :range="stockSearchArray">
							  <view class="picker">
								  当前选择：{{stockSearchArray[stockSearchId]}}
							  </view>
							</picker>
						</view>
						<view class="cu-form-group section">
							<view class="title">检索内容：</view>
							<input type="text" name="keywords" :value="keywords" placeholder="请输入搜索关键字" />
						</view>
						<view class="button_submit"><button type="primary"  form-type="submit">提交检索产品</button></view>
					</form>
				</view>
				
				<view class="content-list">
					<view v-for="(item,index) in GoodsStockList"  :key="index" :id="item.id">
						<view class="c-list" :id="item.id" @click="gotoGoodsInfo(item)">
							<view class="c-list-title" v-if="item.has_one_goods.ProductNo">产品编码：{{item.has_one_goods.ProductNo}}</view>
							<view class="c-list-title" v-if="item.has_one_goods.Title"><text class="text-bold">产品名称：{{item.has_one_goods.Title}}</text></view>
							<view class="c-list-title" v-if="item.has_one_goods.Stock"><text class="text-red">商品库存：{{item.has_one_goods.Stock}}</text></view>
							<view class="c-list-title" v-if="item.has_one_goods.RegisterStock"><text class="text-red">寄存库存：{{item.has_one_goods.RegisterStock}}</text></view>
							<view class="c-list-title">商品类型：{{TypeText(item.has_one_goods.Type)}}</view>
							<view class="c-list-title"><text class="text-red">库存类型：{{stockTypeText(item.Type)}}</text></view>
							<view class="c-list-title" v-if="item.Name">库存名称：{{item.Name}}</view>
							<view class="c-list-title" v-if="item.OriginalStock">原库存：{{item.OriginalStock}}</view>
							<view class="c-list-title text-bold" v-if="item.Stock">变动库存：{{item.Stock}}</view>
							<view class="c-list-title" v-if="item.NewStock">新库存：{{item.NewStock}}</view>
							<view class="c-list-title"><text class="text-red">库存状态：{{stockStatusText(item.Status)}}</text></view>
							<view class="c-list-title">商品状态：{{StatusText(item.has_one_goods.Status)}}</view>
							<view class="c-list-title">是否可退：{{IsNoRefundText(item.has_one_goods.IsNoRefund)}}</view>
						</view>
					</view>
				</view>
				
			</view>
			<view slot="content3">
				<view class="content-info">
					<view class="tabbar_toos">
						<view class="countlist">
							<view class="text_top"> 今日入库总数 </view>
							<view class="text_end"> {{StockCountTableList.DayInputStockNum}} </view>
						</view>
						<view class="countlist">
							<view class="text_top"> 今日销售总数 </view>
							<view class="text_end"> {{StockCountTableList.DayMarketNum}} </view>
						</view>
						<view class="countlist border_none">
							<view class="text_top"> 今日客户退货 </view>
							<view class="text_end"> {{StockCountTableList.DayCustomerReturnsNum}} </view>
						</view>
					</view>
					
					<view class="tabbar_toos">
						<view class="countlist">
							<view class="text_top"> 今日商家退货 </view>
							<view class="text_end"> {{StockCountTableList.DayMerchantsReturnNum}} </view>
						</view>
						<view class="countlist">
							<view class="text_top"> 今日调拨总数 </view>
							<view class="text_end"> {{StockCountTableList.DayAllotNum}} </view>
						</view>
						<view class="countlist border_none">
							<view class="text_top"> 今日损毁总数 </view>
							<view class="text_end"> {{StockCountTableList.DayMarNum}} </view>
						</view>
					</view>
					
					<view class="tabbar_toos">
						<view class="countlist">
							<view class="text_top"> 今日寄存入库 </view>
							<view class="text_end"> {{StockCountTableList.DayRegisterIntNum}} </view>
						</view>
						<view class="countlist">
							<view class="text_top"> 今日寄存取出 </view>
							<view class="text_end"> {{StockCountTableList.DayRegisterOutNum}} </view>
						</view>
						<view class="countlist border_none">
							<view class="text_top"> 今日寄存损毁 </view>
							<view class="text_end"> {{StockCountTableList.DayRegisterMarNum}} </view>
						</view>
					</view>
					
					<view class="tabbar_toos">
						<view class="countlist">
							<view class="text_top"> 上月入库总数 </view>
							<view class="text_end"> {{StockCountTableList.MonthInputStockNum}} </view>
						</view>
						<view class="countlist">
							<view class="text_top"> 上月销售总数 </view>
							<view class="text_end"> {{StockCountTableList.MonthMarketNum}} </view>
						</view>
						<view class="countlist border_none">
							<view class="text_top"> 上月客户退货 </view>
							<view class="text_end"> {{StockCountTableList.MonthCustomerReturnsNum}} </view>
						</view>
					</view>
					
					<view class="tabbar_toos">
						<view class="countlist">
							<view class="text_top"> 上月商家退货 </view>
							<view class="text_end"> {{StockCountTableList.MonthMerchantsReturnNum}} </view>
						</view>
						<view class="countlist">
							<view class="text_top"> 上月调拨总数 </view>
							<view class="text_end"> {{StockCountTableList.MonthAllotNum}} </view>
						</view>
						<view class="countlist border_none">
							<view class="text_top"> 上月损毁总数 </view>
							<view class="text_end"> {{StockCountTableList.MonthMarNum}} </view>
						</view>
					</view>
					
					<view class="tabbar_toos">
						<view class="countlist">
							<view class="text_top"> 上月寄存入库 </view>
							<view class="text_end"> {{StockCountTableList.MonthRegisterIntNum}} </view>
						</view>
						<view class="countlist">
							<view class="text_top"> 上月寄存取出 </view>
							<view class="text_end"> {{StockCountTableList.MonthRegisterOutNum}} </view>
						</view>
						<view class="countlist border_none">
							<view class="text_top"> 上月寄存损毁 </view>
							<view class="text_end"> {{StockCountTableList.MonthRegisterMarNum}} </view>
						</view>
					</view>
					
				</view>
			</view>
		</aloys-tab>
	</view>
</template>

<script>
	import pop from "@/components/ming-pop/ming-pop.vue"
	//滑动菜单组件
	import aloysTab from '@/components/aloys-tab/aloys-tab.vue';
	const app = getApp();
	var globalData = app.globalData;
	var imgHost = globalData.imgHost;
	export default {
		components: {
			aloysTab,pop
		},
		data() {
			return {
				tabs: [{
						title: '入库审计'
					},
					{
						title: '入库登记'
					},
					{
						title: '入库明细'
					},
					{
						title: '入库统计'
					}
				],
				circular:true,
				direction: "right",
				SearchArray:[
					'商品名称','商品编码','商品描述','库存数量'
				],
				ConditionsId:0,
				GoodsList:[],
				page:1,
				last_page:1,
				onTabChangeValue:0,
				
				goods_data:[],
				skuDisabled:false,
				//库存审计
				GoodsStockAuditList:[],
				
				//库存明细
				GoodsStockList:[],
				stockLastPage:1,
				stockPage:1,
				stockSearchArray:[
					'商品名称','备注说明','操作类型','操作状态','库存数量'
				],
				stockSearchId:0,
				
				//统计报表
				StockCountTableList:{},
				
			}
		},
		onLoad() {
			console.log("载入加载1");
			this.GoodsList = [];
			// this.getGoodsList();
			this.GoodsStockAuditList = [];
			// this.getGoodsStockAudit();
			this.GoodsStockList = [];
		},
		onBackPress() {
			console.log("载入加载2");
			this.GoodsList = [];
			this.getGoodsList();
			this.GoodsStockAuditList = [];
			this.getGoodsStockAudit();
			this.GoodsStockList = [];
			this.getGoodsStockList();
		},
		onShow() {
			console.log("载入加载3");
			this.GoodsList = [];
			this.getGoodsList();
			this.GoodsStockAuditList = [];
			this.getGoodsStockAudit();
			this.GoodsStockList = [];
			this.getGoodsStockList();
		},
		
		//滚动页面促发
		onPageScroll(res) {
			var page = parseInt(this.page) + 1;
			var onTabChangeValue = this.onTabChangeValue;
			if(this.last_page > page && onTabChangeValue == 1){
				this.page = page;
				this.getGoodsList();
			}
			var stockPage = parseInt(this.stockPage) + 1;
			if(this.stockLastPage > stockPage && onTabChangeValue == 2){
				this.stockPage = stockPage;
				this.getGoodsStockList();
			}
		},
		//滚动到底促发
		onReachBottom(res) {
			console.log("滚动到低了",res)
			var page = parseInt(this.page) + 1;
			var onTabChangeValue = this.onTabChangeValue;
			if(this.last_page > page && onTabChangeValue == 1){
				this.page = page;
				this.getGoodsList();
			}
			
			var stockPage = parseInt(this.stockPage) + 1;
			if(this.stockLastPage > stockPage && onTabChangeValue == 2){
				this.stockPage = stockPage;
				this.getGoodsStockList();
			}
			
		},
		
		methods: {
			
			//搜索内容
			stockSearchForm:function(e){
				console.log("搜索内容",e)
				this.keywords = e.detail.value.keywords;
				this.GoodsStockList = [];
				this.getGoodsStockList();
			},
			//搜索条件
			stockSearchChange:function(e){
				var id = e.detail.value;
				this.stockSearchId = id;
			},
			//获取库存明细
			getGoodsStockList:function(){
				var that = this;
				var stockPage = that.stockPage;
				var keywords = that.keywords;
				if(!keywords){
					keywords = ''
				}
				var stockSearchId = that.stockSearchId;
				console.log("搜索的默认id",stockSearchId);
				var postValue = {}
				// '商品名称','备注说明','操作类型','操作状态','库存数量'
				if(keywords != ''){
					switch(stockSearchId){
						case 0:
						    postValue = {
								page:stockPage,
								Name:keywords,
							}
						break;
						case 1:
						    postValue = {
								page:stockPage,
								ReMark:keywords,
							}
						break;
						case 2:
						    postValue = {
								page:stockPage,
								Type:keywords,
							}
						break;
						case 3:
						    postValue = {
								page:stockPage,
								Status:keywords,
							}
						break;
						case 4:
						    postValue = {
								page:stockPage,
								Stock:keywords,
							}
						break;
					}
				}else{
					postValue = {
						page:stockPage
					}
				}
				console.log("提交的内容",postValue);
				app.request().postRequest(
					app.getNetAddresss('api/GoodsStock/getList'),
					postValue,
					{
						'content-type': 'application/x-www-form-urlencoded',
						'access_token': uni.getStorageSync('access_token'),
						'members_id': uni.getStorageSync('members_id'),
						'wx_token': uni.getStorageSync('wx_token')
					}
				).then(res => {
					if (res.code === 1) {
						console.log("获取到的商品数据为",res.result);
						let GoodsStockList = res.result;
						let data = GoodsStockList.data;
						that.GoodsStockList = [
							...that.GoodsStockList,...data
						];
						this.stockLastPage = GoodsStockList.last_page;
						this.stockPage = GoodsStockList.current_page;
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
			//商品直接入库,有审计
			GoodsInStock:function(input){
				console.log("提交的内容是",input);
				var id = input.currentTarget.id;
				var poostData = input.detail.value;
				poostData.id = id;
				app.request().postRequest(
					app.getNetAddresss('api/Goods/goodsStock'),
					poostData,
					{
						'content-type': 'application/x-www-form-urlencoded',
						'access_token': uni.getStorageSync('access_token'),
						'members_id': uni.getStorageSync('members_id'),
						'wx_token': uni.getStorageSync('wx_token')
					}
				).then(res => {
					if (res.code === 1) {
						uni.showModal({
							title:"温馨提示",
							content:res.msg,
							showCancel:false
						})
						this.GoodsList = [];
						this.getGoodsList();
						return;
					}
					else {
						uni.showToast({
							title: '温馨提醒：' + res.msg,
							icon: 'none',
							duration: 2000
						});
						return;
					}
				})
			},
			//搜索
			searchForm:function(input){
				console.log("搜索的内容是",input);
				var keywords = input.detail.value.keywords;
				this.keywords = keywords;
				this.page = 1;
				this.GoodsList = [];
				this.getGoodsList();
			},
			//确认入库
			gotoGoodsStockAudit(res){
				console.log("点击的内容",res);
				var that = this;
				var id = res.id;
				if(id){
					uni.showModal({
						title:"温馨提示",
						content:"是否要进行审核入库?",
						success(res) {
							console.log(res);
							if(res.confirm){
								//触发审核入库
								that.goodsAuditStock(id);
								return;
							}else{
								//取消
							}
						}
					})
				}else{
					uni.showModal({
						title:"温馨提示",
						content:"审计ID为空"
					})
				}
			},
			//入库审核
			goodsAuditStock(id){
				app.request().postRequest(
					app.getNetAddresss('api/Goods/goodsAuditStock'),
					{
						id:id
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
							title:"温馨提示",
							content:res.msg,
							showCancel:false
						})
						this.GoodsList = [];
						this.getGoodsList();
						this.GoodsStockAuditList = [];
						this.getGoodsStockAudit();
						return;
					}
					else {
						uni.showToast({
							title: '温馨提醒：' + res.msg,
							icon: 'none',
							duration: 2000
						});
						return;
					}
				})
			},
			//获取商品列表
			getGoodsList:function(){
				var that = this;
				var page = that.page;
				var keywords = that.keywords;
				if(!keywords){
					keywords = ''
				}
				app.request().postRequest(
					app.getNetAddresss('api/Goods/getList'),
					{
						page:page,
						searchContent:keywords,
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
			//获取统计列表
			getStockCountTableList:function(){
				var that = this;
				app.request().postRequest(
					app.getNetAddresss('api/GoodsStock/getCountTable'),
					{
						
					},
					{
						'content-type': 'application/x-www-form-urlencoded',
						'access_token': uni.getStorageSync('access_token'),
						'members_id': uni.getStorageSync('members_id'),
						'wx_token': uni.getStorageSync('wx_token')
					}
				).then(res => {
					if (res.code === 1) {
						console.log("获取到的数据为",res.result);
						that.StockCountTableList = res.result;
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
			//搜索条件
			SearchChange:function(e){
				var id = e.detail.value;
				this.ConditionsId = id;
			},
			
			//商品入库
			gotoGoodsInfo(goods_data){
				var that = this;
				console.log("点击到编辑",goods_data);
				let showCancel = false;
				console.log("规格的数量为",goods_data.has_many_sku.length)
				let sku_number = goods_data.has_many_sku.length;
				if(sku_number > 0){
					//有多规格不可以直接入库
					that.skuDisabled = true;
					showCancel = false;
				}else{
					//没有多规格可以入库
					that.skuDisabled = false;
					showCancel = true;
				}
				uni.showModal({
					cancelText:"直接入库",
					title:"请选择入库方式",
					confirmText:"规格入库",
					content:"不含规格的商品可直接入库，\r\n含规格的商品必须通过规格入库，不能直接入库！\r\n门店开启审计后，归属于这个门店的商品原规格库存入库需要审计，\r\n新规格库存无审计，寄存商品均无审计！",
					cancelColor:"#DD514C",
					showCancel:showCancel,
					success(res) {
						console.log("点击了",res);
						let confirm = res.confirm;
						that.goods_data = goods_data;
						if(confirm){
							//规格入库
							uni.navigateTo({
								url:"/goods/skuStock/skuStock?id=" + goods_data.id
							})
						}else{
							//直接入库
							that.$refs.pop.show();
						}
					}
				})
				// var id = res.currentTarget.id;
				// uni.navigateTo({
				// 	url:"/goods/edit/edit" + res
				// })
				//此处加跳转到入库或弹窗入库
				// uni.redirectTo({
				// 	url:"/goods/edit/edit?id=" + res
				// })
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
			// 库存操作类型：0=入库,1=销售,2=退货,3=调拨,4=寄存,5=损毁
			stockTypeText(value){
				switch(value){
					case 0:
						return '入库';
					case 1:
						return '销售';
					case 2:
						return '退货';
					case 3:
						return '调拨';
					case 4:
						return '寄存';
					case 5:
						return '损毁';
				}
			},
			//操作状态:0=已完成,1=进行中,2=待审核
			stockStatusText(value){
				switch(value){
					case 0:
						return '已完成';
					case 1:
						return '进行中';
					case 2:
						return '待审核';
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
			//滑动菜单促发事件
			onTabChange(res) {
				console.log("滑动菜单促发！！！onTabChange", res);
				this.onTabChangeValue = res;
				var onTabChangeValue = this.onTabChangeValue;
				
				//审计列表
				if(onTabChangeValue == 0){
					this.GoodsStockAuditList = [];
					this.getGoodsStockAudit();
				}
				
				//入库登记
				if(onTabChangeValue == 1){
					this.GoodsList = [];
					this.getGoodsList();
				}
				
				//库存明细
				if(onTabChangeValue == 2){
					this.GoodsStockList = [];
					this.getGoodsStockList();
				}
				
				//统计报表
				if(onTabChangeValue == 3){
					this.StockCountTableList = {};
					this.getStockCountTableList();
				}
				
			},
			//滚动到底部触发的事件
			reachchange(res){
				console.log("滚动到底部促发reachchange",res);
				var page = parseInt(this.page) + 1;
				var onTabChangeValue = this.onTabChangeValue;
				if(this.last_page >= page && onTabChangeValue == 1){
					this.page = page;
					this.getGoodsList();
				}
			},
			//审计状态
			StockAuditStatusText(status){
				var name = "未知";
				switch(status){
					case 0:
						name = "已完成";
						break;
					case 1:
						name = "进行中";
						break;
					case 2:
						name = "待审计";
						break;
				}
				return name;
			},
			//审计类型库存操作类型：0=入库,1=销售,2=退货,3=调拨,4=寄存,5=损毁
			StockAuditTypeText(Type){
				var name = "未知";
				switch(Type){
					case 0:
						name = "入库";
						break;
					case 1:
						name = "销售";
						break;
					case 2:
						name = "退货";
						break;
					case 3:
						name = "调拨";
						break;
					case 4:
						name = "寄存";
						break;
					case 5:
						name = "损毁";
						break;
				}
				return name;
			},
			//获取库存审计列表·
			getGoodsStockAudit(){
				var that = this;
				var page = that.page;
				var keywords = that.keywords;
				if(!keywords){
					keywords = ''
				}
				app.request().postRequest(
					app.getNetAddresss('api/Goods/getGoodsStockAudit'),
					{
						page:page,
						searchContent:keywords,
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
						that.GoodsStockAuditList = [
							...that.GoodsStockAuditList,...data
						];
						// this.last_page = Goods.last_page;
						// this.page = Goods.current_page;
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
		}
	}
</script>

<style>
	@import '/static/css/main.css';
	@import '/static/css/icon.css';
	.tabbar_toos{
		background-color: #FFFFFF;
		height: 200rpx;
		width: 93%;
		margin: 0 auto;
		margin-bottom: 20rpx;
		display: flex;
		flex-wrap: row nowrap;
		justify-content: center;
		box-shadow: 0 0.05rem 0.5rem 0.25rem rgba(80, 136, 230, 0.1);
	}
	.countlist{
		width: 100%;
		border-right: #999999  1px dotted;
		margin-left: 2rpx;
		padding: 10rpx;
		height: 140rpx;
		margin-top: 20rpx;
		flex-direction: column;
		text-align: center;
		line-height: 65rpx;
	}
	.border_none{
		border: none;
	}
	.text_top{
		color: #666666;
	}
	.text_end{
		color: #000000;
		font-size: 36rpx;
	}
	
	.content {
			position: absolute;
			height: 100%;
			/* background-color: #f1f5f8; */
		}
		.content-info{
			margin-top: 20rpx;
		}
		.none-images{
			margin: 250rpx auto 10rpx auto;
			text-align: center;
		}
		.no_images{
			width: 200rpx;
			height: 360rpx;
		}
		.no-text{
			text-align: center;
		}
		.button_submit{
			margin: 30rpx auto;
		}
		.cu-form-group{
			min-height: 90rpx;
		}
		.cu-form-group picker .picker{
			padding-left: 0rpx;
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
