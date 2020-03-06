import $http from '@/js_sdk/zhouWei-request/requestConfig';


// 一百购物list
export async function getselectListmall(pageindex,pagesize,type)
{
	return await $http.get("kpgms/goods/selectList",{
		"pageindex":pageindex,
		"pagesize":pagesize,
		"type":type
	})
}


// 顶部list
export async function  getGoodsTypeList(pageindex,pagesize,type)
{
	return await $http.get("kpgms/goods-type/list",{
		"pageindex":pageindex,
		"pagesize":pagesize,
		"type":type
	})
}