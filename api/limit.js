import $http from '@/js_sdk/zhouWei-request/requestConfig';

export async function getLimitList(pageindex,pagesize)
{
	return await $http.get('kpgms/flash-sale/list',{
		"pageindex":pageindex,
		"pagesize":pagesize
	})
}