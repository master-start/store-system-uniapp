<template>
	<view class="content">
		<form @submit="addFormSubmit">
		<aloys-tab :tabs="tabs" :circular="circular" @change="onTabChange">
			<view slot="content0" style="margin-top: 10rpx;">
				<view class="content-info">
						<view class="create-content">
				
							<view class="cu-form-group section">
								<view class="title">商品编码：</view>
								<input type="text" name="ProductNo" :value="GoodsNumber" placeholder="请输入商品编码" />
							</view>
							
							<view class="cu-form-group section">
								<view class="title">商品名称：</view>
								<input type="text" name="Title" placeholder="请输入商品名称" />
							</view>
							
							<view class="cu-form-group section">
								<view class="title">商品首图：</view>
								<kangUpload
									:url="upLoadUrl" 
									:upload_type="uploadType"
									:upload_count="uploadFirstImgCount"
									:upload_param="uploadParam"
									@change="uploadFirstImgList"
									@onImgDel="delImgInfo" 
									ref="GoodsImages"
									>
								</kangUpload>
							</view>
							
							<view class="cu-form-group section">
								<view class="title">商品描述：</view>
								<input type="text" name="Description" placeholder="请输入商品描述,可含活动描述" />
							</view>
							
							<view class="cu-form-group section">
								<view class="title">商品进价：</view>
								<input type="digit" name="CostPrice" :value="CostPrice" v-on:input="changeCostPrice" placeholder="请输入商品在生产供应商的采购价格" />
								<text>元</text>
							</view>
							
							<view class="cu-form-group section">
								<view class="title">销售价格：</view>
								<input type="digit" name="Price" :value="Price" v-on:input="changePrice" placeholder="请输入商品销售价格" />
								<text>元</text>
							</view>
							
							<view class="cu-form-group section">
								<view class="title">商品原价：</view>
								<input type="digit" name="MarketPrice" :value="MarketPrice" placeholder="请输入商品建议零售原价" />
								<text>元</text>
							</view>
							
							<view class="cu-form-group section">
								<view class="title">库存数量：</view>
								<input type="number" name="Stock" placeholder="请输入商品库存数量" />
							</view>
							
							<view class="cu-form-group section">
								<view class="title">商品类型：</view>
								<radio-group class="switch-group" @change="radioTypeChange">
									<view class="swtich-label" name="Type" v-for="(ite, inx) in Type_Data" :key="inx">
										<radio :value="ite.value" name="Type" :checked="ite.checked" />
										<text>{{ ite.name }}</text>
									</view>
								</radio-group>
							</view>
							
							<view class="cu-form-group section">
								<view class="title">生产厂家：</view>
								<picker @change="ProductionChange" header-text="请选择生产厂家"  :range="ProductionArray">
								  <view class="picker">
								      当前选择：{{ProductionArray[ProductionChangeId]}}
								  </view>
								</picker>
							</view>
							
							<view class="cu-form-group section">
								<view class="title">商品品牌：</view>
								<picker @change="GoodsBrandChange" header-text="请选择商品品牌"  :range="GoodsBrandArray">
								  <view class="picker">
								      当前选择：{{GoodsBrandArray[GoodsBrandChangeId]}}
								  </view>
								</picker>
							</view>
							
