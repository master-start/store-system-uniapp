<template>
	<view class="m-loading">
		<view class="cu-load  loading" v-if="!finished && loading"></view>
		<view class="cu-load  over" v-if="finished"></view>
	</view>
</template>

<script>
export default {
	props: {
		loading: {
			type: Boolean,
			default: false
		},
		finished: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss"></style>
