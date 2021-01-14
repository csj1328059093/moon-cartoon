import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from "vue-axios";
import { Loadmore } from 'mint-ui';
import animate from 'animate.css'
//vant
import Vant from 'vant';
import { Lazyload } from "vant";
import 'vant/lib/index.css';


import store from './store'

// import Vuex from 'vuex'

Vue.use(Vant);
Vue.use(Lazyload)

// Vue.use(Vuex)
Vue.component(Loadmore.name, Loadmore);
Vue.use(VueAxios, axios)
Vue.use(animate)
Vue.config.productionTip = false
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')


