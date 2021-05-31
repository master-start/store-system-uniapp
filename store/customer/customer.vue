<template>
	<view class="content">
		<aloys-tab :tabs="tabs" :circular="circular" @change="onTabChange">
		
			<view slot="content0">
				<form @submit="addFormSubmit">
					<view class="content-info">
					<view class="cu-form-group section">
						<view class="title">客户状态：</view>
						<picker @change="StatusChange" header-text="请选择客户状态" :range="StatusArray">
						  <view class="picker">
						      当前选择：{{StatusArray[Status]}}
						  </view>
						</picker>
					</view>
					
					<view :class="Status0">
						<view class="cu-form-group section">
							<view class="title">咨询时间：</view>
							<picker mode="date" fields='day' :value="AskTime" name="AskTime" :start="startDate" :end="endDate" @change="AskTimeChange">
								  <view class="picker-text">{{AskTimeText}}</view>
							 </picker>
							<text class="cuIcon-unfold text-orange"></text>
						</view>
					</view>
					
					<view :class="Status1">
					<view class="cu-form-group section">
						<view class="title">预约时间：</view>
						<picker mode="date" :value="ApmTime" name="ApmTime" :start="startDate" :end="endDate" @change="ApmTimeChange">
						      <view class="picker-text">{{ApmTimeText}}</view>
						 </picker>
						<text class="cuIcon-unfold text-orange"></text>
					</view>
					</view>
					
					<view :class="Status2">
					<view class="cu-form-group section">
						<view class="title">意向时间：</view>
						<picker mode="date" :value="IntTime" name="IntTime" :start="startDate" :end="endDate" @change="IntTimeChange">
						      <view class="picker-text">{{IntTimeText}}</view>
						 </picker>
						<text class="cuIcon-unfold text-orange"></text>
					</view>
					</view>
					
					<view :class="Status3">
						<view class="cu-form-group section">
							<view class="title">合同金额：</view>
							<input type="digit" name="ContractAmount" placeholder="请输入客户合同金额" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">续费金额：</view>
							<input type="digit" name="RenewalAmount" placeholder="请输入客户续费金额" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">合同内容：</view>
							<textarea auto-height="true" placeholder="请输入合同内容" name="ContractContent"></textarea>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">合同时间：</view>
							<picker mode="date" :value="StartTime" name="StartTime" :start="startDate" :end="endDate" @change="StartTimeChange">
								  <view class="picker-text">{{StartTimeText}}</view>
							 </picker>
							<text class="cuIcon-unfold text-orange"></text>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">结束时间：</view>
							<picker mode="date" :value="StopTime" name="StopTime" :start="startDate" :end="endDate" @change="StopTimeChange">
								  <view class="picker-text">{{StopTimeText}}</view>
							 </picker>
							<text class="cuIcon-unfold text-orange"></text>
						</view>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">单位名称：</view>
						<input type="text" name="UnitName" placeholder="请输入单位名称" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">客户姓名：</view>
						<input type="text" name="Name" placeholder="请输入客户姓名" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">所在行业：</view>
						<input type="text" disabled="true" name="industry" @tap="showPicker('industryLink')" placeholder="请选择所属行业" :value="Industryresult" />
						<w-picker
							mode="linkage"
							:value="IndustryDefaultValue"
							:options="IndustryDataList"
							:level="2"
							default-type="id"
							:default-props="defaultProps1"
							@confirm="onIndustry($event, 'linkage')"
							@cancel="onCancel"
							ref="industryLink"
						></w-picker>
						<text class="cuIcon-unfold text-orange"></text>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">咨询项目：</view>
						<input type="text" name="ProjectDesc" placeholder="请输入客户咨询项目" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">客户性别：</view>
						<radio-group class="switch-group" @change="SexRadioChange">
							<view class="swtich-label" name="Sex" v-for="(ite, inx) in SexList" :key="inx">
								<radio :value="ite.value" name="Sex" :checked="ite.checked" />
								<text>{{ ite.name }}</text>
							</view>
						</radio-group>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">手机号码：</view>
						<input type="number" name="Mobile" placeholder="请输入客户手机号码" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">联系电话：</view>
						<input type="text" name="Tel" placeholder="请输入客户联系电话" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">选择城市：</view>
						<input type="text" disabled="true" name="area" @tap="showPicker('linkage')" placeholder="请选择省市区" :value="cityResult" />
						<w-picker
							mode="linkage"
							:value="defaultCity"
							:options="CityOptions"
							:level="3"
							default-type="id"
							:default-props="defaultProps1"
							@confirm="onConfirm($event, 'linkage')"
							@cancel="onCancel"
							ref="linkage"
						></w-picker>
						<text class="cuIcon-unfold text-orange"></text>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">客户地址：</view>
						<input type="text" name="Address" placeholder="请输入客户地址" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">客户来源：</view>
						<picker @change="SorceChange" header-text="请选择客户来源" :range="SorceArray">
						  <view class="picker">
						      当前选择：{{SorceArray[Sorce]}}
						  </view>
						</picker>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">沟通内容：</view>
						<textarea auto-height="true" placeholder="请输入与客户合作沟通的内容" name="Content"></textarea>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">备注内容：</view>
						<textarea auto-height="true" placeholder="请输入客户备注内容" name="Remark"></textarea>
					</view>
					
					<view class="button_submit"><button type="primary" form-type="submit">提交</button></view>
					
				</view>
				</form>
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
						<view v-for="(item,index) in CustomerList" :key="index" :id="item.id">
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

	//多选组件
	import wPicker from '@/components/w-picker/w-picker.vue';
	//滑动菜单组件
	import aloysTab from '@/components/aloys-tab/aloys-tab.vue';
	const app = getApp();
	var globalData = app.globalData;
	var imgHost = globalData.imgHost;
	export default {
		components: {
			aloysTab,wPicker
		},
		data() {
			return {
				hoverClass:'hoverClass',
				startDate:'2010-01-01',
				endDate:'2080-01-01',
				
				StartTime:'',
				StopTime:'',
				AskTime:'',
				ApmTime:'',
				IntTime:'',
				
				StartTimeText:'请选择合同开始时间',
				StopTimeText:'请选择合同结束时间',
				AskTimeText:'请选择咨询时间',
				ApmTimeText:'请选择预约时间',
				IntTimeText:'请选择意向时间',
				
				Status0:'block_view',
				Status1:'hide_view',
				Status2:'hide_view',
				Status3:'hide_view',
				Status4:'hide_view',
				Status5:'hide_view',
				
				StatusLoad:0,
				StatusName:'咨询',
				
				tabs: [
					{
						title: '新增客户'
					},
					{
						title: '客户管理'
					},
				],
				circular:true,
				
				Sex:'0', //单选
				SexList:[
					{ name: '男', value: '0', checked: true }, 
					{ name: '女', value: '1', checked: false },
				],
				
				StatusArray:['咨询客户','预约客户','意向客户','正式客户','合作客户'],
				Status:0,
				
				SorceArray:['附近路过','朋友顾客介绍','线上查询','业务员','其他'],
				Sorce:0,
				//城市
				defaultCity: ['310000', '310100', '310101'],
				CityOptions: [], //数据源
				cityResult: '', //选择的城市文本
				//下拉数据样本
				defaultProps1: {
					label: 'name',
					value: 'id',
					children: 'child'
				},
				
				//行业
				Industryresult:'',
				IndustryDefaultValue: ['1', '7'],
				IndustryDataList:[],
				
				//用户列表
				CustomerList:[],
				page:1,
				last_page:1,
				onTabChangeValue:0,
				searchContent:'',
				
			}
		},
		onLoad(e) {
			console.log("载入的数据",e)
			let Status = e.Status;
			if(Status){
				this.StatusLoad = Status;
				console.log("设置的状态为",this.StatusLoad);
				if(Status == 1){
					this.StatusName = '预约';
				}
				if(Status == 2){
					this.StatusName = '意向';
				}
				if(Status == 3){
					this.StatusName = '正式';
				}
				if(Status == 4){
					this.StatusName = '合作';
				}
				
				this.Status = Status;
				if(Status == 0){
					//显示咨询时间
					this.Status0 = 'block_view';
					this.Status1 = 'hide_view';
					this.Status2 = 'hide_view';
					this.Status3 = 'hide_view';
					this.Status4 = 'hide_view';
				}
				if(Status == 1){
					//显示预约时间
					this.Status0 = 'hide_view';
					this.Status1 = 'block_view';
					this.Status2 = 'hide_view';
					this.Status3 = 'hide_view';
					this.Status4 = 'hide_view';
				}
				if(Status == 2){
					//显示意向时间
					this.Status0 = 'hide_view';
					this.Status1 = 'hide_view';
					this.Status2 = 'block_view';
					this.Status3 = 'hide_view';
					this.Status4 = 'hide_view';
				}
				if(Status == 3 || Status == 4){
					//显示合同金额、续费金额、合同内容、合同开始时间、合同结束时间
					this.Status0 = 'hide_view';
					this.Status1 = 'hide_view';
					this.Status2 = 'hide_view';
					this.Status3 = 'block_view';
					this.Status4 = 'hide_view';
				}
				
			}
			this.tabs = [
				{
					title: '新增'+ this.StatusName +'客户'
				},
				{
					title: this.StatusName + '客户管理'
				}
			];
			this.getArea();
			this.getIndustry();
			this.getCustomerList();
		},
		onPullDownRefresh(res) {
			var page = parseInt(this.page) + 1;
			var onTabChangeValue = this.onTabChangeValue;
			if(this.last_page >= page && onTabChangeValue == 1){
				this.page = page;
				this.getCustomerList();
			}
		},
		onPageScroll(res) {
			var page = parseInt(this.page) + 1;
			var onTabChangeValue = this.onTabChangeValue;
			if(this.last_page >= page && onTabChangeValue == 1){
				this.page = page;
				this.getCustomerList();
			}
		},
		onReachBottom(res) {
			console.log("滚动到低了",res)
			var page = parseInt(this.page) + 1;
			var onTabChangeValue = this.onTabChangeValue;
			if(this.last_page >= page && onTabChangeValue == 1){
				this.page = page;
				this.getCustomerList();
			}
		},
		
		methods: {
			gotoNewCustomer(res){
				console.log("点击做跳转",res)
				uni.navigateTo({
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
				var page = that.page;
				that.CustomerList = [];
				that.searchContent = searchContent;
				app.request().postRequest(
					app.getNetAddresss('api/Customer/getList'),
					{
						page:page,
						Status:that.StatusLoad,
						searchContent:searchContent,
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
						that.CustomerList = [
							...that.CustomerList,...data
						];
						var CustomerList = that.CustomerList;
						console.log("获取到的列表2222数据为",CustomerList);
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
			getCustomerList:function(){
				var searchContent = this.searchContent;
				var page = this.page;
				var that = this;
				app.request().postRequest(
					app.getNetAddresss('api/Customer/getList'),
					{
						searchContent:searchContent,
						page:page,
						Status:that.StatusLoad,
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
						that.CustomerList = [
							...that.CustomerList,...data
						];
						var CustomerList = that.CustomerList;
						console.log("获取到的列表2222数据为",CustomerList);
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
			//新增客户登记
			addFormSubmit(input){
				var that = this;
				let postData = input.detail.value;
				console.log("获取到城市id",that.defaultCity)
				console.log("获取到行业文本",that.Industryresult)
				postData.Status = that.Status;
				postData.Sorce = that.Sorce;
				
				let IndustryDefaultValue = that.IndustryDefaultValue; //行业id
				let maxId = IndustryDefaultValue[0]; //行业id大类
				let minId = IndustryDefaultValue[1]; //行业id大类
				postData.IndustryIdMax = maxId;
				postData.IndustryIdMin = minId;
				
				let defaultCity = that.defaultCity; //区域
				postData.ProvinceId = defaultCity[0];
				postData.CityId = defaultCity[1];
				postData.AreaId = defaultCity[2];
				console.log("获取到的input",postData)
				app.request().postRequest(app.getNetAddresss('api/Customer/create'),
				postData,
				{
					'content-type': 'application/x-www-form-urlencoded'
				}).then(res => {
					if (res.code === 1) {
						uni.showModal({
							showCancel:false,
							title:"操作提示",
							content:res.msg,
							success:function(res){
								//调用成功刷新数据
								uni.redirectTo({
									url:"/store/customer/customer"
								})
							}
						})
						return;
					}else {
							uni.showToast({
								title: '温馨提醒：' + res.msg,
								icon: 'none',
								duration: 2000
							})
							return;
						}
					})
			},
			AskTimeChange(res){
				this.AskTime = res.detail.value;
				this.AskTimeText = res.detail.value;
			},
			ApmTimeChange(res){
				this.ApmTime = res.detail.value;
				this.ApmTimeText = res.detail.value;
			},
			IntTimeChange(res){
				this.IntTime = res.detail.value;
				this.IntTimeText = res.detail.value;
			},
			StopTimeChange(res){
				this.StopTime = res.detail.value;
				this.StopTimeText = res.detail.value;
			},
			StartTimeChange(res){
				this.StartTime = res.detail.value;
				this.StartTimeText = res.detail.value;
			},
			//行业选择
			onIndustry(res, type) {
				this.Industryresult = res.result;
				this.IndustryDefaultValue = res.value;
			},
			//获取行业数据
			getIndustry() {
				let that = this;
				let access_token = uni.getStorageSync('access_token');
				let wx_token = uni.getStorageSync('wx_token');
				let members_id = uni.getStorageSync('members_id');
				app.request()
					.postRequest(
						app.getNetAddresss('mag/static/Industry'),
						{
							members_id: members_id
						},
						{
							'content-type': 'application/x-www-form-urlencoded',
							'access_token': access_token,
							'wx_token': wx_token
						}
					)
					.then(res => {
						if (res.code === 1) {
							let result = res.result;
							console.log('所属行业列表数据为', result);
							this.IndustryDataList = result;
						} else {
							uni.showToast({
								title: '温馨提醒：' + res.msg,
								icon: 'none',
								duration: 2000
							});
						}
					});
			},
			
			//省市区选择
			onConfirm(res, type) {
				console.log("选择res的内容是",res.result);
				console.log("选择城市id的内容是",res.value);
				this.cityResult = res.result;
				this.defaultCity = res.value;
			},
			getArea: function() {
				let that = this;
				uni.showLoading({
				    title: '加载中'
				});
				let access_token = uni.getStorageSync('access_token');
				let wx_token = uni.getStorageSync('wx_token');
				let members_id = uni.getStorageSync('members_id');
				app.request()
					.postRequest(
						app.getNetAddresss('mag/static/getRegion'),
						{
							members_id: members_id
						},
						{
							'content-type': 'application/x-www-form-urlencoded',
							access_token: access_token,
							wx_token: wx_token
						}
					)
					.then(res => {
						if (res.code === 1) {
							let data = res.result;
							// console.log('省市区列表数据为', result);
							this.CityOptions = data;
							uni.hideLoading();
						} else {
							uni.showToast({
								title: '温馨提醒：' + res.msg,
								icon: 'none',
								duration: 2000
							});
						}
					});
			},
			onCancel() {},
			//弹框
			showPicker(type) {
				this.$refs[type].show();
			},
			//客户来源
			SorceChange(res){
				var value = res.detail.value;
				this.Sorce = value;
			},
			//客户状态
			StatusChange:function(res){
				var Status = res.detail.value;
				this.Status = Status;
				if(Status == 0){
					//显示咨询时间
					this.Status0 = 'block_view';
					this.Status1 = 'hide_view';
					this.Status2 = 'hide_view';
					this.Status3 = 'hide_view';
					this.Status4 = 'hide_view';
				}
				if(Status == 1){
					//显示预约时间
					this.Status0 = 'hide_view';
					this.Status1 = 'block_view';
					this.Status2 = 'hide_view';
					this.Status3 = 'hide_view';
					this.Status4 = 'hide_view';
				}
				if(Status == 2){
					//显示意向时间
					this.Status0 = 'hide_view';
					this.Status1 = 'hide_view';
					this.Status2 = 'block_view';
					this.Status3 = 'hide_view';
					this.Status4 = 'hide_view';
				}
				if(Status == 3 || Status == 4){
					//显示合同金额、续费金额、合同内容、合同开始时间、合同结束时间
					this.Status0 = 'hide_view';
					this.Status1 = 'hide_view';
					this.Status2 = 'hide_view';
					this.Status3 = 'block_view';
					this.Status4 = 'hide_view';
				}
			},
			//性别选择
			SexRadioChange(res){
				this.Sex = res.detail.value;
			},
			//滑动菜单促发事件
			onTabChange(res) {
				console.log("onTabChange", res);
				this.onTabChangeValue = res;
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
