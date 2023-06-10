<template>
	<view class="payRecharge bgf8 height100" :style="myStyle">
		<!-- 		<u-navbar title="充值" @rightClick="rightClick" :autoBack="true">
		</u-navbar> -->
		<view class="br10 bgfff p-15 m-b-15 lh-2 f15">

			<text class="c999  m-r-10">{{$tool.getMoneyUnit()}}余额</text>
			<text class="fw  c333">{{balance}}</text>
			<text class="m-lr-5">{{$tool.getMoneyUnit()}}</text>
			<text class="cred f12">({{'1元=1'}}{{$tool.getMoneyUnit()}})</text>

		</view>
		<view class="br10 bgfff p-15 m-b-10">
			<view class="f15 c999 m-b-10">充值方式</view>
			<u-radio-group v-model="pay_type" v-if="items && items.length>0" placement="column" iconPlacement="right">
				<view class="flex-space-between  " style="line-height: 48rpx;height: 66rpx; "
					v-for="(item,index) in items" :key="index">
					<view class="">
						<text class="icon icon-weixin f22 m-r-10" :class="item.type" :style="{'color':item.color}">
						</text>

						<text class="f15" style="vertical-align: text-bottom;">{{item.name}}</text>

					</view>
					<u-radio activeColor="var(--logincolor)" :name="item.value"></u-radio>
				</view>
			</u-radio-group>
			<view class="text-c" v-else>
				<!-- <view class="text f18 cred">商户未设置支付配置</view> -->
			</view>
		</view>

		<view class="br10 bgfff p-15 m-b-15">
			<view class="">
				<view class="f15 c999 m-b-10" v-if="pay_type!='integral_pay'">充值金额</view>
				<view class="f15 c999 m-b-10" v-else>请输入卡号卡密</view>
				<view class="flex-row" v-if="pay_type!='integral_pay'">
					<u--input :class="pay_money ?'input-bottom input-bottom-hover': 'input-bottom'" type="digit"
						:placeholder="placeholder" v-model="pay_money">
						<template slot="prefix">
							<text style="font-weight: 700;color: #656565;">￥</text>
						</template>
						<template slot="suffix">
							<text style="font-weight: 700;color: #656565;">（元）</text>
						</template>
					</u--input>
				</view>
				<view v-else-if="pay_type=='integral_pay'">
					<view class="password">
						<input placeholder="请输入卡号" v-model.trim="jfkform.card_sn" placeholder-style="color: #B7B6B6;" />
					</view>
					<view class="password m-t-10">
						<input type="safe-password" :password="true" placeholder="请输入卡密"
							v-model.trim="jfkform.card_secret" placeholder-style="color: #B7B6B6;" />
					</view>
				</view>
			</view>
			<view class="flex-space-between  m-t-10">
				<view class="cinfo f12 ">
					<text v-if="pay_type=='integral_pay' ">该卡为一次性全额充值卡，操作后无法撤销</text>
					<text v-else>单笔充值金额须小于10000元</text>
				</view>
				<view class="f11" v-if="pay_type!='integral_pay'" style="color: #39b6ff;" @tap="showExplain = true">
					{{$tool.getMoneyUnit()}}购买说明
				</view>
			</view>
		</view>

		<view class="bottom-box" v-if="pay_type!='integral_pay'">
			<view v-if="pay_money>0 && pay_type" class="primybtn" @click="goPay"><text>立即充值</text></view>
			<view v-else class="dis-btn"><text>立即充值</text></view>
		</view>
		<view class="bottom-box" v-else>
			<view v-if="jfkform.card_sn&&jfkform.card_secret" class="primybtn" @click="gojifen"><text>立即充值</text></view>
			<view v-else class="dis-btn"><text>立即充值</text></view>
		</view>
		<u-modal :show="showExplain" :title="$tool.getMoneyUnit() + '购买说明'" confirmText="我知道了"
			@confirm="showExplain = false">
			<view class="slot-content f13 c333">
				<rich-text :nodes="contentExplain"></rich-text>
			</view>
		</u-modal>
		<u-modal :show="showConfirm" confirmText="确认支付" @confirm="shouquan" @cancel="showConfirm = false"
			:showCancelButton="true">
			<view class="f13 c333 text-c">
				<view class="title ">
					<img :src="baseUrl+'/storage/tksk_mall_img/app/warning@2x.png'"
						style="width:130rpx;height: 130rpx;" />
					<view class="f17 m-b-10">
						提示
					</view>
				</view>
				<view class="cinfo f12 lh-2">您确认进行账户充值操作，充值成功后
					会存入您的{{$tool.getMoneyUnit()}}账户，且无法退回</view>
			</view>
		</u-modal>
	</view>
