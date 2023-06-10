
const http = uni.$u.http
export default {
	authorize: {
		url: '/v1/terminal/mall/authorize',
		name: "获取商户token",
		post: async function(data, config = {}) {
			return await http.post(this.url, data, config);
		}
	},

	getSmsCode: {
		url: '/v1/terminal/mall/getLoginCode',
		name: "发送手机验证码",
		post: async function(data, config = {}) {
			return await http.post(this.url, data, config);
		}
	},	
	getLoginVoice: {
		url: '/v1/terminal/mall/getLoginVoice',
		name: "发送登陆语音验证码",
		post: async function(data, config = {}) {
			return await http.post(this.url, data, config);
		}
	},
	getMallSmsCode: {
		url: '/v1/terminal/mall/getSmsCode',
		name: "发送手机验证码",
		post: async function(data, config = {}) {
			return await http.post(this.url, data, config);
		}
	},
	authLogin: {
		url: '/v1/terminal/mall/authLogin',
		name: "商户会员登陆",
		post: async function(data, config = {}) {
			return await http.post(this.url, data, config);
		}
	},
	authInfo: {
		url: '/v1/terminal/mall/authInfo',
		name: "获取商户会员信息",
		post: async function(data, config = {}) {
			return await http.post(this.url, data, config);
		}
	},
	cashierPay: {
		url: '/v1/terminal/mall/cashierPay',
		name: "商户会员收银台支付",
		post: async function(data, config = {}) {
			return await http.post(this.url, data, config);
		}
	},
	cashierPayStatus: {
		url: '/v1/terminal/mall/cashierPayStatus',
		name: "商户收银状态查询",
		post: async function(data, config = {}) {
			return await http.post(this.url, data, config);
		}
	},
	outLogin: {
		url: '/v1/terminal/mall/outLogin',
		name: "退出会员登录",
		post: async function(data, config = {}) {
			return await http.post(this.url, data, config);
		}
	},
	// 微信
	wechatOauth2Url: {
		url: '/v1/terminal/mall/wechatOauth2Url',
		name: "微信Oauth授权",
		post: async function(data, config = {}) {
			return await http.post(this.url, data, config);
		}
	},
	wechatJssdk: {
		url: '/v1/terminal/mall/wechatJssdk',
		name: "获取微信JSSDK",
		post: async function(data, config = {}) {
			return await http.post(this.url, data, config);
		}
	},
	wechatLogin: {
		url: '/v1/terminal/mall/wechatLogin',
		name: "微信登陆",
		post: async function(data, config = {}) {
			return await http.post(this.url, data, config);
		}
	},

}
