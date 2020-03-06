import $http from '@/js_sdk/zhouWei-request/requestConfig';

//提交评论 
export async function saveEvaluate(ShopComment ){
	return $http.post('kpgms/shop-comment/save',ShopComment )
}

// 修改订单状态 
export async function updateOrderStatus(OrderDetail){
	return $http.put('kpoms/order/update',OrderDetail )
}