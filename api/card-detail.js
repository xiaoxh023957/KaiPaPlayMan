import $http from '@/js_sdk/zhouWei-request/requestConfig';

// 年卡
export async function yearCardList(pageindex,pagesize)
{
	return $http.get("kpgms/yearcard/list",{
		pageindex:pageindex,
		pagesize:pagesize
	});
}


//个人会员
export async function yearCardInfo(id){
	return $http.get("/kpgms/yearcard-record/info/"+id)
}


//新开通会员
export async function newyearCard(id){
	return $http.post("/kpgms/yearcard-record/save",{
		uid:id,
		ycid:1
	})
}

//续费会员
// export async function yearCardInfo(id){
// 	return $http.post("/kpgms/yearcard/save"+id)
// }