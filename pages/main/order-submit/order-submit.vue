<template>
	<view v-if="!loading">
		<cu-custom bgColor="kpbg-black" :isBack="true" class="text-white">
			<block slot="backText">返回</block>
			<block slot="content">
				<view class="text-white">提交订单</view>
			</block>
		</cu-custom>
		<view v-if='!loading'>
			<form>
				<!-- 客户信息 -->
				<view class="cu-list menu sm-border padding text-black">
					<view class="cu-item">
						<view class="content">
							<view class="cu-form-group ">
								<text class='cuIcon-people'></text>
								<view class="title padding-left-xs text-lg">姓名：</view>
								<input placeholder="请输入姓名" placeholder-style="color:#9e9e9e" name="input" v-model="saveData.name"></input>
							</view>
						</view>
					</view>

					<view class="cu-item">
						<view class="content">
							<view class="cu-form-group">
								<text class='cuIcon-mobile'></text>
								<view class="title padding-left-xs text-lg">电话：</view>
								<input placeholder="请输入手机号码" placeholder-style="color:#9e9e9e" name="input" v-model="saveData.phone"></input>
							</view>
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<view class="cu-form-group">
								<text class='cuIcon-write'></text>
								<view class="title padding-left-xs text-lg">备注：</view>
								<input placeholder="请输入备注" placeholder-style="color:#9e9e9e" name="input" v-model="saveData.remark"></input>
							</view>
						</view>
					</view>

					<view class="cu-item">
						<view class="content">
							<view class="cu-form-group">
								<view class="title">预约时间：</view>
								<picker mode="date" :value="startDate" start="startDate" :end="GetDateStr(10)" @change="startDateChange">
									<view class="picker" style="text-align: left;">
										{{startDate}}
									</view>
								</picker>
								<picker mode="time" :value="sTime" start="00:00" end="23:59" @change="sTimeChange">
									<view class="picker" style="text-align: right;">
										{{sTime}}
									</view>
								</picker>
							</view>
						</view>
					</view>
				</view>
			</form>

			<!-- 商品信息 -->
			<view class="padding-lr margin-bottom-xs">
				<view class="title bg-white text-bold text-xl padding padding-bottom-xs">
					商品信息
				</view>

				<!-- 套餐/电音派对 套餐 -->
				<view class="padding bg-white grid col-2 kp-dasborder-bottom">

					<image class="radius" style="width:210rpx; height:170rpx;" :src="saveData.orderType==9 ?goodsDetail.packageImgpath :goodsDetail.coverImgpath"></image>

					<view class="margin-left kp-goods-name">{{saveData.orderType==9 ? goodsDetail.epname : goodsDetail.gname}}</view>

				</view>
				<view class="bg-white grid col-2 padding ">
					<view class="text-black text-left ">购买数量: 1</view>
					<view class="text-red text-right">
						¥{{goodsDetail.price}}
					</view>
				</view>
				<view v-if="coupoList.length == 0" class="padding text-gray bg-white">
					暂无可用优惠券
				</view>
				<view v-else class="bg-white grid col-2 padding text-gray" @click="showModal">
					<view class=" text-left ">使用优惠券</view>
					<view class=" text-right">
						{{radio==-1?tips:coupoList[parseInt(radio)].couponType.ctypename}}
						<text class="cuIcon-right"></text>
					</view>
				</view>
			</view>

			<view class="text-grey padding">

				<checkbox class="tui-checkbox" checked="checked" ref='radio'></checkbox>

				我已阅读并同意《<text class="text-blue" @click="agreementShow"> 平台用户协议 </text>》
			</view>

			<view class="cu-bar bg-white tabbar border shop foot kp-foot">
				<view class="padding padding-lr-lg">
					合计：<text class="text-red text-xl">¥{{(goodsDetail.totalPrice)}}</text>
				</view>

				<button class="cu-btn bg-red  shadow-blur margin-right-lg" @click="pay(goodsDetail.totalPrice)">结算</button>
			</view>
			<!-- 优惠券选择框 -->
			<view class="cu-modal show" v-if="isShow" @tap="hideModal">
				<view class="cu-dialog" @tap.stop="">
					<radio-group class="block" @change="RadioChange">
						<view class="cu-list menu text-left">
							<view class="cu-item" v-for="(item,index) in this.coupoList" :key="index">
								<label class="flex justify-between align-center flex-sub">
									<view class="flex-sub">{{item.couponType.ctypename}}</view>
									<radio class="round" :class="radio==index?'checked':''" :checked="radio==index?true:false" :value="''+index"></radio>
								</label>
							</view>
						</view>
					</radio-group>
				</view>
			</view>
			<!-- 平台协议 -->
			<view class="agreement-mask" v-if='agreementIsShow'>
				<view class="bg-white padding-lg agreement ">
					<view class="text-grey text-lg text-center  padding-bottom-xs">
						平台用户协议
					</view>
					<view class="text-gray margin-bottom-xl agreement-item">
						欢迎您使用【拼趴】的服务，感谢您对【拼趴】的信任与支持！

						第一条 总则
						1.1 为维护您的权益，请您仔细阅读本《平台用户服务协议》（“本协议”）各条款的具体内容，充分理解其表述的含义。请您务必审慎阅读、充分理解各条款内容，特别是免除或者限制责任的条款、法律适用和争议解决条款。


						感谢您的耐心阅读！
					</view>
					<view class="cu-btn round agreement-btn padding-lr-lg bg-blue" @click="agreementHide">
						确定
					</view>
				</view>
			</view>

		</view>
		<view class="cu-tabbar-height"></view>
	</view>
