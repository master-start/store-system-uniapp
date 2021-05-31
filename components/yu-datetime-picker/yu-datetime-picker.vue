<template>
	<view class="yu-datetime-picker">
		<view class="yu-datetime-mask" :class="{'show':showPicker}" @tap="maskClick" @touchmove.stop.prevent catchtouchmove="true"></view>
		<view class="yu-datetime-content" :class="{'show':showPicker}">
			<view class="yu-datetime-hd" @touchmove.stop.prevent catchtouchmove="true">
				<view class="yu-datetime-btn" @tap="pickerCancel">取消</view>
				<view class="yu-datetime-btn" :style="{color: color}" @tap="pickerConfirm">确定</view>
			</view>
			<view class="yu-datetime-view">
				<picker-view v-if="isAll" :indicator-style="itemHeight" :value="values" @change="bindChange">
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.years" :key="index">{{item}}年</view>
					</picker-view-column>
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.months" :key="index">{{item}}月</view>
					</picker-view-column>
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.days" :key="index">{{item}}日</view>
					</picker-view-column>
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.hours" :key="index">{{item}}时</view>
					</picker-view-column>
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.minutes" :key="index">{{item}}分</view>
					</picker-view-column>
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.seconds" :key="index">{{item}}秒</view>
					</picker-view-column>
				</picker-view>
				<picker-view v-else :indicator-style="itemHeight" :value="dateValues" @change="bindDateChange">
					<picker-view-column class="yu-picker-column">
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.dates" :key="index">{{item}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.hours" :key="index">{{item}}时</view>
					</picker-view-column>
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.minutes" :key="index">{{item}}分</view>
					</picker-view-column>
					<picker-view-column>
						<view class="yu-datetime-item" v-for="(item,index) in dateObj.seconds" :key="index">{{item}}秒</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</view>
