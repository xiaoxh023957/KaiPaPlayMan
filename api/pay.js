import $http from '@/js_sdk/zhouWei-request/requestConfig';

/**
 * 获取微信支付信息
 * @param {Object} body
 * @param {Object} fee
 * @param {Object} ip
 * @param {Object} openId
 */
export async function getPrepayData(data){
	return await $http.post("/wechat/pay",data)
}