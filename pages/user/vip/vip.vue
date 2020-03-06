<template>
	<view>		
		
		<view class="crd">
			<view style="color:white;margin-left: 35rpx;">
				<text class="cuIcon-back"></text>
				<text @click="win()">返回</text>
			</view>
			<view class="text-white crd-hone crd-all">
				您好，***
			</view>
			<view class="text-gray crd-all margin-top-lg">
				<text class="margin-right-xl padding-right-xl">佣金:<text class="text-green">299</text></text>
				<text class="padding-left-xl padding-right-xl">推广人数:<text class="text-green">89</text></text>
			</view>
		</view>
		<view class=" fillet"></view>
		<view class="wih">
			<view class="img-code">
				二维码
			</view>
			<view class="padding flex flex-wrap justify-between align-center bg-white ">
				<view class="cu-btn round bg-gray  padding-lg margin-left-xl lg">保存二维码</view>
				<view class="cu-btn round  bg-gray padding-lg margin-right-xl lg" >续费年卡</view>
			</view>
		</view>
			<view class="last">
				<text class="text-sm text-gray ">推广用户</text>
				<view class="cu-list menu-avatar margin-tb-lg">
					<view class="cu-item" v-for="(item,index) in 4" :key="index">
						<view class="cu-avatar round lg" :style="[{backgroundImage:'url(https://ossweb-img.qq.com/images/lol/web201310/skin/big2100'+ (index+2) +'.jpg)'}]"></view>
						<view class="content">
							<view class="text-grey">文晓港</view>
						</view>
						<view class="action">
							<view class="text-grey text-xs">22:20</view>
						</view>
					</view>
				</view>
		</view>
		<view class="container foot">
			<tui-divider>已经到底部了</tui-divider>
		</view>
	</view>
</template>

<script>
	import tuiCard from "@/components/card/card"
	import tuiDivider from "@/components/divider/divider"
	export default {
		components: {
			tuiCard,
			tuiDivider
		},
		data() {
			return {

			}
		},
		methods: {
			win() {
				uni.navigateTo({
					url: "/pages/user/user"
				})
			},
		},
	}
</script>

<style>
	.crd {
		height: 440rpx;
		background-color: #3D435D;
		padding-top:45rpx
	}
		
	.fillet {
		height: 300rpx;
		width: 100%;
		border-radius: 100% ;
		background-color: #3D435D;		
		position: relative;
		top: -150rpx;	
			
	}
	.wih {
	  height: 480rpx;
	  width: 650rpx;
	  background-color: #FFFFFF;
	  position: relative;
	  top: -405rpx;
	  left: 56rpx;
	}
	.crd-all {
		position: relative;
		top: 70rpx;
		left: 90rpx;
	}
	.crd-hone {		
		font-size: 50rpx;		
	}
	.img-code {
		background-color: pink;
	  	height: 350rpx;
	}
	.last {	
		width: 650rpx;
		position: relative;
		top: -370rpx;
		left: 50rpx;		
	}
	.container {
		padding-bottom: 100rpx;
		box-sizing: border-box;
	}
	.foot {
		position: relative;
		top: -400rpx;
	}
</style>