</template>
<script>
	//日期时间选择组件
	// https://ext.dcloud.net.cn/plugin?id=675
	export default {
		name: "yuDatetimePicker",
		props: {
			isAll: { //全部日期有效可选
				type: Boolean,
				default () {
					return true
				}
			},
			current: { //默认显示当前日期时间
				type: Boolean,
				default () {
					return true
				}
			},
			color: { //颜色
				type: String,
				default () {
					return '#3279e4'
				}
			},
			startYear: { //开始年份
				type: [String, Number],
				default () {
					return new Date().getFullYear()
				}
			},
			endYear: { //结束年份
				type: [String, Number],
				default () {
					return '2050'
				}
			},
			value: { //设置默认日期时间，优先级高于current
				type: String,
				default () {
					return ''
				}
			}
		},
		data() {
			let date = new Date()
			let year = date.getFullYear()
			let month = date.getMonth() + 1
			let day = date.getDate()
			let hour = date.getHours()
			let minute = date.getMinutes()
			let second = date.getSeconds()
			let dates = []
			let months = []
			let years = []
			let days = []
			let hours = []
			let minutes = []
			let seconds = []
			for (let i = month; i <= month + 2; i++) {//获取包括当前月份在内的3个月内的日期
				let localMonth = i;
				let localYear = year;
				if (i == 13) {
					localYear += 1;
				}
				if (i >= 13) {
					localMonth -= 12;
				}
				let total = new Date(localYear, localMonth, 0).getDate();
				if (i == month) {
					for (let j = day; j <= total; j++) {
						let m = localMonth;
						let d = j;
						if(localMonth < 10){ m = '0' + m;}
						if(j < 10){ d = '0' + d;}
						let str = year + '-' + m + '-' + d;
						dates.push(str);
					}
				} else {
					for (let j = 1; j <= total; j++) {
						let m = localMonth;
						let d = j;
						if(localMonth < 10){ m = '0' + m;}
						if(j < 10){ d = '0' + d;}
						let str = localYear + '-' + m + '-' + d;
						dates.push(str);
					}
				}
			}
			for (let i = parseInt(this.startYear); i <= this.endYear; i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				let str = i;
				if(i < 10){ str = '0' + str;}
				else{str = '' + str;}
				months.push(str)
			}
			
			if(this.value){
				let valueArr = this.value.split(' ');
				let valueDateArr = valueArr[0].split('-');
				let totalCurrent = new Date(valueDateArr[0], valueDateArr[1], 0).getDate();
				for (let i = 1; i <= totalCurrent; i++) {
					let str = i;
					if(i < 10){ str = '0' + str;}
					else{str = '' + str;}
					days.push(str)
				}
			}else{
				let totalCurrent = new Date(year, month, 0).getDate();
				for (let i = 1; i <= totalCurrent; i++) {
					let str = i;
					if(i < 10){ str = '0' + str;}
					else{str = '' + str;}
					days.push(str)
				}
			}
			for (let i = 0; i < 24; i++) {
				let str = i;
				if(i < 10){ str = '0' + str;}
				else{str = '' + str;}
				hours.push(str);
			}
			for (let i = 0; i < 60; i++) {
				let str = i;
				if(i < 10){ str = '0' + str;}
				else{str = '' + str;}
				minutes.push(str);
			}
			for (let i = 0; i < 60; i++) {
				let str = i;
				if(i < 10){ str = '0' + str;}
				else{str = '' + str;}
				seconds.push(str);
			}
			let dateObj = {
				dates,
				years,
				months,
				days,
				hours,
				minutes,
				seconds
			}
			return {
				year,
				month,
				day,
				hour,
				minute,
				second,
				dateObj,
				itemHeight: `height: ${uni.upx2px(88)}px;`,
				values: [0, 0, 0, 0, 0, 0],
				selectArr: [],
				selectRes: "",
				showPicker: false,
				dateValues: [0, 0, 0, 0]
			};
		},
		mounted() {
			this.initDate();
			if(!this.value && this.current) {
				this.showCurrent();
			}
		},
		methods: {
			initDate() {
				let _this =this;
				//解析默认显示的日期时间
				if (_this.value) {
					let values = [0, 0, 0, 0, 0, 0];
					let dateValues = [0, 0, 0, 0];
					let valueStr = _this.value;
					let valueArr = valueStr.split(' ');
					let valueDateArr = valueArr[0].split('-');
					let valueTimeArr = valueArr[1].split(':');
					if (_this.isAll) {
						values[0] = (valueDateArr[0] - _this.startYear) > 0 ? valueDateArr[0] - _this.startYear : 0;
						values[1] = parseInt(valueDateArr[1]) - 1;
						values[2] = parseInt(valueDateArr[2]) - 1;
						values[3] = parseInt(valueTimeArr[0]);
						values[4] = parseInt(valueTimeArr[1]);
						values[5] = parseInt(valueTimeArr[2]);
						_this.$nextTick(() => {
							_this.values = values;
						})
						if ((valueDateArr[0] - _this.startYear) >= 0) {
							_this.selectArr = [valueDateArr[0], valueDateArr[1], valueDateArr[2], valueTimeArr[0], valueTimeArr[1],valueTimeArr[2]];
							_this.selectRes = _this.value;
						} else {
							_this.selectArr = [_this.formatNum(_this.startYear), valueDateArr[1], valueDateArr[2], valueTimeArr[0],valueTimeArr[1], valueTimeArr[2]];
							_this.selectRes = `${this.formatNum(_this.startYear)+'-'+valueDateArr[1]+'-'+valueDateArr[2]+' '+valueTimeArr[0]+':'+valueTimeArr[1]+':'+valueTimeArr[2]}`;
						}
					} else {
						let str = valueDateArr.join('');
						let localStr = _this.formatNum(_this.year) + _this.formatNum(_this.month) + _this.formatNum(_this.day) + '';
						if (str < localStr) {
							dateValues[0] = 0;
							_this.selectArr = [_this.formatNum(_this.year), _this.formatNum(_this.month), _this.formatNum(_this.day), valueTimeArr[0],valueTimeArr[1], valueTimeArr[2]];
							_this.selectRes =`${_this.formatNum(_this.year)+'-' + _this.formatNum(_this.month) + '-' + _this.formatNum(_this.day) + ' ' + valueTimeArr[0] +':'+valueTimeArr[1] +':'+valueTimeArr[2]}`;
						} else {
							
							let num = 0; //计算默认日期和当前日期相隔天数，计算下标
							let start = _this.formatNum(_this.year) + '-' + _this.formatNum(_this.month) + '-' + _this.formatNum(_this.day);
							let res = _this.getBetweenDateStr(start, valueArr[0]);
							dateValues[0] = res.length - 1;
							_this.selectArr = [valueDateArr[0], valueDateArr[1], valueDateArr[2], valueTimeArr[0], valueTimeArr[1],valueTimeArr[2]];
							_this.selectRes = _this.value;
						}
						dateValues[1] = parseInt(valueTimeArr[0]);
						dateValues[2] = parseInt(valueTimeArr[1]);
						dateValues[3] = parseInt(valueTimeArr[2]);
						_this.$nextTick(() => {
							_this.dateValues = dateValues;
						});
					}
					return;
				}
				if (_this.isAll) {
					_this.selectArr = [_this.formatNum(_this.startYear), '01', '01', '00', '00', '00'];
					_this.selectRes = `${_this.formatNum(_this.startYear)+'-01-01 00:00:00'}`;
				} else {
					_this.selectArr = [_this.formatNum(_this.year), _this.formatNum(_this.month), '01', '00', '00', '00'];
					_this.selectRes = `${_this.formatNum(_this.year)+'-' + _this.formatNum(_this.month) + '-01 00:00:00'}`;
				}
			},
			showCurrent() { //显示当前的日期时间
				let arr = [0, 0, 0, 0, 0, 0];
				let dateArr = [0, 0, 0, 0];
				this.selectArr = [this.formatNum(this.year), this.formatNum(this.month), this.formatNum(this.day), this.formatNum(this.hour), this.formatNum(this.minute), this.formatNum(this.second)];
				this.selectRes = `${this.formatNum(this.year)+'-'+this.formatNum(this.month)+'-'+this.formatNum(this.day)+' '+this.formatNum(this.hour)+':'+this.formatNum(this.minute)+':'+this.formatNum(this.second)}`;
				if (this.isAll) {
					arr[0] = this.year - this.startYear;
					arr[1] = this.month - 1;
					arr[2] = this.day - 1;
					arr[3] = this.hour;
					arr[4] = this.minute;
					arr[5] = this.second;
					this.$nextTick(() => {
						this.values = arr;
					})
				} else {
					dateArr[1] = this.hour;
					dateArr[2] = this.minute;
					dateArr[3] = this.second;
					this.$nextTick(() => {
						this.dateValues = dateArr;
					})
				}
			},
			initDayArr: (year, month) => { //初始化月份天数
				let totalDay = new Date(year, month, 0).getDate();
				let dayArr = [];
				for (let i = 1; i <= totalDay; i++) {
					if (i < 10) {
						i = '0' + i;
					} else {
						i = i + '';
					}
					dayArr.push(i);
				};
				return dayArr;
			},
			formatNum(num) { //日期时间的初始化
				return num < 10 ? '0' + num : num + '';
			},
			maskClick() { //日期时间的遮罩
				this.showPicker = false;
			},
			show() { //日期时间的显示
				this.showPicker = true;
			},
			hide() { //日期时间的隐藏
				this.showPicker = false;
			},
			pickerCancel() { //日期时间取消
				this.$emit("cancel", {
					selectArr: this.selectArr
				});
				this.showPicker = false;
			},
			pickerConfirm(e) { //日期时间确定
				this.$emit("confirm", {
					selectArr: this.selectArr,
					selectRes: this.selectRes
				});
				this.showPicker = false;
			},
			bindChange(e) { //默认滚动日期时间方法
				let valueArr = e.detail.value;
				let year = "",
					month = "",
					day = "",
					hour = "",
					minute = "",
					second = "";
				let selectArr = this.selectArr;
				let dayArr = [];
				year = this.dateObj.years[valueArr[0]];
				month = this.dateObj.months[valueArr[1]];
				day = this.dateObj.days[valueArr[2]];
				hour = this.dateObj.hours[valueArr[3]];
				minute = this.dateObj.minutes[valueArr[4]];
				second = this.dateObj.seconds[valueArr[5]];
				if (year != selectArr[0]) {
					dayArr = this.initDayArr(year, month);
					this.dateObj.days = dayArr;
				};
				if (month != selectArr[1]) {
					dayArr = this.initDayArr(year, month);
					this.dateObj.days = dayArr;
				};
				this.selectArr = [year, month, day, hour, minute, second];
				this.selectRes = `${year+'-'+month+'-'+day+' '+hour+':'+minute+':'+second}`;
				this.$nextTick(() => {
					this.values = valueArr;
				})
			},
			bindDateChange(e) { //有效日期的滚动日期时间方法
				let valueArr = e.detail.value;
				let dateStr = "",
					dateArr = [],
					hour = "",
					minute = "",
					second = "";
				let selectArr = this.selectArr;
				let dayArr = [];
				dateStr = this.dateObj.dates[valueArr[0]];
				dateArr = dateStr.split('-');
				hour = this.dateObj.hours[valueArr[1]];
				minute = this.dateObj.minutes[valueArr[2]];
				second = this.dateObj.seconds[valueArr[3]];
				this.selectArr = [dateArr[0], dateArr[1], dateArr[2], hour, minute, second];
				this.selectRes = `${dateArr[0]+'-'+dateArr[1]+'-'+dateArr[2]+' '+hour+':'+minute+':'+second}`;
				this.$nextTick(() => {
					this.dateValues = valueArr;
				})
			},
			//遍历两个日期间的所有日期
			getBetweenDateStr(start, end) {
				let result = [];
				let beginDay = start.split("-");
				let endDay = end.split("-");
				let diffDay = new Date();
				let dateList = new Array;
				let i = 0;
				diffDay.setDate(beginDay[2]);
				diffDay.setMonth(beginDay[1] - 1);
				diffDay.setFullYear(beginDay[0]);
				result.push(start);
				while (i == 0) {
					let countDay = diffDay.getTime() + 24 * 60 * 60 * 1000;
					diffDay.setTime(countDay);
					dateList[2] = diffDay.getDate();
					dateList[1] = diffDay.getMonth() + 1;
					dateList[0] = diffDay.getFullYear();
					if (String(dateList[1]).length == 1) {
						dateList[1] = "0" + dateList[1]
					};
					if (String(dateList[2]).length == 1) {
						dateList[2] = "0" + dateList[2]
					};
					result.push(dateList[0] + "-" + dateList[1] + "-" + dateList[2]);
					if (dateList[0] == endDay[0] && dateList[1] == endDay[1] && dateList[2] == endDay[2]) {
						i = 1;
					}
				};
				return result;
			}
		}
	}
