<template>
	<view>
		<view class="content">
			<click-tab :tabs="tabs" @onClickChange="onTabChange">
				<view slot="content0">
					<view :class="content0">
						<view class="ContentBackground">
							<form @submit="addFormSubmit">
								<view class="create-content">
									
									<view class="cu-form-group section">
										<view class="title">上级分类：</view>
										<picker @change="GoodsCategoryChange" header-text="请选择上级分类"  :range="GoodsCategoryArray">
										  <view class="picker">
										      当前选择：{{GoodsCategoryArray[GoodsCategoryChangeId]}}
										  </view>
										</picker>
									</view>
									
									<view class="cu-form-group section">
										<view class="title">分类名称：</view>
										<input type="text" name="Name" placeholder="请输入分类名称" />
									</view>
									
									<view class="cu-form-group section">
										<view class="title">分类图片：</view>
										<tmUpload
											:url="upLoadUrl" 
											:upload_type="uploadType"
											:upload_count="uploadFirstImgCount"
											:upload_param="uploadParam"
											:upload_before_list="FirstImgList"
											:upload_cache_list="FirstImgList"
											@change="uploadFirstImgList"
											@remove="removeFirstImgList"
											ref="GoodsFirstImg"
											>
										</tmUpload>
									</view>
									
									<view class="cu-form-group section">
										<view class="title">分类描述：</view>
										<input type="text" name="Desc" placeholder="请输入分类描述" />
									</view>
									
									<view class="cu-form-group section">
										<view class="title">分类排序：</view>
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
							<goods-category-list :list="setDataList" :button="buttonList" :border="true" @click="clickMethod" @change="changeMethod"></goods-category-list>
						</view>
						<pop ref="pop" :direction="direction" :is_close="true" :is_mask="true" :width="100">
							<view>
									<view class="ContentBackground">
										<form @submit="editFormSubmit" :id="setDataInfo.id">
											<view class="create-content">
												
												<view class="cu-form-group section">
													<view class="title">上级分类：</view>
													<picker @change="GoodsCategoryChange" header-text="请选择上级分类"  :range="GoodsCategoryArray">
													  <view class="picker">
													      当前选择：{{GoodsCategoryArray[GoodsCategoryChangeId]}}
													  </view>
													</picker>
												</view>
												
												<view class="cu-form-group section">
													<view class="title">分类名称：</view>
													<input type="text" name="Name" :value="setDataInfo.Name" placeholder="请输入分类名称" />
												</view>
												
												<view class="cu-form-group section">
													<view class="title">分类图片：</view>
													<tmUpload
														:url="upLoadUrl" 
														:sunuiUploader="upUploaderUi"
														:upload_type="uploadType"
														:upload_count="uploadFirstImgCount"
														:upload_param="uploadParam"
														:upload_before_list="FirstImgList"
														:upload_cache_list="FirstImgList"
														@change="uploadFirstImgList"
														@remove="removeFirstImgList"
														ref="GoodsFirstImg"
														>
													</tmUpload>
												</view>
												
												<view class="cu-form-group section">
													<view class="title">分类描述：</view>
													<input type="text" name="Desc" :value="setDataInfo.Desc" placeholder="请输入分类描述" />
												</view>
												
												<view class="cu-form-group section">
													<view class="title">分类排序：</view>
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
	//上传照片
	import tmUpload from '@/components/tm-upload/tm-upload.vue';
