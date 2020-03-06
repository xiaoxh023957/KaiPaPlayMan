<template>
	<view>
		<cu-custom bgColor="kpbg-black" class="text-white" :isBack="true">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">发布发现</block>
			<block slot="right">
				<button class="cu-btn round bg-gray padding-lr" style="margin-right:15rpx" @click="save">发布</button>
			</block>
		</cu-custom>
		<view v-if="!loading">
			<view class="cu-form-group margin-top">
				<textarea v-model="text" maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="这一刻的新鲜事..."></textarea>
			</view>
			<view class="cu-bar bg-white margin-top">
				<view class="action">
					选择配图
				</view>
				<view class="action">
					{{imgList.length}}/6
				</view>
			</view>
			<view class="cu-form-group">
				<view class="grid col-3 grid-square flex-sub">
					<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
					 <image :src="imgList[index]" mode="aspectFill"></image>
						<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
							<text class='cuIcon-close'></text>
						</view>
					</view>
					<view class="solids" @tap="ChooseImage" v-if="imgList.length<6">
						<text class='cuIcon-cameraadd'></text>
					</view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import {postFindsave,getmyFinduid,getmydemand} from "@/api/findApi.js"
	import tuiIcon from "@/components/icon/icon"
	import tuiButton from "@/components/button/button"
	export default {
		components: {
			tuiIcon,
			tuiButton,

		},
		data() {
			return {
				uid:1,
					index: -1,
					imgList: [],
					modalName: null,
					Findsave: {},
					text:'',
					demandsave:{},
					loading:true,
					userInfo:{}

			  }
	    },
		mounted: async function(){

			// const storeType = await getstoreType(1,10);
			// console.log(storeType)
			// const type= this.storeType.data.data.records;

			let userInfo = uni.getStorageSync("USERDATA");
			if(!userInfo)
			{
				uni.redirectTo({
					url:"/pages/register/register"
				})
			}

			this.userInfo = userInfo;
			this.uid = userInfo.uid;

			this.loading = false

		},
		async fonLond(){

		},
		updated() {
			// console.log(this.text)
		},
		methods: {
			async save()
			{
				let images = [];
				for(let i=0;i<this.imgList.length;i++)
				{
					let imgData = this.imgList[i];
					let image = {
						imgpath:imgData,
						status:0
					}
					images.push(image);
				}
				let save = {
					uid:this.uid,
					content:this.text,
					images:images
				};


				const result = await postFindsave(save);
				console.log(result)
				uni.showToast({
					mask:true,
					title: '提交成功',
					duration: 1000
				})



				uni.navigateBack()

			},
			async ChooseImage() {
				const that = this;
				await this.$http.qnImgUpload({
						count: 6, //默认 9
						sizeType: ['original', 'compressed'], //默认 ['original', 'compressed']
						sourceType: ['album', 'camera'], //默认 ['album','camera']
					},
					(res) => {
						that.imgList.push(that.$QNDOMAIN + res)
					});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '',
					content: '确定要删除？',
					cancelText: '取消',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			}
		}
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
</style>
