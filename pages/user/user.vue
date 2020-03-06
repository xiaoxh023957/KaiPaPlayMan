<template>
	<view v-if='!loading' class="bg-white">

		<view class="cu-item text-center padding-lg kpbg" 
		:style="{'height':236+statusBarHeight+'px', 'padding-top':statusBarHeight+'px','background-image':'url('+userData.avatar+')'}">
			<view class="kp-drag">
				<!-- 头像 -->
				<view class="cu-avatar round margin-top-xs" style="height: 140rpx;width: 140rpx;" :style="{'background-image':'url('+userData.avatar+')'}"></view>
				<view class=" text-cut margin-auto text-lg  padding -xs" style="text-shadow: 6upx 6upx 8upx rgba(26, 26, 26, 0.2)">
					{{userData.nickname}}
				</view>

				<view class="margin-auto">
					<view class="cu-tag round bg-gray  padding-lr " v-if="userData.yearCardUser">年卡用户</view>
					<view v-else class="cu-tag round bg-gray  padding-lr ">普通用户</view>
					<view class="cu-tag round bg-yellow ">{{userData.gold}}开趴豆</view>
				</view>
			</view>

		</view>

		<!-- 内容板块 -->
		<view class="kp-radius-tr bg-white kp-userContPosition padding" :style="{'top':-(30+statusBarHeight)+'px'}">

			<view class="grid col-2">
				<view class="text-center text-lg text-yellow" @click="demand(1)">需求定制</view>
				<view class="text-center text-lg text-orange" @click="singin()"> 签到</view>
			</view>

			<!-- 年卡 -->
			<view class="bg-white padding ">
				<view class="padding kp-userContRadius" style=" height:160rpx; background-image: url(https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1017486331,1394773415&fm=26&gp=0.jpg); background-size:100%;" @click="NavigateToCardDetail">
				</view>
			</view>
			<view class="cu-list menu sm-border card-menu margin-top kp-userContRadius"  >
				<view class="cu-item arrow "  @click="NavigateToCoupons" >
					<view class="content" >
						<image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2960677927,138788196&fm=26&gp=0.jpg" class="png radius" mode="aspectFit" ></image>
						<text class="text-grey margin-left">优惠券</text>
					</view>
				</view>

				<view class="cu-item arrow">
					<view class="content" @click="party">
						<image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2960677927,138788196&fm=26&gp=0.jpg" class="png radius" mode="aspectFit" ></image>
						<text class="text-grey margin-left">我参与的活动</text>
					</view>
				</view>
				<view class="cu-item arrow "  @click="order()" >
					<view class="content" >
						<image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2960677927,138788196&fm=26&gp=0.jpg" class="png radius" mode="aspectFit" ></image>
						<text class="text-grey margin-left">订单</text>
					</view>
				</view>
				<view class="cu-item arrow "  @click="list(uid)">
					<view class="content" >
						<image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2960677927,138788196&fm=26&gp=0.jpg" class="png radius" mode="aspectFit" ></image>
						<text class="text-grey margin-left">我的需求</text>
					</view>
				</view>
				<view class="cu-item arrow "  @click="comment">
					<view class="content" >
						<image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2960677927,138788196&fm=26&gp=0.jpg" class="png radius" mode="aspectFit" ></image>
						<text class="text-grey margin-left">我的评论</text>
					</view>
				</view>
				<!-- <view class="cu-item arrow "  @click="groupBuy">
					<view class="content">
						<image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2960677927,138788196&fm=26&gp=0.jpg" class="png radius" mode="aspectFit" ></image>
						<text class="text-grey margin-left">我的团购</text>
					</view>
				</view> -->
				<view class="cu-item arrow "  @click="about()">
					<view class="content">
						<image src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2960677927,138788196&fm=26&gp=0.jpg" class="png radius" mode="aspectFit" ></image>
						<text class="text-grey margin-left">关于</text>
					</view>
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	import {getmyFinduid} from "@/api/findApi.js"
	export default {
		data() {
			return {
				getmyFind:{},
				uid:1,
				statusBarHeight:0,
				userData:{},
				loading:true,
			}
		},
		onLoad() {
			let that = this;
				uni.getSystemInfo({
					success(res) {
							that.statusBarHeight = res.statusBarHeight;
					}
				});
		},
		mounted: async function() {
			//请求接口
				// const getmyFind = await getmyFinduid(1,20,this.uid);
				// console.log(getmyFind)
				// this.getmyFind = getmyFind.data.data.findUser;
				// console.log(this.getmyFind)
				
			//获取用户信息
			let USERDATA = uni.getStorageSync("USERDATA");
			if(USERDATA)
			{
				console.log("用户已登录")
				this.userData = USERDATA;
				console.log(this.userData)
			}

			this.loading =false;
		},
		methods: {
			NavigateToCoupons(){
				uni.navigateTo({
					url: "/pages/user/coupon/coupon"
				});
			},
			NavigateToCardDetail(){
				uni.navigateTo({
					url: "/pages/user/card-detail/card-detail",

				});
			},

			demand() {
				uni.navigateTo({
					url: "/pages/user/demand-list/demand"
				})
			},
			list(uid) {
				uni.navigateTo({
					url: "/pages/user/demand-list/list?uid=" + uid
				})
			},
			party(){
				uni.navigateTo({
					url: "/pages/user/my-activities/my-activities"
				})
			},
			order(){
				uni.navigateTo({
					url: "/pages/user/order/order"
				})
			},
			singin(){
				uni.navigateTo({
					url: "/pages/Singin/Singin"
				})
			},
			limit(){
				uni.navigateTo({
					url: "/pages/party/limit/limit"
				})
			},
			evaluate(){
				uni.navigateTo({
					url: "/pages/user/order/order-evaluate/order-evaluate"
				})
			},
			NavigateToMyActivities(){
				uni.navigateTo({
					url: "/pages/user/my-activities/my-activities"
				})
			},
			comment() {
				uni.navigateTo({
					url: "/pages/my-evaluate/my-evaluate"
				})
			},
			groupBuy() {
				uni.navigateTo({
					url: "/pages/group-buying/group-buying"
				})
			},
			about(){
				uni.navigateTo({
					url: "/pages/about/about"
				})
			}
		}
	}
</script>

<style>

</style>
