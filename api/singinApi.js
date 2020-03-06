import $http from '@/js_sdk/zhouWei-request/requestConfig';

//签到
export async function singin(Signin) {
	return await $http.post("kpsys/signin/save",Signin)
}

//查询是否签到
export async function isSingin(signin) {
	return await $http.post("kpsys/signin/getHasSign",signin)
}

//查询签到天数 kpsys/signin/list
export async function singinList(pageindex,pagesize,uid) {
	return await $http.get("kpsys/signin/list",{
		'pageindex':pageindex,
		'pagesize':pagesize,
		'uid':uid
	})
}
