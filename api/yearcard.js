import $http from '@/js_sdk/zhouWei-request/requestConfig';

export async function renewYearCardAjax(data)
{
	return await $http.post("kpgms/yearcard-record/renewYearcard",data);
}

export async function saveYearcard(data)
{
	return await $http.post("kpgms/yearcard-record/save",data)
}