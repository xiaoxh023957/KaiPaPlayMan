import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
import find from './pages/find/find.vue'
import user from './pages/user/user.vue'
import main from './pages/main/main.vue'
import store from './pages/store-list/store-list.vue'
import storeDiscuss from './pages/main/store-discuss/store-discuss.vue'
import single from './pages/main/single-goods/single-goods.vue'
import combo from './pages/main/combo-goods/combo-goods.vue'
import goodsDiscuss from './pages/main/goods-discuss/goods-discuss.vue'
import goodsCont from './pages/main/goods-detail/goods-cont/goods-cont.vue'
 

Vue.component('cu-custom',cuCustom)
Vue.component('Find',find)
Vue.component('User',user)
Vue.component('Main',main)
Vue.component('Store',store)
Vue.component('StoreDiscuss',storeDiscuss)
Vue.component('SingleGoods',single)
Vue.component('ComboGoods',combo)
Vue.component('GoodsDiscuss',goodsDiscuss)
Vue.component('GoodsCont',goodsCont)


import $http from '@/js_sdk/zhouWei-request/requestConfig';
Vue.prototype.$http = $http;
Vue.prototype.$QNDOMAIN = "http://kaipa.static.qingwing.cn"

import {addMoneyMark} from '@/utils/moneyUtils';
Vue.prototype.$moneyMark = addMoneyMark;

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})


app.$mount()
