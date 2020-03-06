<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true" ref='backbar'>
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">神秘商店活动</block>
		</cu-custom>
		<view v-if="!loading" class="bg-white margin-xs padding shadow" v-for="(item,index) in zoneList.list" :key="index"
		 @click="zoneGame(item.zoneId)">
			<view>
				<text>场次：{{item.zoneId}}</text>
				<text class="fr">状态：{{getStatus(item.status)}}</text>
			</view>
			<view class="bg-blue fr margin-top-xs margin-right " style="border-radius: 50%;width: 100rpx;padding-right: 21rpx;padding-top: 18rpx; height: 100rpx;">
				<view class="fr">加入</view>
				<view class="fr">{{item.joinPeoples}}/{{item.maxNumber}}</view>
			</view>

			<view class="padding-tb-xs">
				开始时间：{{item.createTime}}
			</view>
			<view>
				{{item.store.sname}}
			</view>
		</view>
		<view v-if="currPage===totalPage||totalPage==''">
			<tui-divider width="80%">没有更多啦</tui-divider>
		</view>
	</view>
</template>

<script>
	import tuiDivider from "@/components/divider/divider"
	import {
		getZoneList
	} from '@/api/zoneRecordApi.js'
	export default {
		components:{
			tuiDivider
		},
		data() {
			return {
				zoneList: {},
				loading: true,
				currPage:1,
				totalPage: 1,
			}
		},
		async mounted() {
			const zoneListRes = await getZoneList(1, 10);
			this.zoneList = zoneListRes.data.page;
			this.totalPage = this.zoneList.totalPage;
			this.loading = false;
		},
		//下拉刷新
		async onPullDownRefresh() {
			const zoneListRes = await getZoneList(1, 10);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载
		onReachBottom: async function() {
			// console.log('触底')
			if (this.currPage == this.totalPage) return; //
			this.currPage += 1;
			const zoneListRes = await getZoneList(1, 10);
			const loadData = zoneList.data.page;
			const list = this.zoneList.list;
			this.zoneList.list = list.concat(loadData.list)
			this.currPage = loadData.currPage;
		},
		methods: {
			zoneGame(zid) {
				uni.navigateTo({
					url: "/pages/games/zone-record/zone-record?zid=" +zid
				})
			},
			getStatus(s) {
				return s == 0 ? "未开奖" : "已开奖"
			}
		}
	}
</script>

<style>

</style>
