<template>
	<view class="w-picker-demo">
		<view @tap="showPicker('date1')">日期1</view>
		<view @tap="showPicker('date2')">日期2</view>
		<view @tap="showPicker('date3')">日期3</view>
		<view @tap="showPicker('time')">时间</view>
		<view @tap="showPicker('selector')">单列选择</view>
		<view @tap="showPicker('half')">上下午</view>
		<view @tap="showPicker('shortTerm')">短期日期时间</view>
		<view @tap="showPicker('range')">日期区间</view>
		<view @tap="showPicker('region')">省市区三级联动</view>
		<view @tap="showPicker('linkage')">自定义多级联动</view>
		<view class="result">选择结果：{{result.result}}</view>
		<w-picker
			mode="date" 
			startYear="2017" 
			endYear="2029"
			value="2020-04-08 16:45:45"
			:current="false"
			fields="second"
			@confirm="onConfirm($event,'date1')"
			@cancel="onCancel"
			:disabled-after="false"
			ref="date1"
		></w-picker>
		<w-picker
			mode="date" 
			startYear="2017" 
			endYear="2029"
			value="2020-03-07 16:45:45"
			:current="false"
			fields="second"
			@confirm="onConfirm($event,'date2')"
			@cancel="onCancel"
			:disabled-after="false"
			ref="date2"
		></w-picker>
		<w-picker
			mode="date" 
			startYear="2017" 
			endYear="2029"
			value="2018-11-07 16:25:45"
			:current="false"
			fields="second"
			@confirm="onConfirm($event,'date3')"
			@cancel="onCancel"
			:disabled-after="false"
			ref="date3"
		></w-picker>
		<w-picker
			mode="range" 
			startYear="2017" 
			endYear="2030"
			:value="rangeVal"
			:current="true"
			@confirm="onConfirm($event,'range')"
			@cancel="onCancel"
			ref="range" 
		></w-picker>
		<w-picker
			mode="half" 
			startYear="2017" 
			endYear="2030"
			value="2018-02-11 下午"
			:current="true"
			@confirm="onConfirm($event,'half')"
			@cancel="onCancel"
			:disabled-after="false"
			ref="half" 
		></w-picker>
		<w-picker
			mode="shortTerm"
			value="2020-04-08 13:18:00"
			:current="true"
			expand="60"
			@confirm="onConfirm($event,'shortTerm')"
			@cancel="onCancel"
			ref="shortTerm" 
		></w-picker>
		<w-picker
			mode="time" 
			value="18:08:05"
			:current="true"
			:second="false"
			@confirm="onConfirm($event,'time')"
			@cancel="onCancel"
			ref="time" 
		></w-picker>
		<w-picker
			mode="selector"
			value="女"
			default-type="name"
			:default-props="defaultProps"
			:options="selectorList"
			@confirm="onConfirm($event,'selector')"
			@cancel="onCancel"
			ref="selector" 
		></w-picker>
		<w-picker
			mode="region"
			:value="defaultRegion"
			default-type="value"
			:hide-area="false"
			@confirm="onConfirm($event,'region')"
			@cancel="onCancel"
			ref="region" 
		></w-picker>
		<w-picker
			mode="linkage"
			:value="defaultRegion1"
			:options="options"
			:level="4"
			default-type="id"
			:default-props="defaultProps1"
			@confirm="onConfirm($event,'linkage')"
			@cancel="onCancel"
			ref="linkage" 
		></w-picker>
	</view>
</template>


<script>
	import wPicker from "@/components/w-picker/w-picker.vue"
	export default {
		components:{
			wPicker
		},
		data() {
			return {
				result:{
					result:""
				},
				selectorList1:[],
				selectorList:[
					{
						name:"男",
						id:"1"
					},{
						name:"女",
						id:"2"
					}
				],
				defaultProps:{
					label:"name",
					value:"id"
				},
				defaultProps1:{
					label:"name",
					value:"id",
					children:"child"
				},
				rangeVal:['2018-12-12','2020-04-02'],
				defaultRegion:["150000","150100","150103"],
				defaultRegion1:["120000","120100","120101","12010102"],
				options:[
					{
						id: '110000',
						name: '北京市',
						child: [{
							id: "110100",
							name: "北京市",
							child: [{
								id: "110101",
								name: "东城区",
								child:[{
									id: "11010101",
									name: "小区1",
								},{
									id: "11010102",
									name: "小区2",
								}]
							}, {
								id: "110102",
								name: "西城区"
							},{
								id: "110105",
								name: "朝阳区"
							}, {
								id: "110106",
								name: "丰台区"
							}, {
								id: "110107",
								name: "石景山区"
							}, {
								id: "110108",
								name: "海淀区"
							}, {
								id: "110109",
								name: "门头沟区"
							}, {
								id: "110111",
								name: "房山区"
							}, {
								id: "110112",
								name: "通州区"
							}, {
								id: "110113",
								name: "顺义区"
							}, {
								id: "110114",
								name: "昌平区"
							}, {
								id: "110115",
								name: "大兴区"
							}, {
								id: "110116",
								name: "怀柔区"
							}, {
								id: "110117",
								name: "平谷区"
							}, {
								id: "110118",
								name: "密云区"
							}, {
								id: "110119",
								name: "延庆区"
							}]
						}]
					}, {
						id: '120000',
						name: '天津市',
						child: [{
							id: "120100",
							name: "天津市",
							child: [{
								id: "120101",
								name: "和平区",
								child:[{
									id: "12010101",
									name: "小区3",
								},{
									id: "12010102",
									name: "小区4",
								}]
							}, {
								id: "120102",
								name: "河东区"
							}, {
								id: "120103",
								name: "河西区"
							}, {
								id: "120104",
								name: "南开区"
							}, {
								id: "120105",
								name: "河北区"
							}, {
								id: "120106",
								name: "红桥区"
							}, {
								id: "120110",
								name: "东丽区"
							}, {
								id: "120111",
								name: "西青区"
							}, {
								id: "120112",
								name: "津南区"
							}, {
								id: "120113",
								name: "北辰区"
							}, {
								id: "120114",
								name: "武清区"
							}, {
								id: "120115",
								name: "宝坻区"
							}, {
								id: "120116",
								name: "滨海新区"
							}, {
								id: "120117",
								name: "宁河区"
							}, {
								id: "120118",
								name: "静海区"
							}, {
								id: "120119",
								name: "蓟州区"
							}]
						}]
					}
				]
			}
		},
		onLoad() {

		},
		methods: {
			showPicker(type){
				this.$refs[type].show();
			},
			onConfirm(res,type){
				this.result=res;
				console.log(res)
			},
			onCancel(){
				
			}
		}
	}
</script>

<style>
	.w-picker-demo{
		padding:30rpx 0;
		text-align: center;
		font-size: 30rpx;
		line-height: 60rpx;
	}
	.result{
		margin-top: 60px;
	}
</style>
