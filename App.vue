<script>
	import Vue from 'vue'
	/**
	 * @author 长沙轻翼网络科技有限公司
	 * @version 0.1
	 * @date 2019年10月21日11:01:49
	 */
	export default {
		onLaunch: function() {

			console.log('开趴小程序启动');

			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
					// #ifdef MP-WEIXIN
					Vue.prototype.StatusBar = e.statusBarHeight;
					let custom = wx.getMenuButtonBoundingClientRect();
					Vue.prototype.Custom = custom;
					Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
					// #endif       
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})

		},
		onShow: function() {
			console.log('开趴小程序界面显示')
		},
		onHide: function() {
			console.log('开趴小程序界面隐藏')
		}
	}
</script>

<style>
	/*每个页面公共css */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "colorui/app.css";
	@import './colorui/main.css';
	@import './colorui/icon.css';
</style>
