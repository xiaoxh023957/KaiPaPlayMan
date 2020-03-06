<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">需求详情</block>
		</cu-custom>

		<block  v-if='!loading' v-for="(item,index) in mydemand" :key="index">
			<view class="container bg-white">
				<view class="text-xm padding-top margin-lr-xs">
					<text class="text-xl text-bold">{{item.title}}</text>
					<text class="text-gray" style="float: right;">{{item.createTime}}</text>
				</view>
				<view class="uni-padding-wrap">
					<view class="uni-common-mt" style="background:#FFF; padding:30rpx;">
						<rich-text :nodes="item.content"></rich-text>
					</view>
				</view>
			</view>
			
		</block>
		
	</view>
</template>

<script>
	import {getmydemand} from "@/api/demand.js"
	export default {
		data() {
			return {
				loading:true,
				mydemand:{},
				// strings: '',
			}
		},
		async onPullDownRefresh() {
			const mydemand = await getmydemand(this.did);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		async onLoad (option){
			this.did = option.did
		},
		mounted: async function() {
			const mydemand = await getmydemand(this.did);
			// console.log(mydemand)
			this.mydemand = mydemand.data.DemandService;
			// console.log(this.mydemand)

			this.loading = false;
		},
		
		
		
		}
</script>

<style>

</style>
	