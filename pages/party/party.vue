<template>
	<view class="bg-white">
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">电音派对</block>
			<block slot="right">
				<view v-if='!showForeshow' class=" margin-right-lg" data-target="select" @click="historyShow">已结束</view>
			</block>
		</cu-custom>

		<view class="bg-white padding padding-tb-xs ">
			<view class="padding-xs grid col-2 ">
				<view class="bg-img padding-top-xl flex align-end kp-width kp-grid-item1" style="background-image: url('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1017486331,1394773415&fm=26&gp=0.jpg');"
				 @tap="change('isShow')">
					<view class="bg-shadeBottom margin margin-top-xl flex-sub  text-xl">电音派对预告</view>
				</view>

				<view class="bg-img padding-top-xl flex align-end kp-width kp-grid-item2" style="background-image: url('https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1017486331,1394773415&fm=26&gp=0.jpg');"
				 @tap="change('isHide')">

					<view class="bg-shadeBottom margin margin-top-xl flex-sub text-xl">正在进行</view>

				</view>


			</view>
		</view>

		<!-- 预告列表 -->
		<view v-if="showForeshow" class="padding padding-tb-xs " v-for='(item,index) in epartyForecastList.list' :key='index'
		 @click="foreshowDetail(item.efid)">
			<view class="bg-img padding-top-xl flex align-end kp-grid-item2" :style="{'background-image':' url('+item.efbannerImgpath+')'}">
				<view class="bg-shadeBottom margin margin-top-xl flex-sub kp-goods-name">
					<view>{{item.createTime}}</view>
					{{item.eftitle}}
				</view>

			</view>
		</view>


		<!-- 派对列表 -->
		<view v-if="!showForeshow">
			<view v-for="(item,index) in epartyList.list" :key="index" @click="partyDetails(item.eid)" v-if="item.status == 3">
				<view class="padding" style="border-bottom: 1rpx solid #F1F1F1;">
					<!-- 图片 -->
					<view class="cu-avatar radius lg fl margin-top margin-lr" style="height: 180rpx;width: 180rpx;border-radius: 10rpx; "
					 :style="{'background-image':'url('+item.bannerImgpath+')'}"></view>
					<view>
						<!-- 活动标题 -->
						<view class=" margin-top text-xl text-black kp-goods-name text-xl" style="width: 60%;line-height: 1.5; min-height: 100rpx;">
							{{item.etitle}}</view>
						<!-- 时间 -->
						<view>
							<view class=" kp-block" style="height:100%; font-size:36rpx; vertical-align: top;">
								<text class="cuIcon-remind "></text>
							</view>

							<view class="kp-block">
								<view class="margin-left-xs">{{item.startTime}}</view>
								<view class="margin-left-xs">{{item.endTime}}</view>
							</view>


							<view class="grid col-2">
								<!-- 地点 -->
								<view class=" margin-top-xs ">
									<!-- <text class=""></text> -->
									<view class="text-cut cuIcon-location ">
										{{item.store.address}}
									</view>
								</view>

								<!-- 人数 -->
								<view class="cuIcon-people fl margin-top-xs  ">
									<text class="margin-lr-xs">已报<text class="margin-lr-xs">{{item.joinedMember}}/{{item.maxMember}}</text>人</text>
								</view>
							</view>

						</view>

					</view>
				</view>
			</view>
		</view>

		<view class="history-mask" v-if='historyIsShow'>
			<view class="bg-white padding-xs history ">
				<view class="text-grey text-lg text-center  padding-bottom-xs">
					历史派对
				</view>
				<view class="text-gray margin-bottom-xl history-item">
					<view class=" cf" v-for="(item,index) in epartyList.list" :key="index" @click="partyDetails(item.eid)" v-if="item.status == 4">
						<!-- 图片 -->
						<view class="cu-avatar radius fl margin-top-xl margin-left margin-right-xs" style="height: 140rpx;width: 140rpx;border-radius: 10rpx; "
						 :style="{'background-image':'url('+item.bannerImgpath+')'}"></view>

						<view class="kp-block text-left">
							<!-- 活动标题 -->
							<view class=" margin-top text-xl kp-goods-name " style="line-height: 1.5; min-height: 80rpx; padding:0">
								{{item.etitle}}</view>
							<!-- 时间 -->
							<view>
								<text class="cuIcon-remind "></text>
								<text class="margin-left-xs">结束时间:{{item.endTime}}</text>
							</view>

							<!-- 地点 -->
							<view class=" margin-top-xs ">
								<view class="text-cut cuIcon-location ">
									{{item.store.address}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="cu-btn round history-btn padding-lr-lg bg-orange " @click="historyHide">
					确定
				</view>
			</view>
		</view>






	</view>
</template>

<script>
	import {
		getEpartyForecastList,
		getEpartyList
	} from "@/api/partyApi.js"

	export default {

		data() {
			return {
				showForeshow: true,
				historyIsShow: false,
				epartyForecastList: {},
				epartyList: {},

			}
		},
		async mounted() {
			const epartyForecastListRes = await getEpartyForecastList(1, 10);
			this.epartyForecastList = epartyForecastListRes.data.page
			// console.log(this.epartyForecastList)
		},
		async onPullDownRefresh() {
			const epartyForecastListRes = await getEpartyForecastList(1, 10);
			const epartyListRes = await getEpartyList(1, 10);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			// 3 未开始 4已结束

			historyShow() {
				this.historyIsShow = true
			},
			historyHide() {
				this.historyIsShow = false
			},

			async change(type) {
				if (type == 'isShow') {
					this.showForeshow = true;

					const epartyForecastListRes = await getEpartyForecastList(1, 10);
					this.epartyForecastList = epartyForecastListRes.data.page
					// console.log(this.epartyForecastList)

				} else {
					this.showForeshow = false;

					const epartyListRes = await getEpartyList(1, 10);
					this.epartyList = epartyListRes.data.page;
					console.log(this.epartyList)
				};
			},
			foreshowDetail(efid) {
				uni.navigateTo({
					url: `/pages/party/foreshow/detail/detail?efid=${efid}`
				})
			},

			partyDetails(eid) {
				uni.navigateTo({
					url: `/pages/party/party-details/party-details?eid=${eid}`
				})
			},


		}

	}
</script>

<style>
	.kp-block {
		display: inline-block;
	}

	.tui-default {
		padding: 20upx 30upx;
	}

	.kp-goods-name {
		padding: 0 20upx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* font-size: 32rpx !important; */
		line-height: 1.5;
	}

	.bg-shadeBottom {

		background-image: -o-linear-gradient(rgba(255, 255 255, 0.01), rgba(255, 255, 255, .01)) !important;
		background-image: linear-gradient(rgba(255, 255, 255, 0.01), rgba(255, 255, 255, .01)) !important;
		color: var(--white);
		text-shadow: 0.1em 0.1em 0.2em black;
	}

	.kp-width {
		width: calc((100% - 20upx)/2) !important;
	}

	.kp-grid-item1,
	.kp-grid-item2 {
		height: 207upx;
		border-radius: 10rpx;

	}

	.kp-grid-item1 {
		margin-right: 20upx;
	}

	.history-mask {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .6);
		position: absolute;
		top: 0rpx;
		z-index: 8888;
	}

	.history {
		width: 80%;
		height: calc(100vh - 220rpx);
		border-radius: 30rpx;
		position: absolute;
		left: 10%;
		top: 120rpx;

	}

	.history-item {
		width: 100%;
		height: calc(100% - 110rpx);
		overflow: scroll;
	}

	.history-btn {
		position: absolute;
		bottom: 14rpx;
		left: 50%;
		transform: translateX(-50%);
	}
</style>
