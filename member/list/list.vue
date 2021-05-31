<template>
	<view>
		<member-user-list :list="UserList" :button="buttonList" :border="true" @click="clickMethod" @change="changeMethod"></member-user-list>
		<!-- 省市区 -->
		<w-picker
			mode="linkage"
			:value="defaultRegion1"
			:options="options"
			:level="3"
			default-type="id"
			:default-props="defaultProps1"
			@confirm="onConfirm($event, 'linkage')"
			@cancel="onCancel"
			ref="linkage"
		></w-picker>
		<!-- 修改客户信息 -->
		<pop ref="pop" :direction="direction" :is_close="true" :is_mask="true" :width="100">
			<view>
				<scroll-view scroll-y="true" :style="'height:' + winHeight">
				<view class="ContentBackground">
					<form @submit="formSubmit" :id="UserData.id">
						<view class="create-content">
				
							<view class="cu-form-group section">
								<view class="title">顾客姓名：</view>
								<input type="text" name="Name" :value="UserData.Name" />
							</view>
							
							<view class="cu-form-group section">
								<view class="title">客户性别：</view>
								<!-- <input type="text" name="Sex" :value="UserData.Sex" /> -->
								<view>
									<view class="company-item" :class="{'active': Sex == index}"  v-for="(item, index) in list" :key="index" @click="clickBtn(index)">
											{{item}}
									</view>
								</view>
							</view>
							
							<view class="cu-form-group section">
								<view class="title">客户手机：</view>
								<input type="text" name="Mobile" :value="UserData.Mobile" placeholder="请输入真实手机号码" />
							</view>
							
							
							
							<view class="cu-form-group section">
								<view class="title">所在城市：</view>
								<input type="text" disabled="true" name="area" @tap="showPicker('linkage')" placeholder="请选择省市区" :value="result.result" />
								<text class="cuIcon-unfold text-orange"></text>
							</view>
				
							<view class="cu-form-group section">
								<view class="title">客户地址：</view>
								<input type="text" name="Address" :value="UserData.Address" placeholder="请输入客户详细地址" />
								<text class="cuIcon-locationfill text-orange"></text>
							</view>
							
							<view class="cu-form-group section">
								<view class="title">客户备注：</view>
								<input type="text" name="Remark" :value="UserData.Remark" />
							</view>
							
							<view class="cu-form-group section">
								<view class="title">客户来源：</view>
								<!-- <input type="text" name="SoureId" :value="UserData.SoureId" /> -->
								<picker @change="SoureChange" header-text="请选择收款方式" :value="SoureId" :range="SoureArray">
								  <view class="picker">
								      当前选择：{{SoureArray[SoureId]}}
								  </view>
								</picker>
							</view>
							
							<view class="cu-form-group section">
								<view class="title">开通渠道：</view>
								<!-- <input type="text" name="OpenSource" :value="UserData.OpenSource" /> -->
								<picker @change="OpenSourceChange" header-text="请选择收款方式" :value="OpenSource" :range="OpenSourceArray">
								  <view class="picker">
								      当前选择：{{OpenSourceArray[OpenSource]}}
								  </view>
								</picker>
							</view>
							
							<view class="cu-form-group section">
								<view class="title">客户编号：</view>
								<input type="text" name="UserNo" :value="UserData.UserNo" />
							</view>
							
							<view class="cu-form-group section">
								<view class="title">归属门店：</view>
								<input type="text" disabled="true" name="StoreName" :value="UserData.has_one_store.StoreName" />
							</view>
							
							<view class="cu-form-group section">
								<view class="title">消费总额：</view>
								<input type="text" disabled="true" name="Amount" :value="UserData.Amount" />
							</view>
							
							<view class="button_submit"><button type="primary" :id="UserData.id" form-type="submit">提 交</button></view>
						</view>
					</form>
				</view>
				</scroll-view>
			</view>
		</pop>
	</view>
</template>

