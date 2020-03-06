<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">详情</block>
		</cu-custom>

		<view class="cu-card padding " :class="isCard?'no-card':'no-card'" style="overflow: scroll;">
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="{'background-image':'url('+findDetail.findUser.avatar+')'}"></view>
					<view class="content flex-sub">
						<view>{{findDetail.findUser.nickname}} </view>
						<view class="text-gray text-sm flex justify-between">
							{{findDetail.createTime}}
						</view>
					</view>
					<view class="text-gray text-sm text-right padding thumb-container">
						<text class="cuIcon-appreciatefill margin-lr-xs" :style="{'color':findDetail.likePraise?'red':''}" @click="toggleLike()"></text>
						{{findDetail.likeNumber}}
						<text class="cuIcon-messagefill margin-lr-xs"></text> {{findDetail.numberComments}}
					</view>
				</view>
			</view>
			<view class="text-content bg-white padding">
				{{findDetail.content}}
			</view>
			<view class=" flex-sub padding-lr bg-white padding-bottom" :class="isCard?'no-card':'no-card'">
				<view class="grid flex-sub padding-lr col-3 grid-squarse" v-for="(find,index) in findDetail.images" :key="index">
					<view class="bg-img" :style="{'background-image':'url('+find.imgpath+')'}"></view>
				</view>
			</view>
			<!-- 评论区域 -->
			<view class="padding radius margin-top-sm bg-white margin-bottom-xl padding-bottom-xl">
				<view v-for="(item,index) in findDetail.comments" :key="index">
					<view>{{item.commentUser.nickname}}：
						<text class="text-content">
							{{item.content}}
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-bar foot input" :style="[{bottom:InputBottom+'px'}]">
			<input class="solid-bottom" :adjust-position="false" :focus="false" maxlength="300" cursor-spacing="10" @focus="InputFocus"
			 @blur="InputBlur" placeholder="在这里发表您的见解吧" v-model="text"></input>
			<button class="cu-btn bg-green shadow" @click="save()">提交评论</button>
		</view>
	</view>
</template>

<script>
	import {
		getFindfid,
		commentsave,
		postpraiseAdd,
		postPraiseDelete
	} from '@/api/findApi.js'
	export default {
		data() {
			return {
				text: '',
				Findfid: {},
				findDetail: {
					findUser: {}
				},
				InputBottom: 0,
			};
		},
		async onLoad(option) {
			this.uid = option.uid;
			this.fid = option.fid;

			this.$nextTick(this.getFindDetail)
		},
		// 下拉刷新
		async onPullDownRefresh() {
			const findDetail = await getFindfid(this.uid);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},

			async getFindDetail() {
				try {
					const findDetail = await getFindfid(this.uid);
					this.findDetail = findDetail.data.data || {
						findUser: {
							avatar: ""
						},
						images: {
							imgpath: ""
						}
					};
				} catch (e) {
					//TODO handle the exception
				}
			},

			async toggleLike() {
				try {
					if (this.findDetail.likePraise) {
						// 调用删除点赞接口
						const praise = this.findDetail.praises.find(p => p.uid == this.uid)
						if (praise) {
							console.log(praise)
							await postPraiseDelete(praise.fpid);
							this.getFindDetail();
						}
					} else {
						const fmsFindPraise = {
							fid: this.fid,
							uid: this.uid,
						};
						// 调用新增点赞接口
						await postpraiseAdd(fmsFindPraise);
						this.getFindDetail();
					}
					//刷新
				} catch (e) {
					//TODO handle the exception
					console.error(e);
				}

			},


			async save() {
				let save = {
					content: this.text,
					// imgpath:this.imgList,
					uid: this.uid,
					fid: this.fid,

				};
				// console.log(this.fid)
				// 保存数据
				const result = await commentsave(save);

				// 再次请求
				const Findfid = await getFindfid(this.fid);
				this.Findfid = Findfid.data;
				// console.log(this.Findfid)
				// 覆盖之前数据就加载数据后面
				this.findDetail.comments = Findfid.data.data.comments;
				// console.log(this.findDetail.comments)
				// 清空text
				this.text = "";
				uni.showToast({
					mask: true,
					title: '提交成功',
					duration: 1000
				})
				uni.navigateBack()
			},
			isCard(e) {
				this.isCard = e.detail.value
			}
		}
	}
</script>

<style>
	.thumb-container {
		position: absolute;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		height: 50px;
		z-index: 1000;
	}
</style>
