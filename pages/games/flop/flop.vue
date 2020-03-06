<template>
	<view>
		<cu-custom bgColor="kpbg-black" :isBack="true" class="text-white" ref='backbar'>
			<block slot="backText">返回</block>
			<block slot="content">夺宝狂欢</block>
		</cu-custom>
		<view v-if="!loading" style="padding-top:218rpx;" :style="[
			{'min-height':deviceHeight-backbarHeight+'px'},
			{'background':'#ffc73c url(/static/flopbg.jpg) no-repeat'},
			{'background-size':'100%'}
			]">
			<view class="card-module">
				<view class="card " :class=" item.showClass ? 'change' : ''" v-for="(item,index) in awardsConfig" :key="index"
				 :animation="item.animationData" @tap="handleCurClick" :data-id="item.id" :data-disabled=" item.disabled " :style="{'width': carWidth, 'height': carWidth}">
					<view class="front card-item">
						<image :src="item.front"></image>
					</view>
					<view class="back card-item " :class="item.opacity ? 'opacity' : ''">
						<image :src="item.back"></image>
					</view>
				</view>
			</view>
			<view class="left" style="margin-left: 20px;">开趴币: <text style="color:#e4431a;">{{userInfo.gold}}</text></view>
			<!-- <button bindtap="allMove">洗牌</button> -->
			<view class="padding-lg">
				<view class="padding-lg text-red kp-border" style="line-height: 1.6;">
					{{flop.roleInfo}}
				</view>

			</view>

		</view>

	</view>
</template>

<script>
	import {
		selectFrequency,
		user,
		deductGold,
		coupon,
		getFlop,
		couponList
	} from "@/api/gameApi.js"
	export default {
		data() {
			return {
				loading:true,
				frequency: 1,
				DrawsGiftList: {},
				carWidth: '', //卡片宽度
				number: 10,
				deviceHeight: 0,
				backbarHeight: 0,
				awardsConfig: [],
				thanksarr: [],
				flop: {},
				prizeAll:{},
				cardData: [{
						animationData: {},
						front: '../../../static/images/1f.png',
						back: '../../../static/images/1z.png', //优惠券类型图
						id: '1',
						showClass: false, // 控制翻转
						opacity: false, // 控制翻转过来以后的 opacity
						money: 1,
						disabled: false, // disabled 属性，控制手速点击过快，导致多个牌被翻开, 默认为false 可以点击
					},

				],
				userInfo: {},
				uid: 1
			}
		},
		onLoad() {
			let carWidth = 0;
			const {
				awardsConfig
			} = this.awardsConfig;
			this.addPosition(awardsConfig); // 数组添加移动坐标位置
			uni.getSystemInfo({
				success(res) {
					carWidth = parseInt((res.windowWidth - 40) / 3);
				}
			})
			let userInfo = uni.getStorageSync("USERDATA");
			if (userInfo) {
				this.userInfo = userInfo;
			} else {
				uni.redirectTo({
					url: "/pages/register/register"
				})
			}
		},
		mounted: async function(options) {
			//设置当前用户ID
			let userData = uni.getStorageSync("USERDATA");
			this.uid = userData.uid;
			let that = this;
			uni.getSystemInfo({
				success: function(res) {
					that.deviceHeight = res.windowHeight //获取视口高度
				},
			});

			this.backbarHeight = parseFloat(((this.$refs.backbar.style).split(":"))[1]); //获取backbar高度值

			const DrawsGiftList = await selectFrequency(this.frequency);
			this.initdata(this);

			// 翻牌接口
			const getFlopContent = await getFlop();
			// console.log(getFlopContent);
			this.flop = getFlopContent.data.Draws;
			
			// 优惠卷
			// debugger
			const prize = await couponList(1,10);
			console.log(prize)
			this.prizeAll = prize.data.page.list;
			console.log(this.prizeAll)

		},
		methods: {
			// 初始化数据
			initdata: async function(that) {
				const listRes = await selectFrequency(6);
				that.awardsConfig = listRes.data.drawsGift;
				// 获取奖品的个数
				let awarrlength = that.awardsConfig.length

				// 为每一项追加index属性
				that.awardsConfig.forEach(function(element, index) {
					element.front = '../../../static/images/1f.png',
						element.back = '../../../static/images/1z.png',
						element.id = index + 1,
						element['showClass'] = false,
						element['opacity'] = false,
						element['disabled'] = false
				})

				// push 谢谢参与奖项



				for (var i = 0; i <= 3 * 2; i++) {
					if (i % 3 == 0) {
						that.thanksarr.push(i)
						that.awardsConfig.splice(i, 0, {
							'ctypename': '谢谢参与',
							'id': i * 2019,
							front: '../../../static/images/1f.png',
							back: '../../../static/images/2z.png', //优惠券类型图
							disable: false,
							showClass: false,
							opacity: false
						});
					}
				}
				// console.log(that.awardsConfig);
				this.loading = false
			},


			rpx2px(num) {
				return uni.rpx2px(num);
			},
			// 数组添加移动坐标值 并且把所有的disabled 状态还原会false 
			addPosition(awardsConfig) {
				const lineTotal = 3 // 单行数
				this.awardsConfig.map((item, index) => {
					let x = index % lineTotal
					let y = parseInt(index / lineTotal)
					item.twoArry = {
						x,
						y
					}
					item.disabled = false; // 还原所有的disabled 状态
				})
			},


			//全部翻转
			allChange() {
				this.awardsConfig.map(item => {
					if (!item.showClass) {
						item.showClass = true;
					}
				})
			},

			//洗牌
			allMove() {
				// 110 是卡牌宽度加边距
				this.shuffle(this.carWidth) //移动到中心,  110 是牌的宽度，加上外边距边框
				let timer = setTimeout(() => {
					// 每次移动到中心位置以后，先打乱数组顺序，给数组每一项重新添加移动坐标值，setData({cardData}) 然后在散开
					this.cardData.sort(this.randomsort);
					this.addPosition(this.cardData)
					clearTimeout(timer)
					this.shuffle(0) // 间隔1秒钟，移动到原来位置
				}, 1000)
			},



			// 处理单个点击翻转
			async handleCurClick(event) {
				// console.log(event)
				const deductData = await deductGold(2, this.uid)
				// console.log(deductData)
				if (deductData.data.code == 500) {
					uni.showModal({
						title: '',
						content: deductData.data.msg,
						showCancel: false,
						success(res) {
							if (res.confirm) {
								return false;
							}
						}
					});
					return
				}
				this.userInfo.gold = deductData.data.userInfo.gold
				let curId = event.currentTarget.dataset.id;
				// 每次点击时获取被点击拍的disable 属性，
				let disabled = event.currentTarget.dataset.disabled;
				let that = this;
				let couponData = {
					uid: that.uid,
					ctypeid: that.prizeAll.ctypeid,
					originate: 1
				}

				const res = await coupon(couponData)
				if (res.statusCode === 200) {
					uni.showModal({
						title: '优惠卷已发放至个人中心',
						content: 'OK',
						showCancel: false
					})
				} else {
					uni.showModal({
						title: '',
						content: '失败',
						showCancel: false
					})
				}
				//如果为true 就返回不继续向下执行
				if (disabled) {
					return;
				}

				this.awardsConfig.forEach(item => {
					item.disabled = true; // 点击一张拍以后，把所有的牌的disabled 属性改成true ，
					if (item.id == curId) {
						item.showClass = true;
						// console.log(item.id)
					} else {
						item.opacity = true
					}
				})
				this.number -= 1;

				setTimeout(() => {
					this.allChange()
				}, 1000);
				let _this = this;
				setTimeout(() => {
					uni.showModal({
						title: '提示',
						content: '恭喜您中奖',
						// cancelText: '去看看',
						confirmText: '再翻一次',
						success: async function() {

							let listRes = await selectFrequency(6);
							_this.awardsConfig = listRes.data.drawsGift;
							// 获取奖品的个数
							let awarrlength = _this.awardsConfig.length

							// 为每一项追加index属性
							_this.awardsConfig.forEach(function(element, index) {
								element.front = '../../../static/images/1f.png',
									element.back = '../../../static/images/1z.png',
									element.id = index + 1,
									element['showClass'] = false,
									element['opacity'] = false,
									element['disabled'] = false
							})

							// push 谢谢参与奖项
							for (var i = 0; i <= 3 * 2; i++) {
								if (i % 3 == 0) {
									_this.thanksarr.push(i)
									//console.log(_this.thanksarr)
									_this.awardsConfig.splice(i, 0, {
										'ctypename': '谢谢参与',
										'id': i * 2019,
										front: '../../../static/images/1f.png',
										back: '../../../static/images/2z.png', //优惠券类型图
										disable: false,
										showClass: false,
										opacity: false
									});
								}
							}

							// console.log(_this.awardsConfig)

							// const DrawsGiftList = await selectFrequency(this.frequency);

							// 这里去请求接口重新获取数据，获取成功以后调用 this.shuffle(0) 这里用
							// setTimeout(() => {
							// 	uni.hideLoading()
							// 每次移动到中心位置以后，先打乱数组顺序，给数组每一项重新添加移动坐标值，setData({cardData}) 然后在散开
							// 	this.cardData.sort(_this.randomsort);
							// 	_this.addPosition(awardsConfig)
							// 	_this.shuffle(0)
							// }, 1000)

						}
					})
				}, 2000);
			}
		}
	}
