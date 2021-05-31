<template>
	<view class="content">
		<aloys-tab :tabs="tabs" :circular="circular" @change="onTabChange">
			
			<view slot="content0" style="margin-top: 10rpx;">
				<view class="ContentItem">
					<view class="setting_box">
						<view class="item_box" :style="item.space ? 'margin-bottom: 20rpx' : ''" v-for="(item, index) in AssetMenu"
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
						<view hover-class="none" class="item_box" :style="item.space ? 'margin-bottom: 20rpx' : ''" v-for="(item, index) in LiabilitiesMenu"
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
					<view class="setting_box">
						<view hover-class="none" class="item_box" :style="item.space ? 'margin-bottom: 20rpx' : ''" v-for="(item, index) in CostMenu"
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
			
			<view slot="content3" style="margin-top: 10rpx;">
				<view class="ContentItem">
					<view class="setting_box">
						<view hover-class="none" class="item_box" :style="item.space ? 'margin-bottom: 20rpx' : ''" v-for="(item, index) in RightsMenu"
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
			
			<view slot="content4" style="margin-top: 10rpx;">
				<view class="ContentItem">
					<view class="setting_box">
						<view hover-class="none" class="item_box" :style="item.space ? 'margin-bottom: 20rpx' : ''" v-for="(item, index) in IncomeMenu"
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
			
		</aloys-tab>
		
	</view>
</template>

