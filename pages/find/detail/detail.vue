<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">详情</block>
		</cu-custom>

		<view class="cu-card padding" :class="isCard?'no-card':'no-card'" style="overflow: scroll;">
			<view class="cu-list menu-avatar">
				<view class="cu-item">
					<view class="cu-avatar round lg" :style="{'background-image':'url('+findListres.findUser.avatar+')'}"></view>
					<view class="content flex-sub">
						<view>{{findListres.findUser.nickname}} </view>
						<view class="text-gray text-sm flex justify-between">
							{{findListres.createTime}}
						</view>
					</view>
					<view class="text-gray text-sm text-right padding thumb-container">
						<text class="cuIcon-appreciatefill margin-lr-xs"
							  :style="{'color': findListres.likePraise  ? 'red':''}"
							  @click="toggleLike(findListres)">
						</text>
						{{findListres.likeNumber}}
						<text class="cuIcon-messagefill margin-lr-xs"></text> {{findListres.numberComments}}
					</view>
				</view>
			</view>
			<view class="text-content bg-white padding">
				{{findListres.content}}
			</view>
			<view class=" flex-sub padding-lr bg-white padding-bottom" :class="isCard?'no-card':'no-card'">
				<view class="grid flex-sub padding-lr col-3 grid-square">
					<view v-for="(image,index) in findListres.images" class="bg-img" :style="{'background-image':'url('+image.imgpath+')'}"
					 :key="index"></view>
				</view>
			</view>
			<!-- 评论区域 -->
			<view class="padding radius margin-top-sm bg-white  padding-bottom-xl margin-bottom-xl" v-if="findListres.comments.length>0">
				<view v-for="(item,index) in findListres.comments" :key="index">
					<view>{{item.commentUser.nickname}}:
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
		getmyFinduid,
		getFindfid,
		commentsave,
		getcommentinfo,
		getFindList,
		getPraisePage,
		postpraiseAdd,
		postPraiseDelete
	} from '@/api/findApi.js'
	export default {
		data() {
			return {
				fid: 1,
				text: '',
				Findfid: {},
				commentinfo: {},
				commentsaveres: {},
				findListres: {
					findUser: {
						avatar: ""
					},
					images: {
						imgpath: ""
					}
				},
				IsCard: false,
				isLoading: true,
				InputBottom: 0,
				uid: 0
			};
		},
		async onLoad(option) {
			this.fid = option.fid;
			this.uid = option.uid;
			this.$nextTick(this.getFindDetail)
		},
		methods: {

			async getFindDetail() {
				try {
					const findListres = await getFindfid(this.fid);
					this.findListres = findListres.data.data;
					console.log(this.findListres);
				} catch (e) {
					//TODO handle the exception
				}
			},

			async toggleLike(findListres) {
				try {
					if (findListres.likePraise) {
						// 调用删除点赞接口
						const praise = findListres.praises.find(p => p.uid == this.uid)
						if (praise) {
							await postPraiseDelete(praise.fpid);
						}
					} else {
						const fmsFindPraise = {
							fid: findListres.fid,
							uid: this.uid,
						};
						// 调用新增点赞接口
						await postpraiseAdd(fmsFindPraise);
					}

					this.getFindDetail()
					//刷新
					// this.$forceUpdate()
				} catch (e) {
					//TODO handle the exception
					// console.error(e);
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
				this.findListres.comments = Findfid.data.data.comments;
				// console.log(this.findListres.comments)
				// 清空text
				this.text = "";
			},
			isCard(e) {
				this.isCard = e.detail.value
			},
			handlePraise(find) {
				find.like = !find.like
			},
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			}
		},
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