<!-- 							<view class="cu-form-group section">
								<view class="title">商品分类：</view>
								<picker @change="GoodsCategoryChange" mode="multiSelector" header-text="请选择商品分类"  :range="GoodsCategoryArray">
								  <view class="picker">
								      当前选择：
									  {{GoodsCategoryArray[GoodsCategoryChangeId]}}
								  </view>
								</picker>
							</view> -->
							
							<view class="cu-form-group section">
								<view class="title">商品分类：</view>
								<input type="text"
									disabled="true"
									name="industry"
									@tap="showPicker('industryLink')"
									placeholder="请选择商品分类"
									:value="resultIy"
									/>
								<w-picker
									mode="linkage"
									:value="resultIy"
									:options="dataOrgin"
									:level="2"
									default-type="id"
									:default-props="defaultProps1"
									@confirm="onIndustry($event, 'linkage')"
									@cancel="onCancel"
									ref="industryLink"
								></w-picker>
								<text class="cuIcon-unfold text-orange"></text>
							</view>
							
							<view class="cu-form-group section">
								<view class="title">是否可退：</view>
								<radio-group class="switch-group" @change="radioIsNoRefundChange">
									<view class="swtich-label" name="IsNoRefund" v-for="(ite, inx) in IsNoRefund_Data" :key="inx">
										<radio :value="ite.value" name="IsNoRefund" :checked="ite.checked" />
										<text>{{ ite.name }}</text>
									</view>
								</radio-group>
							</view>
							
							<view class="cu-form-group section">
								<view class="title">是否隐藏：</view>
								<radio-group class="switch-group" @change="radioChange">
									<view class="swtich-label" name="Is_Hide" v-for="(ite, inx) in Is_Hide_Data" :key="inx">
										<radio :value="ite.value" name="Is_Hide" :checked="ite.checked" />
										<text>{{ ite.name }}</text>
									</view>
								</radio-group>
							</view>
							
							<view class="cu-form-group section">
								<view class="title">商品状态：</view>
								<radio-group class="switch-group" @change="radioStatusChange">
									<view class="swtich-label" name="Status" v-for="(ite, inx) in Status_Data" :key="inx">
										<radio :value="ite.value" name="Status" :checked="ite.checked" />
										<text>{{ ite.name }}</text>
									</view>
								</radio-group>
							</view>
							
							<view class="button_submit"><button type="warn"  form-type="submit">提 交</button></view>
						</view>
				</view>
			</view>
			<view slot="content1">
				<view class="content-info">
					<!-- <view class="paramNav">
						<view class="paramNavItem">属性名称</view>
						<view class="paramNavItem">属性说明</view>
						<view class="deleteInputNav">
							操作
						</view>
					</view> -->
		
					<view v-for="(item,index) in inputlists" :id="item.id" :key="item.id">
						<view class="paramNav">
							<view class="paramInput">
								<input type="text" :name="ParamInputTitle + item.id" placeholder="请输入属性名称"></input>
								<!-- <input type="text" name="ParamTitle[]"  placeholder="请输入属性名称" /> -->
							</view>
							<view class="paramInput">
								<input type="text" :name="ParamInputValue + item.id"  placeholder="请输入属性说明" />
								<!-- <input type="text" name="ParamValue[]"  placeholder="请输入属性说明" /> -->
							</view>
							<view class="deleteInput">
								<button class="deleteButton" @click='inputlists.splice(index, 1)'>删</button>
							</view>
						</view>
					</view>
					<view class="paramAddbutton">
						<button class="paramAddbutton" type="primary" @click="addInputList">增加属性</button>
					</view>
					
					<view class="create-content">
						
						<view class="cu-form-group section">
							<view class="title">商品条码：</view>
							<input type="text" name="ProductSn" placeholder="请输入商品条码" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">最低售价：</view>
							<input type="digit" name="MinPrice" :value="MinPrice" placeholder="请输入商品在门店里最低销售价格" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">最高售价：</view>
							<input type="digit" name="MaxPrice" :value="MaxPrice" placeholder="请输入商品在门店里最高销售价格" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">寄存数量：</view>
							<input type="number" name="RegisterStock" value="0" placeholder="请输入商品已售出,在库房内的寄存数量" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">商品重量：</view>
							<input type="digit" name="Weight" placeholder="请输入商品重量,单位(克/毫升)" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">商品排序：</view>
							<input type="number" name="Sort" value="1" placeholder="请输入商品排序" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">商品主图：</view>
							<kangUpload
								:url="upLoadUrl" 
								:upload_type="uploadType"
								:upload_count="uploadCount"
								:upload_param="uploadParam"
								@change="uploadMainImgList"
								@onImgDel="delImgInfo" 
								ref="GoodsImages"
								>
							</kangUpload>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">商品详情：</view>
							<!-- <input type="text" name="Content" placeholder="这里要修改为上传多图,并传json到后端" /> -->
							<kangUpload
								:url="upLoadUrl"
								:upload_type="uploadType"
								:upload_count="ContentCount"
								:upload_param="uploadParam"
								@change="uploadContentImgList"
								@onImgDel="delImgInfo" 
								ref="ContentImage"
								>
							</kangUpload>
						</view>
						
					</view>
					<view class="button_submit"><button type="warn"  form-type="submit">提 交</button></view>
				</view>
			</view>
			<view slot="content2">
				<view class="content-info">
					<view class="spec">
						
						<view v-for="(item,index) in speclists" :id="item.id" :key="item.id">
							<view class="spec_project">
								<view class="cu-form-group section">
									<view class="title">规格名称：</view>
									<input type="text" :name="spec_input_Name + item.id" placeholder="请输入规格名称" />
								</view>
								
								<view class="cu-form-group section">
									<view class="title">规格首图：</view>
									<kangUpload
										:url="upLoadUrl" 
										:upload_type="uploadType"
										:upload_count="uploadFirstImgCount"
										:upload_param="uploadParam"
										@change="uploadSpecFirstImgList($event,item.id)"
										@onImgDel="delImgInfo" 
										ref="GoodsImages"
										>
									</kangUpload>
								</view>
								
								<view class="cu-form-group section">
									<view class="title">商品进价：</view>
									<input type="digit" :name="spec_input_CostPrice + item.id" :value="spec_CostPrice" placeholder="请输入商品在生产供应商的采购价格" />
								</view>
								
								<view class="cu-form-group section">
									<view class="title">销售价格：</view>
									<input type="digit" :name="spec_input_Price + item.id" :value="spec_Price" placeholder="请输入商品销售价格" />
								</view>
								
								<view class="cu-form-group section">
									<view class="title">商品原价：</view>
									<input type="digit" :name="spec_input_MarketPrice + item.id" :value="spec_MarketPrice" placeholder="请输入商品建议零售原价" />
								</view>
								
								<view class="cu-form-group section">
									<view class="title">最低售价：</view>
									<input type="digit" :name="spec_input_MinPrice + item.id" :value="spec_MinPrice" placeholder="请输入商品在门店里最低销售价格" />
								</view>
								
								<view class="cu-form-group section">
									<view class="title">最高售价：</view>
									<input type="digit" :name="spec_input_MaxPrice + item.id" :value="spec_MaxPrice" placeholder="请输入商品在门店里最高销售价格" />
								</view>
								
								<view class="cu-form-group section">
									<view class="title">库存数量：</view>
									<input type="number" :name="spec_input_Stock + item.id" placeholder="请输入商品库存数量" />
								</view>
								
								<view class="cu-form-group section">
									<view class="title">寄存数量：</view>
									<input type="number" :name="spec_input_RegisterStock + item.id" value="0" placeholder="请输入商品已售出,在库房内的寄存数量" />
								</view>
								
								<view class="cu-form-group section">
									<view class="title">规格重量：</view>
									<input type="digit" :name="spec_input_Weight + item.id" placeholder="请输入商品重量,单位(克/毫升)" />
								</view>
								
								<view class="cu-form-group section">
									<view class="title">规格排序：</view>
									<input type="number" :name="spec_input_Sort + item.id" value="1" placeholder="请输入规格排序" />
								</view>
							</view>
						</view>
						
						<view class="paramAddbutton">
							<button class="paramAddbutton" type="primary" @click="addSpecList">增加规格</button>
						</view>
						
					</view>
					<view class="button_submit"><button type="warn"  form-type="submit">提 交</button></view>
				</view>
			</view>
			<view slot="content3">
				<view class="content-info">
					<view class="spec_project">
						<view class="cu-form-group section">
							<view class="title">赠送金额：</view>
							<input type="text" name="GivePrice" placeholder="单件销售赠送给会员的金额" />
							<text>元</text>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">赠送积分：</view>
							<input type="digit" name="GivePoint" placeholder="单件销售赠送给会员的积分" />
							<text>积分</text>
						</view>
		
						<view class="cu-form-group section">
							<view class="title">最多抵扣：</view>
							<input type="digit" name="MaxPointDeduct" :value="Price" placeholder="1件商品最多抵扣使用的积分" />
							<text>积分</text>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">最少抵扣：</view>
							<input type="digit" name="MinPointDeduct" :value="1" placeholder="1件商品最少抵扣使用的积分" />
							<text>积分</text>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">是否全额抵扣：</view>
							<radio-group class="switch-group" @change="radioIsAllPointDeductChange">
								<view class="swtich-label" name="IsAllPointDeduct" v-for="(ite, inx) in IsAllPointDeduct_Data" :key="inx">
									<radio :value="ite.value" name="IsAllPointDeduct" :checked="ite.checked" />
									<text>{{ ite.name }}</text>
								</view>
							</radio-group>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">全额抵扣：</view>
							<input type="digit" name="AllPointDeduct" placeholder="全用积分销售抵扣的积分数量" />
							<text>积分</text>
						</view>
						
						<!-- 以下是会员级别单独设置打折比例 -->
						
						<view class="cu-form-group section">
							<view class="title">抵扣方式：</view>
							<radio-group class="switch-group" @change="radioDiscountMethodChange">
								<view class="swtich-label" name="DiscountMethod" v-for="(ite, inx) in DiscountMethod_Data" :key="inx">
									<radio :value="ite.value" name="DiscountMethod" :checked="ite.checked" />
									<text>{{ ite.name }}</text>
								</view>
							</radio-group>
						</view>
						
						<view v-for="(item,index) in UserLevelList" :key = 'item.id' :id="item.id">
							<view class="cu-form-group section">
								<view class="title">{{item.LevelName}}：</view>
								<input type="number" :name="LevelInput + item.id" :value="item.Discount" placeholder="请输入抵扣数额" />
							</view>
						</view>
					</view>
					<view class="button_submit"><button type="warn"  form-type="submit">提 交</button></view>
				</view>
			</view>
		</aloys-tab>
		</form>
	</view>
