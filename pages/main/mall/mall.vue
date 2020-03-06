<template>
	<view class="container">

		<cu-custom bgColor="kpbg-black" :isBack="true" class="text-white">
			<block slot="backText">返回</block>
			<block slot="content">
				<view>100购物</view>
			</block>
		</cu-custom>

		<view class="tui-header">
			<view class="tui-rolling-search">
				<!-- #ifdef APP-PLUS || MP -->
				<icon type="search" :size='13' color='#999'></icon>
				<!-- #endif -->
				<!-- #ifdef H5 -->
				<view>
					<tui-icon name="search" :size='16' color='#999'></tui-icon>
				</view>
				<!-- #endif -->
				<!-- 搜索 -->
				<swiper vertical autoplay circular interval="8000" class="tui-swiper">
					<swiper-item v-for="(item,index) in hotSearch" :key="index" class="tui-swiper-item" @tap="search">
						<view class="tui-hot-item">{{item}}</view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 顶部商品分类 -->
		<view class="tui-product-category">
			<view class="tui-category-item" v-for="(item,index) in goodsTypeList" :key="index" :data-key="item.gtypeName" @tap="more">
				<image :src="item.iconImgpath" class="tui-category-img" mode="scaleToFill"></image>
				<view class="tui-category-name margin-top-xs">{{item.gtypeName}}</view>
			</view>
		</view>

		<view class="tui-product-box">
			<view class="tui-group-name">
				<text>热门推荐</text>
			</view>
			<view class="tui-product-list">
				<view class="tui-product-container">
					<block v-for="(item,index) in selectListmall.list" :key="index" v-if="(index+1)%2!=0">
						<!--商品列表-->
						<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail(item.gid)">
							<image :src="item.coverImgpath" class="tui-pro-img" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{item.gname}}</view>
								<view>
									<view class="tui-pro-price">
										<text class="tui-sale-price">￥{{item.price}}</text>
										<!-- <text class="tui-factory-price">￥{{item.factory}}</text> -->
									</view>
								</view>
							</view>
						</view>
						<!--商品列表-->
					</block>
				</view>
				<view class="tui-product-container">
					<block v-for="(item,index) in selectListmall.list" :key="index" v-if="(index+1)%2==0">
						<!--商品列表-->
						<view class="tui-pro-item" hover-class="hover" :hover-start-time="150" @tap="detail(item.gid)">
							<image :src=" item.coverImgpath" class="tui-pro-img" mode="widthFix" />
							<view class="tui-pro-content">
								<view class="tui-pro-tit">{{item.gname}}</view>
								<view>
									<view class="tui-pro-price">
										<text class="tui-sale-price">￥{{item.price}}</text>
										<!-- <text class="tui-factory-price">￥{{item.factory}}</text> -->
									</view>
								</view>
							</view>
						</view>
						<!--商品列表-->
					</block>
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
		getselectListmall,
		getGoodsTypeList
	} from "@/api/mallApi.js"
	import tuiIcon from "@/components/icon/icon"
	import tuiTag from "@/components/tag/tag"
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import tuiNomore from "@/components/nomore/nomore"
	import tuiDivider from "@/components/divider/divider"
	export default {
		components: {
			tuiDivider,
			tuiIcon,
			tuiTag,
			tuiLoadmore,
			tuiNomore
		},
		data() {
			return {
				selectListmall: {},
				goodsTypeList: {},
				current: 0,
				hotSearch: [
					"休闲零食",
					"自热火锅",
					"小冰箱迷你"
				],
				category: [{
					img: "item.iconImgpath",
					name: "gtypeName"
				}],
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				currPage:1,
				totalPage: 1,
			}
		},
		mounted: async function() {
			this.getList()
			const goodsTypeList = await getGoodsTypeList(1, 10, 2);
			this.goodsTypeList = goodsTypeList.data.page.list
		},
		//下拉刷新
		async onPullDownRefresh() {
			const goodsTypeList = await getGoodsTypeList(1, 10, 2);
			const selectListmall = await getselectListmall(1, 10, 2);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载
		onReachBottom: async function() {
			// console.log('触底')
			if (this.currPage == this.totalPage) return; //
			this.currPage += 1;
			const selectListmall = await getselectListmall(this.currPage, 10, 2);
			const loadData = selectListmall.data.page;
			const list = this.selectListmall.list;
			this.selectListmall.list = list.concat(loadData.list)
			this.currPage = loadData.currPage;
		},
		methods: {
			async getList() {
				const selectListmall = await getselectListmall(1, 10, 2);
				this.selectListmall = selectListmall.data.page;
				this.totalPage = this.selectListmall.totalPage;
			},
			tabbarSwitch: function(e) {
				let index = e.currentTarget.dataset.index;
				this.current = index;
				if (index != 0) {
					if (index == 1) {
						this.classify();
					} else if (index == 2) {
						uni.navigateTo({
							url: '../mall-extend/shopcart/shopcart'
						})
					} else {
						uni.navigateTo({
							url: '../mall-extend/my/my'
						})
					}
				}
			},
			detail(gid) {
				uni.navigateTo({
					url: `/pages/main/goods-detail/goods-detail?gid=${gid}`
				})
			},
			classify: function() {
				// uni.navigateTo({
				// 	url: '/pages/navbar-2/navbar-2'
				// })

			},
			more: function(e) {
				let key = e.currentTarget.dataset.key || "";
				uni.navigateTo({
					url: '../productList/productList?searchKey=' + key
				})

			},
			search: function() {
				uni.navigateTo({
					url: '../news-search/news-search'
				})
			}
		},
	}
</script>

<style>
	page {
		background: #f7f7f7;
	}

	.container {
		padding-bottom: 100rpx;
		color: #333;
	}

	.tui-header {
		width: 100%;
		height: 100rpx;
		padding: 0 30rpx 0 20rpx;
		box-sizing: border-box;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: space-between;
		position: fixed;
		left: 0;
		top: 0;
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		z-index: 999;
	}

	.tui-rolling-search {
		width: 100%;
		height: 60rpx;
		border-radius: 35rpx;
		padding: 0 40rpx 0 30rpx;
		box-sizing: border-box;
		background: #f1f1f1;
		display: flex;
		align-items: center;
		flex-wrap: nowrap;
		border: 2rpx solid grey;

	}

	.tui-category {
		font-size: 24rpx;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin: 0;
		margin-right: 22rpx;
		flex-shrink: 0;
	}

	.tui-category-scale {
		transform: scale(0.7);
		line-height: 24rpx;
	}

	.tui-icon-category {
		line-height: 20px !important;
		margin-bottom: 0 !important;
	}

	.tui-swiper {
		font-size: 26rpx;
		height: 60rpx;
		flex: 1;
		padding-left: 12rpx;
	}

	.tui-swiper-item {
		display: flex;
		align-items: center;
	}

	.tui-hot-item {
		line-height: 26rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		color: grey;

	}

	.tui-header-banner {
		padding-top: 100rpx;
		box-sizing: border-box;
		background: #e41f19;
	}

	.tui-hot-search {
		color: #fff;
		font-size: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: relative;
		z-index: 2;
	}

	.tui-hot-tag {
		background: rgba(255, 255, 255, 0.15);
		padding: 10rpx 24rpx;
		border-radius: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		line-height: 24rpx;
		/* margin-left: 20rpx; */
	}

	.tui-banner-bg {
		display: flex;
		height: 180rpx;
		background: #e41f19;
		position: relative;
	}

	.tui-primary-bg {
		width: 50%;
		display: inline-block;
		height: 224rpx;
		border: 1px solid transparent;
		position: relative;
		z-index: 1;
		background: #e41f19;
	}

	.tui-route-left {
		transform: skewY(8deg);
	}

	.tui-route-right {
		transform: skewY(-8deg);
	}

	.tui-product-category {
		background: #fff;
		padding: 80rpx 20rpx 30rpx 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		font-size: 24rpx;
		color: #555;
		margin-bottom: 20rpx;
	}

	.tui-category-item {
		width: 20%;
		height: 118rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-direction: column;
		padding-top: 30rpx;
	}

	.tui-category-img {
		height: 80rpx;
		width: 80rpx;
		display: block;
	}

	.tui-category-name {
		line-height: 24rpx;
	}

	.tui-product-box {
		margin-top: 20rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
	}

	.tui-pb-20 {
		padding-bottom: 20rpx;
	}

	.tui-bg-white {
		background: #fff;
	}

	.tui-group-name {
		font-size: 32rpx;
		font-weight: bold;
		text-align: center;
		padding: 24rpx 0;
	}

	.tui-activity-box {
		display: flex;
		border-radius: 12rpx;
		overflow: hidden;
	}

	.tui-activity-img {
		width: 50%;
		display: block;
	}

	.tui-new-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.tui-new-item {
		width: 49%;
		height: 200rpx;
		padding: 0 20rpx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		background: #f5f2f9;
		position: relative;
		border-radius: 12rpx;
	}

	.tui-new-mtop {
		margin-top: 2%;
	}

	.tui-title-box {
		font-size: 24rpx;
	}

	.tui-new-title {
		line-height: 32rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-new-price {
		padding-top: 18rpx;
	}

	.tui-new-present {
		color: #ff201f;
		font-weight: bold;
	}

	.tui-new-original {
		display: inline-block;
		color: #a0a0a0;
		text-decoration: line-through;
		padding-left: 12rpx;
		transform: scale(0.8);
		transform-origin: center center;
	}

	.tui-new-img {
		width: 160rpx;
		height: 160rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-new-label {
		width: 56rpx;
		height: 56rpx;
		border-top-left-radius: 12rpx;
		position: absolute;
		left: 0;
		top: 0;
	}

	.tui-product-list {
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
		box-sizing: border-box;
		/* padding-top: 20rpx; */
	}

	.tui-product-container {
		flex: 1;
		margin-right: 2%;
	}

	.tui-product-container:last-child {
		margin-right: 0;
	}

	.tui-pro-item {
		width: 100%;
		margin-bottom: 4%;
		background: #fff;
		box-sizing: border-box;
		border-radius: 12rpx;
		overflow: hidden;
	}

	.tui-pro-img {
		width: 100%;
		display: block;
	}

	.tui-pro-content {
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

	.tui-pro-price {
		padding-top: 18rpx;
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

	.tui-pro-pay {
		padding-top: 10rpx;
		font-size: 24rpx;
		color: #656565;
	}
</style>
