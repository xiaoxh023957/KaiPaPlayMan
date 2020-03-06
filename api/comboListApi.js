import $http from '@/js_sdk/zhouWei-request/requestConfig';

//价格日历
export async function getPriceList(params)
{
	return $http.get("kpgms/goods-price/getCalenderPriceList",params);
}

// 商品套餐 
export async function getPackageList(params)
{
	return $http.get("kpgms/goods/getPackageList",params);
}