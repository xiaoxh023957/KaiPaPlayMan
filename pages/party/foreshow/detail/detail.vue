<template> 
	<view v-if="!loading">
		<view class="bg-white margin-bottom-lg">
			<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
				<block slot="backText" class="text-white">返回</block>
				<block slot="content" class="text-white">预告详情</block>
			</cu-custom>
			<!-- <swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
			 :autoplay="true" interval="5000" duration="500">
				<swiper-item v-for="(item,index) in swiperList" :key="index">
					<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
					<video :src="item.url" autoplay loop muted :show-play-btn="false" :controls="false" objectFit="cover" v-if="item.type=='video'"></video>
				</swiper-item>
			</swiper> -->

			<view style="height: 474rpx;">
				<image :src="epartyForecastDetail.efbannerImgpath" mode='scaleToFill' style="width: 100%; height: 100%;"></image>
			</view>

			<view>
				<view class="margin margin-top-xl text-xxl text-black" style="font-weight: 550;">
					{{epartyForecastDetail.eftitle}}
				</view>
				<view class="margin  padding-left" style="border-left: 8rpx solid #FBD660;">
					<view>
						<text>{{eParty.startTime}}</text>
						<text class="margin-xs">至</text>
						<text class="margin-xs">{{eParty.endTime}}</text>
					</view>
					<view class="margin-tb-lg">
						<text>免费</text> <text>已报 <text>{{eParty.joinedMember}}/{{eParty.maxMember}}</text>人</text>
					</view>
					<view>
						<view style="width: 70%; display: inline-block;">
							{{Store.address}}
						</view>
						<view class="fr margin-top margin-left-xs" style="width: 30rpx;height: 10rpx;border: 1rpx solid #7A7A7A; border-radius: 50%;">
							<view class="cuIcon-location text-black" style="margin-top: -22rpx; "></view>
						</view>
					</view>
				</view>
			</view>
			<view class="margin">
				<view class="margin-top-xl margin-bottom-xs text-xl text-black" style="font-weight: 550;">活动介绍</view>
				<view>{{eParty.content}}</view>
			</view>
			<view class="margin-left margin-top bg-white">
				<view class="margin-top-xl margin-bottom-xs text-xl text-black" style="font-weight: 550;">
					<view>已报名用户<text class="margin-left-xs">（{{eParty.joinedMember}}/{{eParty.maxMember}}）</text></view>
				</view>
			</view>
			<view class="padding-sm padding-bottom-xl">
				<view>
					<view class="cu-avatar round lg margin-xs" v-for="(item,index) in epartyForecastDetail.userList" :key="index"
					 :style="[{ backgroundImage:'url(' + item.avatar + ')' }]"></view>
				</view>
			</view>
		</view>
		<view class="cu-bar bg-white tabbar border shop foot">
			<view class="btn-group">
				<button class="cu-btn bg-red round shadow-blur lg" style="width: 80%;" @click="showPopup()">报名</button>
			</view>
		</view>

		<!-- 选择电音派对套餐 -->
		<tui-bottom-popup :show="popupShow&&isRead" @close="hidePopup">
			<view class="tui-popup-box">
				<scroll-view scroll-y class="tui-popup-scroll">
					<view class="tui-scrollview-box">

						<view class="tui-bold tui-attr-title">选择套餐</view>

						<view class="cu-list">
							<radio-group class="block" @change="RadioChange">
								<view class="cu-item padding" v-for="(item,index) in epartyGoodsList" :key="index">

									<label class="flex justify-between align-center flex-sub">
										<view class="flex-sub">
											<view class="cu-avatar radius lg kp-block" style="width:20%; vertical-align: middle; " :style="{'background-image':'url(//'+item.packageImgpath+')'}"></view>

											<view class="kp-block padding-lr-xs  text-grey" style="width:58% ;vertical-align: middle;">
												<view class="title text-df">
													{{item.epname}}
												</view>
												<view class="padding-tb-xs">
													库存:{{item.stock}}
												</view>
											</view>
										</view>
										<radio class="round" :class="epid==item.epid?'active':''" :checked="epid== item.epid?true:false" :value="''+item.epid"></radio>
									</label>
								</view>
							</radio-group>
						</view>


					</view>
				</scroll-view>
				<view class=" text-center">
					<button class="cu-btn padding-lr-lg round bg-orange kp-btn " @tap="epid==0?'':NavigateToOderSubmit(epid,orderType,count)">购买</button>
				</view>
			</view>
		</tui-bottom-popup>

	</view>
</template>

