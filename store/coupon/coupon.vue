<template>
	<view class="content">
		<aloys-tab :tabs="tabs" :circular="circular" @change="onTabChange">
			<view slot="content0" style="margin-top: 10rpx;">
				<view class="content-info">
					
					<view class="cu-form-group section">
						<view class="title">全局使用限制：</view>
						<radio-group class="switch-group" @change="IsSingletonRadioChange">
							<view class="swtich-label" name="IsSingleton" v-for="(ite, inx) in IsSingleton_Data" :key="inx">
								<radio :value="ite.value" name="IsSingleton" :checked="ite.checked" />
								<text>{{ ite.name }}</text>
							</view>
						</radio-group>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">抵扣奖励积分：</view>
						<radio-group class="switch-group" @change="AwardPointRadioChange">
							<view class="swtich-label" name="AwardPoint" v-for="(ite, inx) in AwardPoint_Data" :key="inx">
								<radio :value="ite.value" name="AwardPoint" :checked="ite.checked" />
								<text>{{ ite.name }}</text>
							</view>
						</radio-group>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">是否开启优惠券：</view>
						<radio-group class="switch-group" @change="IsCouponRadioChange">
							<view class="swtich-label" name="IsCoupon" v-for="(ite, inx) in IsCoupon_Data" :key="inx">
								<radio :value="ite.value" name="IsCoupon" :checked="ite.checked" />
								<text>{{ ite.name }}</text>
							</view>
						</radio-group>
					</view>
				</view>
			</view>
			<view slot="content1">
				<form @submit="addCouponForm">
					<view class="content-info">
					
					<view class="cu-form-group section">
						<view class="title">优惠券展示排序：</view>
						<input type="number" name="Sort" value="1" placeholder="请输入排序数字" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">是否开启优惠券：</view>
						<radio-group class="switch-group" @change="StatusRadioChange">
							<view class="swtich-label" name="Status" v-for="(ite, inx) in Status_Data" :key="inx">
								<radio :value="ite.value" name="Status" :checked="ite.checked" />
								<text>{{ ite.name }}</text>
							</view>
						</radio-group>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">优惠券展示名称：</view>
						<input type="text" name="Name" placeholder="请输入优惠券名称" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">优惠券描述说明：</view>
						<input type="text" name="Description" placeholder="请输入优惠券描述" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">是否隐藏优惠券：</view>
						<radio-group class="switch-group" @change="Is_HideRadioChange">
							<view class="swtich-label" name="Is_Hide" v-for="(ite, inx) in Is_Hide_Data" :key="inx">
								<radio :value="ite.value" name="Is_Hide" :checked="ite.checked" />
								<text>{{ ite.name }}</text>
							</view>
						</radio-group>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">优惠券使用条件：</view>
						<input type="digit" name="Enough" placeholder="请输入使用条件 - 订单金额" />
						<view style="margin-right: 20rpx;">元</view>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">优惠券使用方式：</view>
						<radio-group class="switch-group" @change="CouponMethodRadioChange">
							<view class="swtich-label" name="CouponMethod" v-for="(ite, inx) in CouponMethod_Data" :key="inx">
								<radio :value="ite.value" name="CouponMethod" :checked="ite.checked" />
								<text>{{ ite.name }}</text>
							</view>
						</radio-group>
					</view>
					
					<view :class="default_class">
						<view class="cu-form-group section">
							<view class="title">{{CouponMethodTitle}}：</view>
							<input type="digit" name="discount" :placeholder="CouponMethodValue" />
							<view style="margin-right: 20rpx;">{{CouponMethodUnit}}</view>
						</view>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">会员级别限制：</view>
						<picker @change="UserLevelChange" header-text="请选择使用条件-会员级别"  :range="UserLevelArray">
						  <view class="picker">
						      使用条件：{{UserLevelArray[UserLevelChangeId]}}
						  </view>
						</picker>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">优惠券适用范围：</view>
						<picker @change="UseTypeChange" header-text="请选择适用范围" :range="UseTypeArray">
						  <view class="picker">
						      当前选择：{{UseTypeArray[UseType]}}
						  </view>
						</picker>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">是否可领取券：</view>
						<radio-group class="switch-group" @change="GetTypeRadioChange">
							<view class="swtich-label" name="GetType" v-for="(ite, inx) in GetType_Data" :key="inx">
								<radio :value="ite.value" name="GetType" :checked="ite.checked" />
								<text>{{ ite.name }}</text>
							</view>
						</radio-group>
					</view>
					
					<view class="cu-form-group section">
						<view class="title">每人限领张数：</view>
						<input type="number" name="GetMax" :value="GetMax" placeholder="请输入每人限领张数" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">总计发放总数：</view>
						<input type="number" name="Total" value="1" placeholder="请输入总计发放总数" />
					</view>
					
					<view class="cu-form-group section">
						<view class="title">优惠券期限限制：</view>
						<radio-group class="switch-group" @change="TimeLimitRadioChange">
							<view class="swtich-label" name="TimeLimit" v-for="(ite, inx) in TimeLimit_Data" :key="inx">
								<radio :value="ite.value" name="TimeLimit" :checked="ite.checked" />
								<text>{{ ite.name }}</text>
							</view>
						</radio-group>
					</view>
					
					<view :class="TimeLimit_class0">
						<view class="cu-form-group section">
							<view class="title">优惠券使用天数：</view>
							<input type="number" name="TimeDays" placeholder="获得优惠券*天内有效(0为不限时间使用)" />
							<view style="margin-right: 20rpx;">天</view>
						</view>
					</view>
					<w-picker
						mode="date"
						:startYear="startYear"
						:endYear="endYear"
						:fields="fields"
						:value="TimeStart"
						:current="current"
						@confirm="TimeStartChange($event, 'TimeStartDate')"
						@cancel="onCancel"
						ref="TimeStartDate"
					></w-picker>
					
					<w-picker
						mode="date"
						:startYear="startYear"
						:endYear="endYear"
						:fields="fields"
						:value="TimeEnd"
						:current="current"
						@confirm="TimeEndChange($event, 'TimeEndDate')"
						@cancel="onCancel"
						ref="TimeEndDate"
					></w-picker>
					
					<view :class="TimeLimit_class1">
						<view class="cu-form-group section">
							<view class="title">优惠券开始时间：</view>
							<input type="text" disabled="true" name="TimeStart" @tap="showPicker('TimeStartDate')" placeholder="请选择优惠券开始时间" :value="TimeStart" />
							<text class="cuIcon-unfold text-orange"></text>
						</view>
						<view class="cu-form-group section">
							<view class="title">优惠券结束时间：</view>
							<input type="text" disabled="true" name="TimeEnd" @tap="showPicker('TimeEndDate')" placeholder="请选择优惠券结束时间" :value="TimeEnd" />
							<text class="cuIcon-unfold text-orange"></text>
						</view>
					</view>
					
					<view class="button_submit"><button type="warn" form-type="submit">提 交</button></view>
					
					
				</view>
				</form>
			</view>
			<view slot="content2">
				<view class="content-info">
					<view class="customer-search">
						<form @submit="searchFormSubmit">
							<view class="searchContent">
								<view class="form-search-input-view">
									<input class="form-search-input" type="text" name="searchContent" placeholder="请输入优惠券名称/描述进行搜索" />
								</view>
								<view class="form-search-button-view">
									<button class="form-search-button" type="warn" form-type="submit">搜索</button>
								</view>
							</view>
						</form>
					</view>
					<view class="customer-list-content">
							<view v-for="(item,index) in CouponList" :key="index" :id="item.id">
								<view class="c-list" :hover-class="hoverClass" @click="gotoNewCoupon" :id="item.id">
									<view class="c-list-title" v-if="item.Name">优惠券名称：{{item.Name}}</view>
									<view class="c-list-title" v-if="item.Sort">优惠券排序：{{item.Sort}}</view>
									<view class="c-list-title" v-if="item.Description">优惠券描述：{{item.Description}}</view>
									<view class="c-list-title" v-if="item.Enough">券使用条件：{{item.Enough}}元</view>
									<view class="c-list-title">优惠方式：{{CouponMethodName(item.CouponMethod)}}</view>
									<view class="c-list-title" v-if="item.discount">权益内容：{{item.discount}}</view>
									<view class="c-list-title">适用范围：{{UseTypeName(item.UseType)}}</view>
									<view class="c-list-title" v-if="item.GetMax">每人限领张数：{{item.GetMax}}</view>
									<view class="c-list-title" v-if="item.Total">优惠券总张数：{{item.Total}}</view>
									<view class="c-list-title" v-if="item.IssueTotal">已发放总张数：{{item.IssueTotal}}</view>
									<view class="c-list-title" v-if="item.UseTotal">已使用总张数：{{item.UseTotal}}</view>
									<view class="c-list-title">优惠券状态：{{StatusName(item.Status)}}</view>
									<view class="c-list-title">是否可领取：{{GetTypeName(item.GetType)}}</view>
								</view>
							</view>
						</view>
					
				</view>
			</view>
			<view slot="content3">
				<view class="content-info">
					<w-picker
						mode="date"
						:startYear="startYear"
						:endYear="endYear"
						:fields="fields"
						:value="TimeEnd"
						:current="current"
						@confirm="SendTimeChange($event, 'SendTime')"
						@cancel="onCancel"
						ref="SendTime"
					></w-picker>
					<w-picker
						mode="selector"
						:value="SendCoupon"
						:options="SendCouponData"
						default-type="id"
						:default-props="defaultProps"
						@confirm="SendCouponChange($event, 'SendCoupon')"
						@cancel="onCancel"
						ref="SendCoupon"
					></w-picker>
					<form @submit="sendFormData">
					<view class="cu-form-group section">
						<view class="title">发放类型：</view>
						<radio-group class="switch-group" @change="sendTypeRadioChange">
							<view class="swtich-label" name="sendType" v-for="(ite, inx) in sendType_Data" :key="inx">
								<radio :value="ite.value" name="sendType" :checked="ite.checked" />
								<text>{{ ite.name }}</text>
							</view>
						</radio-group>
					</view>
					
						<view :class="send_class1">
						<!-- 定时全量发放 -->
						<view class="cu-form-group section">
							<view class="title">定时发放时间：</view>
							<input type="text" disabled="true" name="SendTime" @tap="showPicker('SendTime')" placeholder="请选择优惠券发放时间" :value="SendTime" />
							<text class="cuIcon-unfold text-orange"></text>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">发放会员对象：</view>
							<picker @change="UserLevelChange" header-text="请选择发放会员级别"  :range="UserLevelArray">
							  <view class="picker">
							      当前选择：{{UserLevelArray[UserLevelChangeId]}}
							  </view>
							</picker>
						</view>
						
						
						<view class="cu-form-group section">
							<view class="title">发放的优惠券：</view>
							<input type="text" disabled="true" name="SendCoupon" @tap="showPicker('SendCoupon')" placeholder="请选择需要发放的优惠券" :value="SendCouponText" />
							<text class="cuIcon-unfold text-orange"></text>
						</view>
						<view class="button_submit"><button type="primary" form-type="submit">提 交</button></view>
						
						
					</view>
					
					<view :class="send_class2">
						<!-- 发放给单个用户 -->
						<view class="cu-form-group section">
							<view class="title">定时发放时间：</view>
							<input type="text" disabled="true" name="SendTime" @tap="showPicker('SendTime')" placeholder="请选择优惠券发放时间" :value="SendTime" />
							<text class="cuIcon-unfold text-orange"></text>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">客户手机号码：</view>
							<input type="number" name="Mobile" placeholder="请输入客户手机号码" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">发放的优惠券：</view>
							<input type="text" disabled="true" name="SendCoupon" @tap="showPicker('SendCoupon')" placeholder="请选择需要发放的优惠券" :value="SendCouponText" />
							<text class="cuIcon-unfold text-orange"></text>
						</view>
						
						<view class="button_submit"><button type="primary" form-type="submit">提 交</button></view>
						
		
					</view>
					</form>
					<view class="button_submit"><button type="default" @click="gotoSendCouponList">查看优惠券发送记录</button></view>
					
				</view>
			</view>
		</aloys-tab>
	</view>
