<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white"> 关于</block>
		</cu-custom>
		<view class="bg-white margin-bottom-xl">
			<view style="width: 100%;text-align: center;">
				<view class="cu-avatar margin-tb-lg" style="height: 250rpx;width: 250rpx;background-image:url('../../../static/logo(2).png');"></view>
			</view>
			<view class="cu-list menu  card-menu margin-top "  >
				<view class="cu-item arrow ">
					<view class="content" >
						<text >使用帮助</text>
					</view>
				</view>
				<view class="cu-item arrow ">
					<view class="content" >
						<text >特别声明</text>
					</view>
				</view>
				<view class="cu-item arrow ">
					<view class="content" >
						<text>隐私政策</text>
					</view>
				</view>
			</view>
			
		</view>
		
		<view style="margin-top:200rpx;">
			<view class="text-gray" style="margin:0 auto;text-align: center;">开趴App</view>
			<view class="text-gray" style="margin:0 auto;text-align: center;">长沙轻翼网络科技有限公司承接</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
