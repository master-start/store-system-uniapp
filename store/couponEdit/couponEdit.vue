<template>
	<view class="content-info">
		<form @submit="editCouponForm" :id="CouponInfo.id">
			<view class="content-info">
			
			<view class="cu-form-group section">
				<view class="title">优惠券展示排序：</view>
				<input type="number" name="Sort" :value="CouponInfo.Sort" placeholder="请输入排序数字" />
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
				<input type="text" name="Name" :value="CouponInfo.Name" placeholder="请输入优惠券名称" />
			</view>
			
			<view class="cu-form-group section">
				<view class="title">优惠券描述说明：</view>
				<input type="text" name="Description" :value="CouponInfo.Description" placeholder="请输入优惠券描述" />
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
				<input type="digit" name="Enough" :value="CouponInfo.Enough" placeholder="请输入使用条件 - 订单金额" />
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
					<input type="digit" name="discount" :value="CouponInfo.discount" :placeholder="CouponMethodValue" />
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
				<input type="number" name="GetMax" :value="CouponInfo.GetMax" placeholder="请输入每人限领张数" />
			</view>
			
			<view class="cu-form-group section">
				<view class="title">总计发放总数：</view>
				<input type="number" name="Total" :value="CouponInfo.Total" placeholder="请输入总计发放总数" />
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
					<input type="number" name="TimeDays" :value="CouponInfo.TimeDays" placeholder="获得优惠券*天内有效(0为不限时间使用)" />
					<view style="margin-right: 20rpx;">天</view>
				</view>
			</view>
			<w-picker
				mode="date"
				:startYear="startYear"
				:endYear="endYear"
				:fields="fields"
				:value="CouponInfo.TimeStart"
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
				:value="CouponInfo.TimeEnd"
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
			
			<view class="button_submit"><button type="warn" :id="CouponInfo.id" form-type="submit">提 交</button></view>
			
			
		</view>
		</form>
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
				//适用范围：0=,1=,2=,3=指定门店,4=指定品牌
				UseTypeArray:['全类适用','指定分类','指定商品','指定门店','指定品牌'],
				UseType:0,
				
				TimeLimit_Data:[
					{ name: '天数限制', value: '0', checked: false }, 
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
					{ name: '开启', value: '1', checked: false }, 
				],
				Status:1,
				
				Is_Hide_Data:[
					{ name: '显示', value: '0', checked: false }, 
					{ name: '隐藏', value: '1', checked: false }, 
				],
				Is_Hide:0,
				
				GetType_Data:[
					{ name: '不可领取', value: '0', checked: false }, 
					{ name: '可领取', value: '1', checked: false }, 
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
				
				CouponInfo:{},
			}
		},
		onLoad(e) {
			console.log("载入的数据为",e);
			var id = e.id;
			if(id){
				this.getCouponInfo(id);
			}else{
				uni.showModal({
					title:"温馨提醒",
					content:"进入编辑的路径不对",
					showCancel:false,
					success(res) {
						if(res.confirm){
							uni.redirectTo({
								url:"/store/coupon/coupon"
							})
						}
					}
				})
			}
			this.getUserLevelData();
		},
		methods: {
			//编辑提交
			editCouponForm(input){
				console.log("提交过来的数据为",input);
				let postData = input.detail.value;
				postData.Status = this.Status;
				postData.Is_Hide = this.Is_Hide;
				postData.CouponMethod = this.CouponMethod;
				postData.UseType = this.UseType;
				postData.GetType = this.GetType;
				postData.UserLevelLimitId = this.UserLevelId;
				postData.TimeLimit = this.TimeLimit;
				let id = input.target.id;
				postData.id = id;
				console.log("postData内容是",postData);
				app.request().postRequest(app.getNetAddresss('api/Coupon/edit'),
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
			//获取优惠券详细信息
			getCouponInfo(id){
				if(!id){
					uni.showToast({
						title:"id不能为空",
					})
					return;
				}
				var that = this;
				app.request().postRequest(
					app.getNetAddresss('api/Coupon/getInfo'),
					{
						id:id,
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
						var data = res.result;
						this.CouponInfo = data;
						//关于选择的判断
						this.Status = data.Status;
						this.Status_Data[data.Status]['checked'] = true;
						
						this.Is_Hide = data.Is_Hide;
						this.Is_Hide_Data[data.Is_Hide]['checked'] = true;
						
						this.GetType = data.GetType;
						this.GetType_Data[data.GetType]['checked'] = true;
						
						this.UserLevelId = data.UserLevelLimitId;
						
						this.TimeStart = data.TimeStart;
						this.TimeEnd = data.TimeEnd;
						//适用范围 - 待完善
						this.UseType = data.UseType;
						
						
						this.TimeLimit = data.TimeLimit;
						this.TimeLimit_Data[data.TimeLimit]['checked'] = true;
						var TimeLimit =  data.TimeLimit;
						if(TimeLimit == 0){
							this.TimeLimit_class0 = "block_view";
							this.TimeLimit_class1 = "hide_view";
						}
						if(TimeLimit == 1){
							this.TimeLimit_class0 = "hide_view";
							this.TimeLimit_class1 = "block_view";
						}
						
						this.CouponMethod = data.CouponMethod;
						this.CouponMethod_Data[data.CouponMethod]['checked'] = true;
						var CouponMethod = data.CouponMethod;
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
						
						var UserLevelId = this.UserLevelId;
						
						var UserLevelArray = [];
						var UserLevelIdArray = [];
						
						UserLevelArray.push("所有会员级别");
						UserLevelIdArray.push(0);
						
						resultData.map((g,index)=>{
							UserLevelArray.push(g.LevelName)
							UserLevelIdArray.push(g.id)
							if(g.id == UserLevelId){
								this.UserLevelChangeId = parseInt(index) + 1;
							}
						})
						this.UserLevelArray = UserLevelArray;
						this.UserLevelIdArray = UserLevelIdArray;
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

