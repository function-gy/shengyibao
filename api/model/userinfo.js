const http = uni.$u.http
export default {
	memberBalance:{
		url: '/v1/terminal/mall/memberBalance',
		name: "获取商户会员余额变动列表",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	memberSetPayPwd:{
		url: '/v1/terminal/mall/memberSetPayPwd',
		name: "商户会员初始支付密码",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	memberEditPayPwd:{
		url: '/v1/terminal/mall/memberEditPayPwd',
		name: "商户会员修改支付密码",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	memberForgetPayPwd:{
		url: '/v1/terminal/mall/memberForgetPayPwd',
		name: "商户会员忘记支付密码",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	getHomeArticleList:{
		url: '/v1/terminal/mall/getHomeArticleList',
		name: "个人中心的文章",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
}