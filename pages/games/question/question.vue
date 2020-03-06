<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true" ref='backbar'>
			<block slot="backText">返回</block>
			<block slot="content">芝麻开门</block>
		</cu-custom>
		<view v-if="!loading">
			<view v-show='false' id="top-box" class="cu-bar bg-white solid-bottom">
				<view class="action text-black text-center">
					<text>单选题</text>
				</view>
				<view class="action">
					<button class="cu-btn bg-green shadow" @tap="showCardModal" data-target="modalCard">答题卡</button>
				</view>
			</view>
			<view class="cu-modal" :class="modalCard=='modalCard'?'show':''" @tap="hideCardModal">
				<view class="cu-dialog" @tap.stop>

					<scroll-view class="page padding" :scroll-y=true :style="{'height':swiperHeight}">
						<view class="cu-bar solid-bottom">
							<view class="action">
								<text class="cuIcon-title text-red"></text>答题卡
							</view>
						</view>
						<view class="grid col-5 ">
							<view class="margin-tb-sm text-center" v-for="(subject,index) in subjectList" :key="index">
								<button class="cu-btn round" :class="[subject.quizQuestionSelection.length==0?'line-grey':'bg-red']" @click="AppointedSubject(index)">{{index+1}}</button>
							</view>
						</view>

					</scroll-view>
				</view>
			</view>
			<view class="cu-modal padding " :class="modalError=='modalError'?'show':''" @tap="hideErrorModal">
				<view class="cu-dialog bg-white" @tap.stop>

					<view class="cu-bar solid-bottom ">
						<view class="action">
							<text class="cuIcon-title text-red"></text>试题纠错
						</view>
					</view>

					<radio-group class="block">
						<view class="cu-list menu text-left">
							<view class="cu-item cu-item-error" v-for="(error,index) in errorList" :key='index'>
								<radio :value="error"></radio>
								<view class="title text-black margin-left">{{error}}</view>
							</view>
						</view>
					</radio-group>

					<view v-show="false" class="padding flex flex-direction ">
						<button class="cu-btn bg-red margin-tb-sm lg" @click="SubmitError">提 交</button>
					</view>
				</view>
			</view>
			<form>
				<swiper :current="subjectIndex" class="swiper-box" @change="SwiperChange" :style="{'height':swiperHeight}">
					<swiper-item v-for="(subject,index) in subjectList" :key='index'>

						<view v-if="index-subjectIndex>=-1&&index-subjectIndex<=1">

							<view class="cu-bar bg-white solid-bottom">
								<view class="action text-black">
									<text class="cuIcon-title text-red"></text>{{subject.content}}
								</view>
							</view>
							<view>

								<radio-group class="block" @change="RadioboxChange">
									<view class="cu-form-group" v-for="(option,index) in subject.quizQuestionSelection" :key='index'>
										<radio :value="option.selectId"></radio>
										<view class="title text-black">{{option.selectId}}.{{option.content}}</view>
									</view>
								</radio-group>


							</view>

							<view v-show="subject.showAnswer" class="margin-top solid-top">
								<view class="cu-bar">
									<view class="action  text-grey">
										<text>正确答案：</text>
										<text class="solid-bottom  padding-left text-green">{{subject.answer}}</text>
									</view>
								</view>
							</view>

						</view>
					</swiper-item>
				</swiper>
			</form>
			<view id="foot-box" class="cu-bar tabbar bg-white shadow foot">

				<view class="action text-gray" @click="forbid?MoveSubject(1):''">
					<view class="cuIcon-cu-image">
						<text class="lg cuIcon-right" :class="{'text-blue':forbid}"></text>
					</view>
					<view :class="{'text-blue':forbid}">下一题</view>
				</view>


			</view>
		</view>


	</view>
</template>

