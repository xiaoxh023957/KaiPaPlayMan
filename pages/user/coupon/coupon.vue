<template>
	<view>

		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">优惠券</block>
		</cu-custom>

		<view class="header" style="{'top':backbarHeight+'px'}">
			<view>您共有</view>
			<view class="coupon-num">{{CouponListres.length}}张</view>
			<view>可使用的优惠券</view>
		</view>

		<view class="coupon-list">
			<view class="coupon-item" v-for="(item,index) in CouponListres" :key="index">
				<view class="coupon">
					<image src="../../../static/img_fuwuquan_orange@3x.png" class="coupon-img"></image>
					<view class="circle-left"></view>
					<view class="circle-right"></view>
					<view class="left-tit-box">
						<view class="tit">{{item.couponType.ctypename}}</view>
						<view class="term">期限：{{item.expireTime }}</view>
					</view>
					<view class="right-detail" :data-index="index" @click="toggleShowDetail(index)">
						<text class="detail-txt">查看详情</text>
						<image :src="'../../../static/'+(item.spread?'home_icon_choose@3x':'icon_next@3x')+'.png'" :class="[item.spread?'spread':'arrow']"></image>
					</view>
				</view>
				<view :class=" 'hidden-box  div' + (item.spread ? ' show' : '')">
					<view class="list-item">
						<view class="item-tit num">券有效期：{{item.createTime }}至{{item.expireTime }}</view>
					</view>
					<view class="list-item">
						<view class="item-tit">适用商家：{{item.couponType.status}}</view>
					</view>
					<view class="explain">使用说明：</view>
					<view class="explain-text">{{item.couponType.couponRule}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		getCouponList
	} from '@/api/couponApi.js'

	export default {
		data() {
			return {
				CouponListres: [{
					couponType: {
						// ctypename: "五折优惠券",
						// status: "五一广场步步高、梅溪湖新天地",
						// couponRule: "只能在每周三使用，只能在每周三使用只能在每周三使用只能在每周三使用只能在每周三使用"
					},
					// expireTime: "2020-12-12 18：20",
					spread: false,
					// createTime: "2019-09-09 12:12"
				}],
				date: '',
				menuShow: false,
			}
		},
		mounted: async function() {
			// 列表
			this.getCoupons()
		},
		async onPullDownRefresh() {
			const CouponListres = await getCouponList(1, 20);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {

			async getCoupons() {
				const CouponListres = await getCouponList(1, 20);
				this.CouponListres = CouponListres.data.selectCouponList.list;
				console.log(CouponListres)
			},

			toggleShowDetail(index) {
				const couponList = JSON.parse(JSON.stringify(this.CouponListres))

				const coupon = couponList[index]

				coupon.spread = !coupon.spread;

				this.CouponListres = couponList


				console.log(this.CouponListres)
			},

			closeMenu: function() {
				this.menuShow = false
			},
			openMenu: function() {
				this.menuShow = true
			},
			previewImage: function(e) {
				let index = e.currentTarget.dataset.index;
				uni.previewImage({
					current: this.banner[index],
					urls: this.banner
				})
			},
		},

	}
</script>

<style lang="scss">
	page {
		background: #fff;
	}

	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.header {
		width: 100%;
		padding: 0 30upx;
		box-sizing: border-box;
		font-size: 24upx;
		color: #999;
		height: 54upx;
		/* line-height: 54upx; */
		background: #fff8d5;
		display: flex;
		align-items: center;
		/* position: fixed;
		top: 0; */
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		/* z-index: ; */
	}


	.coupon-num {
		color: #5677fc;
	}

	.coupon-list {
		width: 100%;
		padding: 54upx 50upx;
		box-sizing: border-box;
	}

	.coupon-item {
		margin-top: 20upx;
		width: 100%;
		box-shadow: 0 0 12upx 0 #eaeef1;
		border-radius: 2upx;

	}

	.coupon {
		height: 160upx;
		position: relative;
		display: flex;
		align-items: center;
		/* background: red */
	}

	.coupon-img {
		width: 100%;
		height: 160upx;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 0;
		background: #fff
	}

	.circle-left {
		position: absolute;
		left: -28upx;
		top: 64upx;
		height: 36upx;
		width: 36upx;
		border-radius: 18upx;
		background: #fff
	}

	.circle-right {
		position: absolute;
		top: 64upx;
		right: -25upx;
		height: 36upx;
		width: 36upx;
		border-radius: 18upx;
		background: #fff
	}

	.left-tit-box {
		width: 414upx;
		padding-left: 75upx;
		box-sizing: border-box;
		z-index: 10
	}

	.tit {
		width: 290upx;
		font-size: 30upx;
		color: #333;
		line-height: 42upx;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.term {
		width: 228upx;
		font-size: 24upx;
		color: #999;
		line-height: 24upx;
		padding-top: 7upx;
		white-space: nowrap;
	}

	.right-detail {
		width: 236upx;
		text-align: center;
		height: 160upx;
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 10
	}

	.detail-txt {
		font-size: 24upx;
		color: #fff;
		padding-right: 12upx;
	}

	.arrow {
		width: 16upx;
		height: 24upx;
	}

	.spread {
		width: 24upx;
		height: 16upx;
	}

	.qrcode {
		width: 260upx;
		height: 260upx;
		margin: 45upx auto 43upx auto;
	}

	.hidden-box {
		box-sizing: border-box;
		color: #333;
		border-top: 1upx solid #EAEEF1;
		height: 0;
		overflow: hidden;
	}


	.hidden-box.show {
		padding: 35upx 40upx 27upx 40upx;
		height: auto;
	}


	.code-tit {
		font-size: 28upx;
		line-height: 28upx;
	}

	.code-num {
		font-size: 30upx;
		line-height: 30upx;
		padding-top: 23upx;
		font-weight: bold;
	}

	.qrcode-box {
		width: 100%;
		border-bottom: 1upx dashed #eaeef1;
		margin-bottom: 6upx;
	}

	.list-item {
		height: 90upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28upx;
	}

	.list-item::after {
		left: 0;
	}

	.item-tit {
		color: #666;
	}

	.item-con {
		color: #333;
	}

	.explain {
		font-size: 28upx;
		line-height: 28upx;
		color: #666;
		padding: 33upx 0 25upx 0
	}

	.explain-text {
		font-size: 28upx;
		line-height: 41upx;
		color: #333;
	}

	.none {
		width: 100%;
		position: fixed;
		text-align: center;
		font-size: 30upx;
		color: #ccc;
		top: 49%;
	}
</style>
