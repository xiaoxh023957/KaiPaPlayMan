<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">文章详情</block>
		</cu-custom>
		<view class="container">
			<view class="tui-news-title">
				{{articledetail.title}}
			</view>
			<view class="tui-sub-info">
				<view class="tui-sub-left">
					<text>{{articledetail.createTime}}</text>
				</view>
			</view>
			<view class="uni-padding-wrap">
				<view class="uni-common-mt" style="background:#FFF; padding:30rpx;">
					<rich-text :nodes="articledetail.content"></rich-text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {getarticledetail}from '@/api/article.js'
	export default {
		data() {
			return {
				id: 1,
				articledetail: {}
			}
		},
		onLoad(options) {
			this.id = options.aid;
		},

		mounted: async function() {
			const articledetail = await getarticledetail(this.id);
			// console.log(articledetail)
			this.articledetail = articledetail.data.Article;
			this.loading = false;
		},
		async onPullDownRefresh() {
			const articledetail = await getarticledetail(this.id);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {}
	}
</script>

<style>
	page {
		background: #fff;
		color: #333;
	}

	.container {
		padding: 40rpx 30rpx 110rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-news-title {
		font-size: 48rpx;
		font-weight: 500;
		text-align: justify;
	}

	.tui-sub-info {
		padding-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 28rpx;
		color: #999;
	}

	.tui-author {
		color: #5677fc;
		padding-right: 20rpx;
	}

	.tui-news-content {
		padding-top: 40rpx;
	}

	.tui-article {
		/* text-indent: 2em; */
		font-size: 34rpx;
		padding-bottom: 40rpx;
		line-height: 60rpx;
		text-align: justify;
		word-break: break-all;
		word-wrap: break-word;
	}

	.tui-article-pic {
		width: 100%;
		display: block;
		margin-bottom: 40rpx;
	}

	.tui-news-source {
		font-size: 24rpx;
		color: #999;
	}
</style>

