<template>
	<view class="foot">
	   <text class="copyright">{{footCopyRightTime?footCopyRightTime:''}}@门店记账助手 版权所有 {{footVersion?footVersion:''}}</text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			
			};
		},
		props:["footCopyRightTime","footVersion"]
	}
</script>

<style lang="scss">

</style>
