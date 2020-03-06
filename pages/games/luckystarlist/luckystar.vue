<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true" ref='backbar'>
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">幸运之星</block>
		</cu-custom>
		<block v-if="!loading">
			<!-- 开奖红包弹层 -->
			<block v-if="luckystarInfo.status == 1">
				<black v-if='inField'>
					<view :animation="animationData1" class="mask" style="opacity:1">
						<view class="red-packet">
							<view class="header"></view>
							<view class="mian">
								<button class="open">开</button>
							</view>
						</view>
					</view>

					<view :animation="animationData2" class="mask" style="opacity:0">
						<view class="text-center info ">
							<view class="text-xxl text-red text-center" :class="isWinning?'text-red':'text-white'">
								{{isWinning?'恭喜':'很遗憾'}}
							</view>
							<view class="text-xl  text-center padding-top-lg margin-top-xl" :class="isWinning?'text-red':'text-gray'">
								{{isWinning?'你中奖了':'你没中奖'}}

							</view>
							<view class="text-sm text-center" :class="isWinning?' text-orange':'text-gray'">
								中奖号码为
							</view>
							<view class="  text-xxl text-center" :class="isWinning?'text-red':'text-gray'">
								{{luckystarInfo.winningNumber}}
							</view>
							<view class="kp-infobtn  text-red">
								去订单页查看
							</view>
						</view>
						<view v-if='isWinning' class="text-center">
							<view>
								恭喜获得奖品:
							</view>
							<view>{{luckystarInfo.prizeInfo}}</view>
						</view>
					</view>
				</black>
				<block v-if='!inField'>
					<view :animation="animationData3" class="padding text-center  prizeInfo" style="opacity:0">

						<view class="padding text-xxl text-orange">
							本次开奖号码为{{luckystarInfo.winningNumber}}号
						</view>
						<view class="padding text-lg">
							本期奖品为{{luckystarInfo.prizeInfo}}
						</view>

					</view>
				</block>
			</block>

			<view v-else>
				<view class="padding-top-lg padding-left cf text-black">
					<view class="margin-left-xl margin-top text-center margin-auto fl circle" :class="item.btnClass" v-for="(item,index) in luckyStarList"
					 @tap="pay(item.number)" :key="index">
						{{item.number}}
					</view>
				</view>
				<view class="margin margin-top-xl radius" style="border: 2rpx solid #E56D00; ">
					<view class="margin-tb-xs text-xl text-center ">
						活动规则
					</view>
					<view class="margin">
						<view>规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则规则</view>
					</view>
				</view>

			</view>
		</block>
	</view>
	</view>

</template>

