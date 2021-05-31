<template>
	<!-- 入库、出库 -->
	<view class="content">
		<aloys-tab :tabs="tabs" :circular="circular" @change="onTabChange">
			<view slot="content0" style="margin-top: 10rpx;">
				<view class="content-info">
					<w-picker
						mode="selector"
						:value="StoreId"
						:options="StoreList"
						:default-props="StoreDataStyle"
						@confirm="onStoreList($event, 'selector')"
						@cancel="onCancel"
						ref="StoreListRef"
					></w-picker>
					<view class="ContentBackground">
						
						<view class="cu-form-group section">
							<view class="title">调入仓库：</view>
							<input type="text" disabled="true" name="StoreId" @tap="showPicker('StoreListRef')" placeholder="请选择入库门店" :value="StoreName" />
							<text class="cuIcon-unfold text-orange"></text>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">选择商品：</view>
							<input name="GoodsIds" type="text" placeholder="请选择需要调拨的商品" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">调出数量：</view>
							<input name="GoodsNumber" type="number" placeholder="请输入调出数量" />
						</view>
					
						<view class="button"><button class="btn1" hover-stay-time="3000" hover-class="button-hover" style="width:90%" formType="submit">提交库存调拨</button></view>
					</view>
				</view>
			</view>
			<view slot="content1">
				<view class="content-info">
					<view class="ContentBackground">
						<view>
								<view class="list">
									<view class="allot_list">
										<text class="nameKey">商品编号：</text>
										<text class="nameVal">21212213213</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">商品名称：</text>
										<text class="nameVal">发的是多少所得税法第三十</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">商品规格：</text>
										<text class="nameVal">件</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">调拨数量：</text>
										<text class="nameVal">1</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">操作人员：</text>
										<text class="nameVal">张三</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">调入机构：</text>
										<text class="nameVal">西宫第二分店</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">调拨时间：</text>
										<text class="nameVal">2020-04-23 15:05:03</text>
									</view>
								</view>
					
								<view class="list">
									<view class="allot_list">
										<text class="nameKey">商品编号：</text>
										<text class="nameVal">21212213213</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">商品名称：</text>
										<text class="nameVal">发的是多少所得税法第三十</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">商品规格：</text>
										<text class="nameVal">件</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">调拨数量：</text>
										<text class="nameVal">1</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">操作人员：</text>
										<text class="nameVal">张三</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">调入机构：</text>
										<text class="nameVal">西宫第二分店</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">调拨时间：</text>
										<text class="nameVal">2020-04-23 15:05:03</text>
									</view>
								</view>
					
								<view class="list">
									<view class="allot_list">
										<text class="nameKey">商品编号：</text>
										<text class="nameVal">21212213213</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">商品名称：</text>
										<text class="nameVal">发的是多少所得税法第三十</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">商品规格：</text>
										<text class="nameVal">件</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">调拨数量：</text>
										<text class="nameVal">1</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">操作人员：</text>
										<text class="nameVal">张三</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">调入机构：</text>
										<text class="nameVal">西宫第二分店</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">调拨时间：</text>
										<text class="nameVal">2020-04-23 15:05:03</text>
									</view>
								</view>
								<view class="list">
									<view class="allot_list">
										<text class="nameKey">商品编号：</text>
										<text class="nameVal">21212213213</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">商品名称：</text>
										<text class="nameVal">发的是多少所得税法第三十</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">商品规格：</text>
										<text class="nameVal">件</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">调拨数量：</text>
										<text class="nameVal">1</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">操作人员：</text>
										<text class="nameVal">张三</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">调入机构：</text>
										<text class="nameVal">西宫第二分店</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">调拨时间：</text>
										<text class="nameVal">2020-04-23 15:05:03</text>
									</view>
								</view>
					
								<view class="list">
									<view class="allot_list">
										<text class="nameKey">商品编号：</text>
										<text class="nameVal">21212213213</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">商品名称：</text>
										<text class="nameVal">发的是多少所得税法第三十</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">商品规格：</text>
										<text class="nameVal">件</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">调拨数量：</text>
										<text class="nameVal">1</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">操作人员：</text>
										<text class="nameVal">张三</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">调入机构：</text>
										<text class="nameVal">西宫第二分店</text>
									</view>
									<view class="allot_list">
										<text class="nameKey">调拨时间：</text>
										<text class="nameVal">2020-04-23 15:05:03</text>
									</view>
								</view>
						</view>
					</view>
				</view>
			</view>
			<view slot="content2">
				<view class="content-info">
					<view class="list">
						<view class="allot_list">
							<text class="nameKey">商品编号：</text>
							<text class="nameVal">21212213213</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">商品名称：</text>
							<text class="nameVal">发的是多少所得税法第三十</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">商品规格：</text>
							<text class="nameVal">件</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">调拨数量：</text>
							<text class="nameVal">1</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">操作人员：</text>
							<text class="nameVal">张三</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">调出机构：</text>
							<text class="nameVal">西宫第二分店</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">调拨时间：</text>
							<text class="nameVal">2020-04-23 15:05:03</text>
						</view>
					</view>
					
					<view class="list">
						<view class="allot_list">
							<text class="nameKey">商品编号：</text>
							<text class="nameVal">21212213213</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">商品名称：</text>
							<text class="nameVal">发的是多少所得税法第三十</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">商品规格：</text>
							<text class="nameVal">件</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">调拨数量：</text>
							<text class="nameVal">1</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">操作人员：</text>
							<text class="nameVal">张三</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">调出机构：</text>
							<text class="nameVal">西宫第二分店</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">调拨时间：</text>
							<text class="nameVal">2020-04-23 15:05:03</text>
						</view>
					</view>
					
					<view class="list">
						<view class="allot_list">
							<text class="nameKey">商品编号：</text>
							<text class="nameVal">21212213213</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">商品名称：</text>
							<text class="nameVal">发的是多少所得税法第三十</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">商品规格：</text>
							<text class="nameVal">件</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">调拨数量：</text>
							<text class="nameVal">1</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">操作人员：</text>
							<text class="nameVal">张三</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">调出机构：</text>
							<text class="nameVal">西宫第二分店</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">调拨时间：</text>
							<text class="nameVal">2020-04-23 15:05:03</text>
						</view>
					</view>
					<view class="list">
						<view class="allot_list">
							<text class="nameKey">商品编号：</text>
							<text class="nameVal">21212213213</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">商品名称：</text>
							<text class="nameVal">发的是多少所得税法第三十</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">商品规格：</text>
							<text class="nameVal">件</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">调拨数量：</text>
							<text class="nameVal">1</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">操作人员：</text>
							<text class="nameVal">张三</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">调出机构：</text>
							<text class="nameVal">西宫第二分店</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">调拨时间：</text>
							<text class="nameVal">2020-04-23 15:05:03</text>
						</view>
					</view>
					
					<view class="list">
						<view class="allot_list">
							<text class="nameKey">商品编号：</text>
							<text class="nameVal">21212213213</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">商品名称：</text>
							<text class="nameVal">发的是多少所得税法第三十</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">商品规格：</text>
							<text class="nameVal">件</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">调拨数量：</text>
							<text class="nameVal">1</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">操作人员：</text>
							<text class="nameVal">张三</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">调出机构：</text>
							<text class="nameVal">西宫第二分店</text>
						</view>
						<view class="allot_list">
							<text class="nameKey">调拨时间：</text>
							<text class="nameVal">2020-04-23 15:05:03</text>
						</view>
					</view>
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
	//下拉选择组件
	import wPicker from "@/components/w-picker/w-picker.vue";
	//滑动菜单组件
	import aloysTab from '@/components/aloys-tab/aloys-tab.vue';
	const app = getApp();
	const globalData = app.globalData;
	const imgHost = globalData.imgHost;
	export default {
		components: {
			aloysTab,wPicker
		},
		data() {
			return {
				tabs: [{
						title: '调拨出库'
					},
					{
						title: '调拨审计'
					},
					{
						title: '调出明细'
					},
					{
						title: '调出统计'
					}
				],
				circular:true,
				
				//门店
				StoreList: [], //数据源
				StoreId:"",
				StoreName:"",
				StoreDataStyle:{
					label: 'StoreName',
					value: 'Id',
					children: 'child'
				},
				
				//时间
				starttime: null, //支出时间
				years: null, //年月
			}
		},
		onLoad: function(options) {
			var that = this;
			this.slide_list = uni.getStorageSync('slide_list');
			console.log('缓存的幻灯片数据', this.slide_list);
			//载入时间
			that.changedate();
			//获取门店数据
			this.getStoreList();
		},
		methods: {
			
			//下拉弹窗
			showPicker(type) {
				this.$refs[type].show();
			},
			//取消选择
			onCancel() {},
			//门店选择
			onStoreList(res, type) {
				console.log("选择的门店信息为",res)
				this.StoreName = res.result;
				this.StoreId = res.value;
			},
			//门店数据
			getStoreList(){
				app.request().postRequest(
					app.getNetAddresss('api/store/getList'),
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
						this.StoreList = res.result;
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
			},
			// 时间
			changedate: function() {
				var that = this;
				var date = new Date();
				var year = date.getFullYear();
				var month = date.getMonth() + 1;
				var day = date.getDate();
				var time = year + '-' + month + '-' + day;
				var years = year + '-' + month;
				console.log('date', time);
				this.starttime = time;
				this.years = years;
			},
			bindDateChangestart: function(e) {
				console.log('starttime，携带值为', e.detail.value);
				this.starttime = e.detail.value;
			},
			
			bindDateChangestop: function(e) {
				console.log('years，携带值为', e);
				this.years = e.detail.value;
			},
			//设置下拉选中值
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value);
				this.channelindex = e.detail.value;
			},
		}
	}
