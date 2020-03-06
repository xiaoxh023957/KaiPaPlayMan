<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true" ref='backbar'>
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">神秘商店</block>
		</cu-custom>
		<block v-if="!loading">
			<!-- 开奖红包弹层 -->
			<block v-if="zoneData.status == 1">
				<block v-if="inField">
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
								中奖区号为
							</view>
							<view class="  text-xxl text-center" :class="isWinning?'text-red':'text-gray'">
								{{zoneData.winningNumber}}
							</view>
							<view class="kp-infobtn  text-red">
								去订单页查看
							</view>
						</view>
						<view v-if='isWinning' class="text-center">
							<view>
								恭喜获得奖品:
							</view>
							<view>{{zoneData.prizeInfo}}</view>
						</view>
					</view>
				</block>
				<block v-if='!inField'>
					<view :animation="animationData3" class="padding text-center  prizeInfo" style="opacity:0">

						<view class="padding text-xxl text-orange">
							本次开奖区为{zoneData.winningNumber}区
						</view>
						<view class="padding text-lg">
							本期奖品为{{zoneData.prizeInfo}}
						</view>

					</view>
				</block>

			</block>

			<block v-if="zoneData.status == 0">
				<!-- 神秘商店 -->
				<view class="grid col-3 bg-white padding-lg">
					<view class="kp-game" style="background: url(../../../static/smsdGame.jpg) no-repeat;background-size: contain;background-position: center;"></view>
					<!-- index*6+1+i -->
					<view class="kp-game" @click="showPopup(index)" v-for='(item,index) in ZNresult' :key='index'>
						<view class="kp-game-item cf">
							<view class="ball fl text-center" v-for="(v,i) in item" :key='i' :class="{'disable': v.hasChoose==true}">
								{{v.number}}
							</view>
						</view>
					</view>
				</view>

				<!-- 弹层 -->
				<tui-bottom-popup :show="popupShow" @close="hidePopup">
					<view class="tui-popup-box">
						<scroll-view scroll-y class="tui-popup-scroll">
							<view class="tui-scrollview-box">
								<view class="tui-bold tui-attr-title">选择号码</view>
								<view class="tui-attr-box">
									<view class="tui-attr-item " v-for="(v,i) in attrList" :key='i' :class="{'tui-attr-active':i==cur,'disable':v.hasChoose}"
									 @click='chooseAttr(i,v)'>

										{{v.number}}
									</view>
								</view>
							</view>
						</scroll-view>
						<view class=" text-center">
							<button class="cu-btn padding-lr-lg round bg-orange" @tap="pay(zNum,zoneData.joinPrice)">购买</button>
						</view>
					</view>
				</tui-bottom-popup>
				<!--底部选择层-->

				<view class="padding text-center paddin-lr-lg bg-white">
					<view class="text-yellow text-lg">
						今日奖品
					</view>
					<view>
						{{zoneData.prizeInfo}}
					</view>
				</view>

				<!-- 套餐信息 -->
				<view class="bg-white padding-lr-lg padding-tb text-lg margin-top-xs" style="border-bottom:1px solid #f1f1f1">
					套餐
				</view>
				<view class="bg-white margin-lr-xs  padding-sm cf" v-for='(item,index) in goodsList.list' :key='index' style="border-bottom:1px solid #f1f1f1"
				 @click="NavigateToGoodsDetail(item.gid)">
					<view class="fl">
						<view class="cu-avatar radius  margin-right lg" style="border-radius: 10rpx; " :style="{'background-image':'url(//'+item.goods.coverImgpath+')'}"></view>
					</view>
					<view class="fr margin-top-lg ">
						<text class="text-xl">￥<text class="text-red">{{item.goods.price}}</text></text>

					</view>
					<view style="width:75%;height: 120rpx;line-height: 44rpx;">
						<view class="kp-goods-name">{{item.goods.gname}}</view>
					</view>

				</view>

			</block>
			<!-- 满30自动开奖 -->
		</block>
	</view>
</template>

