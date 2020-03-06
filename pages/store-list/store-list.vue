<!-- 店铺列表页 -->
<template>
	<view>
		<cu-custom bgColor="kpbg-black" :isBack="true" class="text-white">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">{{stname}}优选商家</block>
		</cu-custom>

		<view v-if='!loading' class="cu-card dynamic margin-sm " :class="isCard?'no-card':'no-card'" v-for="(item,index) in getSelectStoreList.list"
		 :key="index">
			<view class="cu-item border shadow" style="border-radius: 10rpx; ">
				<view class="cu-list menu-avatar margin-xs">
					<view class="padding-xs" style="border: none;">
						<view class="cu-avatar radius lg fl" style="height: 125rpx;width: 135rpx;border-radius: 10rpx; " :style="{'background-image':'url('+(item.storeAvatar)+')'}"></view>
						<view class="content ">
							<view class="text-lg fl margin-left-xs" style="display: inline-block;width: 300rpx;" @click="register">{{item.sname}}</view>
							<view class="text-gray justify-between text-cut margin-left-xs" style="display: inline-block;width: 300rpx;">
								{{ item.description}}
							</view>
							<view class="text-orange flex margin-top-xs" style="display: inline-block;height: 30rpx; line-height: 30rpx;">
								<text class="cuIcon-location margin-left-xs fl"></text>
								<view class="text-cut  text-xs " style="display: inline-block;width: 300rpx;">{{item.address}} </view>
							</view>
							<view class="radio text-xs fr justify-center">
								<button class="cu-but text-xs text-white fr self-center" style="background-color: #FF8931;transform:translateY(-60rpx);"
								 @click="storeDetail(item.sid)">进店</button>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-item flex solid-bottom padding " style="height: 430rpx;border-top: 2rpx solid #F0F0F0">
					<view class="cu-avatar radius" style="width: 50%; height: 370rpx;" :style="{'background-image': 'url('+item.goodsList[0].coverImgpath+')'}"
					 @click="goodDetail(item.goodsList[0].gid)">
						<view class=" bg-shadeBottom padding-lr" style="position: absolute;top: 325rpx;left: -2rpx;height: 45rpx;line-height: 45rpx;width: 100%; postion">
							<text class="text-cut fl text-xs radius" style="width: 60%;">{{item.goodsList[0].gname}}</text><text class="fr text-yellow text-xs">￥{{item.goodsList[0].price}}</text>
						</view>
					</view>
					<view class="radius cu-avatar" style="width: 45%; height: 180rpx; ;position: absolute;left: 370rpx;" :style="{'background-image': 'url('+item.goodsList[1].coverImgpath+')'}"
					 @click="goodDetail(item.goodsList[1].gid)">
						<view class=" bg-shadeBottom padding-lr radius" style="position: absolute;top: 136rpx;;height: 45rpx;line-height: 45rpx;width: 100%;">
							<text class="text-cut fl text-xs" style="width: 60%;">{{item.goodsList[1].gname}}</text><text class="fr text-yellow text-xs">￥{{item.goodsList[1].price}}</text>
						</view>

					</view>
					<view class="radius self-end">
						<view class="cu-avatar radius" style="width: 45%; height: 180rpx; position: absolute;left: 370rpx;top: 220rpx;"
						 :style="{'background-image': 'url('+item.goodsList[2].coverImgpath+')'}" @click="goodDetail(item.goodsList[2].gid)">
							<view class=" bg-shadeBottom padding-lr radius" style="position: absolute;top: 136rpx;height: 45rpx;line-height: 45rpx;width: 100%;">
								<text class="text-cut fl text-xs" style="width: 60%;">{{item.goodsList[2].gname}}</text><text class="fr text-yellow text-xs">￥{{item.goodsList[2].price}}</text>
							</view>

						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getSelectStoreList
	} from '@/api/mainApi'

	export default {
		data() {
			return {
				loading: true,
				isCard: false,
				stname: '',
				stid: 0,
				form: {
					sname: ""
				},
				getSelectStoreList: {},
			};

		},
		async onLoad(option) {
			this.stname = option.stypename;
			this.stid = option.stypeid;

			//	获取店铺列表
			const storeRes = await getSelectStoreList(1, 10, this.stid);
			this.getSelectStoreList = storeRes.data.page;
			console.log(this.getSelectStoreList)

			this.loading = false;
		},
		async onPullDownRefresh() {
			const storeRes = await getSelectStoreList(1, 10, this.stid);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			IsCard(e) {
				this.isCard = e.detail.value
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},


			storeDetail(sid) {
				uni.navigateTo({
					url: `/pages/main/store-detail/store-detail?sid=${sid}`
				})
			},
			goodDetail(gid) {
				uni.navigateTo({
					url: `/pages/main/goods-detail/goods-detail?gid=${gid}`
				})
			},
			register() {
				uni.navigateTo({
					url: "/pages/register/register"
				})
			},
		}
	}
</script>

<style>

</style>
