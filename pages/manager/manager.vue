<template>
	<view class="content">
		<view class="header">
			<view class="header header_left">
					<view class="pictrue">
						<open-data type="userAvatarUrl"></open-data>
						<!-- <image :src="avatarUrl" open-type='getUserInfo' @click="getuserinfo" withCredentials="true" ></image> -->
					</view>
					<view class="nicktxt">
						<view class="nickname" >
							<block v-if="dologin">
								{{nickName}}
							</block>
							<block v-else>
								<open-data type="userNickName"></open-data>
							</block>
						</view>
						<view class="binding">
							<button 
							type="primary"
							size="mini"
							open-type='getUserInfo' 
							@click="getuserinfo" 
							@getuserinfo="getuserinfo"
							withCredentials="true" 
							>
								{{mobile}}
							</button>
						</view>
					</view>
			</view>
			<view class="header header_right">
				<view class="icon-set">
					<image :src="level"></image>
					<image :src="setting"></image>
				</view>
			</view>
		</view>
		<view class="body">
			<view class="tabbar_toos">
				<view class="list">
					<view class="text_top"> 今日业绩 </view>
					<view class="text_end"> 800.00 </view>
				</view>
				<view class="list">
					<view class="text_top"> 今日客户 </view>
					<view class="text_end"> 36 </view>
				</view>
				<view class="list border_none">
					<view class="text_top"> 今日会员 </view>
					<view class="text_end"> 12 </view>
				</view>
			</view>
		</view>
		<view class="tabbar_order">
			<view class="order_top">
				<view class="order">
					我的预约
				</view>
				<view class="all_order">
					全部预约 >
				</view>
			</view>
			<view class="order_content">
				<view class="order_icon">
					<view class="order_icon_top"> <image :src="order1"></image> </view>
					<view class="order_icon_end"> 待受理 </view>
				</view>
				<view class="order_icon">
					<view class="order_icon_top"> <image :src="order2"></image> </view>
					<view class="order_icon_end"> 已受理 </view>
				</view>
				<view class="order_icon">
					<view class="order_icon_top"> <image :src="order3"></image> </view>
					<view class="order_icon_end"> 进行中 </view>
				</view>
				<view class="order_icon">
					<view class="order_icon_top"> <image :src="order4"></image> </view>
					<view class="order_icon_end"> 已完成 </view>
				</view>
			</view>
		</view>
		<view class="tabbar_order order_foot">
			<view class="order_top">
				<view class="order">
					功能推荐
				</view>
			</view>
			
			<view class="order_content">
				<view class="order_icon">
					<view class="order_icon_top"> <image :src="iconUrl + 'images/icon/xiaoshou.png'"></image> </view>
					<view class="order_icon_end"> 接待销售 </view>
				</view>
				<view class="order_icon">
					<view class="order_icon_top"> <image :src="iconUrl + 'images/icon/zhichu.png'"></image> </view>
					<view class="order_icon_end"> 费用支出 </view>
				</view>
				<view class="order_icon">
					<view class="order_icon_top"> <image :src="iconUrl + 'images/icon/ruku.png'"></image> </view>
					<view class="order_icon_end"> 商品入库 </view>
				</view>
				<view class="order_icon">
					<view class="order_icon_top"> <image :src="iconUrl + 'images/icon/liushui.png'"></image> </view>
					<view class="order_icon_end"> 流水记录 </view>
				</view>
			</view>
			
		</view>
		
		<!-- 底部导航组件 -->
		<foot :footCopyRightTime="footCopyRightTime" :footVersion="footVersion"></foot>
	</view>
</template>

<script>
	import foot from "../../components/foot.vue"
	const app = getApp();
	const globalData = app.globalData;
	const imgHost = globalData.imgHost;
	const dologin = globalData.dologin;
	export default {
		data() {
			return {
				setting:imgHost + 'images/common/setting.png',
				level:imgHost + 'images/common/level.png',
				order1:imgHost + 'images/common/order1.png',
				order2:imgHost + 'images/common/order2.png',
				order3:imgHost + 'images/common/order3.png',
				order4:imgHost + 'images/common/order4.png',
				avatarUrl:imgHost + 'images/common/order4.png',
				iconUrl: globalData.imgHost,
				dologin: globalData.dologin,
				nickName:'请先点击授权登录',
				mobile:'请先点击授权登录',
				footCopyRightTime: 2010,
				footVersion:'v' + globalData.version,
			};
		},
		components: {
			foot
		},
		//监听页面加载，其参数为上个页面传递的数据
		onLoad:function(e){
			console.log("监听页面加载",e)
			var that = this;
			var userInfo = app.getStorage('userInfo');
			if(userInfo){
				console.log("是否有用户信息了",userInfo)
				that.avatarUrl = userInfo.avatarUrl;
				that.nickName = userInfo.nickName;
			}
			var mobile = app.getStorage('mobile');
			var store_token = app.getStorage('store_token');
			console.log("store_token========" + store_token)
			if(mobile && store_token){
				that.mobile = mobile;
			}
			var StoreMobile = app.getStorage('StoreMobile');
			if(StoreMobile && store_token){
				that.mobile = StoreMobile;
			}
		},
		//监听页面显示。页面每次出现在屏幕上都触发
		onShow:function(){
			var that = this;
			var userInfo = app.getStorage('userInfo');
			if(userInfo){
				console.log("是否有用户信息了",userInfo)
				that.avatarUrl = userInfo.avatarUrl;
				that.nickName = userInfo.nickName;
			}
			var mobile = app.getStorage('mobile');
			var store_token = app.getStorage('store_token');
			console.log("store_token========" + store_token)
			if(mobile && store_token){
				that.mobile = mobile;
			}
			var StoreMobile = app.getStorage('StoreMobile');
			if(StoreMobile && store_token){
				that.mobile = StoreMobile;
			}
		},
		//监听页面初次渲染完成
		onReady:function(){
			var that = this;
			var userInfo = app.getStorage('userInfo');
			if(userInfo){
				console.log("是否有用户信息了",userInfo)
				that.avatarUrl = userInfo.avatarUrl;
				that.nickName = userInfo.nickName;
			}
			var mobile = app.getStorage('mobile');
			var store_token = app.getStorage('store_token');
			console.log("store_token========" + store_token)
			if(mobile && store_token){
				that.mobile = mobile;
			}
			var StoreMobile = app.getStorage('StoreMobile');
			if(StoreMobile && store_token){
				that.mobile = StoreMobile;
			}
		},
		methods:{
			getuserinfo:function(e){
				console.log("获取用户回调的信息",e)
				var that = this;
				if(e.detail.errMsg == "getUserInfo:ok"){
					console.log("用户已允许授权获得用户信息",e.detail.errMsg);
					var encryptedData = e.detail.encryptedData;
					var errMsg = e.detail.errMsg;
					var iv = e.detail.iv;
					var userInfo = e.detail.userInfo;
					if(userInfo){
						that.avatarUrl = userInfo.avatarUrl;
						that.nickName = userInfo.nickName;
					}
					app.setUserInfo(userInfo,encryptedData,iv);
					return;
				}else{
					var res = app.getUserInfo(e.detail.errMsg);
					if(e.detail.errMsg == "getUserInfo:fail auth deny"){
						uni.showModal({
							title:"授权提示",
							content:"授权失败，请允许授权！",
							showCancel:false
						})
					}
					console.log("用户未允许授权获得用户信息，失败",e.detail.errMsg);
					return;
				}
			}
		}
	}
