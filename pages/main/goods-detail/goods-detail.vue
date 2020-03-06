<template>
	<view>
		<!-- navbar -->
		<cu-custom bgColor="kpbg-black" :isBack="true" class="text-white">
			<block slot="backText">返回</block>
			<block slot="content">
				<view class="text-white">详情</view>
			</block>
		</cu-custom>

		<view v-if='!loading'>

			<!-- 商品详情 -->
			<swiper class="screen-swiper" :circular="true" :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in goodsData.goodsAlbumsList" :key="index" class="bg-white">
					<image :src="item.imgpath" mode="aspectFit" v-if="item.imgpath"></image>
					<!-- <video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video> -->
				</swiper-item>
			</swiper>

			<!-- <view class="padding bg-white"> -->
			<view class="padding bg-white text-xl text-bold kp-gname ">{{goodsData.gname}}</view>
			<view class="bg-white padding-lr">
				<tui-rate :current="goodsData.avg" normal="#ccc" active="#ff7900" :size="16" />
			</view>
			<view class="cf padding-xs bg-white">
				<view class="padding-lr text-red text-xxl margin-lr-xs fl">¥{{goodsData.price}}</view>
				<!-- <view v-if='goodsData.type==1' class=" text-gray  margin-top fl" style="text-decoration: line-through;margin-top:26rpx">¥1333</view> -->
			</view>

			<view class="amount padding-xs margin-tb-xs bg-white">
				<view class="text-gray  padding-left ">
					库存：{{goodsData.stock}}
				</view>
			</view>
			<!-- </view> -->
			<view v-show="false" class=" bg-white grid col-2  padding" @click="showPopup">
				<view class="text-black padding-left">
					选择规格
				</view>
				<view class="text-gray text-right padding-right">
					已选择 {{goodsData.goodsSpecsList[cur].gsname}}
					<text class="cuIcon-right lg"></text>
				</view>
			</view>
			<!-- 规格弹层 -->
			<tui-bottom-popup :show="popupShow" @close="hidePopup">
				<view class="tui-popup-box">
					<scroll-view scroll-y class="tui-popup-scroll">
						<view class="tui-scrollview-box">
							<view class="tui-bold tui-attr-title">请选择商品规格</view>
							<view class="tui-attr-box">
								<view class="tui-attr-item" v-for="(item,index) in goodsData.goodsSpecsList" :key='index' @click='chooseAttr(index,item.gsid)'
								 :class="index===cur?'tui-attr-active':''">
									{{item.gsname}}
								</view>

							</view>

							<view class="tui-number-box tui-bold tui-attr-title">
								<view class="tui-attr-title">数量</view>
								<tui-numberbox :max="99" :min="1" :value="value" @change="change"></tui-numberbox>
							</view>

						</view>
					</scroll-view>
					<view class="tui-icon tui-icon-close-fill tui-icon-close" style="color: #999;font-size:20px" @tap="hidePopup"></view>

					<view class="text-center">
						<view class="cu-btn bg-orange round shadow-blur popupBtn" @click="hidePopup">确定</view>
						<view class="cu-btn bg-red round shadow-blur margin-left-lg popupBtn" @click="NavigateToOrderSubmit">立即购买</view>
					</view>
				</view>
			</tui-bottom-popup>
			<!--底部选择层-->



			<!-- tab -->
			<view class="tab-style ">
				<view class="tui-mtop text-center">
					<tui-tabs :tabs="tabs" :currentTab="currentTab>2?0:currentTab" @change="tabChange" itemWidth="50%"></tui-tabs>
				</view>
			</view>

			<!-- <view class=" bg-white">
			<component :is="getComponents(currentTab)" ></component>
			<GoodsCont v-if="getComponents(currentTab)=='GoodsCont'"></GoodsCont>
			<GoodsDiscuss v-if="getComponents(currentTab)=='GoodsDiscuss'"></GoodsDiscuss>
		</view> -->

			<!-- 详情 -->
			<view v-if='currentTab==0' class="uni-padding-wrap">
				<view class="uni-common-mt" style="background:#FFF; padding:30rpx;">
					<rich-text :nodes="goodsData.content"></rich-text>
				</view>
			</view>

			<!-- 评价 -->
			<view v-if="currentTab ==1" class="tui-cmt-box tui-mtop ">
				<view class="tui-cmt-content tui-padding" v-for="(item,index) in commentData.list" :key="index">
					<view class="tui-cmt-user">
						<image :src="'//'+item.user.avatar" class="tui-acatar"></image>
						<view class="tui-rate-user">{{item.user.nickname}}</view>
						<view class="tui-rate-box">
							<tui-rate class="tui-rate-img" :current="item.rate" @change="change" normal="#ccc" active="#ff7900" :size="11"
							 :quantity="5" :hollow="true"></tui-rate>
							<view class="text-gray tui-rate-text ">{{item.createTime}}</view>
						</view>

					</view>
					<view class="text-center text-gray padding" v-if="item.comment !==''&&item.shopCommentAlbumsList.length ==0">
						该用户暂未发表评论 </view>
					<view v-else class="tui-cmt">{{item.comment}}</view>

					<view style=" padding-left:96rpx" v-if="item.shopCommentAlbumsList.length !==0">
						<view class="grid col-3 padding-xs">
							<view style="height:160rpx; background-size:100%;" v-for="(v,index) in item.shopCommentAlbumsList" :key="index"
							 :style="{'background-image':'url(//'+v.imgpath+')'}"></view>
						</view>
					</view>

				</view>

				<view class="cu-tabbar-height"></view>
			</view>

			<!-- bar -->
			<view class="cu-bar bg-white tabbar border shop foot">
				<button class="action" open-type="contact" @click="NavigateToStoreDetail(goodsData.sid)">
					<view class="cuIcon-shop text-orange">
					</view> 店铺
				</button>
				<view class="action" @click="NavigateToHome()">
					<view class="cuIcon-home text-cyan">
					</view>
					首页
				</view>
				<view class="btn-group">
					<view v-show='false' class="cu-btn bg-orange round shadow-blur" @click="NavigateToGroupBuy">发起拼趴</view>

					<view class="cu-btn bg-red round shadow-blurfr" style="width: 80%;" @click="NavigateToOrderSubmit(goodsData.gid,orderType,count)">立即购买</view>
				</view>
			</view>
			<tui-divider width="80%">已经到底啦</tui-divider>
			<view class="cu-tabbar-height"></view>
		</view>
	</view>
