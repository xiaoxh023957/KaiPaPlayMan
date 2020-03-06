<template> 
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">预告列表</block>
		</cu-custom>
		<view class="bg-white padding ">
			<view class="padding-xs grid col-2" >
				<image class="margin-right-xs" src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1017486331,1394773415&fm=26&gp=0.jpg" style="width: 48%;height: 250rpx;" ></image>
				<image src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1017486331,1394773415&fm=26&gp=0.jpg" style="width: 48%;height: 250rpx;"></image>
			</view>
		</view>
		
		<tui-card :full="true" v-for="(item,index) in 10"  :key="index"  @click="detail(1)">
			<template v-slot:body>
				<view class="tui-default text-lg">
					文章标题文章标题文章标题文章标题文章标题文章标题文章标题
				</view>
			</template>
			<template v-slot:footer>
				<view class="tui-default text-gray">
					10:30
				</view>
			</template>
		</tui-card>
	</view>
</template>

<script>
	import tuiCard from "@/components/card/card"
	import{ getEpartyForecastDetail } from "@/api/partyApi.js"
	export default {
		components: {
			tuiCard
		},
		data() {
			return {
			
				card: [{
						header: {
							bgcolor: "#F7F7F7",
							line: true
						}
					},
					{
						header: {
							line: true
						}
					}
				]
			}
		},
	
		
		methods: {
			detail(fid) {
				uni.navigateTo({
					url: "/pages/party/foreshow/detail/detail?fid=" + fid
				})
			},
		}
	}
</script>

<style>
	.tui-default {
 	padding: 20upx 30upx;
 }
</style>
