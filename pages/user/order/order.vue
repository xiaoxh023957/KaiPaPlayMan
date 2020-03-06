<template>
	<view class="container" style="position: relative;">
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">我的订单</block>
		</cu-custom>
		<!-- <tui-tabs :tabs="tabs" :currentTab="currentTab"  selectedColor="#E41F19" sliderBgColor="#E41F19" @change="change" style="position: flex;"></tui-tabs> -->

		<!-- 订单类型tab -->
		<scroll-view scroll-x class="bg-white nav text-center" scroll-with-animation :scroll-left="scrollLeft">
			<view class="cu-item" :class="index==TabCur?'text-orange ':''" v-for="(item,index) in orderTypeList" :key="index"
			 @tap="tabSelect" :data-id="index">
				{{item}}
			</view>

		</scroll-view>

		<!--选项内容-->

		<view class="tui-order-item" v-for="(order,index) in orderList.list" :key="index" v-if='order.status !=10'>
			<view v-if="order.orderType != 2&&order.orderType != 3">
				<tui-list-cell :hover="false" :lineLeft="false">
					<view class="tui-goods-title">
						<view>订单号：{{order.orderId}}</view>
						<view class="tui-order-status" :class="{ 'text-green':order.status==1,'text-orange':order.status==2||order.status==4,'text-blue':order.status==3,'text-red':order.status==5,}">{{getStatus(order.status)}}</view>
					</view>
				</tui-list-cell>

				<tui-list-cell padding="0" @click="toOrderDetail(order.orderId)">
					<view class="tui-goods-item">
						<image class="cu-avatar radius xl" :src="order.details[0].goods.coverImgpath"></image>
						<view class="tui-goods-center">
							<view class="tui-goods-name">{{order.details[0].goods.gname}}</view>
							<!-- <view class="tui-goods-attr">黑色，50ml</view> -->
						</view>
						<view class="tui-price-right">
							<view>￥{{order.details[0].goods.price}}</view>
							<view>共{{order.details?order.details.length:0}}件商品</view>
						</view>
					</view>
				</tui-list-cell>

				<tui-list-cell :hover="false" :last="true">
					<view class="tui-goods-price">
						<!-- 数组长度*价格 -->
						<view>共{{order.details?order.details.length:0}}件商品 合计：</view>
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">{{order.totalAmount}}</view>
						<!-- <view class="tui-size-24">.00</view> -->
					</view>
				</tui-list-cell>

			</view>
			<view v-if="order.orderType == 2">
				<tui-list-cell :hover="false" :lineLeft="false">
					<view class="tui-goods-title">
						<view>订单号：{{order.orderId}}</view>
						<view class="tui-order-status" :class="{ 'text-green':order.status==1,'text-orange':order.status==2||order.status==4,'text-blue':order.status==3,'text-red':order.status==5,}">{{getStatus(order.status)}}</view>
					</view>
				</tui-list-cell>

				<tui-list-cell padding="0" @click="toOrderDetail(order.orderId)">
					<view class="tui-goods-item">
						<image class="cu-avatar radius xl" src="../../../static/logo(2).png"></image>
						<view class="tui-goods-center">
							<view class="tui-goods-name">已购买<text class="numberStyle margin-lr-xs text-red ">{{order.luckystarNumber}}</text>号</view>
						</view>
						<view class="tui-price-right">
							<view>{{gameStatus(order.status)}}</view>
						</view>
					</view>
				</tui-list-cell>

				<tui-list-cell :hover="false" :last="true">
					<view class="tui-goods-price">
						<!-- 数组长度*价格 -->
						<view> 合计：</view>
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">{{order.totalAmount}}</view>
						<!-- <view class="tui-size-24">.00</view> -->
					</view>
				</tui-list-cell>

			</view>

			<view v-if="order.orderType == 3">
				<tui-list-cell :hover="false" :lineLeft="false">
					<view class="tui-goods-title">
						<view>订单号：{{order.orderId}}</view>
						<view class="tui-order-status" :class="{ 'text-green':order.status==1,'text-orange':order.status==2||order.status==4,'text-blue':order.status==3,'text-red':order.status==5,}">{{getStatus(order.status)}}</view>
					</view>
				</tui-list-cell>

				<tui-list-cell padding="0" @click="toOrderDetail(order.orderId)">
					<view class="tui-goods-item">
						<image class="cu-avatar radius xl" src="../../../static/logo(2).png"></image>
						<view class="tui-goods-center">
							<view class="tui-goods-name">已购买
								<text class="text-orange text-md">{{order.zoneBlockNo}}区</text>
								<text class="numberStyle margin-lr-xs text-red ">{{order.zoneNumber}}</text>号
							</view>
						</view>
						<view class="tui-price-right">
							<view>{{gameStatus(order.status)}}</view>
						</view>
					</view>
				</tui-list-cell>

				<tui-list-cell :hover="false" :last="true">
					<view class="tui-goods-price">
						<!-- 数组长度*价格 -->
						<view> 合计：</view>
						<view class="tui-size-24">￥</view>
						<view class="tui-price-large">{{order.totalAmount}}</view>
						<!-- <view class="tui-size-24">.00</view> -->
					</view>
				</tui-list-cell>

			</view>



			<!-- 按钮组 -->
			<view v-if='order.orderType != 2&&order.orderType != 3' class="tui-order-btn">
				<view class="tui-btn-ml">

					<tui-button v-if="order.status==0"  class="fr margin-right" type="black" :plain="true" width="148rpx"
					 @tap="goPurchasePay(order)" height="56rpx" :size="26" shape="circle">付款</tui-button>



					<tui-button v-if="order.status==1" class="fr margin-right" @click="refund(order.orderId)" type="black" :plain="true"
					 width="148rpx" height="56rpx" :size="26" shape="circle">退款</tui-button>



					<tui-button v-if='order.status==2' class="fr margin-right" @click="evaluate(order.orderId)" type="black" :plain="true"
					 width="148rpx" height="56rpx" :size="26" shape="circle">评价</tui-button>
			


					<tui-button  class="fr margin-right" type="black" :plain="true" width="148rpx" height="56rpx" :size="26"
					 @click="toOrderDetail(order.orderId)" shape="circle">查看</tui-button>
					 
					 <tui-button v-if="order.status==6"  class="fr margin-right" type="black" :plain="true" width="148rpx" height="56rpx" :size="26" @click="refund(order.orderId)"
					   shape="circle">再次申请</tui-button>

					<tui-button v-if="order.status==0||order.status==2||order.status==6||order.status==7||order.status==8||order.status==9"  class="fr margin-right" @click="changeStatus(order.orderId)" type="black" :plain="true" width="148rpx"
					 height="56rpx" :size="26" shape="circle">删除</tui-button>


				</view>
			</view>
		</view>




		<!--加载loadding-->
		<tui-loadmore :visible="loadding" :index="3" type="red"></tui-loadmore>
		<tui-nomore :visible="!pullUpOn" bgcolor="#fafafa"></tui-nomore>
		<!--加载loadding-->

	</view>
