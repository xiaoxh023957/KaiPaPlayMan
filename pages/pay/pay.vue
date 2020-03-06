<template>
	<view class="app">
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">支付</block>
		</cu-custom>
		<view class="price-box">
			<text>支付金额</text>
			<text class="price">{{price/100}}</text>
		</view>

		<view class="pay-type-list">
			<view class="type-item b-b">
				<!-- <text class="icon yticon icon-weixinzhifu"></text> -->
				<view class="weixinzhifu" style="background-image: url('../static/wxzf.jpg'); background-size: 100%;"></view>
				<view class="con">
					<text class="tit">微信支付</text>
					<text>推荐使用微信支付</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 1' />
					</radio>
				</label>
			</view>

			<!-- <view class="type-item b-b">
				<text class="icon yticon icon-alipay"></text>
				<view class="con">
					<text class="tit">支付宝（敬请期待）</text>
				</view>
				<label class="radio">
					<radio disabled="true" value="" color="#fa436a" :checked='payType == 2' />
					</radio>
				</label>
			</view>
			<view class="type-item" @click="changePayType(3)">
				<text class="icon yticon icon-erjiye-yucunkuan"></text>
				<view class="con">
					<text class="tit">线下支付（到付）</text>
				</view>
				<label class="radio">
					<radio value="" color="#fa436a" :checked='payType == 3' />
					</radio>
				</label>
			</view> -->
		</view>

		<text :disabled="submiting" class="mix-btn" @tap.stop="confirm()">确认支付</text>
	</view>
</template>

