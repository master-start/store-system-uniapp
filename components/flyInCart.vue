 <!-- uni兼职开发加qq1844014810  -->
<template>
	<view class="relative">
		<view  class="ball" v-for="(d,i) in balls" :key="i" :style=" d.inited ? 'transition: transform .4s cubic-bezier(.6,-0.63,.94,.71); transform: translate3d(0, ' + offsetY + 'px,0); top: ' + ballY + 'px;' : '' ">
			<view class="inner arbg" :style="d.inited ? 'transition: transform .4s linear; transform: translate3d( ' + offsetX + 'px,0,0); left: ' + ballX + 'px; opacity: 1;' : '' "></view>
		</view>
	</view>
</template>
 
<script>
	export default {
		props:{
			cartBasketRect:Object,// 购物车篮的rect信息
		},
		 data() { 
		  	return {
				offsetX: 0,
				offsetY: 0,
				ballX: 0,
				ballY: 0,
				balls: {},
				//避免抖动
				lastEvent:'',
				lastId:''
			}
		  },
		  created() {
			  	let balls = [];
			  	for (let i = 0; i < 5; i++) {
			  		balls.push({ inited: false });
			  	}
				this.balls = balls
		  },
		  methods:{
			  getBalls() {
			  	return balls;
			  },
			  addToCart (e,id) {
				if(!id){
				  this.lastId  = ''
				  return
				}

				const self = this
				if(this.lastId == id){
				  e = this.lastEvent
				}else{
				  this.lastId  = id
				  this.lastEvent = e
				}
				//((res.width + that.ballWidth ) / 2  - that.ballWidth);
				let ballX = e.left
				let	ballY = e.top
				this.offsetX = -Math.abs(this.cartBasketRect.left - ballX + 10)
				this.offsetY = Math.abs(this.cartBasketRect.top - ballY +(this.cartBasketRect.height/1.5))
				this.ballX = ballX
				this.ballY = ballY
					
				
				for (let i = 0; i < 5; i++) {
					if (!this.balls[i].inited) {
						this.balls[i].inited = true
							setTimeout(() => {
								self.balls[i].inited= false
							}, 500);
						break;
					}
				}
			  }
		  }
		  
		  
	}
</script>

 
<style scoped>
.ball {
	position: fixed;
	z-index:99999;
}
.ball .inner {
	background: #ff5722;
	width: 15px;
	height: 15px;
	position: fixed;
	border-radius: 50%;
	opacity: 0;
}
</style> 