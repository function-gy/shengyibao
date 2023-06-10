import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex) // vue的插件机制

// #ifdef H5 
const store = new Vuex.Store({
	// 为了不和页面或组件的data中的造成混淆，state中的变量前面建议加上$符号
	state: {
		homeInfo:uni.getStorageSync(uni.getStorageSync('mall_code')+'_homeInfo')?uni.getStorageSync(uni.getStorageSync('mall_code')+'_homeInfo'):'[]',
		configthemp:uni.getStorageSync(uni.getStorageSync('mall_code')+'_configthemp')?uni.getStorageSync(uni.getStorageSync('mall_code')+'_configthemp'):'',
		code:uni.getStorageSync('mall_code')?uni.getStorageSync('mall_code'):'',
		myStyle:uni.getStorageSync(uni.getStorageSync('mall_code')+'_myStyle')?uni.getStorageSync(uni.getStorageSync('mall_code')+'_myStyle'):'',
		couponBgc:uni.getStorageSync(uni.getStorageSync('mall_code')+'_couponBgc')?uni.getStorageSync(uni.getStorageSync('mall_code')+'_couponBgc'):'',
		tabbarKey:uni.getStorageSync('tabbarKey')?uni.getStorageSync('tabbarKey'):'home',
	},
	mutations: {
		SET_CODE(state, key) {
			state.code = key
		},
		SET_TOKEN(state, key) {
			state.token = key
		},
		SET_configthemp(state, key) {
			state.configthemp = key
		},
		SET_myStyle(state, key) {
			state.myStyle = key
		},
		SET_couponBgc(state, key) {
			state.couponBgc = key
		},
		SET_HOMEINFO(state, key) {
			state.homeInfo = key
		},
		SET_TabbarKey(state, key) {
			state.tabbarKey = key
			uni.setStorageSync('tabbarKey',key)

		},
	}
})

// #endif
// #ifdef MP-WEIXIN || APP 
const store = new Vuex.Store({
	// 为了不和页面或组件的data中的造成混淆，state中的变量前面建议加上$符号	
	state: {
		homeInfo:uni.getStorageSync('homeInfo')?uni.getStorageSync('homeInfo'):'[]',
		configthemp:uni.getStorageSync('configthemp')?uni.getStorageSync('configthemp'):'',
		code:uni.getStorageSync('mall_code')?uni.getStorageSync('mall_code'):'',
		myStyle:uni.getStorageSync('myStyle')?uni.getStorageSync('myStyle'):'',
		couponBgc:uni.getStorageSync('couponBgc')?uni.getStorageSync('couponBgc'):'',
		tabbarKey:uni.getStorageSync('tabbarKey')?uni.getStorageSync('tabbarKey'):'home',
	},
	mutations: {
		SET_CODE(state, key) {
			state.code = key
		},
		SET_TOKEN(state, key) {
			state.token = key
		},
		SET_configthemp(state, key) {
			state.configthemp = key
		},
		SET_myStyle(state, key) {
			state.myStyle = key
		},
		SET_couponBgc(state, key) {
			state.couponBgc = key
		},
		SET_HOMEINFO(state, key) {
			state.homeInfo = key
		},
		SET_TabbarKey(state, key) {
			state.tabbarKey = key
			uni.setStorageSync('tabbarKey',key)

		},
	}
})

// #endif

export default store