</template>

<script>
	//滑动菜单组件
	import aloysTab from '@/components/aloys-tab/aloys-tab.vue';
	import wPicker from '@/components/w-picker/w-picker.vue';
	import kangUpload from '@/components/kang-upload/kang-upload.vue';
	const app = getApp();
	var globalData = app.globalData;
	var imgHost = globalData.imgHost;
	export default {
		components: {
			aloysTab,wPicker,kangUpload
		},
		data() {
			return {
				//滑动菜单
				tabs: [{
						title: '创建商品'
					},
					{
						title: '商品属性'
					},
					{
						title: '商品规格'
					},
					{
						title: '优惠活动'
					}
				],
				circular:true,
				Is_Hide_Data:[
					{ name: '显示', value: '0', checked: true }, 
					{ name: '隐藏', value: '1', checked: false },
				],
				Is_Hide:0,
				Type_Data:[
					{ name: '实物', value: '0', checked: true }, 
					{ name: '虚拟', value: '1', checked: false },
				],
				Type:0,
				Status_Data:[
					{ name: '上架', value: '0', checked: true }, 
					{ name: '下架', value: '1', checked: false },
					{ name: '删除', value: '2', checked: false },
				],
				Status:0,
				IsNoRefund_Data:[
					{ name: '可退', value: '0', checked: true }, 
					{ name: '不可退', value: '1', checked: false },
				],
				IsNoRefund:0,
				
				DiscountMethod_Data:[
					{ name: '关闭', value: '0', checked: true }, 
					{ name: '折扣', value: '1', checked: false }, 
					{ name: '金额', value: '2', checked: false },
				],
				DiscountMethod:0,
				
				IsAllPointDeduct_Data:[
					{ name: '关闭', value: '0', checked: true }, 
					{ name: '开启', value: '1', checked: false }, 
				],
				IsAllPointDeduct:0,
				
				GoodsBrandArray:[],
				GoodsBrandIdArray:[],
				GoodsBrandChangeId:0,
				GoodsBrandId:0,
				
				GoodsCategoryArray:[],
				GoodsCategoryIdArray:[],
				GoodsCategoryChangeId:0,
				GoodsCategoryId:0,
				
				ProductionArray:[],
				ProductionIdArray:[],
				ProductionChangeId:0,
				ProductionId:0,
				
				GoodsNumber:0,
				inputlists:[],
				nextTodoId:0,
				skuNum:0,
				
				ParamInputTitle:'ParamInputTitle',
				ParamInputValue:'ParamInputValue',
				
				
				speclists:[],
				spec_input_Name:'spec_input_Name',
				spec_input_Price:'spec_input_Price',
				spec_input_MarketPrice:'spec_input_MarketPrice',
				spec_input_MinPrice:'spec_input_MinPrice',
				spec_input_MaxPrice:'spec_input_MaxPrice',
				spec_input_CostPrice:'spec_input_CostPrice',
				spec_input_Stock:'spec_input_Stock',
				spec_input_RegisterStock:'spec_input_RegisterStock',
				spec_input_Weight:'spec_input_Weight',
				spec_input_Sort:'spec_input_Sort',
				
				UserLevelList:[],
				
				LevelInput:'LevelInput',
				
				Price:'',
				CostPrice:'',
				MarketPrice:'',
				MinPrice:'',
				MaxPrice:'',
				
				spec_Price:'',
				spec_CostPrice:'',
				spec_MarketPrice:'',
				spec_MinPrice:'',
				spec_MaxPrice:'',
				
				resultIy: '',
				defaultValue: [],
				defaultProps1: {
					label: 'name',
					value: 'id',
					children: 'child'
				},
				dataOrgin: [],
				
				//图片上传
				basicArr: [],
				// 基础版配置
				upLoadUrl:'',
				uploadType:'image',
				uploadCount:6,
				uploadParam:'files',
				//商品详情数量
				ContentCount:100,
				//商品首图数量
				uploadFirstImgCount:1,
				FirstImg:'', //商品首图
				Images:[], //商品主图
				Content:[], //商品详情
				
				SpecFirstImgList:[], //规格首图
			}
		},
		onLoad:function(e){
			console.log("载入获取到的内容",e)
			this.getGoodsCategoryList();
			this.getGoodsBrandList();
			this.getProductionList();
			this.getGoodsNumber();
			this.getUserLevelList();
			var upLoadUrl = app.getNetAddresss('api/UpLoad/index');
			this.upLoadUrl = upLoadUrl;
		},
		methods: {
			//规格首图回调数据
			uploadSpecFirstImgList(res,specId){
				console.log("规格首图=========",res[0]);
				var FirstImg = this.SpecFirstImgList; //初始化为一个空数组
				FirstImg[specId] = res[0];
				console.log("-规格首图的数据为-",FirstImg);
				this.SpecFirstImgList = FirstImg;
			},
			//商品首图回调数据
			uploadFirstImgList(res){
				console.log("上传的首图信息为",res);
				this.FirstImg = res[0];
			},
			//上传主图回调信息
			uploadMainImgList(res){
				console.log("上传的主图信息为",res);
				this.Images = res
			},
			//商品详情图片
			uploadContentImgList(res){
				console.log("上传的详情图信息为",res);
				this.Content = res;
			},
			// 删除图片 -2019/05/12(本地图片进行删除)
			async delImgInfo(e) {
				console.log('你删除的图片地址为:', e, this.basicArr.splice(e.index, 1));
			},
			//下拉框点确定的时候促发
			onIndustry(res, type) {
				this.resultIy = res.result;
				this.defaultValue = res.value;
			},
			//选中下拉框
			showPicker(type) {
				console.log('showPicker', type);
				this.$refs[type].show();
			},
			//取消选择
			onCancel() {},
			
			changeCostPrice(e){
				console.log("商品进价",e)
				var value = parseFloat(e.detail.value);
				this.spec_CostPrice = value;
				this.Price = value * 0.3 + value;
				this.spec_Price = value * 0.3 + value;
				this.MarketPrice = value * 0.8 + value;
				this.spec_MarketPrice = value * 0.8 + value;
				this.MinPrice = value;
				this.spec_MinPrice = value;
				this.MaxPrice = this.MarketPrice;
				this.spec_MaxPrice = this.MarketPrice;
			},
			changePrice(e){
				console.log("商品销售价",e)
				var value = parseFloat(e.detail.value);
				this.Price = value;
				this.spec_Price = value;
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
			//新增规格
			addSpecList:function(){
				this.speclists.push({
					id: this.skuNum++
				})
			},
			//新增文本输入框
			addInputList: function() {
				this.inputlists.push({
					id: this.nextTodoId++
				})
			},
			//添加产品
			addFormSubmit(input){
				console.log("获取到的input",input)
				var that = this;
				let postData = input.detail.value;
				let Title = postData.Title;
				if(!Title){
					uni.showModal({
						title:'操作提示',
						content:'商品名称不能为空',
						showCancel:false
					})
					return;
				}
				let Price = postData.Price;
				if(!Price){
					uni.showModal({
						title:'操作提示',
						content:'商品销售价格不能为空',
						showCancel:false
					})
					return;
				}
				let CostPrice = postData.CostPrice;
				if(!CostPrice){
					uni.showModal({
						title:'操作提示',
						content:'商品进价不能为空',
						showCancel:false
					})
					return;
				}
				
				let defaultValue = that.defaultValue; //分类id
				if(!defaultValue.length){
					uni.showModal({
						title:'操作提示',
						content:'产品分类不能为空',
						showCancel:false
					})
					return;
				}
				let GoodsCategoryId = defaultValue[0]; //分类id大类
				let GoodsCategoryIdMin = defaultValue[1]; //分类id小类
				
				let industry = input.detail.value.industry;
				if(!industry){
					uni.showModal({
						title:'操作提示',
						content:'请选择分类！',
						showCancel:false
					})
					return;
				}
				postData['GoodsCategoryId'] = GoodsCategoryId;
				postData['GoodsCategoryIdMin'] = GoodsCategoryIdMin;
				
				console.log(postData)
				postData['GoodsBrandId'] = this.GoodsBrandId;
				postData['ProductionId'] = this.ProductionId;
				postData['Type'] = this.Type;
				postData['Status'] = this.Status;
				postData['IsNoRefund'] = this.IsNoRefund;
				postData['DiscountMethod'] = this.DiscountMethod;
				postData['Is_Hide'] = this.Is_Hide;
				postData['IsAllPointDeduct'] = this.IsAllPointDeduct;
				
				// 属性
				let inputlists = this.inputlists;
				let AttributeParam = [];
				for(let i = 0;i < inputlists.length;i++){
				   let InputTitle = "ParamInputTitle" + inputlists[i].id;
				   let InputValue = "ParamInputValue" + inputlists[i].id;
				   let Input_Title = postData[InputTitle];
					if(!Input_Title){
					   continue;
					}
				   let Input_Value = postData[InputValue];
				   if(!Input_Value){
				      continue;
				   }
				   let ParmDatas = {
					   'ParamTitle':Input_Title,
					   'ParamValue':Input_Value,
				   }
				   AttributeParam.push(ParmDatas);
				   //删除属性
				   delete postData[InputTitle];
				   delete postData[InputValue];
				}
				postData['AttributeParam'] = JSON.stringify(AttributeParam);
				
				//规格
				let speclists = this.speclists;
				let SpecData = [];
				for(let i = 0;i < speclists.length;i++){
					let spec_input_Name = "spec_input_Name" + speclists[i].id;
					let spec_input_Price = "spec_input_Price" + speclists[i].id;
					let spec_input_MarketPrice = "spec_input_MarketPrice" + speclists[i].id;
					let spec_input_MinPrice = "spec_input_MinPrice" + speclists[i].id;
					let spec_input_MaxPrice = "spec_input_MaxPrice" + speclists[i].id;
					let spec_input_CostPrice = "spec_input_CostPrice" + speclists[i].id;
					let spec_input_Stock = "spec_input_Stock" + speclists[i].id;
					let spec_input_RegisterStock = "spec_input_RegisterStock" + speclists[i].id;
					let spec_input_Weight = "spec_input_Weight" + speclists[i].id;
					let spec_input_Sort = "spec_input_Sort" + speclists[i].id;
				   
					let spec_Name  = postData[spec_input_Name];
					if(!spec_Name){
						continue;
					}
					let spec_Price = postData[spec_input_Price];
					if(!spec_Price){
						continue;
					}
					let spec_MarketPrice = postData[spec_input_MarketPrice];
					let spec_MinPrice = postData[spec_input_MinPrice];
					if(!spec_MinPrice){
						spec_MinPrice = 0;
					}
					let spec_MaxPrice = postData[spec_input_MaxPrice];
					let spec_CostPrice = postData[spec_input_CostPrice];
					if(!spec_CostPrice){
						spec_CostPrice = 0;
					}
					let spec_Stock = postData[spec_input_Stock];
					if(!spec_Stock){
						spec_Stock = 0;
					}
					let spec_RegisterStock = postData[spec_input_RegisterStock];
					if(!spec_RegisterStock){
						spec_RegisterStock = 0;
					}
					let spec_Weight = postData[spec_input_Weight];
					let spec_Sort = postData[spec_input_Sort];
				   
					let FirstImg = this.SpecFirstImgList[i];
					
					let specdata = {
						'Title':spec_Name,
						'FirstImg':FirstImg,
						'Price':spec_Price,
						'MarketPrice':spec_MarketPrice,
						'MinPrice':spec_MinPrice,
						'MaxPrice':spec_MaxPrice,
						'CostPrice':spec_CostPrice,
						'Stock':spec_Stock,
						'RegisterStock':spec_RegisterStock,
						'Weight':spec_Weight,
						'Sort':spec_Sort,
					}
					SpecData.push(specdata);
					delete postData[spec_input_Name];
					delete postData[spec_input_Price];
					delete postData[spec_input_MarketPrice];
					delete postData[spec_input_MinPrice];
					delete postData[spec_input_MaxPrice];
					delete postData[spec_input_CostPrice];
					delete postData[spec_input_Stock];
					delete postData[spec_input_RegisterStock];
					delete postData[spec_input_Weight];
					delete postData[spec_input_Sort];
				}
				console.log("SpecData____=+++++___++++++++++",SpecData);
				postData['SpecData'] = JSON.stringify(SpecData);
				
				
				// 会员级别
				let UserLevelList = this.UserLevelList;
				let LevelPricePoint = [];
				for(let i = 0;i < UserLevelList.length;i++){
				   let LevelInput = "LevelInput" + UserLevelList[i].id;
				   console.log("会员级别数据",LevelInput);
				   let LevelPrice = postData[LevelInput];
					if(!LevelPrice){
					   uni.showToast({
							title:'第' + i + '个,级别金额不能为空'
					   })
					   return;
					}
				   let ParmDatas = {
					   'LevelId':UserLevelList[i].id,
					   'LevelValue':LevelPrice,
				   }
				   LevelPricePoint.push(ParmDatas);
				   //删除属性
				   delete postData[LevelInput];
				}
				postData['LevelPricePoint'] = JSON.stringify(LevelPricePoint);
				if(that.Content){
					postData['Content'] = JSON.stringify(that.Content);
				}else{
					postData['Content'] = '';
				}
				if(that.Images){
					postData['Images'] = JSON.stringify(that.Images);
				}else{
					postData['Images'] = '';
				}
				let FirstImg = that.FirstImg;
				if(!FirstImg){
					uni.showModal({
						title:'操作提示',
						content:'商品首图不能为空！',
						showCancel:false
					})
					return;
				}
				postData['FirstImg'] = that.FirstImg;
				console.log('最后发送的数据为',postData);
		
				app.request().postRequest(
					app.getNetAddresss('api/Goods/create'),
					postData,
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
									url:"/goods/add/add"
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
			//获取产品编码
			getGoodsNumber:function(){
				app.request().postRequest(
					app.getNetAddresss('api/Goods/getNumber'),
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
						console.log("获取到的列表数据为",res.result);
						let Data = res.result.data;
						this.GoodsNumber = Data;
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
			//获取分类列表
			getGoodsCategoryList:function(){
				app.request().postRequest(
					app.getNetAddresss('api/GoodsCategory/getDataLevel'),
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
						console.log("获取到的列表数据为",res.result);
						let productionData = res.result;
						this.dataOrgin = productionData;
						let GoodsCategoryNames = [];
						let GoodsCategoryIds = [];
						if(productionData.length > 0){
							this.resultIy = productionData[0]['name'] + productionData[0]['child'][0]['name'];
							this.defaultValue = [productionData[0]['id'],productionData[0]['child'][0]['id']];
						}else{
							this.resultIy = '请选择产品分类';
							this.defaultValue = '';
						}
						
			// 			let GoodsCategoryArray_a = [];
			// 			let GoodsCategoryArray_b = [];
			// 			let GoodsCategoryIdArray = [];
			
			// 			productionData.map((g,index)=>{
			// 				GoodsCategoryArray_a.push(g.Name) 
			// 				GoodsCategoryIdArray.push(g.id)
			// 			})
			// 			console.log("取到的数据为",GoodsCategoryArray_a);
						
			// 			let twoClildData = productionData.child;
			// 			twoClildData.map((g,index)=>{
			// 				GoodsCategoryArray_b.push(g.Name) 
			// 				GoodsCategoryIdArray.push(g.id)
			// 			})
			// 			console.log("取到的数据为",GoodsCategoryArray_b);
			// 			// this.GoodsCategoryArray = GoodsCategoryArray;
			// 			this.GoodsCategoryArray = [GoodsCategoryArray_a, GoodsCategoryArray_b];
			// 			this.GoodsCategoryIdArray = GoodsCategoryIdArray;
			// 			if(productionData.length > 0){
			// 				this.GoodsCategoryId = GoodsCategoryIdArray[0]; //默认取值
			// 			}else{
			// 				this.GoodsCategoryId = 0;
			// 			}
						
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
			
			//获取品牌列表
			getGoodsBrandList:function(){
				app.request().postRequest(
					app.getNetAddresss('api/GoodsBrand/getList'),
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
						console.log("获取到的列表数据为",res.result);
						let productionData = res.result;
						var GoodsBrandArray = [];
						var GoodsBrandIdArray = [];
						productionData.map((g,index)=>{
							GoodsBrandArray.push(g.Name)
							GoodsBrandIdArray.push(g.id)
						})
						console.log("取到的数据为",GoodsBrandArray);
						this.GoodsBrandArray = GoodsBrandArray;
						this.GoodsBrandIdArray = GoodsBrandIdArray;
						if(productionData.length > 0){
							this.GoodsBrandId = GoodsBrandIdArray[0];
						}else{
							this.GoodsBrandId = 0;
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
			
			//获取生产供应商列表
			getProductionList:function(){
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
						console.log("获取到的列表数据为",res.result);
						let productionData = res.result;
						var ProductionArray = [];
						var ProductionIdArray = [];
						productionData.map((g,index)=>{
							ProductionArray.push(g.Name)
							ProductionIdArray.push(g.id)
						})
						console.log("取到的数据为",ProductionArray);
						this.ProductionArray = ProductionArray;
						this.ProductionIdArray = ProductionIdArray;
						if(productionData.length>0){
							this.ProductionId = ProductionIdArray[0];
						}else{
							this.ProductionId = 0;
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
			//生产厂家供应商
			ProductionChange:function(e){
				console.log('picker发送选择改变，携带值为', e)
				var value = e.detail.value;
				this.ProductionId = this.ProductionIdArray[value];
				this.ProductionChangeId = value;
				console.log("获取到选择的id是",this.ProductionId)
			},
			
			//商品分类
			GoodsCategoryChange:function(e){
				console.log('picker发送选择改变，携带值为', e)
				var value = e.detail.value;
				this.GoodsCategoryId = this.GoodsCategoryIdArray[value];
				this.GoodsCategoryChangeId = value;
				console.log("获取到选择的id是",this.GoodsCategoryId)
			},
			
			//品牌选择框
			GoodsBrandChange:function(e){
				console.log('picker发送选择改变，携带值为', e)
				var value = e.detail.value;
				this.GoodsBrandId = this.GoodsBrandIdArray[value];
				this.GoodsBrandChangeId = value;
				console.log("获取到选择的id是",this.GoodsBrandId)
			},
			
			//商品是否隐藏单选
			radioChange(res){
				console.log("点击的内容",res);
				this.Is_Hide = res.detail.value;
			},
			//商品类型单选
			radioTypeChange(res){
				console.log("点击的内容",res);
				this.Type = res.detail.value;
			},
			//商品状态单选
			radioStatusChange(res){
				console.log("点击的内容",res);
				this.Status = res.detail.value;
			},
			//抵扣方式
			radioDiscountMethodChange(res){
				console.log("点击的内容",res);
				this.DiscountMethod = res.detail.value;
			},
			//是否开启商品全额抵扣
			radioIsAllPointDeductChange(res){
				this.IsAllPointDeduct = res.detail.value;
			},
			//商品是否可退单选
			radioIsNoRefundChange(res){
				console.log("点击的内容",res);
				this.IsNoRefund = res.detail.value;
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
	.swtich-label {
	    margin-right: 15rpx;
	}
	.spec_project{
		margin: 15rpx auto;
		box-shadow: 0 0.05rem 0.5rem 0.25rem rgba(80, 136, 230, 0.1);
	}
	.paramAddbutton{
		height: 90rpx;
		line-height: 90rpx;
		width: 98%;
		margin: 20rpx auto;
	}
	.paramNav{
		display: flex;
		flex-flow: row nowrap;
	}
	.paramNavItem{
		width: 40%;
		text-align: center;
		border-bottom: #EEEEEE solid 2rpx;
		margin: 10rpx;
		background: #FFFFFF;
		height: 100rpx;
		line-height: 100rpx;
		font-weight: 500;
	}
	.paramInput{
		border-bottom: #EEEEEE solid 2rpx;
		margin: 10rpx;
		background: #FFFFFF;
		height: 80rpx;
		padding-left: 20rpx;
		padding-top: 30rpx;
		width: 40%;
	}
	.deleteInputNav{
		width: 25%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		margin: 10rpx;
		background: #FFFFFF;
	}
	.deleteInput{
		width: 25%;
		height: 100rpx;
		line-height: 100rpx;
		text-align: center;
		/* margin-top: 10rpx; */
		margin: 5rpx;
	}
	.deleteButton{
		background-color: #FFFFFF;
		color: #2C405A;
	}
	.cu-form-group picker .picker{
		padding-left: 0rpx;
	}
	.content {
		position: absolute;
		height: 100%;
		/* background-color: #f1f5f8; */
	}
	.content-info{
		margin-top: 20rpx;
	}
</style>
