<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">限时抢购</block>
		</cu-custom>

		<view class="tui-spike-box">
			<view class="tui-pro-item list-item" hover-class="hover" :hover-start-time="150" v-for="(item,index) in LimitList"
			 :key="index" @click="deteil(item.gid)">
				<image :src=" item.goods.coverImgpath " class="tui-pro-img" mode="widthFix" />
				<view class="tui-pro-content">
					<view class="tui-pro-tit">{{item.goods.gname}}</view>
					<template v-if="item.quantity > 0">
						<view class="cu-progress round margin-top-xs margin-bottom-xs sm" style="font-size: 10rpx;">
							<view class="bg-red fl" style="font-size: 17rpx;" :style="[{ width:loading? item.percent+ '%' :''}]">{{item.percent}}%</view>
						</view>
					</template>
					<template v-else>
						<text class="text-red">已买完</text>
					</template>
					<view class="tui-pro-btmbox">
						<view class="tui-pro-price">
							<text class="tui-sale-price">￥{{item.price}}</text>
						</view>

						<view class="tui-countdown">
							<template v-if="item.leftTime > 0">
								<view class="tui-countdown-text">剩余</view>
								<tui-countdown class="countdown" :time="item.leftTime" :days="true" :width="27" :isColon="false" color="#e41f19"
								 bcolor="transparent" colonColor="#e41f19" :size="30" :scale="true"></tui-countdown>
								<view class="tui-countdown-text">结束</view>
							</template>
							<template v-else>已结束</template>
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
	import {
		getLimitList
	} from "@/api/limit.js";
	import tuiCountdown from "@/components/countdown/countdown";
	const splitDate = date => {
		const dt = date.split(/\s/);
		if (!dt || !dt.length) return [];
		const dates = dt[0].split(/\-/g).map(d => +d);
		let times = [];
		if (dt[1]) {
			times = dt[1].split(/\:/g).map(t => +t);
		}
		return dates.concat(times);
	};
	import tuiDivider from "@/components/divider/divider"
	export default {
		components: {
			tuiCountdown,
			tuiDivider,
		},
		data() {
			return {
				loading: true,
				LimitList: [],
				currPage:1,
				totalPage: 1,
			};
		},
		onLoad: function(options) {
			let that = this;
			setTimeout(function() {
				that.loading = true;
			}, 500);
		},
		
		mounted: async function() {
			const res = await getLimitList(1, 10);
			let LimitList = res.data.page.list;
			//百分比
			LimitList = LimitList.map(limit => {
				const nowTime = Date.now();
				const dateArr = splitDate(limit.endTime);
				const leftTime = new Date(...dateArr).getTime() - nowTime;
				limit.leftTime = leftTime / 1000;
				const soldCount = limit.maxQuantity - limit.quantity;
				limit.soldCount = soldCount;
				limit.percent = (((soldCount / limit.maxQuantity).toFixed(2)) * 100)
				return limit;
			});
			this.LimitList = LimitList;
			this.res = res.data.page; //加载更多
			this.totalPage = this.res.totalPage;
		},
		//下拉刷新
		async onPullDownRefresh() {
			const res = await getLimitList(1, 10);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000)
		},
		// 上拉加载
		onReachBottom: async function() {
			// console.log('触底')
			if (this.currPage == this.totalPage) return; //
			this.currPage += 1;
			const res = await getLimitList(1, 10);
			const loadData = res.data.page;
			const list = this.res.list;
			this.res.list = list.concat(loadData.list)
			this.currPage = loadData.currPage;
		},
		methods: {
			// change: function(e) {
			// 	this.current = e.detail.current
			// },
			more: function(e) {
				let key = e.currentTarget.dataset.key || "";
				uni.navigateTo({
					url: "../productList/productList?searchKey=" + key
				});
			},
			deteil: function(gid) {
				uni.navigateTo({
					url: "/pages/main/goods-detail/goods-detail?gid=" + gid
				});
			}
		}
	};
</script>

<style>
	.cu-progress {
		width: 90%;
	}

	.tui-pro-item {
		display: flex;
		width: 100%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		position: relative;
		margin-bottom: 10rpx;
		padding: 20rpx;
	}

	.tui-pro-item::after {
		left: 240rpx;
	}

	.tui-pro-img {
		width: 220rpx;
		height: 220rpx;
		display: block;
		flex-shrink: 0;
		border-radius: 12rpx;
	}

	.tui-pro-content {
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		box-sizing: border-box;
		padding: 20rpx;
	}

	.tui-pro-tit {
		color: #2e2e2e;
		font-size: 26rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-pro-btmbox {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-sale-price {
		font-size: 34rpx;
		font-weight: 500;
		color: #e41f19;
	}

	.tui-factory-price {
		font-size: 24rpx;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
	}

	.tui-countdown {
		display: flex;
		align-items: center;
		margin-top: 10rpx;
	}

	.tui-countdown-text {
		padding: 0 5rpx;
		font-size: 24rpx;
		line-height: 24rpx;
		color: #555;
	}

	.countdown {
		margin: 0 4rpx;
	}

	/*spike*/
</style>
