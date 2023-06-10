import cryptoJs from "crypto-js"
import Tool from "@/util/tool/index.js";
import store from '@/store/index.js'
import Api from "@/api/index.js";
import configURl from '@/util/configURl.js'
const md5 = require('md5');
const SIGN_KEY = '6A5A235AC3B80D6DBB95B9925ECBE467';

function sign(options = {}) {
	//isManage 通过url判断是否是管理端端
	Object.keys(options).forEach(function(key) {
		if (
			options[key] === "" ||
			options[key] === null ||
			options[key] === undefined ||
			key === "sign" ||
			key === "timestamp" ||
			key === "nonce_str"
		) {
			delete options[key];
		}
	});
	options.timestamp = Date.parse(new Date()) / 1000;
	options.nonce_str = md5(options.timestamp);
	
	// #ifdef H5
	options.spm_id = uni.getStorageSync('mall_code');
	// #endif
	// #ifdef MP-WEIXIN || APP
	options.spm_id = configURl.appid;
	// #endif

	let signString = sort(options) + 'key=' + SIGN_KEY;

	options.sign = md5(signString).toUpperCase();
	return options
}

function sort(params) {
	let str = ''

	function sortIn(obj, type) {
		let obja = null

		if (type !== 'Array') {
			obja = Object.keys(obj).filter(t => {

				return obj[t] !== '' && obj[t] !== null && obj[t] !== undefined
			}).sort()

		} else {
			obja = Object.keys(obj).filter(t => {
				return obj[t] !== '' && obj[t] !== null && obj[t] !== undefined
			})
		}
		obja.forEach(k => {
			if (typeof obj[k] == 'object' && !Array.isArray(obj[k])) {
				sortIn(obj[k], 'object')
			} else if (Array.isArray(obj[k])) {
				sortIn(obj[k], 'Array')
			} else {
				str += `${k}=${obj[k]}&`
			}
		})
	}

	sortIn(params)
	return str
}


// 此vm参数为页面的实例，可以通过它引用vuex中的变量
module.exports = (vm) => {
	// 初始化请求配置
	uni.$u.http.setConfig((config) => {
		// #ifdef MP-WEIXIN || APP
		config.baseURL = configURl.baseUrl;
		// #endif
		// #ifdef H5 
		config.baseURL = '';
		// #endif
		return config
	})

	// 请求拦截
	uni.$u.http.interceptors.request.use((config) => { // 可使用async await 做异步操作
		// 初始化请求拦截器时，会执行此方法，此时data为undefined，赋予默认{}
		config.data = sign(config.data || {})
		config.header['Content-Type'] = 'application/json'
		// 根据custom参数中配置的是否需要token，添加对应的请求头
		const code = uni.getStorageSync('mall_code')
		// #ifdef MP-WEIXIN  || APP
		if (uni.getStorageSync('mall_token')) {
			config.header['Authorization'] = uni.getStorageSync('mall_token')
		}
		// #endif

		// H5 支持多商户登录
		// #ifdef H5
		if (uni.getStorageSync(code + '_token')) {
			config.header['Authorization'] = uni.getStorageSync(code + '_token')
		}
		// #endif
		return config
	}, config => {
		return Promise.reject(config)
	})

	// 响应拦截
	uni.$u.http.interceptors.response.use((response) => {
		var pages = getCurrentPages();
		var pageRoute = '';
		if (pages && pages.length > 0) {
			pageRoute = pages[pages.length - 1].route || ''; //获取当前路由
		}

		const data = response.data
		// 2 令牌错误或过期
		// 3 验签失败
		// 6 未登录
		// 7 商户异常

		if (data.code == 7) { // code 错误或已过期 空

			uni.removeStorageSync('mall_code')
			uni.showToast({
				title: data.msg,
				icon: "none"
			});
			// #ifdef H5
			uni.reLaunch({
				url: '/pages/comm/404',
			});
			// #endif
			// #ifdef MP-WEIXIN   || APP
			uni.reLaunch({
				url: '/pages/tabbar/tabbar',
			});
			// #endif


		} else if (data.code == 2 || data.code == 6) {
			// #ifdef MP-WEIXIN	  || APP		
			store.commit('SET_TOKEN', '');
			uni.setStorageSync('mall_token', '')
			uni.setStorageSync('tabbarKey', 'home')
			store.commit('SET_TabbarKey', 'home');
			uni.removeStorageSync('mall_authInfo')
			// #endif
			// #ifdef H5 
			uni.removeStorageSync(uni.getStorageSync('mall_code') + '_token')
			// #endif
			store.commit('SET_TabbarKey', 'home')
			uni.setStorageSync('tabbarKey', 'home')
			uni.showToast({
				title: data.msg,
				icon: "none"
			});
			uni.navigateTo({
				url: '/pages/login/index',
			});
		} else if (data.code !== 0) {
			uni.showToast({
				title: data.msg,
				icon: 'none',
			})
		}
		return data === undefined ? {} : data
	}, (error) => {
		if (error.statusCode == 404 || error.statusCode == 500) {
			uni.showToast({
				title: "Status:" + error.statusCode + "，服务器异常！",
				icon: 'none',
			})
			uni.redirectTo({
				url: "pages/comm/404?type=noNet",
			});
		} else if (error.statusCode == 401) {
			uni.showToast({
				title: "Status:" + error.statusCode + "，无权限访问！",
				icon: "none"
			});
			if (pageRoute !== 'pages/login/login') {}
		} else {
			uni.showToast({
				title: error.data.msg || error.data.message || "Status:" + error.statusCode,
				icon: "none"
			});
		}
		return Promise.reject(error)
	})
}
