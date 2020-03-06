<template>
	<view class="text-center">
		<view class="cu-btn round line-orange " style="height:300rpx;width: 300rpx; margin-top: 100rpx;"  @click="scanCode()"> <text class="cuIcon-scan"></text> 开始扫描</view >
	</view>
</template>

<script>
	export default {
		data() {
			return {
		
			}
		},
		onLoad() {
			
		},
		methods: {
			scanCode(){
				uni.scanCode({
				    onlyFromCamera: true,
					scanType:"qrCode",
				    success: function (result) {
						console.log(result)
				      
				    },
					fail() {
						console.log("订单核销二维码扫描失败，请重试");
					}
				});
			}
		}
	}
	
</script>

<style>
</style>
