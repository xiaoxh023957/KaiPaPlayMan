<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">评价详情</block>
			<block slot="right">
				<view class="padding-right" shape="circle" @click='openActionSheet()'>删除</view>
			</block>
		</cu-custom>

		<tui-actionsheet :show="showActionSheet" :tips="tips" :item-list="itemList" :mask-closable="maskClosable" :color="color"
		 :size="size" :is-cancel="isCancel" @click="itemClick" @cancel="closeActionSheet"></tui-actionsheet>
		<view class="padding-tb-xs ">
			<view class="tui-cmt-box tui-mtop  ">
				<view class="tui-cmt-content tui-padding radius">
					<view class="tui-cmt-user">
						<image :src="shopCommentInfo.user.avatar" class="tui-acatar"></image>
						<view class="tui-rate-user">{{shopCommentInfo.user.nickname}}</view>
						<view class="tui-rate-box margin-left">
							<tui-rate class="tui-rate-img " :current="shopCommentInfo.rate" @change="change" normal="#ccc" active="#ff7900"
							 :size="11" :quantity="5" :hollow="true"></tui-rate>
							<view class="text-gray tui-rate-text ">{{shopCommentInfo.createTime}}</view>
						</view>
					</view>
					<view class="tui-cmt ">

						<view class="padding-bottom-xs">{{shopCommentInfo.comment}}</view>
						<image style="width: 180rpx;height: 180rpx;" v-for="(item,index) in shopCommentInfo.shopCommentAlbumsList" :key="index"
						 :src="item.imgpath"></image>
					</view>
				</view>
			</view>
			<view>
				<view class="cu-list menu-avatar">
					<view class="cu-item" style="height: 180rpx;" :class="modalName=='move-box-'+ index?'move-cur':''" :data-target="'move-box-' + index">
						<view class="cu-avatar lg margin-left-xs" :style="[{backgroundImage:'url('+shopCommentInfo.goods.coverImgpath+')'}]"
						 style="width: 130rpx; height: 130rpx;"></view>
						<view class="content margin-left-lg ">
							<text class="text-grey kp-goods-name text-left margin-bottom-xs">{{shopCommentInfo.goods.gname}}</text>
							<view class="text-orange">￥{{shopCommentInfo.goods.price}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		getshopCommentInfo,
		updateshopComment
	} from "@/api/evluateApi.js"
	import tuiButton from "@/components/button/button"
	import tuiActionsheet from "@/components/actionsheet/actionsheet"
	import tuiTag from "@/components/tag/tag"
	import tuiRate from "@/components/rate/rate"
	import tuiDivider from "@/components/divider/divider"
	export default {
		components: {
			tuiButton,
			tuiActionsheet,
			tuiTag,
			tuiRate,
			tuiDivider
		},
		data() {
			return {
				CustomBar: this.CustomBar,
				modalName: null,
				loadding: false,
				show: false,
				current: 0,
				index: 3,
				showActionSheet: false,
				maskClosable: true,
				tips: "确认删除此评论吗？",
				itemList: [],
				color: "#9a9a9a",
				size: 26,
				isCancel: true,
				shopCommentInfo: {},
				scid: 1,
			}
		},
		onLoad(option) {
			this.scid = option.scid
		},
		mounted: async function() {
			const shopCommentInfo = await getshopCommentInfo(this.scid)
			// console.log(shopCommentInfo)
			this.shopCommentInfo = shopCommentInfo.data.ShopComment
		},
		async onPullDownRefresh() {
			const shopCommentInfo = await getshopCommentInfo(this.scid)
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			async save() {
				const result = await putStockUpdate(this.stockDateObj);
				console.log(result)
				uni.navigateBack({
					delta: 2
				})
			},
			// closeActionSheet: function() {
			// 	this.showActionSheet = false
			// },
			openActionSheet: async function() {
				let that = this
				uni.showModal({
					// title: '确定删除吗',
					content: '确定删除吗',
					success: async function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
							let saveData = that.shopCommentInfo;
							saveData.status = 1
							console.log(saveData)
							const result = await updateshopComment(saveData);
							uni.navigateBack({
								delta: 2
							})
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					}
				});
			},

			itemClick: function(e) {
				let index = e.index;
				this.closeActionSheet();
				this.tui.toast(`您点击的按钮索引为：${index}`)
			}
		}
	}
</script>


<style>
	.kp-goods-name {
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 28rpx !important;
		line-height: 1.5;
		text-align: left !important;
	}

	.tui-padding {
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.tui-cmt-content {
		border-top: 2rpx solid #F0F0F0;
		margin-bottom: 30rpx;
	}

	.tui-cmt-box {
		background: #fff;
	}

	/* .tui-mtop {
		margin-top: 26rpx;
	} */
	/* .tui-radius-all {
		border-radius: 24rpx;
		overflow: hidden;
	} */
	.tui-list-cell {
		display: flex;
		align-items: center;
		font-size: 26rpx;
		line-height: 26rpx;
		padding: 36rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-list-cell::after {
		content: '';
		position: absolute;
		border-bottom: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
		bottom: 0;
		right: 0;
		left: 126rpx;
	}

	.tui-last::after {
		border-bottom: 0 !important;
	}

	.tui-bold {
		font-weight: bold;
	}

	.tui-between {
		justify-content: space-between !important;
	}

	.tui-cmt {
		width: 600rpx;
		margin-top: 20rpx;
		position: relative;
		left: 100rpx;
	}

	.tui-cmt {
		width: 540rpx;
		padding: 14rpx 0;
	}

	.tui-padding {
		padding: 0 30rpx;
		padding-top: 10rpx;
		box-sizing: border-box;
	}

	.tui-cmt-user {
		margin-top: 10rpx;
		display: flex;
		position: relative;
	}

	.tui-acatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
		display: block;
		margin-right: 16rpx;
	}

	.tui-attr {
		font-size: 24rpx;
		color: #999;
		padding: 6rpx 0;
	}

	.tui-rate-user {
		height: 50rpx;
		display: flex;
		align-items: flex-end;
	}

	.tui-rate-box {
		box-sizing: border-box;
		height: 40rpx;
		background: #fff;
		display: flex;
		position: relative;
	}

	.tui-rate-img {
		position: absolute;
		left: -120rpx;
		top: 68rpx;
	}

	.tui-rate-text {
		width: 230rpx;
		height: 40rpx;
		line-height: 40rpx;
		font-size: 20rpx;
		position: absolute;
		left: 35rpx;
		top: 70rpx;
	}

	.tui-rate-box {
		background-color: transparent !important;
	}

	.tui-divider-text {
		background-color: transparent !important;
	}

	.container {
		padding: 20upx 0 120upx 0;
		box-sizing: border-box;
	}

	.header {
		padding: 80upx 90upx 60upx 90upx;
		box-sizing: border-box;
	}

	.title {
		font-size: 34upx;
		color: #333;
		font-weight: 500;
	}

	.sub-title {
		font-size: 24upx;
		color: #7a7a7a;
		padding-top: 18upx;
	}

	.tui-btn-box {
		padding: 10upx 40upx;
		box-sizing: border-box;
	}

	.tui-btn-class {
		margin-top: 36upx;
	}

	.tui-keyboard-tips {
		width: 100%;
		height: 120upx;
		line-height: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 30upx;
		background: #fff;
		position: relative;
		color: #333;
		border: 0;
	}

	.tui-digital-box {
		background: #fff;
		padding-bottom: 50upx;
		border: 0;
	}
</style>
