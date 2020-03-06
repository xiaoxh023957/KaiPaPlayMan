<template>
	<view class="container" @click="showCar=false" v-if='!loading'>
		<!-- 头部 -->
		<view class="cu-item padding-lg kpbg" style=" background-size: 100%;" :style="{'height':236+statusBarHeight+'px', 'padding-top':45+statusBarHeight+'px','background' : 'url('+storeData.storeAvatar+')'}">

			<view class="backBar " @click="NavigateToMian" :style="{'top': 25+statusBarHeight+'px'}">
				<text class="cuIcon-back"></text>
				<text>返回</text>
			</view>

			<view class="kp-drag padding-lr " style="width: 100%;" :style="{'padding-top':25+statusBarHeight+'px'}" v-if="hasOrder">
				<view class="cf margin-top">
					<!-- 左侧-->
					<view class="fl grid col-2" style="width: 75%;">
						<view class="cu-avatar kp-userContRadius margin-right" style="height:140rpx;width:140rpx; border-color:#fff;"
						 :style="{'background-image':' url('+storeData.storeAvatar+')'}"></view>

						<view style="width: calc(100% - 200rpx);">
							<view class=" text-cut text-xl " style="text-shadow: 6upx 6upx 8upx rgba(26, 26, 26, 0.2)">
								{{storeData.sname}}
							</view>
							<view class="cu-capsule radius text-sm grid col-2">
								<view class="text-cut" style="width: 65%;">
									{{storeData.address}}
								</view>
								<view class="text-blue" style="width: 35%;" @click="navigation(storeData.latitude,storeData.longitude,storeData.address)">
									<text class='cuIcon-locationfill text-blue'></text>去这里</view>
							</view>
							<view>
								<tui-rate :current="storeData.score" normal="#ccc" active="#ff7900" :size="16" />
							</view>
						</view>
					</view>
					<!-- 右侧 -->
					<view class="fr text-center" style="width: 25%;">
						<view class="cu-capsule round  line-gray margin-top">
							<view v-if="storeData.vip" class='cu-tag'>
								<text class='cuIcon-profile text-blue'></text>
								<view class="text-black margin-left-xs">
									会员商家
								</view>
							</view>

						</view>
					</view>
				</view>

				<view class=" text-shadow-red margin-top padding-left-xs" style="text-indent: 2em;text-shadow: 6upx 6upx 8upx rgba(26, 26, 26, 0.2)">
					{{storeData.description}}
				</view>
			</view>
		</view>


		<!-- tab -->

		<view class="kp-tabs">
			<tui-tabs :tabs="tabs" :currentTab="currentTab>2?0:currentTab" @change="change" itemWidth="33.3333%"></tui-tabs>
		</view>
		<!-- 内容 -->
		<!-- <ComboGoods  :sid = storeData.sid v-if="getComponents(currentTab)==='ComboGoods'"></ComboGoods>
		<SingleGoods  :sid = storeData.sid v-if="getComponents(currentTab)==='SingleGoods'"></SingleGoods>
		<StoreDiscuss  :sid = storeData.sid v-if="getComponents(currentTab)==='StoreDiscuss'"></StoreDiscuss> -->

		<!-- 套餐列表 -->
		<view v-if="currentTab == 0" class="padding">
			<view class="waterfall-container ">
				<view v-if="item.type == 1" class="waterfall-item padding-bottom radius padding-lr-xs text-center bg-white margin-bottom-xs"
				 @click="NavigateToGoodsDetail(item.gid)" v-for="(item,index) in dataList.list" :key="index">
					<image class="radius" :src="item.coverImgpath" mode="aspectFill"></image>
					<p style="color: #666;" class="text-left">{{item.gname}}</p>
					<!-- <view class="margin-left-xs text-left">
						<tui-rate :current="3" normal="#ccc" active="#ff7900" :size="12" />
					</view> -->
					<p class="cf">
						<text class="cu-tag padding-xs text-red text-lg margin-lr-xs fl bg-white">¥{{item.price}}</text>
						<text class="cu-tag padding-xs  margin-lr-xs fr bg-white">余量:{{item.stock}}</text>
					</p>
				</view>

			</view>


		</view>

		<!-- 单品列表 -->
		<view v-if="currentTab == 1" class="padding-xs">
			<SingleGoods :sid="storeData.sid"></SingleGoods>
			<!-- <SingleGoods :sid="product"></SingleGoods> -->
		</view>

		<!-- 店铺评价 -->
		<!--
		<view v-if='currentTab == 2' class="padding-tb-xs padding-lr">
			<view class="tui-cmt-box tui-mtop  ">
				<view class="tui-cmt-content tui-padding radius" v-for="(item,index) in commentStoreList.list" :key="index">
					<view class="tui-cmt-user">
						<image :src="item.user.avatar" class="tui-acatar "></image>
						<view class="tui-rate-user">{{item.user.nickname}}</view>
						<view class="tui-rate-box">
							<tui-rate class="tui-rate-img" :current="item.rate" normal="#ccc" active="#ff7900" :size="11" :quantity="5"
							 :hollow="true"></tui-rate>
							<view class="text-gray tui-rate-text ">{{item.createTime}}</view>
						</view>


					</view>
					<view class="tui-cmt ">{{item.comment}}</view>

				</view>
			</view>
			<tui-divider width="80%">已经到底啦</tui-divider>
		</view> -->

		<view v-if='currentTab == 2' class="padding-tb-xs padding-lr">
			<view class="tui-cmt-box tui-mtop  ">
				<view class="tui-cmt-content tui-padding radius" v-for="(item,index) in commentStoreList.list" :key="index">
					<view class="tui-cmt-user">
						<image :src="item.user.avatar" class="tui-acatar "></image>
						<view class="-tui-rate-user">{{item.user.nickname}}</view>
						<view class="fa-box">
							<tui-rate class="tui-rate-img" :current="item.rate" normal="#ccc" active="#ff7900" :size="11" :quantity="5"
							 :hollow="true"></tui-rate>

							<view class="text-gray tui-rate-text ">{{item.createTime}}</view>
						</view>
					</view>
					<view class="tui-cmt ">{{item.comment}}</view>

				</view>
			</view>
			<view v-if="currPage===totalPage||totalPage==''">
				<tui-divider width="80%">没有更多啦</tui-divider>
			</view>
		</view>

	</view>
