<template>
	<u-loading-page v-if="pageLoading" :loading="pageLoading" loading-text="加载中" color="var(--logincolor)"
		loading-color="var(--logincolor)" loading-mode="spinner" icon-size="36">
	</u-loading-page>
	<view v-else :style="myStyle" class="bgf8 height100">
		<view class=" payCheckstand" v-if="orderInfo.order_id">
			<view class="orderBox br10 bgfff p-10 m-lr-15 text-c c333" style="margin-bottom: 20rpx;">
				<view class="f12 c333">待支付</view>
				<view class="f15">
					<text class="font-fw" style="font-size: 80rpx;">{{orderInfo.total_fee}}</text>
					<text>{{$tool.getMoneyUnit()}}</text>
				</view>
				<view v-if="orderInfo.rate" class="rate f12 text-c m-1">(含{{orderInfo.rate}}%手续费)</view>
				<view v-if="orderInfo.order_no && !isInner" class="f12 m-1">
					订单信息-{{options[action-1]}}-{{orderInfo.order_no}}
				</view>
				<view v-if="orderInfo.order_sn && isInner" class="f12 m-1">
					订单信息-{{orderInfo.order_type}}-{{orderInfo.order_sn}}
				</view>
			</view>
			<view class="typeBox br10 bgfff p-10 m-lr-15">
				<u-radio-group v-model="pay_type" placement="column" iconPlacement="right">
					<view class="flex-space-between m-tb-10" style="line-height: 48rpx;height: 48rpx;">
						<view>
							<img class="m-r-5" :src="baseUrl+'/storage/tksk_mall_img/app/zf-ye@2x.png'"
								style="width:48rpx;height: 48rpx;vertical-align: text-bottom;" />
							<text class="f15" style="vertical-align: text-bottom;">{{$tool.getMoneyUnit()}}支付</text>
						</view>
						<view v-if="modalShow" class="f9"
							style="padding: 6rpx 20rpx;background: #FFF1EC;border-radius: 14px;color: #FF7544;">
							余额不足
						</view>
						<u-radio v-else activeColor="var(--logincolor)" name="pay"></u-radio>
					</view>
					<view class="" v-if="modalShow">
						当前余额 <text class="rate m-lr-5">{{balance}}</text> {{$tool.getMoneyUnit()}}
					</view>

				</u-radio-group>
			</view>

			<view class="bottom-box br-tl-tr-10">
				<view v-if="orderInfo.order_id && !modalShow" class="primybtn" @click="pay"><text>确认支付</text></view>
				<view v-if="orderInfo.order_id && modalShow" class="primybtn" @click="goToRecharge()">
					<text>{{$tool.getMoneyUnit()}}充值</text>
				</view>
				<view v-if="!orderInfo.order_id" class="dis-btn"><text>确认支付</text></view>
			</view>
		</view>
		<view v-else class="f16 text-c height100">
			<view class="p-15">
				订单获取失败
			</view>
			<view class="bottom-box br-tl-tr-10">
				<view class="primybtn" @click="goHome()"><text>返回首页</text></view>
			</view>

		</view>
		<!-- 支付密码 -->
		<PayPassword v-if="showPay" :orderInfo="orderInfo" @closePay="closePay"></PayPassword>
	</view>