<script>
	import {
		getPrepayData
	} from '@/api/pay.js'
	import {
		updateOrder
	} from '@/api/orderSubmit.js'

	import {
		renewYearCardAjax,
		saveYearcard
	} from '@/api/yearcard.js'


	export default {
		data() {
			return {
				payType: 1,
				price: 0,
				orderNo: '',
				orderId: "",
				submiting: false,
				orderType: undefined,
				reqPayData: {
					body: "",
					fee: 0,
					ip: "127.0.0.1"
				},
				/**
				 * 幸运之星信息
				 */
				luckyStarInfo: {
					luckystarId: undefined,
					luckystarNumber: undefined
				},
				zoneInfo: {
					zoneId: undefined,
					zoneNum: undefined,
					zoneBlockNo: undefined
				},
				userData: {},
				goodsList: [],
				userData: {},
				goodsList: []
			};
		},
		computed: {

		},
		async onLoad(options) {
			this.price = options.price;
			this.chooseNum = options.num;

			let userInfo = uni.getStorageSync("USERDATA");
			if (userInfo) {
				this.userData = userInfo;
			} else {
				uni.redirectTo({
					url: "/pages/register/register"
				})
			}

			//this.getIPv4();
			//console.log("用户IP地址:"+ipData);

			/**
			 * 购买类型定义
			 * 订单类型：
			 * 0/普通商品订单  =
			 * 1/套餐订单  =
			 * 2/幸运之星订单 = 
			 * 3/五区选号订单 =
			 * (4/翻牌订单 5/智勇大冲关订单 --废弃) 
			 * 6/限时抢购订单 
			 * 7/团购订单 
			 * 8/100购物订单 
			 * 9/电音派对订单 
			 * 
			 * 10/购买年卡 =
			 * 
			 */
			// let orderType = options.orderType;
			let that = this;
			this.orderType = parseInt(options.orderType);

			await this.getIPv4();

			if (this.orderType == 0) {
				//购买普通商品
				this.orderId = options.orderId;
				this.buyGoods();
			} else if (this.orderType == 1) {
				//购买套餐
				this.orderId = options.orderId;
				this.buyGoods();
			}
			// else if (this.orderType == 2) {
			// 	//购买幸运之星
			// 	this.orderId = options.orderId;
			// 	this.buyLuckystar()
			// } 
			else if (this.orderType == 2) {
				this.luckyStarInfo.luckystarId = options.luckystarId;
				this.luckyStarInfo.luckystarNumber = options.luckystarNumber;
				//console.log("购买幸运之星")
				this.reqPayData.body = '购买幸运之星第' + options.luckystarId + '场,选中号码' + options.luckystarNumber;
				this.reqPayData.fee = this.price;
				this.buyLuckystar();
			} else if (this.orderType == 3) {
				this.zoneInfo.zoneBlockNo = options.zoneBlockNo
				this.zoneInfo.zoneId = options.zoneId;
				this.zoneInfo.zoneNum = options.zoneNum;
				this.reqPayData.body = '购买神秘商店第' + options.zoneId + '场,' + options.zoneBlockNo + '	区，选中号码' + options.zoneNum;
				this.reqPayData.fee = this.price;

			} else if (this.orderType == 6) {
				//购买限时抢购订单
				this.orderId = options.orderId;
				this.buyGoods();
			} else if (this.orderType == 8) {
				//购买100购物订单
				this.orderId = options.orderId;
				this.buyGoods();
			} else if (this.orderType == 9) {
				//购买电音派对
				this.orderId = options.orderId;
				this.buyGoods();
			} else if (this.orderType == 10) {
				if (options.status == 'oldyearcard') {
					this.reqPayData.body = '会员续费';
					this.reqPayData.fee = this.price;
					this.renewYearCard();
				} else {
					this.reqPayData.body = '新会员开通';
					this.reqPayData.fee = this.price;
					this.buyYearcard();
				}

			}



		},

		methods: {



			/**
			 * 续费年卡
			 */
			async renewYearCard() {
				console.log("进入续费年卡方法")
				const that = this;

				const prepayData = await getPrepayData({
					body: that.reqPayData.body,
					fee: that.reqPayData.fee,
					ip: that.reqPayData.ip
				})


				const payData = prepayData.data.payData;
				console.log(payData);


				const payParam = {
					appid: payData.appId,
					noncestr: payData.nonceStr,
					package: payData.packageValue,
					partnerid: payData.partnerId,
					prepayid: payData.prepayId,
					timestamp: parseInt(payData.timeStamp),
					sign: payData.sign,
					signType: 'MD5'
				}

				uni.requestPayment({
					provider: "wxpay",
					orderInfo: payParam,
					success(res) {
						console.log(res)
						uni.showLoading({
							title: "支付成功",
							success() {

								//修改订单状态
								that.changeOrderStatus();

								that.renewYearcardSuccess();

								// const updateResp = await updateOrder(orderData);
								// console.log(updateResp);
							}
						})
					},
					fail(e) {
						console.log("支付过程失败，原因", e);
					},
					complete(e) {
						console.log("支付过程结束");
					}
				})

			},
			/**
			 * 续费年卡方法，当支付成功后调用此方法进行
			 */
			async renewYearcardSuccess() {
				let that = this;
				const renewResp = renewYearCardAjax({
					uid: that.userData.uid
				})
				console.log(renewResp);
				uni.showToast({
					title: '续费成功',
					icon: 'none',
					success: () => {
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/index/index'
							})
						}, 500)
					}
				})
			},

			/**
			 * 购买年卡
			 */
			async buyYearcard() {

				let recommendUid = uni.getStorageSync("recommendUid"); //推荐人
				if (!recommendUid) {
					recommendUid = null;
				}

				let that = this;
				let yearcardRecord = {
					uid: that.userData.uid,
					ycid: 1,
					recommendUid: recommendUid,
					status: 1
				}

				const buyResp = saveYearcard(yearcardRecord);
				console.log(buyResp);
				uni.showToast({
					title: '开通成功',
					icon: 'none',
					success: () => {
						setTimeout(() => {
							uni.redirectTo({
								url: '/pages/index/index'
							})
						}, 500)
					}
				})

			},


			/**
			 * 购买普通商品
			 */
			async buyGoods() {
				const that = this;
				that.reqPayData.body = "订单号:" + that.orderId;
				that.reqPayData.fee = that.price;

				const prepayData = await getPrepayData({
					body: that.reqPayData.body,
					fee: that.reqPayData.fee,
					ip: that.reqPayData.ip
				})


				const payData = prepayData.data.payData;
				console.log(payData);


				const payParam = {
					appid: payData.appId,
					noncestr: payData.nonceStr,
					package: payData.packageValue,
					partnerid: payData.partnerId,
					prepayid: payData.prepayId,
					timestamp: parseInt(payData.timeStamp),
					sign: payData.sign,
					signType: 'MD5'
				}

				uni.requestPayment({
					provider: "wxpay",
					orderInfo: payParam,
					success(res) {
						console.log(res)
						uni.showLoading({
							title: "支付成功",
							success() {
								that.changeOrderStatus();
								//修改订单状态
								// const updateResp = await updateOrder(orderData);
								// console.log(updateResp);
								uni.showToast({
									title: '购买成功',
									icon: 'none',
									success: () => {
										setTimeout(() => {
											uni.redirectTo({
												url: '/pages/index/index'
											})
										}, 500)
									}
								})
							}
						})
					},
					fail(e) {
						console.log("支付过程失败，原因", e);
					},
					complete(e) {
						console.log("支付过程结束");
					}
				})



			},
			/**
			 * 购买幸运之星
			 */
			async buyLuckystar() {
				console.log("进入购买幸运之星方法")
				const that = this;

				that.luckyStarInfo.luckystarId = options.luckystarId;
				that.luckyStarInfo.luckystarNumber = options.luckystarNumber;
				//console.log("购买幸运之星")
				that.reqPayData.body = '购买幸运之星第' + options.luckystarId + '场,选中号码' + options.luckystarNumber;
				that.reqPayData.fee = that.price;

				const prepayData = await getPrepayData({
					body: that.reqPayData.body,
					fee: that.reqPayData.fee,
					ip: that.reqPayData.ip
				})
				const payData = prepayData.data.payData;
				console.log(payData);


				const payParam = {
					appid: payData.appId,
					noncestr: payData.nonceStr,
					package: payData.packageValue,
					partnerid: payData.partnerId,
					prepayid: payData.prepayId,
					timestamp: parseInt(payData.timeStamp),
					sign: payData.sign,
					signType: 'MD5'
				}

				uni.requestPayment({
					provider: "wxpay",
					orderInfo: payParam,
					success(res) {
						console.log(res)
						uni.showLoading({
							title: "支付成功",
							success() {

								that.changeOrderStatus();
								//修改订单状态
								// const updateResp = await updateOrder(orderData);
								// console.log(updateResp);
								uni.showToast({
									title: '购买成功',
									icon: 'none',
									success: () => {
										setTimeout(() => {
											uni.redirectTo({
												url: '/pages/index/index'
											})
										}, 500)
									}
								})
							}
						})
					},
					fail(e) {
						console.log("支付过程失败，原因", e);
					},
					complete(e) {
						console.log("支付过程结束");
					}
				})

			},

			//修改订单状态
			async changeOrderStatus() {
				let orderData = {
					orderId: that.orderId,
					status: 1
				}
				const updateResp = await updateOrder(orderData);
				console.log(updateResp);


			},

			async getIPv4() {
				uni.showLoading({
					title: "请稍候..."
				})
				let that = this;
				await uni.request({
					url: "https://api.ipify.org/?format=json",
					success(res) {
						that.reqPayData.ip = res.data.ip
						console.log(that.reqPayData)
						uni.hideLoading();
					},
					fail() {
						uni.hideLoading();
					},
					complete() {
						uni.hideLoading();
					}
				})
			},
			async confirm() {
				const that = this;

				console.log(that.reqPayData)
				const prepayData = await getPrepayData({
					body: that.reqPayData.body,
					fee: that.reqPayData.fee,
					ip: that.reqPayData.ip
				})

				//console.log(that.orderType);



				console.log(prepayData);
				const payData = prepayData.data.payData;
				console.log(payData);


				const payParam = {
					appid: payData.appId,
					noncestr: payData.nonceStr,
					package: payData.packageValue,
					partnerid: payData.partnerId,
					prepayid: payData.prepayId,
					timestamp: parseInt(payData.timeStamp),
					sign: payData.sign,
					signType: 'MD5'
				}

				uni.requestPayment({
					provider: "wxpay",
					orderInfo: payParam,
					success(res) {
						console.log(res)
						uni.showLoading({
							title: "支付成功",
							success() {

							}
						})
					},
					fail(e) {
						console.log("支付过程失败，原因", e);
					},
					complete(e) {
						console.log("支付过程结束");
					}
				})


				console.log(this.reqPayData)

			}
		}



	}
