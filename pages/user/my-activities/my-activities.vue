<template>
	<view class="bg-white">
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">我参与的活动</block>
		</cu-custom>
		<view v-if='!loading' v-for="(item,index) in myselectOrderList.details" :key="index" @click="partyDetails(item.efid)">
			<view style="height: 280rpx;border-bottom: 1rpx solid #F1F1F1;">
				<!-- 图片 -->
				<view class="cu-avatar radius lg fl margin-top margin-lr" :style="{'background-image':'url('+item.bannerImgpath+')'}"
				 style=" height: 220rpx;width: 220rpx;border-radius: 10rpx;"></view>
				<view>
					<!-- 活动标题 -->
					<view class="fl margin-top text-xl text-black" style="font-weight: 550;width: 60%;height: 95rpx;">
						{{item.eparty.etitle}}</view>
					<!-- 时间 -->
					<view class="cuIcon-remind fl padding-top-lg">
						<text>{{item.eparty.endTime}}</text>
					</view>
					<view>
						<!-- 地点 -->
						<view class="cuIcon-location fl margin-top-xs">
							<text>{{item.eparty.store.city}}</text>
							<text>{{item.eparty.store.district}}</text>
						</view>
						<!-- 人数 -->
						<view class="cuIcon-people fl margin-top-xs margin-left">
							<text class="margin-lr-xs">已报<text class="margin-lr-xs">{{item.eparty.joinedMember}}/{{item.eparty.maxMember}}</text>人</text>
						</view>
					</view>

				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getmyselectOrderList,
		// getEpartyList
	} from "@/api/partyApi.js"
	export default {
		data() {
			return {
				loading: true,
				myselectOrderList: [],
				userData: {},
			}
		},
		mounted: async function(option) {
			//请求接口
			// const getmyFind = await getmyFinduid(1,20,this.uid);
			// console.log(getmyFind)
			// this.getmyFind = getmyFind.data.data.findUser;
			// console.log(this.getmyFind)

			//获取用户信息
			let USERDATA = uni.getStorageSync("USERDATA");
			if (USERDATA) {
				console.log("用户已登录")
				this.userData = USERDATA;
				// console.log(this.userData)
			}

			this.loading = false;


			const myselectOrderList = await getmyselectOrderList(1, 10, this.userData.uid, 1);
			console.log(myselectOrderList)
			this.myselectOrderList = myselectOrderList.data.page.list
		},
		async onPullDownRefresh() {
			const myselectOrderList = await getmyselectOrderList(1, 10, this.userData.uid, 1);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			partyDetails(efid) {
				uni.navigateTo({
					url: "/pages/party/party-details/party-details?=efid" + efid
				})
			}
		}
	}
</script>

<style>

</style>