//滑动菜单框架
import clickTab from '@/components/aloys-tab/click-tab.vue';
//列表数据
import goodsCategoryList from '@/components/mark-slide-list/goods-category-list.vue';
//弹窗
import pop from "@/components/ming-pop/ming-pop.vue"
const app = getApp({ allowDefault: true });
const globalData = app.globalData;
export default {
	components: { clickTab,goodsCategoryList,pop,tmUpload },
	data() {
		return {
			tabs: [
				{
					title: '添加分类'
				},
				{
					title: '分类管理'
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
			content1:'hide_view',
			
			GoodsCategoryArray:[],
			GoodsCategoryIdArray:[],
			GoodsCategoryChangeId:0,
			GoodsCategoryId:0,
			//照片上传
			upLoadUrl:'',
			uploadType:'image',
			upUploaderUi:"sunui-uploader-455",
			uploadCount:6,
			uploadParam:'files',
			uploadFirstImgCount:1,
			FirstImg:'', //商品首图
			FirstImgList:[],
			
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
		var upLoadUrl = app.getNetAddresss('api/UpLoad/index');
		this.upLoadUrl = upLoadUrl;
		this.getDataList();
		this.GoodsCategoryArray = this.setDataList;
	},
	onBackPress() {
		this.getDataList();
	},
	onShow() {
		this.getDataList();
	},
	methods: {
		//上传首图回调数据
		uploadFirstImgList(res){
			console.log("上传的首图信息为",res);
			var result = [];
			res.map((item,index)=>{
				result.push(item.path)
			})
			console.log("添加设置的数据为",result);
			this.FirstImgList = res;
			this.FirstImg = result;
		},
		
		//删除首图的回调信息
		removeFirstImgList(res){
			console.log("删除的首图信息为",res);
			//已有图片
			var ImgList = [];
			var result = [];
			if(res && res[0] != undefined){
				res.map((img,i)=>{
					ImgList.push(img);
					result.push(img.path);
				})
			}
			this.FirstImgList = ImgList;
			this.FirstImg = result;
		},
		
		//商品分类
		GoodsCategoryChange:function(e){
			console.log('picker发送选择改变，携带值为', e)
			var value = e.detail.value;
			this.GoodsCategoryId = this.GoodsCategoryIdArray[value];
			this.GoodsCategoryChangeId = value;
			console.log("获取到选择的id是",this.GoodsCategoryId)
		},
		//滑动菜单促发事件
		onTabChange(res) {
			console.log("onTabChange",res);
			if(res == 0){
				this.content1 = 'hide_view'
				this.content0 = 'block_view'
				this.FirstImgList = [];
				this.FirstImg = '';
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
				//图片
				if(data.Images){
					this.FirstImg = data.Images;
					var FirstImgList = new Array;
					FirstImgList[0] = {
						'path':data.Images
					};
					this.FirstImgList = FirstImgList;
				}else{
					this.FirstImg = '';
					this.FirstImgList = [];
				}
				
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
				//分类
				this.GoodsCategoryChangeId = data.Parent_id;
				this.$refs.pop.show();
			}
			
			if(actionTitle == "停用"){
				console.log("停用提示");
				uni.showModal({
					title:"温馨提示",
					content:"请确认要停用隐藏此条吗？",
					success:function(res){
						if (res.confirm) {
							console.log('用户点击确定');
							app.request().postRequest(app.getNetAddresss('api/GoodsCategory/modifyStatus'), {
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
							app.request().postRequest(app.getNetAddresss('api/GoodsCategory/modifyStatus'), {
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
											// 	url:"/goods/category/category"
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
			//图片
			if(data.Images){
				this.FirstImg = data.Images;
				var FirstImgList = new Array;
				FirstImgList[0] = {
					'path':data.Images
				};
				this.FirstImgList = FirstImgList;
			}else{
				this.FirstImg = '';
				this.FirstImgList = [];
			}
			
			var ishide = data.Is_Hide;
			this.Is_Hide = ishide;
			console.log('停用还是隐藏',ishide);
			//分类
			this.GoodsCategoryChangeId = data.Parent_id;
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
			uni.navigateTo({
				url:"../parentCategory/parentCategory?Parent_id="+data.id
			})
			// this.$refs.pop.show();
		},
		//获取分类列表
		getDataList(){
			app.request().postRequest(
				app.getNetAddresss('api/GoodsCategory/getList'),
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
					
					var productionData = res.result;
					var GoodsCategoryArray = [];
					var GoodsCategoryIdArray = [];
					
					GoodsCategoryArray.push("顶级分类");
					GoodsCategoryIdArray.push(0);
					
					productionData.map((g,index)=>{
						GoodsCategoryArray.push(g.Name)
						GoodsCategoryIdArray.push(g.id)
					})
					console.log("取到的数据为",GoodsCategoryArray);
					this.GoodsCategoryArray = GoodsCategoryArray;
					this.GoodsCategoryIdArray = GoodsCategoryIdArray;
					if(productionData.length > 0){
						this.GoodsCategoryId = GoodsCategoryIdArray[0]; //默认取值
					}else{
						this.GoodsCategoryId = 0;
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
		//编辑提交
		editFormSubmit(input){
			console.log(input)
			let Is_Hide = this.Is_Hide;
			console.log("近",Is_Hide);
			var that = this;
			let Name = input.detail.value.Name;
			let Parent_id = this.GoodsCategoryId;
			let Images = that.FirstImg;
			
			if(!Name){
				uni.showModal({
					title:'操作提示',
					content:'分类名称不能为空',
					showCancel:false
				})
				return;
			}
			let Desc = input.detail.value.Desc;
			let Sort = input.detail.value.Sort;
			let id = input.target.id;
			app.request().postRequest(
				app.getNetAddresss('api/GoodsCategory/edit'),
				{
					Parent_id:Parent_id,
					Name: Name,
					Images: Images,
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
							// 	url:"/goods/category/category"
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
					content:'分类名称不能为空',
					showCancel:false
				})
				return;
			}
			let Desc = input.detail.value.Desc;
			let Sort = input.detail.value.Sort;
			let Is_Hide = this.Is_Hide;
			let Parent_id = this.GoodsCategoryId;
			let Images = that.FirstImg;
			app.request().postRequest(
				app.getNetAddresss('api/GoodsCategory/create'),
				{
					Parent_id: Parent_id,
					Name: Name,
					Images: Images,
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
							uni.redirectTo({
								url:"/goods/category/category"
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
.cu-form-group picker .picker {
	padding-left: 0rpx;
}
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