</script>

<style lang='scss'>
	.app {
		width: 100%;
	}

	.price-box {
		background-color: #fff;
		height: 265upx;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		font-size: 28upx;
		color: #909399;

		.price {
			font-size: 50upx;
			color: #303133;
			margin-top: 12upx;

			&:before {
				content: '￥';
				font-size: 40upx;
			}
		}
	}

	.pay-type-list {
		margin-top: 20upx;
		background-color: #fff;
		padding-left: 60upx;

		.type-item {
			height: 120upx;
			padding: 20upx 0;
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding-right: 60upx;
			font-size: 30upx;
			position: relative;
		}

		.icon {
			width: 100upx;
			font-size: 52upx;
		}

		.icon-erjiye-yucunkuan {
			color: #fe8e2e;
		}

		.icon-weixinzhifu {
			color: #36cb59;
		}

		.icon-alipay {
			color: #01aaef;
		}

		.tit {
			font-size: $font-lg;
			color: $font-color-dark;
			margin-bottom: 4upx;
		}

		.con {
			flex: 1;
			display: flex;
			flex-direction: column;
			font-size: $font-sm;
			color: $font-color-light;
		}
	}

	.mix-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 630upx;
		height: 80upx;
		margin: 80upx auto 30upx;
		font-size: $font-lg;
		color: #fff;
		background-color: $base-color;
		border-radius: 10upx;
		box-shadow: 1px 2px 5px rgba(219, 63, 96, 0.4);
	}

	.weixinzhifu {
		display: inline-block;
		width: 60rpx;
		height: 60rpx;
		margin-right: 20rpx;
	}
</style>