</script>

<style>
	@import '/static/css/main.css';
	@import '/static/css/icon.css';
	.content-info{
		margin-top: 20rpx;
	}
	.content {
		position: absolute;
		height: 100%;
		background-color: #f1f5f8;
	}
	.header {
		display: flex;
		justify-content: center;
		align-content: center;
		padding: 0.5rem;
	}
	
	.header > view {
		height: 2.2rem;
		line-height: 2.2rem;
		/* width: 25%; */
		text-align: left;
		font-size: 31rpx;
	}
	
	.header > input {
		width: 72%;
		text-align: left;
		border: solid #d7d7d7 0.1pt;
		padding: 5pt;
		background: #ffffff;
	}
	.header > textarea {
		width: 72%;
		text-align: left;
		border: solid #d7d7d7 0.1pt;
		padding: 5pt;
		background: #ffffff;
	}
	.header > picker {
		width: 72%;
		text-align: left;
		border: solid #d7d7d7 0.1pt;
		padding: 5pt;
		background: #ffffff;
	}
	/* 明细列表 */
	.list {
		width: 95%;
		background-color: white;
		margin: 0rpx auto 20rpx auto;
		border-radius: 5rpx;
		padding-bottom: 10rpx;
		box-shadow: 0 0.05rem 0.5rem 0.25rem rgba(80, 136, 230, 0.1);
	}
	.allot_list {
		height: 2.2rem;
		line-height: 2.2rem;
		text-align: left;
		width: 95%;
		margin: 0rpx auto;
		border-bottom: solid 1rpx #eaeaea;
	}
	.allot_list .nameKey {
		width: 30%;
		text-align: left;
		height: 2.2rem;
		line-height: 2.2rem;
		font-size: 31rpx;
		color: #333;
	}
	.allot_list .nameVal {
		width: 65%;
		text-align: left;
		height: 2.2rem;
		line-height: 2.2rem;
		color: #666;
	}
</style>
