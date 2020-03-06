<template>
	<view>

		<cu-custom bgColor="kpbg-black" :isBack="true" class="text-white">
			<block slot="backText">返回</block>
			<block slot="content">
				<view class="text-white">{{name}}</view>
			</block>
		</cu-custom>

		<view v-if="!loading">
			<!-- tab -->
			<scroll-view scroll-x class="bg-white nav text-center" scroll-with-animation :scroll-left="scrollLeft">
				<view class="cu-item" style="font-size: 36rpx ;" :class="index==TabCur?'text-orange ':''" v-for="(item,index) in dateList"
				 :key="index" @tap="tabSelect" :data-id="index"  :data-date="item.standardDate">
				 <view v-if="index==TabCur">
				 	{{item.standardDate}}
				 </view>
				 <view v-else>
				 	{{item.priceDate}}
				 </view>
					<view style="line-height: 20rpx;font-size: 26rpx;">{{$moneyMark(item.price)}}</view>
				</view>
			</scroll-view>

			<view class="padding bg-white grid margin-top-xs " v-for="(item,index) in getGoodsTypeList.records" :key="index"
			 @tap="NavigateToGoodsDetail(item.gid)">

				<image class="radius " style="width:30%; height:160rpx;" :src="item.iconImgpath"></image>

				<view class="padding-left-xs" style="width: 64%;">

					<view class="margin-bottom-xs gname">{{item.gname}}
					</view>
					<view class="text-grey bg-white xs margin-left-xs ">
						库存：{{item.stock}}
					</view>
					<view v-if="item.price ==999">
						暂未定价
					</view>
					<view  v-else class="text-red text-xxl margin-top-xs  ">
						{{$moneyMark(item.price)}}
					</view>
				</view> 
			</view>
			<view v-if="currPage===totalPage||totalPage==''">
				<tui-divider width="80%">没有更多啦</tui-divider>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiRate from '@/components/rate/rate.vue'
	import tuiDivider from "@/components/divider/divider"

	import { getPriceList,getPackageList } from "@/api/comboListApi.js"
	
	//获取时间日期
	var formatDate = function (date) {
	    var y = date.getFullYear();  
	    var m = date.getMonth() + 1;  
	    m = m < 10 ? '0' + m : m;  
	    var d = date.getDate();  
	    d = d < 10 ? ('0' + d) : d;  
	    return y + '-' + m + '-' + d;  
	};  
	
	export default {
		components: {
			tuiRate,
			tuiDivider
		},
		data() {
			return {
				loading: true,
				name: '',
				gtid: 1,
				currPage: 1,
				totalPage: 1,
				TabCur: 0,
				scrollLeft: 0,
				getGoodsTypeList: {},
				dateList: [{
						date: "11.6",
						price: "123起"
					},
					{
						date: "11.7",
						price: "88起"
					},
					{
						date: "11.8",
						price: "88起"
					},
					{
						date: "11.9",
						price: "288起"
					},
					{
						date: "11.10",
						price: "88起"
					},
					{
						date: "11.11",
						price: "88起"
					},
					{
						date: "11.12",
						price: "88起"
					},
					{
						date: "11.13",
						price: "88起"
					},
					{
						date: "11.14",
						price: "88起"
					},
					{
						date: "11.15",
						price: "88起"
					},
				]
				,requstDate:'',
			};
		},
		onLoad: async function(option) {
			console.log(option);
			this.name = option.tname;
			this.gtid = option.tid;

			// 获取价格列表
			const dateDataRes = await getPriceList({days:10,gtypeid:this.gtid,startDate:formatDate(new Date())})
			this.dateList = dateDataRes.data.list
			console.log(this.dateList)
			
			
			//获取套餐列表
			const getGoodsTypeListRes = await getPackageList({
				pageindex: 1,
				pageSize: 10,
				gtypeid: this.gtid,
				startDate:formatDate(new Date()),
			});

			this.getGoodsTypeList = getGoodsTypeListRes.data.page;
			this.totalPage = this.getGoodsTypeList.totalPage;

			console.log(formatDate(new Date()));

			this.loading = false;

		},
		//下拉刷新
		async onPullDownRefresh() {
			const getGoodsTypeListRes = await getPackageList({
				pageindex: 1,
				pageSize: 10,
				gtypeid: this.gtid,
				startDate:formatDate(new Date()),
			});
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		//上拉加载
		onReachBottom: async function() {
			if (this.currPage == this.totalPage) return;
			this.currPage += 1;
			const getGoodsTypeListRes = await getPackageList({
				pageindex: this.currPage,
				pageSize: 10,
				gtypeid: this.gtid,
				startDate:formatDate(new Date()),
			});
			const loadData = getGoodsTypeList.data.page;
			const list = this.getGoodsTypeList.records;
			this.getGoodsTypeList.list = list.concat(loadData.list)
			this.currPage = loadData.currPage;
		},
		methods: {
			async tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				this.requstDate = e.currentTarget.dataset.date
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60;
				console.log(this.requstDate)
				
				const getGoodsTypeListRes = await getPackageList({
					pageindex: 1,
					pageSize: 10,
					gtypeid: this.gtid,
					startDate:this.requstDate,
				});
				
				this.getGoodsTypeList = getGoodsTypeListRes.data.page;
				this.totalPage = this.getGoodsTypeList.totalPage;
				
				console.log(this.getGoodsTypeList);
				
			},
			NavigateToGoodsDetail(gid) {
				uni.navigateTo({
					url: `/pages/main/goods-detail/goods-detail?gid=${gid}`,

				});
			},

		}
	}
</script>

<style>
	.tui-divider-text {
		background-color: transparent !important;
	}

	.gname {
		/* height: 88rpx; */
		overflow: hidden;
		padding-right: 40rpx;
		position: relative;
		word-break: break-all;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box !important;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		font-size: 32rpx !important;
		line-height: 1.5;
	}
</style>
