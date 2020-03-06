<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">我的评价</block>
		</cu-custom>
		<view class="padding-tb-xs">
			<view class="tui-cmt-box tui-mtop">
				<view v-if="item.status == 0" class="tui-cmt-content tui-padding radius" v-for="(item,index) in commentGoodslist"
				 :key="index" @click="details(item.scid)">
					<view class="tui-cmt-user">
						<image :src="item.user.avatar" class="tui-acatar"></image>
						<view class="tui-rate-user">{{item.user.nickname}}</view>
						<view class="tui-rate-box margin-left">
							<tui-rate class="tui-rate-img" :current="item.rate" @change="change" normal="#ccc" active="#ff7900" :size="11"
							 :quantity="5" :hollow="true"></tui-rate>
							<view class="text-gray tui-rate-text ">{{item.createTime}}</view>
						</view>

					</view>
					<view class="tui-cmt">
						<view class="kp-goods-name">{{item.comment}}</view>
						<image :src="i.imgpath" style="width: 180rpx;height: 180rpx;" v-for="(i,index) in item.shopCommentAlbumsList"
						 :key="index"></image>
					</view>

				</view>
			</view>
			<view v-if="currPage===totalPage||totalPage==''">
				<tui-divider width="80%">没有更多啦</tui-divider>
			</view>
		</view>
	</view>

</template>

<script>
	import {
		getcommentGoodslist
	} from "@/api/evluateApi.js"
	import tuiTag from "@/components/tag/tag"
	import tuiRate from "@/components/rate/rate"
	import tuiDivider from "@/components/divider/divider"
	export default {
		components: {
			tuiTag,
			tuiRate,
			tuiDivider
		},
		data() {
			return {
				loadding: false,
				show: false,
				current: 0,
				index: 3,
				commentGoodslist: [],
				uid: 1,
				userData: 0,
				currPage:1,
				totalPage: 1,
			}
		},
		mounted: async function() {
			//获取用户信息
			// let USERDATA = uni.getStorageSync("USERDATA");
			// if(USERDATA)
			// {
			// 	console.log("用户已登录")
			// 	this.userData = USERDATA;
			// }

			const commentGoodslist = await getcommentGoodslist(1, 10, this.uid)
			console.log(commentGoodslist)
			this.commentGoodslist = commentGoodslist.data.page.list
			this.totalPage = this.commentGoodslist.totalPage;
			this.loading = false;
		},
		onLoad() {
			this.$forceUpdate()
		},
		//刷新
		async onPullDownRefresh() {
			const commentGoodslist = await getcommentGoodslist(1, 10, this.uid)
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//加载
		onReachBottom: async function() {
			// console.log('触底')
			if (this.currPage == this.totalPage) return;
			this.currPage += 1;
			const commentGoodslist = await getcommentGoodslist(this.currPage, 10, this.uid)
			const loadData = commentGoodslist.data.myDemand;
			const list = this.commentGoodslist.list;
			this.commentGoodslist.list = list.concat(loadData.list)
			this.currPage = loadData.currPage;
		},
		methods: {
			change: function(e) {
				this.index = e.index;
				this.current = e.index
			},

			details(scid) {
				uni.navigateTo({
					url: "/pages/my-evaluate/evluate-detail/evluate-detail?scid=" + scid
				})
			}
		}
	}
</script>


<style>
	.kp-goods-name {
		padding-right: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		font-size: 32rpx !important;
		line-height: 1.5;
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
</style>
