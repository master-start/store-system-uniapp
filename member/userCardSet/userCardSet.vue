<template>
	<view>
		<view class="content">
			<!-- <view class="navigation_menu">门店管理 - 会员卡类型设置 - 卡类型设置</view> -->
			<view class="c_list">
				<view class="c_list_item idno">编号</view>
				<view class="c_list_item">类型名称</view>
				<view class="c_list_item">卡有效期</view>
				<view class="c_list_item">操作处理</view>
			</view>
			<view v-for="(item,index) in UserCardType" :key="item.id">
				<block>
					<view class="c_list" hover-class="colorhui" hover-stay-time="600">
						<view class="c_list1">{{item.id}}</view>
						<view class="c_list2">{{item.Name}}</view>
						<view class="c_list3">{{item.CardValidityNumber}}天</view>
						<view class="c_list4">
							<view class="action" v-on:click="editUserCardType(item.id,mark)">修改</view>
							<view class="action" v-on:click="deleteUserCardType(item.id)">删除</view>
						</view>
					</view>
				</block>
				<block v-if="mark && curId == item.id">
					<view class="c_list addHeight30 colorhui">
						<form @submit="editformSubmit" :id="item.id">
							<view class="c_list_item"><input class="form-input" name="Name" :value='item.Name' placeholder="请输入卡名称" /></view>
							<view class="c_list_item"><input type="digit" class="form-input" :value="item.CardValidityNumber" name="CardValidityNumber" placeholder="请输入天数" /></view>
							<view class="c_list_item"><button class="form-submit" :id="item.id" form-type="submit" type="primary" size="mini">修改</button></view>
						</form>
					</view>
				</block>
			</view>
			<view class="c_list addHeight30">
				<form @submit="formSubmit" @reset="formReset">
				<view class="c_list_item"><input class="form-input" name="Name" placeholder="请输入卡名称" /></view>
				<view class="c_list_item"><input type="digit" class="form-input" name="CardValidityNumber" placeholder="请输入天数" /></view>
				<view class="c_list_item"><button class="form-submit" form-type="submit" type="primary" size="mini">{{buttonName}}</button></view>
				</form>
			</view>
			
		</view>
	</view>
</template>
<style lang="scss" scoped>
	.form-input{
		width: 90%;
		height: 50rpx;
		line-height: 100rpx;
		border: solid 1rpx #c9D9D9;
		padding: 8rpx;
		margin-top: 25rpx;
	}
	.form-submit{
		width: 220rpx;
		height: 65rpx;
		line-height: 60rpx;
		margin-top: 28rpx;
	}
	.c_list{
		background-color: #FFFFFF;
		height: auto;
		width: 100%;
		display: flex;
		line-height: 100rpx;
		// flex-wrap: wrap;
		flex-flow: row nowrap;
		justify-content: center;
		margin: 10rpx auto;
	}
	.left20{
		// margin-left: 50rpx;
		text-align: left;
		width: 50%;
		// padding-left: 20rpx;
	}
	.colorhui{
		background-color: #108080;
		color: #ffffff;
	}
	.addHeight30{
		padding-bottom: 30rpx;
	}
	.CardValidityNumber{
		padding-left: 10rpx;
	}
	.c_list1{
		float: left;
		line-height: 100rpx;
		text-align: left;
		width: 12%;
		// display: flex;
		// flex-flow: row nowrap;
	}
	.c_list2{
		float: left;
		line-height: 100rpx;
		text-align: left;
		width: 30%;
		// display: flex;
		// flex-flow: row nowrap;
	}
	.c_list3{
		float: left;
		line-height: 100rpx;
		text-align: left;
		width: 25%;
		// display: flex;
		// flex-flow: row nowrap;
	}
	.c_list4{
		float: left;
		line-height: 100rpx;
		text-align: right;
		width: 25%;
		display: flex;
		flex-flow: row nowrap;
	}
	.c_list_items{
		float: left;
		line-height: 100rpx;
		text-align: left;
		width: 27%;
		display: flex;
		flex-flow: row nowrap;
	}
	.c_list_item{
		float: left;
		line-height: 100rpx;
		text-align: left;
		padding-left: 20rpx;
		width: 30%;
		display: flex;
		flex-flow: row nowrap;
	}
	.idno{
		width: 10%;
		margin-left: 2rpx;
	}
	.left10{
		margin-left: 10rpx;
	}
	.action{
		margin-left: 10rpx;
		margin-right: 10rpx;
	}
	.navigation_menu{
		background-color: #FFFFFF;
		font-size: .8rem;
		font-weight: bold;
		color: #333333;
		height: 100rpx;
		line-height: 100rpx;
		text-align: left;
		padding-left: 30rpx;
		border-bottom: solid 2rpx #CCCCCC;
		margin-bottom: 10rpx;
	}
