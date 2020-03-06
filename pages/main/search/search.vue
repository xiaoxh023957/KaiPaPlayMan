<template> 
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true" ref='backbar'>
			<block slot="backText" class="text-white">返回</block>
		</cu-custom>
		<!-- 搜索 -->
		<view class="cu-bar search kpbg-black">
			<view class="search-form round ">
				<text class="cuIcon-search "></text>
				<input @focus="InputFocus" @blur="InputBlur" :adjust-position="false" v-model="form.sname" type="text" placeholder="请输入店铺名称"
				 confirm-type="search" @input="search"></input>
			</view>

		</view>

		<view class="uni-list">
			<view class="uni-list-cell cu-bar " v-for="(item,index) in matchList" :key="index" @click="store(item.sid)" style="background-color: #fff; padding: 12px 20px; margin-bottom: 4px;">
				<view class="" style="float: left;">
					<view class="cu-avatar kp-userContRadius" style="height:40px;width:40px; border-color:#fff; margin-left: 0;" :style="{'background-image':' url('+item.storeAvatar+')'}"></view>
					<view class="uni-list-cell-navigate uni-navigate-right" style="display: inline-block; padding-left: 5px">
						{{item.sname}}
					</view>
				</view>
				<view class="" style="float: right;  text-align: right;">
					<view>
						<view style="font-size: 12px;">
							<text class="cuIcon-location" style="color: orange; padding-right: 3px;"></text>
							{{item.address}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tuiCard from "@/components/card/card"
	import {
		selectList
	} from "@/api/mainApi.js"
	export default {
		data() {
			return {
				form: {
					sname: ""
				},
				selectList: {},
				searchAll: [],
				matchList: [],
				sid: ''
			}
		},
		async mounted() {

			const res = await selectList(
			{
				pageindex:1,
				pagesize:9
			});
			this.searchAll = res.data.page.list;
			
			console.log(this.searchAll)

		},
		methods: {
			InputFocus(e) {
				this.InputBottom = e.detail.height
			},
			InputBlur(e) {
				this.InputBottom = 0
			},

			// 模糊查询
			async search(e) {
				let keyword = e.detail.value;

				const that = this;
				this.matchList = []
				if (keyword && keyword !== "") {
					for (let i = 0; i < that.searchAll.length; i++) {
						let data = that.searchAll[i];
						if (data.sname.includes(keyword)) {
							that.matchList.push(data);
						}
					}
				}


			},

			// 跳转到店铺详情
			store(sid) {
				console.log(sid)
				uni.navigateTo({
					url: "/pages/main/store-detail/store-detail?sid=" + sid

				})
			},
		}
	}
</script>

<style>

</style>
