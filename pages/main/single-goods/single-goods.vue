<template>
	<view class="bg-white " @click="showCar = false">
		<!-- 单品列表 -->
		<view class="VerticalBox">
			<scroll-view class="VerticalNav nav" scroll-y scroll-with-animation style="height:calc(100vh - 620upx)">
				<view class="cu-item" :class="index == tabCur ? 'text-orange cur' : ''" v-for="(item, index) in goodsType" :key="index"
				 @tap="TabSelect" :data-typeid="item.gtypeid" :data-id="index" :data-gtname="item.gtypeName">
					{{ item.gtypeName }}
				</view>
			</scroll-view>
			<!-- 右侧内容titel-->
			<scroll-view class="VerticalMain" scroll-y scroll-with-animation style="height:calc(100vh - 620upx)"
			 :scroll-into-view="'main-' + mainCur">
				<view class="cu-bar solid-bottom bg-white">
					<view class="action">
						<text class="cuIcon-title text-orange"></text>
						{{ gtname }}
					</view>
				</view>
				<!-- 内容 主体-->
				<view class="cu-list menu-avatar" @click="closeChooseSpecs()">
					<view v-if="item.gtypeid == typeCurId" class="cu-item " v-for="(item, indexC) in goodsData" :key="indexC"
					 @click.stop="openChooseSpecs(item)">
						<view class="cu-avatar radius lg" :style="{ 'background-image': 'url(' + item.coverImgpath + ')' }"></view>
						<view class="kp-goods-name ">{{ item.gname }}</view>
						<view class="text-red sprice text-lg">¥{{ item.price }}</view>
						<!-- <view class="addBtn"> -->
						<view class="text-center">
							<!-- <text v-if="item.num !== 0" class=" cut text-orange text-bold text-xl" @click.stop="numChange('reduce', item)">-</text>
								<text v-if="item.num !== 0" class="valueBox">{{ item.num }}</text> -->
							<text class=" add text-orange text-bold text-xxl " @click.stop="openChooseSpecs(item)">
								<text class="cuIcon-add"></text>
							</text>
						</view>
						<!-- </view> -->
					</view>
				</view>
				<view class="cu-tabbar-height"></view>
			</scroll-view>
		</view>
		<!-- bar -->
		<view class="cu-bar bg-white tabbar border shop foot kp-foot">
			<view class="padding padding-lr-lg text-xxl" @click.stop="carShow">
				<view class="action ">
					<view class="cuIcon-cart taxt-xxl" :class="{ 'text-orange': chooseGoodsList.length!=0 }">
						<view v-if="chooseGoodsList.length!=0" class="cu-tag badge">{{chooseGoodsList.length}}</view>
					</view>
				</view>
			</view>
			<button class="cu-btn bg-red round shadow-blur margin-right-lg" @click.stop="takeOrder()">结算</button>
		</view>
		<!-- 规格弹层 -->
		<tui-bottom-popup :show="popupShow" @close="closePopup">
			<view class="tui-popup-box">
				<view class="padding bg-white grid margin-top-xs ">
					<image class="radius cu-avatar lg" src="hgbbbbiln"></image>
					<view class="padding-left-xs" style="width: 64%;">
						<view class=" goods-attr-name ">{{ chooseGoods.gname }}</view>
						<view class="grid col-2 padding-top-xs" style="line-height: 1.5;">
							<view class="text-grey ">库存：{{ chooseGoods.stock }}</view>
							<view class="text-red  ">¥{{ chooseGoods.price}}</view>
						</view>
					</view>
				</view>
				<scroll-view scroll-y class="tui-popup-scroll">
					<view class="tui-scrollview-box">
						<view class="tui-bold tui-attr-title">请选择商品规格</view>
						<view class="tui-attr-box">
							<view class="tui-attr-item" v-for="(item, index) in chooseGoods.goodsSpecsList" :key="index" @tap="chooseAttr(index, item)"
							 :class="index == cur ? 'tui-attr-active' : ''">
								{{ item.gsname }}
							</view>
						</view>
					</view>
				</scroll-view>
				<view class="text-center">
					<view class="cu-btn bg-orange round shadow-blur padding popupBtn" @click.stop="hidePopup()">确定</view>
				</view>
			</view>
			<view class="tui-icon tui-icon-close-fill tui-icon-close" style="color: #999;font-size:20px" @tap.stop="hidePopup()"></view>
		</tui-bottom-popup>
		<!--底部选择层-->
		<!-- 购物车弹窗 -->
		<view v-if="showCar&&chooseGoodsList.length!=0" class="shop-car bg-white">
			<view class="padding cf head ">
				<text class="fl">已选商品</text>
				<text class="fr" @click.stop="claer()">
					<text class="cuIcon-delete"></text>
					<text>清空</text>
				</text>
			</view>
			<view class="cu-list car-item">
				<view class="cu-item car-item cf" v-for="(item, i) in chooseGoodsList" :key="i" v-if="item.num !== 0">
					<view class=" padding-lr margin-tb-xs fl" style="width: 65%;">
						<view class="text-cut">
							{{item.gname}}
						</view>
						<view class="text-gray text-sm">
							{{item.gsname}}
						</view>
					</view>
					<view class=" text-center fr" style="width: 35%;">
						<text class=" cut text-orange text-bold text-xl" @click.stop="shopCartNumChange('reduce', item)">-</text>
						<text class="valueBox ">{{ item.num }}</text>
						<text class=" add text-orange text-bold text-xl " @click.stop="shopCartNumChange('add', item)">+</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	// import tuiNumberbox from "@/components/numberbox/numberbox"
	import tuiBottomPopup from '@/components/bottom-popup/bottom-popup';
	import {
		getGoodsList,
		getGoodsTypeList
	} from '@/api/storeDetailApi.js';
	import {
		saveOrder
	} from '@/api/orderSubmit.js'
	import tuiButton from "@/components/button/button"
	import tuiModal from "@/components/modal/modal"
	export default {
		props: {
			sid: {
				type: Number,
				default: 0
			}
		},
		components: {
			tuiBottomPopup,
			tuiButton,
			tuiModal
		},
		data() {
			return {
				list: [],
				tabCur: 0,
				mainCur: 0,
				typeCurId: 1,
				verticalNavTop: 0,
				load: true,
				isChoose: false,
				value: 0,
				goodsData: {},
				goodsType: [],
				showCar: false,
				gtname: '',
				totalPrice: 0,
				popupShow: false,
				cur: 0,
				chooseGoodsList: [],
				chooseGoods: {},
				cartList: [],
				chooseSpecs: {},
				userInfo: {}
			};
		},
		computed: {},

		async mounted() {

			let userInfo = uni.getStorageSync("USERDATA");
			if (!userInfo) {
				uni.redirectTo({
					url: "/pages/register/register"
				})
			}

			this.userInfo = userInfo;

			// 商品列表
			const goodsListRes = await getGoodsList({
				pageindex: 1,
				pagesize: 999,
				sid: this.sid,
				type: 0
			});
			this.goodsData = goodsListRes.data.page.list;

			// //添加属性
			this.goodsData.forEach(obj => {
				obj['num'] = 0;
			});

			const goodsTypeRes = await getGoodsTypeList({
				pageindex: 1,
				pagesize: 999,
				sid: this.sid,
				type: 0
			});
			this.goodsType = goodsTypeRes.data.page.list;
			this.gtname = this.goodsType[0].gtypeName;

			// console.log(this.goodsType)
		},

		methods: {
			async TabSelect(e) {
				this.tabCur = e.currentTarget.dataset.id;
				this.typeCurId = e.currentTarget.dataset.typeid;
				this.gtname = e.currentTarget.dataset.gtname;
			},
			openChooseSpecs(goods) {
				// console.log(goods);
				if (this.showCar == true) {
					this.showCar = false;
					return;
				}
				this.popupShow = true;
				this.chooseGoods = goods;
			},
			closeChooseSpecs() {
				this.popupShow = false;
			},

			shopCartNumChange(type, item) {
				let that = this;
				if (type == 'add') {
					item.num = item.num + 1;
				} else {
					if (item.num - 1 <= 0) {
						for (let i = 0; i < that.chooseGoodsList.length; i++) {
							let specsData = that.chooseGoodsList[i];
							if (specsData.gsid == item.gsid) {
								that.chooseGoodsList.splice(i, 1);
							}
						}

					} else {
						item.num--;
					}
				}


				this.$forceUpdate();

			},
			numChange(type, item) {
				const that = this;
				// let cart = uni.getStorageSync("CART")
				if (type === 'add') {
					// item.num += 1;
					item.isChoose = true;

					item['totalPrice'] = item.price * item.num;
					//this.popupShow = true
				} else {
					item.num -= 1;

					if (item.num < 0) {
						item.num = 0;
						item.isChoose = false;
						item.totalPrice = 0.0;
					} else {
						item['totalPrice'] = item.price * item.num;
					}
				}

				// if(cart)
				// {
				// 	for(let i=0;i<=cart.length;i++)
				// 	{
				// 		let cartData = cart[i];
				// 		if(cartData.gid == item.gid)
				// 		{
				// 			if(item.num!=0)
				// 			{
				// 				cartData=item;
				// 			}
				// 			else
				// 			{
				// 				cartData.splice(i,1);
				// 			}
				// 		}
				// 	}
				// }
				// else
				// {
				// 	if(item.num>0)
				// 	{
				// 		cart=[];
				// 		cart.push(item);
				// 	}
				// }

				// uni.setStorageSync("CART",cart);

				// for(let i=0;i<goodsData.length;i++)
				// {
				// 	let goods = goodsData[i];
				// 	if(goods.gid == item.gid)
				// 	{
				// 		goodsData[i] = item;
				// 		this.$set(this.goodsData,i,item);
				// 	}
				// }

				this.$forceUpdate();
			},
			carShow() {
				this.showCar = !this.showCar;
			},
			claer() {
				// for (let i = 0; i < this.goodsData.length; i++) {
				// 	this.goodsData[i].num = 0;
				// 	this.goodsData[i].isChoose = false;
				// 	this.goodsData[i].totalPrice = 0.0;
				// }

				this.chooseGoodsList = [];
				// let cart = uni.getStorageInfoSync("CART");
				// cart = [];
				// uni.setStorageSync("CART",cart);
				// console.log(this.goodsData)
				this.showCar = false;
				this.$forceUpdate();
			},
			NavigateToGoodsDetail(gid) {
				this.showCar = false;
				// uni.navigateTo({
				// 	url: "/pages/main/goods-detail/goods-detail?gid=" + gid,
				// });
			},
			showPopup() {
				this.popupShow = true;
			},
			closePopup() {
				this.popupShow = false;
			},
			hidePopup() {
				let that = this;
				if (this.chooseGoods.goodsSpecsList) {
					console.log('进来了');
					let specs = this.chooseGoods.goodsSpecsList[that.cur];

					if (that.chooseGoodsList.length == 0) {
						console.log("首次添加")
						specs['gname'] = that.chooseGoods.gname;
						specs['coverImgpath'] = that.chooseGoods.coverImgpath;
						specs['num'] = 1;
						that.chooseGoodsList.push(specs);
					} else {
						let hasSame = false;
						for (let i = 0; i < that.chooseGoodsList.length; i++) {
							let specsData = that.chooseGoodsList[i];
							if (specsData.gsid == specs.gsid) {
								console.log("等于")
								hasSame = true;
							}
						}

						if (hasSame == true) {
							console.log("等于")
							for (let i = 0; i < that.chooseGoodsList.length; i++) {
								let specsData = that.chooseGoodsList[i];
								if (specsData.gsid == specs.gsid) {
									specsData.num++;
									break;
								}
							}

							that.popupShow = false;
						} else {
							console.log("不等于")
							specs['gname'] = that.chooseGoods.gname;
							specs['coverImgpath'] = that.chooseGoods.coverImgpath;
							specs['num'] = 1;
							that.chooseGoodsList.push(specs);
							that.popupShow = false;
						}
					}
					console.log(this.chooseGoodsList);
				}
				this.popupShow = false;
			},
			change(e) {
				this.value = e.value;
			},
			chooseAttr(index, item) {
				this.cur = index;
				//console.log(item);
				console.log(index);
				console.log(this.cur);
			},
			async takeOrder() {
				let that = this;
				if (this.chooseGoodsList.length == 0) {
					plus.nativeUI.toast("您还未选择任何商品哦")
				} else {
					//console.log(JSON.stringify(that.chooseGoodsList));

					let orderDetails = [];
					let totalAmount = 0.0;
					for (let i = 0; i < that.chooseGoodsList.length; i++) {
						let chooseData = that.chooseGoodsList[i];
						let totalPrice = parseFloat(chooseData.num * chooseData.price);
						let orderDetail = {
							'gid': chooseData.gid,
							'gsid': chooseData.gsid,
							'price': chooseData.price,
							'number': chooseData.num,
							'totalPrice': totalPrice
						}
						orderDetails.push(orderDetail);
						totalAmount += totalPrice
					}

					let orderData = {
						'uid': that.userInfo.uid,
						'totalAmount': totalAmount,
						'orderType': 0,
						'status': 0,
						'details': orderDetails
					}

					//console.log("订单信息:",JSON.stringify(orderData))

					const orderResp = await saveOrder(orderData);
					if (orderResp.data.code == 0) {
						plus.nativeUI.toast("恭喜您,订单创建成功");

						uni.redirectTo({
							url: "/pages/user/order/order"
						})
					}
				}
			}
		}
	};