</template>

<script>
	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	import tuiDivider from "@/components/divider/divider"
	import tuiBottomPopup from "@/components/bottom-popup/bottom-popup"
	import tuiButton from "@/components/button/button"
	import tuiTag from "@/components/tag/tag"
	import tuiRate from "@/components/rate/rate"
	import tuiNumberbox from "@/components/numberbox/numberbox"
	import {
		getGoodsDetail,
		getCommentGoodsList
	} from "@/api/storeDetailApi.js"
	export default {
		components: {
			tuiTabs,
			tuiDivider,
			tuiBottomPopup,
			tuiButton,
			tuiTag,
			tuiNumberbox,
			tuiRate
		},
		data() {
			return {
				tabs: [{
					name: "商品详情"
				}, {
					name: "评价"
				}],
				loading: true,
				show: false,
				current: 0,
				index: 3,
				isCard: true,
				currentTab: 0, //预设当前项的值
				popupShow: false,
				value: 1,
				cur: 0,
				gid: 1,
				goodsData: {},
				commentData: {},
				orderType:1,
				count:1,

			}
		},
		onLoad(option) {
			this.gid = option.gid;

		},
		async mounted() {
			//获取详情
			const goodsDetailRes = await getGoodsDetail(this.gid);
			this.goodsData = goodsDetailRes.data.Goods
			console.log(this.goodsData)

			//获取商品评价
			const commentRes = await getCommentGoodsList(1, 10, this.gid);
			this.commentData = commentRes.data.page
			// console.log(this.commentData)

			this.loading = false;
		},
		async onPullDownRefresh() {
			const goodsDetailRes = await getGoodsDetail(this.gid);
			const commentRes = await getCommentGoodsList(1, 10, this.gid);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			tabChange(e) {
				this.currentTab = e.index
			},
			// getComponents(index) {
			// 	switch (index) {
			// 		case 0:
			// 			return "GoodsCont";
			// 			break;

			// 		case 1:
			// 			return "GoodsDiscuss";
			// 			break;
			// 	}
			// },
			NavigateToGroupBuy() {
				uni.navigateTo({
					url: "/pages/main/group-buy/group-buy",
				});
			},
			NavigateToOrderSubmit(gid,orderType,count) {
				uni.navigateTo({
					url: `/pages/main/order-submit/order-submit?gid=${gid}&orderType=${orderType}&count=${count}`,
				});
			},
			NavigateToStoreDetail(sid) {
				uni.navigateTo({
					url: '/pages/main/store-detail/store-detail?sid=' + sid,

				});
			},
			NavigateToHome(){
				uni.redirectTo({
					url: "/pages/index/index",
				})
			},
			showPopup() {
				this.popupShow = true
			},
			hidePopup() {
				this.popupShow = false
			},
			change(e) {
				this.value = e.value
			},
			chooseAttr(index, gsid) {
				this.cur = index;
				console.log(this.cur)

			}

		}
	}
</script>

<style scoped>
	@import '../../../colorui/store-detail.css';

	.popupBtn {
		width: 300rpx;
	}
</style>
