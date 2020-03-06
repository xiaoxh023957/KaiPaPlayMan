<template>
	<view class="padding">
		<view class="waterfall-container ">

			<view class="waterfall-item padding-bottom radius padding-lr-xs text-center bg-white margin-bottom-xs" v-for="(item,index) in list" :key="index"
			 @click="NavigateToGoodsDetail()">
				<image class="radius" :src="item.url" mode="aspectFill"></image>
				<p style="color: #666;" class="text-left">{{item.cont}}</p>
				<view class="margin-left-xs text-left">
					<tui-rate :current="3" normal="#ccc" active="#ff7900" :size="12" />
				</view>
				<p class="cf">
					<text class="cu-tag padding-xs text-red text-lg margin-lr-xs fl bg-white">{{item.price}}</text>
					<text class="cu-tag padding-xs  margin-lr-xs fr bg-white">余量:{{item.count}}</text>
				</p>
			</view>

		</view>

		<tui-divider width="80%">已经到底啦</tui-divider>
	
	</view>
</template>

<script>
	import tuiRate from '@/components/rate/rate.vue'
	import tuiDivider from "@/components/divider/divider"
	
	export default {
		components: {
			tuiRate,
			tuiDivider
		},
		data() {
			return {
				list: [{
						url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572413377848&di=7a49ac7a1e122de0a9149ce7357790ea&imgtype=0&src=http%3A%2F%2Fpic19.nipic.com%2F20120308%2F2840041_112806481100_2.jpg",
						cont: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
						price: "¥223",
						count: "222"
					},
					{
						url: "http://image.antns.com/uploads/20180308/21/1520516084-iPBlwRcUOs.jpg",
						cont: "内容内容内容内容内容内",
						price: "¥223",
						count: "222"
					},
					{
						url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1573011220&di=babd9c17eb13dd3ef9407f552ce50bb1&imgtype=jpg&er=1&src=http%3A%2F%2Fimg0.pconline.com.cn%2Fpconline%2F1409%2F17%2F5448056_tu5974_101.jpg",
						cont: "内容内容内容内容内容内容内容内容内容内容内容",
						price: "¥223",
						count: "222"
					},
					{
						url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572413377848&di=7a49ac7a1e122de0a9149ce7357790ea&imgtype=0&src=http%3A%2F%2Fpic19.nipic.com%2F20120308%2F2840041_112806481100_2.jpg",
						cont: "内容内容内容内容内容内容容内容内容内容内容内容内容内容内内容内容内容",
						price: "¥223",
						count: "222"
					},
					{
						url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572416526036&di=87001c15ab3ab4776e571e272c2a9ae2&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201510%2F09%2F20151009151819_sHwmY.thumb.1000_0.jpeg",
						cont: "内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容内容",
						price: "¥223",
						count: "222"
					},
					{
						url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572413377848&di=7a49ac7a1e122de0a9149ce7357790ea&imgtype=0&src=http%3A%2F%2Fpic19.nipic.com%2F20120308%2F2840041_112806481100_2.jpg",
						cont: "内容内容内容内容内容容内容内容内容内内容内容内容内容",
						price: "¥223",
						count: "222"
					},
					{
						url: "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1572413377848&di=7a49ac7a1e122de0a9149ce7357790ea&imgtype=0&src=http%3A%2F%2Fpic19.nipic.com%2F20120308%2F2840041_112806481100_2.jpg",
						cont: "内容内容内容内容内容内容内容内容内容",
						price: "¥223",
						count: "222"
					}
				],
			}
		},
		methods: {
			NavigateToGoodsDetail() {
				uni.navigateTo({
					url: "/pages/main/goods-detail/goods-detail",
				});
			},
			
		}
	}
</script>

<style>
	.waterfall-container {
		/*分几列*/
		column-count: 2;
	}

	.waterfall-item {
		/*不留白，不知道什么意思可以取消这个样式试试*/
		break-inside: avoid;
	}
	.tui-divider-text {
		background-color: transparent !important;
	}
</style>
