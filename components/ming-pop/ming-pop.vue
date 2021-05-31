<template>
	<!-- v-if解决center弹窗位置问题 -->
  <view :class="direction==='center'?'centers':''" v-if="direction==='center'?open:true">
		<view class="product-window" :style="{width:width+'%'}" :class="(open ? 'on' : '')+' '+direction">
			<!-- 兼容h5顶部导航空位 -->
			<!-- #ifndef MP -->
				<view v-if="(direction!=='below'&&direction!=='center')" style="height: 100rpx;"></view>
			<!-- #endif -->
			<image src="../../static/ming-pop/close.png" mode="" :class="(direction!=='below'&&direction!=='center')?'iconfont-h5':''" class="iconfont" @click="open=false" v-if="is_close"></image>
			<slot></slot>
		</view>
		<view class="mask" v-if="is_mask" @touchmove.prevent :hidden="!open" @click="open=false"></view>
	</view>
	
</template>

<script>
	export default {
		props: {
			direction: {
				type: String,
				default: "below"
			},
			width: {
				type: Number,
				default: 100
			},
			is_close: {
				type: Boolean,
				default: true
			},
			is_mask: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				open: false
			};
		},
		methods: {
			show() {
				this.open = true;
			},
			close() {
				this.open = false;
			}
		}
	}
</script>

<style lang="scss" scoped>
	view {
		box-sizing: border-box;
	}
	.centers{
		width: 100vw;
		display: flex;
		justify-content: center;
		align-items: center;
    // height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
	}
	.product-window {
		position: fixed;
		background-color: #fff;
		z-index: 77;
		border-radius: 15rpx;
		padding: 50rpx 30rpx;
		transition: all .3s cubic-bezier(.25, .5, .5, .9);
		-webkit-transition: all .3s cubic-bezier(.25, .5, .5, .9);
	}

	.below {
		left: 0;
		bottom: 0;
		transform: translate3d(0, 100%, 0);
		-webkit-transform: translate3d(0, 100%, 0);
	}

	.up {
		top: 0;
		left: 0;
		transform: translate3d(0, -100%, 0);
		-webkit-transform: translate3d(0, -100%, 0);
	}

	.right {
		right: 0;
		top: 0;
		height: 100%;
		transform: translate3d(100vw, 0, 0);
		-webkit-transform: translate3d(100vw, 0, 0);
	}

	.left {
		left: 0;
		top: 0;
		height: 100%;
		transform: translate3d(-100vw, 0, 0);
		-webkit-transform: translate3d(-100vw, 0, 0);
	}
	.center{
    position: static;
    -webkit-position: static;
		transform: translate3d(-100vw, -100%, 0);
		-webkit-transform: translate3d(-100vw, -100%, 0);
	}
	.product-window.on {
		transform: translate3d(0, 0, 0);
		-webkit-transform: translate3d(0, 0, 0);
	}

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #000;
		opacity: .5;
		z-index: 5;
	}

	
	.product-window .iconfont {
		position: fixed;
		right: 30rpx;
		top: 20rpx;
		font-size: 35rpx;
		color: #8a8a8a;
		width: 50rpx;
		height: 50rpx;
	}
	//兼容h5顶部导航空位
	// #ifndef MP
	.product-window .iconfont-h5{
		top: 100rpx;
	}
	// #endif
</style>
