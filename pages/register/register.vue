
<template>
	<view :style="[
	   {'min-height':deviceHeight+'px'},
	   {'background-color':'#ffffff'},
	   {'background-size':'100%'} 
	   ]">
		<view style="height: 200rpx;"></view>
		<view class="text-xxl padding-tb-xl" style="margin: 0 auto; text-align: center;">
			欢迎登录开趴
		</view>
		<view style="height: 200rpx;"></view>
		<view>
			<view class="btn-group">
				<button class="cuIcon-weixin round shadow-blur text-white" style="width: 65%;background-color: #5CAB44 ;" @click="wechatLogin()">微信登录</button>
			</view>
		</view>
		<checkbox-group class="block foore  margin-left-xl padding-left-xs" @change="CheckboxChange" >
			<view class="cu-form-group margin-top margin-left-xl padding-left-xl"  >
				<checkbox :class="checkbox[0].checked?'checked':''" :checked="checkbox[0].checked?true:false" value="A"  style="transform: scale(0.6)"></checkbox>
				<text>登录代表您同意</text>
				<text>《用户登录协议》</text>
		</view>
		</checkbox-group>
		</view>
		</form>
	</view>
</template>

<script>
	import {wxLogin} from '@/api/wxlogin.js'
	export default {
		data() {
			return {
					deviceHeight: 0,
					backbarHeight:0,
				checkbox: [{
					value: 'A',
					checked: true
				}],
			};
		},
		onLoad() {
			
		},
		mounted: function(options) {
				   let that = this;
				   
				// #ifdef H5
				uni.setStorageSync("USERDATA",{
					uid:10002,
					nickname:"兮以城空i",
					avatar:"http://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIicsl2w2EIHb7UwzTica8OTWib2MX76icT46eGLG9tpAdO2LfLR24iaOQiaGhVUYjuIbQKzQC0OucBlu8A/132",
					gold:500,
					yearCardUser:true
				})
				// #endif
				
				// #ifdef APP-PLUS
				//uni.removeStorageSync("USERDATA")
				// #endif
				   
				   uni.getSystemInfo({
				    success: function(res) {
				     that.deviceHeight = res.windowHeight
				    },
				   });		
					  
					  //判断用户是否已登录
					  let hasLogin = uni.getStorageSync("USERDATA");
					  if(hasLogin!==undefined && hasLogin!==null && hasLogin!=="")
					  {
					  	uni.redirectTo({
					  		url:"/pages/index/index"
					  	})
					  }
				
		},
		methods: {
			
			/**
			 * 微信登录
			 */
			wechatLogin(){
				const that = this;
				const data = uni.login({
				  provider: 'weixin',
				  success: function (loginRes) {
				    console.log(loginRes.authResult);
					that.getWxUserInfo(loginRes.authResult);
					
				  },
				  fail:function(e)
				  {
					  console.log(e)
					  that.getWxUserInfo(e);
				  }
				});
				
			},
			
			async getWxUserInfo(info)
			{
				const data = await wxLogin(info);
				console.log(data)
				//设置用户信息至缓存内
				console.log("微信用户登录成功,用户信息:",JSON.stringify(data.data.userData));
				
				uni.setStorageSync("USERDATA",data.data.userData);
				let nickname = data.data.userData.nickname;
				uni.showToast({
					title:`登录成功,欢迎回来${nickname}`
				})
				
				uni.redirectTo({
					url:"/pages/index/index"
				})
			},
			
			CheckboxChange(e) {
				var items = this.checkbox,
					values = e.detail.value;
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items[i].value == values[j]) {
							items[i].checked = true;
							break
						}
					}
				}
			},
			
			
			

		}
	}
</script>

<style>
	html {
		background-color: #FFFFFF;
	}
	body {
		background-color: #FFFFFF;
		text-align: center;
	}
	.cu-form-group .title {
		min-width: calc(4em + 15px);
	}
	.foore {
		position: absolute;
		bottom: 0;
	}
</style>
