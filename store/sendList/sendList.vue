<template>
	<view class="content">
		<aloys-tab :tabs="tabs" :circular="circular" @change="onTabChange">
			<view slot="content0" style="margin-top: 10rpx;">
				<view class="content-info">
					<view class="customer-search">
						<form @submit="searchSendCouponForm">
							<view class="searchContent">
								<view class="form-search-input-view">
									<input class="form-search-input" type="text" name="searchContent" placeholder="请输入优惠券名称/手机号进行搜索" />
								</view>
								<view class="form-search-button-view">
									<button class="form-search-button" type="warn" form-type="submit">搜索</button>
								</view>
							</view>
						</form>
					</view>
					<view class="customer-list-content">
							<view v-for="(item,index) in SendCouponList" :key="index" :id="item.id">
								<view class="c-list" :hover-class="hoverClass" @click="gotoNewCoupon" :id="item.id">
									<view class="c-list-title" v-if="item.SendTime">发放时间：{{item.SendTime}}</view>
									<view class="c-list-title" v-if="item.has_one_coupon.Name">优惠券名称：{{item.has_one_coupon.Name}}</view>
									<view class="c-list-title">发放形式：{{sendTypeText(item.sendType)}}</view>
									<view class="c-list-title">发放状态：{{StatusText(item.Status)}}</view>
									<view class="c-list-title" v-if="item.ReMark">发送备注：{{item.ReMark}}</view>
									<view class="c-list-title" v-if="item.Mobile">发放手机号：{{item.Mobile}}</view>
									<view class="c-list-title" v-if="item.has_one_coupon.Total">剩余优惠券总张数：{{item.has_one_coupon.Total}}</view>
								</view>
							</view>
						</view>
				</view>
			</view>
			<view slot="content1">
				<view class="content-info">
						<view class="customer-search">
							<form @submit="searchUserCouponForm">
								<view class="searchContent">
									<view class="form-search-input-view">
										<input class="form-search-input" type="text" name="searchContent" placeholder="请输入优惠券名称/姓名手机号等进行搜索" />
									</view>
									<view class="form-search-button-view">
										<button class="form-search-button" type="warn" form-type="submit">搜索</button>
									</view>
								</view>
							</form>
						</view>
						<view class="customer-list-content">
								<view v-for="(item,index) in UserCouponList" :key="index" :id="item.id">
									<view class="c-list" :hover-class="hoverClass" @click="gotoUserCoupon" :id="item.id">
										<view class="c-list-title" v-if="item.GetTime">获取时间：{{item.GetTime}}</view>
										<view class="c-list-title" v-if="item.has_one_coupon.Name">优惠券名称：{{item.has_one_coupon.Name}}</view>
										<view class="c-list-title" v-if="item.has_one_user.Name">用户姓名：{{item.has_one_user.Name}}</view>
										<view class="c-list-title" v-if="item.has_one_user.Mobile">手机号码：{{item.has_one_user.Mobile}}</view>
										<view class="c-list-title" v-if="item.has_one_user.has_one_user_level.LevelName">会员目前级别：{{item.has_one_user.has_one_user_level.LevelName}}</view>
										<view class="c-list-title" v-if="item.has_one_user_level.LevelName">可用会员级别：{{item.has_one_user_level.LevelName}}</view>
										<view class="c-list-title" v-if="item.has_one_user_level.LevelName">级别说明：会员所属级别权重大于或等于可用！</view>
										<view class="c-list-title">获取方式：{{GetClassText(item.GetClass)}}</view>
										<view class="c-list-title">是否使用：{{IsUsedText(item.IsUsed)}}</view>
										<view class="c-list-title" v-if="item.UseTime">使用时间：{{item.UseTime}}</view>
										<view class="c-list-title" v-if="item.OrderSn">订单编号：{{item.OrderSn}}</view>
										<view class="c-list-title" v-if="item.OrderId">订单Id：{{item.OrderId}}</view>
									</view>
								</view>
							</view>
					</view>
				
			</view>
			<view slot="content2">
				<view class="content-info">
						<view class="customer-search">
							<form @submit="searchUserCouponUsedForm">
								<view class="searchContent">
									<view class="form-search-input-view">
										<input class="form-search-input" type="text" name="searchContent" placeholder="请输入优惠券名称/姓名手机号等进行搜索" />
									</view>
									<view class="form-search-button-view">
										<button class="form-search-button" type="warn" form-type="submit">搜索</button>
									</view>
								</view>
							</form>
						</view>
						<view class="customer-list-content">
								<view v-for="(item,index) in UserCouponUsedList" :key="index" :id="item.id">
									<view class="c-list" :hover-class="hoverClass" @click="gotoUserCoupon" :id="item.id">
										<view class="c-list-title" v-if="item.GetTime">获取时间：{{item.GetTime}}</view>
										<view class="c-list-title" v-if="item.has_one_coupon.Name">优惠券名称：{{item.has_one_coupon.Name}}</view>
										<view class="c-list-title" v-if="item.has_one_user.Name">用户姓名：{{item.has_one_user.Name}}</view>
										<view class="c-list-title" v-if="item.has_one_user.Mobile">手机号码：{{item.has_one_user.Mobile}}</view>
										<view class="c-list-title" v-if="item.has_one_user.has_one_user_level.LevelName">会员目前级别：{{item.has_one_user.has_one_user_level.LevelName}}</view>
										<view class="c-list-title" v-if="item.has_one_user_level.LevelName">可用会员级别：{{item.has_one_user_level.LevelName}}</view>
										<view class="c-list-title" v-if="item.has_one_user_level.LevelName">级别说明：会员所属级别权重大于或等于可用！</view>
										<view class="c-list-title">获取方式：{{GetClassText(item.GetClass)}}</view>
										<view class="c-list-title">是否使用：{{IsUsedText(item.IsUsed)}}</view>
										<view class="c-list-title" v-if="item.UseTime">使用时间：{{item.UseTime}}</view>
										<view class="c-list-title" v-if="item.OrderSn">订单编号：{{item.OrderSn}}</view>
										<view class="c-list-title" v-if="item.OrderId">订单Id：{{item.OrderId}}</view>
									</view>
								</view>
							</view>
					</view>
			</view>
			<view slot="content3">
				<view class="content-info">
					<view class="customer-search">
								<form @submit="searchUserCouponNotUsedForm">
									<view class="searchContent">
										<view class="form-search-input-view">
											<input class="form-search-input" type="text" name="searchContent" placeholder="请输入优惠券名称/姓名手机号等进行搜索" />
										</view>
										<view class="form-search-button-view">
											<button class="form-search-button" type="warn" form-type="submit">搜索</button>
										</view>
									</view>
								</form>
							</view>
					<view class="customer-list-content">
									<view v-for="(item,index) in UserCouponNotUsedList" :key="index" :id="item.id">
										<view class="c-list" :hover-class="hoverClass" @click="gotoUserCoupon" :id="item.id">
											<view class="c-list-title" v-if="item.GetTime">获取时间：{{item.GetTime}}</view>
											<view class="c-list-title" v-if="item.has_one_coupon.Name">优惠券名称：{{item.has_one_coupon.Name}}</view>
											<view class="c-list-title" v-if="item.has_one_user.Name">用户姓名：{{item.has_one_user.Name}}</view>
											<view class="c-list-title" v-if="item.has_one_user.Mobile">手机号码：{{item.has_one_user.Mobile}}</view>
											<view class="c-list-title" v-if="item.has_one_user.has_one_user_level.LevelName">会员目前级别：{{item.has_one_user.has_one_user_level.LevelName}}</view>
											<view class="c-list-title" v-if="item.has_one_user_level.LevelName">可用会员级别：{{item.has_one_user_level.LevelName}}</view>
											<view class="c-list-title" v-if="item.has_one_user_level.LevelName">级别说明：会员所属级别权重大于或等于可用！</view>
											<view class="c-list-title">获取方式：{{GetClassText(item.GetClass)}}</view>
											<view class="c-list-title">是否使用：{{IsUsedText(item.IsUsed)}}</view>
											<view class="c-list-title" v-if="item.UseTime">使用时间：{{item.UseTime}}</view>
											<view class="c-list-title" v-if="item.OrderSn">订单编号：{{item.OrderSn}}</view>
											<view class="c-list-title" v-if="item.OrderId">订单Id：{{item.OrderId}}</view>
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
						title: '发放券记录'
					},
					{
						title: '用户券记录'
					},
					{
						title: '已使用记录'
					},
					{
						title: '未使用记录'
					}
				],
				circular:true,
				
				
				onTabChangeValue:0,
				searchContent:'',
				hoverClass:'hoverClass',
				
				//发放优惠券列表
				page:1,
				last_page:1,
				SendCouponList:[],
				//用户优惠券列表
				user_page:1,
				user_last_page:1,
				UserCouponList:[],
				//已使用优惠券列表
				user_used_page:1,
				user_used_last_page:1,
				UserCouponUsedList:[],
				//未使用优惠券列表
				user_not_used_page:1,
				user_not_used_last_page:1,
				UserCouponNotUsedList:[],
				
			}
		},
		onLoad() {
			//发放优惠券列表
			this.getSendCouponList();
			//用户优惠券列表
			this.getUserCouponList();
			//已使用优惠券列表
			this.getUserCouponUsedList();
			//未使用优惠券列表
			this.getUserCouponNotUsedList();
		},
		//下拉刷新
		onPullDownRefresh(res) {
			console.log("下拉刷新",res)
			this.pullScroll();
		},
		onPageScroll(res) {
			console.log("页面滚动",res)
			this.pullScroll();
		},
		onReachBottom(res) {
			console.log("滚动到低了",res)
			this.pullScroll();
		},
		methods: {
			//下拉刷新
			pullScroll(){
				var onTabChangeValue = this.onTabChangeValue;
				if(onTabChangeValue == 0){
					var page = parseInt(this.page) + 1;
					if(this.last_page >= page){
						this.page = page;
						this.getSendCouponList();
					}
				}
				
				if(onTabChangeValue == 1){
					var user_page = parseInt(this.user_page) + 1;
					if(this.user_last_page >= user_page){
						this.user_page = user_page;
						this.getUserCouponList();
					}
				}
				
				if(onTabChangeValue == 2){
					var user_used_page = parseInt(this.user_used_page) + 1;
					if(this.user_used_last_page >= user_used_page){
						this.user_used_page = user_used_page;
						this.getUserCouponUsedList();
					}
				}
				
				if(onTabChangeValue == 3){
					var user_not_used_page = parseInt(this.user_not_used_page) + 1;
					if(this.user_not_used_last_page >= user_not_used_page){
						this.user_not_used_page = user_not_used_page;
						this.getUserCouponNotUsedList();
					}
				}
				
			},
			//获取方式：0=用户自主领取，1=门店发放，2=消费赠送，3=在线支付
			GetClassText(value){
				if(value == 0){
					return '用户自主领取'
				}
				if(value == 1){
					return '门店发放'
				}
				if(value == 2){
					return '消费赠送'
				}
				if(value == 3){
					return '在线支付'
				}
			},
			//是否使用：0=未使用，1=已使用，2=已失效
			IsUsedText(value){
				if(value == 0){
					return '未使用'
				}
				if(value == 1){
					return '已使用'
				}
				if(value == 2){
					return '已失效'
				}
			},
			//发送类型：0=定时全量发送，1=定时发送单个客户
			sendTypeText(value){
				if(value == 0){
					return '定时全量发送'
				}
				if(value == 1){
					return '定时发送单个客户'
				}
			},
			//发送状态：0=未发送，1=已发送，2=发送失败
			StatusText(value){
				if(value == 0){
					return '待发送'
				}
				if(value == 1){
					return '已发送'
				}
				if(value == 2){
					return '发送失败'
				}
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
			gotoUserCoupon(res){
				console.log("输出详细的会员资料",res);
			},
			//弹窗内容
			gotoNewCoupon(res){
				console.log("点击弹窗的内容",res)
				uni.showModal({
					title:"温馨提示",
					content:"请耐心等待扫码发送，后续我们将添加手动发送功能！",
					showCancel:false
				})
			},
			
			//搜索已使用的优惠券列表
			searchUserCouponUsedForm(input){
				var searchContent = input.detail.value.searchContent;
				if(!searchContent){
					uni.showToast({
						title:"搜索内容不能为空",
					})
					return;
				}
				var that = this;
				that.user_used_page = 1;
				that.UserCouponUsedList = [];
				that.searchContent = searchContent;
				that.getUserCouponUsedList();
			},
			
			//获取用户已使用的优惠券列表
			getUserCouponUsedList(){
				var searchContent = this.searchContent;
				var user_used_page = this.user_used_page;
				var that = this;
				app.request().postRequest(
					app.getNetAddresss('api/Coupon/getUserCouponStatus'),
					{
						searchContent:searchContent,
						page:user_used_page,
						IsUsed:1,
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
						that.user_used_last_page = res.result.user_used_last_page; //获取总页数
						that.UserCouponUsedList = [
							...that.UserCouponUsedList,...data
						];
						var UserCouponUsedList = that.UserCouponUsedList;
						console.log("获取到的列表2222数据为",UserCouponUsedList);
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
			
			//搜索未使用的用户优惠券列表
			searchUserCouponNotUsedForm(input){
				var searchContent = input.detail.value.searchContent;
				if(!searchContent){
					uni.showToast({
						title:"搜索内容不能为空",
					})
					return;
				}
				var that = this;
				that.user_not_used_page = 1;
				that.UserCouponUsedList = [];
				that.searchContent = searchContent;
				that.getUserCouponNotUsedList();
			},
			//用户未使用优惠券列表
			getUserCouponNotUsedList(){
				var searchContent = this.searchContent;
				var user_not_used_page = this.user_not_used_page;
				var that = this;
				app.request().postRequest(
					app.getNetAddresss('api/Coupon/getUserCouponStatus'),
					{
						searchContent:searchContent,
						page:user_not_used_page,
						IsUsed:0,
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
						that.user_not_used_last_page = res.result.user_not_used_last_page;
						that.UserCouponNotUsedList = [
							...that.UserCouponNotUsedList,...data
						];
						var UserCouponNotUsedList = that.UserCouponNotUsedList;
						console.log("获取到的列表2222数据为",UserCouponNotUsedList);
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
			
			//用户优惠券搜索
			searchUserCouponForm(input){
				console.log("搜索输入的内容是",input)
				var searchContent = input.detail.value.searchContent;
				if(!searchContent){
					uni.showToast({
						title:"搜索内容不能为空",
					})
					return;
				}
				var that = this;
				that.user_page = 1;
				that.UserCouponList = [];
				that.searchContent = searchContent;
				that.getUserCouponList();
			},
			//用户所有优惠券列表
			getUserCouponList(){
				var searchContent = this.searchContent;
				var user_page = this.user_page;
				var that = this;
				app.request().postRequest(
					app.getNetAddresss('api/Coupon/getUserCouponList'),
					{
						searchContent:searchContent,
						page:user_page,
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
						that.user_last_page = res.result.user_last_page;
						that.UserCouponList = [
							...that.UserCouponList,...data
						];
						var UserCouponList = that.UserCouponList;
						console.log("获取到的列表2222数据为",UserCouponList);
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
			
			//优惠券发放记录搜索
			searchSendCouponForm(input){
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
				that.SendCouponList = [];
				that.searchContent = searchContent;
				that.getSendCouponList();
			},
			//优惠券发放记录列表
			getSendCouponList(){
				var searchContent = this.searchContent;
				var page = this.page;
				var that = this;
				app.request().postRequest(
					app.getNetAddresss('api/Coupon/SendCouponList'),
					{
						searchContent:searchContent,
						page:page,
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
						that.SendCouponList = [
							...that.SendCouponList,...data
						];
						var SendCouponList = that.SendCouponList;
						console.log("获取到的列表2222数据为",SendCouponList);
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
				this.onTabChangeValue = res;
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
