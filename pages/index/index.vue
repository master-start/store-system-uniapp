<template>
	<view>
		<!-- 登录登录信息 -->
		<view class='header'>
			<!-- 用户通知 名称 -->
<!-- 			<view class='header_user'>
				<text v-if="username">欢迎，业务员：{{username}}!</text>
				<text class='icon-14 iconfont icon-icon-tongzhi' style='display:none'></text>
			</view> -->
			<!-- 数据统计 -->
			<view class='header_statistics'>
				<view class='header_main'>
					<view>{{homeDataNumberOrder}}</view>
					<view>今日客户</view>
				</view>
				<view class='header_main'>
					<view>{{homeDataNumberTermainal}}</view>
					<view>今日金额</view>
				</view>
				<view class='header_main'>
					<view>{{homeDataNumberMoney}}</view>
					<view>今日盈亏</view>
				</view>
				<view class='header_main'>
					<view>{{homeDataNumberFire}} </view>
					<view>本月盈亏</view>
				</view>
			</view>
		</view>

		<!--
		  indicator-dots: 是否显示面板指示点
		  indicator-color: 指示点颜色
		  indicator-active-color: 当前选中的指示点颜色
		  autoplay: 是否自动切换
		  interval: 自动切换时间间隔
		  circular: 是否采用衔接滑动
		-->
		<swiper class="swiper-wrapper" indicator-dots="false" indicator-color="rgba(255, 255, 255, .5)"
		 indicator-active-color="#EE523D" autoplay interval="3000" circular>
			<block v-for="(item, index) in swiperList" :key="item.id">
				<swiper-item class="swiper-item-wrapper">
					<image mode="widthFix" :src="item.thumb"></image>
				</swiper-item>
			</block>
		</swiper>
		<!-- buttom click -->
		<view class='but-main'>
			<view class='but-list' data-url="getsystem" @click="buttonClick">
				<view class='click_icon'>
					<image :src="iconUrl + 'images/icon/zhongduan.png'"></image>
				</view>
				<view>系统管理</view>
			</view>

			<view class='but-list' data-url="getsell" @click="buttonClick">
				<!-- <view class='icon-14 iconfont icon-dingdan3'></view> -->
				<view class='click_icon'>
					<image :src="iconUrl + 'images/icon/xiaoshou.png'"></image>
				</view>
				<view>接待销售</view>
			</view>

			<view class='but-list' data-url="getcost" @click="buttonClick">
				<view class='click_icon'>
					<image :src="iconUrl + 'images/icon/zhichu.png'"></image>
				</view>
				<view>记账管理</view>
			</view>

			<view class='but-list' data-url="getrepertory" @click="buttonClick">
				<view class='click_icon'>
					<image :src="iconUrl + 'images/icon/ruku.png'"></image>
				</view>
				<view>商品入库</view>
			</view>

			<view class='but-list' data-url="getallot" @click="buttonClick">
				<view class='click_icon'>
					<image :src="iconUrl + 'images/icon/diaobo.png'"></image>
				</view>
				<view>调拨出库</view>
			</view>

			<view class='but-list' data-url="getcheck" @click="buttonClick">
				<view class='click_icon'>
					<image :src="iconUrl + 'images/icon/pandian.png'"></image>
				</view>
				<view>库存盘点</view>
			</view>

			<view class='but-list' data-url="sellreport" @click="buttonClick">
				<view class='click_icon'>
					<image :src="iconUrl + 'images/icon/baobiao.png'"></image>
				</view>
				<view>销售报表</view>
			</view>

			<view class='but-list' data-url="costreport" @click="buttonClick">
				<view class='click_icon'>
					<image :src="iconUrl + 'images/icon/feiyong.png'"></image>
				</view>
				<view>费用报表</view>
			</view>

			<view class='but-list' data-url="getwater" @click="buttonClick">
				<view class='click_icon'>
					<image :src="iconUrl + 'images/icon/liushui.png'"></image>
				</view>
				<view>流水记录</view>
			</view>

		</view>
		<!-- 底部导航组件 -->
		<foot :footCopyRightTime="footCopyRightTime" :footVersion="footVersion"></foot>
	</view>
</template>

