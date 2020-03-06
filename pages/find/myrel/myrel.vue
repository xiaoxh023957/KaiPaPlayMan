<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">我的发现</block>
		</cu-custom>

		<view v-if="!loading" class="cu-card dynamic margin-top-sm" :class="isCard?'no-card':'no-card'" v-for="(item,index) in findListres.list"
		 :key="index">
			<view class="cu-item shadow" @click="my(item.uid,item.fid)">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="{'background-image':'url('+item.findUser.avatar+')'}"></view>
						<view class="content flex-sub">
							<view>{{item.findUser.nickname}}</view>
							<view class="text-gray text-sm flex justify-between">
								{{item.createTime}}
							</view>
						</view>
					</view>
				</view>
				<view class="text-content text-cut ">
					{{item.content}}
				</view>
				<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
					<view class="grid flex-sub padding-lr col-3 grid-square">
						<view v-for="(image,index) in item.images" class="bg-img" :style="{'background-image':'url('+image.imgpath+')'}"
						 :key="index"></view>
					</view>
				</view>
				<view class=" padding-sm radius margin-top-sm  text-sm bg-white ">
					<view>
						<view class="flex" v-for="(comment,index) in item.comments" :key="index">
							<view>{{comment.commentUser.nickname}}：</view>
							<view class=" text-df margin-right text-cut" style="width: 75%;">
								{{comment.content}}
							</view>
						</view>
					</view>

					<view class="text-gray text-sm text-right padding">
						<text class="cuIcon-appreciatefill margin-lr-xs" :style="{'color':item.likePraise?'red':''}" @click.stop="toggleLike(item)"></text>
						{{item.likeNumber}}
						<text class="cuIcon-messagefill margin-lr-xs"></text> {{item.numberComments}}
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
	import {
		getmyFindList,
		postPraiseDelete,
		postpraiseAdd
	} from "@/api/findApi.js"
	import tuiDivider from "@/components/divider/divider"
	export default {
		components: {
			tuiDivider,
		},
		data() {
			return {
				findListres: {},
				isCard: false,
				loading: true,
				currPage:1,
				totalPage: 1,
			};
		},
		mounted: async function() {
			this.getfind();
			this.loading = false;
		},
		// 下拉刷新
		async onPullDownRefresh() {
			this.getfind();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		// 上拉加载
		onReachBottom: async function() {
			// console.log('触底')
			if (this.currPage == this.totalPage) return; //
			this.currPage += 1;
			const findListres = await getmyFindList(this.currPage, 10, this.uid);
			const loadData = findListres.data.page;
			const list = this.findListres.list;
			this.findListres.list = list.concat(loadData.list)
			this.currPage = loadData.currPage;
		},
		
		methods: {
			async getfind() {
				// 发现列表
				const findListres = await getmyFindList(1, 10, this.uid);
				this.findListres = findListres.data.page;
				this.totalPage = this.findListres.totalPage;

			},
			IsCard(e) {
				this.isCard = e.detail.value
			},
			my(uid, fid) {
				uni.navigateTo({
					url: "/pages/find/myrel/detail?uid=" + uid + "&&fid=" + fid,
				})
			},

			/**
			 * 切换点赞
			 * @param {Object} item
			 */
			async toggleLike(item) {

				try {
					// debugger
					if (item.likePraise) {
						// 调用删除点赞接口
						const praise = item.praises.find(p => p.uid == this.uid)
						if (praise) {
							console.log(praise)
							await postPraiseDelete(praise.fpid);
							this.getfind();
						}
					} else {
						const fmsFindPraise = {
							fid: item.fid,
							uid: this.uid,
						};
						// 调用新增点赞接口
						await postpraiseAdd(fmsFindPraise);
						this.getfind();
					}
					//刷新
				} catch (e) {
					//TODO handle the exception
					console.error(e);
				}
			},
		}
	}
</script>

<style>

</style>