</template>

<script>
	// #ifdef H5
	var jweixin = require("jweixin-module")
	// #endif
	export default {
		name: 'payRecharge',
		components: {},
		data() {
			return {
				baseUrl: this.$baseUrl,
				placeholder: '',
				pay_money: null,
				pay_type: 'wxmp_jsapi',
				balance: 0,
				isWeiXinBrowser: false,
				isChooseWXPay: false,
				oldUrl: '',
				items: [],
				showExplain: false,
				contentExplain: `1.您可通过微信进行账户余额充值，微信单笔订单充值金额须小于10000元，1元可兑换1` + this.$tool.getMoneyUnit() + `。
				<br>2.已充值` + this.$tool.getMoneyUnit() +
					`余额无法退回。<br>3.若因系统问题导致充值交易不成功，后台会按照原付款路径退回至原账户。<br>4.充值使用过程中出现任何问题，请拨打全国客服热线952529。`,
				showConfirm: false,
				payStatus: {}, //商户收银配置
				userinfo: {},
				weixinpaydata: null,
				jfkform: {
					card_sn: '',
					card_secret: "",
				}
			};
		},
		computed: {
			total_fee() {
				return this.$store.state.total_fee;
			},
			myStyle() {
				return this.$store.state.myStyle;
			},
		},
		onBackPress() {
			this.getAuthInfo()
			this.showConfirm = false
		},
		onLoad: function(option) {
			uni.setNavigationBarTitle({
				title: this.$tool.getMoneyUnit() + '充值'
			})
			if (option.oldUrl) {
				this.oldUrl = decodeURIComponent(option.oldUrl)
			} else {
				this.oldUrl = ''
			}
		},
		mounted() {
			// #ifdef H5 
			this.DataLoad()
			// #endif
			//小程序
			//#ifdef MP-WEIXIN || APP
			this.smallWechatLoad()
			// #endif
		},
		methods: {

			//判断授权
			shouquan() {
				// #ifdef H5  
				this.placeholderText(); //input框文字

				if (this.isWeiXinBrowser) {
					if (!this.userinfo.is_wxmp_login) {
						uni.showToast({
							title: '您的微信暂未授权，即将跳转微信授权页',
							icon: "none"
						});
						uni.navigateTo({
							url: '/pages/comm/getWeiXinUser/index?oldUrl=' + encodeURIComponent(
								window.location.href)
						})
					} else if (this.userinfo.is_wxmp_login) {
						this.wechatJssdk()
					}
					uni.hideToast();
					// this.payConfirm()
				} else {
					this.payConfirm()
				}
				// #endif
				//#ifdef MP-WEIXIN  || APP
				if (!this.userinfo.is_wxapp_login) {
					uni.showToast({
						title: '您的微信暂未授权，即将跳转微信授权页',
						icon: "none"
					});
					uni.navigateTo({
						url: '/pages/comm/wechatem'
					})
				} else {
					this.smallweixinPay()
				}
				// #endif
			},
			//小程序支付
			async smallweixinPay() {
				let params = {
					pay_type: this.pay_type,
					pay_money: this.pay_money,
					// return_url: this.oldUrl,
				}


				let _this = this
				const res = await this.$api.common.cashierPay.post(params)
				if (res.code == 0) {
					const paydata = res.data
					uni.requestPayment({
						provider: 'wxpay',
						timeStamp: paydata.timeStamp,
						nonceStr: paydata.nonceStr,
						package: paydata.package,
						signType: paydata.signType,
						paySign: paydata.paySign,
						success: function(res) {
							_this.showConfirm = false;
							uni.showToast({
								title: '充值成功',
								icon: "success"
							});
						},
						fail: function(err) {
							_this.showConfirm = false;
							uni.showToast({
								title: err.errMsg,
								icon: "error"
							});
						}
					});
				}
			},
			async smallWechatLoad() {
				let _this = this
				_this.payStatus = await this.getCashierPayStatus() //获取商户收银配置
				this.getAuthInfo()
				_this.items = [{
						type: 'icon-weixin',
						color: '#00c800',
						value: 'wxmp_jsapi',
						name: '微信支付'
					},
					{
						type: 'icon-jifenshangchengtubiao_jifenkachongzhi',
						color: '#ff002f',
						value: 'integral_pay',
						name: '礼品卡充值'
					}
				]
				console.log(_this.items)
			},
			async DataLoad() {
				this.getAuthInfo()
				let _this = this
				_this.payStatus = await this.getCashierPayStatus() //获取商户收银配置
				_this.isWeiXinBrowser = this.$tool.isWeiXinBrowser()
				if (_this.payStatus && _this.payStatus.wx_status == 1) {
					if (_this.isWeiXinBrowser) {
						_this.items = [{
								type: 'icon-weixin',
								color: '#00c800',
								value: 'wxmp_jsapi',
								name: '微信支付'
							},
							{
								type: 'icon-jifenshangchengtubiao_jifenkachongzhi',
								color: '#ff002f',
								value: 'integral_pay',
								name: '礼品卡充值'
							}
						]
						_this.pay_type = 'wxmp_jsapi'
					} else {
						_this.items = [{
								type: 'icon-weixin',
								color: '#00c800',
								value: 'wx_h5',
								name: '微信支付'
							},
							{
								type: 'icon-jifenshangchengtubiao_jifenkachongzhi',
								color: '#ff002f',
								value: 'integral_pay',
								name: '礼品卡充值'
							}
						]
						_this.pay_type = 'wx_h5'
					}
				} else {
					uni.showModal({
						title: '提示',
						content: '商户未设置支付配置',
						showCancel: false,
						success: function(res) {
							if (res.confirm) {
								uni.navigateBack()
							} else if (res.cancel) {
								uni.navigateBack()
							}
						}
					});
					_this.items = []
					_this.pay_type = ''
				}
			},
			cancel() {
				uni.showModal({
					title: '提示',
					content: '确定取消充值吗？',
					success: async suc => {
						if (suc.confirm) {
							window.history.go(-1);
							// history.back()
						} else if (suc.cancel) {
							// return true
						}
					}
				});
			},
			placeholderText() {
				if (this.total_fee != 0) {
					this.placeholder = "建议最低充值额" + (this.total_fee - this.balance).toFixed(2)
				} else {
					this.placeholder = "请输入充值金额"
				}
			},
			getCashierPayStatus() {
				let _this = this
				return new Promise(resolve => {
					this.$api.common.cashierPayStatus.post().then(res => {
						if (res.code == 0) {
							resolve(res.data)
						}
					})
				})

			},
			getAuthInfo() {
				let _this = this
				this.$api.common.authInfo.post({
					code: uni.getStorageSync('mall_code') || this.$tool.getCurCode()
				}).then(res => {
					if (res.code == 0) {
						console.log(res.data);
						// #ifdef MP-WEIXIN || APP
						uni.setStorage({
							key: 'mall_authInfo',
							data: res.data,
							success: function() {}
						});
						// #endif
						// #ifdef H5 
						uni.setStorage({
							key: this.$tool.setStorageLocKey('mall_authInfo'),
							data: res.data,
							success: function() {}
						});
						// #endif
						_this.userinfo = res.data
						_this.balance = res.data.banalce

					}
				})
			},
			rightClick() {
				var pages = getCurrentPages();
				if (pages && pages.length > 1) {
					uni.navigateBack({
						delta: 1,
					})
				} else {
					uni.reLaunch({
						url: '/pages/tabbar/tabbar'
					});
				}
			},

			// H5微信支付拉起
			wechatJssdk() {
				let _this = this
				var returnUrl = ''
				if (window.location.hostname == 'localhost') {
					returnUrl = 'https://shengyibao.tongkask.com/mall/mall.html#/pages/commpayRecharge/index'
				} else {
					returnUrl = `${document.location.protocol}//${window.location.host}` +
						'/mall/mall.html#/pages/comm/payRecharge/index'
				}

				this.$api.common.wechatJssdk.post({
					url: returnUrl
				}).then(res => {
					if (res.code == 0) {
						var rs = res.data;
						jweixin.config({ //微信配置
							debug: rs.debug,
							appId: rs.appId,
							timestamp: rs.timestamp,
							nonceStr: rs.nonceStr,
							signature: rs.signature,
							jsApiList: rs.jsApiList
						});

						jweixin.ready(() => {
							jweixin.checkJsApi({
								jsApiList: ['chooseWXPay'],
								success: res => {
									_this.isChooseWXPay = true //可以支付
								},
								fail: err => {
									//console.log('check api fail:', err)
								}
							})
						})
					}
				})
			},
			gojifen() {
				let params = {
					pay_type: this.pay_type,
					card_sn: this.jfkform.card_sn,
					card_secret: this.jfkform.card_secret,
				}
				this.$api.common.cashierPay.post(params).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '核销成功',
							icon: "success"
						});
						// #ifdef H5
						this.DataLoad()
						// #endif
						//小程序
						//#ifdef MP-WEIXIN || APP
						this.smallWechatLoad()
						// #endif
					}
				})
			},
			goPay() {
				this.showConfirm = true
			},
			payConfirm() {
				let params = {
					pay_type: this.pay_type,
					pay_money: this.pay_money,
					// return_url: this.oldUrl,
				}


				let _this = this
				this.$api.common.cashierPay.post(params).then(res => {
					if (res.code == 0) {
						// //console.log(res.data);
						if (res.data.mweb_url && this.pay_type === 'wx_h5') {
							window.open(res.data.mweb_url, "_self");
						} else if (this.pay_type === 'wxmp_jsapi' && this.isChooseWXPay) {
							jweixin.chooseWXPay({
								timestamp: res.data
									.timeStamp, // 支付签名时间戳，注意微信 jssdk 中的所有使用 timestamp 字段均为小写。但最新版的支付后台生成签名使用的 timeStamp 字段名需大写其中的 S 字符
								nonceStr: res.data.nonceStr, // 支付签名随机串，不长于 32 位
								package: res.data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
								signType: res.data.signType, // 微信支付V3的传入 RSA ,微信支付V2的传入格式与V2统一下单的签名格式保持一致
								paySign: res.data.paySign, // 支付签名
								success: function(rs) {
									uni.showToast({
										title: '支付成功~',
										icon: "none"
									});
									// //console.log('支付成功', rs);
									if (rs.errMsg === 'chooseWXPay:ok' || rs.errMsg ===
										'getBrandWCPayRequest:ok') {
										if (_this.oldUrl) {
											if (uni.getSystemInfoSync().platform == 'ios') {
												window.location.href = _this.oldUrl;
											} else {
												window.open(_this.oldUrl)
											}
										}
									} else {
										uni.showToast({
											title: rs.errMsg,
											icon: "none"
										});
									}
								},
								cancel: function(rs) {
									uni.showToast({
										title: '用户取消支付~',
										icon: "none"
									});
									//console.log('取消成功', rs);
								},
								fail: function(rs) {
									uni.showToast({
										title: '支付失败~',
										icon: "none"
									});
									//console.log('支付失败', rs);
								},
							});
							uni.hideToast();
						}

						_this.showConfirm = false
					}
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	.password {
		width: 646rpx;
		height: 98rpx;
		background: #F5F4F8;
		border-radius: 20rpx;
		display: flex;
		padding-right: 39rpx;

		input {
			width: 70%;
			height: 100%;
			margin-left: 39rpx;
		}

		text {
			font-size: 28rpx;
			line-height: 98rpx;
			color: var(--logincolor);
			float: right;
			text-align: end;
			display: inline-block;
			width: 180rpx;
			height: 26rpx;
		}

		.int1 {
			width: 85% !important;
		}
	}

	.payRecharge {
		// margin-top: 80rpx;
		padding: 30rpx;
	}

	.label {
		color: #9B9B9B;
		font-size: 32rpx;
		margin-right: 10px;
	}

	.content {
		color: #333333;
		font-size: 32rpx;
	}

	.u-input.input-bottom {
		border: 1px solid #F5F4F8 !important;
		background: #F5F4F8;
		margin-top: 30rpx;
		padding: 20rpx 30rpx !important;
		font-size: 32rpx;
	}

	.u-input.input-bottom-hover /deep/ {
		box-sizing: border-box;
		background: #F5F9FF;
		border: 1px solid #735AEE !important;

		.u-input__content .u-input__content__field-wrapper .uni-input-wrapper {
			color: #5242E8;
			font-size: 32rpx;
		}

	}

	.bottom-box {
		height: 88rpx;
		width: calc(100% - 60rpx);
		position: fixed;
		bottom: 30rpx;
	}
</style>
