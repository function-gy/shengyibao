const tool = {}
import moment from "moment";
import CryptoJS from 'crypto-js';
// 从数组中过滤对象
tool.filterObjArrToArr = function(val, data) {
	if (data && data.length > 0) {
		return data.map(function(item) {
			if (item && Object.prototype.hasOwnProperty.call(item, val)) {
				return item[val];
			}
		}).filter(item => {
			return item
		})
	} else {
		return [];
	}
}

tool.ucfirst = function(l1) {
	if (l1.length > 0) {
		var first = l1.substr(0, 1).toUpperCase()
		var spare = l1.substr(1, l1.length)
		return first + spare
	}
}
tool.getCurParam = function() {
	let routes = getCurrentPages(); // 获取当前打开过的页面路由数组
	if (routes && routes.length > 0) {
		let curParam = JSON.stringify(routes[routes.length - 1].options) === '{}' ? '{}' : routes[routes.length - 1]
			.options; //获取路由参数
		return curParam
	}
}

tool.getCurCode = function() {
	var params = /code=(.*)[#&]|code=(.*)$/g.exec(window.location.href)
	let mall_code = params[params.length - 1] === undefined ? params[params.length - 2] : params[params
		.length - 1]
	return mall_code
}

tool.getMoneyUnit = function() {
	if (tool.getStorageLocCode('mall_authInfo')) {
		let mall_authInfo = tool.getStorageLocCode('mall_authInfo')
		if (mall_authInfo && mall_authInfo.mch_info && mall_authInfo.mch_info.money_unit) {
			return mall_authInfo.mch_info.money_unit
		} else {
			return '积分'
		}
	} else {
		return '积分'
	}
}

tool.dateFormat = function(date, fmt = 'yyyy-MM-dd hh:mm:ss') {
	date = new Date(date);
	let o = {
		'M+': date.getMonth() + 1, //月份
		'd+': date.getDate(), //日
		'h+': date.getHours(), //小时
		'm+': date.getMinutes(), //分
		's+': date.getSeconds(), //秒
		'q+': Math.floor((date.getMonth() + 3) / 3), //季度
		S: date.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(
			RegExp.$1,
			(date.getFullYear() + '').substr(4 - RegExp.$1.length)
		);
	for (let k in o)
		if (new RegExp('(' + k + ')').test(fmt))
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
			);
	return fmt;
}
tool.subpoint = function(str, val) {
	//截取小数点前后，val=1 是小数点前
	let strs = String(str);
	if (val == 1) {
		return strs.substring(0, strs.indexOf("."));
	} else if (val == 2) {
		let indof = strs.indexOf(".");
		return strs.slice(indof + 1, indof + 3);
	}
}

/**
 * 数字转成汉字
 * @params num === 要转换的数字
 * @return 汉字
 * */
tool.toChinesNum = function(num) {
	let changeNum = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九']
	let unit = ['', '十', '百', '千', '万']
	num = parseInt(num)
	let getWan = (temp) => {
		let strArr = temp.toString().split('').reverse()
		let newNum = ''
		let newArr = []
		strArr.forEach((item, index) => {
			newArr.unshift(item === '0' ? changeNum[item] : changeNum[item] + unit[index])
		})
		let numArr = []
		newArr.forEach((m, n) => {
			if (m !== '零') numArr.push(n)
		})
		if (newArr.length > 1) {
			newArr.forEach((m, n) => {
				if (newArr[newArr.length - 1] === '零') {
					if (n <= numArr[numArr.length - 1]) {
						newNum += m
					}
				} else {
					newNum += m
				}
			})
		} else {
			newNum = newArr[0]
		}

		return newNum
	}
	let overWan = Math.floor(num / 10000)
	let noWan = num % 10000
	if (noWan.toString().length < 4) {
		noWan = '0' + noWan
	}
	return overWan ? getWan(overWan) + '万' + getWan(noWan) : getWan(num)
}


/**
 * 获取指定月份第一天和最后一天
 * @params month === 2022-09
 * @return obj{开始时间，结束时间}
 * */
tool.getMonthDate = function(month) {
	return {
		start_time: moment(month).startOf('month').format("YYYY-MM-DD"),
		end_time: moment(month).endOf('month').format("YYYY-MM-DD"),
	}
}
/**
 * 获取当前年月
 * @params
 * @return "2022-09"
 * */
tool.nowMonth = function() {
	let ym = moment().format("YYYY-MM")
	return ym
}
/**
 * 复制按钮
 * @params
 * @return "2022-09"
 * */
tool.copybtn = function(e) {
	var content = e.currentTarget.dataset.no;
	content = typeof content === 'string' ? content : content.toString()
	//#ifndef H5
	uni.setClipboardData({
		data: content,
		success: function() {
			uni.showToast({
				title: '复制成功!',
				duration: 2000
			});
		},
		fail: function() {
			uni.showToast({
				title: '复制失败,请重新尝试!',
				icon: "none",
				duration: 2000
			});
		}
	});
	//#endif

	// #ifdef H5
	if (!document.queryCommandSupported('copy')) {
		error('浏览器不支持')
	}
	let textarea = document.createElement("textarea")
	textarea.value = content
	textarea.readOnly = "readOnly"
	document.body.appendChild(textarea)
	textarea.select() // 选择对象
	textarea.setSelectionRange(0, content.length) //核心
	let result = document.execCommand("copy") // 执行浏览器复制命令
	if (result) {
		uni.showToast({
			title: '复制成功',
			duration: 2000
		});
	}
	textarea.remove()
	// #endif
}
/**
 * 监听网络状态
 * */
tool.startMonitoringNetWork = function() {
	uni.getNetworkType({
		success: function(res) {
			switch (res.networkType) {
				case 'none':
					// uni.showToast({
					//   title: '当前无网络，请检查您的网络连接',
					//   icon: 'none',
					//   duration: 2000,
					// })
					uni.redirectTo({
						url: "pages/comm/404?type=noNet",
					});
					break
				case '2g':
				case '3g':
				case '4g':
				case '5g':
					break
				case 'wifi':
					break
				default:
					break
			}
			// console.log('当前网络---', res.networkType)
		}
	});
}
/* 常用加解密 */
tool.crypto = {
	//MD5加密
	MD5(data) {
		return CryptoJS.MD5(data).toString()
	},
	//BASE64加解密
	BASE64: {
		encrypt(data) {
			return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(data))
		},
		decrypt(cipher) {
			return CryptoJS.enc.Base64.parse(cipher).toString(CryptoJS.enc.Utf8)
		}
	},
	//AES加解密
	AES: {
		encrypt(data, secretKey) {
			const result = CryptoJS.AES.encrypt(data, CryptoJS.enc.Utf8.parse(secretKey), {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			})
			return result.toString()
		},
		decrypt(cipher, secretKey) {
			const result = CryptoJS.AES.decrypt(cipher, CryptoJS.enc.Utf8.parse(secretKey), {
				mode: CryptoJS.mode.ECB,
				padding: CryptoJS.pad.Pkcs7
			})
			return CryptoJS.enc.Utf8.stringify(result);
		}
	}
}