<script>
	//滑动菜单框架
	import aloysTab from '@/components/aloys-tab/aloys-tab.vue';
	const app = getApp();
	const mode = ['关闭', '省钱模式', '优选模式', '自选模式'];
	var globalData = app.globalData;
	var imgHost = globalData.imgHost;
	export default {
		components: {
			aloysTab
		},
		data() {
			return {
				tabs: [{
						title: '资产登记'
					},
					{
						title: '负债登记'
					},
					{
						title: '成本登记'
					},
					{
						title: '所有者权益'
					},
					{
						title: '损益类'
					}
				],
				circular:true,
				
				//资产类科目登记
				AssetMenu: [{
						name: '库存现金登记',
						status: '门店库存现金流登记',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '银行存款登记',
						status: '门店在银行内的存款',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '其他货币资金登记',
						status: '微信、支付宝货币资金',
						path: '',
						params: '',
						space: true
					},
					{
						name: '应收票据登记',
						status: '商业承兑汇票和银行承兑汇票',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '应收账款登记',
						status: '产品已发出，账款未收回',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '预付账款登记',
						status: '预付的货款、预付的购货定金',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '应收股利登记',
						status: '收到股利，记“银行存款,贷记本科目',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '应收利息登记',
						status: '企业因债券投资而应收取的利息',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '其他应收款登记',
						status: '备用金报销过剩登记的科目',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '材料采购登记',
						status: '采购材料买价和采购费用等',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '在途物资登记',
						status: '货款已付尚未验收入库的各种物资',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '原材料登记',
						status: '生产某种产品的基本原料',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '库存商品登记',
						status: '已完成全部生产过程并已验收入库',
						path: '',
						params: '',
						space: true
					},
					{
						name: '固定资产',
						status: '与生产经营活动有关的设备、工具等',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '累计折旧',
						status: '使用固定资产损耗导致价值减少仅余的残值',
						path: '',
						params: '',
						space: true
					},
					{
						name: '无形资产登记',
						status: '专利、证书、商标权、软件权等',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '累计摊销登记',
						status: '房租、水电费等借管理费用等贷本科目',
						path: '',
						params: '',
						space: true
					}
				],
				
				//负债类科目登记
				LiabilitiesMenu: [{
						name: '短期借款登记',
						status: '短期银行借款、现金借款等',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '应付票据登记',
						status: '采用汇票结算方式而发生的',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '应付账款登记',
						status: '因购买材料、商品等应支付的款项',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '预付账款登记',
						status: '预付的材料、货款预先支付的定金等',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '应付职工薪酬登记',
						status: '向职工支付工资、奖金、津贴等',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '应交税费登记',
						status: '对其经营所得依法缴纳的各种税费',
						path: '',
						params: '',
						space: true
					},
					{
						name: '应付利息登记',
						status: '属于借款，因借款产生应支付的利息',
						path: '',
						params: '',
						space: true
					},
					{
						name: '应付股利登记',
						status: '企业应付给投资者的利润',
						path: '',
						params: '',
						space: true
					},
					{
						name: '其他应付款登记',
						status: '其他应付给他人的款项',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '长期借款登记',
						status: '借款期限达到一年以上的借款',
						path: '',
						params: '',
						space: true
					},
					
					{
						name: '销售费用登记',
						status: '主营业务销售过程中产生的费用',
						path: '',
						params: '?Status=0',
						underline: true
					},
					{
						name: '管理费用登记',
						status: '门店管理过程中产生的管理费用',
						path: '',
						params: '?Status=1',
						underline: true
					},
					{
						name: '财务费用登记',
						status: '因记账、财务管理产生的费用',
						path: '',
						params: '?Status=2',
						underline: true
					},
					{
						name: '营业外费用支出',
						status: '主营业务以外的费用支出',
						path: '',
						params: '?Status=3',
						underline: true
					}
				], 
				
				//成本类科目登记
				CostMenu: [{
						name: '生产成本登记',
						status: '企业为生产产品而发生的成本',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '制造费用登记',
						status: '生产产品、劳务而发生的间接费用',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '劳务成本登记',
						status: '企业提供劳务作业而发生的成本',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '研发支出登记',
						status: '研发过程中产生的工资、租金等',
						path: '',
						params: '',
						space: true
					},
					
				], 
				
				//所有者权益科目登记
				RightsMenu: [{
						name: '实收资本登记',
						status: '投资者作为资本投入企业的各种财产',
						path: '',
						params: '',
						underline: true
					},{
						name: '资本公积登记',
						status: '接受捐赠、股本增值等形成的公积金',
						path: '',
						params: '',
						underline: true
					},{
						name: '盈余公积登记',
						status: '从税后利润中提取形成的',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '本年利润登记',
						status: '会计年度净利润（或净亏损）的登记',
						path: '',
						params: '',
						space: true
					},
					{
						name: '利润分配登记',
						status: '年度所实现的利润总额登记',
						path: '',
						params: '',
						underline: true
					},
				], 
				
				//损益类科目登记
				IncomeMenu: [{
						name: '主营业务收入',
						status: '生产经营活动所取得的营业收入',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '其他业务收入',
						status: '主营以外的其他活动所取得的收入',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '投资收益登记',
						status: '企业或个人对外投资所得的收入',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '营业外收入登记',
						status: '政府补助、合并损益、盘盈利得',
						path: '',
						params: '',
						space: true
					},
					{
						name: '主营业务成本',
						status: '企业销售商品等经营所发生的成本',
						path: '',
						params: '',
						underline: true
					},
					{
						name: '其他业务成本',
						status: '除主营以外的其他经营所发生的支出',
						path: '',
						params: '',
						space: true
					},
					{
						name: '税金及附加登记',
						status: '城市维护建设税和教育费附加等',
						path: '',
						params: '?Status=0',
						underline: true
					},
					{
						name: '销售费用登记',
						status: '门店销售过程中产生的销售费用',
						path: '',
						params: '?Status=1',
						underline: true
					},
					{
						name: '管理费用登记',
						status: '门店管理过程中产生的管理费用',
						path: '',
						params: '?Status=1',
						underline: true
					},
					{
						name: '财务费用登记',
						status: '因记账、财务管理产生的费用',
						path: '',
						params: '?Status=2',
						underline: true
					},
					{
						name: '营业外费用支出',
						status: '主营业务以外的费用支出',
						path: '',
						params: '?Status=3',
						underline: true
					},
					{
						name: '资产减值损失',
						status: '资产可回收额低于账面额造成的损失',
						path: '',
						params: '?Status=3',
						underline: true
					},
					{
						name: '所得税费用',
						status: '企业经营利润应交纳的所得税',
						path: '',
						params: '?Status=3',
						underline: true
					}
				], 
				
				more: imgHost + '/images/common/more.png',
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
