<template>
	<view>
		<form @submit="skuStockform" :id="GoodsInfo.id">
			<view class="content-info">
				<view class="spec">
				<view v-for="(item, index) in speclists" :id="item.id" :key="item.id">
					<view class="spec_project">
						<view class="cu-form-group section">
							<view class="title">规格名称：</view>
							<input type="text" :name="spec_input_Name + (item.inputId ? item.inputId : item.id)" :value="item.Title" placeholder="请输入规格名称" />
						</view>

						<block v-if="item.Stock">
							<view class="cu-form-group section">
								<view class="title text-red">原库存数量：</view>
								<input type="number"
								:name="spec_input_OrginStock + (item.inputId ? item.inputId : item.id)"
								:value="item.Stock"
								disabled="true"
								/>
							</view>
						</block>
						
						<view class="cu-form-group section">
							<view class="title">库存数量：</view>
							<input type="number"
							:name="spec_input_Stock + (item.inputId ? item.inputId : item.id)"
							placeholder="请输入入库库存数量"
							/>
						</view>
						
						<block v-if="item.RegisterStock">
							<view class="cu-form-group section">
								<view class="title text-red">原寄存数量：</view>
								<input type="number"
								:name="spec_input_OrginRegisterStock + (item.inputId ? item.inputId : item.id)"
								:value="item.RegisterStock"
								disabled="true"
								/>
							</view>
						</block>
						
						<view class="cu-form-group section">
							<view class="title">寄存数量：</view>
							<input
								type="number"
								:name="spec_input_RegisterStock + (item.inputId ? item.inputId : item.id)"
								placeholder="请输入寄存库存数量"
							/>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">商品进价：</view>
							<input
								type="digit"
								:name="spec_input_CostPrice + (item.inputId ? item.inputId : item.id)"
								:value="item.CostPrice"
								placeholder="请输入商品在生产供应商的采购价格"
							/>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">销售价格：</view>
							<input type="digit" :name="spec_input_Price + (item.inputId ? item.inputId : item.id)" :value="item.Price" placeholder="请输入商品销售价格" />
						</view>
						
						<view class="cu-form-group section">
							<view class="title">商品原价：</view>
							<input
								type="digit"
								:name="spec_input_MarketPrice + (item.inputId ? item.inputId : item.id)"
								:value="item.MarketPrice"
								placeholder="请输入商品建议零售原价"
							/>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">最低售价：</view>
							<input
								type="digit"
								:name="spec_input_MinPrice + (item.inputId ? item.inputId : item.id)"
								:value="item.MinPrice"
								placeholder="请输入商品在门店里最低销售价格"
							/>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">最高售价：</view>
							<input
								type="digit"
								:name="spec_input_MaxPrice + (item.inputId ? item.inputId : item.id)"
								:value="item.MaxPrice"
								placeholder="请输入商品在门店里最高销售价格"
							/>
						</view>
						
						<view class="cu-form-group section">
							<view class="title">规格重量：</view>
							<input
								type="digit"
								:name="spec_input_Weight + (item.inputId ? item.inputId : item.id)"
								:value="item.Weight"
								placeholder="请输入商品重量,单位(克/毫升)"
							/>
						</view>

						<view class="cu-form-group section">
							<view class="title">规格排序：</view>
							<input type="number" :name="spec_input_Sort + (item.inputId ? item.inputId : item.id)" :value="item.Sort" placeholder="请输入规格排序" />
							<input hidden="true" :name="spec_input_id + (item.inputId ? item.inputId : item.id)" :value="item.id" placeholder="请输入规格排序" />
						</view>
					</view>
				</view>

				<view class="paramAddbutton"><button class="paramAddbutton" type="primary" @click="addSpecList">增加规格</button></view>
			</view>
			<view class="button_submit">
				<button type="warn" form-type="submit" :id="GoodsInfo.id">提 交</button>
			</view>
		</view>
		</form>
	</view>
</template>

<script>
	const app = getApp();
	var globalData = app.globalData;
	var imgHost = globalData.imgHost;
