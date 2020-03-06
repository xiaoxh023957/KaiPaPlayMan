<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">发表评价</block>
			<block slot="right">
				<view class="margin-right text-white" @click="save()">发布</view>
			</block>
		</cu-custom>
		<block v-if="!loading">
			<tui-toast ref="toast"></tui-toast>
			<view class=" margin-xs ">
				<view class="bg-white flex cf" style="height: 190rpx;">
					<image class="margin-xs margin-left-xs" :src="goods.coverImgpath" style="width: 20%;height: 160rpx;"></image>
					<view class="fl  margin-top-xs margin-left-xs text-xl" style="width: 70%;height: 100rpx;">
						<view class="kp-goods-name" style="min-height: 90rpx;">
							{{goods.gname}}
						</view>
						<view class="text-red text-lg">
							¥{{goods.price}}
						</view>
					</view>
				</view>

				<view class="tui-rate-box padding-tb">
					<view class="tui-title padding-left-xs">商品评价</view>
					<tui-rate :current="current0" @change="change0" class="tui-rate"></tui-rate>
					<view class="text-orange margin-left-xs">{{rating(current0)}}</view>
				</view>
			</view>
			<view>
				<view class="cu-form-group">
					<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="请输入商品评价" v-model='comment0'></textarea>
				</view>
				<view class="cu-form-group" style="border-top: none;">
					<view class="grid col-3 grid-square flex-sub">
						<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							<image :src="imgList[index]" mode="aspectFill"></image>
							<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
								<text class='cuIcon-close'></text>
							</view>
						</view>
						<view class="solids" @tap="ChooseImage" v-if="imgList.length<6">
							<text class='cuIcon-cameraadd'>
								<text class="text-df">添加图片</text>
							</text>
						</view>
					</view>
				</view>
			</view>


			<view class="tui-rate-box padding-tb margin-top">
				<view class="tui-title padding-left-xs">店铺评价</view>
				<tui-rate :current="current1" @change="change1" class="tui-rate"></tui-rate>
				<view class="text-orange margin-left-xs">{{rating(current1)}}</view>
			</view>
			<view class="">
				<view class="cu-form-group">
					<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="请输入店铺评价" v-model='comment1'></textarea>
				</view>
			</view>
		</block>

	</view>
</template>
<script>
	import tuiRate from "@/components/rate/rate"
	import tuiToast from "@/components/extend/toast/toast"
	import $http from '@/js_sdk/zhouWei-request/requestConfig';
	import {
		getGoodsDetail
	} from "@/api/storeDetailApi.js"
	import {
		getOrderDetail
	} from '@/api/orderApi.js'
	import {
		saveEvaluate,
		updateOrderStatus
	} from '@/api/orderEvaluate.js'

	export default {
		components: {
			tuiRate,
			tuiToast
		},
		data() {
			return {
				loading: true,
				show: false,
				current0: 0,
				current1: 0,
				comment0: '',
				comment1: '',
				index: 3,
				imgList: [],
				modalName: null,
				orderData: {},
				goods: {},
				gid: 1,
				uid: 1,
				oid: 0
			}
		},
		onLoad(options) {
			this.oid = options.oid
		},
		async mounted() {
			// 获取订单详情getOrderDetail
			const orderDataRes = await getOrderDetail(this.oid);
			this.orderData = orderDataRes.data.orderId;
			this.goods = this.orderData.details[0].goods;
			console.log(this.orderData)

			this.loading = false;

		},

		methods: {
			showToast() {
				let params = {
					title: "评论成功",
					// imgUrl: "/static/images/toast/check-circle.png",
					icon: 'none'
				};

				this.$refs.toast.show(params)
			},
			//	评分
			change0: function(e) {
				this.index = e.index;
				this.current0 = e.index
			},
			change1: function(e) {
				this.index = e.index;
				this.current1 = e.index
			},

			async save() {
				if (this.current0 == 0) {
					uni.showToast({
						title: "请给商品打分",
						icon: 'none'
					})

				} else if (this.current1 == 0) {

					uni.showToast({
						title: "请给商家打分",
						icon: 'none'
					})
				} else {
					let imgData = [];
					for (let i = 0; i < this.imgList.length; i++) {
						let obj = {
							imgpath: this.imgList[i]
						}
						imgData.push(obj)
					}
					// console.log(imgData)

					let GEdata = {
						"comment": this.comment0,
						"gid": this.goods.gid,
						"rate": this.current0,
						"shopCommentAlbumsList": imgData,
						"sid": this.goods.sid,
						"type": 0,
						"uid": this.uid,
					}

					let SEdata = {
						"comment": this.comment1,
						"gid": this.goods.gid,
						"rate": this.current1,
						// "shopCommentAlbumsList": imgData,
						"sid": this.goods.sid,
						"type": 1,
						"uid": this.uid,
					}
					const Gres = await saveEvaluate(GEdata) //提交商品评论
					const Sres = await saveEvaluate(SEdata) //提交店铺评论

					//修改订单状态
					const order = this.orderData;
					order.status = 3;

					const res = await updateOrderStatus(order) //更改状态
					console.log(order)

					this.showToast();

					setTimeout(function() {
						uni.navigateTo({
							url: '/pages/user/order/order'
						})
					}, 2000)

				}
			},

			rating(cur) {
				if (cur == 0) {
					return '';
				} else if (cur > 0 && cur <= 2) {
					return '一般'
				} else if (cur <= 3) {
					return '好'
				} else {
					return '非常好'
				}
			},
			async ChooseImage() {
				const that = this;
				await this.$http.qnImgUpload({
						count: 6, //默认 9
						sizeType: ['original', 'compressed'], //默认 ['original', 'compressed']
						sourceType: ['album', 'camera'], //默认 ['album','camera']
					},
					(res) => {
						that.imgList.push(that.$QNDOMAIN + res)
					});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '提示',
					content: '确定要删除这张照片吗？',
					cancelText: '再想想',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			}
		}
	}
</script>

<style>
	.title {
		font-size: 34upx;
		color: #333;
	}

	.sub-title {
		font-size: 24upx;
		color: #7a7a7a;
		padding-top: 18upx;
	}

	.tui-rate {
		padding-left: 40rpx;
	}

	.tui-rate-box {
		box-sizing: border-box;
		background: #fff;
		font-size: 30upx;
		display: flex;
		align-items: center;
	}

	.tui-title {
		font-size: 40upx;
	}

	.kp-goods-name {
		padding-right: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 32rpx !important;
		line-height: 1.5;
	}
</style>