<script>
	import tuiDivider from "@/components/divider/divider"
	import tuiBottomPopup from "@/components/bottom-popup/bottom-popup"
	import tuiButton from "@/components/button/button"


	import {
		getEpartyForecastDetail,
		getEpartyGoodsList
	} from "@/api/partyApi.js"

	export default {
		components: {
			tuiDivider,
			tuiBottomPopup,
			tuiButton,
		},
		data() {
			return {
				// ColorList: this.ColorList,
				avatar: {},
				cardCur: 0,
				dotStyle: false,
				towerStart: 0,
				direction: '',
				efid: 0,
				epartyForecastDetail: {},
				eParty: {},
				Store: {},
				// 弹层
				popupShow: false,
				attrList: [],
				cur: 0,
				loading: true,
				isRead: false,
				epartyGoodsList: {},
				epid: 0,
				orderType: 9,
				count: 1,



			};

		},
		onLoad(options) {
			this.efid = options.efid;
			// console.log( this.efid)
		},

		async mounted() {

			//获取预告详情
			const epartyForecastDetailRes = await getEpartyForecastDetail(this.efid);
			this.epartyForecastDetail = epartyForecastDetailRes.data.EpartyForecast;
			this.eParty = this.epartyForecastDetail.eparty;
			this.Store = this.eParty.store;
			console.log(this.epartyForecastDetail)

			this.loading = false;

		},
		methods: {
			async showPopup() {
				this.popupShow = true;

				//获取电音套餐列表
				const epartyGoodsListRes = await getEpartyGoodsList(1, 9999);
				this.epartyGoodsList = epartyGoodsListRes.data.data.records
				console.log(this.epartyGoodsList)

				this.isRead = true;

			},
			hidePopup() {
				this.popupShow = false;
			},

			RadioChange(e) {
				this.epid = e.detail.value

			},
			// showToast() {
			// 	uni.showToast({
			// 		icon: 'none',
			// 		position:'bottom',
			// 		title: "请选择套餐",
			// 		mask: true
			// 	})
			// },
			// pay(price) {
			// 	this.popupShow = false;
			// 	this.attrList = [];
			// 	uni.navigateTo({
			// 		url: `/pages/pay/pay?price=${price}`
			// 	})
			// },

			NavigateToOderSubmit(epid, orderType, count) {
				uni.navigateTo({
					url: `/pages/main/order-submit/order-submit?gid=${epid}&&orderType=${orderType}&&count=${count}`
				});
			},




		}
	}
</script>

<style>
	.redioActive {
		background: orange !important;
	}

	.tui-popup-class {
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-popup-box {
		position: relative;
		padding: 30rpx 0 60rpx 0;
	}

	.tui-popup-btn {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.tui-popup-btn .tui-btn-class {
		width: 90% !important;
		display: block !important;
		font-size: 28rpx !important;
	}

	.tui-icon-close {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
	}

	.tui-product-box {
		display: flex;
		align-items: flex-end;
		font-size: 24rpx;
		padding-bottom: 30rpx;
	}


	.tui-amount {
		color: #ff201f;
		font-size: 36rpx;
	}

	.tui-number {
		font-size: 24rpx;
		line-height: 24rpx;
		padding-top: 12rpx;
		color: #999;
	}

	.tui-popup-scroll {
		min-height: calc(100vh - 90vh);
		max-height: calc(100vh - 472rpx);
		font-size: 26rpx;
	}

	.tui-scrollview-box {
		padding: 0 30rpx 30rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-attr-title {
		padding: 10rpx 0;
		color: #333;
	}

	.tui-attr-box {
		font-size: 0;
		padding: 20rpx 0;
	}



	.tui-attr-active {
		background: #fcedea !important;
		color: #e41f19;
		font-weight: bold;
		position: relative;
	}

	.tui-attr-active::after {
		content: "";
		position: absolute;
		border: 1rpx solid #e41f19;
		width: 100%;
		height: 100%;
		border-radius: 40rpx;
		left: 0;
		top: 0;
	}

	.tui-number-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0 30rpx 0;
		box-sizing: border-box;
	}

	.tui-numberbox {
		position: relative;
		z-index: 22;
	}

	.tui-num-input {
		margin: 0;
	}

	. {
		position: absolute;
		left: 73px;
		padding-right: 150rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-height: 1.5;
	}

	.addBtn {
		position: relative;
		z-index: 999;
	}

	.valueBox {
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		vertical-align: middle;
		border-radius: 50%;
		border: 1px solid orange;
	}

	.goods-name {
		width: 68%;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-height: 1.5;
	}

	.title {
		max-height: 76rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		/* display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2 !important; */
		line-height: 1.5;
	}

	.numBox {
		width: 28%;
		padding-right: 20rpx;
		position: relative;
		top: -50%;
		transform: translateY(50%);
	}

	.add,
	.cut {
		display: inline-block;
		width: 60rpx;
		height: 100%;
		line-height: 1.5;
		vertical-align: middle;

	}

	.kp-block {
		display: inline-block;
	}


		{
		background: orange !important;
	}

	/* 弹层end */
	.kp-btn{
		width: 400rpx;
	}
</style>
