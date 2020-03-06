<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">退款</block>
		</cu-custom>

		<view v-if='!loading'>


			<view class="cu-list menu-avatar margin-xs bg-white">
				<view class="padding bg-white cf">
					<view class="cu-avatar radius lg fl" :style="{'background-image':'url('+goods.coverImgpath+')'}"></view>
					<view class="content fl ">
						<view class="margin-left kp-goods-name ">{{goods.gname}}</view>
						<view class="text-gray text-cut margin-left margin-top-sm" >
							下单时间：<text>{{orderData.createTime}}</text>
						</view>
						<view class="text-gray  text-cut margin-left" >
							预定时间：<text>{{orderData.details[0].reserveDate}}</text>
						</view>
					</view>
				</view>

			</view>
			<view class="padding bg-white margin-xs">
				订单总价：￥{{orderData.totalAmount}}
			</view>
			<view class="padding bg-white margin-xs">
				<view>退款理由：</view>
				<view class="cu-form-group margin-top" style="border: 1rpx solid #F1F1F1;">
					<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="请输入退款理由" v-model="reason"></textarea>
				</view>
			</view>
			<view class="padding-lr-xl margin-top-xl">
				<button class="round bg-red" shape="circle" @click='save'>提交申请</button>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiActionsheet from "@/components/actionsheet/actionsheet"
	import {
		getOrderDetail
	} from '@/api/orderApi.js'

	import {
		updateOrderStatus
	} from '@/api/orderEvaluate.js'

	export default {
		components: {
			tuiActionsheet,
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
				tips: '',
				itemList: [],
				color: "#9a9a9a",
				size: 26,
				isCancel: true,
				textareaAValue: '',
				loading: true,
				orderId: 0,
				orderData: {},
				reason: ''
			}
		},
		onLoad(option) {
			this.orderId = option.oid;
		},
		async mounted() {

			//获取订单详情
			const orderDataRes = await getOrderDetail(this.orderId);
			this.orderData = orderDataRes.data.orderId;
			this.goods = this.orderData.details[0].goods;
			console.log(this.orderData)


			this.loading = false;
		},
		methods: {
			//提交退款申请
			async save() {
				if(this.reason == ''){
					uni.showToast({
						title:'请输入退款理由',
						icon:'none'
					})
				}else{
					const saveData = {
						orderId: this.orderId,
						status: 5,
						refundReason: this.reason,
						refundAmount: this.orderData.totalAmount 
					}
					
					const res = await updateOrderStatus(saveData) //更改状态
					
					
					this.openActionSheet();
				}
		
			},
	
			openActionSheet: function() {
				uni.showToast({
					title: '提交成功',
				})
				setTimeout(() => {
					uni.navigateTo({
						url: '/pages/user/order/order'
					})

				}, 1000)
			},
			itemClick: function(e) {
				let index = e.index;
				this.closeActionSheet();
				this.tui.toast(`您点击的按钮索引为：${index}`)
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			change: function(e) {
				this.index = e.index;
				this.current = e.index
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
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
					title: '召唤师',
					content: '确定要删除这段回忆吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
		}
	}
</script>

<style>
	.content{
		max-width: 70% !important;
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
	.kp-goods-name {
		 padding-right: 20rpx;
		  word-break: break-all;
		  overflow: hidden;
		  text-overflow: ellipsis;
		  display: -webkit-box !important;
		  -webkit-box-orient: vertical;
		  -webkit-line-clamp: 2;
		  /* font-size: 32rpx !important; */
		  line-height: 1.5;
		 }
</style>