<script>
	import foot from "../../components/foot.vue"
	const app = getApp({allowDefault: true})
	const globalData = app.globalData;
	export default {
		data() {
			return {
				//首页统计数据
				homeDataNumberOrder: 0,
				homeDataNumberTermainal: 0,
				homeDataNumberMoney: 0,
				homeDataNumberFire: 0,
				// 轮播图数据
				swiperList: [],
				iconUrl: globalData.imgHost,
				autoplay: true,
				interval: 5000,
				//其他配置
				username:'',
				duration: 1000,
				footCopyRightTime: 2010,
				footVersion:'v' + globalData.version,
			};
		},
		components: {
			foot
		},
		onLoad: function(e) {
			console.log("页面初始化执行一次 onLoad",e)
			this.getDataList();
			this.changedate();
		},
		onShow:function(e){
			console.log("页面初始化执行一次 onShow",e)
		},
		methods: {
			// 时间
			changedate: function() {
				var date = new Date();
				var year = date.getFullYear();
				this.footCopyRightTime = year;
			},
			//获取幻灯片数据
			getDataList: function() {
				var that = this;
				var access_token = uni.getStorageSync('access_token');
				var members_id = uni.getStorageSync('members_id');
				console.log("请求的URL是" + app.getNetAddresss('api/ads/index'))
				app.request().postRequest(app.getNetAddresss('api/ads/index'), {
					'members_id': members_id
				}, {
					'content-type': 'application/x-www-form-urlencoded',
					'access_token': access_token
				}).then(res => {
					console.log('幻灯片广告列表数据为', res);
					if (res.code === 1) {
						var result = res.result.data;
						this.swiperList = result;
						uni.setStorage({
							key:'slide_list',
							data:this.swiperList,
							success:function(){
								console.log('slide_list缓存成功',result)
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
			},
			buttonClick: function(event) {
				var target = event.currentTarget.dataset.url;
				console.log("点中的功能按钮" + target)
				switch (target) {
					case "getsystem":
						uni.navigateTo({
							url: '/store/system/system',
						})
						break;
					case "getsell":
						uni.switchTab({
							url:"/pages/sales/sales",
						})
						break;
					case "getcost":
						uni.navigateTo({
							url: '/member/cost/cost',
						})
						break;
					case "getrepertory":
						uni.navigateTo({
							url: '/goods/repertory/repertory',
						})
						break;
					case "getallot":
						uni.navigateTo({
							url: '/goods/transfers/transfers',
						})
						break;
					case "getcheck":
						uni.navigateTo({
							url: '/goods/stockCheck/stockCheck',
						})
						break;
					case "sellreport":
						uni.navigateTo({
							url: '/store/sellRePort/sellRePort',
						})
						break;
					case "costreport":
						uni.navigateTo({
							url: '/store/costRePort/costRePort',
						})
						break;
					case "getwater":
						uni.navigateTo({
							url: '/store/water/water',
						})
						break;
					default:
						uni.showToast({
							title: '未知事件',
							icon: "cancel",
							duration: 3000,
						})
						break;
				}
			},
			
		}
	}
</script>

<style lang="scss">
	.header {
		background: #69C3AA;
		color: #fff;
		min-height: 5.5rem;
	}

	.header_user {
		line-height: 1rem;
		font-size: 1rem;
		padding: 0.6rem 0.5rem;
	}

	.header_statistics {
		display: flex;
		justify-content: center;
		align-content: center;
		font-size: 0.8rem;
		padding: 0.5rem 0 0.5rem 0;
	}

	.header_main {
		display: flex;
		font-size: 1rem;
		font-weight: bold;
		justify-content: center;
		align-content: center;
		flex-wrap: wrap;
		width: 33.3333%;
		padding: 0.5rem;
	}

	.header_main>view {
		width: 100%;
		text-align: center;
	}

	.header_main>view:first-child {
		font-size: 1rem;
		line-height: 1.5rem;
	}
	swiper {
	  background: #fff;
	  padding: 0;
	  margin: 0;
	  box-shadow: 0 0.05rem 0.5rem 0.25rem rgba(80, 136, 230, 0.1);
	}
	swiper-item{
	  display: flex;
	  flex-direction: column;
	}
	.s-main {
		display: flex;
		justify-content: center;
		align-content: center;
		font-size: 0.7rem;
	}

	.slide-image {
		width: 100%;
		max-width: 100%;
	}

	.s-image {
		width: 35%;
		margin: 3%;
		overflow: hidden;
	}

	.s-value {
		width: 60%;
		line-height: 2rem;
	}

	.but-main {
		display: flex;
		justify-content: center;
		align-content: center;
		flex-wrap: wrap;
		padding-top: 1rem;
	}

	.but-list {
		width: 25%;
		margin: .65rem;
		padding: .65rem;
		text-align: center;
		position: relative;
		background: #fff;
		padding-bottom: 0.5rem;
		border-radius: 0.25rem;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-right: 2rpx solid rgba(0, 134, 96, 0.534);
		border-bottom: 2rpx solid #69C3AA;
		box-sizing: border-box;
		box-shadow: 0 0.05rem 0.5rem 0.25rem rgba(14, 180, 152, 0.123);
	}

	.but-list>.iconfont {
		width: 2rem;
		height: 2rem;
		margin: auto;
		line-height: 2rem;
		background: #83a1e3;
		color: #fff;
		border-radius: 100%;
		border: 0.1rem solid #f0f0f0;
	}

	.server_kf {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		line-height: 2.5rem;
		opacity: 0;
	}
</style>
