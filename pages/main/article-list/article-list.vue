<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">热点文章</block>
		</cu-custom>
		<view v-if="!loading">
			<tui-card :full="true" v-for="(item,index) in articleList.list" :key="index" @click="details(item.aid)">
				<template v-slot:body>
					<view class="tui-default text-lg/">
						{{item.title}}
					</view>
				</template>
				<template v-slot:footer>
					<view class="tui-default text-gray">
						{{item.createTime}}
					</view>
				</template>
			</tui-card>

			<view v-if="currPage===totalPage||totalPage==''">
				<tui-divider width="80%">没有更多啦</tui-divider>
			</view>
		</view>

	</view>
</template>

<script>
	import tuiCard from "@/components/card/card"
	import tuiDivider from "@/components/divider/divider"
	import {
		getNewsList
	} from "@/api/mainApi.js"
	export default {
		components: {
			tuiCard,
			tuiDivider
		},
		data() {
			return {
				loading: true,
				articleList: {},
				totalPage: 1,
				currPage: 1,
				card: [{
						header: {
							bgcolor: "#F7F7F7",
							line: true
						}
					},
					{
						header: {
							line: true
						}
					}
				]
			}
		},
		async mounted() {
			//获取文章列表
			const articleListRes = await getNewsList(1, 10);
			this.articleList = articleListRes.data.page;
			this.totalPage = this.articleList.pages;
			this.currPage = this.articleList.current;
			console.log(this.articleList)

			this.loading = false;
		},
		//下拉刷新
		async onPullDownRefresh() {
			const articleListRes = await getNewsList(1, 10);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		// 上拉加载
		onReachBottom: async function() {
			// console.log('触底')
			if (this.currPage == this.totalPage) return; //
			this.currPage += 1;
			const articleListRes = await getNewsList(1, 10);
			const loadData = articleList.data.page;
			const list = this.articleList.list;
			this.articleList.list = list.concat(loadData.list)
			this.currPage = loadData.currPage;
		},
		methods: {
			details(aid) {
				uni.navigateTo({
					url: "/pages/main/article-list/details/details?aid=" + aid
				})
			},
		}
	}
</script>

<style>
	.tui-default {
		padding: 20upx 30upx;
	}
</style>
