import $http from '@/js_sdk/zhouWei-request/requestConfig';

/**
 * 获取IPv4地址
 */
export function getIPv4(){
	return uni.request({
		url:"https://api.ipify.org/?format=json"
	})
}