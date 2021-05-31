<template>
	<view class="content">
		<view class="swiper-tab">
			<block v-for="(item,index) in menuList" v-bind:key="item.id">
				<view :class="'swiper-tab-item ' + currentTabActive[index]" :data-current="item.current" @click="clickTab">{{item.name}}</view>
			</block>
		</view>
	
		<swiper :current="currentTab" duration="300" circular="true" @change="swiperTab" :style="'height:' + winHeight + ';width:' + winwidth">
			<!-- 核销 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:' + winHeight">
							  <view class="ContentBackground">
								<form @submit="PayformSubmit">
									<view class='header section'>
										<view>查询条件：</view>
										<picker @change="bindPickerChange" header-text="请选择类别" :value="channelindex" :range="channelArray">
										  <view class="picker">
											  当前选择：{{channelArray[channelindex]}}
										  </view>
										</picker>
									</view>
									<view class='header section'>
										<view>查询内容：</view>
										<input name="content" placeholder="请输入查询条件内容关键词" />
									</view>
									<view class='button'>
										<button class="btn1" hover-stay-time="1000" hover-class="button-hover" style="width:90%" formType="submit">点击进行查询会员,进行销售</button>
									</view>
								</form>
								<block v-if="timesPayMark">
									<view class="timeslist">
										<view v-for="(item,index) in timesPayData" :key="item.id">
											<view class="c_list" hover-class="colorhui" hover-stay-time="600">
												<view class="c_list1">编号：{{item.id}}</view>
												<view class="c_list2">姓名：{{item.Name}}</view>
												<view class="c_list3">({{item.Mobile}})</view>
												<!-- <view class="c_list4"></view> -->
											</view>
											<view v-for="(value,key) in item.has_many_fy_user_card" :key="value.id">
													<view class="user_card_list" v-on:click="openVerification(value.id,mark)">
														<view hover-class="clickColor">
															<view class="user_card_list_item">会员卡ID：{{value.id}}</view>
															<view class="user_card_list_item">会员卡编号：{{value.CardNo}}</view>
															<view class="user_card_list_item">累计收款金额：{{value.CardMoney}}元</view>
															<view class="user_card_list_item">剩余次数：{{value.CardNumber}}次</view>
															<view class="user_card_list_item">会员卡类型：{{value.has_one_card_type.Name}}</view>
															<view class="user_card_list_item">卡创建时间：{{value.CardCreateTimes}}</view>
															<view class="user_card_list_item">卡有效天数：{{value.CardValidityNumber}}天</view>
															<view class="user_card_list_item">卡到期时间：{{value.CardDueToTimes}}</view>
															<view class="user_card_list_item">会员卡状态：{{value.CardStatus}}</view>
														</view>
												</view>
											</view>
										</view>
									</view>
								</block>
							  </view>
				</scroll-view>
			</swiper-item>
	
			<!-- 充值 -->
			<swiper-item>
				<scroll-view scroll-y="true" :style="'height:' + winHeight">
							  <view class="ContentBackground">
								<form @submit="PayformSubmit">
									<view class='header section'>
										<view>查询条件：</view>
										<picker @change="bindPickerChange" header-text="请选择类别" :value="channelindex" :range="channelArray">
										  <view class="picker">
											  当前选择：{{channelArray[channelindex]}}
										  </view>
										</picker>
									</view>
									<view class='header section'>
										<view>查询内容：</view>
										<input name="content" placeholder="请输入查询条件内容关键词" />
									</view>
									<view class='button'>
										<button class="btn1" hover-stay-time="1000" hover-class="button-hover" style="width:90%" formType="submit">点击进行查询会员,进行销售</button>
									</view>
								</form>
								<block v-if="timesPayMark">
									<view class="timeslist">
										<view v-for="(item,index) in timesPayData" :key="item.id">
											<view class="c_list" hover-class="colorhui" hover-stay-time="600">
												<view class="c_list1">编号：{{item.id}}</view>
												<view class="c_list2">姓名：{{item.Name}}</view>
												<view class="c_list3">({{item.Mobile}})</view>
												<!-- <view class="c_list4"></view> -->
											</view>
											<view v-for="(value,key) in item.has_many_fy_user_card" :key="value.id">
													<view class="user_card_list" v-on:click="openPay(value.id,mark)">
														<view hover-class="clickColor">
															<view class="user_card_list_item">会员卡ID：{{value.id}}</view>
															<view class="user_card_list_item">会员卡编号：{{value.CardNo}}</view>
															<view class="user_card_list_item">累计收款金额：{{value.CardMoney}}元</view>
															<view class="user_card_list_item">剩余次数：{{value.CardNumber}}次</view>
															<view class="user_card_list_item">会员卡类型：{{value.has_one_card_type.Name}}</view>
															<view class="user_card_list_item">卡创建时间：{{value.CardCreateTimes}}</view>
															<view class="user_card_list_item">卡有效天数：{{value.CardValidityNumber}}天</view>
															<view class="user_card_list_item">卡到期时间：{{value.CardDueToTimes}}</view>
															<view class="user_card_list_item">会员卡状态：{{value.CardStatus}}</view>
														</view>
												</view>
											</view>
										</view>
									</view>
								</block>
							  </view>
				</scroll-view>
	     </swiper-item>
			<!-- 开卡 -->
			<swiper-item>
	        <view class="ContentBackground">
				<form @submit="userRegformSubmit" @reset="userRegformReset">
	        <view class='header section'>
	            <view>会员姓名：</view>
	            <input class='nameinput' name="Name"  placeholder='请输入客户姓名' ></input>
	        </view>
	
	        <view class='header section'>
	            <view>手机号码：</view>
	            <input name="Mobile" type='digit' placeholder="请输入客户手机号" />
	        </view>
			
			<view class='header section'>
			    <view>卡片类型：</view>
			    <picker name="CardTypeId" @change="PickerChangeCardType" header-text="请选择会员卡类型" :value="CardTypeIndex" :range="CardTypeArray">
			      <view class="picker">
			          当前选择：{{CardTypeArray[CardTypeIndex]}}
			      </view>
			    </picker>
			</view>
			
	        <view class='header section'>
	            <view>会员卡次：</view>
	            <input name="CardNumber" type='digit' placeholder="请输入会员办卡总次数" />
	        </view>
			
			<view class='header section'>
			    <view>收款金额：</view>
			    <input name="CardMoney" type='digit' placeholder="请输入会员办卡金额" />
			</view>
			
			<view class='header section'>
			    <view>收款方式：</view>
			    <picker @change="PayTypeChange" header-text="请选择收款方式" :value="PayTypeIndex" :range="PayTypeArray">
			      <view class="picker">
			          当前选择：{{PayTypeArray[PayTypeIndex]}}
			      </view>
			    </picker>
			</view>
			
	        <view class='button'>
				<block v-if="submithx">
					<button form-type="submit" class="btn1" hover-stay-time="3000" hover-class="button-hover" style="width:90%" >提交登记入库</button>
				</block>
				<block v-else>
					<button form-type="submit" class="btn1" hover-stay-time="3000" disabled="true" hover-class="button-hover" style="width:90%" >提交处理中，请稍后！</button>
				</block>
			</view>
			</form>
	      </view>
	    </swiper-item>
	  </swiper>
	  <pop ref="pop" :direction="direction" :is_close="true" :is_mask="true" :width="100">
			<view>
				<form @submit="userFormVerification" :id="CardInfo.id">
					<view>
					<view class='header section'>
					    <view>会员卡号：</view>
					    <input name="CardNo" type='text' :value='CardInfo.CardNo' disabled="true" />
					</view>
					
					<view class='header section'>
					    <view>门店名称：</view>
					    <input name="StoreName" type='text' :value="CardInfo.has_one_store.StoreName" disabled="true" />
					</view>
					
					<view class='header section'>
					    <view>会员姓名：</view>
					    <input name="Name" type='text' :value="CardInfo.has_one_user.Name" disabled="true" />
					</view>
					
					<view class='header section'>
					    <view>手机号码：</view>
					    <input name="Mobile" type='text' :value="CardInfo.has_one_user.Mobile" disabled="true" />
					</view>
					
					<view class='header section'>
					    <view>会员卡次：</view>
					    <input name="CardNumber" type='digit' :value="CardInfo.CardNumber" disabled="true" />
					</view>
					
					<view class='header section'>
					    <view>核销次数：</view>
					    <input name="UseCardNumber" class="red" style="color: #DD524D;" type='digit' focus="true" />
					</view>
					
					<view class='header section'>
					    <view>卡类型：</view>
					    <input name="CardTypeName" type='text' :value="CardInfo.has_one_card_type.Name" disabled="true" />
					</view>
					
					<view class='header section'>
					    <view>卡状态：</view>
					    <input name="CardStatusName" type='text' :value="CardInfo.CardStatusName" disabled="true" />
					</view>
					
					
					<view class='header section'>
					    <view>创建时间：</view>
					    <input name="CardCreateTimes" type='text' :value="CardInfo.CardCreateTimes" disabled="true" />
					</view>
					
					<view class='header section'>
					    <view>到期时间：</view>
					    <input name="CardDueToTimes" type='text' :value="CardInfo.CardDueToTimes" disabled="true" />
					</view>
					
					<view class='button'>
						<block v-if="submithx">
							<button form-type="submit" :id="CardInfo.id" class="btn1" hover-stay-time="3000" hover-class="button-hover" style="width:90%" >提交核销使用</button>
						</block>
						<block v-else>
							<button form-type="submit" :id="CardInfo.id" class="btn1" disabled="true" hover-stay-time="3000" hover-class="button-hover" style="width:90%" >提交处理中，请稍后！</button>
						</block>
					</view>
					
				</view>
				</form>
			</view>
	  </pop>
	  <!-- 充值 -->
	  <pop ref="pops" :direction="direction" :is_close="true" :is_mask="true" :width="100">
	  			<view>
	  				<form @submit="userFormPay" :id="CardInfo.id">
	  					<view>
	  					<view class='header section'>
	  					    <view>会员卡号：</view>
	  					    <input name="CardNo" type='text' :value='CardInfo.CardNo' />
	  					</view>
	  					
	  					<view class='header section'>
	  					    <view>会员姓名：</view>
	  					    <input name="Name" type='text' :value="CardInfo.has_one_user.Name" />
	  					</view>
	  					
	  					<view class='header section'>
	  					    <view>手机号码：</view>
	  					    <input name="Mobile" type='text' :value="CardInfo.has_one_user.Mobile" />
	  					</view>
	  					
	  					<view class='header section'>
	  					    <view>会员卡次：</view>
	  					    <input name="CardNumber" type='digit' :value="CardInfo.CardNumber" disabled="true" />
	  					</view>
	  					
	  					<view class='header section'>
	  					    <view>充值次数：</view>
	  					    <input name="UseCardNumber" class="red" style="color: #DD524D;" type='digit' focus="true" />
	  					</view>
	  					
						<view class='header section'>
						    <view>收款金额：</view>
						    <input name="CardPayMoney" :value="CardPayMoney" type='text' class="red" />
						</view>
						
						<view class='header section'>
						    <view>收款方式：</view>
						    <picker @change="PayTypeChange" header-text="请选择收款方式" :value="PayTypeIndex" :range="PayTypeArray">
						      <view class="picker">
						          当前选择：{{PayTypeArray[PayTypeIndex]}}
						      </view>
						    </picker>
						</view>
	  					
	  					<view class='header section'>
	  					    <view>卡状态：</view>
							<picker @change="CardStatusChange" header-text="请选择收款方式" :value="CardStatusIndex" :range="CardStatusArray">
							  <view class="picker">
							      当前选择：{{CardStatusArray[CardStatusIndex]}}
							  </view>
							</picker>
	  					    <!-- <input name="CardStatusName" type='text' :value="CardInfo.CardStatusName" disabled="true" /> -->
	  					</view>
	  					
						<view class='header section'>
						    <view>卡类型：</view>
						    <input name="CardTypeName" type='text' :value="CardInfo.has_one_card_type.Name" disabled="true" />
						</view>
	  					
	  					<view class='header section'>
	  					    <view>创建时间：</view>
	  					    <input name="CardCreateTimes" type='text' :value="CardInfo.CardCreateTimes" disabled="true" />
	  					</view>
	  					
	  					<view class='header section'>
	  					    <view>到期时间：</view>
							<picker mode="date" :value="CardDueToTimes" :start="startDate" @change="bindDateChange">
								<input class="uni-input" name="CardDueToTimes" type='text' :value="CardDueToTimes" />
							</picker>
							<!-- <yu-datetime-picker @confirm="onConfirm" startYear="2015" ref="dateTime" value="2019-11-10 08:30:01" :isAll="false" :current="false"></yu-datetime-picker> -->
	  					    <!-- <input name="CardDueToTimes" type='text' :value="CardInfo.CardDueToTimes" disabled="true" /> -->
	  					</view>
	  					
	  					<view class='button'>
	  						<block v-if="submithx">
	  							<button form-type="submit" :id="CardInfo.id" class="btn1" hover-stay-time="3000" hover-class="button-hover" style="width:90%" >提交充值入库</button>
	  						</block>
	  						<block v-else>
	  							<button form-type="submit" :id="CardInfo.id" class="btn1" disabled="true" hover-stay-time="3000" hover-class="button-hover" style="width:90%" >提交处理中，请稍后！</button>
	  						</block>
	  					</view>
	  					
	  				</view>
	  				</form>
	  			</view>
	  </pop>
	</view>