/**
 * 获取当前地址经纬度对象
 * */
tool.getLocation = function() {

	console.log('getLocation')
	uni.getLocation({
		type: 'wgs84',
		isHighAccuracy: true,
		success: function(res) {
			console.log('getLocation', res)
			uni.setStorageSync('user_longitude', res.longitude.toString());
			uni.setStorageSync('user_latitude', res.latitude.toString());
		},
		fail: function(res) {
			console.log(res)
		}
	});
}

/**
 * 判断是在微信浏览器or普通浏览器
 * */
tool.isWeiXinBrowser = function() {
	//判断是否微信登陆
	var ua = window.navigator.userAgent.toLowerCase();
	if (ua.match(/MicroMessenger/i) == 'micromessenger') {
		return true; // 微信中打开
	} else {
		return false; // 普通浏览器中打开
	}
}

tool.orderStatusOption = function(val) {
	const obj = {
		1: "订单完成",
		2: "未支付",
		3: "已支付",
		4: "订单失败",
		5: "已取消",
		6: "已退款"
	}
	return obj[val] ?? ''
}

// 获取用户本地存储的相关信息   h5 多商户
tool.getStorageLocCode = function(val) {
	// #ifdef MP-WEIXIN	|| APP
	return uni.getStorageSync(val)
	// #endif
	// #ifdef H5
	const code = uni.getStorageSync('mall_code')
	return uni.getStorageSync(code + '_' + val)
	// #endif
}
// 存储用户本地存储的相关信息  h5 多商户 
tool.setStorageLocKey = function(key) {	
	// #ifdef H5
	const code = uni.getStorageSync('mall_code')
	return code + '_' + key
	// #endif
}

export default tool
