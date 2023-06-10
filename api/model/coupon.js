const http = uni.$u.http
export default {
	couponHome:{
		url: '/v1/terminal/mall/app/coupon/couponHome',
		name: "获取大牌卡券首页",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	brandDetail:{
		url: '/v1/terminal/mall/app/coupon/couponBrandDetail',
		name: "获取品牌详情",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	couponDetail:{
		url: '/v1/terminal/mall/app/coupon/couponDetail',
		name: "获取卡券详情",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	createCouponOrder:{
		url: '/v1/terminal/mall/app/coupon/couponCreateOrder',
		name: "卡券下单",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	couponOrderPay:{
		url: '/v1/terminal/mall/app/coupon/couponOrderPay',
		name: "订单支付",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	memberCouponList:{
		url: '/v1/terminal/mall/app/coupon/memberCouponList',
		name: "获取商户会员卡券列表",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	memberCouponChange:{
		//status 1恢复 2删除
		url: '/v1/terminal/mall/app/coupon/memberCouponChange',
		name: "商户会员卡券删除/恢复",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	memberCouponGrab:{
		url: '/v1/terminal/mall/app/coupon/memberCouponGrab',
		name: "商户会员卡券核销页内容",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	memberCouponGetOff:{
		url: '/v1/terminal/mall/app/coupon/memberCouponGetOff',
		name: "商户会员卡券前端核销页内容",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	couponCleanOrder:{
		url: '/v1/terminal/mall/app/coupon/couponCleanOrder',
		name: "取消订单",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},

	memberCouponOrderList:{
		url: '/v1/terminal/mall/app/coupon/memberCouponOrderList',
		name: "获取商户会员大牌卡券订单列表",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	memberCouponOrderOne:{
		url: '/v1/terminal/mall/app/coupon/memberCouponOrderOne',
		name: "获取商户会员话费充值订单详情",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	},
	
	couponTotalMoney:{
		url: '/v1/terminal/mall/app/coupon/couponTotalMoney',
		name: "显示金额",
		post: async function(data, config = {}){
			return await http.post(this.url, data, config);
		}
	}
}