</template>

<script>
	import pop from "@/components/ming-pop/ming-pop.vue"
	import yuDatetimePicker from "@/components/yu-datetime-picker/yu-datetime-picker.vue"
	const app = getApp()
	const globalData = app.globalData;
	const imgHost = globalData.imgHost;
	export default {
		data() {
			const currentDate = this.getDate({
			            format: true
			        })
			return {
				    currentTab: "", //当前的标签索引
					currentTabActive:["active","",""],
					//窗口
					winwidth: '100%',
					winHeight: '100%',
					clickStyle: 'white',
					direction: "up",
					mark:false,
					curId:null,
					submithx:true,
					date: currentDate,
					CardDueToTimes:'',
					time: '12:01',
					CardPayMoney:0,
					menuList:[
						{
							name: '计次核销',
							active:'',
							current:0,
						},
						{
							name: '计次充值',
							active:'',
							current:1,
						},
						{
							name: '开卡登记',
							active:'',
							current:2,
						},
					],
				    channelArray: ['手机号码', '会员姓名', '会员卡号', '当前门店所有会员'],
					PayTypeArray:['现金','微信','支付宝','银行卡','赊账'],
					PayTypeIndex:0,
					CardStatusArray:['停用','启用','删除','到期','已退卡'],
					CardStatusIndex:0,
				    objectChannelindex: [
				      {
				        id: 1,
				        name: "终端店"
				      },
				      {
				        id: 2,
				        name: "批发商"
				      },
				      {
				        id: 3,
				        name: "连锁超市"
				      }
				    ],
				    channelindex: 0,
				    CardTypeIndex: 0,
					CardTypeId:null,
					CardTypeArray:[],
					CardTypeData:[],
					CardInfo:[],
					winwidth:'100%',
					winHeight:'100%',
					timesPayMark:false,
					timesPayData:[],
			};
		},
		onLoad: function(options) {
			var that = this
			this.slide_list = uni.getStorageSync('slide_list');
			console.log('缓存的幻灯片数据',this.slide_list)
			uni.getSystemInfo({
				success:function(res){
					that.winHeight = res.windowHeight * 1.6 + 'rpx';
					that.winwidth = res.windowWidth;
				}
			})
			this.getCardType();
			
		},
		components: {
			pop,yuDatetimePicker
		},
		computed: {
		        startDate() {
		            return this.getDate('start');
		        },
		        endDate() {
		            return this.getDate('end');
		        }
		    },
		methods:{
			toggleTab(item, index) {  
			        this.$refs.dateTime.show();  
			},  
			onConfirm(val) {  
				console.log(val);  
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();
				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			bindDateChange: function(e) {
				console.log("选择的内容是：",e);
				this.date = e.target.value;
				this.CardDueToTimes = e.target.value;
			},
			//提交核销
			userFormVerification:function(e){
				console.log('form发生了submit事件，携带数据为：',e)
				var formdata = e.detail.value
				var UseCardNumber = formdata.UseCardNumber;
				var id = e.target.id;
				if(!UseCardNumber){
					uni.showToast({
						title:"核销次数不能为空！"
					})
					return;
				}
				this.submithx = false;
				app.request().postRequest(app.getNetAddresss('api/card/CardVerification'), {
					'id':id,
					'UseCardNumber':UseCardNumber
				}, {
					'content-type': 'application/x-www-form-urlencoded'
				}).then(res => {
					if (res.code === 1) {
						uni.showModal({
							showCancel:false,
							title:"操作提示",
							content:res.msg,
							success:function(e){
								//调用成功刷新数据
								console.log("点击提示",e);
								if (e.confirm) {
									// uni.switchTab({
									// 	url:"/member/sell/sell"
									// })
								    uni.redirectTo({
								    	url:"/member/times/times"
								    })
									return;
								}
							}
						})
						return;
					}else {
							uni.showToast({
								title: '温馨提醒：' + res.msg,
								icon: 'none',
								duration: 2000
							})
							this.submithx = true;
							return;
						}
					})
					
			},
			//获取充值数据
			openPay:function(id,mark){
				console.log("点击了" + id);
				if(id && !mark){
					this.mark = true;
					this.curId = id;
				}else{
					this.mark = false;
					this.curId = null;
				}
				this.clickStyle = 'clickColor';
				app.request().postRequest(app.getNetAddresss('api/card/getCardInfo'), {
					'id':id
				}, {
					'content-type': 'application/x-www-form-urlencoded'
				}).then(res => {
					if (res.code === 1) {
						console.log("点击显示出来的内容",res.result);
						this.CardInfo = res.result;
						this.CardDueToTimes = res.result.CardDueToTimes;
						this.CardStatusIndex = res.result.CardStatus;
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
				//打开弹窗
				this.$refs.pops.show();
			},
			//提交充值
			userFormPay:function(e){
				console.log('form发生了submit事件，携带数据为：',e)
				var formdata = e.detail.value
				var UseCardNumber = formdata.UseCardNumber;
				var id = e.target.id;
				if(!UseCardNumber){
					uni.showToast({
						title:"充值次数不能为空！"
					})
					return;
				}
				var Mobile = formdata.Mobile;
				if(!Mobile){
					uni.showToast({
						title:"手机号不能为空！"
					})
					return;
				}
				var CardPayMoney = formdata.CardPayMoney;
				var Name = formdata.Name;
				if(!Name){
					uni.showToast({
						title:"客户姓名不能为空！"
					})
					return;
				}
				var CardNo = formdata.CardNo;
				if(!CardNo){
					uni.showToast({
						title:"会员卡号不能为空！"
					})
					return;
				}
				var CardDueToTimes = formdata.CardDueToTimes;
				if(!CardDueToTimes){
					uni.showToast({
						title:"到期时间不能为空！"
					})
					return;
				}
				var CardStatusIndex = this.CardStatusIndex;
				var CardPayType = this.PayTypeIndex;
				this.submithx = false;
				app.request().postRequest(app.getNetAddresss('api/card/CardPay'), {
					'id':id,
					'CardStatus':CardStatusIndex,
					'CardDueToTimes':CardDueToTimes,
					'CardNo':CardNo,
					'CardPayMoney':CardPayMoney,
					'Name':Name,
					'Mobile':Mobile,
					'CardPayType':CardPayType,
					'UseCardNumber':UseCardNumber
				}, {
					'content-type': 'application/x-www-form-urlencoded'
				}).then(res => {
					if (res.code === 1) {
						uni.showModal({
							showCancel:false,
							title:"操作提示",
							content:res.msg,
							success:function(e){
								//调用成功刷新数据
								console.log("点击提示",e);
								if (e.confirm) {
									// uni.switchTab({
									// 	url:"/member/sell/sell"
									// })
								    uni.redirectTo({
								    	url:"/member/times/times"
								    })
									return;
								}
							}
						})
						return;
					}else {
							uni.showToast({
								title: '温馨提醒：' + res.msg,
								icon: 'none',
								duration: 2000
							})
							this.submithx = true;
							return;
						}
					})
			},
			//弹窗输入核销的次数
			openVerification:function(id,mark){
				console.log("点击了" + id);
				if(id && !mark){
					this.mark = true;
					this.curId = id;
				}else{
					this.mark = false;
					this.curId = null;
				}
				this.clickStyle = 'clickColor';
				app.request().postRequest(app.getNetAddresss('api/card/getCardInfo'), {
					'id':id
				}, {
					'content-type': 'application/x-www-form-urlencoded'
				}).then(res => {
					if (res.code === 1) {
						console.log("点击显示出来的内容getCardInfo",res.result);
						console.log("设置的到期时间",res.result.CardDueToTimes);
						this.CardInfo = res.result;
						
						this.CardDueToTimes = res.result.CardDueToTimes;
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
				//打开弹窗
				this.$refs.pop.show();
			},
			//会员卡记次充值查询
			PayformSubmit:function(e){
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				var Content = formdata.content;
				if(!Content){
					uni.showToast({
						title:"检索内容不能为空"
					})
					return;
				}
				var Searchkey = this.channelindex;
				app.request().postRequest(app.getNetAddresss('api/card/searchUserCardTimes'), {
					'Content':Content,
					'CardUseType':0,
					'Searchkey':Searchkey
				}, {
					'content-type': 'application/x-www-form-urlencoded'
				}).then(res => {
					if (res.code === 1) {
						console.log("显示搜索出来的内容",res.result.data);
						this.timesPayMark = true;
						this.timesPayData = res.result.data;
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
			//会员计次登记
			userRegformSubmit: function(e) {
				console.log('form发生了submit事件，携带数据为：' + JSON.stringify(e.detail.value))
				var formdata = e.detail.value
				var Name = formdata.Name;
				if(!Name){
					uni.showToast({
						title:"姓名不能为空"
					})
					return;
				}
				var Mobile = formdata.Mobile;
				if(!Mobile){
					uni.showToast({
						title:"手机号不能为空"
					})
					return;
				}
				var CardNumber = formdata.CardNumber;
				if(!CardNumber){
					uni.showToast({
						title:"开卡次数不能为空"
					})
					return;
				}
				var CardTypeId = this.CardTypeId;
				if(!CardTypeId){
					uni.showToast({
						title:"会员卡id错误！"
					})
					return;
				}
				this.submithx = false;
				var CardPayType = this.PayTypeIndex;
				app.request().postRequest(app.getNetAddresss('api/card/addCard'), {
					'Name':formdata.Name,
					'Mobile':formdata.Mobile,
					'CardNumber':formdata.CardNumber,
					'CardPayType':CardPayType,
					'CardMoney':formdata.CardMoney,
					'CardUseType':0,
					'CardTypeId':CardTypeId
				}, {
					'content-type': 'application/x-www-form-urlencoded'
				}).then(res => {
					if (res.code === 1) {
						uni.showModal({
							showCancel:false,
							title:"操作提示",
							content:res.msg,
							success:function(e){
								//调用成功刷新数据
								console.log("点击提示",e);
								if (e.confirm) {
									// uni.switchTab({
									// 	url:"/member/sell/sell"
									// })
								    uni.redirectTo({
								    	url:"/member/times/times"
								    })
									return;
								}
							}
						})
						return;
					}else {
							uni.showToast({
								title: '温馨提醒：' + res.msg,
								icon: 'none',
								duration: 2000
							})
							this.submithx = true;
							return;
						}
					})
			},
			//会员计次登记重置清空数据
			userRegformReset: function(e) {
				console.log('清空数据')
			},
			PayTypeChange:function(e){
				console.log('picker发送选择改变，携带值为', e)
				var id = e.detail.value;
				this.PayTypeIndex = id;
			},
			//选择会员卡类型
			PickerChangeCardType:function(e){
				console.log('picker发送选择改变，携带值为', e)
				var id = e.detail.value;
				var CardTypeData = this.CardTypeData;
				var CardTypeArray = this.CardTypeArray;
				if (!id) {
				   id = 0;
				}
				for (var i = 0; i < CardTypeData.length; i++) {
					console.log("Name",CardTypeData[i].Name)
					console.log("ID",CardTypeArray[id])
				  if (CardTypeData[i].Name == CardTypeArray[id]) {
					  this.CardTypeIndex = id;
					  this.CardTypeId = CardTypeData[i].id;
				  }
				}
			},
			//获取会员卡类型数据
			getCardType:function(){
				var CardTypeArray = [];
				app.request().postRequest(app.getNetAddresss('api/card/getCardType'), {
					//请求的参数：a:b
				}, {
					'content-type': 'application/x-www-form-urlencoded'
				}).then(res => {
					var data = res.result.data;
					if (res.code == 1) {
						for (var i = 0; i < data.length; i++) {
							CardTypeArray.push(data[i].Name)
						}
						this.CardTypeData = data;
						this.CardTypeId = data[0].id;
						this.CardTypeArray = CardTypeArray;
					}else{
						uni.showModal({
							title:"温馨提示",
							content:res.msg
						})
						return;
					}
				})
			},
			//会员卡状态
			CardStatusChange:function(e){
				this.CardStatusIndex = e.detail.value;
			},
			//设置下拉选中值
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e)
				this.channelindex = e.detail.value;
			},
			
			//滑动切换
			swiperTab: function(e) {
				var that = this;
				that.currentTab = e.detail.current;
				that.currentTabActive = ["","",""]
				that.currentTabActive[that.currentTab] = ' active';
			},
			
			//点击切换
			clickTab: function(e) {
				var that = this;
				if (that.currentTab === e.target.dataset.current) {
					return false;
				} else {
					that.currentTab = e.target.dataset.current;
					that.currentTabActive = ["","",""]
					that.currentTabActive[that.currentTab] = ' active';
				}
			},
		}
	}
</script>

<style lang="scss">
	page{
		width: 100%;
		height: auto;
		overflow: auto;
		overflow-x: auto;
	}
	.header {
	  display: flex;
	  justify-content: center;
	  align-content: center;
	  padding: 0.5rem;
	}
	
	.header>view {
	  height: 2.2rem;
	  line-height: 2.2rem;
	  /* width: 25%; */
	  text-align: right;
	  font-size: 31rpx;
	  width: 28%;
	}
	
	.header>input {
	  width: 72%;
	  text-align: left;
	  border: solid #d7d7d7 .1pt;
	  padding: 5pt;
	  background: #ffffff;
	}
	.header>textarea {
	  width: 72%;
	  text-align: left;
	  border: solid #d7d7d7 .1pt;
	  padding: 5pt;
	  background: #ffffff;
	}
	.header>picker {
	  width: 72%;
	  text-align: left;
	  border: solid #d7d7d7 .1pt;
	  padding: 5pt;
	  background: #ffffff;
	}
	.reclick{
		background: #e6e6e6;
		border-radius: 10rpx;
	}
	.clickColor{
		background: #108080;
		border-radius: 10rpx;
	}
	//模式切换
	swiper{
	  height: 960rpx;
	  text-align: center;
	  margin-top: 30rpx;
	}
	.swiper-tab{
	    width: 100%;
	    text-align: center;
	    height: 88rpx;
	    line-height: 88rpx;
	    display: flex;
	    flex-flow: row;
	    justify-content: space-between;
	    background-color: #ffffff;
	}
	.user_card_list{
		display: flex;
		flex-direction: column;
		margin: 10rpx;
		border-radius: 10rpx;
		background-color: #e6e6e6;
	}
	.user_card_list_item{
		line-height: 80rpx;
		height: 80rpx;
		text-align: left;
		padding-left: 20rpx;
	}
	.c_list{
		display: flex;
		flex-flow: row nowrap;
		margin: 10rpx auto;
		width: 100%;
		border-bottom: solid 1rpx #333;
		line-height: 70rpx;
		height: 70rpx;
	}
	.red{
		color: #fc0107;
		font-weight: bold;
	}
	.c_list1{
		width: 30%;
	}
	.c_list2{
		width: 35%;
		text-align: left;
	}
	.c_list3{
		width: 35%;
		text-align: left;
	}
	.c_list4{
		width: 30%;
	}
	.timeslist{
		width: 95%;
		margin: 0 auto;
	}
	/** 添加自定义button点击态样式类**/
	.other-button-hover {
	  background-color: rgb(0, 167, 144);
	}
</style>
