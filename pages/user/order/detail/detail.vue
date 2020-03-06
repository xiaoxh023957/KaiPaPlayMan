<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">订单详情</block>
		</cu-custom>
		<!-- 订单名称 -->
		<block v-if='!loading'>
			<view v-if="detailData.orderType!=2&&detailData.orderType!=3" class="bg-white margin-lr-xs margin-top-xs padding-sm"
			 style="height: 170rpx;" v-for="(detail,index) in goodsData" :key="index">
				<view class="fl">
					<view class="cu-avatar radius lg margin-right" style="height: 120rpx;width: 135rpx;border-radius: 10rpx; " :style="{'background-image':'url('+detail.goods.coverImgpath+')'}"></view>
				</view>
				<view class="fr margin-top-lg text-xxl">
					<text class="text-xm ">￥{{detail.price}}</text>
					<text class="cuIcon-right"></text>
				</view>

				<view style="width:70%;height: 120rpx;line-height: 44rpx;">
					<view class="kp-goods-name">{{detail.goods.gname}}</view>
				</view>
			</view>


			<view v-if="detailData.orderType==2" class="padding bg-white text-center">
				<view class="text-xl  text-center padding-top-lg" :class="isWinning?'text-red':'text-gray'">
					{{isWinning?'恭喜你中奖了':'很遗憾你没中奖'}}

				</view>
				<view class="text-sm text-center" :class="isWinning?' text-orange':'text-gray'">
					中奖号码为
				</view>
				<view class="  text-xxl text-center" :class="isWinning?'text-red':'text-gray'">
					{{luckyInfo.winningNumber}}
				</view>
				<view v-if='isWinning' class="text-center">
					<view>
						恭喜获得:
					</view>
					<view>{{luckyInfo.prizeInfo}}</view>
				</view>
			</view>
			
			<view v-if="detailData.orderType==3" class="padding bg-white text-center">
				<view class="text-xl  text-center padding-top-lg" :class="isWinning?'text-red':'text-gray'">
					{{isWinning?'恭喜你中奖了':'很遗憾你没中奖'}}
			
				</view>
				<view class="text-sm text-center" :class="isWinning?' text-orange':'text-gray'">
					您购买的号码为{{detailData.zoneBlockNo}}区{{detailData.zoneNumber}}号
				</view>
				
				<view class="text-sm text-center" :class="isWinning?' text-orange':'text-gray'">
					中奖区号为
				</view>
				<view class="text-xxl text-center" :class="isWinning?'text-red':'text-gray'">
					{{zoneInfo.winningNumber}}
				</view>
				<view v-if='isWinning' class="text-center">
					<view>
						恭喜获得:
					</view>
					<view>{{zoneInfo.prizeInfo}}</view>
				</view>
			</view>

			<!-- 核销码 -->
			<view v-if="showCode" class="bg-white padding-bottom margin-lr-xs padding-xs margin-top-xs">
				<view class="fl margin-top-sm text-xxl padding-right-xs" @click="state()">
					<view class="cu-item " v-for="(item,index) in cuIcon" :key="index" v-if="item.isShow">
						<text class="lg text-gray " :class="'cuIcon-' + item.name "></text>
					</view>
				</view>

				<view class="margin-tb-xs margin-lr-xs margin-left-xm padding-xs" style="border-bottom:1rpx #F0F0F0 dashed;font-size: 37rpx;">核销码</view>

				<!-- 二维码 -->
				<view style="width: 400rpx;height: 400rpx;margin:0 auto;">
					<view class="qrimg">
						<view class="qrimg-i">
							<tki-qrcode ref="qrcode" :val="val" :size="size" :unit="unit" :background="background" :foreground="foreground"
							 :pdground="pdground" :lv="lv" :onval="onval" :loadMake="loadMake" :usingComponents="true" />
						</view>
					</view>
				</view>
			</view>

			<!-- 商家信息 -->
			<view class="bg-white margin-lr-xsl margin-top-xs margin-xs" v-if="detailData.store">
				<view class="cuIcon-shop fl margin-top-lg margin-lr-xs  padding-right-xs" style="font-size: 50rpx;"></view>
				<view class="margin" style="border-bottom:1rpx #F0F0F0 dashed;">
					<!-- <view class="fr text-cyan margin-top-lg margin-bottom-xs text-xl">6家门店通用</view> -->
					<view class="padding-top-lg margin-bottom-xs padding-xs  text-xl text-black">商家信息</view>
				</view>
				<view class="padding-bottom margin" style="border-bottom:1rpx #F0F0F0 dashed;">
					<view class="text-black text-xl">{{detailData.store?detailData.store.sname:'暂无信息'}}</view>
					<view @click="navigation(detailData.store.latitude,detailData.store.longitude,detailData.store.address)">
						<text class="cuIcon-location padding-right-xs" style="border-right: 2rpx solid #F7F7F7;"></text>
						<text>{{detailData.store.address}}</text>
					</view>
				</view>
				<view class="margin-sm padding-bottom cf">
					<view class="text-cut fl cuIcon-dianhua margin-top-xs margin-right-xs margin-left-xs" style="width: 60%;">{{detailData.store.contactPhone}}</view>
					<button class="cu-btn line-black fr" style="width: 36%; margin-top:0;" @click="callShop(detailData.store.contactPhone)">
						<text class="cuIcon-dianhua"></text> 联系卖家</button>
				</view>
			</view>
			<!-- 订单信息 -->
			<view v-if="detailData.orderType!=2&&detailData.orderType!=3" class="bg-white margin-lr-xsl margin-top-xs margin-xs">
				<view class="cuIcon-newshot fl margin-top-lg margin-lr-xs  padding-right-xs" style="font-size: 50rpx;"></view>
				<view class="margin  padding-bottom">
					<view class="padding-top-lg margin-bottom-xs padding-xs  text-xl text-black">订单信息</view>
					<view class="margin">
						<text class="lis">订&ensp;单&ensp;号：</text>
						<text class="text-black">{{detailData.orderId}}</text>
					</view>
					<view class="margin">
						<text class="lis">手&ensp;机&ensp;号：</text>
						<text class="text-black">{{detailData.phone==null?'未预留手机号':detailData.phone}}</text>
					</view>
					<view class="margin">
						<text class="lis">客户姓名：</text>
						<text class="text-black">{{detailData.name==null?'未预留':detailData.name}}</text>
					</view>
					<view class="margin" v-if="false">
						<text class="lis">订单时间：</text>
						<text class="text-black">{{detailData.createTime}}</text>
					</view>
					<view class="margin" v-if="false">
						<text class="lis">付款时间：</text>
						<text class="text-black">XX2018-12-31 17:30</text>
					</view>
					<view class="margin">
						<text class="lis">下单时间：</text>
						<text class="text-black">{{detailData.createTime}}</text>
					</view>
					<view class="margin">
						<text class="lis" style=" text-align: justify;">商品数量：</text>
						<text class="text-black">{{goodsData?goodsData.length:0}}</text>
					</view>
					<view class="margin">
						<text class="lis">总&emsp;&emsp;价：</text>
						<text class="text-black">￥{{detailData.totalAmount}}</text>
					</view>
				</view>
			</view>

			<view v-if="detailData.status == 0" class="footer padding-tb-xs">
				<button class="cu-btn  padding-lr-lg round bg-orange kp-btn " @tap="pay(detailData.orderType,detailData.totalAmount,detailData.orderId)">付款</button>
			</view>

		</block>

	</view>
