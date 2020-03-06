import $http from '@/js_sdk/zhouWei-request/requestConfig';

// 评价list
export async function getcommentGoodslist(pageindex,pagesize,uid)
{
	return await $http.get("kpgms/shop-comment/commentGoodslist",{
		"pageindex":pageindex,
		"pagesize":pagesize,
		"uid":uid
	})
}

// 评价详情
export async function getshopCommentInfo(id)
{
	return await $http.get("kpgms/shop-comment/info/"+id)
}

// 删除评价 (将状态改变)
export async function updateshopComment(ids)
{
	return await $http.put("kpgms/shop-comment/update",ids)
}