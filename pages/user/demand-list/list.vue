<template>
	<view>
		<cu-custom bgColor="kpbg-black" :isBack="true" class="text-white">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">我的需求</block>
		</cu-custom>
		<view class="cu-list menu-avatar ">
			<view class="cu-item bor padding-bottom" v-for="(item,index) in demandlist.list" :key="index" :class="modalName=='move-box-'+ index?'move-cur':''"
			 @touchstart="ListTouchStart" @touchmove="ListTouchMove" @touchend="ListTouchEnd" :data-target="'move-box-' + index"
			 @click="details(item.did)" :data-close="item.did" :did="item.did" ref="dataSelf" style="border-bottom:1rpx solid #F1F1F1">
				<view class="content">
					<view class="padding" style="position: absolute;left: -130rpx; top: -50rpx;">{{item.title}}

					</view>
					<view class="text-grey text-xs margin-right " style="position: absolute;left: -100rpx;top:25rpx;">{{item.createTime}}</view>
				</view>
				<view>
					<view class="text-orange fr radius text-xs padding-left-xs margin-bottom margin-right padding-lr-xs" style="border: 1rpx solid orange;border-radius:25rpx 0 0 25rpx;font-size: 10rpx;font-size: 26rpx; ">{{item.stypename}}</view>
				</view>
				<view class="move">
					<view class="bg-red" @click.stop="deleteIetm(item)">删除</view>
				</view>
			</view>
		</view>
		<view v-if="currPage===totalPage||totalPage==''">
			<tui-divider width="80%">没有更多啦</tui-divider>
		</view>
	</view>
</template>

<script>
	import {
		getmydemandlist,
		demandDelete
	} from "@/api/demand.js"
	import tuiDivider from "@/components/divider/divider"
	export default {
		components: {
			tuiDivider,
		},
		data() {
			return {
				modalName: null,
				demandlist: [],
				currPage:1,
				totalPage: 1,
			}
		},
		mounted: async function() {

			let userData = uni.getStorageSync("USERDATA");
			this.uid = userData.uid;
			this.getList();
		},
		//下拉刷新
		async onPullDownRefresh() {
			const demandlist = await getmydemandlist(1, 10, this.uid);
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载
		onReachBottom: async function() {
			// console.log('触底')
			if (this.currPage == this.totalPage) return;
			this.currPage += 1;
			const demandlist = await getmydemandlist(this.currPage, 10, this.uid);
			const loadData = demandlist.data.myDemand;
			const list = this.demandlist.list;
			this.demandlist.list = list.concat(loadData.list)
			this.currPage = loadData.currPage;
		},
		methods: {
			//获取的所有列表
			async getList() {
				try {
					const demandlist = await getmydemandlist(1, 10, this.uid);
					this.demandlist = demandlist.data.myDemand;
					this.totalPage = this.demandlist.totalPage;
				} catch (e) {
					console.error(e)
				}
			},


			close(e) {
				let lkj = this.$refs.dataSelf.dataset.did
				console.log(lkj)
			},

			async deleteIetm(item) {
				try {
					await demandDelete([item.did])
					this.getList();
				} catch (e) {
					console.error(e)
				}
			},


			details(did) {
				uni.navigateTo({
					url: "/pages/user/demand-list/details/details?did=" + did
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},

			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},

			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},

		}

	}
</script>

<style lang="scss">
	page {
		background: #ffffff;
	}

	/* 	.bor {
		border-bottom: 1rpx solid #F3F4F5;
	} */
</style>
