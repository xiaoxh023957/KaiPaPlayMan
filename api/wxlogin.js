import $http from '@/js_sdk/zhouWei-request/requestConfig';

// 优惠券
export async function wxLogin(data)
{
	return await $http.post('/kpums/user/wxlogin',data)
}