<template>
	<view class="payPassword">
		<view class="height100vh bgfff">
			<view class="fbig">
				<view class="p-1">
					<view v-if="step == 1">
						<view class="p-1 f24 fw500">设置支付密码</view>
						<view class="p-1 f1">请设置支付密码，用于支付验证</view>
					</view>
					<view v-if="step == 2">
						<view class="p-1 f24 fw500">再次输入密码</view>
						<view class="p-1 f1">请再次输入支付密码，用以确认</view>
					</view>

					<view style="margin: 120rpx auto 0;">
						<view class="flex-row">
							<view class="numFont" v-for="(item, index) in 6" :key="index">
								{{ (password[index] && '●') || '' }}
							</view>
						</view>
						<view class="text-c m-t-a-20">
							<view class="f12 colorReds" v-if="showError">{{ infoError }}</view>
						</view>
					</view>
				</view>
				<view class="shuruban">
					<view class="viag">
						<view class="fsmall br10" v-for="(item, index) in num" :key="index" @tap="valChange(item)">{{
						item }}</view>
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
				showError: false,
				infoError: '',
				num: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
				password: '',
				step: 1,
				oldPass: '',
				newPass: '',
				newPass2: '',
				orderType: '',
				paydata: {},
			};
		},
		onLoad: function(option) {
			this.orderType = option.type || '';
			this.paydata = JSON.parse(decodeURIComponent(option.info)) || {};
		},
		onReady() {},
		onShow() {},
		created() {
			// this.num = this.num.sort((a, b) => {
			// 	return Math.random() - Math.random();
			// });
		},
		methods: {
			valChange(val) {
				if (this.password.length < 5) {
					this.password = this.password + (val + '');
				} else if (this.password.length == 5) {
					this.password = this.password + (val + '');
					if (this.step === 1) {
						this.step += 1
						this.oldPass = JSON.parse(JSON.stringify(this.password))
						this.password = ''
					} else if (this.step === 2) {
						this.newPass = JSON.parse(JSON.stringify(this.password))
						if (this.oldPass !== this.newPass) {
							this.showError = true;
							this.infoError = '两次输入不相同，请再次输入！';
							return
						} else {
							this.showError = false;
							this.infoError = '';
							this.queding()
						}
					}
				}
			},
			backspace() {
				this.flag = false;
				this.password = this.password.slice(0, this.password.length - 1);
			},
			queding() {
				let _this = this;
				this.$api.userinfo.memberSetPayPwd.post({
					pay_pwd: this.oldPass,
				}).then(res => {
					if (res.code == 0) {
						_this.getAuthInfo() //更新密码状态
						if (_this.orderType) {
							uni.showToast({
								title: '设置成功,即将返回',
							});
							setTimeout(function() {
								uni.navigateBack({
									delta:1,
								})
							
							}, 1000);
						} else {
							uni.showToast({
								title: '设置成功,即将跳转首页',
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
			getAuthInfo() {
				let _this = this
				this.$api.common.authInfo.post({
					code: uni.getStorageSync('mall_code') || this.$tool.getCurCode()
				}).then(res => {
					if (res.code == 0) {
						_this.userInfo = res.data
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
