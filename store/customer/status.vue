<template>
	<view class="content">
		<aloys-tab :tabs="tabs" :circular="circular" @change="onTabChangeData">
			<view slot="content0" style="margin-top: 10rpx;">
				<view class="content-info">
					<view class="customer-search">
						<form @submit="searchFormSubmit">
							<view class="searchContent">
								<view class="form-search-input-view">
									<input class="form-search-input" type="text" name="searchContent" placeholder="请输入单位/姓名/手机号码/咨询项目进行搜索" />
								</view>
								<view class="form-search-button-view">
									<button class="form-search-button" type="warn" form-type="submit">搜索</button>
								</view>
							</view>
						</form>
					</view>
					<view class="customer-list-content">
						<view v-for="(item,index) in ExpiredList" :key="index" :id="item.id">
							<view class="c-list" :hover-class="hoverClass" @click="gotoNewCustomer" :id="item.id">
								<view class="c-list-title" v-if="item.UnitName">单位名称：{{item.UnitName}}</view>
								<view class="c-list-title">客户来源：{{getSorce(item.Sorce)}}</view>
								<view class="c-list-title" v-if="item.Name">客户姓名：{{item.Name}}</view>
								<view class="c-list-title">客户性别：{{getSex(item.Sex)}}</view>
								<view class="c-list-title" v-if="item.Mobile">手机号码：{{item.Mobile}}</view>
								<view class="c-list-title" v-if="item.Address">客户地址：{{item.Address}}</view>
								<view class="c-list-title" v-if="item.AskTime">咨询时间：{{item.AskTime}}</view>
								<view class="c-list-title" v-if="item.ProjectDesc">咨询项目：{{item.ProjectDesc}}</view>
								<view class="c-list-title" v-if="item.Content">沟通内容：{{item.Content}}</view>
								<view class="c-list-title" v-if="item.ApmTime">预约时间：{{item.ApmTime}}</view>
								<view class="c-list-title" v-if="item.IntTime">意向时间：{{item.IntTime}}</view>
								<view class="c-list-title" v-if="item.StartTime">签约时间：{{item.StartTime}}</view>
								<view class="c-list-title" v-if="item.StopTime">结束时间：{{item.StopTime}}</view>
								<view class="c-list-title" v-if="item.ContractAmount">合同金额：{{item.ContractAmount}}</view>
								<view class="c-list-title" v-if="item.RenewalAmount">续费金额：{{item.RenewalAmount}}</view>
								<view class="c-list-title" v-if="item.ContractContent">合同内容：{{item.ContractContent}}</view>
								<view class="c-list-title" v-if="item.Remark">备注信息：{{item.Remark}}</view>
								<view class="c-list-title" v-if="item.has_one_manager.Name">受理人员：{{item.has_one_manager.Name}} {{item.has_one_manager.Mobile}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view slot="content1">
				<view class="content-info">
					<view class="customer-search">
						<form @submit="searchFormSubmit">
							<view class="searchContent">
								<view class="form-search-input-view">
									<input class="form-search-input" type="text" name="searchContent" placeholder="请输入单位/姓名/手机号码/咨询项目进行搜索" />
								</view>
								<view class="form-search-button-view">
									<button class="form-search-button" type="warn" form-type="submit">搜索</button>
								</view>
							</view>
						</form>
					</view>
					<view class="customer-list-content">
						<view v-for="(item,index) in ExpiredsList" :key="index" :id="item.id">
							<view class="c-list" :hover-class="hoverClass" @click="gotoNewCustomer" :id="item.id">
								<view class="c-list-title" v-if="item.UnitName">单位名称：{{item.UnitName}}</view>
								<view class="c-list-title">客户来源：{{getSorce(item.Sorce)}}</view>
								<view class="c-list-title" v-if="item.Name">客户姓名：{{item.Name}}</view>
								<view class="c-list-title">客户性别：{{getSex(item.Sex)}}</view>
								<view class="c-list-title" v-if="item.Mobile">手机号码：{{item.Mobile}}</view>
								<view class="c-list-title" v-if="item.Address">客户地址：{{item.Address}}</view>
								<view class="c-list-title" v-if="item.AskTime">咨询时间：{{item.AskTime}}</view>
								<view class="c-list-title" v-if="item.ProjectDesc">咨询项目：{{item.ProjectDesc}}</view>
								<view class="c-list-title" v-if="item.Content">沟通内容：{{item.Content}}</view>
								<view class="c-list-title" v-if="item.ApmTime">预约时间：{{item.ApmTime}}</view>
								<view class="c-list-title" v-if="item.IntTime">意向时间：{{item.IntTime}}</view>
								<view class="c-list-title" v-if="item.StartTime">签约时间：{{item.StartTime}}</view>
								<view class="c-list-title" v-if="item.StopTime">结束时间：{{item.StopTime}}</view>
								<view class="c-list-title" v-if="item.ContractAmount">合同金额：{{item.ContractAmount}}</view>
								<view class="c-list-title" v-if="item.RenewalAmount">续费金额：{{item.RenewalAmount}}</view>
								<view class="c-list-title" v-if="item.ContractContent">合同内容：{{item.ContractContent}}</view>
								<view class="c-list-title" v-if="item.Remark">备注信息：{{item.Remark}}</view>
								<view class="c-list-title" v-if="item.has_one_manager.Name">受理人员：{{item.has_one_manager.Name}} {{item.has_one_manager.Mobile}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view slot="content2">
				<view class="content-info">
					<view class="customer-search">
						<form @submit="searchFormSubmit">
							<view class="searchContent">
								<view class="form-search-input-view">
									<input class="form-search-input" type="text" name="searchContent" placeholder="请输入单位/姓名/手机号码/咨询项目进行搜索" />
								</view>
								<view class="form-search-button-view">
									<button class="form-search-button" type="warn" form-type="submit">搜索</button>
								</view>
							</view>
						</form>
					</view>
					<view class="customer-list-content">
						<view v-for="(item,index) in DeactivedList" :key="index" :id="item.id">
							<view class="c-list" :hover-class="hoverClass" @click="gotoNewCustomer" :id="item.id">
								<view class="c-list-title" v-if="item.UnitName">单位名称：{{item.UnitName}}</view>
								<view class="c-list-title">客户来源：{{getSorce(item.Sorce)}}</view>
								<view class="c-list-title" v-if="item.Name">客户姓名：{{item.Name}}</view>
								<view class="c-list-title">客户性别：{{getSex(item.Sex)}}</view>
								<view class="c-list-title" v-if="item.Mobile">手机号码：{{item.Mobile}}</view>
								<view class="c-list-title" v-if="item.Address">客户地址：{{item.Address}}</view>
								<view class="c-list-title" v-if="item.AskTime">咨询时间：{{item.AskTime}}</view>
								<view class="c-list-title" v-if="item.ProjectDesc">咨询项目：{{item.ProjectDesc}}</view>
								<view class="c-list-title" v-if="item.Content">沟通内容：{{item.Content}}</view>
								<view class="c-list-title" v-if="item.ApmTime">预约时间：{{item.ApmTime}}</view>
								<view class="c-list-title" v-if="item.IntTime">意向时间：{{item.IntTime}}</view>
								<view class="c-list-title" v-if="item.StartTime">签约时间：{{item.StartTime}}</view>
								<view class="c-list-title" v-if="item.StopTime">结束时间：{{item.StopTime}}</view>
								<view class="c-list-title" v-if="item.ContractAmount">合同金额：{{item.ContractAmount}}</view>
								<view class="c-list-title" v-if="item.RenewalAmount">续费金额：{{item.RenewalAmount}}</view>
								<view class="c-list-title" v-if="item.ContractContent">合同内容：{{item.ContractContent}}</view>
								<view class="c-list-title" v-if="item.Remark">备注信息：{{item.Remark}}</view>
								<view class="c-list-title" v-if="item.has_one_manager.Name">受理人员：{{item.has_one_manager.Name}} {{item.has_one_manager.Mobile}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
			<view slot="content3">
				<view class="content-info">
					<view class="customer-search">
						<form @submit="searchFormSubmit">
							<view class="searchContent">
								<view class="form-search-input-view">
									<input class="form-search-input" type="text" name="searchContent" placeholder="请输入单位/姓名/手机号码/咨询项目进行搜索" />
								</view>
								<view class="form-search-button-view">
									<button class="form-search-button" type="warn" form-type="submit">搜索</button>
								</view>
							</view>
						</form>
					</view>
					<view class="customer-list-content">
						<view v-for="(item,index) in NormalList" :key="index" :id="item.id">
							<view class="c-list" :hover-class="hoverClass" @click="gotoNewCustomer" :id="item.id">
								<view class="c-list-title" v-if="item.UnitName">单位名称：{{item.UnitName}}</view>
								<view class="c-list-title">客户来源：{{getSorce(item.Sorce)}}</view>
								<view class="c-list-title" v-if="item.Name">客户姓名：{{item.Name}}</view>
								<view class="c-list-title">客户性别：{{getSex(item.Sex)}}</view>
								<view class="c-list-title" v-if="item.Mobile">手机号码：{{item.Mobile}}</view>
								<view class="c-list-title" v-if="item.Address">客户地址：{{item.Address}}</view>
								<view class="c-list-title" v-if="item.AskTime">咨询时间：{{item.AskTime}}</view>
								<view class="c-list-title" v-if="item.ProjectDesc">咨询项目：{{item.ProjectDesc}}</view>
								<view class="c-list-title" v-if="item.Content">沟通内容：{{item.Content}}</view>
								<view class="c-list-title" v-if="item.ApmTime">预约时间：{{item.ApmTime}}</view>
								<view class="c-list-title" v-if="item.IntTime">意向时间：{{item.IntTime}}</view>
								<view class="c-list-title" v-if="item.StartTime">签约时间：{{item.StartTime}}</view>
								<view class="c-list-title" v-if="item.StopTime">结束时间：{{item.StopTime}}</view>
								<view class="c-list-title" v-if="item.ContractAmount">合同金额：{{item.ContractAmount}}</view>
								<view class="c-list-title" v-if="item.RenewalAmount">续费金额：{{item.RenewalAmount}}</view>
								<view class="c-list-title" v-if="item.ContractContent">合同内容：{{item.ContractContent}}</view>
								<view class="c-list-title" v-if="item.Remark">备注信息：{{item.Remark}}</view>
								<view class="c-list-title" v-if="item.has_one_manager.Name">受理人员：{{item.has_one_manager.Name}} {{item.has_one_manager.Mobile}}</view>
							</view>
						</view>
					</view>
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
						title: '即将到期'
					},
					{
						title: '已到期'
					},
					{
						title: '已失效'
					},
					{
						title: '正常客户'
					}
				],
				circular:true,
				ExpiredList:[], //即将过期
				ExpiredsList:[], //已过期
				DeactivedList:[], //已停用
				NormalList:[], //正常客户
				
				searchContent:'',
				onTabChange:0,
				
				last_page:1,
				page:1,
			}
		},
		onPullDownRefresh(res) {
			var page = parseInt(this.page) + 1;
			if(this.last_page >= page){
				this.page = page;
				var onTabChange = this.onTabChange;
				this.getDataList(onTabChange);
			}
		},
		onPageScroll(res) {
			var page = parseInt(this.page) + 1;
			if(this.last_page >= page){
				this.page = page;
				var onTabChange = this.onTabChange;
				this.getDataList(onTabChange);
			}
		},
		onReachBottom(res) {
			var page = parseInt(this.page) + 1;
			if(this.last_page >= page){
				this.page = page;
				var onTabChange = this.onTabChange;
				this.getDataList(onTabChange);
			}
		},
		onLoad(e) {
			console.log("载入的数据为",e);
			var status = e.Status;
			this.onTabChange = status;
			this.getDataList(0);
		},
		methods: {
			//滑动菜单促发事件
			onTabChangeData(res) {
				console.log("onTabChange", res);
				this.onTabChange = res;
				this.getDataList(res);
				this.page = 1;
			},
			
			getDataList(onTabChange){
				var searchContent = this.searchContent;
				var page = this.page;
				var that = this;
				app.request().postRequest(
					app.getNetAddresss('api/Customer/Status'),
					{
						searchContent:searchContent,
						page:page,
						onTabChange:onTabChange,
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
						console.log("获取到的列表数据为",res);
						var data = res.result.data;
						that.last_page = res.result.last_page;
						if(onTabChange == 0){
							that.ExpiredList = [
								...that.ExpiredList,...data
							];
						}
						if(onTabChange == 1){
							that.ExpiredsList = [
								...that.ExpiredsList,...data
							];
						}
						if(onTabChange == 2){
							that.DeactivedList = [
								...that.DeactivedList,...data
							];
						}
						if(onTabChange == 3){
							that.NormalList = [
								...that.NormalList,...data
							];
							console.log("正常客户获取到的数据为",that.NormalList);
						}
						
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
			
			gotoNewCustomer(res){
				console.log("点击做跳转",res)
				uni.redirectTo({
					url:"./edit?id=" + res.currentTarget.id,
				})
			},
			
			searchFormSubmit(input){
				console.log("搜索输入的内容是",input)
				var searchContent = input.detail.value.searchContent;
				if(!searchContent){
					uni.showToast({
						title:"搜索内容不能为空",
					})
					return;
				}
				var that = this;
				that.page = 1;
				var onTabChange = that.onTabChange;
				if(onTabChange == 0){
					that.ExpiredList = [];
				}
				if(onTabChange == 1){
					that.ExpiredsList = [];
				}
				if(onTabChange == 2){
					that.DeactivedList = [];
				}
				if(onTabChange == 3){
					that.NormalList = [];
				}
				that.searchContent = searchContent;
				that.getDataList(onTabChange);
			},
			
			getSex(value){
				if(value == 0){
					return '男';
				}else{
					return '女';
				}
			},
			//获取来源
			getSorce(value){
				if(value == 0){
					return '附近路过'
				}
				if(value == 1){
					return '朋友顾客介绍'
				}
				if(value == 2){
					return '线上查询'
				}
				if(value == 3){
					return '业务员'
				}
				if(value == 4){
					return '其他'
				}
			},
		}
	}
</script>

<style>
@import '/static/css/main.css';
	@import '/static/css/icon.css';
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
	.cu-form-group picker .picker{
		padding-left: 0rpx;
	}
	.content {
		position: absolute;
		height: 100%;
		/* background-color: #f1f5f8; */
	}
	.content-info{
		margin-top: 20rpx;
	}
	.picker-text{
		color: #6c6b6c;
		font-size: 28rpx;
	}
	.hide_view{
		display: none;
	}
	.block_view{
		display: block;
	}
	.button_submit{
		margin: 50rpx auto;
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
		background-color: #fee4e4;
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
