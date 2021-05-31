<template>
	<view>
		<uni-nav-bar @clickLeft="clickLeft" @clickRight="clickRight" left-text="列表"  right-text="创建" title="连锁门店管理"></uni-nav-bar>
		<mark-slide-list :list="StoreList" :button="buttonList" :border="true" @click="clickMethod" @change="changeMethod"></mark-slide-list>
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
		<!-- 行业 -->
		<w-picker
			mode="linkage"
			:value="defaultValue"
			:options="dataOrgin"
			:level="2"
			default-type="id"
			:default-props="defaultProps1"
			@confirm="onIndustry($event, 'linkage')"
			@cancel="onCancel"
			ref="industryLink"
		></w-picker>
		<pop ref="pop" :direction="direction" :is_close="true" :is_mask="true" :width="100">
			<view>
				<view class="ContentBackground">
					<form @submit="formSubmit" :id="StoreData.Id">
						<view class="create-content">
				
							<view class="cu-form-group section">
								<view class="title">门店名称：</view>
								<input type="text" name="StoreName" :value="StoreData.StoreName" placeholder="请输入门店名称" />
							</view>
							
							<view class="cu-form-group section">
								<view class="title">门店图片：</view>
								<tmUpload
									:url="upLoadUrl" 
									:upload_type="uploadType"
									:upload_count="uploadStoreImgCount"
									:upload_param="uploadParam"
									:upload_before_list="StoreImgList"
									:upload_cache_list="StoreImgList"
									sunuiUploader="sunui-uploader-430"
									@change="uploadStoreImgList"
									@remove="removeStoreImgList"
									ref="uploadImg"
									>
								</tmUpload>
							</view>
							
							<view class="cu-form-group section">
								<view class="title">门店手机：</view>
								<input type="text" name="StoreMobile" :value="StoreData.StoreMobile" placeholder="请输入门店负责人真实手机号" />
							</view>
				
							<view class="cu-form-group section">
								<view class="title">选择城市：</view>
								<input type="text" disabled="true" name="area" @tap="showPicker('linkage')" placeholder="请选择省市区" :value="result.result" />
								<text class="cuIcon-unfold text-orange"></text>
							</view>
				
							<view class="cu-form-group section">
								<view class="title">详细地址：</view>
								<input type="text" name="StoreAddress" :value="StoreData.StoreAddress" placeholder="请输入门店详细地址" />
								<text class="cuIcon-locationfill text-orange"></text>
							</view>
				
							<view class="cu-form-group section">
								<view class="title">管理密码：</view>
								<input type="password" name="StorePassword" :value="StoreData.StorePassword" placeholder="如果不修改管理门店密码,请留空!" />
							</view>
				
							<view class="cu-form-group section">
								<view class="title">选择行业：</view>
								<input type="text" disabled="true" name="industry" @tap="showPicker('industryLink')" placeholder="请选择所属行业" :value="resultIy.result" />
								<text class="cuIcon-unfold text-orange"></text>
							</view>
							
							<view class="cu-form-group section">
								<view class="title">库存审计：</view>
								<radio-group class="switch-group" @change="IsStockAuditRadioChange">
									<view class="swtich-label" name="IsStockAudit" v-for="(ite, inx) in IsStockAudit_Data" :key="inx">
										<radio :value="ite.value" name="IsStockAudit" :checked="ite.checked" />
										<text>{{ ite.name }}</text>
									</view>
								</radio-group>
							</view>
							
							<view class="button_submit"><button type="primary" :id="StoreData.Id" form-type="submit">提 交</button></view>
						</view>
					</form>
				</view>
			</view>
		</pop>
	</view>
</template>

