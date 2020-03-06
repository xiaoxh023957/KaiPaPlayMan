<template>
	<view>	 
		<view>
			<Main v-if="pageName==='Main'"></Main>
			<Find v-if="pageName==='Find'"></Find>
			<User v-if="pageName==='User'"></User>
			<!-- 解决底部bar遮盖问题 -->
			<view class="cu-tabbar-height"></view>
			
		</view>
		
		<view class="cu-bar tabbar kpbg-black foot">
			<view :class="pageName==='Main'?'text-orange':'text-white'" class="action " @click="jumpPage('Main')">
				<view class="cuIcon-homefill"></view> 首页
			</view>
		
			<view :class="pageName==='Find'?'text-orange':'text-white'" class="action" @click="jumpPage('Find')">
				<view class="cuIcon-search">
					
				</view>
				发现
			</view>
			<view :class="pageName==='User'?'text-orange':'text-white'" class="action" @click="jumpPage('User')">
				<view class="cuIcon-my">
					
				</view>
				我的
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				pageName:'Main'
			}
		},
		onLoad() {
			
			
			/**
			 * 获取微信登录信息
			 */
			let USERDATA = uni.getStorageSync("USERDATA");
			if(!USERDATA || USERDATA==undefined)
			{
				uni.redirectTo({
					url:"/pages/register/register"
				})
			}
		},
		methods: {
			jumpPage(pageName){
				this.pageName=pageName
			}
		}
	}
</script>

<style>
	
</style>
