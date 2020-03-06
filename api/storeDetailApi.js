import $http from '@/js_sdk/zhouWei-request/requestConfig';

//店铺详情
export async function getSelectStoreDetail(sid)
{
	return await $http.get("kpsms/store/selectStoreOne/"+sid);
}

// 商品套餐列表
export async  function getGoodsList(params) {
	return await $http.get("kpgms/goods/selectList",params)  
}

//商品类型

export async  function getGoodsTypeList(params) {
	return await $http.get("kpgms/goods-type/list",params)
}

//商品详情

export async  function getGoodsDetail(gId) {
	return await $http.get("kpgms/goods/selectGoodsOne/"+gId)
}

//商品评价

export async  function getCommentGoodsList(pageindex,pagesize,gid) {
	return await $http.get("kpgms/shop-comment/commentGoodslist",{
		"pageindex":pageindex,
		"pagesize":pagesize, 
		'gid':gid
	})
}
//获取列表评价

export async  function getCommentStoreList(pageindex,pagesize,sid) {
	return await $http.get("kpgms/shop-comment/commentStorelist",{
		"pageindex":pageindex,
		"pagesize":pagesize, 
		'sid':sid
	})
}
