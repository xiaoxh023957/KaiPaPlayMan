<template>
	<view>
		<view class="tui-cmt-box tui-mtop ">
			<view class="tui-cmt-content tui-padding" v-for="(item,index) in 10" :key="index">
				<view class="tui-cmt-user">
					<image src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572343334017&di=37e65116cd725fef502a5ca99828cc20&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201802%2F28%2F20180228021403_NyFur.jpeg"
					 class="tui-acatar"></image>
					<view class="tui-rate-user">匿名用户</view>
					<view class="tui-rate-box">
						<tui-rate class="tui-rate-img" :current="index" @change="change" normal="#ccc" active="#ff7900" :size="11"
						 :quantity="5" :hollow="true"></tui-rate>
						<view class="text-gray tui-rate-text ">2019年10月14日</view>
					</view>

				</view>
				<view class="tui-cmt">物流很快，很适合我的风格❤物流很快，很适合我的风格❤物流很快，很适合我的风格❤物流很快，很适合我的风格❤物流很快，很适合我的风格❤物流很快，很适合我的风格❤</view>

				<view style=" padding-left:96rpx">
					<view class="grid col-3 padding-xs">
						<view style="height:160rpx; background-size:100%;" v-for="(item,index) in imgList" :key="index" :style="{'background-image':'url('+item+') '}"></view>
					</view>
				</view>


			</view>
		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
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
				isCard: true,
				imgList: ["https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2960677927,138788196&fm=26&gp=0.jpg",
					"https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2960677927,138788196&fm=26&gp=0.jpg"
				],
				commentData:{},
			}
		},
		async mounted() {
			const commentRes = await getCommentGoodsList(1,10,this.gid);
			this.commentData = commentRes.data
			console.log(this.goodsData)
		},
		methods: {
			common: function() {
				this.tui.toast("功能开发中~")
			},
			change: function(e) {
				this.index = e.index;
				this.current = e.index
			}
		}
	}
</script>


<style>
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
</style>
