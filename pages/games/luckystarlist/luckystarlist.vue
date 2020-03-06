<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true" ref='backbar'>
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">幸运之星列表</block>
		</cu-custom>
		<view v-if="!loading" class="bg-white margin-xs padding shadow" v-for="(item,index) in luckylistres" :key="index">
			<view class="">
				<text>编号：{{item.luckystarId}}</text>
				<text class="fr margin-right">状态：{{getStatus(item.status)}}</text>
			</view>
			<view class="bg-blue fr margin-top-xs margin-right" style="border-radius: 50%;width: 100rpx;padding-right: 21rpx;padding-top: 18rpx; height: 100rpx;"
			 @click="lucky(item.luckystarId)">
				<view class="fr ">加入</view>
				<view class="fr">{{item.joinPeoples}}/{{item.maxNumber}}</view>
			</view>
			<view class="padding-tb-xs">
				开始时间：{{item.createTime}}
			</view>

			<view>
				酒吧：{{item.sname}}
			</view>
		</view>

	</view>
</template>

<script>
	import {
		luckylist,
		// selectLucky
	} from '@/api/gameApi.js'
	export default {
		data() {
			return {
				loading: true,
				luckylistres: {},
				// selectLuckyres:{},
			}
		},
		mounted: async function() {
			// 列表
			const luckylistres = await luckylist(1, 10);
			console.log(luckylistres)
			this.luckylistres = luckylistres.data.page.list;

			// const selectLuckyres = await selectLucky(1, 20);
			// console.log(selectLuckyres)
			// this.selectLuckyres = selectLuckyres.data.page.list;
			this.loading = false;
		},
		methods: {
			lucky(luckystarId) {
				uni.navigateTo({
					url: '/pages/games/luckystarlist/luckystar?luckystarId=' + luckystarId
					// url: '/pages/buyvip'
				})
				// url:'/pages/games/luckystarlist/luckystar'
			},
			getStatus(s) {
				if (s == 0) {
					return "未开奖"
				} else if (s == 1){
					return "已开奖"
				}
			},

		}
	}
</script>

<style>

</style>