</template>

<script>
	import tuiRate from '@/components/rate/rate.vue'
	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	import tuiDivider from "@/components/divider/divider"
	import Map from '../../../utils/openMap.js'
	import {
		getSelectStoreDetail,
		getGoodsList,
		getCommentStoreList
	} from "@/api/storeDetailApi.js"


	export default {
		components: {
			tuiRate,
			tuiTabs,
			tuiDivider

		},
		data() {
			return {
				loading: true,
				tabs: [{
					name: "套餐"
				}, {
					name: "单品"
				}, {
					name: "评价"
				}],
				currentTab: 0, //预设当前项的值
				statusBarHeight: 0,
				//店铺数据
				storeData: {},
				commentStoreList: {},
				sid: '2',
				//数据
				dataList: {},
				showCar: false,
				currPage: 1,
				totalPage: 1,
				hasOrder: false
			}
		},
		async onLoad(option) {
			this.sid = option.sid;
			let that = this;

			// 获取系统信息
			uni.getSystemInfo({
				success(res) {
					that.statusBarHeight = res.statusBarHeight;
					this.scrollHeight = `${res.windowHeight}px`;
				}
			});

			//获取店铺信息
			const storeDataRes = await getSelectStoreDetail(this.sid).catch(()=>{
				uni.showToast({
					title: "您扫描的店铺信息有误",
					duration: 3000,
					icon: "none",
					success() {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 3000)
				
					}
				})
			});
			this.storeData = storeDataRes.data.store;
			console.log(this.storeData)

			// 判断二维码是否是扫描的店铺二维码
			this.product = storeDataRes.data.store;
			console.log(this.product)
			if (!this.product) {
				this.hasOrder = false;
				uni.showToast({
					title: "您扫描的店铺信息有误",
					duration: 3000,
					icon: "none",
					success() {
						setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
						}, 3000)

					}
				})
			} else {
				this.hasOrder = true;
			}


			//获取商品列表
			const Res = await getGoodsList({
				pageindex: 1,
				pagesize: 30,
				sId: this.sid,
				type: 1
			});
			this.dataList = Res.data.page;
			// console.log(this.dataList)

			//获取店铺评价
			const commentStoreListRes = await getCommentStoreList(1, 10, 2);
			this.commentStoreList = commentStoreListRes.data.page;
			// console.log(this.commentStoreList)

			this.loading = false
		},
		//下拉刷新
		async onReachBottom() {
			// console.log('触底')
			if (this.currPage == this.totalPage) return;
			this.currPage += 1;
			if (currentTab == 0) {
				//套餐
				const Res = await getGoodsList({
					pageindex: this.currPage,
					pagesize: 30,
					sId: this.sid,
					type: 1
				});
			} else if (currentTab == 1) {
				//评论
				const Res = await getCommentStoreList(this.currPage, 10)
			}

			const loadData = Res.data.page;
			const list = this.dataList.list;
			this.dataList.list = list.concat(loadData.list)
			this.currPage = loadData.currPage;



		},
		methods: {
			change(e) {
				this.currentTab = e.index
			},
			NavigateToMian() {
				uni.navigateTo({
					url: "/pages/index/index"
				});
			},
			NavigateToGoodsDetail(gid) {
				uni.navigateTo({
					url: "/pages/main/goods-detail/goods-detail?gid=" + gid,
				});
			},

			//导航
			navigation(latitude, longitude, name) {
				Map.openMap(latitude, longitude, name)
			}
		}
	}
