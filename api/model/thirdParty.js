const http = uni.$u.http
// 场景分销
export default {
	jumpDealUrl:{
		url: '/v1/terminal/mall/jumpDealUrl',
		name: "获取场景分销跳转链接",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	getOrderOne:{
		url: '/v1/terminal/mall/app/mtfx/getOrderOne',
		name: "美团分销收银台获取订单信息",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	meituan:{
		url: '/v1/terminal/mall/app/mtfx/orderPay',
		name: "美团分销收银台支付订单",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	getDdfxOrderOne:{
		url: '/v1/terminal/mall/app/ddfx/getOrderOne',
		name: "叮咚分销收银台获取订单信息",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	ddfx:{
		url: '/v1/terminal/mall/app/ddfx/orderPay',
		name: "叮咚分销收银台支付订单",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	getDyfxOrderOne:{
		url: '/v1/terminal/mall/app/moviefx/getOrderOne',
		name: "电影分销收银台获取订单信息",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	dyfx:{
		url: '/v1/terminal/mall/app/moviefx/orderPay',
		name: "电影分销收银台支付订单",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	supplyfxOrderOne:{
		url: '/v1/terminal/mall/app/supplyfx/getOrderOne',
		name: "实物分销收银台获取订单信息",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	supply:{
		url: '/v1/terminal/mall/app/supplyfx/orderPay',
		name: "实物分销收银台支付订单",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	yhfxOrderOne:{
		url: '/v1/terminal/mall/app/yhfx/getOrderOne',
		name: "永辉收银台获取订单信息",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	yhfx:{
		url: '/v1/terminal/mall/app/yhfx/orderPay',
		name: "永辉收银台支付订单",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	smfxOrderOne:{
		url: '/v1/terminal/mall/app/smfx/getOrderOne',
		name: "山姆分销收银台获取订单信息",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	smfx:{
		url: '/v1/terminal/mall/app/smfx/orderPay',
		name: "山姆分销收银台支付订单",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	slfxOrderOne:{
		url: '/v1/terminal/mall/app/slfx/getOrderOne',
		name: "商旅分销收银台获取订单信息",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	slfx:{
		url: '/v1/terminal/mall/app/slfx/orderPay',
		name: "商旅分销收银台支付订单",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	tyfxOrderOne:{
		url: '/v1/terminal/mall/app/tyfx/getOrderOne',
		name: "团油分销收银台获取订单信息",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	tyfx:{
		url: '/v1/terminal/mall/app/tyfx/orderPay',
		name: "团油分销收银台支付订单",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	hlfxOrderOne:{
		url: '/v1/terminal/mall/app/hlfx/getOrderOne',
		name: "海旅分销收银台获取订单信息",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	hlfx:{
		url: '/v1/terminal/mall/app/hlfx/orderPay',
		name: "海旅分销收银台支付订单",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},




	zfbhbOrderOne:{
		url: '/v1/terminal/mall/app/zfbhb/getOrderOne',
		name: "支付宝红包分销收银台获取订单信息",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	zfbhb:{
		url: '/v1/terminal/mall/app/zfbhb/orderPay',
		name: "支付宝红包分销收银台支付订单",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	hffxOrderOne:{
		url: '/v1/terminal/mall/app/hffx/getOrderOne',
		name: "话费分销收银台获取订单信息",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	hffx:{
		url: '/v1/terminal/mall/app/hffx/orderPay',
		name: "话费分销收银台支付订单",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	
	stfxOrderOne:{
		url: '/v1/terminal/mall/app/stfx/getOrderOne',
		name: "视听充值分销收银台获取订单信息",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	stfx:{
		url: '/v1/terminal/mall/app/stfx/orderPay',
		name: "视听充值分销收银台支付订单",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
}
