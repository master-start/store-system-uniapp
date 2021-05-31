<template>
	<view>
		<!-- 生产供应商 -->
		<view class="content">
			<click-tab :tabs="tabs" @onClickChange="onTabChange">
				<view slot="content0">
					<view :class="content0">
						<view class="ContentBackground">
							<form @submit="addFormSubmit">
								<view class="create-content">

									<view class="cu-form-group section">
										<view class="title">生产供应商名称：</view>
										<input type="text" name="Name" placeholder="请输入生产供应商名称" />
									</view>
									
									<view class="cu-form-group section">
										<view class="title">生产供应商描述：</view>
										<input type="text" name="Desc" placeholder="请输入生产供应商描述" />
									</view>
									
									<view class="cu-form-group section">
										<view class="title">生产供应商排序：</view>
										<input type="text" name="Sort" value="1" placeholder="请输入排序数字" />
									</view>
									
									<view class="cu-form-group section">
										<view class="title">是否隐藏：</view>
										<!-- <input type="text" name="Is_Hide" placeholder="请输入排序数字" /> -->
										<radio-group class="switch-group" @change="radioChange">
											<view class="swtich-label" name="Is_Hide" v-for="(ite, inx) in Is_Hide_Data" :key="inx">
												<radio :value="ite.value" name="Is_Hide" :checked="ite.checked" />
												<text>{{ ite.name }}</text>
											</view>
										</radio-group>
									</view>
									<view class="button_submit"><button type="primary"  form-type="submit">提 交</button></view>
								</view>
							</form>
						</view>
					</view>
				</view>
				<view slot="content1">
					<view :class="content1">
						<view class="ContentBackground">
							<goods-production-list :list="setDataList" :button="buttonList" :border="true" @click="clickMethod" @change="changeMethod"></goods-production-list>
						</view>
						<pop ref="pop" :direction="direction" :is_close="true" :is_mask="true" :width="100">
							<view>
									<view class="ContentBackground">
										<form @submit="editFormSubmit" :id="setDataInfo.id">
											<view class="create-content">
								
												<view class="cu-form-group section">
													<view class="title">生产供应商名称：</view>
													<input type="text" name="Name" :value="setDataInfo.Name" placeholder="请输入生产供应商名称" />
												</view>
												
												<view class="cu-form-group section">
													<view class="title">生产供应商描述：</view>
													<input type="text" name="Desc" :value="setDataInfo.Desc" placeholder="请输入生产供应商描述" />
												</view>
												
												<view class="cu-form-group section">
													<view class="title">生产供应商排序：</view>
													<input type="text" name="Sort" :value="setDataInfo.Sort" placeholder="请输入排序数字" />
												</view>
												
												<view class="cu-form-group section">
													<view class="title">是否隐藏：</view>
													<!-- <input type="text" name="Is_Hide" placeholder="请输入排序数字" /> -->
													<radio-group class="switch-group" @change="radioChange">
														<view class="swtich-label" name="Is_Hide" v-for="(ite, inx) in Is_Hide_Data" :key="inx">
															<radio :value="ite.value" name="Is_Hide" :checked="ite.checked" />
															<text>{{ ite.name }}</text>
														</view>
													</radio-group>
												</view>
												<view class="button_submit"><button type="primary" :id="setDataInfo.id" form-type="submit">提交更新</button></view>
											</view>
										</form>
									</view>
								</view>
						</pop>
					</view>
				</view>
			</click-tab>
		</view>
	</view>
</template>

