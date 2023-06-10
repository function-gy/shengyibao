<template>
	<view :style="myStyle">
		<view class="header">
			<h1>{{login_config.title}}</h1>
			<text>{{login_config.ftitle}}</text>
		</view>

		<!-- 账号密码输入框 -->
		<view class="form">
			<view class="flex-row p-1 m-20 " style="height: 80rpx;">
				<view :class="dltype=='phone'?'dltab':'dltabblack'" @click="dltype='phone'">
					<view style="position: absolute;width:100%;z-index: 99;">手机号登录</view>
					<view v-if="dltype=='phone'" class="fudong"></view>
					<!-- <view v-if="dltype=='phone'" class="fudong2"></view> -->
				</view>
				<view :class="dltype=='jfk'?'dltab':'dltabblack'" @click="dltype='jfk'">
					<view style="position: absolute;width:100%;z-index: 99;">礼品卡登录</view>
					<view v-if="dltype=='jfk'" class="fudong"></view>
					<!-- <view v-if="dltype=='jfk'" class="fudong2"></view> -->
				</view>
				<view class="flex-item"></view>
			</view>
			<view class="username" v-if="dltype=='jfk'">
				<input placeholder="请输入卡号" v-model.trim="form.card_sn" placeholder-style="color: #B7B6B6;" />
			</view>
			<view class="password" v-if="dltype=='jfk'">
				<input type="safe-password" :password="true" placeholder="请输入卡密" v-model.trim="form.card_secret"
					placeholder-style="color: #B7B6B6;" />
			</view>
			<view class="password">
				<input :maxlength="11" placeholder="请输入手机号" v-model.trim="form.phone"
					placeholder-style="color: #B7B6B6;" />
			</view>
			<view class="password">
				<input :maxlength="6" placeholder="请输入验证码" v-model.trim="form.sms_code"
					placeholder-style="color: #B7B6B6;" />
				<text style="color: var(--logincolor);"
					@tap="getCheckNum()">{{ !codeTime ? '获取验证码' : codeTime + 's' }}</text>
			</view>
			<view class="password2">
				收不到短信？<text @click="callPhone" style="color: var(--logincolor);">获取语音验证码</text>
			</view>
			<view :class="['dis-btn-this btn', { active: checked }]" @tap="dltype=='jfk'?jfdoLogin():doLogin()">登 录
			</view>
		</view>
		<!-- 条款 -->
		<view class="xieyi" v-if="login_config.remarkname">
			<view class="  flex-row aic">
				<view style="width: 35%; text-align: right; margin-right: 6rpx;" class="u-text-right">
					<i @click="checked=!checked" class="icon icon icon-xuanze colorPrimary f18 " v-if="checked"></i>
					<i @click="checked=!checked" class="icon icon icon-weixuan c999 f18" v-else></i>
				</view>
				<view class="flex-item f12 text-l"><text class="u-m-l-10">阅读并同意<text class="colorPrimary"
							@tap="goTo()">{{login_config.remarkname}}</text></text></view>
			</view>
		</view>
	</view>
</template>

