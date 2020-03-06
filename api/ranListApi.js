import $http from '@/js_sdk/zhouWei-request/requestConfig';


// 排行榜
export async function  getquizRecordlist() 
{
	return await $http.get("kplms/quiz-record/leaderboard")
}