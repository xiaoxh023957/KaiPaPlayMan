<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true" ref='backbar'>
			<block slot="backText">返回</block>
			<block slot="content">芝麻开门</block>
		</cu-custom>
		<view style="height: 100vh; background: url(../../../static/q.jpg); background-size: contain;">
			<view class="mian">
				<button class="cu-btn padding text-xxl round text-orange" @click="toQuestion()">开始答题</button>
				<view class=" padding text-xxl text-black text-center" @click="toRank"> 排行榜</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				barHeight:0,
				
				
			}
		},
		onLoad() {
			this.barHeight = this.$refs.backbar;
			console.log(this.barHeight)
		},
		methods: {
			toQuestion(){
				uni.navigateTo({
					url: "/pages/games/question/question"
				})
			},
			toRank(){
				uni.navigateTo({
					url: "/pages/rank-list/rank-list"
				})
			},
		}
	}
</script>

<style>
	.mian{
		position:absolute;
		top: 50%;
		left:50%;
		transform: translate(-50%,-50%);
	}
</style>