<script>
	import colorTool from "@/util/color";
	export default {
		data() {
			return {
				flag: false,
				codeTime: 0,
				checked: "",
				disabled1: "",

				form: {
					isIntegralPay: '',
					card_sn: '',
					card_secret: '',
					phone: '',
					sms_code: ""
				},
				timer: null,
				dltype: 'phone'
			}
		},
		computed: {
			code() {
				return this.$store.state.code;
			},
			configthemp() {
				return this.$store.state.configthemp;
			},
			myStyle() {
				return this.$store.state.myStyle;
			},
			login_config() {
				if (this.$store.state.homeInfo) return JSON.parse(JSON.parse(this.$store.state.homeInfo).home_style
					.login_config);
			},
		},
		onUnload() {
			console.log('onUnload')
			uni.reLaunch({
				url: '/pages/tabbar/tabbar'
			});
		},
		methods: {
			callPhone() {
				// getLoginVoice
				if (!(/^[1][0-9]{10}$/.test(this.form.phone))) {
					uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
					return false;
				} else {
					this.form.phone = this.form.phone - 0
					//console.log(this.form);
					this.$api.common.getLoginVoice.post(this.form).then(res => {
						if (res.code == 0) {
							uni.showToast({
								title: res.msg,
								icon: "success"
							});
						} else {

						}
					})


				}
			},
			goTo() {
				uni.navigateTo({
					url: '/pages/login/contractInfo?name=' + this.login_config.remarkname,
				});
			},


			// 获取商户会员信息
			getAuthInfo() {
				this.$api.common.authInfo.post().then(res => {
					// #ifdef MP-WEIXIN	 || APP			
					if (res.code == 0) {
						uni.setStorage({
							key: 'mall_authInfo',
							data: res.data,
							success: function() {}
						});
					}
					// #endif
					// #ifdef H5
					if (res.code == 0) {
						uni.setStorage({
							key: this.$tool.setStorageLocKey('mall_authInfo'),
							data: res.data,
							success: function() {}
						});
					}
					// #endif
				})
			},
			// 验证码
			getCheckNum() {
				if (!(/^[1][0-9]{10}$/.test(this.form.phone))) {
					uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
					return false;
				} else {
					if (this.codeTime > 0) {
						uni.showToast({
							title: '不能重复获取',
							icon: "none"
						});
						return;
					} else {
						this.codeTime = 60
						this.timer = setInterval(() => {
							this.codeTime--;
							if (this.codeTime < 1) {
								clearInterval(this.timer);
								this.codeTime = 0
							}
						}, 1000)
						this.form.phone = this.form.phone - 0
						this.$api.common.getSmsCode.post(this.form).then(res => {
							if (res.code == 0) {
								uni.showToast({
									title: res.msg,
									icon: "success"
								});
							} else {
								clearInterval(this.timer);
								this.codeTime = 0
							}
						})

					}

				}

			},
			//礼品卡登录
			jfdoLogin() {
				console.log(11)
				uni.hideKeyboard();
				this.form.isIntegralPay = 1
				if (!this.form.card_sn || !this.form.card_secret) {
					uni.showToast({
						title: '卡号卡密不可为空',
						icon: "none"
					});
					return false;
				}
				//验证手机号码
				if (!(/^[1][0-9]{10}$/.test(this.form.phone))) {
					uni.showToast({
						title: '请填写正确手机号码',
						icon: "none"
					});
					return false;
				}
				if (!this.form.sms_code) {
					uni.showToast({
						title: '请填写验证码',
						icon: "none"
					});
					return false;
				}
				this.$api.common.authLogin.post(this.form).then(res => {
					// #ifdef MP-WEIXIN	|| APP						
					if (res.code == 0) {
						let token = res.data.token
						uni.setStorageSync('mall_token', token)
						uni.showToast({
							title: res.msg,
							icon: "success"
						});
						this.getAuthInfo(); //获取商户会员信息
						this.$store.commit('SET_TabbarKey', 'home');
						uni.setStorageSync('tabbarKey', 'home');
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/tabbar/tabbar'
							});
						}, 1000);
					}
					// #endif
					// #ifdef H5 
					if (res.code == 0) {
						let token = res.data.token
						uni.setStorageSync(this.$tool.setStorageLocKey('token'), token)
						uni.showToast({
							title: res.msg,
							icon: "success"
						});
						this.getAuthInfo(); //获取商户会员信息
						// this.$store.commit('SET_TabbarKey', 'home');								
						uni.setStorageSync(this.$tool.setStorageLocKey('tabbarKey'), 'home');
						setTimeout(function() {
							uni.navigateTo({
								url: '/pages/tabbar/tabbar'
							});
						}, 1000);
					}
					// #endif
				}).catch(res => {
					uni.showToast({
						title: res.msg,
						icon: "none"
					});
				})



			},

			// 登录
			doLogin() {
				uni.hideKeyboard();
				this.form.isIntegralPay = ''
				if (this.checked) {
					//验证手机号码
					if (!(/^[1][0-9]{10}$/.test(this.form.phone))) {
						uni.showToast({
							title: '请填写正确手机号码',
							icon: "none"
						});
						return false;
					} else if (!this.form.sms_code) {
						uni.showToast({
							title: '请填写验证码',
							icon: "none"
						});
						return false;
					} else {
						this.$api.common.authLogin.post(this.form).then(res => {
							// #ifdef MP-WEIXIN	|| APP						
							if (res.code == 0) {
								let token = res.data.token
								uni.setStorageSync('mall_token', token)
								uni.showToast({
									title: res.msg,
									icon: "success"
								});
								this.getAuthInfo(); //获取商户会员信息
								this.$store.commit('SET_TabbarKey', 'home');
								uni.setStorageSync('tabbarKey', 'home');
								setTimeout(function() {
									uni.navigateTo({
										url: '/pages/tabbar/tabbar'
									});
								}, 1000);
							}
							// #endif
							// #ifdef H5 
							if (res.code == 0) {
								let token = res.data.token
								uni.setStorageSync(this.$tool.setStorageLocKey('token'), token)
								uni.showToast({
									title: res.msg,
									icon: "success"
								});
								this.getAuthInfo(); //获取商户会员信息
								// this.$store.commit('SET_TabbarKey', 'home');								
								uni.setStorageSync(this.$tool.setStorageLocKey('tabbarKey'), 'home');
								setTimeout(function() {
									uni.navigateTo({
										url: '/pages/tabbar/tabbar'
									});
								}, 1000);
							}
							// #endif
						}).catch(res => {
							uni.showToast({
								title: res.msg,
								icon: "none"
							});
						})
					}

				} else {
					uni.showToast({
						title: '请先勾选阅读并同意',
						icon: "none"
					})
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: #fff;
		height: 100%;
	}

	.fudong {
	    width: 70%;
	    height: 15rpx;
	    background: linear-gradient(268deg,#feffb05e, var(--logincolor));
	    margin: auto;
	    border-radius: 40rpx;
	    position: absolute;
	    z-index: 1;
	    bottom: -5rpx;
	    left: 15%;
	}

	.fudong2 {
		width: 20rpx;
		height: 20rpx;
		background: linear-gradient(82deg, #ffffff, var(--logincolor-lighten-1));
		margin: auto;
		border-radius: 50%;
		position: absolute;
		z-index: 1;
		left: 0px;
		bottom: 0px;
	}

	.dltab {
		margin: 0 20rpx;
		font-size: 32rpx;
		color: #333;
		text-align: center;
		position: relative;
		width: 200rpx;

	}

	.dltabblack {
		margin: 0 20rpx;
		font-size: 32rpx;
		color: #999;
		text-align: center;
		position: relative;
		width: 200rpx;


	}

	.header {
		padding-top: 113rpx;
		margin-left: 60rpx;

		h1 {
			font-size: 50rpx;
			font-weight: 500;
			color: #353535;
			margin-bottom: 34rpx;
		}

		text {
			font-size: 28rpx;
			font-weight: 400;
			color: #353535;
		}
	}

	.form {
		margin-top: 89rpx;

		::v-deep.username,
		::v-deep.password {
			width: 646rpx;
			height: 98rpx;
			background: #F5F4F8;
			border-radius: 46px;
			margin: 0 auto;
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

		::v-deep.password2 {
			width: 646rpx;
			border-radius: 46px;
			margin: 0 auto;
			display: flex;
			padding-right: 39rpx;
			margin-top: 18rpx;
			font-size: 24rpx;
			padding-left: 40rpx;
		}

		::v-deep.password {
			margin-top: 38rpx;
		}
	}

	.btn {
		width: 646rpx;
		height: 98rpx;
		border-radius: 46rpx;
		margin: 0 auto;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 54rpx;
		font-size: 34rpx;
		color: #8A8A8A;
	}

	.xieyi {
		width: 100%;
		margin-top: 60rpx;
		text-align: center;


	}

	.colorPrimary {
		color: var(--logincolor);
	}


	.u-checkbox-group {
		display: inline-block;
	}

	.dis-btn-this.active {
		background: linear-gradient(91deg, var(--logincolor-lighten-1), var(--logincolor));
		box-shadow: 0rpx 10rpx 20rpx 0rpx var(--logincolor-lighten-1);
		color: #FFFFFF;
		opacity: 1;
		filter: alpha(opacity=100);
	}


	.dis-btn-this {
		background: linear-gradient(91deg, var(--logincolor-lighten-1), var(--logincolor));
		box-shadow: 0rpx 10rpx 20rpx 0rpx var(--logincolor-lighten-1);
		color: #FFFFFF;
		border-radius: 44rpx;
		padding: 25rpx;
		border: none;
		text-align: center;
		font-size: 32rpx;
		opacity: 0.6;
		filter: alpha(opacity=60);
	}
</style>