</style>
<script>
	const app = getApp();
	const globalData = app.globalData;
	const imgHost = globalData.imgHost;
	export default {
		data() {
			return {
				'UserCardType':[],
				'buttonName':"添加",
				'mark':false,
				'curId':null
			}
		},
		onLoad: function(e) {
			console.log("页面初始化执行一次 onLoad",e)
			this.getUserCardType();
		},
		onShow:function(e){
			console.log("页面初始化执行一次 onShow",e)
		},
		methods: {
			//删除会员卡类型
			deleteUserCardType:function(id){
				var that = this;
				if(id){
					uni.showModal({
						title:"操作提示",
						content:"是否要进行删除id为" + id + "的数据",
						success:function(e){
							if (e.cancel) {
							    console.log('用户点击取消');
								return;
							}
							app.request().postRequest(app.getNetAddresss('api/card/delCardType'), {
								//请求的参数：a:b
								"id":id
							}, {
								'content-type': 'application/x-www-form-urlencoded'
							}).then(res => {
								if (res.code === 1) {
									uni.showModal({
										showCancel:false,
										title:"操作提示",
										content:res.msg,
										success:function(res){
											//调用成功刷新数据
											that.getUserCardType();
										}
									})
									that.getUserCardType();
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
						}
					})
					return;
				}else{
					uni.showToast({
						title:"数据错误"
					})
				}
				console.log("删除会员卡的id是",id);
				
			},
			//获取会员卡列表数据
			getUserCardType:function(){
				app.request().postRequest(app.getNetAddresss('api/card/getCardType'), {
					//请求的参数：a:b
				}, {
					'content-type': 'application/x-www-form-urlencoded'
				}).then(res => {
					this.UserCardType = res.result.data;
					console.log("获取到的会员卡列表数据为：",this.UserCardType);
				})
			},
			//增加会员卡类型
			formSubmit:function(e){
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				var that = this;
				app.request().postRequest(app.getNetAddresss('api/card/addCardType'), {
					'CardValidityNumber':formdata.CardValidityNumber,
					'Name':formdata.Name
				}, {
					'content-type': 'application/x-www-form-urlencoded'
				}).then(res => {
					if (res.code === 1) {
						uni.showModal({
							showCancel:false,
							title:"操作提示",
							content:res.msg,
							success:function(res){
								//调用成功刷新数据
								that.getUserCardType();
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
			//修改会员卡类型
			editUserCardType:function(id,mark){
				if(id && !mark){
					this.mark = true;
					this.curId = id;
				}else{
					this.mark = false;
					this.curId = null;
				}
				return;
			},
			//提交修改会员卡类型
			editformSubmit:function(e){
				console.log("提交修改的内容为",e)
				var id = e.target.id;
				var Name = e.target.value.Name;
				var CardValidityNumber = e.target.value.CardValidityNumber;
				var that = this;
				app.request().postRequest(app.getNetAddresss('api/card/editCardType'), {
					'CardValidityNumber':CardValidityNumber,
					'Name':Name,
					'id':id
				}, {
					'content-type': 'application/x-www-form-urlencoded'
				}).then(res => {
					if (res.code === 1) {
						uni.showModal({
							showCancel:false,
							title:"操作提示",
							content:res.msg,
							success:function(res){
								//调用成功刷新数据
								that.getUserCardType();
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
			}
		}
	}
</script>