<script>
	import tuiBottomPopup from "@/components/bottom-popup/bottom-popup"
	import tuiButton from "@/components/button/button"
	import {
		getRecordList,
		getGoodsList,
		getZoneData,
	} from "@/api/zoneRecordApi.js"

	//引入微信支付请求
	import {
		getPrepayData
	} from '@/api/pay.js'

	import {
		getOrderList,
	} from "@/api/orderApi.js"

	export default {
		components: {
			tuiBottomPopup,
			tuiButton,
		},
		data() {
			return {
				loading: true,
				popupShow: false,
				attrList: [],
				value: 1,
				cur: 0,
				recordList: {},
				zrid: 0,
				goodsList: {},
				numList: [],
				zoneId: 0,
				zoneData: {},
				zoneNumList: [],
				ZNresult: [],
				zNum: 0,
				userOrder: {},
				animationData1: {},
				animationData2: {},
				animationData3: {},
				userData: {},
				inField: false,
				isWinning: false,
				winningNumber: undefined,
				zoneBlockNo:undefined
			}
		},
		async onLoad(option) {
			this.zoneId = option.zid;
			const res = await getZoneData(option.zid);
			this.zoneInfo = res.data.Zone;

			

		},
		mounted() {
			let that = this;
			//获取用户信息
			let USERDATA = uni.getStorageSync("USERDATA");
			if (USERDATA) {
				// console.log("用户已登录")
				this.userData = USERDATA;
				// console.log(this.userData)
			}
			//查询记录
			this.getZoneDataInfo();
			//查询用户订单
			this.getUserOrder();
			//查询套餐列表
			this.getGoodsList()
			
			// 开奖动画
			this.redPacketOpacity();
			this.pageOpacity()
		},
		methods: {
			redPacketOpacity: function() {
				let that = this;
				var animation = uni.createAnimation({
					duration: 100,
					timingFunction: 'ease',
				})

				this.animation = animation
				// 改变透明度
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

			//获取游戏信息
			getZoneDataInfo: async function() {
				const that = this;
				const recordListRes = await getRecordList(1, 9999, that.zoneId); //游戏记录
				const zoneData = await getZoneData(that.zoneId); //游戏信息
				that.zoneData = zoneData.data.Zone;
				that.winningNumber = zoneData.data.Zone.winningNumber

				that.recordList = recordListRes.data.page.list;

				for (let i = 0; i < that.zoneData.maxNumber; i++) {
					that.recordList = recordListRes.data.page.list;

					for (let i = 0; i < that.zoneData.maxNumber; i++) {

						let obj = {
							number: i + 1,
							hasChoose: that.isChoose(i + 1)
						}
						that.zoneNumList.push(obj);
					}

					let len = that.zoneNumList.length;

					for (var i = 0; i < len; i += (len / 5)) {
						that.ZNresult.push(that.zoneNumList.slice(i, i + (len / 5)));
					}
				}
			},
			//获取用户订单
			async getUserOrder() {
				const that = this;

				const userOrderRes = await getOrderList({
					pageindex: 1,
					pagesize: 999,
					uid: that.userData.uid,
					orderType: 3,

				});
				that.userOrder = userOrderRes.data.page.list;

				const zoneData = await getZoneData(that.zoneId); //游戏信息
				const winningNumber = zoneData.data.Zone.winningNumber

				//判断是否中奖
				//场次判断
				let lidRes = that.userOrder.some((item) => {
					return item.zoneId == that.zoneId
				})

				if (lidRes) {

					that.inField = true;

					let numRes = that.userOrder.some((item) => {
						return item.zoneBlockNo == winningNumber
					})

					that.isWinning = numRes;
				}
				that.loading = false;
			},

			async onPullDownRefresh() {
				const goodsListRes = await getGoodsList(1, 10);
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			},
			//数字存在改变choose状态
			isChoose(num) {
				var choose = false;
				this.recordList.forEach((obj) => {
					if (obj.zoneNumber === num) {
						choose = true;
					}
				})
				return choose;
			},
			//获取套餐
			async getGoodsList() {

				const goodsListRes = await getGoodsList(1, 999);
				this.goodsList = goodsListRes.data.page;
				// console.log(that.goodsList)
			},
			showPopup(index) {
				this.popupShow = true;
				this.zoneBlockNo = index+1;
				// console.log(index)
				// 弹框内数字
				for (let i = 0; i < this.ZNresult[index].length; i++) {
					this.attrList.push(this.ZNresult[index][i])
				}
				this.cur = 0;
				console.log(this.attrList)
			},
			hidePopup() {
				this.popupShow = false;
				this.attrList = [];
			},
			pay(num) {
				let that = this;
				that.popupShow = false;
				that.attrList = [];
			
				let price = parseInt((that.zoneInfo.joinPrice) * 100);
				uni.navigateTo({

					url: `/pages/pay/pay?price=${price}&orderType=3&zoneId=${that.zoneInfo.zoneId}&zoneNum=${num}&zoneBlockNo=${that.zoneBlockNo}`
				})
			
			},
			showToast() {
				uni.showToast({
					icon: 'none',
					title: "请选择别的号码",
					mask: true
				})
			},
			change(e) {
				this.value = e.value
			},
			chooseAttr(i, v) {
				if (v.hasChoose) {
					this.showToast();
				} else {
					this.cur = i,
						this.zNum = v.number;
					// console.log(this.zNum)
				}
			},
			NavigateToGoodsDetail(gid) {
				uni.navigateTo({
					url: "/pages/main/goods-detail/goods-detail?gid=" + gid,
				});
			},
		},
	}
</script>

<style>
	.kp-infobtn {
		position: absolute;
		bottom: 80rpx;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;

	}

	/* 红包层 */
	.mask {
		width: 100%;
		height: 100vh;
		padding-top: 25vh;
		position: absolute;
		z-index: 22;
		background: rgba(255, 255, 255, .8) url(../../../static/markbg.jpg);
		background-size: contain;
	}

	.prizeInfo {
		width: 100%;
		height: 100vh;
		padding-top: 25vh;
		position: absolute;
		z-index: 22;
		/* background: rgba(255, 255, 255, .8) url(../../../static/markbg.jpg); */
		background-size: contain;
	}

	image {
		height: auto;
		max-width: 100%;
	}

	.red-packet {
		color: #fff;
		padding: 1em;
		height: 16em;
		margin: auto;
		max-width: 12em;
		overflow: hidden;
		position: relative;
		border-radius: 1em;
		background: #c40b00;
		animation: red-packet .75s both cubic-bezier(0.68, -0.55, 0.27, 1.55);
	}

	.info {
		height: 20em;
		margin: 0 auto;
		max-width: 19em;
		overflow: hidden;
		position: relative;
		border-radius: 1em;
		background: url(../../../static/kj.gif) no-repeat;
		background-size: contain;
		animation: red-packet .75s both cubic-bezier(0.68, -0.55, 0.27, 1.55);
	}

	.red-packet .header {
		top: -9em;
		left: 0;
		right: 0;
		height: 14em;
		position: absolute;
		border-radius: 100%;
		background: #b00b00;
	}

	.red-packet image {
		left: 0;
		right: 0;
		bottom: -2em;
		margin: auto;
		max-width: 5em;
		position: absolute;
		border-radius: 100%;
		border: .25em solid #fff;
	}

	.red-packet .main {
		margin-top: 15em;
		text-align: center;
	}

	.red-packet .author {
		opacity: .7;
	}

	.red-packet .open {
		outline: 0;
		width: 2em;
		height: 2em;
		color: #fff;
		border: none;
		display: block;
		line-height: 2;
		font-size: 2em;
		cursor: pointer;
		margin: 1em auto;
		background: #ffb03a;
		border-radius: 100%;
		transition: background .3s, transform .3s;
	}

	.red-packet .open:hover {
		transform: scale(1.1);
	}

	.red-packet .open:active {
		background: #eba534;
	}

	@keyframes red-packet {
		from {
			opacity: 0;
			transform: scale(0);
		}

		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	/* animation: red-packet .75s both cubic-bezier(0.68, -0.55, 0.27, 1.55); */

	/* 红包层end */
	.disable {
		background: grey !important;
		color: #fff;
	}

	.kp-goods-name {
		/* padding-right: 20rpx; */
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* font-size: 32rpx !important; */
		/* line-height: 1.5; */
	}

	.kp-game {
		/* height: 220rpx; */
		padding: 20rpx;
	}

	.kp-game-item {
		padding-top: 20rpx
	}

	.footlbox {
		width: 70%;
	}

	.footrbox {
		width: 30%;
		line-height: 100rpx;
	}

	.ball {
		width: 50rpx;
		height: 50rpx;
		line-height: 50rpx;
		border-radius: 50%;
		margin: 0 auto;
		background: yellow;
		margin: 4rpx;

	}

	.amount:before {
		content: "";
		width: 100%;
		height: 2rpx;
		position: relative;
		left: 0;
		top: -18rpx;
		background: #f0f0f0;
	}

	.stock {
		border-left: 2rpx solid #f0f0f0;

	}

	.arrow:before,
	.arrow:after {
		content: '';
		width: 100%;
		height: 20rpx;
		position: relative;
		left: 0;
		background: #f0f0f0;
	}

	.arrow:before {
		top: -20rpx
	}

	.arrow:after {
		bottom: -20rpx
	}

	.tab-style:after {
		content: '';
		width: 100%;
		height: 4rpx;
		position: relative;
		left: 0;
		bottom: -4rpx;
		background: #f0f0f0;
	}

	.tui-tabs-view {
		z-index: 1;
	}

	.tui-divider-text {
		background-color: transparent !important;
	}

	/*底部操作栏*/

	.tui-col-7 {
		width: 58.33333333%;
	}

	.tui-col-5 {
		width: 41.66666667%;
	}

	.tui-operation {
		width: 100%;
		height: 100rpx;
		/* box-sizing: border-box; */
		background: rgba(255, 255, 255, 0.98);
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: space-between;
		z-index: 10;
		bottom: 0;
		left: 0;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-safearea-bottom {
		width: 100%;
		height: env(safe-area-inset-bottom);
	}

	.tui-operation::before {
		content: '';
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		border-top: 1rpx solid #eaeef1;
		-webkit-transform: scaleY(0.5);
		transform: scaleY(0.5);
	}

	.tui-operation-left {
		display: flex;
		align-items: center;
	}

	.tui-operation-item {
		flex: 1;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		position: relative;
	}

	.tui-operation-text {
		font-size: 22rpx;
		color: #333;
	}

	.tui-opacity {
		opacity: 0.5;
	}

	.tui-scale-small {
		transform: scale(0.9);
		transform-origin: center center;
	}

	.tui-operation-right {
		height: 100rpx;
		/* box-sizing: border-box; */
		padding-top: 0;
	}

	.tui-right-flex {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.tui-btnbox-4 .tui-btn-class {
		width: 90% !important;
		display: block !important;
		font-size: 28rpx !important;
	}

	.tui-operation .tui-badge-class {
		position: absolute;
		top: -6rpx;
		/* #ifdef H5 */
		transform: translateX(50%)
			/* #endif  */
	}

	.tui-flex-1 {
		flex: 1;
	}

	/*底部操作栏*/

	/* 弹层 */
	.tui-popup-class {
		border-top-left-radius: 24rpx;
		border-top-right-radius: 24rpx;
		padding-bottom: env(safe-area-inset-bottom);
	}

	.tui-popup-box {
		position: relative;
		padding: 30rpx 0 60rpx 0;
	}

	.tui-popup-btn {
		width: 100%;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.tui-popup-btn .tui-btn-class {
		width: 90% !important;
		display: block !important;
		font-size: 28rpx !important;
	}

	.tui-icon-close {
		position: absolute;
		top: 30rpx;
		right: 30rpx;
	}

	.tui-product-box {
		display: flex;
		align-items: flex-end;
		font-size: 24rpx;
		padding-bottom: 30rpx;
	}


	.tui-amount {
		color: #ff201f;
		font-size: 36rpx;
	}

	.tui-number {
		font-size: 24rpx;
		line-height: 24rpx;
		padding-top: 12rpx;
		color: #999;
	}

	.tui-popup-scroll {
		height: 300rpx;
		font-size: 26rpx;
	}

	.tui-scrollview-box {
		padding: 0 30rpx 30rpx 30rpx;
		box-sizing: border-box;
	}

	.tui-attr-title {
		padding: 10rpx 0;
		color: #333;
	}

	.tui-attr-box {
		font-size: 0;
		padding: 20rpx 0;
	}

	.tui-attr-item {
		width: 80rpx;
		/* min-width: 200rpx; */
		height: 80rpx;
		display: -webkit-inline-flex;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		background: #f7f7f7;
		/* padding: 0 40rpx; */
		box-sizing: border-box;
		border-radius: 40rpx;
		margin-right: 20rpx;
		margin-bottom: 20rpx;
		font-size: 34rpx;
	}

	.tui-attr-active {
		background: #fcedea !important;
		color: #e41f19;
		font-weight: bold;
		position: relative;
	}

	.tui-attr-active::after {
		content: "";
		position: absolute;
		border: 1rpx solid #e41f19;
		width: 100%;
		height: 100%;
		border-radius: 40rpx;
		left: 0;
		top: 0;
	}

	.tui-number-box {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20rpx 0 30rpx 0;
		box-sizing: border-box;
	}

	/* 弹层end */
</style>