<script>
//滑动菜单框架
import clickTab from '@/components/aloys-tab/click-tab.vue';
//列表数据
import goodsProductionList from '@/components/mark-slide-list/goods-production-list.vue';
//弹窗
import pop from "@/components/ming-pop/ming-pop.vue"
const app = getApp({ allowDefault: true });
const globalData = app.globalData;
export default {
	components: { clickTab,goodsProductionList,pop },
	data() {
		return {
			tabs: [
				{
					title: '添加生产供应商'
				},
				{
					title: '生产供应商管理'
				}
			],
			Is_Hide_Data:[
				{ name: '显示', value: '0', checked: true }, 
				{ name: '隐藏', value: '1', checked: false },
			],
			Is_Hide:0,
			setDataList:[],
			setDataInfo:[],
			buttonList: [
				{
					title: '编辑',
					background: '#0f80ff'
				},
				{
					title: '隐藏',
					background: '#ff3b32'
				}
			],
			direction: "right",
			content0:'',
			content1:'hide_view'
		};
	},
	onLoad() {
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
		this.getDataList();
	},
	methods: {
		//滑动菜单促发事件
		onTabChange(res) {
			console.log("onTabChange",res);
			if(res == 0){
				this.content1 = 'hide_view'
				this.content0 = 'block_view'
			}
			if(res == 1){
				this.content0 = 'hide_view'
				this.content1 = 'block_view'
				this.getDataList();
			}
		},
		//单选
		radioChange(res){
			console.log("点击的内容",res);
			this.Is_Hide = res.detail.value;
		},
		//滑动效果
		changeMethod(data, button, index){
			console.log('change',data);
			var that = this;
			var actionTitle = button;
			if(actionTitle == "编辑"){
				console.log("跳转到编辑的页面");
				this.setDataInfo = data;
				var ishide = data.Is_Hide;
				console.log('停用还是隐藏',ishide);
				if(ishide == 0){
					this.Is_Hide_Data = [
						{ name: '启用', value: '0', checked: true }, 
						{ name: '禁用', value: '1', checked: false },
					];
				}
				if(ishide == 1){
					this.Is_Hide_Data = [
						{ name: '启用', value: '0', checked: false }, 
						{ name: '禁用', value: '1', checked: true },
					];
				}
				this.$refs.pop.show();
			}
			
			if(actionTitle == "停用"){
				console.log("停用提示");
				uni.showModal({
					title:"温馨提示",
					content:"请确认要停用隐藏此条数据吗？",
					success:function(res){
						if (res.confirm) {
							console.log('用户点击确定');
							app.request().postRequest(app.getNetAddresss('api/GoodsProduction/modifyStatus'), {
								'id':data.id,
								'Is_Hide':1
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
											that.getDataList();
											// uni.redirectTo({
											// 	url:"/goods/production/production"
											// });
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
					content:"请确认要启用此数据吗？",
					success:function(res){
						if (res.confirm) {
							console.log('用户点击确定');
							app.request().postRequest(app.getNetAddresss('api/GoodsProduction/modifyStatus'), {
								'id':data.id,
								'Is_Hide':0
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
											that.getDataList();
											// uni.redirectTo({
											// 	url:"/goods/production/production"
											// });
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
		//点击
		clickMethod(data){
			console.log('单击',data)
			this.setDataInfo = data;
			var ishide = data.Is_Hide;
			this.Is_Hide = ishide;
			console.log('停用还是隐藏',ishide);
			if(ishide == 0){
				this.Is_Hide_Data = [
					{ name: '启用', value: '0', checked: true }, 
					{ name: '禁用', value: '1', checked: false },
				];
			}
			if(ishide == 1){
				this.Is_Hide_Data = [
					{ name: '启用', value: '0', checked: false }, 
					{ name: '禁用', value: '1', checked: true },
				];
			}
			this.$refs.pop.show();
		},
		
		getDataList(){
			app.request().postRequest(
				app.getNetAddresss('api/GoodsProduction/getList'),
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
					console.log("获取到的列表数据为",res.result.data);
					this.setDataList = res.result;
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
		//编辑提交
		editFormSubmit(input){
			console.log(input)
			let Is_Hide = this.Is_Hide;
			console.log("近",Is_Hide);
			var that = this;
			let Name = input.detail.value.Name;
			if(!Name){
				uni.showModal({
					title:'操作提示',
					content:'生产供应商名称不能为空',
					showCancel:false
				})
				return;
			}
			let Desc = input.detail.value.Desc;
			let Sort = input.detail.value.Sort;
			let id = input.target.id;
			app.request().postRequest(
				app.getNetAddresss('api/GoodsProduction/edit'),
				{
					BrandId: uni.getStorageSync('BrandId'),
					Name: Name,
					id: id,
					Desc: Desc,
					Sort: Sort,
					Is_Hide: Is_Hide,
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
							that.content0 = 'hide_view'
							that.content1 = 'block_view'
							that.getDataList();
							// uni.redirectTo({
							// 	url:"/goods/production/production"
							// });
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
		//新增提交
		addFormSubmit(input){
			console.log(input)
			var that = this;
			let Name = input.detail.value.Name;
			if(!Name){
				uni.showModal({
					title:'操作提示',
					content:'生产供应商名称不能为空',
					showCancel:false
				})
				return;
			}
			let Desc = input.detail.value.Desc;
			let Sort = input.detail.value.Sort;
			let Is_Hide = this.Is_Hide;
			app.request().postRequest(
				app.getNetAddresss('api/GoodsProduction/create'),
				{
					BrandId: uni.getStorageSync('BrandId'),
					Name: Name,
					// Logo: Logo,
					Desc: Desc,
					Sort: Sort,
					Is_Hide: Is_Hide,
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
							// that.content0 = 'hide_view'
							// that.content1 = 'block_view'
							// that.getDataList();
							uni.redirectTo({
								url:"/goods/production/production"
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
		}
	}
};
</script>

<style lang="scss">
@import '/static/css/main.css';
@import '/static/css/icon.css';
.content {
	position: absolute;
	height: 100%;
	background-color: #f1f5f8;
}
.hide_view{
	display: none;
}
.block_view{
	display: block;
}
.ContentBackground{
	margin-top: 20rpx;
	width: 100%;
}
.switch-group {
	flex: 1;
	display: flex;
}
.swtich-label {
	margin-right: 30rpx;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