</template>

<script>
	import tuiNumberbox from "@/components/numberbox/numberbox"

	import {
		getEpartyGoodsDetail,
		saveOrder,
		getCoupoList
	} from "@/api/orderSubmit.js"

	import {
		getGoodsDetail
	} from "@/api/storeDetailApi.js"

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
			tuiNumberbox
		},
		data() {
			return {
				isShow: false,
				radio: -1,
				loading: true,
				agreementIsShow: false,
				orderType: 1,
				goodsId: 0,
				count: 1,
				tips: '选择优惠券',
				goodsDetail: {},
				startDate: formatDate(new Date()),
				uid: 1002,
				sTime: '00:00',
				saveData: {
					"uid": 10002, //用户ID
					"totalAmount": 308.92, //订单总价
					"couponId": null, //优惠券编号,如果无可不传，团购、所有游戏、限时抢购，100购物商品不可使用优惠券
					"remark": "",
					"orderType": 0, //订单类型  订单类型：0/普通商品订单 1/套餐订单 2/幸运之星订单 3/五区选号订单 (4/翻牌订单 5/智勇大冲关订单 --废弃) 6/限时抢购订单 7/团购订单 8/100购物订单 9/电音派对订单
					"status": 0, //订单状态: 订单状态：0/未支付 1/已支付 2/已使用 3/已评价 4/已完成 5/申请退款 6/退款驳回 7/退款成功 8/已取消 9/无效订单 10/已删除订单
					"luckystarNumber": 0, //幸运之星选中号码，当订单类型为幸运之星时需向后台传此字段
					"zoneNumber": 0, //五区选号号码，当订单类型为五区选号时需向后台传此字段
					"zoneId": 0, //五区选号场次编号,当订单类型为五区选号时需向后台传此字段
					"luckystarId": 0, //幸运之星场次编号，当订单类型为幸运之星时需向后台传此字段
					"name": "", //订单下单人姓名
					"phone": "", //联系电话
					"details": [ //订单详情，幸运之星、五区选号不传此数组，不传details字段
						{
							"gid": 0, //商品&套餐编号,
							"gsid": 0, //商品规格编号，当gid为商品时才传此参数
							"number": 0, //数量，为套餐时传1即可,
							"price": 0, //商品&套餐&电音派对套餐单价,
							"totalPrice": 0, //总价，计算方法(price*num)
							"status": 0, //订单详情商品状态：0/未发货 1/已发货
							"eid": 0, //电音派对编号
							"epid": 0, //电音派对套餐编号
							"reserve_date": "" //预订消费时间，提前这个日期4小时以后都可退款，4小时内不可退
						}
					]

				},
				coupoList: [],
				// totalPrice: 0,
			}
		},
		onLoad(options) {
			// 订单类型：0/普通商品订单 1/套餐订单 2/幸运之星订单 3/五区选号订单 6/限时抢购订单 7/团购订单 8/100购物订单 9/电音派对订单 
			this.saveData.orderType = options.orderType;
			this.goodsId = options.gid;
			this.count = parseInt(options.count);
			// console.log(this.count)

			const ot = this.saveData.orderType;
			if (ot == 1) {
				this.getGoodsDetail()
			} else if (ot == 9) {
				this.getEpartyGoodsDetail()
			}

			//获取优惠券
			this.getCoupoList()

			this.loading = false;
		},
	
		methods: {
			//电音派对套餐
			async getEpartyGoodsDetail() {
				const goodsDetailRes = await getEpartyGoodsDetail(this.goodsId);
				this.goodsDetail = goodsDetailRes.data.packageInfo;
				this.goodsDetail['totalPrice'] = this.count * this.goodsDetail.price
				console.log(this.goodsDetail)
			},
			
			// 普通套餐
			async getGoodsDetail() {
				const goodsDetailRes = await getGoodsDetail(this.goodsId);
				this.goodsDetail = goodsDetailRes.data.Goods;
				this.goodsDetail['totalPrice'] = this.count * this.goodsDetail.price
				// console.log(this.goodsDetail)
				// console.log(this.goodsDetail.totalPrice)
	

			},
			async getCoupoList() {
				const getCoupoListRes = await getCoupoList({
					pageindex: 1,
					pagesize: 9999,
					uid: this.uid
				})
				const data = getCoupoListRes.data.selectCouponList.list;
				// console.log(data)

				const that = this;

				for (let i = 0; i < data.length; i++) {
					let scope = data[i].couponType.scope;
					let fMoney = data[i].couponType.amountPrice; //满额
					let deduceType = data[i].couponType.deduceType; //优惠类型 1满减 2折扣
					let sid = data[i].couponType.sid;

					if (scope == 0) {

						if (that.goodsDetail.totalPrice >= fMoney && deduceType == 1) {
							console.log("满足满减条件")
							that.coupoList.push(data[i])
						}else
						if (deduceType == 2) {
							console.log("满足打折")
							that.coupoList.push(data[i])
						}
					} else {

						if (sid == that.goodsDetail.sid) {

							if (that.goodsDetail.totalPrice >= fMoney && deduceType == 1) {
								that.coupoList.push(data[i])
							}
							if (deduceType == 2) {
								console.log("满足打折")
								that.coupoList.push(data[i])
							}
						}

					}
				}
				console.log(that.coupoList)
			},
			//创建订单
			async save() {

				const save = {
					"uid": this.uid,
					"totalAmount": this.totalPrice, //订单总价
					"couponId": null,
					"remark": this.saveData.remark,
					"orderType": parseInt(this.saveData.orderType),
					"status": 0,
					"name": this.saveData.name,
					"phone": this.saveData.phone,
					"details": [{
						"gid": this.goodsId,
						"number": 1, //数量，为套餐时传1即可,
						"price": this.goodsDetail.price, //
						"totalPrice": this.totalPrice, //总价，计算方法(price*num)
						"status": 0,
						"reserveDate": this.startDate + ' ' + this.sTime,
						type: 1
					}]
				}
				const res = await saveOrder(save)

			},
			startDateChange(e) {
				this.startDate = e.detail.value
			},
			sTimeChange(e) {
				this.sTime = e.detail.value
			},
			change: function(e) {
				this.count = e.value
			},
			//获取10天后的日期
			GetDateStr(AddDayCount) {
				var dd = new Date();

				dd.setDate(dd.getDate() + AddDayCount); //获取AddDayCount天后的日期  

				var y = dd.getFullYear();

				var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1); //获取当前月份的日期，不足10补0  

				var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate(); //获取当前几号，不足10补0 

				return y + "-" + m + "-" + d;

			},
			pay(tprice) {
				let that = this;
				if (this.saveData.name !== '' && this.saveData.phone !== '') {

					that.save()
					// let r = this.$refs.radio.disabled
					// console.log(r)
					setTimeout(() => {
						uni.navigateTo({
							url: `/pages/pay/pay?price=${tprice}`
						})
					}, 500)

				} else {
					uni.showToast({
						title: "你还有信息没有填",
						icon: "none"
					})
				}


			},
			NavigateToPaySuccess(tname, tid) {
				uni.navigateTo({
					url: "/pages/main/pay-success/pay-success"
				})
			},
			agreementShow() {
				this.agreementIsShow = true
			},
			agreementHide() {
				this.agreementIsShow = false
			},
			RadioChange(e) {
				let that = this;
				that.radio = e.detail.value
				let deductType = that.coupoList[parseInt(that.radio)].couponType.deductType; //券类型 1满减 2折扣
				let fullDeductMoney = that.coupoList[parseInt(that.radio)].couponType.fullDeductMoney; //满减
				let discount = that.coupoList[parseInt(that.radio)].couponType.discount; //折扣
				let totalPrice = that.goodsDetail.totalPrice;
				if (deductType == 1) {
					that.goodsDetail.totalPrice = (totalPrice - fullDeductMoney).toFixed(2);;
					console.log(that.goodsDetail.totalPrice)

				} else if (deductType == 2) {
					that.goodsDetail.totalPrice = (totalPrice * discount).toFixed(2);
					console.log('折扣券')
					console.log(that.goodsDetail.totalPrice)
				}
				that.$forceUpdate()
			},
			showModal() {
				// this.modalName = e.currentTarget.dataset.target
				this.isShow = true;
			},
			hideModal() {
				// this.modalName = null
				this.isShow = false
			},

		}
	}
</script>

<style>
	@import '../../../colorui/thorui.css';

	.cu-bar.foot {
		z-index: 99 !important;
	}

	.kp-dasborder-bottom {
		border-bottom: 2rpx dashed #f1f1f1;
	}

	.tui-checkbox {
		vertical-align: top;
		margin-right: 10rpx;
		padding-left: 4rpx;
	}

	uni-checkbox::before {
		right: 2rpx;
	}

	.agreement-mask {
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, .6);
		position: absolute;
		top: 0rpx;
		z-index: 8888;
	}

	.agreement {
		width: 80%;
		height: calc(100vh - 220rpx);
		border-radius: 30rpx;
		position: absolute;
		left: 10%;
		top: 12vh;

	}

	.agreement-item {
		width: 100%;
		height: calc(100% - 110rpx);
		overflow: scroll;
		text-indent: 2em;
	}

	.agreement-btn {
		position: absolute;
		bottom: 20rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.kp-goods-name {
		width: 60%;
		max-height: 120rpx;
		display: inline-block;
		padding-right: 20rpx;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 3;
		/* font-size: 32rpx !important; */
		line-height: 1.5;
	}
</style>
