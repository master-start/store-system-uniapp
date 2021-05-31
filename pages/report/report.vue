<template>
	<view class="content">
		<aloys-tab :tabs="tabs" :circular="circular" @change="onTabChange">
			<view slot="content0" style="margin-top: 10rpx;">
				<view class="content-info">
					<view class="record">
						<view>账户</view>
						<view>本月数(元)</view>
						<view>本年累计数(元)</view>
					</view>
					<view class="record">
						<view>一、营业收入</view>
						<view class="monthclass">50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view class="record class">减：营业成本</view>
						<view>50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view class="record class">减：税金及附加</view>
						<view>50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view class="record class">减：销售费用</view>
						<view>50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view class="record class">减：管理费用</view>
						<view>50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view class="record class">减：财务费用</view>
						<view>50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view class="record class">减：资产减值准备</view>
						<view>50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view>二、营业利润</view>
						<view class="monthclass">50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view class="record class">加：营业外收入</view>
						<view>50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view class="record class">减：营业外支出</view>
						<view>50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view>三、利润总额</view>
						<view class="monthclass">50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view class="record class">减：所得税费用</view>
						<view>50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view>四、净利润</view>
						<view class="monthclass">50</view>
						<view>5000</view>
					</view>
				</view>
			</view>
			<view slot="content1">
				<view class="content-info">
							<view class="record">
								<view>资产</view>
								<view>本月数(元)</view>
								<view>本年累计数(元)</view>
							</view>
						
							<view class="record">
								<view class="monthclass">货币资金</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">短期投资</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">应收利息</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">应收账款</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">其他应收款</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">预付账款</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">存货</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">待摊费用</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">其他流动资产</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">流动资产合计</view>
								<view>50</view>
								<view>5000</view>
							</view>
							
							
							<view class="record">
								<view class="monthclass">固定资产原价</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">减：累计折旧</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">固定资产净值</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">固定资产合计</view>
								<view>50</view>
								<view>5000</view>
							</view>
							
							<view class="record">
								<view class="monthclass">非流动资产合计</view>
								<view>50</view>
								<view>5000</view>
							</view>
							
							<view class="record">
								<view class="monthclass">资产总计</view>
								<view>50</view>
								<view>5000</view>
							</view>
							
							<view class="record">
								<view>负债所有者权益</view>
								<view>本月数(元)</view>
								<view>本年累计数(元)</view>
							</view>
							
							
							<view class="record">
								<view class="monthclass">短期借款</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">应付利息</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">应交税费</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">应付职工薪酬</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">应付票据</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">应付账款</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">预收账款</view>
								<view>50</view>
								<view>5000</view>
							</view>
							
							<view class="record">
								<view class="monthclass">其他应付款</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">流动资产合计</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">长期借款</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">负债合计</view>
								<view>50</view>
								<view>5000</view>
							</view>
					
							<view class="record">
								<view class="monthclass">实收资本</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">资本公积</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">盈余公积</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">未分配利润</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">所有者权益合计</view>
								<view>50</view>
								<view>5000</view>
							</view>
							<view class="record">
								<view class="monthclass">负债及所有者权益总计</view>
								<view>50</view>
								<view>5000</view>
							</view>
				</view>
			</view>
			<view slot="content2">
				<view class="content-info">
					<view class="record">
						<view>账户</view>
						<view>本月数(元)</view>
						<view>本年累计数(元)</view>
					</view>
					<view class="record">
						<view>一、流入金额</view>
						<view class="monthclass">50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view class="record class">营收收到的现金</view>
						<view>50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view class="record class">收到的税费返还</view>
						<view>50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view class="record class">其他营收的现金</view>
						<view>50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view>二、流出金额</view>
						<view class="monthclass">50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view class="record class">消费支出的现金</view>
						<view>50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view class="record class">支付薪酬的现金</view>
						<view>50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view class="record class">购建固定资产现金</view>
						<view>50</view>
						<view>5000</view>
					</view>
					<view class="record">
						<view>剩余现金量</view>
						<view class="monthclass">50</view>
						<view>5000</view>
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
						title: '利润报表'
					},
					{
						title: '资产报表'
					},
					{
						title: '现金报表'
					},
					{
						title: '库存报表'
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
		//记录
		.record{
			display: flex;
			flex-direction: column;
			flex-wrap: nowrap;//不换行
			flex-flow: row;
			justify-content: center;
			border-bottom: solid 2rpx #D7D7D7;
			width: 95%;
			overflow: hidden;
			margin: 0 auto;
			border-radius: 15rpx;
		}
		.record>view{
			width: 33%;
			line-height: 60rpx;
			background: white;
			padding: 10rpx;
			justify-content: center; //对齐方式
		}
		.record .class{
			padding-left: 80rpx;
			width: 48%;
			justify-content: left;
		}
		.record .monthclass{
			justify-content: right;
		}

</style>
