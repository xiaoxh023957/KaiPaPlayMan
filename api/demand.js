import $http from '@/js_sdk/zhouWei-request/requestConfig';

// 需求列表
export async  function getmydemandlist(pageindex,pagesize,uid) {
	return await $http.get("kpfms/demand/myDemand",{
		"pageindex":pageindex,
		"pagesize":pagesize, 
		'uid':uid
	})
}

// 需求详情
export async  function getmydemand(did) {
	return await $http.get("kpfms/demand/selectDemandOne/"+did)
}

// 需求提交：商家类型
export async  function getstoreType(pageindex,pagesize) {
	return await $http.get("kpsms/store-type/list",{
		"pageindex":pageindex,
		"pagesize":pagesize, 
	})
}

// 需求提交
export async  function postdemandsave(Demand) {
	return await $http.post("kpfms/demand/save",Demand)
}

// 删除接口
export async function demandDelete(did){
	return await $http.delete("kpfms/demand/delete?did="+did )
}
