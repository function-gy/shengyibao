const http = uni.$u.http
export default {
	homeInfo:{
		url: '/v1/terminal/mall/homeInfo',
		name: "首页信息",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	getArticleOne:{
		url: '/v1/terminal/mall/getArticleOne',
		name: "获取文章详情",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	getArticleList:{
		url: '/v1/terminal/mall/getArticleList',
		name: "获取文章列表",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	}
}
