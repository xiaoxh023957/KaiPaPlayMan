<template>
	<view>

		<!-- navbar -->
		<cu-custom bgColor="kpbg-black" :isBack="true" class="text-white">
			<block slot="backText">返回</block>
			<block slot="content">
				<view class="text-white">发起拼趴</view>
			</block>
		</cu-custom>

		<view class="text-black padding  text-lg bg-white " style="margin-bottom:4rpx">
			店铺名店铺名店铺
		</view>

		<view class="padding bg-white grid ">

			<image class="radius" style="width:35%; height:190rpx;" src="https://ossweb-img.qq.com/images/lol/web201310/skin/big10006.jpg"></image>

			<view class="padding-left-xs" style="width: 64%;">
				<view class="margin-bottom-xs text-lg" style="padding-right:100rpx">描述描述描述描述描述描述描述描述描述描</view>
				<view class="text-xs">
					<text class="text-gray">中包一间</text>
					<text class="text-grey margin-left">已拼2333件</text>
					<text class="text-right fr text-lg">X2</text>
				</view>
				<view class="cf">
					<text class="cu-tag round bg-red padding-lr margin-top-xs xs fl">5人团</text>
					<text class="text-red text-xxl margin-top-xs fr ">
						¥199.99
					</text>
				</view>
			</view>
		</view>

		<view class="margin-top-xs bg-white text-center padding">
			<view class=" text-black ">
				还差<text class="text-red">4</text>人即可拼趴成功，剩余

				<text style="display: inline-block; width:180rpx">
					<tui-countdown :time="timeList[4]" bcolor="transparent" :isColon="false" color="red" :height="30" :width="34"
					 :size="30" @end="endOfTime"></tui-countdown>

				</text>
			</view>

			<view class="member padding">
				<view class="cu-avatar round lg margin-left-xs" v-for="(item,index) in avatar" :key="index" :style="[{ backgroundImage:'url(' + avatar[index] + ')' }]">
					<view class="cu-tag badge bg-red text-white" v-show="index==0">团长</view>
				</view>
			</view>

			<view class="margin-auto margin-top ">
				<view class="cu-tag round line-grey padding-lg margin-right " @click="NavgetaToOrderSubmit">立即支付</view>
				<view class="cu-tag round bg-red  padding-lg margin-left"><text class="cuIcon-share"></text>邀人来参趴</view>
			</view>

		</view>


		<view class=" bg-white grid col-2 padding" style="margin-top:4rpx" @click="agreementShow">
			<view class="text-black padding-left">
				拼趴规则
			</view>
			<view class="text-gray text-right padding-right">
				好友参团·人满成团 <text class="cuIcon-right lg"></text>
			</view>
		</view>

		<!-- 年卡协议 -->
		<view class="agreement-mask" v-if='agreementIsShow'>
			<view class="bg-white padding-lg agreement ">
				<view class="text-grey text-lg text-center  padding-bottom-xs">
					拼趴规则
				</view>
				<view class="text-gray margin-bottom-xl agreement-item">
					欢迎您使用【拼趴】的服务，感谢您对【拼趴】的信任与支持！

					第一条 总则
					1.1 为维护您的权益，请您仔细阅读本《平台用户服务协议》（“本协议”）各条款的具体内容，充分理解其表述的含义。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。

					1.2 本协议各条款标题仅为帮助您理解该条款表达的主题之用，不影响或限制该条款的含义或解释。如您对本协议的约定尤其是涉及免除或者责任限制的条款有任何问题，可随时按照本协议列明的联系方式与我们联系，我们将为您进行详细的解释和说明。

					1.3
					当您按照注册页面提示填写信息、阅读并同意本协议且完成全部注册程序，或者以其他任何方式使用或接受【拼趴】提供的任何平台服务（“服务”，具体含义详见下文的定义条款），即表示您已充分阅读、理解并接受本协议项下的全部条款，并成为【拼趴】平台的“用户”，本协议对您具有法律约束力。在阅读本协议或者以其他任何方式使用或接受【拼趴】提供的任何服务的过程中，如果您不同意本协议全部或其中任何条款约定，您应立即停止注册程序或停止以其他任何方式使用或接受【拼趴】提供的任何服务。

					1.4
					除非您已阅读并接受本服务协议所有条款，否则您将不能使用【拼趴】提供的任何服务，如您不同意本协议的任意内容，请勿使用【拼趴】的服务。若您以任何方式实际访问、使用或接受了【拼趴】提供的任何服务，则视为您同意并接受本协议的内容，本协议对您具有法律约束力。

					1.5 在使用【拼趴】的服务前，您确认已完整阅读并明确知晓本协议的全部内容，且您对本协议中的加粗字体、下划线等重点标示条款已充分理解。

					1.6【拼趴】有权根据实际情况不断修订本协议及【拼趴】平台规则，并以在【拼趴】平台公示的形式进行更新和通知，不再单独通知您。经修订的本协议及【拼趴】平台规则一经在【拼趴】平台公示，即对您产生法律约束力效力。如您不同意相关修订内容，请您立即停止使用【拼趴】提供的任何服务。如您在修订事项生效后仍然继续使用【拼趴】平台服务，则视为您已同意并接受生效的变更事项。





				</view>
				<view class="cu-btn round agreement-btn padding-lr-lg bg-blue" @click="agreementHide">
					确定
				</view>
			</view>
		</view>



	</view>
</template>

<script>
	import tuiCountdown from "@/components/countdown/countdown"
	export default {
		components: {
			tuiCountdown
		},
		data() {
			return {
				timeList: [1000, 2000, 3000, 19, 240000],
				agreementIsShow: false,
				avatar: [
					'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg',
					'.',
					'.',
					'.',
					'.'
				],
			}
		},
		methods: {
			endOfTime: function() {
				this.tui.toast("倒计时结束，事件执行")
			},
			NavgetaToOrderSubmit() {
				uni.navigateTo({
					url: '/pages/main/order-submit/order-submit'
				})
			},
			agreementShow() {
				this.agreementIsShow = true
			},
			agreementHide() {
				this.agreementIsShow = false
			},

		}
	}
</script>

<style>
	.cu-tag.badge {
		right: 12rpx;

	}
	.agreement-mask{
		width: 100%;
		height:100vh; 
		background: rgba(0,0,0,.6);
		position:absolute;
		top:0rpx;
		z-index: 8888;
	}
	.agreement{
		width:80%;
		height: calc(100vh - 220rpx);
		border-radius: 30rpx;
		position:absolute;
		left:10%;
		top:120rpx;
		
	}
	.agreement-item{
		width:100% ;
		height: calc(100% - 110rpx );
		overflow: scroll;
		text-indent: 2em;
	}
	.agreement-btn{
		position: absolute;
		bottom:20rpx;
		 left:50%;
		 transform: translateX(-50%);
	}
</style>
