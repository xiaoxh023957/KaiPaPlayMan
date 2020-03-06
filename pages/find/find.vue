<template>
	<view>
		
		<cu-custom bgColor="kpbg-black" :isBack="false">
			<block slot="backText">返回</block>
			<block slot="content">
				<view class="text-white">开趴 - KP</view>
			</block> 
		</cu-custom>
		<view class="cu-item text-center padding-lg kpbg" style="height: 360rpx;" :style="{'background-image':'url('+userData.avatar+')'}">
			<view class="kp-drag">
				<!-- 头像 -->
				<view class="cu-avatar round margin-top-xs" style="height: 140rpx;width: 140rpx;" :style="{'background-image':'url('+userData.avatar+')'}"></view>
				<view class=" text-cut margin-auto text-lg  padding -xs" style="text-shadow: 6upx 6upx 8upx rgba(26, 26, 26, 0.2)">
					{{userData.nickname}}
				</view>

				<view class="margin-auto">
					<view class="cu-tag round bg-gray padding-lr margin-right" @click="rel(uid)">发布</view>
					<view class="cu-tag round bg-yellow padding-lr margin-left" @click="myrel(uid)">我发布的</view>
				</view>
			</view>
		</view>

		<view class="cu-card dynamic margin-top-sm" :class="isCard?'no-card':'no-card'" v-for="(item,index) in findListres.list"
		 :key="index">
			<view class="cu-item shadow" @click="detail(item.fid)">
				<view class="cu-list menu-avatar">
					<view class="cu-item">
						<view class="cu-avatar round lg" :style="{'background-image':'url('+item.findUser.avatar+')'}"></view>
						<view class="content flex-sub">
							<view class="text-cut" style="width: 80%;height: 60rpx;overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{item.findUser.nickname}}</view>
							<view class="text-gray text-sm flex justify-between">{{item.createTime}}</view>
						</view>
					</view>
				</view>
				<view class="text-content text-cut">{{item.content}}</view>
				<view class="grid flex-sub padding-lr" :class="isCard?'col-3 grid-square':'col-1'">
					<view class="grid flex-sub padding-lr col-3 grid-square">
						<view v-for="(image,index) in item.images" class="bg-img" :style="{'background-image':'url('+image.imgpath+')'}"
						 :key="index"></view>
					</view>
				</view>
				<!-- 评论 -->
				<view class="padding-sm radius margin-top-sm text-sm bg-white">
					<view>
						<view class="flex" v-for="(comment,index) in item.comments" :key="index">
							<view>{{comment.commentUser.nickname}}：</view>
							<view class="text-df margin-right text-cut" style="width: 75%;">{{comment.content}}</view>
						</view>
					</view>

					<view class="text-gray text-sm text-right padding">
						<text class="cuIcon-appreciatefill margin-lr-xs" :style="{'color': item.likePraise == true ? 'red' : ''}"
						 @click.stop="toggleLike(item)"></text>
						{{item.likeNumber}}
						<text class="cuIcon-messagefill margin-lr-xs"></text>
						{{item.numberComments}}
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
		getFindList,
		postpraiseAdd,
		postPraiseDelete,
	} from "@/api/findApi.js";
	import tuiDivider from "@/components/divider/divider"
	export default {
		components: {
			tuiDivider,
		},
		data() {
			return {
				isCard: false,
				findListres: {},
				uid: 1,
				currPage:1,
				totalPage: 1,
				userData:{
					avatar:"",
					nickname:"测试"
				},
				praiseAdd: {},
				PraiseDelete: {},
				getmyFind: {
					findUser: {
						avatar: ""
					},
					images: {
						imgpath: ""
					}
				},
			};
		},
		mounted: async function() {
			let userInfo = uni.getStorageSync("USERDATA");
			if(!userInfo)
			{
				uni.redirectTo({
					url: '/pages/register/register'
				});
			}
			this.userData = userInfo;
			this.uid = userInfo.uid;
			// 发现列表
			this.getfind();
		},
		
		async onLoad(option) {
			//this.uid = option.uid;
			
			
		},
		
		//下拉刷新
		async onPullDownRefresh() {
			const findListres = await getFindList(1, 10, this.uid);
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		//上拉刷新
		onReachBottom: async function() {
			// console.log('触底')
			if (this.currPage == this.totalPage) return; //
			this.currPage += 1;
			const findListres = await getFindList(this.currPage, 10, this.uid);
			const loadData = findListres.data.page;
			const list = this.findListres.list;
			this.findListres.list = list.concat(loadData.list)
			this.currPage = loadData.currPage;
		},
		methods: {
			async getfind() {
				// 发现列表
				const findListres = await getFindList(1, 10, this.uid);
				this.findListres = findListres.data.page;
				this.totalPage = this.findListres.totalPage;
				console.log(this.findListres)
			},

			async toggleLike(item) {

				try {
					if (item.likePraise) {
						// 调用删除点赞接口
						const praise = item.praises.find(p => p.uid == this.uid)
						if (praise) {
							// console.log(praise)
							await postPraiseDelete(praise.fpid);
							this.getfind();
						} 
					}else  {
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
					// console.error(e);
				}
			},
			IsCard(e) {
				this.isCard = e.detail.value;
			},
			detail(fid) {
				uni.navigateTo({
					url: "/pages/find/detail/detail?fid=" + fid + '&uid=' + this.uid
				});
			},
			rel(uid) {
				uni.navigateTo({
					url: "/pages/find/release/release?uid="+uid
				});
			},
			myrel(uid) {
				uni.navigateTo({
					url: "/pages/find/myrel/myrel?uid=" + uid
				});
			}
		}
	};
</script>

<style>
	.show {
		color: red;
	}
</style>