<script>
	import pop from "@/components/ming-pop/ming-pop.vue"
	import foot from '@/components/foot.vue';
	import wPicker from '@/components/w-picker/w-picker.vue';
	import uniNavBar from "@/components/uni-nav-bar/uni-nav-bar.vue";
	import markSlideList from '@/components/mark-slide-list/mark-slide-list.vue';
	import tmUpload from '@/components/tm-upload/tm-upload.vue';
	const app = getApp({ allowDefault: true });
	const globalData = app.globalData;
	export default {
		components:{
			foot,
			markSlideList,
			uniNavBar,
			wPicker,
			pop,
			tmUpload
		},
		data() {
			return {
				direction: "up",
				StoreList : [],
				StoreData : [],
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
				msgType: 'error',
				message: '提示内容',
				numList: [
					{
						name: '授权'
					},
					{
						name: '登录'
					},
					{
						name: '创建门店'
					},
					{
						name: '完成'
					}
				],
				num: 2,
				result: {
					result: ''
				}, //四级
				resultIy: {
					result: ''
				},
				defaultRegion1: ['310000', '310100', '310101'],
				defaultValue: ['1', '7'],
				defaultProps1: {
					label: 'name',
					value: 'id',
					children: 'child'
				},
				options: [], //数据源
				dataOrgin: [],
				
				StoreMobile: '',
				
				multiArray: [], //列数据
				multiIndex: [0, 0],
				secondList: [],
				firstList: [],
				industryOneId: 0,
				IsStockAudit_Data:[
					{ name: '关闭', value: '0', checked: false },
					{ name: '开启', value: '1', checked: false },
				],
				IsStockAudit:0,
				// 基础版配置
				upLoadUrl:'',
				uploadType:'image',
				uploadCount:6,
				uploadParam:'files',
				//首图数量
				uploadStoreImgCount:1,
				StoreImg:'', //商品首图
				StoreImgList:[],
			};
		},
		onLoad:function(e){
			var upLoadUrl = app.getNetAddresss('api/UpLoad/index');
			this.upLoadUrl = upLoadUrl;
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
			this.getStoreList();
			this.getArea();
			this.getIndustry();
			let mobile = uni.getStorageSync('mobile');
			if (mobile) {
				this.StoreMobile = mobile;
			}
		},
		methods:{
			
			//上传首图回调数据
			uploadStoreImgList(res){
				console.log("上传的首图信息为",res);
				var result = [];
				res.map((item,index)=>{
					result.push(item.path)
				})
				console.log("添加设置的数据为",result);
				this.StoreImgList = res;
				this.StoreImg = result;
			},
			
			//删除首图的回调信息
			removeStoreImgList(res){
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
				this.StoreImgList = ImgList;
				this.StoreImg = result;
			},
			
			IsStockAuditRadioChange:function(res){
				console.log("库存审计",res)
				this.IsStockAudit = res.detail.value;
			},
			clickLeft:function(e){
				
			},
			clickRight:function(e){
				uni.redirectTo({
					url:"/store/add/add"
				});
			},
			formSubmit: function(input) {
				console.log('输入的内容是', input);
				var that = this;
				let StoreName = input.detail.value.StoreName;
				if(!StoreName){
					uni.showModal({
						title:'操作提示',
						content:'门店名称不能为空',
						showCancel:false
					})
					return;
				}
				let StoreMobile = input.detail.value.StoreMobile;
				let StoreId = input.target.id;
				if(!StoreMobile){
					uni.showModal({
						title:'操作提示',
						content:'门店手机号不能为空',
						showCancel:false
					})
					return;
				}
				let StoreAreas = that.defaultRegion1; //区域
				let StoreProvince = StoreAreas[0];
				let StoreCity = StoreAreas[1];
				let StoreArea = StoreAreas[2];
				//省市区
				let area = input.detail.value.area;
		
				let StoreCountry = StoreAreas[3];
				
				let StoreAddress = input.detail.value.StoreAddress;
				if(!StoreAddress){
					uni.showModal({
						title:'操作提示',
						content:'门店地址不能为空',
						showCancel:false
					})
					return;
				}
				let StorePassword = input.detail.value.StorePassword;			
				let defaultValue = that.defaultValue; //行业id
				let StoreIndustryId = defaultValue[0]; //行业id大类
				let StoreIndustryIdmin = defaultValue[1]; //行业id大类
				//行业校验
				let industry = input.detail.value.industry;
				let IsStockAudit = that.IsStockAudit;
				
				let StoreImg = that.StoreImg;
				if(!StoreImg){
					uni.showModal({
						title:'操作提示',
						content:'门店图片不能为空！',
						showCancel:false
					})
					return;
				}
				
				app.request().postRequest(
					app.getNetAddresss('api/store/edit'),
					{
						BrandId: uni.getStorageSync('BrandId'),
						StoreId: StoreId,
						StoreName: StoreName,
						StoreImg: StoreImg,
						StoreMobile: StoreMobile,
						StoreProvince: StoreProvince,
						StoreCity: StoreCity,
						StoreArea: StoreArea,
						StoreCountry: StoreCountry,
						StoreAddress: StoreAddress,
						Password: StorePassword,
						StorePassword: StorePassword,
						StoreIndustryIdMax: StoreIndustryId,
						StoreIndustryIdMin: StoreIndustryIdmin,
						IsStockAudit:IsStockAudit
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
									url:"/store/list/list"
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
			//行业选择
			onIndustry(res, type) {
				console.log('onIndustry' + type, res);
				this.resultIy = res;
				this.defaultValue = res.value;
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
			getIndustry: function() {
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
								access_token: access_token,
								wx_token: wx_token
							}
						)
						.then(res => {
							if (res.code === 1) {
								let result = res.result;
								console.log('所属行业列表数据为', result);
								this.dataOrgin = result;
							} else {
								uni.showToast({
									title: '温馨提醒：' + res.msg,
									icon: 'none',
									duration: 2000
								});
							}
						});
				},
				//行业数据
				bindMultiPickerChange: function(e) {
					console.log('bindMultiPickerChange选择的数据为', e);
					console.log('picker发送选择改变，携带值为', e.detail.value);
					var secondList = this.secondList;
					var select_key = e.detail.value[1]; //去二维数组中第二项的下标取出来，也就是二级下拉菜单的下标值
					this.industryTwoId = secondList[select_key]['Id'];
					this.multiIndex = e.detail.value;
					console.log('一级的id', this.industryOneId);
					console.log('二级的id', this.industryTwoId);
				},
			
				bindMultiPickerColumnChange: function(e) {
					var that = this;
					console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
					console.log('存储的第一列数据++', that.firstList);
					var data = {
						multiArray: that.multiArray,
						multiIndex: that.multiIndex
					};
					data.multiIndex[e.detail.column] = e.detail.value; //从这以上的代码是案例自带的没有删除的。
					/************************************************************/
					let industryOneId_session = that.industryOneId; //  先将滚动前的一级菜单id存下来，便于之后做对比
					switch (e.detail.column) {
						case 0:
							let firstList = that.firstList;
							console.log('第一列的数据为', firstList[0]);
							var firstId = firstList[e.detail.value]['Id'];
							if (industryOneId_session != firstId) {
								//每次滚动的时候都去和上一个做一次对比
								that.searchClassInfo(firstId); // 只要不一样，就去执行上面searchClassInfo()这个方法
							}
							data.multiIndex[1] = 0;
							break;
					}
				},
				industry() {
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
								access_token: access_token,
								wx_token: wx_token
							}
						)
						.then(res => {
							if (res.code === 1) {
								let result = res.result;
								console.log('列表数据为', that.industryDate);
								let temporary = {
									//--------------因为接口数据返回的是从第一项开始的，这里加一个请选择选项放入数据的开头
									Id: 0,
									IndustryName: '请选择所属行业',
									value: '0',
									childern: [{ Id: 0, IndustryName: '请选择', value: '0' }]
								};
								let firstList = result; //---------------------将一级分类数组放入新的变量里便于操作
								firstList.unshift(temporary);
								console.log('第一组数据为', firstList);
			
								let industryName = firstList.map(m => {
									return m.IndustryName; //------------------------获取一级下拉列表的名称
								});
			
								that.multiArray = [industryName, []]; //----------- 将一级列表的名称存入二维数组的第一项
								that.firstList = firstList; // ------------一级的完整数据 先存着后面有用
								that.industryName = industryName; //---------------一级的名称 先存着后面有用
			
								console.log('存储的数据为', that.multiArray);
								console.log('一级的数据为', firstList[0]);
								let industryOneId = firstList[0]['Id']; //  一级菜单默认的value
								console.log('一级默认菜单的值为', industryOneId);
								if (industryOneId) {
									that.searchClassInfo(industryOneId); //如果存在，去掉取相应数组下的list
								} else {
									let industryName = that.industryName;
									let industryTwoName = [];
									that.multiArray = [industryName, industryTwoName]; //这就是一个完整的二级联动展示了
								}
							} else {
								uni.showToast({
									title: '温馨提醒：' + res.msg,
									icon: 'none',
									duration: 2000
								});
							}
						});
				},
				searchClassInfo: function(Id) {
					let that = this;
					if (Id) {
						that.industryOneId = Id;
						that.firstList.map(m => {
							//firstList是一级分类的数组，上方代码里有
							console.log('打印的m', m);
							if (m.Id == Id) {
								//通过比对查出value对应的这一列
								that.secondList = m.childern; //用户选中的一级分类中的children就是第二列的列表
							}
						});
						console.log('secondList的数据值为', that.secondList);
						let industryTwoName = that.secondList.map(m => {
							return m.IndustryName; //再遍历secondList把所有的IndustryName取出来放入industryTwoName 中用于二级列表的展示
						});
						// console.log(industryTwoName);https://www.jianshu.com/p/0a0f839e9a4a
						let industryName = that.industryName;
						that.multiArray = [industryName, industryTwoName]; //这就是一个完整的二级联动展示了
						that.industryTwoName = industryTwoName;
					}
				},
				RegionChange(e) {
					console.log('选择的是', e);
					this.region = e.detail.value;
				},
			getStoreList:function(){
				app.request().postRequest(
					app.getNetAddresss('api/store/getList'),
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
						console.log("获取到的门店列表数据为",res);
						this.StoreList = res.result;
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
					this.StoreData = data;
					this.defaultValue = [data.store_industry_id_max.Id,data.store_industry_id_min.Id];
					this.resultIy.result = data.store_industry_id_max.IndustryName + data.store_industry_id_min.IndustryName;
					this.defaultRegion1 = [data.store_province.id,data.store_city.id,data.store_area.id];
					this.result.result = data.store_province.areaname + data.store_city.areaname + data.store_area.areaname;
					let IsStockAudit = data.store_setting.Value;
					this.IsStockAudit = IsStockAudit;
					this.IsStockAudit_Data[IsStockAudit]['checked'] = true;
				
					this.StoreImg = data.StoreImg;
					var StoreImgList = new Array;
					StoreImgList[0] = {
						'path':data.StoreImg
					};
					this.StoreImgList = StoreImgList;
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
								app.request().postRequest(app.getNetAddresss('api/store/modifyStatus'), {
									'StoreId':data.StoreId,
									'Visible':0
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
													url:"/store/list/list"
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
								app.request().postRequest(app.getNetAddresss('api/store/modifyStatus'), {
									'StoreId':data.StoreId,
									'Visible':1
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
													url:"/store/list/list"
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
				this.StoreData = data;
				this.defaultValue = [data.store_industry_id_max.Id,data.store_industry_id_min.Id];
				this.resultIy.result = data.store_industry_id_max.IndustryName + data.store_industry_id_min.IndustryName;
				this.defaultRegion1 = [data.store_province.id,data.store_city.id,data.store_area.id];
				this.result.result = data.store_province.areaname + data.store_city.areaname + data.store_area.areaname;
				let IsStockAudit = data.store_setting.Value;
				this.IsStockAudit = IsStockAudit;
				this.IsStockAudit_Data[IsStockAudit]['checked'] = true;
				this.StoreImg = data.StoreImg;
				var StoreImgList = new Array;
				StoreImgList[0] = {
					'path':data.StoreImg
				};
				this.StoreImgList = StoreImgList;
				this.$refs.pop.show();
			}
		}
	}
</script>


<style lang="scss">
@import '/static/css/main.css';
@import '/static/css/icon.css';
//自定义图片定位


.padding {
	margin-bottom: 30rpx;
}
.button_submit {
	margin-top: 30rpx;
}
.create-content {
	width: 100%;
}
.ContentBackground {
    margin-top: 30rpx;
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