</script>

<style lang="scss">
	@import "../../../colorui/store-detail.css";

	.list_box {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: flex-start;
		align-items: flex-start;
		align-content: flex-start;
		font-size: 28rpx;

		.left {
			width: 200rpx;
			background-color: #f6f6f6;
			line-height: 80rpx;
			box-sizing: border-box;
			font-size: 32rpx;

			.item {
				padding-left: 20rpx;
				position: relative;

				&:not(:first-child) {
					margin-top: 1px;

					&::after {
						content: '';
						display: block;
						height: 0;
						border-top: #d6d6d6 solid 1px;
						width: 620upx;
						position: absolute;
						top: -1px;
						right: 0;
						transform: scaleY(0.5);
						/* 1px像素 */
					}
				}

				&.active,
				&:active {
					color: #42b983;
					background-color: #fff;
				}
			}
		}

		.main {
			background-color: #fff;
			padding-left: 20rpx;
			width: 0;
			flex-grow: 1;
			box-sizing: border-box;



			.title {
				line-height: 64rpx;
				font-size: 24rpx;
				font-weight: bold;
				color: #666;
				background-color: #fff;
				position: sticky;
				top: 0;
				z-index: 999;
			}

			.item {
				padding-bottom: 10rpx;
				border-bottom: #eee solid 1px;
			}

			.goods {
				display: flex;
				flex-direction: row;
				flex-wrap: nowrap;
				justify-content: flex-start;
				align-items: center;
				align-content: center;
				margin-bottom: 10rpx;

				&>image {
					width: 120rpx;
					height: 120rpx;
					margin-right: 16rpx;
				}

				.describe {
					font-size: 24rpx;
					color: #999;
				}

				.money {
					font-size: 24rpx;
					color: #efba21;
				}
			}
		}
	}
</style>
