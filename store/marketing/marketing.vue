<template>
	<view class="content">
		
		<aloys-tab :tabs="tabs" :circular="circular" @change="onTabChange">
			<view slot="content0" style="margin-top: 10rpx;">
				<view class="content-info">
					
					<view class="cu-form-group section">
						<view class="title">是否开启满额优惠：</view>
						<radio-group class="switch-group" @change="radioIsEnoughReduceChange">
							<view class="swtich-label" name="IsEnoughReduce" v-for="(ite, inx) in IsEnoughReduce_Data" :key="inx">
								<radio :value="ite.value" name="IsEnoughReduce" :checked="ite.checked" />
								<text>{{ ite.name }}</text>
							</view>
						</radio-group>
					</view>
					
					<view v-for="(item,index) in EnoughReduceData" :key="item.id">
						<block>
							<view class="c_list" hover-class="colorhui" hover-stay-time="600">
								<view class="c_list2">满{{item.Price}}元</view>
								<view class="c_list3">减{{item.Content}}元</view>
								<view class="c_list4">
									<view class="action" v-on:click="editEnoughReduce(item.id,mark)">修改</view>
									<view class="action" v-on:click="deleteEnoughReduce(item.id)">删除</view>
								</view>
							</view>
						</block>
						<block v-if="mark && curId == item.id">
							<view class="c_list addHeight30 colorhui">
								<form @submit="editEnoughReduceform" :id="item.id">
									<view class="c_list_item"><input class="form-input" name="Price"  :value='item.Price' type="digit" placeholder="满*元" /></view>
									<view class="c_list_item"><input  class="form-input" name="Content" :value="item.Content"  type="digit" placeholder="减*元" /></view>
									<view class="c_list_item"><button class="form-submit" :id="item.id" form-type="submit" type="primary">修改</button></view>
								</form>
							</view>
						</block>
						</view>
						<view class="c_list addHeight30">
							<form @submit="addEnoughReduceform" @reset="formReset">
								<view class="c_list_item"><input class="form-input" name="Price" type="digit" placeholder="满*元" /></view>
								<view class="c_list_item"><input class="form-input" name="Content" type="digit" placeholder="减*元" /></view>
								<view class="c_list_item"><button class="form-submit" form-type="submit" type="primary" size="mini">增加满减优惠规则</button></view>
							</form>
						</view>
				</view>
			</view>
			<view slot="content1" style="margin-top: 10rpx;">
				<view class="content-info">
					
					<view class="cu-form-group section">
						<view class="title">是否开启满送优惠：</view>
						<radio-group class="switch-group" @change="radioIsEnoughReduceGiveChange">
							<view class="swtich-label" name="IsEnoughReduceGive" v-for="(ite, inx) in IsEnoughReduceGive_Data" :key="inx">
								<radio :value="ite.value" name="IsEnoughReduceGive" :checked="ite.checked" />
								<text>{{ ite.name }}</text>
							</view>
						</radio-group>
					</view>
					<view v-for="(item,index) in EnoughReduceGiveData" :key="item.id">
						<block>
							<view class="c_list" hover-class="colorhui" hover-stay-time="600">
								<view class="c_list2">满{{item.Price}}元</view>
								<view class="c_list3">送{{item.Content}}元</view>
								<view class="c_list4">
									<view class="action" v-on:click="editEnoughReduce(item.id,mark)">修改</view>
									<view class="action" v-on:click="deleteEnoughReduce(item.id)">删除</view>
								</view>
							</view>
						</block>
						<block v-if="mark && curId == item.id">
							<view class="c_list addHeight30 colorhui">
								<form @submit="editEnoughReduceGiveform" :id="item.id">
									<view class="c_list_item"><input class="form-input" name="Price"  :value='item.Price' type="digit" placeholder="满*元" /></view>
									<view class="c_list_item"><input  class="form-input" name="Content" :value="item.Content"  type="digit" placeholder="减*元" /></view>
									<view class="c_list_item"><button class="form-submit" :id="item.id" form-type="submit" type="primary">修改</button></view>
								</form>
							</view>
						</block>
						</view>
						<view class="c_list addHeight30">
							<form @submit="addEnoughReduceGiveform" @reset="formReset">
								<view class="c_list_item"><input class="form-input" name="Price" type="digit" placeholder="满*元" /></view>
								<view class="c_list_item"><input class="form-input" name="Content" type="digit" placeholder="送*元" /></view>
								<view class="c_list_item"><button class="form-submit" form-type="submit" type="primary" size="mini">增加满送优惠规则</button></view>
							</form>
						</view>
					
				</view>
			</view>
			<view slot="content2" style="margin-top: 10rpx;">
				<view class="content-info">
					
					<view class="cu-form-group section">
						<view class="title">是否开启满就打折：</view>
						<radio-group class="switch-group" @change="radioIsEnoughReduceDiscountChange">
							<view class="swtich-label" name="IsEnoughReduceDiscount" v-for="(ite, inx) in IsEnoughReduceDiscount_Data" :key="inx">
								<radio :value="ite.value" name="IsEnoughReduceDiscount" :checked="ite.checked" />
								<text>{{ ite.name }}</text>
							</view>
						</radio-group>
					</view>
					<view v-for="(item,index) in EnoughReduceDiscountData" :key="item.id">
						<block>
							<view class="c_list" hover-class="colorhui" hover-stay-time="600">
								<view class="c_list2">满{{item.Price}}元</view>
								<view class="c_list3">打{{item.Content}}折</view>
								<view class="c_list4">
									<view class="action" v-on:click="editEnoughReduce(item.id,mark)">修改</view>
									<view class="action" v-on:click="deleteEnoughReduce(item.id)">删除</view>
								</view>
							</view>
						</block>
						<block v-if="mark && curId == item.id">
							<view class="c_list addHeight30 colorhui">
								<form @submit="editEnoughReduceDiscountform" :id="item.id">
									<view class="c_list_item"><input class="form-input" name="Price"  :value='item.Price' type="digit" placeholder="满*元" /></view>
									<view class="c_list_item"><input  class="form-input" name="Content" :value="item.Content"  type="digit" placeholder="打*折" /></view>
									<view class="c_list_item"><button class="form-submit" :id="item.id" form-type="submit" type="primary">修改</button></view>
								</form>
							</view>
						</block>
						</view>
						<view class="c_list addHeight30">
							<form @submit="addEnoughReduceDiscountform" @reset="formReset">
								<view class="c_list_item"><input class="form-input" name="Price" type="digit" placeholder="满*元" /></view>
								<view class="c_list_item"><input class="form-input" name="Content" type="digit" placeholder="打*折" /></view>
								<view class="c_list_item"><button class="form-submit" form-type="submit" type="primary" size="mini">增加满折优惠规则</button></view>
							</form>
						</view>
					
				</view>
			</view>
			<view slot="content3" style="margin-top: 10rpx;">
				<form @submit="MarketingFormSubmit">
				<view class="content-info">
					<view class="cu-form-group section">
						<view class="title">全场打折：</view>
						<input type="text" name="AllDiscount" :value="MarketingData.AllDiscount" placeholder="设置全场打折其他打折类将起优先作用" />
						<text>折扣</text>
					</view>
					<view class="cu-form-group section">
						<view class="title">全场赠送：</view>
						<input type="digit" name="AllGivePrice" :value="MarketingData.AllGivePrice" placeholder="设置全场赠送其他赠送类将起优先作用" />
						<text>元钱</text>
					</view>
					<view class="button_submit"><button type="warn"  form-type="submit">提 交</button></view>
				</view>
				</form>
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
						title: '满额就减'
					},
					{
						title: '满额就送'
					},
					{
						title: '满额打折'
					},
					{
						title: '全场优惠'
					}
				],
				circular:true,
				
				UserLevelList:[],
				
				IsEnoughReduce_Data:[
					{ name: '不开启', value: '0', checked: true }, 
					{ name: '开启', value: '1', checked: false }, 
				],
				IsEnoughReduce:0,
				
				EnoughReduceData:[],
				mark:false,
				curId:null,
				
				IsEnoughReduceGive_Data:[
					{ name: '不开启', value: '0', checked: true }, 
					{ name: '开启', value: '1', checked: false }, 
				],
				IsEnoughReduceGive:0,
				
				EnoughReduceGiveData:[],
				
				
				IsEnoughReduceDiscount_Data:[
					{ name: '不开启', value: '0', checked: true }, 
					{ name: '开启', value: '1', checked: false }, 
				],
				IsEnoughReduceDiscount:0,
				
				EnoughReduceDiscountData:[],
				
				MarketingData:'',
			}
		},
		onLoad() {
			this.getMarketingData();
			this.getUserLevelList();
			this.getEnoughReduceList();
			this.getEnoughReduceGiveList();
			this.getEnoughReduceDiscountList();
		},
		methods: {
			
			//修改动作
			editEnoughReduce(id,mark){
				if(id && !mark){
					this.mark = true;
					this.curId = id;
				}else{
					this.mark = false;
					this.curId = null;
				}
				return;
			},
			//修改满额数据
			editEnoughReduceform(e){
				console.log("提交修改的内容为",e)
				var id = e.target.id;
				var Price = e.target.value.Price;
				var Content = e.target.value.Content;
				var that = this;
				app.request().postRequest(app.getNetAddresss('api/GoodsEnoughReduce/edit'), {
					'Price':Price,
					'Content':Content,
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
								that.getEnoughReduceList();
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
			
			//修改满额数据
			editEnoughReduceDiscountform(e){
				console.log("提交修改的内容为",e)
				var id = e.target.id;
				var Price = e.target.value.Price;
				var Content = e.target.value.Content;
				var that = this;
				app.request().postRequest(app.getNetAddresss('api/GoodsEnoughReduce/edit'), {
					'Type':2,
					'Price':Price,
					'Content':Content,
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
								that.getEnoughReduceDiscountList();
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
			
			//修改满额数据
			editEnoughReduceGiveform(e){
				console.log("提交修改的内容为",e)
				var id = e.target.id;
				var Price = e.target.value.Price;
				var Content = e.target.value.Content;
				var that = this;
				app.request().postRequest(app.getNetAddresss('api/GoodsEnoughReduce/edit'), {
					'Type':1,
					'Price':Price,
					'Content':Content,
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
								that.getEnoughReduceGiveList();
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
			
			//删除满额数据
			deleteEnoughReduce(id){
				var that = this;
				uni.showModal({
					title:"操作提示",
					content:"是否要进行删除id为" + id + "的数据",
					success:function(e){
						if (e.cancel) {
						    console.log('用户点击取消');
							return;
						}
						app.request().postRequest(app.getNetAddresss('api/GoodsEnoughReduce/delete'), {
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
										that.getEnoughReduceList();
										that.getEnoughReduceGiveList();
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
				})
			},
			
			//获取满折列表
			getEnoughReduceDiscountList(){
				app.request().postRequest(
					app.getNetAddresss('api/GoodsEnoughReduce/getList'),
					{
						Type:2,
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
						console.log("EnoughReduceDiscountData获取到的列表数据为",res.result.data);
						this.EnoughReduceDiscountData = res.result.data;
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
			
			//获取满送列表
			getEnoughReduceGiveList(){
				app.request().postRequest(
					app.getNetAddresss('api/GoodsEnoughReduce/getList'),
					{
						Type:1,
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
						console.log("EnoughReduceData获取到的列表数据为",res.result.data);
						this.EnoughReduceGiveData = res.result.data;
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
			
			//获取满减列表
			getEnoughReduceList(){
				app.request().postRequest(
					app.getNetAddresss('api/GoodsEnoughReduce/getList'),
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
						console.log("EnoughReduceData获取到的列表数据为",res.result.data);
						this.EnoughReduceData = res.result.data;
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
			
			//添加满折活动
			addEnoughReduceDiscountform(input){
				console.log("增加满减活动",input);
				var formdata = input.detail.value
				formdata['Type'] = 2;
				var that = this;
				app.request().postRequest(app.getNetAddresss('api/GoodsEnoughReduce/create'), 
				formdata,
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
								that.getEnoughReduceDiscountList();
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
			
			//添加满减活动Discount
			addEnoughReduceGiveform(input){
				console.log("增加满减活动",input);
				var formdata = input.detail.value
				formdata['Type'] = 1;
				var that = this;
				app.request().postRequest(app.getNetAddresss('api/GoodsEnoughReduce/create'), 
				formdata,
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
								that.getEnoughReduceGiveList();
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
			
			//添加满减活动
			addEnoughReduceform(input){
				console.log("增加满减活动",input);
				var formdata = input.detail.value
				var that = this;
				app.request().postRequest(app.getNetAddresss('api/GoodsEnoughReduce/create'), 
				formdata,
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
								that.getEnoughReduceList();
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
			
			//设置全局优惠活动
			MarketingFormSubmit(input){
				var that = this;
				let postData = input.detail.value;
				console.log("获取到的input",postData)
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
								that.getData();
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
			
			//是否开启满折活动
			radioIsEnoughReduceDiscountChange(res){
				this.IsEnoughReduceDiscount = res.detail.value;
				var postData = {
					'IsEnoughReduceDiscount':res.detail.value
				}
				this.globalPost(postData);
			},
			
			//是否开启满额活动
			radioIsEnoughReduceGiveChange(res){
				this.IsEnoughReduceGive = res.detail.value;
				var postData = {
					'IsEnoughReduceGive':res.detail.value
				}
				this.globalPost(postData);
			},
			
			//是否开启满额活动
			radioIsEnoughReduceChange(res){
				this.IsEnoughReduce = res.detail.value;
				var postData = {
					'IsEnoughReduce':res.detail.value
				}
				this.globalPost(postData);
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
			getMarketingData(){
				app.request().postRequest(app.getNetAddresss('api/Marketing/getData'),
				{},
				{
					'content-type': 'application/x-www-form-urlencoded'
				}).then(res => {
					if (res.code === 1) {
						console.log("获取到的数据为",res.result);
						this.MarketingData = res.result.data;
						let Reduce = res.result.data.IsEnoughReduce;
						this.IsEnoughReduce = Reduce;
						this.IsEnoughReduce_Data[Reduce].checked = true;
						
						let Give = res.result.data.IsEnoughReduceGive;
						this.IsEnoughReduceGive = Give;
						this.IsEnoughReduceGive_Data[Give].checked = true;
						
						let Discount = res.result.data.IsEnoughReduceDiscount;
						this.IsEnoughReduceDiscount = Discount;
						this.IsEnoughReduceDiscount_Data[Discount].checked = true;
						
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
			//获取会员级别
			getUserLevelList(){
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
						console.log("获取到的列表数据为",res.result.data);
						this.UserLevelList = res.result;
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
		flex-flow: row nowrap;
		justify-content: center;
		margin: 10rpx auto;
	}
	.left20{
		text-align: left;
		width: 50%;
	}
	.colorhui{
		background-color: #108080;
		color: #ffffff;
	}
	.addHeight30{
		padding-bottom: 30rpx;
	}
	.Sort{
		padding-left: 10rpx;
	}
	.c_list1{
		float: left;
		line-height: 100rpx;
		text-align: left;
		width: 30%;
	}
	.c_list2{
		float: left;
		line-height: 100rpx;
		text-align: left;
		width: 30%;
	}
	.c_list3{
		float: left;
		line-height: 100rpx;
		text-align: left;
		width: 30%;
	}
	.c_list4{
		float: right;
		line-height: 100rpx;
		text-align: right;
		width: 30%;
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
		margin: 0rpx 15rpx;
	}
</style>
