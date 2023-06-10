<template>
	<view class="payPassword" :style="myStyle">
		<view class="height100vh bgfff">
			<view class="fbig">
				<view class="p-1">
					<view v-if="step == 1">
						<view class="p-1 f24 fw500">请输入验证码</view>
						<view class="p-1 f1">
							即将发送验证码至绑定手机
							<text style="color: var(--logincolor);">
								{{userInfo.phone.substr(0, 3) + "****" + userInfo.phone.substr(7)}}</text>
						</view>
					</view>
					<view v-if="step == 2">
						<view class="p-1 f24 fw500">请输入新密码</view>
						<view class="p-1 f1">请设置新的支付密码，用于支付验证</view>
					</view>
					<view v-if="step == 3">
						<view class="p-1 f24 fw500">再次输入密码</view>
						<view class="p-1 f1">请再次输入支付密码，用以确认</view>
					</view>

					<view style="margin: 120rpx auto 0;">
						<view class="flex-row">
							<view class="numFont" v-for="(item, index) in 6" :key="index"
								:style="step===1?'line-height: 110rpx;':''">
								<text v-if="step===1">{{ password[index]  || '' }}</text>
								<text v-else>{{ (password[index] && '●') || '' }}</text>

							</view>
						</view>
						<view class="text-c m-t-a-20">
							<view class="f12 colorReds" v-if="showError">{{ infoError }}</view>
						</view>
					</view>
					<view class="text-r f1 m-t-35" v-if="step===1">
						<text style="color: var(--logincolor);"
							@tap="getCheckNum()">{{ !codeTime ? '获取验证码' : codeTime + 's' }}</text>
					</view>
				</view>
				<view class="shuruban">
					<view class="viag">
						<view class="fsmall br10" v-for="(item, index) in num" :key="index" @tap="valChange(item)">
							{{ item }}
						</view>
						<view class="fsmall shanchu br10" @tap="backspace()">
							<view class="icon icon-shanchu"></view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				userInfo: {},
				showError: false,
				infoError: '',
				num: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
				password: '',
				orderid: '',
				orderInfo: '',
				step: 1,
				oldPass: '',
				newPass: '',
				newPass2: '',
				codeTime: 0,
				timer: null,
				phoneKey: '' //验证码之后令牌
			};
		},
		onLoad() {},
		onReady() {},
		onShow() {},
		created() {
			this.userInfo = this.$tool.getStorageLocCode('mall_authInfo')
			// this.num = this.num.sort((a, b) => {
			// 	return Math.random() - Math.random();
			// });
		},
		computed: {
			myStyle() {
				return this.$store.state.myStyle;
			},
		},
		methods: {
			valChange(val) {
				if (this.password.length < 5) {
					this.password = this.password + (val + '');
				} else if (this.password.length == 5) {
					this.password = this.password + (val + '');
					if (this.step === 1) {
						// this.step += 1
						this.oldPass = JSON.parse(JSON.stringify(this.password)) //手机验证码
						this.queding(1)
						// this.password = ''
					} else if (this.step === 2) {
						this.step += 1
						this.newPass = JSON.parse(JSON.stringify(this.password))
						this.password = ''
					} else if (this.step === 3) {
						this.newPass2 = JSON.parse(JSON.stringify(this.password))
						if (this.newPass !== this.newPass2) {
							this.showError = true;
							this.infoError = '两次输入新密码不一致！';
							return
						} else {
							this.showError = false;
							this.infoError = '';
							this.queding(2)
						}

					}
				}
			},
			backspace() {
				this.flag = false;
				this.password = this.password.slice(0, this.password.length - 1);
			},
			getCheckNum() {
				if (!(/^[1][0-9]{10}$/.test(this.userInfo.phone))) {
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
						this.$api.common.getMallSmsCode.post({
							phone: this.userInfo.phone,
							action: 'mch_sms_memberSetPayPwd'
						}).then(res => {
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
			queding(step) {
				let data1 = {
					step: 1,
					sms_code: this.oldPass,
					phone: this.userInfo.phone,
				}
				let data2 = {
					step: 2,
					key: this.phoneKey,
					pay_pwd: this.newPass2,
				}
				this.$api.userinfo.memberForgetPayPwd.post(step === 1 ? data1 : data2).then(res => {
					if (res.code == 0) {
						if (step === 1) {
							this.phoneKey = res.data.key
							uni.showToast({
								title: '验证码验证成功',
							});
							this.password = ''
							this.step = 2
						} else if (step === 2) {
							uni.showToast({
								title: '修改成功,即将跳转首页',
							});
							setTimeout(function() {
								uni.reLaunch({
									url: '/pages/tabbar/tabbar'
								});
							}, 1000);
						}
					}
				})
			},
		},
	};
</script>

<style scoped lang="scss">
	page {
		background-color: #fff;
	}

	@import "./style.scss";
</style>
