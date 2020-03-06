<template>
	<view>
		<cu-custom bgColor="kpbg-black" :isBack="true" class="text-white">
			<block slot="backText" class="text-white">返回</block>
			<block slot="content" class="text-white">需求提交</block>
		</cu-custom>
		<form>
			<view class="cu-form-group margin-top">
				<view class="title" style="width: 180rpx; height: 100%; text-align-last: justify;">姓名：</view>
				<input name="input" v-model="nickname"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">需求标题：</view>
				<input name="input" v-model="title"></input>
			</view>
			<view class="cu-form-group">
				<view class="title">手机号码：</view>
				<input type="number" v-model="phone"></input>
				<view class="cu-capsule radius">
					<view class='cu-tag bg-blue '>
						+86
					</view>
					<view class="cu-tag line-blue">
						中国大陆
					</view>
				</view>
			</view>

			<view class="cu-form-group">
				<view class="title">店铺类型：</view>
				<picker @change="PickerChange" :value="index" :range="picker" >
					<view class="picker">
						{{index>-1?picker[index]:info}}
					</view>
				</picker>
			</view>
			<view class="margin-tb  padding-bottom">
				<text class="margin-left text-grey">需求内容：</text>
				<view class="cu-form-group margin-tb-xs ">
					<textarea maxlength="-1" :disabled="modalName!=null" @input="textareaAInput" placeholder="您可以在这里把您的需求提交给我们，让我们为您定制满意的服务。"
					 v-model="content"></textarea>
				</view>
			</view>
			<view class="padding flex flex-direction " style="width: 400rpx;margin: auto;">
				<button class="cu-btn bg-green lg text-center" @click="save()">提交</button>
			</view>
		</form>
	</view>
</template>

<script>
	import {
		postdemandsave,
		getmydemand,
		getstoreType,
		
		getmydemandlist
	} from "@/api/demand.js"
	export default {
		data() {
			return {
				uid: 1,
				mydemand: {},
				storeType: {},
				index: -1,
				picker: [],
				modalName: null,
				textareaAValue: '',
				textareaBValue: '',
				demandsave: {},
				did: 1,
				nickname: '',
				title: '',
				content: '',
				phone: '',
				info:'选择店铺类型'
			}
		},
		mounted: async function() {
			
			
			let userInfo = uni.getStorageSync("USERDATA");
			this.uid = userInfo.uid;
			
			//const mydemand = await getmydemand(this.did);
			// console.log(mydemand)

			const storeType = await getstoreType(1, 10);
			// this.storeType = storeType.data.data.records;
			// console.log(storeType)
			let type = storeType.data.page.list;
			// 使用var 声明循环变量i
			for (let i = 0; i < type.length; i++) {
				this.picker.push(type[i].stypename)
			}

		},
		methods: {
			async save() {
				let save = {
					uid: this.uid,
					nickname: this.nickname,
					content: this.content,
					title: this.title,
					phone: this.phone,
					stypename:this.picker[this.index]
				};
				const result = await postdemandsave(save);
				console.log(result)

				uni.showToast({
					mask: true,
					title: '提交成功',
					duration: 1000
				})
				uni.navigateBack()
				// console.log(result)
			},
			PickerChange(e) {
				this.index = e.detail.value
				console.log(this.index)

			},
			textareaAInput(e) {
				this.textareaAValue = e.detail.value
			},
			textareaBInput(e) {
				this.textareaBValue = e.detail.value
			}
		},
	}
</script>

<style>
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.cu-form-group uni-picker .picker{
		    line-height: 50px;
		    font-size: 14px;
		    -o-text-overflow: ellipsis;
		    text-overflow: ellipsis;
		    white-space: nowrap;
		    overflow: hidden;
		    width: 100%;
		    text-align: left !important;
	}
</style>