</script>
<style>
	.popupBtn {
		width: 500rpx;
	}

	.goods-attr-name {
		max-height: 80rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		/* font-size: 32rpx !important; */
		/* line-height: 1.5 !important; */
	}

	/* 规格弹窗end */
	.sprice {
		position: absolute;
		right: 90rpx;
	}

	.fixed {
		position: fixed;
		z-index: 99;
	}

	.VerticalNav.nav {
		width: 160upx;
		white-space: initial;
	}

	.VerticalNav.nav .cu-item {
		width: 100%;
		text-align: center;
		background-color: #fff;
		margin: 0;
		border: none;
		height: 50px;
		position: relative;
	}

	.VerticalNav.nav .cu-item.cur {
		background-color: #f1f1f1;
	}

	.VerticalNav.nav .cu-item.cur::after {
		content: '';
		width: 8upx;
		height: 30upx;
		border-radius: 10upx 0 0 10upx;
		position: absolute;
		background-color: currentColor;
		top: 0;
		right: 0upx;
		bottom: 0;
		margin: auto;
	}

	.VerticalBox {
		display: flex;
	}

	.VerticalMain {
		background-color: #f1f1f1;
		flex: 1;
	}

	.tui-numberbox {
		position: relative;
		z-index: 22;
	}

	.tui-num-input {
		margin: 0;
	}

	.kp-goods-name {
		position: absolute;
		left: 146rpx;
		margin-right: 170rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-height: 1.5;
	}

	.addBtn {
		height: 100%;
		position: relative;
		z-index: 999;
	}

	/* 购物车弹框 */
	.shop-car {
		width: 100%;
		position: fixed;
		bottom: calc(6vh + 25rpx);
		max-height: calc(100% - 620rpx);
		z-index: 99999;
		overflow: scroll;
		padding: 40rpx;
	}

	.goods-name {
		width: 60%;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-height: 1.5;
	}

	.car-item {
		border-bottom: 1px solid #f1f1f1;
	}

	/* . {		width: 34%;		padding-right: 20rpx;		position: relative;		top: -50%;		transform: translateY(50%);		z-index: 222;	} */
	.add,
	.cut {
		display: inline-block;
		width: 70rpx;
		height: 110rpx;
		line-height: 110rpx;
		vertical-align: middle;
	}

	.valueBox {
		display: inline-block;
		width: 40rpx;
		height: 40rpx;
		line-height: 40rpx;
		vertical-align: middle;
		border-radius: 50%;
		border: 1px solid orange;
	}
</style>