</template>

<script>
	import tuiTabs from "@/components/tui-tabs/tui-tabs"
	import tuiButton from "@/components/extend/button/button"
	import tuiLoadmore from "@/components/loadmore/loadmore"
	import tuiNomore from "@/components/nomore/nomore"
	import tuiListCell from "@/components/list-cell/list-cell"
	import tuiSticky from "@/components/sticky/sticky"
	import {
		getOrderList,
		getOrderDetail
	} from "@/api/orderApi.js"
	import {
		updateOrder
	} from '@/api/orderSubmit.js'
	export default {
		components: {
			tuiTabs,
			tuiButton,
			tuiLoadmore,
			tuiNomore,
			tuiListCell,
			tuiSticky
		},
		data() {
			return {
				orderTypeList: [
					'全部', '单品', '套餐', '幸运之星', '五区选号', '翻牌', '智勇大冲关', '限时抢购', '团购'
				],
				statusList: ['未支付', '已支付', '已使用', '已评价', '已完成', '申请退款', '退款驳回', '退款成功', '已取消', '无效订单', '已删除'],
				currentTab: 0,
				pageIndex: 1,
				loadding: false,
				pullUpOn: true,
				scrollTop: 0,
				TabCur: 0,
				scrollLeft: 0,
				totalPage: 0,
				currPage: 0,
				orderList: {},
				stockData: {},
				userInfo: {}
			}
		},
		async onLoad() {

			let userInfo = uni.getStorageSync("USERDATA");
			if (!userInfo) {
				uni.redirectTo({
					url: '/pages/register/register'
				});
			}
			this.userInfo = userInfo;


			//获取全部订单
			this.getOrderlist()


		},
		methods: {
			// 获取订单列
			async getOrderlist() {
				const orderListRes = await getOrderList({
					pageindex: 1,
					pagesize: 100,
					uid: this.userInfo.uid
				});
				this.orderList = orderListRes.data.page;
				this.totalPage = this.orderList.totalPage;

				console.log(this.orderList)

			},
			//支付
			async goPurchasePay(orderData) {
				console.log(orderData)

				let price = (orderData.totalAmount * 100.0)
				let orderId = orderData.orderId
				let orderType = orderData.orderType

				uni.navigateTo({
					url: "/pages/pay/pay?orderId=" + orderId + "&price=" + price + "&orderType=" + orderType
				})

			},
			async tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				//获取类型订单
				const orderListRes = await getOrderList({
					pageindex: 1,
					pagesize: 10,
					uid: this.userInfo.uid,
					orderType: this.TabCur - 1
				});
				this.orderList = orderListRes.data.page;
				this.totalPage = this.orderList.totalPage;

				console.log(this.orderList)

				//全部订单
				if (this.TabCur == 0) {
					this.getOrderlist()
				}
			},

			onPullDownRefresh() {
				setTimeout(() => {
					uni.stopPullDownRefresh()
				}, 200);
			},
			onReachBottom() {

			},
			onPageScroll(e) {
				this.scrollTop = e.scrollTop;
			},
			evaluate(oid) {
				uni.navigateTo({
					url: `/pages/user/order/order-evaluate/order-evaluate?oid=${oid}`
				})
			},
			//退款
			refund(oid) {
				// console.log(12345)
				uni.navigateTo({
					url: `/pages/refund/refund?oid=${oid}`
				})
			},
			//获取订单状态
			getStatus(s) {
				// return this.statusList[s];
				if (s == 0) {
					return '未支付'
				} else if (s == 1) {
					return '已支付'
				} else if (s == 2) {
					return '已使用'
				} else if (s == 3) {
					return '已评价'
				} else if (s == 4) {
					return '已完成'
				} else if (s == 5) {
					return '申请退款'
				} else if (s == 6) {
					return '退款驳回'
				} else if (s == 7) {
					return '退款成功'
				} else if (s == 8) {
					return '已取消'
				} else if (s == 9) {
					return '无效订单'
				}

			},
			//获取开奖状态
			gameStatus(s) {
				if (s == 0) {
					return "未开奖"
				} else if (s == 1) {
					return "已开奖"
				}
			},
			toOrderDetail(oid) {

				let baseUrl = "/pages/user/order/detail/detail?orderId=" + oid;
				uni.navigateTo({
					url: baseUrl
				})
			},
			async changeStatus(oid) {
				let that = this;
				uni.showModal({
					title: '确定删除吗？',
					content: '删除后不可恢复',
					success: async function(res) {
						if (res.confirm) {
							let orderData = {
								orderId: oid,
								status: 10
							}
							const updateResp = await updateOrder(orderData);
							console.log(updateResp)
							//重新加载
							setTimeout(() => {
								uni.showToast({
									title: '删除成功',
									icon: "none",
								})
							}, 500)
							//重新加载
							setTimeout(() => {
								that.getOrderlist()
							}, 700)

						} else if (res.cancel) {
							return;
						}
					},

				})
			},
		}
	}