<script>
	import {
		luckyrecordlist,
		luckystarinfo
	} from '@/api/gameApi.js'
	import {
		getOrderList,
	} from "@/api/orderApi.js"

	//引入微信支付请求
	import {
		getPrepayData
	} from '@/api/pay.js'

	export default {
		data() {
			return {
				loading: true,
				luckyrecordres: {
					list: []
				},
				luckyStarList: [],
				luckystarInfo: {},
				deviceHeight: 0,
				backbarHeight: 0,
				isLoading: true,
				userInfo: {},
				animationData1: {},
				animationData2: {},
				animationData3: {},
				isWinning: false,
				inField: false,
				userInfo: {}
			}
		},

		mounted: async function(options) {


			// const luckyrecordres = await luckyrecord (id);
			// console.log(luckyrecordres)
		},
		async onLoad(options) {

			let that = this;
			//#ifdef APP-PLUS
			uni.getSystemInfo({
				success: function(res) {
					that.deviceHeight = res.windowHeight
				},
			});
			this.backbarHeight = parseInt(((this.$refs.backbar.style).split(":"))[1]);
			//			console.log(this.backbarHeight)
			//#endif

			let luckystarId = options.luckystarId;

			await this.getLuckyStarInfo(luckystarId);
			await this.getLuckyStarRecord(luckystarId);

			let userData = uni.getStorageSync("USERDATA");
			if (userData !== undefined && userData !== null && userData !== "") {
				this.userInfo = userData;
			}
			for (let i = 0; i < that.luckystarInfo.maxNumber; i++) {
				let obj = {
					number: i + 1,
					btnClass: that.isChoose(i + 1) ? 'bd' : '',
					hasChoose: that.isChoose(i + 1)
				};
				that.luckyStarList.push(obj)
			}

			//console.log("luckyStarList:"+that.luckyStarList);
			this.getUserOrder();

			//开奖动画
			this.redPacketOpacity();

			this.loading = false;
		},
		methods: {
			show(num) {
				console.log(num)
			},
			isChoose(number) {
				//console.log("进入isChoose方法")
				var choose = false;

				this.luckyrecordres.list.forEach(obj => {
					var hasChooseNumber = obj.chooseNumber;
					if (number == hasChooseNumber) {
						choose = true;
					}
				})
				//				console.log(number,choose)

				return choose;
			},

			async getLuckyStarRecord(luckystarId) {
				const that = this;
				await luckyrecordlist(luckystarId).then(result => {
					that.luckyrecordres = result.data.page;
					console.log("获取幸运之星记录列表接口请求成功！")
					//console.log(that.luckyrecordres);

				})

			},

			async getLuckyStarInfo(luckystarId) {
				const that = this;
				await luckystarinfo(luckystarId).then(result => {
					that.luckystarInfo = result.data.Luckystar;
					that.isLoading = false;
					console.log("获取幸运之星详情接口请求成功！")
					console.log(that.luckystarInfo)

				})

				//console.log(that.luckystarInfo);
			},

			pay(number) {
				//this.isChoose = true;
				let choose = false;
				let that = this;
				this.luckyrecordres.list.forEach(obj => {
					let hasChooseNumber = obj.chooseNumber;
					if (number == hasChooseNumber) {
						choose = true;
					}
				})
				if (choose) {
					uni.showModal({
						content: "很抱歉，这个号码已经被选走了哦！",
						showCancel: false,
						complete() {
							return false;
						}
					})
				} else {
					let confirm = false;
					uni.showModal({
						content: '您确定要选择[' + number + ']号吗？',
						success: function(res) {
							if (res.confirm == true) {
								console.log("选中了")
								that.buyLuckyStar(number);
							} else {
								return false;
							}
						}

					})
					if (confirm) {
						console.log("确定选择号码")

					}
				}
			},
			buyLuckyStar(number) {
				console.log("购买幸运之星")
				let that = this;
				let price = parseInt((that.luckystarInfo.joinPrice) * 100);
				uni.navigateTo({
					url: "/pages/pay/pay?price=" + price + "&orderType=2&luckystarId=" + that.luckystarInfo.luckystarId +
						"&luckystarNumber=" + number
				})
			},
			redPacketOpacity: function() {
				let that = this;
				var animation = uni.createAnimation({
					duration: 100,
					timingFunction: 'ease',
				})

				this.animation = animation
				// 改变透明度
				// this.animation.opacity(1).step()
				// this.animationData1 = this.animation.export();

				setTimeout(() => {
					this.animation.opacity(0).step()
					this.animationData1 = animation.export();
					setTimeout(() => {
						that.infoOpacity()
					}, 500);
				}, 800)


			},
			//中奖提示
			infoOpacity: function() {
				let that = this;
				// console.log("1")
				var animation = uni.createAnimation({
					duration: 100,
					timingFunction: 'ease',
				})

				this.animation = animation
				// 改变透明度
				this.animation.opacity(1).step()
				this.animationData2 = this.animation.export();

				// setTimeout(() => {
				//  // console.log("执行动画")
				//  that.animation.opacity(0).step()
				//  that.animationData2 = animation.export()
				//  setTimeout(() => {
				//   that.pageOpacity();
				//  }, 50);
				// }, 3000)
			},

			//中奖展示
			pageOpacity: function() {
				var animation = uni.createAnimation({
					duration: 100,
					timingFunction: 'ease',
				})

				this.animation = animation
				// 改变透明度
				this.animation.opacity(1).step()
				this.animationData3 = this.animation.export();

			},

			//获取用户订单
			async getUserOrder() {
				let that = this;
				const userOrderRes = await getOrderList({
					pageindex: 1,
					pagesize: 999,
					uid: that.userInfo.uid,
					orderType: 2,

				});
				that.userOrder = userOrderRes.data.page.list


				//判断是否中奖
				//场次判断
				let luckystarId = that.luckystarInfo.luckystarId;

				console.log(luckystarId)

				let lidRes = that.userOrder.some((item) => {
					return item.luckystarId == luckystarId
				})

				if (lidRes) {
					that.inField = true;
					let winningNumber = that.luckystarInfo.winningNumber;
					let numRes = that.userOrder.some((item) => {
						return item.luckystarNumber == winningNumber
					})

					that.isWinning = numRes;
					console.log(winningNumber)
				}


			}
		},
	}
</script>
<style>
	.bd {
		background-color: red !important;
		color: white;
		border: 1px solid red !important;
	}

	,
	.star {
		display: inline;
		width: 60rpx;
		height: 60rpx;
		border-radius: 50%;
		background-color: #000000;
	}

	.circle {
		width: 80rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 50%;
		border: 1px solid black;
		text-align: center;
	}
</style>
