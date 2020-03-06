<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">
				<view>{{stypename}}</view>
			</block>
		</cu-custom>

		<view v-if='!loading' class="cu-card article margin-top-xs">
			<view class="cu-item padding-top " style="margin:4rpx 30rpx;border-radius:20rpx ;" :style="{'background-color':cssStyle.backgroundColor} "
			 v-for="(item,index) in getSelectStoreList.list" :key="index" @click="NavigateToStoreDetail(item.gid)">
				<view class="content ">
					<image :src="item.storeAvatar" mode="aspectFill"></image>
					<view class="desc">
						<view>
							<text class="text-lg"> {{item.sname}}</text>
							<text class="text-orange fr xs  radius text-xs padding-left-xs padding-right-xs" style="border: 1rpx solid orange;border-radius:25rpx 0 0 25rpx">{{item.tag}}</text>
							<view class=" text-xs flex-wrap kp-goods-name"> {{item.description}}</view>
						</view>
						<view>
							<tui-rate :current="item.score" normal="#ccc" active="#ff7900" :size="12" />
						</view>

						<view class="cu-capsule radius margin-bottom-xs text-sm">
							<view class='sm'>
								<text class='cuIcon-locationfill text-blue'></text>
								{{item.city}}{{item.district}}
							</view>
							<!-- <view class='sm' style="padding-left:6rpx">
								{{item.tag}}
							</view> -->

						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="currPage===totalPage||totalPage==''">
			<tui-divider width="80%">没有更多啦</tui-divider>
		</view>

	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	import tuiRate from '@/components/rate/rate.vue'
	import tuiDivider from "@/components/divider/divider"
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import tuiNomore from "@/components/nomore/nomore"

	import {
		getSelectStoreList
	} from '@/api/mainApi'

	export default {
		components: {
			tuiRate,
			tuiIcon,
			tuiDivider,
		},

		data() {
			return {
				loading: true,
				stypename: '',
				stypeid: 0,
				currPage: 1,
				getSelectStoreList: {},
				totalPage: 0,
				cssStyle: {
					backgroundColor: '#fff',
				},

			}
		},
		onLoad(option) {
			this.stypename = JSON.parse(option.pageObj).stypename;
			this.stypeid = JSON.parse(option.pageObj).stypeid;
			this.currPage = JSON.parse(option.pageObj).currPage;
		},
		mounted: async function(options) {
			//店铺列表
			const storeRes = await getSelectStoreList(this.currPage, 5, this.stypeid);
			this.getSelectStoreList = storeRes.data.page;

			// 获取店铺列表总页
			this.totalPage = this.getSelectStoreList.totalPage;

			this, loading = false;
		},

		onReachBottom: async function() {
			// console.log('触底')
			if (this.currPage == this.totalPage) return; //
			this.currPage += 1;
			const storeRes = await getSelectStoreList(this.currPage, 5, this.stypeid);
			const loadData = storeRes.data.page;
			const list = this.getSelectStoreList.list;
			this.getSelectStoreList.list = list.concat(loadData.list)
			this.currPage = loadData.currPage;

			console.log(this.getSelectStoreList)
		},

		async onPullDownRefresh() {
			const storeRes = await getSelectStoreList(this.currPage, 5, this.stypeid);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		// async onPullDownRefresh() {

		// 	//获取当前页 
		// 	this.currPage = this.getSelectStoreList.currPage;

		// 	const storeRes = await getSelectStoreList(currPage + 1, 5, this.stypeid);
		// 	this.getSelectStoreList = storeRes.data.page;
		// 	// console.log(this.getSelectStoreList)


		// },
		methods: {
			NavigateToStoreDetail(sid) {
				uni.navigateTo({
					url: '/pages/main/store-detail/store-detail?sid=' + sid,

				});
			},
		}
	}
</script>

<style>
	.container {
		padding-top: 120upx;
	}

	.tui-notice-board {
		width: 100%;
		padding-right: 30upx;
		box-sizing: border-box;
		font-size: 28upx;
		height: 60upx;
		background: #fff8d5;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		z-index: 999;
	}

	.tui-icon-bg {
		background: #fff8d5;
		padding-left: 30upx;
		position: relative;
		z-index: 10;
	}

	.tui-icon-class {
		margin-right: 12upx;
	}

	.tui-scorll-view {
		flex: 1;
		line-height: 1;
		white-space: nowrap;
		overflow: hidden;
		color: #f54f46;
	}

	.tui-notice {
		transform: translateX(100%);
	}

	.tui-animation {
		-webkit-animation: tui-rolling 12s linear infinite;
		animation: tui-rolling 12s linear infinite;
	}

	@-webkit-keyframes tui-rolling {
		0% {
			transform: translateX(100%);
		}

		100% {
			transform: translateX(-170%);
		}
	}

	@keyframes tui-rolling {
		0% {
			transform: translateX(100%);
		}

		100% {
			transform: translateX(-170%);
		}
	}

	.tui-subject {
		padding: 100upx 30upx 30upx 30upx;
		box-sizing: border-box;
		font-size: 32upx;
		font-weight: bold;
	}

	.tui-rolling-news {
		width: 100%;
		padding: 12upx 30upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
	}

	.tui-swiper {
		font-size: 28upx;
		height: 50upx;
		flex: 1;
	}

	.tui-swiper-item {
		display: flex;
		align-items: center
	}

	.tui-news-item {
		height: 30upx;
		line-height: 30upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-searchbox {
		padding: 60upx 80upx;
		box-sizing: border-box;
	}

	.tui-rolling-search {
		width: 100%;
		height: 70upx;
		border-radius: 35upx;
		padding: 0 40upx 0 30upx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
		color: #999;
	}

	.tui-divider-text {
		background-color: transparent !important;
	}

	.kp-goods-name {
		padding-right: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-height: 1.5;
	}
</style>
