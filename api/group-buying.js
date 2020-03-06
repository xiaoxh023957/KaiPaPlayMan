import $http from '@/js_sdk/zhouWei-request/requestConfig';

// 我的团购

export async function getselectMyGroup(uid) {
	return $http.get("kpgms/group/selectMyGroup/"+uid)
}

// 团购商品详情
export async function getselectMyGroupgid(gid) {
	return $http.get("/kpgms/goods/selectGoodsOne/" + gid)
}

	// getselectMyGroup
// /kpgms/group/selectMyGroup/
// export async function getmyFindList(pageindex,pagesize,uid)
// {
// 	return $http.get("/kpfms/find/getList",{
// 		pageindex:pageindex,
// 		pagesize:pagesize,
// 		uid: uid,
// 	});
// }