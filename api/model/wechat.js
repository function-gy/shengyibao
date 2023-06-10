const http = uni.$u.http
export default {
	wxappLogin:{
		url: '/v1/terminal/mall/wxappLogin',
		name: "微信小程序登陆",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	appid2Code:{
		url: '/v1/terminal/mall/appid2Code',
		name: "获取code授权凭证",
		get: async function(data, config = {}){
			return await http.get(this.url+'?appid='+data.appid, data, config);
		}
	},
}
