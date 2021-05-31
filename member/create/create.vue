<template>
	<view>
		<!-- 省市区 -->
		<w-picker
			mode="linkage"
			:value="areaArrayId"
			:options="options"
			:level="3"
			default-type="id"
			:default-props="defaultProps1"
			@confirm="onConfirm($event, 'linkage')"
			@cancel="onCancel"
			ref="linkage"
		></w-picker>
		<view>
			<view class="ContentBackground">
				<form @submit="formSubmit">
					<view class="create-content">
						
						<view class="cu-form-group section">
							<view class="title">会员卡号：</view>
							<input type="text" name="UserNo" placeholder="请输入客户编码" :value="getNumberNo" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">顾客姓名：</view>
							<input type="text" name="Name" placeholder="请输入客户姓名" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">客户性别：</view>
							<view>
								<view class="company-item" :class="{'active': Sex == index}"  v-for="(item, index) in list" :key="index" @click="clickBtn(index)">
										{{item}}
								</view>
							</view>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">客户手机：</view>
							<input type="text" name="Mobile" placeholder="请输入真实手机号码" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">所在城市：</view>
							<input type="text" disabled="true" name="area" @tap="showPicker('linkage')" placeholder="请选择省市区" :value="result.result" />
							<text class="cuIcon-unfold text-orange"></text>
						</view>
			
						<view class="cu-form-group section">
							<view class="title">客户地址：</view>
							<input type="text" name="Address" placeholder="请输入客户详细地址" />
							<text class="cuIcon-locationfill text-orange"></text>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">客户备注：</view>
							<input type="text" name="Remark" placeholder="请输入客户备注" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">客户来源：</view>
							<picker @change="SoureChange" header-text="请选择收款方式" :range="SoureArray">
							  <view class="picker">
							      当前选择：{{SoureArray[SoureId]}}
							  </view>
							</picker>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">开通渠道：</view>
							<picker @change="OpenSourceChange" header-text="请选择收款方式"  :range="OpenSourceArray">
							  <view class="picker">
							      当前选择：{{OpenSourceArray[OpenSource]}}
							  </view>
							</picker>
						</view>
						
						<view class="button_submit"><button type="primary"  form-type="submit">提 交</button></view>
					</view>
				</form>
			</view>
		</view>
	</view>
</template>

<script>
	import wPicker from '@/components/w-picker/w-picker.vue';
	const app = getApp({ allowDefault: true });
	const globalData = app.globalData;
	export default {
		data() {
			return {
				areaArrayId: ['310000', '310100', '310101'],
				defaultProps1: {
					label: 'name',
					value: 'id',
					children: 'child'
				},
				result: {
					result: ''
				}, //四级
				options: [], //数据源
				SoureArray:['附近路过','客户转介绍','线上搜索引擎','直销业务员','门店转介绍'],
				SoureId:0,
				OpenSourceArray:['未知','计次卡','计额卡','管理员登记','客户网上登记'],
				OpenSource:0,
				Sex:'-1', //单选
				list: ['女','男'],   //接口获取到的数组
				getNumberNo:0
			}
		},
		components:{
			wPicker
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
			this.getArea();
			this.getNumber();
		},
		methods: {
			getNumber:function(){
				let that = this;
				uni.showLoading({
				    title: '加载中'
				});
				let access_token = uni.getStorageSync('access_token');
				let wx_token = uni.getStorageSync('wx_token');
				let members_id = uni.getStorageSync('members_id');
				app.request()
					.postRequest(
						app.getNetAddresss('api/MemberUser/getNumber'),
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
							let result = res.result.data;
							console.log('获取用户编码为', result);
							this.getNumberNo = result;
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
				let UserAreas = that.areaArrayId; //区域
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
					app.getNetAddresss('api/MemberUser/create'),
					{
						BrandId: uni.getStorageSync('BrandId'),
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
			//获取省市区
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
			//省市区选择
			onConfirm(res, type) {
				console.log('onConfirm' + type, res);
				this.result = res;
				this.areaArrayId = res.value;
				console.log(res);
			},
			//点击省市区
			showPicker(type) {
				console.log('showPicker', type);
				this.$refs[type].show();
			},
			//省市区选中取消
			onCancel:function() {},
			//单选
			clickBtn(index){
				console.log("选中的单选项是",index);
				// 单选
				if(index!=this.Sex){
					this.Sex = index;
				}else{
					this.Sex = -1;    //不注释则可以点击取消，注释之后点击就不再取消
				}
			},
			// 来源
			SoureChange:function(e){
				console.log('picker发送选择改变，携带值为', e)
				var id = e.detail.value;
				this.SoureId = id;
			},
			// 渠道
			OpenSourceChange:function(e){
				console.log('picker发送选择改变，携带值为', e)
				var value = e.detail.value;
				this.OpenSource = value;
			},
		}
	}
</script>

<style lang="scss">
@import '/static/css/main.css';
@import '/static/css/icon.css';
// 性别start
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
// 性别stop
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
	.cu-form-group picker .picker {
		padding-left:0rpx;
	}
</style>
