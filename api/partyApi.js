import $http from '@/js_sdk/zhouWei-request/requestConfig';

//电音派对预告列表  
 export async function getEpartyForecastList(pageindex,pagesize)
 {
 	return await $http.get("kpems/eparty-forecast/list",{
 		"pageindex":pageindex,
 		"pagesize":pagesize
 	});
 } 
 
 //预告详情{id}
 export async function getEpartyForecastDetail(id)
 {
 	return await $http.get("kpems/eparty-forecast/info/"+id);
 } 
 
 
 //电音派对列表
  export async function getEpartyList(pageindex,pagesize)
  {
  	return await $http.get("kpems/eparty/findAll",{
  		"pageindex":pageindex,
  		"pagesize":pagesize
  	});
  } 
  
  //派对详情
  export async function getEpartyDetail(id)
  {
  	return await $http.get("kpems/eparty/info/"+id);
  } 
  
  //电音派对套餐列表
  export async function getEpartyGoodsList(pageindex,pagesize)
  {
  	return await $http.get("ems/eparty/package/page",{
  		"pageindex":pageindex,
  		"pagesize":pagesize
  	});
  } 
  
  // 我的电音派对
  export async function  getmyselectOrderList(pageindex,pagesize,uid,orderType) //动态参数
  {
	return await $http.get("kpoms/order/selectOrderList",{
		"pageindex":pageindex,
		"pagesize":pagesize,
		"uid":uid,
		"orderType":orderType
	})
  }