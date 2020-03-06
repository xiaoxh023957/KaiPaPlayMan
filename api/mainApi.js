import $http from '@/js_sdk/zhouWei-request/requestConfig';
 
/** 
 * 获取轮播列表
 */  
export async function getBannerList(pageindex,pagesize)
{
	return await $http.get("kpbms/banner/selectList",{
		"pageindex":pageindex,
		"pagesize":pagesize
	});
} 

//文章轮播列表
export async function getNewsList(pageindex,pagesize){
	return await $http.get("kpbms/article/list",{
		"pageindex":pageindex,
		"pagesize":pagesize
	})
}

//店铺类型列表
export async function getStoreTypeList(pageindex,pagesize)
{
	return await $http.get("kpsms/store-type/list",{
		"pageindex":pageindex,
		"pagesize":pagesize
	});
}

//店铺类型列表筛选
export async function getSelectStoreList(pageindex,pagesize,stypeid)
{
	return await $http.get("kpsms/store/selectList",{
		"pageindex":pageindex,
		"pagesize":pagesize, 
		'stypeid':stypeid
	}); 
}


//商品类型列表
export async function getGoodsTypeList(params) {
	return await $http.get("kpgms/goods-type/list",params);
}

// 店铺名称
export async function selectList (params) {
	return await $http.get("kpsms/store/selectList", params)
}
