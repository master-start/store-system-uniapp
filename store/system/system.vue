<template>
	<view class="content">
		<aloys-tab :tabs="tabs" :circular="circular" @change="onTabChange">
			<view slot="content0" style="margin-top: 10rpx;">
				<view class="ContentItem">
					<view class="setting_box">
						<view class="item_box" :style="item.space ? 'margin-bottom: 20rpx' : ''" v-for="(item, index) in storeManage"
						 v-bind:key="index">
							<view class="setting_item" @click="goToPage(item.path+item.params)" :style="item.underline ? 'border-bottom: 1px solid #f4f4f4' : ''">
								<view class="left">{{ item.name }}</view>
								<view class="right">
									<view class="default">{{ item.status }}</view>
									<image :src="more"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view slot="content1" style="margin-top: 10rpx;">
				<view class="ContentItem">
					<view class="setting_box">
						<view hover-class="none" class="item_box" :style="item.space ? 'margin-bottom: 20rpx' : ''" v-for="(item, index) in customerManage"
						 v-bind:key="index">
							<view class="setting_item" @click="goToPage(item.path+item.params)" :style="item.underline ? 'border-bottom: 1px solid #f4f4f4' : ''">
								<view class="left">{{ item.name }}</view>
								<view class="right">
									<view class="default">{{ item.status }}</view>
									<image :src="more"></image>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			
			<view slot="content2" style="margin-top: 10rpx;">
				<view class="ContentItem">
					<view class="platfrom">
						<view class="server-box">
							<block v-for="(item, index) in memberManage" v-bind:key="index">
								<view class="sever-item">
									<view class="icon-img">
										<image :src="item.icon" />
										<image v-if="item.sub" :style="
												'width:' +
													item.width +
													';' +
													'height:' +
													item.height +
													';' +
													'top:' +
													item.top +
													';' +
													'left:' +
													item.left +
													';' +
													'position:absolute;'
											"
										 class="item_sub" :src="item.sub" />
									</view>
									<view class="item-name">{{ item.name }}</view>
								</view>
							</block>
						</view>
					</view>
					
					<view class="slide">
						<swiper class="swiper-wrapper" indicator-dots="false" indicator-color="rgba(255, 255, 255, .5)"
						 indicator-active-color="#EE523D" autoplay interval="3000" circular>
							<block v-for="(item, index) in slide_list" :key="item.id">
								<swiper-item class="swiper-item-wrapper">
									<image mode="widthFix" :src="item.thumb"></image>
								</swiper-item>
							</block>
						</swiper>
					</view>
					
				</view>
			</view>
		</aloys-tab>
		
	</view>
</template>