</script>
<style>
	.yu-datetime-picker {
		position: relative;
		z-index: 888;
	}

	.yu-datetime-mask {
		position: fixed;
		z-index: 1000;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.4);
		visibility: hidden;
		opacity: 0;
		transition: all 0.3s ease;
	}

	.yu-datetime-mask.show {
		visibility: visible;
		opacity: 1;
	}

	.yu-datetime-content {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		transition: all 0.3s ease;
		transform: translateY(100%);
		z-index: 3000;
	}

	.yu-datetime-content.show {
		transform: translateY(0);
	}

	.yu-datetime-hd {
		display: flex;
		align-items: center;
		padding: 0 30upx;
		height: 44px;
		background-color: #fff;
		position: relative;
		text-align: center;
		font-size: 15px;
		justify-content: space-between;
	}

	.yu-datetime-btn {
		font-size: 14px;
	}

	.yu-datetime-hd:after {
		content: ' ';
		position: absolute;
		left: 0;
		bottom: 0;
		right: 0;
		height: 1px;
		border-bottom: 1px solid #e5e5e5;
		color: #e5e5e5;
		transform-origin: 0 100%;
		transform: scaleY(0.5);
	}

	.yu-datetime-view {
		width: 100%;
		height: 200px;
		overflow: hidden;
		background-color: rgba(255, 255, 255, 1);
		z-index: 666;
	}

	.yu-datetime-view picker-view {
		height: 100%;
	}

	.yu-picker-column {
		-webkit-flex: 2;
		-webkit-box-flex: 2;
		flex: 2;
	}

	.yu-datetime-item {
		text-align: center;
		width: 100%;
		height: 88upx;
		line-height: 88upx;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 30upx;
	}
</style>