export default {
	data() {
		return {
			speclists:[],
			speclistsMinId:0,
			GoodsInfo: [],
			skuMaxId:1, //商品规格编码
			inputId:1,
			
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
			spec_input_id:'spec_input_id',
		};
	},
	onLoad(e) {
		console.log("载入获取到的内容",e)
		var id = e.id;
		this.getGoodsInfo(id);
	},
	methods: {
		//规格入库提交
		skuStockform:function(input){
			console.log("获取到提交的信息为",input)
			var that = this;
			let postData = input.detail.value;
			postData['id'] = input.currentTarget.id;
			//规格
			let speclists = this.speclists;
			let SpecData = [];
			console.log("获取到的规格数据为",speclists);
			for(let i = 0;i < speclists.length;i++){
				console.log("第一个i数",i);
				let spectemid = speclists[i].id?speclists[i].id:speclists[i].inputId;
				console.log("ididididididid",spectemid);
				let spec_input_Name = "spec_input_Name" + spectemid;
				let spec_input_Price = "spec_input_Price" + spectemid;
				let spec_input_MarketPrice = "spec_input_MarketPrice" + spectemid;
				let spec_input_MinPrice = "spec_input_MinPrice" + spectemid;
				let spec_input_MaxPrice = "spec_input_MaxPrice" + spectemid;
				let spec_input_CostPrice = "spec_input_CostPrice" + spectemid;
				let spec_input_Stock = "spec_input_Stock" + spectemid;
				let spec_input_RegisterStock = "spec_input_RegisterStock" + spectemid;
				let spec_input_Weight = "spec_input_Weight" + spectemid;
				let spec_input_Sort = "spec_input_Sort" + spectemid;
				let spec_input_id = "spec_input_id" + spectemid; 
				
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
				let spec_MaxPrice = postData[spec_input_MaxPrice];
				let spec_CostPrice = postData[spec_input_CostPrice];
				if(!spec_CostPrice){
					continue;
				}
				let spec_Stock = postData[spec_input_Stock];
				let spec_RegisterStock = postData[spec_input_RegisterStock];
				let spec_Weight = postData[spec_input_Weight];
				let spec_Sort = postData[spec_input_Sort];
				let spec_id = postData[spec_input_id];
				let specdata = {
					'Title':spec_Name,
					'Price':spec_Price,
					'MarketPrice':spec_MarketPrice,
					'MinPrice':spec_MinPrice,
					'MaxPrice':spec_MaxPrice,
					'CostPrice':spec_CostPrice,
					'Stock':spec_Stock,
					'RegisterStock':spec_RegisterStock,
					'Weight':spec_Weight,
					'Sort':spec_Sort,
					'id':spec_id
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
				delete postData[spec_input_id];
			}
			console.log("最终提交的规格数据为9999999999999",SpecData);
			postData['SpecData'] = JSON.stringify(SpecData);
			app.request().postRequest(
				app.getNetAddresss('api/Goods/skuStock'),
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
							uni.navigateBack({
								delta:1
							})
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
		//新增规格
		addSpecList:function(){
			var inputId = this.skuMaxId++;
			this.speclists.push({
				inputId:inputId
			})
			console.log("inputId",inputId);
		},
		
		//获取产品信息
		getGoodsInfo(id){
			var that = this;
			console.log("获取产品信息");
			app.request().postRequest(
				app.getNetAddresss('api/Goods/getInfo'),
				{
					id:id,
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
					var data = res.result.data;
					that.GoodsInfo = data;
					
					//商品规格
					that.speclists = data.has_many_sku;
					that.speclistsMinId = 1;
					that.skuMaxId = 1;
					
					let has_many_sku = data.has_many_sku;
					let skuMaxId = Math.max(...has_many_sku.map(x => x.id));
					let skuMinId = Math.min(...has_many_sku.map(x => x.id));
					console.log("skuMinId",skuMinId);
					if(skuMinId && skuMinId != Infinity){
						that.speclistsMinId = skuMinId;
						that.skuMaxId = parseInt(skuMaxId) + 1;
					}
					console.log("商品规格最大的id为",that.skuMaxId)
					console.log("商品规格的数据为",data.has_many_sku)
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
		
	}
};
</script>

<style>
	@import '/static/css/main.css';
	@import '/static/css/icon.css';
	.swtich-label {
	    margin-right: 15rpx;
	}
	.spec_project{
		width: 95%;
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
