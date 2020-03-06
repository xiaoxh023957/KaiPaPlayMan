import $http from '@/js_sdk/zhouWei-request/requestConfig';

// 优惠券
export async function getCouponList(pageindex,pagesize)
{
	return $http.get("kpcms/coupon/selectCouponList",{
		pageindex:pageindex,
		pagesize:pagesize
	});
}

//  优惠券名称
// export async function getTypeList(pageindex,pagesize)
// {
// 	return $http.get("/kpcms/coupon-type/list",{
// 		pageindex:pageindex,
// 		pagesize:pagesize
// 	});
// }