</script>

<style scoped>
	.kpbg-yellow {
		background-color: #ffc83c;
	}

	.kpbg-flop {
		background: url('/static/flopbg.jpg') no-repeat;
		background-size: 100%;
	}

	.kp-border {
		border: 2rpx solid red;
		border-radius: 40rpx;
	}

	.card-module {
		padding: 20rpx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: space-around;
		transform: translate3d(0, 0, 0);
	}

	.card-module .card {
		width: 200rpx;
		height: 200rpx;
		line-height: 200rpx;
		text-align: center;
		color: #fff;
		margin: 11rpx;
		position: relative;
		overflow: hidden;
	}

	.card-module .card .card-item {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		transition: all .5s ease-in-out;
		transform-style: preserve-3d;
		backface-visibility: hidden;
		box-sizing: border-box;
	}

	.card-module .card image {
		width: 100%;
		height: 100%;
	}

	.card-module .card .front {
		/* background-color: red; */
		transform: rotateY(0deg);
		-webkit-transform: rotateY(0deg);
		z-index: 2;
	}

	.card-module .card .back {
		/* background-color: #009fff; */
		transform: rotateY(180deg);
		-webkit-transform: rotateY(180deg);
		z-index: 1;
	}

	.card-module .card.change .front {
		z-index: 1;
		transform: rotateY(180deg);
		-webkit-transform: rotateY(180deg);
	}

	.card-module .card.change .back {
		z-index: 2;
		transform: rotateY(0deg);
		-webkit-transform: rotateY(0deg);
	}

	.card-module .card.change .opacity {
		opacity: 0.5;
	}
</style>
