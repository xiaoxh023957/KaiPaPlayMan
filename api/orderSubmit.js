import $http from '@/js_sdk/zhouWei-request/requestConfig';

//获取电音套餐详情 
 export async function getEpartyGoodsDetail(id)
 {
 	return await $http.get("ems/eparty/package/info/"+id);
 } 
 
 //获取优惠券列表
 export async function getCoupoList(params)
 {
 	return await $http.get("kpcms/coupon/selectCouponList",params);
 } 
 
 // 生成订单 
 export async function saveOrder(order)
 {
 	return await $http.post("kpoms/order/save",order);
 } 
 
 //修改订单状态
 export async function updateOrder(order)
 {
 	return await $http.put("kpoms/order/update",order);
 }