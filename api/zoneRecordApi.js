import $http from '@/js_sdk/zhouWei-request/requestConfig';

//五区选号(神秘商店)
export async  function getZoneList(pageindex,pagesize) {
	return await $http.get("kplms/zone/list",{
		'pageindex':pageindex,
		'pagesize':pagesize,
	})
}

export async  function getRecordList(pageindex,pagesize,zoneId) {
	return await $http.get("kplms/zone-record/list",{
		'pageindex':pageindex,
		'pagesize':pagesize,
		'zoneId':zoneId,
	})
}

//五区选号套餐列表
export async  function getGoodsList(pageindex,pagesize) {
	return await $http.get("kpgms/zone-goods/list",{
		'pageindex':pageindex,
		'pagesize':pagesize,
	})
}


/**
 * 获取五区选号记录
 * @param {Object} zoneId
 */
export async function getZoneData(zoneId)
{
	return await $http.get("/kplms/zone/info/"+zoneId);
}
