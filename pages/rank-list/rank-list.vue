<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true" ref='backbar'>
			<block slot="backText">返回</block>
			<block slot="content">排行榜</block>
		</cu-custom>

		<view class=" padding-tb kp-radius-tr margin-top-xs" style="position: relative;background: #fe7c04;width: 100%;height: 1300rpx;">
			<view class="list-log text-center ">
				幸运榜单
			</view>
			<view class="cu-list menu  sm-border card-menu padding-lr padding-top" style="background-color: #fff5ec;">
				<view class="cu-item bg-white margin-bottom-xs radius" v-for='(item,index) in  quizRecordlist' :key='index'>
					<template v-if="quizRecordlist.length <= 10 ">
						<view class="content text-xs" style="width: 100%;">
							<view class="text-center text-black fl" style="width: 60rpx;display: inline-block;">{{index+1}}</view>
							<view class="cu-avatar round margin-lr-xs fl" :style="{'background-image':'url('+item.user.avatar+')'}"></view>
							<text class="text-black text-cut fl" style="width: 52%;">{{item.user.nickname}}</text>
							<view class="fr text-black ">{{item.answerNumber}}题</view>
						</view>
					</template>
					<template v-else-if="quizRecordlist.length <= 0">
						<view>暂无排名</view>
					</template>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import {
		getquizRecordlist
	} from "@/api/ranListApi.js"
	export default {
		data() {
			return {
				quizRecordlist: [],
			}
		},
		mounted: async function() {
			const quizRecordlist = await getquizRecordlist()
			console.log(quizRecordlist)
			this.quizRecordlist = quizRecordlist.data.leaderboard
		},
		async onPullDownRefresh() {
			const quizRecordlist = await getquizRecordlist();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		methods: {

		}
	}
</script>

<style lang="scss">
	page {
		background: #fff5ec;
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
		top: -8rpx;
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