</template>

<script>
	import tuiIcon from "@/components/icon/icon"
	import tuiTimeAxis from "@/components/time-axis/time-axis"
	import tkiQrcode from '@/components/tki-qrcode/tki-qrcode.vue'
	import Map from '../../../../utils/openMap.js'
	import {
		getOrderDetail
	} from "@/api/orderApi.js"
	import {
		getSelectStoreDetail
	} from "@/api/storeDetailApi.js"
	import {
		luckystarinfo
	} from '@/api/gameApi.js'
	import {
		getZoneData
	} from "@/api/zoneRecordApi.js"

	export default {
		components: {
			tuiIcon,
			tuiTimeAxis,
			tkiQrcode
		},
		data() {
			return {
				val: '', // 要生成的二维码值
				size: 400, // 二维码大小
				unit: 'upx', // 单位
				background: 'transparent', // 背景色
				foreground: '#000', // 前景色
				pdground: '#000', // 角标色
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: false, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				CustomBar: this.CustomBar,
				cuIcon: [{
					name: 'ticket',
					isShow: true
				}],
				orId: 0,
				detailData: {},
				goodsData: [],
				loading: true,
				luckyInfo: {},
				isWinning: false,
				orderType: '',
				zoneInfo:{},
				showCode:false,


			}
		},
		async onLoad(option) {
			this.val = this.orId = option.orderId;

			// 订单信息
			this.getOrder();
			
			
		},
		methods: {

			//订单信息
			async getOrder() {
				const detailRes = await getOrderDetail(this.orId);
				this.detailData = detailRes.data.orderId;
				this.goodsData = this.detailData.details;


				if (this.detailData.orderType == 2) {
					//幸运之星信息
					let luckystarId = this.detailData.luckystarId;
					const luckyInfo = await luckystarinfo(luckystarId);
					this.luckyInfo = luckyInfo.data.Luckystar;


					if (this.detailData.luckystarNumber == this.luckyInfo.winningNumber) {
						this.isWinning = true;
					}
					console.log(this.isWinning)
				}
				else if(this.detailData.orderType == 3){
					//五区选号
					let zoneId = this.detailData.zoneId;
					const zoneInfo = await getZoneData(zoneId);
					this.zoneInfo = zoneInfo.data.Zone;
					
					
					if (this.detailData.zoneBlockNo == this.zoneInfo.winningNumber) {
						this.isWinning = true;
					}
				};
				this.loading = false;
				this.codeIsShow()
			},
			//幸运之星信息

			state() {
				uni.navigateTo({
					url: "/pages/user/order/detail/order-status/order-status"
				})
			},
			callShop(num) {
				// console.log(num)
				uni.makePhoneCall({
					phoneNumber: `${num}` //仅为示例
				});
			},
			pay(orderType, tprice, oid) {
				uni.navigateTo({
					url: `/pages/pay/pay?price=${tprice}&orderType=${orderType}&orderId=${oid}`
				})
			},

			//导航 
			navigation(latitude, longitude, name) {
				Map.openMap(latitude, longitude, name)
			},
			//是否展示核销码
			codeIsShow() {
				let status = this.detailData.status;
				let zoneStatus = this.zoneInfo.status;
				let luckyStatus = this.luckyInfo.status;
				console.log(status)
				
				if(status==1||status==5||status==6||zoneStatus==1&&this.isWinning ||luckyStatus==1&&this.isWinning){
					
						this.showCode = true
					
				}else{
					this.showCode = false
				} 
			}

		},
	}
</script>

<style>
	.kp-goods-name {

		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		line-height: 1.5;
	}

	.qrimg {
		display: flex;
		justify-content: center;
	}

	.qrimg-i {
		margin-right: 10px;
	}

	slider {
		width: 100%;
	}

	input {
		width: 100%;
		margin-bottom: 20upx;
	}

	.btns {
		display: flex;
		flex-direction: column;
		width: 100%;
	}

	button {
		width: 100%;
		margin-top: 10upx;
	}

	.kp-btn {
		width: 400rpx;
	}

	.footer {
		width: 100%;
		position: fixed;
		bottom: 0;
		z-index: 99;
		background: #fff;
		text-align: center;

	}
</style>