<script>
	import {
		getQuestionList,
		getQuestionGiftList,
		sendQuizGift,
		deductGold
	} from "@/api/gameApi.js"
	export default {
		data() {
			return {
				userFavor: false, //是否已收藏
				subjectIndex: 0, //跳转索引
				autoShowAnswer: false, //答错是否显答案
				autoRadioNext: true, //判断题、单项题，自动移下一题
				swiperHeight: '800px', //
				title: '芝麻开门',
				subjectList: {},
				modalCard: null, //显示答题卡
				modalError: null, //纠错卡
				errorList: ['题目不完整', '答案不正确', '含有错别字', '图片不存在', '解析不完整', '其他错误'],
				count: 0, //答对计数
				giftList: {},
				forbid: false,
				uid: 1,
				values: '',
				loading: true,
				prizeInfo:{}


			}
		},
		onReady() {

			var tempHeight = 800;
			var _me = this;
			uni.getSystemInfo({
				//获取手机屏幕高度信息，让swiper的高度和手机屏幕一样高                
				success: function(res) {
					tempHeight = res.windowHeight;

					uni.createSelectorQuery().select("#top-box").fields({
						size: true,
						scrollOffset: true
					}, (data) => {
						// tempHeight -= data.height;
						// console.log("减掉顶部后的高度 " + tempHeight);

						uni.createSelectorQuery().select("#foot-box").fields({
							size: true,
							scrollOffset: true
						}, (data) => {
							tempHeight -= data.height;
							// console.log("减掉底部后的高度 " + tempHeight);
							_me.swiperHeight = tempHeight + 'px';
							// console.log("滑屏最后高度 " + _me.swiperHeight);
						}).exec();

					}).exec();
				}
			});

		},
		async onLoad() {
			//获取个人信息
			const userinfo = uni.getStorageSync("USERDATA");
			const deductData = await deductGold(3, userinfo.uid)
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
				return;
			}
			//获取题目
			const questionListRes = await getQuestionList(1, 30);
			this.subjectList = questionListRes.data.page.list;

			console.log(this.subjectList)

			//获取奖品列表
			const giftListRes = await getQuestionGiftList(1, 30);
			this.giftList = giftListRes.data.page.list,
				console.log(this.giftList)

			uni.setNavigationBarTitle({
				title: this.title
			});
			//添加用户显示答案字段
			for (var i = 0; i < this.subjectList.length; i++) {
				this.$set(this.subjectList[i], "showAnswer", false);
			}

			this.loading = false;

		},
		methods: {
			showCardModal: function(e) {
				this.modalCard = e.currentTarget.dataset.target
			},
			hideCardModal: function(e) {
				this.modalCard = null
			},
			showErrorModal: function(e) {
				this.modalError = e.currentTarget.dataset.target
			},
			hideErrorModal: function(e) {
				this.modalError = null
			},
			SwiperChange: function(e) { //滑动事件

				let index = e.target.current;
				if (index != undefined) {
					this.subjectIndex = index;
					// this.userFavor = this.subjectList[index].userFavor;
				}
			},

			RadioboxChange: function(e) { //单选选中

				this.values = e.detail.value;
				this.forbid = true;

				//计算答对题数

			},

			MoveSubject: async function(e) { //上一题、下一题
				let that = this;


				if (e === -1 && that.subjectIndex != 0) {
					that.subjectIndex -= 1;
				}
				if (e === 1 && that.subjectIndex < that.subjectList.length - 1) {
					that.subjectIndex += 1;
					that.disabled = "";
					that.forbid = false;

					let answer = that.subjectList[that.subjectIndex - 1].answer;
				
					
					if (that.values == answer) {
						that.count += 1;

						for (let i = 0; i < that.giftList.length; i++) {

							if (that.count == that.giftList[i].answerNumber) {
								// console.log(that.giftList[i])
								that.prizeInfo = that.giftList[i]

							}
						}

					} else {
						this.saveCoupon()
					}

				}
				else if (that.subjectIndex == that.subjectList.length - 1) {
					that.count += 1;
					this.saveCoupon()
				}

			},
			
			saveCoupon(){
				
				let coupon = this.prizeInfo.couponType;
				console.log(coupon)
				console.log(this.count)
				let content = '';
				if (coupon.deductType == 2) {
					content = `你答对了${this.count}题,获得${(1-coupon.discount)*10}折 ${coupon.ctypename}一张`
				}
				if (coupon.deductType == 1) {
					content = `你答对了${this.count}题,获得满${coupon.amountPrice}减${coupon.fullDeductMoney}现金券一张`
				}
				uni.showModal({
					title: '很抱歉答题错误，闯关失败',
					content: content,
					showCancel: false,
					success: async () => {
						// 发送中奖数据给后端
						let uid = {
							uid: this.uid
						}
						let answerNumber = {
							answerNumber: this.count
						}
						let sendData = {
							...coupon,
							...uid,
							...answerNumber
						}
						const sendRes = await sendQuizGift(sendData)
						// console.log(sendData)
						setTimeout(()=>{
							uni.redirectTo({
								url: '/pages/index/index'
							})
						},1000)
						
					}
				});
			},
			AppointedSubject: function(e) { //题卡指定

				this.modalCard = null;
				this.subjectIndex = e;
			},

			SubmitError: function(e) { //提交纠错

				this.modalError = null;
			}

		}
	}
</script>

<style>
	@import "../../../colorui/animation.css";

	page {
		background-color: #FFFFFF;
	}

	.cu-form-group {
		justify-content: flex-start
	}

	.cu-form-group .title {
		padding-left: 30upx;
		padding-right: 0upx;
	}

	.cu-form-group+.cu-form-group {
		border-top: none;
	}

	.cu-bar-title {
		min-height: 50upx;
	}

	.cu-list.menu>.cu-item-error {
		justify-content: flex-start;
	}
</style>