</script>

<style>
	.numberStyle {
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		text-align: center;
		border: 1px solid red;
		border-radius: 50%;
	}

	.container {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-order-list {
		margin-top: 80rpx;
	}

	.tui-order-item {
		margin-top: 20rpx;
		border-radius: 10rpx;
		overflow: hidden;
	}

	.tui-goods-title {
		width: 100%;
		font-size: 28rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.tui-order-status {
		/* color: #888; */
		font-size: 26rpx;
	}

	.tui-goods-item {
		width: 100%;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
	}

	.tui-goods-img {
		width: 180rpx;
		height: 180rpx;
		display: block;
		flex-shrink: 0;
	}

	.tui-goods-center {
		flex: 1;
		padding: 6rpx 14rpx;
		box-sizing: border-box;
	}

	.tui-goods-name {
		max-width: 360rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 26rpx;
		line-height: 32rpx;
	}

	.tui-goods-attr {
		font-size: 22rpx;
		color: #888888;
		line-height: 32rpx;
		padding-top: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.tui-price-right {
		text-align: right;
		font-size: 24rpx;
		color: #888888;
		line-height: 30rpx;
		padding-top: 6rpx;
	}

	.tui-color-red {
		color: #E41F19;
		padding-right: 30rpx;
	}

	.tui-goods-price {
		width: 100%;
		display: flex;
		align-items: flex-end;
		justify-content: flex-end;
		font-size: 24rpx;
	}

	.tui-size-24 {
		font-size: 24rpx;
		line-height: 24rpx;
	}

	.tui-price-large {
		font-size: 32rpx;
		line-height: 30rpx;
		font-weight: 500;
	}

	.tui-order-btn {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		background: #fff;
		padding: 10rpx 30rpx 20rpx;
		box-sizing: border-box;
	}

	.tui-btn-ml {
		margin-left: 20rpx;
	}
</style>
