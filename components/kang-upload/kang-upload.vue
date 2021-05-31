<template name="sunui-upimg">
	<view class="sunui-uploader-bd">
		<view class="sunui-uploader-files">
			<block v-for="(item, index) in upload_before_list" :key="index">
				<view class="sunui-uploader-file" :class="[item.upload_percent < 100 ? 'sunui-uploader-file-status' : '']" :style="'width:' + upload_img_wh + 'rpx; height:' + upload_img_wh + 'rpx;'">
					<image class="sunui-uploader-img" :style="'width:' + upload_img_wh + 'rpx; height:' + upload_img_wh + 'rpx;'" :src="item.path" mode="aspectFill" @tap="preview(index)" v-if="upload_type === 'image'" />
					<video :id="`myVideo_${index}`" :src="item.path" :data-index="index" @play="videoPlay" @error="videoError" controls :enable-play-gesture="true" objectFit="contain" :style="'width:' + upload_img_wh + 'rpx; height:' + upload_img_wh + 'rpx;'" v-if="upload_type === 'video'"></video>
					<view class="sunui-img-removeicon right" @tap.stop="remove(index)" v-show="upimg_move">x</view>
					<view class="sunui-loader-filecontent" v-if="item.upload_percent < 100">{{item.upload_percent}}%</view>
				</view>
			</block>
			<view v-show="upload_before_list.length < upload_count" hover-class="sunui-uploader-hover" class="sunui-uploader-inputbox" @tap="choose" :style="'width:' + upload_img_wh + 'rpx; height:' + upload_img_wh + 'rpx;'">
				<view :style="'line-height:'+ upload_img_wh + 'rpx;'"><text class="iconfont icon-mn_shangchuantupian" style="color: #666;"></text></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 选择图片tempFile
			upload_cache: [],
			// 预览数组->支持从服务器拉取
			upload_cache_list: [],
			// 上传数组
			upload_before_list: [],
			// 图片大小
			upload_img_size: [],
			// 超出限制数组
			upload_exceeded_list: [],
			// 最大上传容量(M)
			upload_max:2,
			// 图片/选择宽高
			upload_img_wh: 150,
			//视频内容
			videoContext: [],
		}
	},
	name: 'sunui-upimg',
	props: {
		upload_auto: {
			type: Boolean,
			default: true
		},
		upimg_move: {
			type: Boolean,
			default: true
		},
		// 服务器url
		url: {
			type: String,
			default: ''
		},
		//请求头
		header: {
			type: Object,
			default:{}
		},
		//image = 图片，video = 视频
		upload_type: {
			type: String,
			default: 'image'
		},
		//上传数量
		upload_count:{
			type: Number,
			default: 1
		},
		//请求参数名
		upload_param:{
			type: String,
			default: 'files'
		},
	},
	onReady(res) {
		this.$nextTick(() => {			
			for (let i = 0; i < 10; i++) {			
				this.videoContext[i] = uni.createVideoContext(`myVideo_${i}`);  
			}
		});
	},
	created() {
		
	},
	mounted() {

	},
	watch: {
		url(val) {
			this.upload_before_list.map((item) => {
				this.upload_cache_list.push(item.path);
			});
			this.emit();
		}
	},
	methods: {
		videoPlay(e) {
			let index = e.currentTarget.dataset.index;
			this.videoContext[index].requestFullScreen();
			
			for (let i = 0; i < this.upload_before_list.length; i++) {
				if (i != index) this.videoContext[i].pause();
			}
		},
		videoError(e) {
			uni.showModal({
				content: '网络错误，请稍后重试！',
				showCancel: false
			});
		},
		uploadFile(paths) {
			const promises = paths.map((path) => {
				return this.promisify(this.uploader)({
					url: this.url,
					path: path,
					name: this.upload_param,
					header: this.header,
					extra: {},
				});
			});

			/* uni.showLoading({
				title: `正在上传...`,
			}); */

			Promise.all(promises).then((data) => {
				// uni.hideLoading();
				this.upload_cache_list.push(...data);
				this.emit();
			}).catch((res) => {
				console.log(res);
				// uni.hideLoading();
			});
		},
		choose() {
			switch (this.upload_type) {
				case 'video':
					uni.chooseVideo({
						count: this.upload_count - this.upload_before_list.length,
						compressed: true,
						sourceType: ['album', 'camera'],
						success: async (res) => {
							res.path = res.tempFilePath;
							res.upload_percent = 0;
								
							if (Math.ceil(res.size / 1024) < this.upload_max * 1024) {
								await this.upload_img_size.push(Math.ceil(res.size / 1024));
								await this.upload_before_list.push(res);
							} else {
								this.upload_exceeded_list.push(1);
								
								uni.showModal({
									title: '提示',
									content: `视频超出限制${this.upload_max}MB,已忽略`,
									showCancel: false,
									confirmText: '确认',
									success(res) {

									}
								});
							}
							this.upload_cache = [];
							this.upload_cache.push(res.tempFilePath);
							this.upload(this.upload_auto);
						},
						fail: (err) => {
							console.log(err);
						}
					});
					break;
				case 'image':
					console.log("已上传的数量",this.upload_before_list.length);
					console.log("限制的数量",this.upload_count)
					let _self = this;
					let upNum = _self.upload_count - _self.upload_before_list.length;
					if(upNum == 0 || upNum < 0){
						uni.showModal({
							title: '提示',
							content: `超过上传图片数量限制,只能上传` + _self.upload_count + '张图片',
							showCancel: false,
							confirmText: '确认'
						});
						break;
					}
					uni.chooseImage({
						count: upNum,
						sizeType: ['compressed', 'original'],
						sourceType: ['album', 'camera'],
						success: async (res) => {
							console.log("res====",res);
							for (let i = 0, len = res.tempFiles.length; i < len; i++) {
								res.tempFiles[i].upload_percent = 0;
								if (Math.ceil(res.tempFiles[i].size / 1024) < _self.upload_max * 1024) {
									await _self.upload_img_size.push(Math.ceil(res.tempFiles[i].size / 1024));
									await _self.upload_before_list.push(res.tempFiles[i]);
									// TODO v3.1增加图片格式限制
								} else {
									res.tempFilePaths.splice(i, 1);
									_self.upload_exceeded_list.push(i === 0 ? 1 : i + 1);
									uni.showModal({
										title: '提示',
										content: `第${[...new Set(_self.upload_exceeded_list)].join(',')}张图片超出限制${_self.upload_max}MB,已过滤`,
										showCancel: false,
										confirmText: '确认',
										success(res) {
											if (res.confirm) {
												_self.upload_img_size.splice(i--, 1);
												_self.upload_exceeded_list.splice(i--, 1);
											}
										}
									});
								}
							}
							_self.upload_cache = await res.tempFilePaths;
							_self.upload(_self.upload_auto);
						},
						fail: (err) => {
							console.log(err);
						}
					});
					break;
				default:
					break;
			}
		},
		async upload(upload_auto) {
			upload_auto ? await this.uploadFile(this.upload_cache) : console.warn(
				`传输参数:this.$refs.xx.upload(true)才可上传,默认false`);
		},
		preview(idx) {
			uni.previewImage({
				current: idx,
				urls: this.upload_cache_list
			});
		},
		remove(idx) {
			this.upload_before_list.splice(idx, 1);
			this.upload_cache_list.splice(idx, 1);
			this.emit();
		},
		emit() {
			this.$emit('change', this.upload_cache_list);
		},
		promisify(api) {
			return (options, ...params) => {
				return new Promise((resolve, reject) => {
					api(Object.assign({}, options, {
						success: resolve,
						fail: reject
					}), ...params);
				});
			}
		},
		uploader(options) {
			var url = options.url,
				path = options.path,
				name = options.name,
				header = options.header,
				// data = options.data,
				extra = options.extra,
				success = options.success,
				progress = options.progress,
				fail = options.fail;
			
			const uploadTask = uni.uploadFile({
				url: url,
				filePath: path,
				name: name,
				header: header,
				formData: extra,
				success(res) {
					let data = res.data
					if (res.statusCode === 200) {
						console.log("返回的参数为1",res)
						data = JSON.parse(data);
						console.log("返回的参数为2",data)
						if (data.code == 1) {
							success(data.result.data);
						} else {
							fail(data);
						}
					} else {
						fail(data);
						if (res.statusCode === 401) {
							this.$tui.toast('未登录或登录状态过期', 2000);
							let _this = this;
							setTimeout(() => {
								_this.$utils.goAuth();
							}, 2000);
						} else if (data.statusCode === 403) {
							this.$tui.toast(item.message, 2000);
						}
					}
				},
				fail(res) {
					fail(res);
				}
			});
			
			uploadTask.onProgressUpdate(async (res) => {
				// this.upload_before_list[this.upload_before_list.length-1].upload_percent = await res.progress;
				for(let i in this.upload_before_list) { 
					if(this.upload_before_list[i].upload_percent != 100) { 
						this.upload_before_list[i].upload_percent = await res.progress; break; 
					}
				};
			});
		}
	}
}
</script>

