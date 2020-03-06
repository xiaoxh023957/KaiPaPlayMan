import $http from '@/js_sdk/zhouWei-request/requestConfig';

//五区选号(神秘商店)
 export async function getZoneList(pageindex,pagesize)
 {
 	return await $http.get("kplms/zone/list",{
 		"pageindex":pageindex,
 		"pagesize":pagesize
 	});
 } 
 //开心罗盘
 export async function getTurntableGiftList(frequency)
 {
 	return await $http.get("kplms/turntable-gift/turntableGiftList/"+frequency);
 } 
 
 
 export async function sendTurntableGiftData(TurntableGift)
 {
 	return await $http.post("kplms/turntable-gift/save",TurntableGift);
 }
 
 //答题竞猜
 
 export async function getQuestionList(pageindex,pagesize)
 {
 	return await $http.get("kplms/quiz-question/list",{
 		"pageindex":pageindex,
 		"pagesize":pagesize
 	});
 }


export async function getQuestionGiftList(pageindex,pagesize)
{
    return await $http.get("kplms/quiz-gift/list",{
        "pageindex":pageindex,
        "pagesize":pagesize
    });
}


export async function sendQuizGift(gift)
{
    return await $http.post("kplms/quiz-gift/save",gift);
}



// lucky列表
export async function luckylist(pageindex,pagesize)
{
    return await $http.get("/kplms/luckystar/selectLuckystarList",{
        "pageindex":pageindex,
        "pagesize":pagesize
    });
}


// 幸运之星记录表 list
export async function luckyrecordlist(luckystarId)
{
    return await $http.get("/kplms/luckystar-record/list",{
        "luckystarId":luckystarId
    })
}

// 幸运之星详情信息 list
export async function luckystarinfo(id)
{
    return await $http.get("/kplms/luckystar/info/"+ id)
}



// 翻牌
export async function getDrawsGiftList(pageindex,pagesize)
{
    return await $http.get("/kplms/draws-gift/list",{
        "pageindex":pageindex,
        "pagesize":pagesize
    })
}

export async function  selectFrequency(frequency)
{
	return await $http.get("/kplms/draws-gift/selectFrequency/"+ frequency)
}

export async function user(pageindex,pagesize) {
	return await $http.get("kpums/user/list", {
		"pageindex": pageindex,
		"pagesize": pagesize
	})
}

// 游戏扣豆子
export async function deductGold (gameId,uid) {
	return await $http.post("kplms/gameBiz/deductGold",{
		'gameId': gameId,
		'uid' : uid
	})
}

// 优惠卷保存
export async function coupon (coupon) {
	return await $http.post("kpcms/coupon/save",coupon)
}


// 优惠卷列表
export async function couponList (pageindex,pagesize) {
	return await $http.get("kplms/draws-gift/list",{
		'pageindex':pageindex,
		'pagesize': pagesize
	})
}

// 大转盘
export async function getTurnTableData()
{
	return await $http.get("kplms/turntable/info/1",{});
}

// 翻牌
export async function getFlop () {
	return await $http.get("kplms/draws/info/1",{});
}