<script>
	import pop from "@/components/ming-pop/ming-pop.vue"
	import foot from '../../components/foot.vue';
	import wPicker from '@/components/w-picker/w-picker.vue';
	import memberUserList from '../../components/mark-slide-list/member-user-list.vue';
	const app = getApp({ allowDefault: true });
	const globalData = app.globalData;
	export default {
		components:{
			foot,
			memberUserList,
			wPicker,
			pop
		},
		data() {
			return {
				//窗口
				winwidth: '100%',
				winHeight: '100%',
				direction: "up",
				UserList : [],
				UserData : [],
				buttonList: [
					{
						title: '编辑',
						background: '#0f80ff'
					},
					{
						title: '停用',
						background: '#ff3b32'
					}
				],
				SoureArray:['附近路过','客户转介绍','线上搜索引擎','直销业务员','门店转介绍'],
				SoureId:0,
				OpenSourceArray:['未知','计次卡','计额卡','管理员登记','客户网上登记'],
				OpenSource:0,
				Sex:'-1', //单选
				list: ['女','男'],   //接口获取到的数组
				result: {
					result: ''
				}, //四级
				defaultRegion1: ['310000', '310100', '310101'],
				defaultProps1: {
					label: 'name',
					value: 'id',
					children: 'child'
				},
				options: [], //数据源
			};
		},
		onLoad:function(e){
			var dologin = globalData.dologin;
			if(!dologin){
				dologin = uni.getStorageSync('store_token');
				if(!dologin){
					uni.showModal({
						title:'温馨提示',
						content:'您还未登录，请先进行登录',
						showCancel:false,
						success:function(){
							uni.redirectTo({
								url:"/pages/login/login"
							})
						}
					})
				}
			}
			this.getUserList();
			this.getArea();
			let mobile = uni.getStorageSync('mobile');
			if (mobile) {
				this.UserMobile = mobile;
			}
		},
		methods:{
			formSubmit: function(input) {
				console.log('输入的内容是', input);
				var that = this;
				let Name = input.detail.value.Name;
				if(!Name){
					uni.showModal({
						title:'操作提示',
						content:'顾客姓名不能为空',
						showCancel:false
					})
					return;
				}
				let Mobile = input.detail.value.Mobile;
				let UserId = input.target.id;
				if(!Mobile){
					uni.showModal({
						title:'操作提示',
						content:'客户手机号不能为空',
						showCancel:false
					})
					return;
				}
				let UserAreas = that.defaultRegion1; //区域
				let UserProvince = UserAreas[0];
				let UserCity = UserAreas[1];
				let UserArea = UserAreas[2];
				let UserCountry = UserAreas[3];
				//省市区
				let area = input.detail.value.area;
				if(!area){
					uni.showModal({
						title:'操作提示',
						content:'请选择省市区',
						showCancel:false
					})
					return;
				}
				let Address = input.detail.value.Address;
				if(!Address){
					uni.showModal({
						title:'操作提示',
						content:'客户地址不能为空',
						showCancel:false
					})
					return;
				}
				let UserNo = input.detail.value.UserNo;
				let Remark = input.detail.value.Remark;
				let Sex = this.Sex;
				let SoureId = this.SoureId;
				let OpenSource = this.OpenSource;
				if(!UserNo){
					uni.showModal({
						title:'操作提示',
						content:'会员编号不能为空',
						showCancel:false
					})
					return;
				}
				app.request().postRequest(
					app.getNetAddresss('api/MemberUser/edit'),
					{
						BrandId: uni.getStorageSync('BrandId'),
						UserId: UserId,
						UserNo: UserNo,
						Mobile: Mobile,
						Name: Name,
						Sex: Sex,
						Address: Address,
						UserProvince: UserProvince,
						UserCity: UserCity,
						UserArea: UserArea,
						UserCountry: UserCountry,
						Remark: Remark,
						OpenSource: OpenSource,
						SoureId: SoureId
					},
					{
						'content-type': 'application/x-www-form-urlencoded',
						'access_token': uni.getStorageSync('access_token'),
						'members_id': uni.getStorageSync('members_id'),
						'wx_token': uni.getStorageSync('wx_token')
					}
				).then(res => {
					if (res.code === 1) {
						//登录成功
						uni.showModal({
							title:'温馨提示',
							content:res.msg,
							showCancel:false,
							success() {
								uni.redirectTo({
									url:"/member/list/list"
								});
							}
						})
					} else {
						uni.showToast({
							title: '温馨提醒：' + res.msg,
							icon: 'none',
							duration: 2000
						});
					}
				})
			},
			SoureChange:function(e){
				console.log('picker发送选择改变，携带值为', e)
				var id = e.detail.value;
				this.SoureId = id;
			},
			OpenSourceChange:function(e){
				console.log('picker发送选择改变，携带值为', e)
				var value = e.detail.value;
				this.OpenSource = value;
			},
			// 判断 当前index 是否与 ischange 相等，不相等择改变背景为红色（代表选中），再次点击取消
			clickBtn(index){
				console.log("选中的单选项是",index);
				// 单选
				if(index!=this.Sex){
					this.Sex = index;
				}else{
					this.Sex = -1;    //不注释则可以点击取消，注释之后点击就不再取消
				}
			},
			showPicker(type) {
				console.log('showPicker', type);
				this.$refs[type].show();
			},
			//省市区选择
			onConfirm(res, type) {
				console.log('onConfirm' + type, res);
				this.result = res;
				this.defaultRegion1 = res.value;
				console.log(res);
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
							let result = res.result;
							// console.log('省市区列表数据为', result);
							this.options = result;
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
			//选中取消
			onCancel:function() {},
			
			getUserList:function(){
				app.request().postRequest(
					app.getNetAddresss('api/MemberUser/getList'),
					{
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
						console.log("获取到的门店列表数据为",res);
						this.UserList = res.result;
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
			changeMethod(data, button, index){
				console.log('滑动按钮回调1', data)
				var actionTitle = button;
				if(actionTitle == "编辑"){
					console.log("跳转到编辑的页面");
					this.UserData = data;
					this.Sex = data.Sex;
					this.SoureId = data.SoureId;
					this.OpenSource = data.OpenSource;
					this.defaultRegion1 = [data.user_province.id,data.user_city.id,data.user_area.id];
					this.result.result = data.user_province.areaname + data.user_city.areaname + data.user_area.areaname;
					this.$refs.pop.show();
				}
				if(actionTitle == "停用"){
					console.log("停用提示");
					uni.showModal({
						title:"温馨提示",
						content:"请确认要停用此门店吗？",
						success:function(res){
							if (res.confirm) {
								console.log('用户点击确定');
								app.request().postRequest(app.getNetAddresss('api/MemberUser/modifyStatus'), {
									'id':data.id,
									'Status':1
								}, {
									'content-type': 'application/x-www-form-urlencoded'
								}).then(res => {
									if (res.code === 1) {
										//成功
										uni.showModal({
											title:'温馨提示',
											content:res.msg,
											showCancel:false,
											success() {
												uni.redirectTo({
													url:"/member/list/list"
												});
											}
										})
									} else {
										uni.showToast({
											title: '温馨提醒：' + res.msg,
											icon: 'none',
											duration: 2000
										});
									}
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
				if(actionTitle == "启用"){
					console.log("启用提示");
					uni.showModal({
						title:"温馨提示",
						content:"请确认要启用此门店吗？",
						success:function(res){
							if (res.confirm) {
								console.log('用户点击确定');
								app.request().postRequest(app.getNetAddresss('api/MemberUser/modifyStatus'), {
									'id':data.id,
									'Status':0
								}, {
									'content-type': 'application/x-www-form-urlencoded'
								}).then(res => {
									if (res.code === 1) {
										//成功
										uni.showModal({
											title:'温馨提示',
											content:res.msg,
											showCancel:false,
											success() {
												uni.redirectTo({
													url:"/member/list/list"
												});
											}
										})
									} else {
										uni.showToast({
											title: '温馨提醒：' + res.msg,
											icon: 'none',
											duration: 2000
										});
									}
								})
							} else if (res.cancel) {
								console.log('用户点击取消');
							}
						}
					})
				}
			},
			clickMethod(data){
				console.log('点击行回调', data)
				this.UserData = data;
				this.Sex = data.Sex;
				this.SoureId = data.SoureId;
				this.OpenSource = data.OpenSource;
				this.defaultRegion1 = [data.user_province.id,data.user_city.id,data.user_area.id];
				this.result.result = data.user_province.areaname + data.user_city.areaname + data.user_area.areaname;
				this.$refs.pop.show();
			}
		}
	}
</script>


<style lang="scss">
@import '/static/css/main.css';
@import '/static/css/icon.css';
.padding {
	margin-bottom: 30rpx;
}
.button_submit {
	margin-top: 30rpx;
}
.ContentBackground {
	margin-top: 30rpx;
}
.create-content {
	width: 100%;
}
.company-item{
	width:170rpx;
	height:50rpx;
	border:2rpx solid #838383;
	border-radius:10rpx;
	font-size:30rpx;
	color:#555;
	text-align: center;
	line-height: 50rpx;
	float: left;
	margin-right: 40rpx;
}
.active{
	border:2rpx solid #DD524D;
	color: #DD524D;
}
.cu-form-group{
	background-color: #ffffff;
	padding: 1upx 30upx;
	display: flex;
	align-items: center;
	min-height: 80upx;
	justify-content: space-between;
}
.cu-form-group picker .picker{
	padding-left: 0rpx;
}
.header {
	display: flex;
	flex-wrap: nowrap;
	justify-content: space-between;
	align-content: center;
	padding: 0.5rem;
}

.header > view {
	line-height: 2.2rem;
	width: 25%;
	text-align: left;
	font-size: 31rpx;
}

.header > input {
	width: 75%;
	text-align: left;
	border: solid #d7d7d7 0.1pt;
	padding: 5pt;
	background: #ffffff;
}
.header > textarea {
	width: 75%;
	text-align: left;
	border: solid #d7d7d7 0.1pt;
	padding: 5pt;
	background: #ffffff;
}
.header > picker {
	width: 75%;
	text-align: left;
	border: solid #d7d7d7 0.1pt;
	padding: 5pt;
	background: #ffffff;
}
</style>

