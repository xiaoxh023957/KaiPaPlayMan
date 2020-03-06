 import $http from '@/js_sdk/zhouWei-request/requestConfig';
 
//用户端订单列表
export async function getOrderList(params){ //动态参数
	return await $http.get("kpoms/order/selectOrderList",params);
}

//订单详情
export async function getOrderDetail(orderId){ 
	return await $http.get("kpoms/order/selectOrderOne/"+orderId);
}
 
 