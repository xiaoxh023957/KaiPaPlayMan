import $http from '@/js_sdk/zhouWei-request/requestConfig';

export async function getarticledetail(id) {
	return await $http.get("kpbms/article/info/"+id)
}