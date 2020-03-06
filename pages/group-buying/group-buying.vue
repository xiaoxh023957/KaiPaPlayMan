<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true" ref='backbar'>
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">我的团购</block>
		</cu-custom>
		<view class="container">
			<view class="tui-order-item" v-for="(item,index) in selectMyGroup" :key="index">
				<tui-list-cell :hover="false" :lineLeft="false">
					<view class="tui-goods-title">
						<view class="cuIcon-home">
							<text class="margin-left-xs">{{item.store.sname}}</text>
						</view>
					</view>
				</tui-list-cell>
				<tui-list-cell padding="0">
					<view class="tui-goods-item" @click="detail(item.gid)">
						<image :src="item.goods.coverImgpath" class="tui-goods-img"></image>
						<view class="tui-goods-center">
							<view class="tui-goods-name">{{item.goods.gname}}</view>
							<view class="tui-goods-attr">{{item.goods.goodsPrice}}</view>
						</view>
						<view class="tui-price-right">
							<view>{{item.goodsSpecs.gsname}}</view>
						</view>
					</view>
				</tui-list-cell>

				<tui-list-cell :hover="false" :lineLeft="false">
					<view class="tui-goods-title">
						<view>
							<text class="margin-right-xs">{{item.joinPeople}}/{{item.maxPeople}}</text>
							<text class="text-yellow">{{item.status}}</text>
						</view>
						<view>时间至: {{item.expireTime}}</text>
						</view>
					</view>
				</tui-list-cell>
			</view>
		</view>

	</view>
</template>

<script>
	import {
		getselectMyGroup
	} from '@/api/group-buying.js'
	import tuiListCell from "@/components/list-cell/list-cell"
	export default {
		components: {
			tuiListCell,
		},
		data() {
			return {
				uid: 1,
				gid: 1,
				selectMyGroup: {},
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big81005.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big25002.jpg',
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big91012.jpg',
				],
			}
		},
		mounted: async function() {
			// 列表
			const selectMyGroup = await getselectMyGroup(this.uid);
			this.selectMyGroup = selectMyGroup.data.myGroup;
			console.log(this.selectMyGroup)

			this.loading = false;
		},
		async onPullDownRefresh() {
			const selectMyGroup = await getselectMyGroup(this.uid);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		// //下拉刷新
		// async onPullDownRefresh() {
		// 	const zoneListRes = await getZoneList(1, 10);
		// 	setTimeout(function() {
		// 		uni.stopPullDownRefresh();
		// 	}, 1000);
		// },
		// //上拉加载
		// onReachBottom: async function() {
		// 	// console.log('触底')
		// 	if (this.currPage == this.totalPage) return; //
		// 	this.currPage += 1;
		// 	const zoneListRes = await getZoneList(1, 10);
		// 	const loadData = zoneList.data.page;
		// 	const list = this.zoneList.list;
		// 	this.zoneList.list = list.concat(loadData.list)
		// 	this.currPage = loadData.currPage;
		// },
		methods: {
			detail(gid) {
				uni.navigateTo({
					url: "/pages/main/goods-detail/goods-detail?gid=" + gid,
				})
			},

		}
	}
</script>

<style>
	.cu-avatar-group {
		padding-left: 25rpx;
	}

	.cu-avatar {
		margin-top: -20rpx;
	}

	.poeple {
		margin-right: -140rpx;
	}

	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-order-list {
		margin-top: 80rpx;
	}

	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-order-status {
		color: #888;
		font-size: 26rpx;
	}

	.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-goods-center {
		flex: 1;
		padding: 20rpx 8rpx;
		box-sizing: border-box;
	}

	.tui-goods-name {
		max-width: 310rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tui-goods-attr {
		font-size: 22rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-price-right {
		text-align: right;
		font-size: 24rpx;
		color: #888888;
		line-height: 30rpx;
		padding-top: 20rpx;
	}

	.tui-color-red {
		color: #E41F19;
		padding-right: 30rpx;
	}

	.tui-goods-price {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		font-size: 24rpx;
	}

	.tui-size-24 {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-price-large {
		font-size: 32rpx;
		line-height: 30rpx;
		font-weight: 500;
	}

	.tui-order-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: #fff;
		padding: 10rpx 30rpx 20rpx;
		box-sizing: border-box;
	}

	.tui-btn-ml {
		margin-left: 20rpx;
	}
</style>
