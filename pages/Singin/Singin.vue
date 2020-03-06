<template>
	<view>
		<cu-custom bgColor="bg-black" class="text-white" :isBack="true">
			<block slot='content'>签到</block>
		</cu-custom>
		<view v-if='!loading'>

			<!-- 签到日历 -->
			<view class="padding flex flex-wrap justify-between align-center bg-white padding-top-lg  padding-bottom-lg">
				<button class="cu-btn bg-white round lg text-center " :class="[isSingin.hasSignin?'border-gray':'border-orange text-orange ' ]"
				 style="margin: 0 auto;width: 35%;" @click="singIn">{{isSingin.hasSignin?'已签到' : '签到答题'}}</button>

			</view>
			<ssCalendar :checks="checks">
			</ssCalendar>
		</view>
	</view>
</template>

<script>
	import ssCalendar from '@/components/ss-calendar/ss-calendar.vue'
	import {
		singin,
		singinList,
		isSingin
	} from '@/api/singinApi.js'

	var formatDate = function(date) {
		var y = date.getFullYear();
		var m = date.getMonth() + 1;
		m = m < 10 ? '0' + m : m;
		var d = date.getDate();
		d = d < 10 ? ('0' + d) : d;
		return y + '-' + m + '-' + d;
	};


	export default {
		components: {
			ssCalendar
		},
		data() {
			return {
				checks: [],
				loading: true,
				userData: {},
				date: formatDate(new Date()),
				isSingin: false,
			}
		},
		async mounted() {

			//获取用户信息
			let USERDATA = uni.getStorageSync("USERDATA");
			if (USERDATA) {
				console.log("用户已登录")
				this.userData = USERDATA;
				// console.log(this.userData)
			}

			//查询是否已签到
			const isSinginRes = await isSingin({
				"signDate": this.date,
				"uid": this.userData.uid
			})
			this.isSingin = isSinginRes.data;

			//查询签到日历
			const singinListRes = await singinList(1, 999, this.userData.uid);
			const list = singinListRes.data.page.list;

			for (let i = 0; i < list.length; i++) {
				this.checks.push(new Date(list[i].createTime).getDate())
			};

			// console.log(this.checks);


			this.loading = false;
		},
		async onPullDownRefresh() {
			const isSinginRes = await isSingin({
				"signDate": this.date,
				"uid": this.userData.uid
			})
			const singinListRes = await singinList(1, 999, this.userData.uid);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {
			async singIn() {
				if (this.isSingin.hasSignin) {
					uni.showToast({
						title: '' + this.isSingin.msg,
						icon: 'none'
					})
				} else {
					const day = new Date().getDate()
					// // console.log(day)
					this.checks.push(day)
					let saveData = {
						"signDate": this.date,
						"uid": this.userData.uid
					}
					const res = await singin(saveData)
					// console.log(res)
					//跳转到答题页面
					setTimeout(() => {
						uni.navigateTo({
							url: "/pages/games/question/question"
						})
					}, 1000)

				}

			}



		}
	}
</script>

<style lang='scss'>
	page {
		background: #fff;
	}

	.cu-item .content {
		line-height: 2.6 !important;
	}

	.list-log {
		width: 400rpx;
		height: 100rpx;
		line-height: 100rpx;
		position: absolute;
		z-index: 33;
		top: -10rpx;
		left: 50%;
		font-size: 20px;
		color: #fff;
		font-family: '楷体';
		transform: translateX(-50%);
		background: url('../../static/answerList.gif') no-repeat;
		background-size: 100%;
	}

	.border-orange {
		border: 1px solid orange;
	}

	.border-gray {
		border: 1px solid gray;
	}
</style>
