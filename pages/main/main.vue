<template>

	<view class="bg-white" v-if='!loading'>

		<cu-custom bgColor="kpbg-black" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">
				<view class="text-white">开趴 - KP</view>
			</block>
		</cu-custom>

		<!-- 顶部搜索 -->
		<view class="cu-bar search kpbg-black">
			<view class="action">
				<text class="margin-right-xs text-white">长沙</text>
			</view>
			<view class="search-form round ">
				<text class="cuIcon-search "></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" type="text" placeholder="请输入店铺名称" @click="jump" confirm-type="search"></input>
			</view>
			<view class="action" @click="scanCode()">
				<text class="margin-right-xs text-white text-xl cuIcon-scan"></text>
			</view>
		</view>

		<!-- 趴类型 -->
		<scroll-view scroll-x class="nav" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==0?'text-orange':''" v-for="(item,index) in getGoodsTypeList.list" :key="index"
			 @tap="NavigateToComboList(item.gtypeName,item.gtypeid) ">
				{{item.gtypeName}}
			</view>
		</scroll-view>

		<!-- 轮播 -->
		<swiper class="card-swiper square-dot" :indicator-dots="true" :circular="true" :autoplay="true" interval="5000"
		 duration="500" @change="cardSwiper" indicator-color="#8799a3" indicator-active-color="#0081ff">
			<swiper-item v-for="(item,index) in bannerPage.list" :key="index" :class="cardCur==index?'cur':''" v-if='item.imgpath !=="" '
			 @click="bannerJump(item)">
				<view class="swiper-item ">
					<image :src="item.imgpath" mode="aspectFill"></image>
				</view>
			</swiper-item>
		</swiper>

		<!-- 文章轮播 -->
		<view class="tui-rolling-news border" @click="NavigateToArticleList(1)">
			<tui-icon name="news-fill" :size='20' color='#ff7900'></tui-icon>
			<swiper vertical autoplay circular interval="3000" class="tui-swiper">
				<swiper-item v-for="(item,index) in newsList" :key="index" class="tui-swiper-item ">
					<view class="tui-news-item">{{item.title}}</view>
				</swiper-item>
			</swiper>
		</view>
 
		<!-- 列表菜单 -->
		<view class="cu-list grid border-radius  col-4" style="margin:0 30rpx 30rpx ;" :style="{'background-color':cssStyle.backgroundColor}">

			<view v-for="(item,index) in storeTypeList" :key="index" v-if="index<4*2" @click="NavigateToStoreList(item.stypename,item.stypeid)">
				<view class="padding-lg padding-bottom-xs">
					<image :src="item.iconImgpath" style="width:64rpx;height:64rpx; margin:0 auto">
					</image>
				</view>
				<text>{{item.stypename}}</text>
			</view>
		</view>
	
		<!-- 游戏区 --> 
		<view class="padding-xs radius margin border-radius">
			<view class="flex">
				<view class="flex-twice margin-bottom-xs margin-right-xs" style="border-radius: 30rpx 0 0 0;overflow: hidden;"
				 @click="mysteriousStoreGameList()">
					<image style="width:100%;height:200rpx;" src="../../static/smsd.png"></image>
				</view>

				<view class="flex-sub  margin-bottom-xs" style="border-radius:0 30rpx 0 0;overflow: hidden;" @click="NavigateToTurntableGame()">
					<image style="width:100%;height:200rpx" src="../../static/zp.png"></image>
				</view>
			</view>
			<view class="flex">
				<view class="flex-sub margin-right-xs " style="border-radius: 0 0 0 30rpx ;overflow: hidden;" @click="NavigateToFlopGame()">
					<image style="width:100%;height:200rpx" src="../../static/dbkh.png"></image>
				</view>
				<view class="flex-sub margin-right-xs " @click="NavigateToQuestionGame()">
					<image style="width:100%;height:200rpx" src="../../static/zmkm.png"></image>
				</view>
				<view class="flex-sub" style="border-radius:0 0 30rpx 0;overflow: hidden;" @click="luckyGame()">
					<image style="width:100%;height:200rpx" src="../../static/xyzx.png"></image>
				</view>
			</view>
		</view>
		
		<!-- 派对入口 -->
		<view class="bg-white padding-lr " @click="party()">
			<view class="kp-userContRadius margin-bottom-xs" style=" height:200rpx; background-image: url(../../static/dypd.png); background-size:100% 100%;">
			</view>
		</view>

		<!-- 选项卡 -->
		<scroll-view scroll-x class="radius nav margin-left margin-right" :style="{'width':deviceWidth-30+'px'}"
		 scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-orange':''" v-for="(item,index) in storeTypeList" :key="index"
			 @tap="tabSelect" :data-id="index" :data-stid='item.stypeid'>
				{{item.stypename}}
			</view>
		</scroll-view>

		<!-- 店铺列表 -->
		<view class="cu-card article ">
			<view class="cu-item padding-top " style="margin:4rpx 30rpx;border-radius:20rpx ;" :style="{'background-color':cssStyle.backgroundColor} "
			 v-for="(item,index) in getSelectStoreList.list" :key="index" @click="NavigateToStoreDetail(item.sid)">
				<view class="content ">
					<image :src="item.storeAvatar" mode="-aspectFill"></image>
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

	import {
		getBannerList,
		getStoreTypeList,
		getSelectStoreList,
		getGoodsTypeList,
		getNewsList

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
				cardCur: 0,
				isCard: false,
				deviceWidth: 0,
				towerStart: 0,
				direction: '',
				TabCur: 0,
				scrollLeft: 0,
				// 轮播分页数据
				bannerPage: {},

				//商品分类数据
				getGoodsTypeList: {},

				// 店铺类型数据
				storeTypeList: {},
				stypename: '',
				stypeid: '',

				// 店铺列表
				getSelectStoreList: {},
				totalPage: 0,
				currPage: 0,
				stid: 0,
				stname: '',

				//轮播文章
				newsList: [],

				cssStyle: {
					backgroundColor: '#fff',
				},

			}
		},

		//载入事件
		mounted: function(options) {

			let that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.deviceWidth = res.windowWidth
				}
			});
			
			this.getBannerList();

			this.loading = false;
		},

		methods: {
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			IsCard(e) {
				this.isCard = e.detail.value
			},
			async getBannerList(){
				//查询轮播列表
				const bannerResp = await getBannerList(1, 6);
				this.bannerPage = bannerResp.data.page;
				console.log(this.bannerPage);
				this.getNewsList();
			},
			async getNewsList(){
				//查询文章列表
				const newsListRes = await getNewsList(1, 10);
				this.newsList = newsListRes.data.page.list;
				// console.log(this.newsList)
				this.getStoreTypeList()
			},
			async getStoreTypeList(){
				//首页店铺类型（九宫格）
				const storeTypeRes = await getStoreTypeList(1, 10);
				this.storeTypeList = storeTypeRes.data.page.list;
				// --------------------------------------------------------------------
				this.stypeid = storeTypeRes.data.page.list[0].stypeid;
				this.stypename = storeTypeRes.data.page.list[0].stypename;
				// console.log(this.storeTypeList)
				this.getStoreList()
				
			},
			async getStoreList(){
				//店铺列表
				const storeRes = await getSelectStoreList(1, 30, this.stypeid);
				this.getSelectStoreList = storeRes.data.page;
				this.totalPage = this.getSelectStoreList.totalPage;
				this.currPage = this.getSelectStoreList.currPage;
				// console.log(this.getSelectStoreList)
				this.getGoodsType()
			},
			async getGoodsType(){
				//获取商品分类列表
				const getGoodsTypeListRes = await getGoodsTypeList({
					pageindex: 1,
					pagesize: 999,
					type: 1
				});
				this.getGoodsTypeList = getGoodsTypeListRes.data.page;
			},
			async tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				// 请求数据
				this.stid = e.currentTarget.dataset.stid;
				const storeRes = await getSelectStoreList(1, 50, this.stid);
				this.getSelectStoreList = storeRes.data.page;
				// console.log(storeRes)
				// 获取店铺列表总页
				this.totalPage = this.getSelectStoreList.totalPage;
				this.currPage = this.getSelectStoreList.currPage;
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},
			NavigateToStoreDetail(sid) {
				uni.navigateTo({
					url: '/pages/main/store-detail/store-detail?sid=' + sid,

				});
			},
			NavigateToStoreList(stypename, stypeid) {
				uni.navigateTo({
					url: "/pages/store-list/store-list?stypename=" + stypename + "&stypeid=" + stypeid
				})
			},
			NavigateToArticleList(fid) {
				uni.navigateTo({
					url: "/pages/main/article-list/article-list?fid=" + fid
				})
			},
			NavigateToComboList(tname, tid) {
				uni.navigateTo({
					url: "/pages/main/combo-list/combo-list?tname=" + tname + "&tid=" + tid
				})
			},
			party() {
				uni.navigateTo({
					url: "/pages/party/party"
				})
			},
			luckyGame() {
				uni.navigateTo({
					url: "/pages/games/luckystarlist/luckystarlist"
				})
			},
			NavigateToTurntableGame() {
				uni.navigateTo({
					url: "/pages/games/turntable/index/index"
				})
			},
			NavigateToFlopGame() {
				uni.navigateTo({
					url: "/pages/games/flop/flop"
				})
			},
			NavigateToQuestionGame() {
				uni.navigateTo({
					url: "/pages/games/question-home-page/question-home-page"
				})
			},
			mysteriousStoreGameList() {
				uni.navigateTo({
					url: "/pages/games/zone-record/list/list"
				})
			},
			NavgetaToMoreStoreList(stypename, stypeid, currPage) {
				let obj = {
					stypename: stypename,
					stypeid: stypeid,
					currPage: currPage
				}
				uni.navigateTo({
					url: "/pages/more-store-list/more-store-list?pageObj=" + JSON.stringify(obj)
				})
			},
			jump() {
				uni.navigateTo({
					url: "/pages/main/search/search"
				})
			},
			limit() {
				uni.navigateTo({
					url: "/pages/limit/limit"
				})
			},
			mall() {
				uni.navigateTo({
					url: "/pages/main/mall/mall"
				})
			},
			scanCode(){
				uni.scanCode({
				    onlyFromCamera: true,
					scanType:"qrCode",
				    success: function (result) {
						console.log(result.result)
						let sid = result.result;
				      uni.navigateTo({
				      	url:'/pages/main/store-detail/store-detail?sid='+sid
				      })
				    },
					fail() {
						// console.log("订单核销二维码扫描失败，请重试");
					}
				});
			},
			// scan() {
			// 	uni.navigateTo({
			// 		url:'/pages/main/store-detail/store-detail?sid=' + 2
			// 	})
			// },

			bannerJump(item) {
				let openType = item.openType;
				let aid = item.aid;
				let sid = item.sid;
				let gid = item.gid;
				let efid = item.efid;
				// 0/跳转文章 1/跳转店铺 2/跳转商品 3/电音派对预告
				if (openType == 0) {
					uni.navigateTo({
						url:`/pages/main/article-list/details/details?aid=${aid}`
					})
				} else if (openType == 1) {
					uni.navigateTo({
						url:`/pages/main/store-detail/store-detail?sid=${sid}`
					})
				} else if (openType == 2) {
					uni.navigateTo({
						url:`/pages/main/goods-detail/goods-detail？gid=${gid}`
					})
				} else {
					uni.navigateTo({
						url:`/pages/party/foreshow/detail/detail?efid=${efid}`
					})
				}
			}



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

	.nav .cu-item {
		height: 52rpx !important;
	}
</style>
