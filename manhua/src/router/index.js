import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import My from "../views/My";
import Collect from "../views/Collect";
import New from "../views/New";

Vue.use(VueRouter)

const routes = [{
		path: '/',
		name: 'Home',
		component: Home,
	    // meta:{
		// 	keepAlive:false
		// }
	},
	{
		path: '/collect',
		name: 'Collect',
		component: Collect,
		// meta:{
		// 	keepAlive:false
		// }
	},
	{
		path: '/new',
		name: 'New',
		component: New,
	},
	{
		path: '/my',
		name: 'My',
		component: My
	}
]

const router = new VueRouter({
	// mode: 'history',
	base: process.env.BASE_URL,
	routes,
})

export default router
	// build: {
	// 	assetsPublicPath: './'
	// }