</template>
<script>
	import PayPassword from '../payPassword/index.vue';
	export default {
		components: {
			PayPassword
		},
		data() {
			return {
				baseUrl: this.$baseUrl,
				userInfo: {},
				orderInfo: {},
				isInner: false, //是内部应用
				action: 1,
				order_id: '',
				options: ['美团', '叮咚', '电影', '通卡实物商城', '永辉', '山姆', '商旅', '团油', '海旅','支付宝红包','话费','视听充值'],
				oldOptions: [],
				balance: 0,
				modalShow: false,
				pay_type: 'pay',
				pageLoading: false,
				showPay: false
			};

		},
		computed: {
			myStyle() {
				return this.$store.state.myStyle;
			},
		},
		watch: {},
		// 页面轮动到底部
		onReachBottom() {},

		onLoad: function(options) {
			this.oldOptions = JSON.parse(JSON.stringify(options))
			if (options.type && (options.type == 'coupon')) {
				this.isInner = true
				this.orderInfo = options
				this.getAuthInfo()
			} else {
				this.isInner = false
				if (options.action && options.orderNo && options.tradeNo) {
					this.orderInfo.order_no = options.orderNo;
					this.orderInfo.trade_no = options.tradeNo;
					this.action = options.action
					this.pageLoading = true;
					if (this.action == 1) {
						this.getMtOrder(options.orderNo, options.tradeNo);
					} else if (this.action == 2) {
						this.getDdOrder(options.orderNo, options.tradeNo)
					} else if (this.action == 3) {
						this.getDyOrder(options.orderNo, options.tradeNo)
					} else if (this.action == 4) {
						this.getSupplyOrder(options.orderNo, options.tradeNo)
					} else if (this.action == 5) {
						this.getYhOrder(options.orderNo, options.tradeNo)
					} else if (this.action == 6) {
						this.getSmOrder(options.orderNo, options.tradeNo)
					} else if (this.action == 7) {
						this.getSlOrder(options.orderNo, options.tradeNo)
					} else if (this.action == 8) {
						this.getTyOrder(options.orderNo, options.tradeNo)
					} else if (this.action == 9) {
						this.getHlOrder(options.orderNo, options.tradeNo)
					} else if (this.action == 10) {
						this.getzfbhbOrder(options.orderNo, options.tradeNo)
					}else if(this.action == 11 ) {
						this.getHfOrder(options.orderNo, options.tradeNo)
					}else if(this.action == 12 ) {
						this.getStOrder(options.orderNo, options.tradeNo)
					}
				}
			}
		},
		created() {
			if (this.$tool.getStorageLocCode('mall_authInfo') && this.$tool.getStorageLocCode('mall_authInfo').banalce) {
				this.balance = Number(this.$tool.getStorageLocCode('mall_authInfo').banalce)
			}
		},
		mounted() {},
		methods: {
			closePay() {
				this.showPay = false
			},
			getAuthInfo() {
				let _this = this
				this.$api.common.authInfo.post({
					code: uni.getStorageSync('mall_code') || this.$tool.getCurCode()
				}).then(res => {
					if (res.code == 0) {
						// #ifdef MP-WEIXIN|| APP
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
						_this.userInfo = res.data;
						_this.banalce = Number(res.data.banalce)
						if (_this.orderInfo.total_fee && Number(_this.orderInfo.total_fee) > _this.banalce) {
							_this.modalShow = true
						} else {
							_this.modalShow = false
						}
					}
				})
			},
			goHome() {
				this.$store.commit('SET_TabbarKey', 'home')
				uni.setStorageSync('tabbarKey', 'home')
				uni.reLaunch({
					url: '/pages/tabbar/tabbar'
				});
			},
			goToRecharge() {
				this.$store.commit('SET_total_fee', this.orderInfo.total_fee);
			
				// #ifdef H5 
				var returnUrl = `${document.location.protocol}//${window.location.host}` +
					'/mall/mall.html#/pages/comm/payCheckstand/index'
				// #endif
				// #ifdef MP-WEIXIN ||APP
				var returnUrl = '/pages/comm/payCheckstand/index'
				// #endif

				if (this.isInner) {
					 if (this.orderInfo.type === 'coupon') {
						returnUrl = returnUrl + '?type=coupon' +
							'&order_id=' + this.orderInfo.order_id +
							'&total_fee=' + Number(this.orderInfo.total_fee) +
							'&order_sn=' + this.orderInfo.order_sn +
							'&order_type=' + '大牌卡券' +
							'&info=' + this.orderInfo.info
					}
				} else {
					returnUrl = returnUrl + '?action=' + this.oldOptions.action +
						'&appid=' + this.oldOptions.appid +
						'&nounce=' + this.oldOptions.nounce +
						'&orderNo=' + this.oldOptions.orderNo +
						'&signature=' + this.oldOptions.signature +
						'&tradeNo=' + this.oldOptions.tradeNo
				}

				uni.navigateTo({
					url: '/pages/comm/payRecharge/index?oldUrl=' + encodeURIComponent(returnUrl)
				});
			},
			async getzfbhbOrder(orderNo, tradeNo) {
				let params = {
					order_no: orderNo,
					trade_no: tradeNo
				}
				var that = this
				await this.$api.thirdParty.zfbhbOrderOne.post(params).then(res => {
					if (res.code == 0) {
						that.orderInfo = {
							order_no: that.orderInfo.order_no,
							trade_no: that.orderInfo.trade_no || '',
							order_id: res.data.order_id || '',
							rate: res.data.rate || '',
							total_fee: res.data.total_fee || '',
							return_url: res.data.detail_url || res.data.detail_page_url,
							type: 'zfbhb'
						}
						that.getAuthInfo()
					}
					that.pageLoading = false;
				});
			},
			async getSlOrder(orderNo, tradeNo) {
				let params = {
					order_no: orderNo,
					trade_no: tradeNo
				}
				var that = this
				await this.$api.thirdParty.slfxOrderOne.post(params).then(res => {
					if (res.code == 0) {
						that.orderInfo = {
							order_no: that.orderInfo.order_no,
							trade_no: that.orderInfo.trade_no || '',
							order_id: res.data.order_id || '',
							rate: res.data.rate || '',
							total_fee: res.data.total_fee || '',
							return_url: res.data.result_page_url || res.data.detail_page_url,
							type: 'slfx'
						}
						that.getAuthInfo()
					}
					that.pageLoading = false;
				});
			},
			async getHfOrder(orderNo, tradeNo) {
				let params = {
					order_no: orderNo,
					trade_no: tradeNo
				}
				var that = this
				await this.$api.thirdParty.hffxOrderOne.post(params).then(res => {
					if (res.code == 0) {
						that.orderInfo = {
							order_no: that.orderInfo.order_no,
							trade_no: that.orderInfo.trade_no || '',
							order_id: res.data.order_id || '',
							rate: res.data.rate || '',
							total_fee: res.data.total_fee || '',
							return_url: res.data.detail_url,
							type: 'hffx'
						}
						that.getAuthInfo()
					}
					that.pageLoading = false;
				});
			},
			async getHlOrder(orderNo, tradeNo) {
				let params = {
					order_no: orderNo,
					trade_no: tradeNo
				}
				var that = this
				await this.$api.thirdParty.hlfxOrderOne.post(params).then(res => {
					if (res.code == 0) {
						that.orderInfo = {
							order_no: that.orderInfo.order_no,
							trade_no: that.orderInfo.trade_no || '',
							order_id: res.data.order_id || '',
							rate: res.data.rate || '',
							total_fee: res.data.total_fee || '',
							return_url: res.data.detail_url || res.data.detail_page_url,
							type: 'hlfx'
						}
						that.getAuthInfo()
					}
					that.pageLoading = false;
				});
			},
			async getTyOrder(orderNo, tradeNo) {
				let params = {
					order_no: orderNo,
					trade_no: tradeNo
				}
				var that = this
				await this.$api.thirdParty.tyfxOrderOne.post(params).then(res => {
					if (res.code == 0) {
						that.orderInfo = {
							order_no: that.orderInfo.order_no,
							trade_no: that.orderInfo.trade_no || '',
							order_id: res.data.order_id || '',
							rate: res.data.rate || '',
							total_fee: res.data.total_fee || '',
							return_url: res.data.detail_url || '',
							type: 'tyfx'
						}
						that.getAuthInfo()
					}
					that.pageLoading = false;
				});
			},
			async getSmOrder(orderNo, tradeNo) {
				let params = {
					order_no: orderNo,
					trade_no: tradeNo
				}
				var that = this
				await this.$api.thirdParty.smfxOrderOne.post(params).then(res => {
					if (res.code == 0) {
						that.orderInfo = {
							order_no: that.orderInfo.order_no,
							trade_no: that.orderInfo.trade_no || '',
							order_id: res.data.order_id || '',
							rate: res.data.rate || '',
							total_fee: res.data.total_fee || '',
							return_url: res.data.detail_url,
							type: 'smfx'
						}
						that.getAuthInfo()
					}
					that.pageLoading = false;
				});
			},
			async getYhOrder(orderNo, tradeNo) {
				let params = {
					order_no: orderNo,
					trade_no: tradeNo
				}
				var that = this
				await this.$api.thirdParty.yhfxOrderOne.post(params).then(res => {
					if (res.code == 0) {
						that.orderInfo = {
							order_no: that.orderInfo.order_no,
							trade_no: that.orderInfo.trade_no || '',
							order_id: res.data.order_id || '',
							rate: res.data.rate || '',
							total_fee: res.data.total_fee || '',
							return_url: res.data.result_page_url || res.data.detail_page_url,
							type: 'yhfx'
						}
						that.getAuthInfo()
					}
					that.pageLoading = false;
				});
			},
			async getDyOrder(orderNo, tradeNo) {
				let params = {
					order_no: orderNo,
					trade_no: tradeNo
				}
				var that = this
				await this.$api.thirdParty.getDyfxOrderOne.post(params).then(res => {
					if (res.code == 0) {
						that.orderInfo = {
							order_no: that.orderInfo.order_no,
							trade_no: that.orderInfo.trade_no || '',
							order_id: res.data.order_id || '',
							rate: res.data.rate || '',
							total_fee: res.data.total_fee || '',
							return_url: res.data.detail_url || '',
							type: 'dyfx'
						}
						that.getAuthInfo()
					}
					that.pageLoading = false;
				});
			},
			async getMtOrder(orderNo, tradeNo) {
				let params = {
					order_no: orderNo,
					trade_no: tradeNo
				}
				var that = this
				await this.$api.thirdParty.getOrderOne.post(params).then(res => {
					if (res.code == 0) {
						that.orderInfo = {
							order_no: that.orderInfo.order_no,
							trade_no: that.orderInfo.trade_no || '',
							order_id: res.data.order_id || '',
							rate: res.data.rate || '',
							total_fee: res.data.total_fee || '',
							return_url: res.data.order.return_url,
							type: 'meituan'
						}
						that.getAuthInfo()
					}
					that.pageLoading = false;
				});
			},
			async getDdOrder(orderNo, tradeNo) {
				let params = {
					order_no: orderNo,
					trade_no: tradeNo
				}
				var that = this
				await this.$api.thirdParty.getDdfxOrderOne.post(params).then(res => {
					if (res.code == 0) {
						that.orderInfo = {
							order_no: that.orderInfo.order_no,
							trade_no: that.orderInfo.trade_no || '',
							order_id: res.data.order_id || '',
							rate: res.data.rate || '',
							total_fee: res.data.total_fee || '',
							return_url: res.data.result_page_url || res.data.detail_page_url,
							type: 'ddfx'
						}
						that.getAuthInfo()
					}
					that.pageLoading = false;
				});
			},
			async getSupplyOrder(orderNo, tradeNo) {
				let params = {
					order_no: orderNo,
					trade_no: tradeNo
				}
				var that = this
				await this.$api.thirdParty.supplyfxOrderOne.post(params).then(res => {
					if (res.code == 0) {
						that.orderInfo = {
							order_no: that.orderInfo.order_no,
							trade_no: that.orderInfo.trade_no || '',
							order_id: res.data.order_id || '',
							rate: res.data.rate || '',
							total_fee: res.data.total_fee || '',
							return_url: res.data.result_page_url || res.data.detail_page_url || '',
							type: 'supply'
						}
						that.getAuthInfo()
					}
					that.pageLoading = false;
				});
			},
			async getStOrder(orderNo, tradeNo) {
				let params = {
					order_no: orderNo,
					trade_no: tradeNo
				}
				var that = this
				await this.$api.thirdParty.stfxOrderOne.post(params).then(res => {
					if (res.code == 0) {
						that.orderInfo = {
							order_no: that.orderInfo.order_no,
							trade_no: that.orderInfo.trade_no || '',
							order_id: res.data.order_id || '',
							rate: res.data.rate || '',
							total_fee: res.data.total_fee || '',
							return_url: res.data.detail_url,
							type: 'stfx'
						}
						that.getAuthInfo()
					}
					that.pageLoading = false;
				});
			},

			pay() {
				this.userInfo = this.$tool.getStorageLocCode('mall_authInfo')
				if (!this.userInfo.is_pay) { //未设置
					uni.showToast({
						title: '请设置支付密码',
						icon: 'none',
						duration: 2000,
					});
					let _this = this;
					setTimeout(() => {
						uni.navigateTo({
							url: '/pages/tabBar/user/setting/payPassword/add?type=' + _this
								.orderInfo.type + '&info=' + encodeURIComponent(JSON
									.stringify(_this.orderInfo))
						});
					}, 500);
				} else {
					if (this.isInner) {
						this.showPay = true
					} else {
						if (this.action && this.orderInfo.order_id) {
							this.showPay = true
						} else {
							this.showPay = false
						}
					}
				}
			},
		}
	};
</script>
<style scoped lang="scss">
	.payCheckstand {
		padding-top: 20rpx;

		.rate {
			color: #D60606;
		}
	}

	.rate {
		color: #D60606;
	}


	.bottom-box {
		width: 100%;
		position: fixed;
		bottom: 0;
		padding: 24rpx;
		background-color: #fff;
	}
</style>
