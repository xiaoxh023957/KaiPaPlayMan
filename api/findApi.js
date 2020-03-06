import $http from '@/js_sdk/zhouWei-request/requestConfig';

/**
 * @param {Object} pageindex 当前页数
 * @param {Object} pagesize 每页展示记录数
 */
export async function getFindList(pageindex, pagesize,uid) {
	return $http.get("kpfms/find/getList", {
		pageindex: pageindex,
		pagesize: pagesize,
		uid:uid
	});
}

// 我的发布list
export async function getmyFindList(pageindex, pagesize, uid) {
	return $http.get("kpfms/find/getList", {
		pageindex: pageindex,
		pagesize: pagesize,
		myuid: uid,
	});
}
// 我的发布详情
export async function getmyFinduid(uid) {
	return $http.get("kpfms/find/getFind/" + uid)
}

// 发现详情
export async function getFindfid(fid) {
	return $http.get("kpfms/find/getFind/" + fid)
}

// 发布发现
export async function postFindsave(find) {
	return $http.post("kpfms/find/save", find)
}


// 发现评论
export async function commentsave(FindComment) {
	return $http.post("kpfms/find-comment/save", FindComment)
}

export async function getcommentinfo(id) {
	return $http.get("kpfms/find-comment/info/" + id)
}



// 删除
export async function demandDelete(id) {
	return $http.delete("kpfms/demand/delete" + id)
}



// 点赞
// 查询点赞
export async function getPraisePage(pageindex, pagesize,fid) {
	return $http.get("fms/find/praise/page", {
		pageindex: pageindex,
		pagesize: pagesize,
		fid: fid,
	})
}

// 新增点赞
export async function postpraiseAdd(fmsFindPraise) {
	return $http.post("fms/find/praise/add", fmsFindPraise)
}


// 删除点赞
export async function postPraiseDelete(fpid) {
	// return $http.post("fms/find/praise/delete", fcid)
	return $http.get('fms/find/praise/delete/'+fpid)
	// /fms/find/praise/delete

}