<style lang="scss">
	@font-face {
		font-family: "iconfont";
		src: url('//at.alicdn.com/iconfont.eot?t=1574391686418');
		/* IE9 */
		src: url('//at.alicdn.com/iconfont.eot?t=1574391686418#iefix') format('embedded-opentype'),
			/* IE6-IE8 */
			url('data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAMkAAsAAAAAB2QAAALYAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCCcAqCYIJEATYCJAMICwYABCAFhG0HPRt3BhEVlCNkH4dxmzUXNsJHc1SNfR9KTkCtiXv/l+QDBQSFRBJdKoEsg60HUgCsOpWVnWxNx3BvVITqkj3fepbtzM/OfDo4D86iFEIiJAeX02+Bh/O84TLmsrEnYBxQoHtgm6xACoxTkN0zFsgEdQynCShpq7cwbsK0eTKROSkgbNu8cbUspRFrkoNMkC9ZGYWjcrJkX/IIR/zPhz/6hIxELmWmzdowfp1RvxdbYWm1VrUMCO54JvDrSNEbkTCv1DJDGvp6S5VUX9SRdSUHfi+u1cBZ7R+PQMgzEyugNcU5J67DO9VfJiCigD042iuNQqXSunGRfvrWV6/mvX49/+3bhW/eLHr4puOFtxMfvO5w9tX8yv7rIbf3Rrl84Mbe66XSzWet46nn/etMuALua5LqNZUqpKdfDKjsv2qef+yambJsTWM2zDtKIQ0pS7msvSTUpn1tNyts2xZmWUyw3LI4bPisSZNyOUc2y4/scfZs3QZ1UcgqUWtkVednsvnVs7NOHzmqglXIBnqU7+/M9Hp3y3L2RLWYA9uhlat61/LGGwVqt9Nvafv/8R2fmg/pu7LesH9ZOYL3/6e3P6Z2O0rbIztra+Dtc1u2RY1vapOocEtDiT0Kd1VUUkIN42joS19Fk1s1BVmKy0OioA2kMp1REdcbcsr6QV5mJJT0MnF9mbQRchZiET29CAT1fSBR1y1I1fdFRdwPcpr6Q179cIaSBaHRjmVdgxFjCSvGFuonmGYcpK1nESRfUC1dRUm+T3ggeeOEOIiywRwHpDHm+FUlzBIkjT1k5DzsuhEmGi02HGjmKQ1DWfaioBn7gzAWQRWGWqD2BIzGaCDRm4nc+y+QsuhUqKaqyviAiGcGB7FA1AKVS4ZWVddyibdSEoxJQCKjHsjIMNTpjMBUPsxCDRbQPTyTVGh1k20lwfyy/un2QYmpTII1I9Vo+1B4XQ2q0QvwvExGfTgA') format('woff2'),
			url('//at.alicdn.com/iconfont.woff?t=1574391686418') format('woff'),
			url('//at.alicdn.com/iconfont.ttf?t=1574391686418') format('truetype'),
			/* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
			url('//at.alicdn.com/iconfont.svg?t=1574391686418#iconfont') format('svg');
		/* iOS 4.1- */
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.icon-mn_shangchuantupian:before {
		content: "\e559";
	}

	.icon-mn_shangchuantupian {
		font-size: 3em;
	}

	.sunui-uploader-img {
		display: block;
	}

	.sunui-uploader-input {
		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		opacity: 0;
	}

	.sunui-uploader-inputbox {
		position: relative;
		margin-bottom: 16rpx;
		box-sizing: border-box;
		background-color: #ededed;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
	}

	.sunui-img-removeicon {
		position: absolute;
		color: #fff;
		width: 40upx;
		height: 40upx;
		line-height: 40upx;
		z-index: 2;
		text-align: center;
		background-color: #E54D42;

		&.right {
			top: 0;
			right: 0;
		}
	}

	.sunui-uploader-file {
		position: relative;
		margin-right: 16rpx;
		margin-bottom: 16rpx;
	}

	.sunui-uploader-file-status:before {
		content: " ";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.sunui-loader-filecontent {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		color: #fff;
		z-index: 9;
	}

	.sunui-uploader-bd {
		padding: 0rpx;
		margin: 0rpx;
		width: 518rpx;
		float: right;
		margin-top: 10rpx;
		// margin-left: 10rpx;
	}

	.sunui-uploader-files {
		display: flex;
		flex-wrap: wrap;
	}

	.sunui-uploader-file:nth-child(4n+0) {
		// margin-right: 0;
	}

	.sunui-uploader-inputbox {
		&>view {
			text-align: center;
		}
	}

	.sunui-uploader-file-status:after {
		content: " ";
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.sunui-uploader-hover {
		box-shadow: 0 0 0 #e5e5e5;
		background: #e5e5e5;
	}
</style>
