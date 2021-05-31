<template>
	<view style="width: 100%; height: 100%;">
		<view class="tabs">
			<view v-for="(tab, index) in tabs" :key="index" class="tab-item" :class="current == index && 'active'" @click="onClick(index)">
			{{ tab.title }}
			</view>
		</view>
		<view :current="current" class="swiper-box">
			<view v-for="(item, index) in tabs" :key="index">
				<scroll-view scroll-y="true" style="height: 100%;">
					<!-- #ifdef MP -->
					<slot name="{{'content' + index}}"></slot>
					<!-- #endif -->
					<!-- #ifndef MP -->
					<slot :name="'content' + index"></slot>
					<!-- #endif -->
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
// 说明文档：https://ext.dcloud.net.cn/plugin?id=3363
export default {
	name: 'swiperTab',
	props: {
		currentTab: {
			type: Number,
			default: 0
		},
		tabs: {
			type: Array,
			default: []
		}
	},
	data() {
		return {
			current: this.currentTab
		};
	},
	methods: {
		onClick(index){
			console.log("点击",index);
			this.current = index;
			this.$emit('onClickChange', this.current);
		},
	}
};
</script>

<style lang="scss" scoped>
.swiper-tab{
	display: block;
	height: 100%;
}
.tabs {
	width: 750rpx;
	height: 88rpx;
	display: flex;
	background-color: #ffffff;
	.tab-item {
		flex: 1;
		text-align: center;
		color: grey;
		line-height: 88rpx;
		font-size: 12pt;
		font-weight: 500;
		height: 100%;
		box-sizing: border-box;
		&.active {
			// color: $uni-color-primary;
			// border-bottom: 2rpx solid $uni-color-primary;
			color: #09bb07;
			border-bottom: 5rpx solid #09bb07;
		}
	}
}
.swiper-box {
	width: 100%;
	height: calc(100% - 75rpx);
	overflow: auto;
}
</style>