</template>

<script>
	//下拉组件
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
				startYear:2020,
				endYear:2060,
				TimeStart:'',
				TimeEnd:'',
				fields:"second",
				current:true,
				tabs: [{
						title: '优惠券设置'
					},
					{
						title: '添加优惠券'
					},
					{
						title: '优惠券管理'
					},
					{
						title: '发放优惠券'
					}
				],
				circular:true,
				//适用范围：0=,1=,2=,3=指定门店,4=指定品牌
				UseTypeArray:['全类适用','指定分类','指定商品','指定门店','指定品牌'],
				UseType:0,
				
				TimeLimit_Data:[
					{ name: '天数限制', value: '0', checked: true }, 
					{ name: '日期限制', value: '1', checked: false }, 
				],
				TimeLimit:0,
				TimeLimit_class0:"block_view",
				TimeLimit_class1:"hide_view",
				
				
				IsCoupon_Data:[
					{ name: '开启', value: '0', checked: false }, 
					{ name: '关闭', value: '1', checked: false }, 
				],
				IsCoupon:0,
				
				sendType_Data:[
					{ name: '全量发放', value: '0', checked: true }, 
					{ name: '单个用户', value: '1', checked: false }, 
				],
				sendType:0,
				send_class1:"block_view",
				send_class2:"hide_view",
				
				SendTime:'',
				SendCouponData:[],
				SendCouponText:'',
				//下拉数据样本
				defaultProps: {
					label: 'Name',
					value: 'id'
				},
				SendCoupon:'',
				
				IsSingleton_Data:[
					{ name: '单张', value: '0', checked: false }, 
					{ name: '多张', value: '1', checked: false }, 
				],
				IsSingleton:0,
				
				AwardPoint_Data:[
					{ name: '关闭', value: '0', checked: false }, 
					{ name: '开启', value: '1', checked: false }, 
				],
				AwardPoint:0,
				
				Status_Data:[
					{ name: '关闭', value: '0', checked: false }, 
					{ name: '开启', value: '1', checked: true }, 
				],
				Status:1,
				
				Is_Hide_Data:[
					{ name: '显示', value: '0', checked: true }, 
					{ name: '隐藏', value: '1', checked: false }, 
				],
				Is_Hide:0,
				
				GetType_Data:[
					{ name: '不可领取', value: '0', checked: false }, 
					{ name: '可领取', value: '1', checked: true }, 
				],
				GetType:1,
				//数据层
				GetMax:1,
				//优惠方式：0=立减，1=打折，2= 兑换
				default_class:"block_view",
				CouponMethod_Data:[
					{ name: '立减', value: '0', checked: true }, 
					{ name: '打折', value: '1', checked: false }, 
					{ name: '兑换', value: '2', checked: false }, 
				],
				CouponMethod:0,
				CouponMethodTitle:'优惠立减金额',
				CouponMethodUnit:"元",
				CouponMethodValue:"请输入立减金额",
				
				setDataList:[],
				UserLevelArray:[],
				UserLevelIdArray:[],
				UserLevelChangeId:0,
				UserLevelId:0,
				
				//列表
				CouponList:[],
				page:1,
				last_page:1,
				onTabChangeValue:0,
				searchContent:'',
				hoverClass:'hoverClass',
				
				StatusLoad:0,
			}
		},
		onPullDownRefresh(res) {
			var page = parseInt(this.page) + 1;
			var onTabChangeValue = this.onTabChangeValue;
			if(this.last_page >= page && onTabChangeValue == 1){
				this.page = page;
				this.getCouponList();
			}
		},
		onPageScroll(res) {
			var page = parseInt(this.page) + 1;
			var onTabChangeValue = this.onTabChangeValue;
			if(this.last_page >= page && onTabChangeValue == 1){
				this.page = page;
				this.getCouponList();
			}
		},
		onReachBottom(res) {
			console.log("滚动到低了",res)
			var page = parseInt(this.page) + 1;
			var onTabChangeValue = this.onTabChangeValue;
			if(this.last_page >= page && onTabChangeValue == 1){
				this.page = page;
				this.getCouponList();
			}
		},
		onLoad() {
			this.getMarketingData();
			this.getUserLevelData();
			this.getCouponList();
			this.getEffectiveList();
		},
		
		methods: {
			//查看优惠券发送记录
			gotoSendCouponList(){
				console.log("前往查看发送优惠券记录");
				uni.redirectTo({
					url:"/store/sendList/sendList"
				})
			},
			//提交发放优惠券
			sendFormData(input){
				console.log("发放的优惠券内容是",input)
				var postData = input.detail.value;
				postData.sendType = this.sendType;
				postData.SendCoupon = this.SendCoupon;
				postData.UserLevelId = this.UserLevelId;
				console.log("最终发送的内容是",postData)
				app.request().postRequest(app.getNetAddresss('api/Coupon/addSendCoupon'),
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
									url:"/store/coupon/coupon"
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
			//选择发放的优惠券
			SendCouponChange(res){
				console.log("选择de",res.result);
				console.log("选择id的内容是",res.value);
				this.SendCouponText = res.result;
				this.SendCoupon = res.value;
			},
			//优惠券列表
			getEffectiveList(){
				var searchContent = this.searchContent;
				var page = this.page;
				var that = this;
				app.request().postRequest(
					app.getNetAddresss('api/Coupon/getEffectiveList'),
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
						console.log("11111获取有效的优惠券列表数据为",res);
						var data = res.result;
						this.SendCouponData = data;
						this.SendCoupon = data[0]['id'];
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
			
			
			//设置优惠券发放时间
			SendTimeChange(res){
				console.log("选择优惠券发放时间",res);
				this.SendTime = res.result;
			},
			//发放优惠券类型
			sendTypeRadioChange(e){
				var value = e.detail.value;
				this.sendType = value;
				if(value == 0){
					this.getEffectiveList();
					this.send_class1 = "block_view";
					this.send_class2 = "hide_view";
				}
				if(value == 1){
					this.send_class1 = "hide_view";
					this.send_class2 = "block_view";
				}
			},
			//跳转到编辑优惠券
			gotoNewCoupon(res){
				console.log("点击做跳转",res)
				uni.navigateTo({
					url:"../couponEdit/couponEdit?id=" + res.currentTarget.id,
				})
			},
			//优惠券搜索
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
				that.CouponList = [];
				that.searchContent = searchContent;
				app.request().postRequest(
					app.getNetAddresss('api/Coupon/getList'),
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
						that.CouponList = [
							...that.CouponList,...data
						];
						var CouponList = that.CouponList;
						console.log("获取到的列表2222数据为",CouponList);
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
			
			//优惠券列表
			getCouponList(){
				var searchContent = this.searchContent;
				var page = this.page;
				var that = this;
				app.request().postRequest(
					app.getNetAddresss('api/Coupon/getList'),
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
						that.CouponList = [
							...that.CouponList,...data
						];
						var CouponList = that.CouponList;
						console.log("获取到的列表2222数据为",CouponList);
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
			//优惠券状态
			StatusName(Stats){
				if(Stats == 0){
					return '不开启';
				}
				if(Stats == 1){
					return '开启';
				}
			},
			//是否可领取
			GetTypeName(GetType){
				if(GetType == 0){
					return '不可领取';
				}
				if(GetType == 1){
					return '可领取';
				}
			},
			//优惠券类型
			CouponMethodName(CouponMethod){
				if(CouponMethod == 0){
					return '立减券';
				}
				if(CouponMethod == 1){
					return '打折券';
				}
				if(CouponMethod == 2){
					return '兑换券';
				}
			},
			//适用范围
			UseTypeName(UseType){
				if(UseType == 0){
					return '全类适用';
				}
				if(UseType == 1){
					return '指定分类';
				}
				if(UseType == 2){
					return '指定商品';
				}
				if(UseType == 3){
					return '指定门店';
				}
				if(UseType == 4){
					return '指定品牌';
				}
			},
			//弹下拉框
			showPicker(type) {
				console.log('showPicker', type);
				this.$refs[type].show();
			},
			//省市区选中取消
			onCancel:function() {},
			//选择时间
			TimeStartChange(res){
				console.log("选择开始时间",res);
				this.TimeStart = res.result;
			},
			TimeEndChange(res){
				console.log("选择结束时间",res);
				this.TimeEnd =  res.result;
			},
			//添加优惠券
			addCouponForm(input){
				console.log("提交过来的数据为",input);
				let postData = input.detail.value;
				postData.Status = this.Status;
				postData.Is_Hide = this.Is_Hide;
				postData.CouponMethod = this.CouponMethod;
				postData.UseType = this.UseType;
				postData.GetType = this.GetType;
				postData.UserLevelLimitId = this.UserLevelId;
				postData.TimeLimit = this.TimeLimit;
				
				console.log("postData内容是",postData);
				app.request().postRequest(app.getNetAddresss('api/Coupon/create'),
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
									url:"/store/coupon/coupon"
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
			// 期限限制
			TimeLimitRadioChange(e){
				var value = e.detail.value;
				this.TimeLimit = value;
				if(value == 0){
					this.TimeLimit_class0 = "block_view";
					this.TimeLimit_class1 = "hide_view";
				}
				if(value == 1){
					this.TimeLimit_class0 = "hide_view";
					this.TimeLimit_class1 = "block_view";
				}
			},
			// 适用范围
			UseTypeChange:function(e){
				var value = e.detail.value;
				this.UseType = value;
			},
			//使用方式
			CouponMethodRadioChange(res){
				var CouponMethod = res.detail.value;
				if(CouponMethod == 0){
					this.CouponMethodTitle = "优惠立减金额";
					this.default_class = "block_view";
					this.CouponMethodUnit = "元";
					this.CouponMethodValue = "请输入立减金额";
				}
				if(CouponMethod == 1){
					this.CouponMethodTitle = "优惠折扣数字";
					this.default_class = "block_view";
					this.CouponMethodUnit = "折";
					this.CouponMethodValue = "请输入折扣数字";
				}
				if(CouponMethod == 2){
					this.default_class = "hide_view";
				}
				this.CouponMethod = CouponMethod;
			},
			//会员级别选择
			UserLevelChange:function(e){
				console.log('picker发送选择改变，携带值为', e)
				var value = e.detail.value;
				this.UserLevelId = this.UserLevelIdArray[value];
				this.UserLevelChangeId = value;
				console.log("获取到选择的id是",this.UserLevelId)
			},
			//会员级别列表
			getUserLevelData(){
				app.request().postRequest(
					app.getNetAddresss('api/UserLevel/getList'),
					{
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
						this.setDataList = res.result;
						
						var resultData = res.result;
						
						var UserLevelArray = [];
						var UserLevelIdArray = [];
						
						UserLevelArray.push("所有会员级别");
						UserLevelIdArray.push(0);
						
						resultData.map((g,index)=>{
							UserLevelArray.push(g.LevelName)
							UserLevelIdArray.push(g.id)
						})
						console.log("取到的数据为",UserLevelArray);
						this.UserLevelArray = UserLevelArray;
						this.UserLevelIdArray = UserLevelIdArray;
						if(resultData.length > 0){
							this.UserLevelId = UserLevelIdArray[0]; //默认取值
						}else{
							this.UserLevelId = 0;
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
			
			//单个优惠券状态
			StatusRadioChange(res){
				this.Status = res.detail.value;
			},
			//单个优惠券是否隐藏
			Is_HideRadioChange(res){
				this.Is_Hide = res.detail.value;
			},
			//是否可领取,0=不可领取,1=可领取
			GetTypeRadioChange(res){
				var value = res.detail.value;
				console.log("领取提示",value)
				this.GetType = res.detail.value;
				this.GetMax = value;
			},
			//请求更新全局优惠
			globalPost(postData){
				var that = this;
				app.request().postRequest(app.getNetAddresss('api/Marketing/create'),
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
								that.getMarketingData();
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
			//是否开启优惠券
			IsCouponRadioChange(res){
				this.IsCoupon = res.detail.value;
				var postData = {
					'IsCoupon':res.detail.value
				}
				this.globalPost(postData);
			},
			//优惠券使用限制
			IsSingletonRadioChange(res){
				this.IsSingleton = res.detail.value;
				var postData = {
					'IsSingleton':res.detail.value
				}
				this.globalPost(postData);
			},
			//抵扣奖励积分
			AwardPointRadioChange(res){
				this.AwardPoint = res.detail.value;
				var postData = {
					'AwardPoint':res.detail.value
				}
				this.globalPost(postData);
			},
			//获取优惠设置
			getMarketingData(){
				app.request().postRequest(app.getNetAddresss('api/Marketing/getData'),
				{},
				{
					'content-type': 'application/x-www-form-urlencoded'
				}).then(res => {
					if (res.code === 1) {
						console.log("获取到的数据为",res.result);
						this.MarketingData = res.result.data;
						
						let IsCoupon = res.result.data.IsCoupon;
						this.IsCoupon = IsCoupon;
						this.IsCoupon_Data[IsCoupon].checked = true;
						
						let IsSingleton = res.result.data.IsSingleton;
						this.IsSingleton = IsSingleton;
						this.IsSingleton_Data[IsSingleton].checked = true;
						
						let AwardPoint = res.result.data.AwardPoint;
						this.AwardPoint = AwardPoint;
						this.AwardPoint_Data[AwardPoint].checked = true;
						
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
			
			//滑动菜单促发事件
			onTabChange(res) {
				console.log("onTabChange", res);
			},
		}
	}
</script>

<style lang="scss">
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
.cu-form-group picker .picker {
	padding-left: 0rpx;
	font-size: 30rpx;
}
.hide_view{
	display: none;
}
.block_view{
	display: block;
}
	.content {
			position: absolute;
			height: 100%;
			/* background-color: #f1f5f8; */
		}
		.content-info{
			margin-top: 20rpx;
		}
		
		.cu-form-group .title{
			text-align: right;
			width: 32%;
		}
		
		.cu-form-group{
			padding: 5rpx;
		}
		
		.pickers{
			padding-left: 0rpx;
			padding-top: 20rpx;
			color: #555555;
		}
		.cu-form-group picker::after{
			right: 0rpx;
		}
		.button_submit{
			margin: 20rpx auto 80rpx auto;
		}
</style>