<script>
	//滑动菜单框架
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
						title: '门店管理'
					},
					{
						title: '客户管理'
					},
					{
						title: '员工管理'
					}
				],
				circular:true,
				storeManage: [{
						name: '连锁门店管理',
						status: '门店信息的编辑、停启用',
						path: '/store/list/list',
						params: '',
						underline: true
					},
					{
						name: '连锁总店管理',
						status: '连锁总店信息的编辑、设置',
						path: '/store/total/total',
						params: '',
						underline: true
					},
					{
						name: '门店收银配置',
						status: '收银方式的添加、编辑、排序',
						path: '/store/cashier/cashier',
						params: '',
						space: true
					},

					{
						name: '门店品牌管理',
						status: '产品品牌目录添加、编辑、排序',
						path: '/goods/brand/brand',
						params: '',
						underline: true
					},
					{
						name: '分类项目管理',
						status: '产品分类目录添加、编辑、排序',
						path: '/goods/category/category',
						params: '',
						underline: true
					},
					{
						name: '生产供应商管理',
						status: '生产供应商目录添加、编辑、排序',
						path: '/goods/production/production',
						params: '',
						space: true
					},
					{
						name: '门店产品管理',
						status: '产品的添加、编辑、上下架设置',
						path: '/goods/list/list',
						params: '',
						underline: true
					},
					{
						name: '添加门店产品',
						status: '产品添加、活动添加、图片添加',
						path: '/goods/add/add',
						params: '',
						space: true
					},
					{
						name: '活动优惠管理',
						status: '全场折扣、满额优惠、活动设置',
						path: '/store/marketing/marketing',
						params: '',
						underline: true
					},
					{
						name: '门店积分管理',
						status: '赠送积分规则、积分抵扣设置',
						path: '/store/integral/integral',
						params: '',
						space: true
					},
					{
						name: '优惠券的管理',
						status: '优惠券设置、发放、核销',
						path: '/store/coupon/coupon',
						params: '',
						underline: true
					},
					{
						name: '优惠券记录',
						status: '优惠券发放记录、使用和未使用记录',
						path: '/store/sendList/sendList',
						params: '',
						space: true
					},
					{
						name: '小票打印管理',
						status: '自动打印、手动打印、打印机配置',
						path: '/pages/setting/settingTips/settingTips',
						params: '',
						underline: true
					}
				],
				//客户管理
				customerManage: [{
						name: '门店客户管理',
						status: '门店消费登记客户信息管理',
						path: '/member/list/list',
						params: '',
						underline: true
					},
					{
						name: '新办门店客户',
						status: '门店顾客客户登记注册开卡',
						path: '/member/create/create',
						params: '',
						underline: true
					},
					{
						name: '会员卡类设置',
						status: '会员卡类型名称设置修改',
						path: '/member/userCardSet/userCardSet',
						params: '',
						underline: true
					},
					{
						name: '客户级别管理',
						status: '客户会员级别、折扣设置等',
						path: '/member/level/level',
						params: '',
						space: true
					},
					{
						name: '客户记额销售',
						status: '记额销售、充值、预存记额卡登记',
						path: '/member/amount/amount',
						params: '',
						underline: true
					},
					{
						name: '客户记次销售',
						status: '记次销售、充值、预存记次卡登记',
						path: '/member/times/times',
						params: '',
						space: true
					},
					{
						name: '咨询客户管理',
						status: '已咨询、咨询客户的登记受理',
						path: '/store/customer/customer',
						params: '?Status=0',
						underline: true
					},
					{
						name: '预约客户管理',
						status: '已预约、预约客户的登记受理',
						path: '/store/customer/customer',
						params: '?Status=1',
						underline: true
					},
					{
						name: '意向客户管理',
						status: '已转意向客户、客户的登记受理',
						path: '/store/customer/customer',
						params: '?Status=2',
						underline: true
					},
					{
						name: '合同客户管理',
						status: '合同客户期限查询、状态变更',
						path: '/store/customer/customer',
						params: '?Status=3',
						underline: true
					},
					{
						name: '合作客户管理',
						status: '合作客户期限查询、状态变更',
						path: '/store/customer/customer',
						params: '?Status=4',
						space: true
					},
					{
						name: '客户状态管理',
						status: '查看正常或即将、已到期客户信息',
						path: '/store/customer/status',
						params: '',
						space: true,
						underline: true
					}
				], 
				//员工管理
				memberManage: [{
						icon: imgHost + '/images/common/more.png',
						name: '角色管理',
						event: 'toService',
						sub: imgHost + '/images/common/convenient.png',
						top: '0',
						left: '0',
						width: '90rpx',
						height: '30rpx'
					},
					{
						icon: imgHost + '/images/common/more.png',
						name: '权限管理',
						event: 'toApply',
						sub: imgHost + '/images/common/then.png',
						top: '0',
						left: '0',
						width: '90rpx',
						height: '30rpx'
					},
					{
						icon: imgHost + '/images/common/more.png',
						name: '增加员工',
						event: 'toBilling' /*, sub: '/images/common/convenient.png', top: '0', left: '0',  width: '90rpx', height: '30rpx' */
					},
					{
						icon: imgHost + '/images/common/more.png',
						name: '员工管理',
						event: 'toJoinApply'
					},
					{
						icon: imgHost + '/images/common/more.png',
						name: '员工通知',
						event: 'toAboutDing' /*, sub: '/imgs/mine/down.png', top: '0', left: '0', width: '90rpx', height: '30rpx' */
					},
					{
						icon: imgHost + '/images/common/more.png',
						name: '工作管理',
						event: 'toAbout'
					},
					{
						icon: imgHost + '/images/common/more.png',
						name: '绩效提成',
						event: 'toAbout'
					},
					{
						icon: imgHost + '/images/common/more.png',
						name: '提成记录',
						event: 'toAbout'
					},
					{
						icon: imgHost + '/images/common/more.png',
						name: '发放薪酬',
						event: 'toAbout'
					},
					{
						icon: imgHost + '/images/common/more.png',
						name: '薪酬记录',
						event: 'toAbout'
					}
				],
				//更多图标
				more: imgHost + '/images/common/more.png',
				//轮播图数据
				slide_list: [],
			};
		},
		onLoad: function(options) {
			var that = this;
			this.slide_list = uni.getStorageSync('slide_list');
			console.log('缓存的幻灯片数据', this.slide_list);
		},
		methods: {
			//滑动菜单促发事件
			onTabChange(res) {
				console.log("onTabChange", res);
			},
			//跳转页面
			goToPage: function(url) {
				console.log('点击需要跳转的URL是', url);
				if (!url) return;
				uni.navigateTo({
					url: url
				})
			},
		}
	};
</script>

<style>
	@import '/static/css/main.css';
	@import '/static/css/icon.css';
	
	.content {
		position: absolute;
		height: 100%;
		background-color: #f1f5f8;
	}
	
	.ContentItem{
		width: 98%;
		margin: 20rpx auto;
	}


	/* 门店管理 */
	.storeMage {
		width: 96%;
		background-color: white;
		margin: 0rpx auto;
		border-radius: 10rpx;
		padding-bottom: 50rpx;
		padding-top: 10rpx;
		box-shadow: 0 0.05rem 0.5rem 0.25rem rgba(80, 136, 230, 0.1);
	}

	/* 员工管理 */
	.platfrom {
		margin: 0 auto;
		overflow: hidden;
	}

	.server-box {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
	}

	.sever-item {
		width: 48%;
		height: 120rpx;
		display: flex;
		align-items: center;
		background: #ffffff;
		border-radius: 10rpx;
		margin-bottom: 20rpx;
		position: relative;
	}

	.sever-item .icon-img {
		width: 48rpx;
		height: 48rpx;
		margin: 0 30rpx;
	}

	.sever-item .icon-img image {
		width: 100%;
		height: 100%;
	}

	.sever-item .item-name {
		font-size: 28rpx;
		color: #333;
	}

	/* 门店配置 */
	.item_box {
		background-color: #fff;
		box-sizing: border-box;
		padding: 0 20rpx;
	}

	.setting_item {
		height: 100rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
	}

	.left {
		font-size: 30rpx;
		color: #0e0e0e;
	}

	.right {
		display: flex;
		align-items: center;
	}

	.right .default {
		color: #7d7d7d;
		font-size: 26rpx;
		margin-right: 13rpx;
	}

	.right image {
		width: 48rpx;
		height: 48rpx;
	}

	/* 底部管理 */
	.button_submit {
		font-size: 1rem;
		width: auto;
		padding: 2rem;
		margin: 10rpx;
		text-align: center;
	}
	
	/* 幻灯片 */
	.slide{
		width: 100%;
	}
	/** 添加自定义button点击态样式类**/
	.other-button-hover {
		background-color: rgb(0, 167, 144);
	}
</style>