</script>

<style lang="scss">
	.button::after{
		border:none!important;
		border:none;
	}
	.header {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: center;
		background-color: #69C3AA;
	}
	.header_left{
		width: 65%;
		padding-left: 30rpx;
		height: 200rpx;
		align-items: center;
		align-content: flex-start;
		justify-content: flex-start;
	}
	.pictrue{
		width: 130rpx;
		height: 130rpx;
		border-radius: 50%;
		border: 2px solid #f5f5f5;
		overflow: hidden;
	}
	.pictrue image{
		width: 100%;
		height: 100%;
		border-radius: 50%;
		border: 2px solid #f5f5f5;
	}
	.nicktxt{
		color: rgba(255,255,255,1);
		margin-left: 30rpx;
		align-content: center;
		width: 250rpx;
		height: 130rpx;
		line-height: 50rpx;
		overflow: hidden;
	}
	.nickname{
		margin-top: 10rpx;
		align-items: center;
		line-height: 50rpx;
		height: 50rpx;
		text-align: center;
	}
	button{
		width: 100%;
		height: auto;
		margin: 0;
		padding: 0;
		text-align: left;
	}
	.binding{
		height: 50rpx;
		line-height: 50rpx;
		text-align: center;
	}
	.binding button{
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 10rpx;
		border: #09BB07 solid 1rpx;
		font-size: 22rpx;
		color: #ffffff;
		text-align: center;
		padding-bottom: 5rpx;
	}
	.header_right{
		width: 30%;
		overflow: hidden;
	}
	.icon-set{
		margin: 0;
		padding-top: 80rpx;
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		width: 130rpx;
	}
	.icon-set image{
		width: 50rpx;
		height: 50rpx;
	}
	.body{
		background-color: #69C3AA;
		border-radius: 0rem 0rem 5rem 5rem;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;
	}
	.tabbar_toos{
		background-color: #FFFFFF;
		height: 200rpx;
		width: 93%;
		margin: 0 auto;
		margin-bottom: 20rpx;
		display: flex;
		flex-wrap: row nowrap;
		justify-content: center;
		box-shadow: 0 0.05rem 0.5rem 0.25rem rgba(80, 136, 230, 0.1);
	}
	.list{
		width: 100%;
		border-right: #999999  1px dotted;
		margin-left: 2rpx;
		padding: 10rpx;
		height: 140rpx;
		margin-top: 20rpx;
		flex-direction: column;
		text-align: center;
		line-height: 65rpx;
	}
	.border_none{
		border: none;
	}
	.text_top{
		color: #666666;
	}
	.text_end{
		color: #000000;
		font-size: 36rpx;
	}
	.tabbar_order{
		background-color: #FFFFFF;
		width: 93%;
		margin: 0 auto;
		box-shadow: 0 0 0.15rem 0.15rem rgba(80, 136, 230, 0.1);
		border-radius: 0rpx 0rpx 10rpx 10rpx;
		margin-bottom: 20rpx;
	}
	.order_top{
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;
		border-bottom: #999 1px dotted;
		line-height: 100rpx;
	}
	.order{
		padding-left: 30rpx;
	}
	.all_order{
		padding-right: 30rpx;
	}
	.order_content{
		height: 200rpx;
		line-height: 200rpx;
		width: 90%;
		margin: 0 auto;
		display: flex;
		flex-wrap: row nowrap;
		justify-content: space-between;
		text-align: center;
	}
	.order_icon{
		margin-top: 40rpx;
		flex-direction: column;
		text-align: center;
		line-height: 50rpx;
	}
	.order_icon_top image{
		width: 60rpx;
		height: 60rpx;
	}
	.order_foot{
		margin-bottom: 10rpx;
	}
</style>
