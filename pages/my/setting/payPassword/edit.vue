<template>
	<view class="payPassword">
		<view class="height100vh bgfff">
			<view class="fbig">
				<view class="p-1">
					<view v-if="step == 1">
						<view class="p-1 f24 fw500">请输入旧密码</view>
						<view class="p-1 f1" >请输入原始旧密码，用以验证身份</view>
					</view>
					<view v-if="step == 2">
						<view class="p-1 f24 fw500">请输入新密码</view>
						<view class="p-1 f1" >请设置新的支付密码，用于支付验证</view>
					</view>
					<view v-if="step == 3">
						<view class="p-1 f24 fw500">再次输入密码</view>
						<view class="p-1 f1" >请再次输入支付密码，用以确认</view>
					</view>
					
					<view style="margin: 120rpx auto 0;">
						<view class="flex-row">
							<view class="numFont" v-for="(item, index) in 6" :key="index">
								<text>{{ (password[index] && '●') || '' }}</text></view>
								
						</view>
						<view class="text-c m-t-a-20">
							<view class="f12 colorReds" v-if="showError">{{ infoError }}</view>
						</view>
					</view>
				</view>
				
				<view class="shuruban">
					<view class="font999 text-c f14 m-20">
						<text @tap="goTo('forget')">忘记密码?</text>
					</view>
					<view class="viag">
						<view class="fsmall br10" v-for="(item, index) in num" :key="index"
							@tap="valChange(item)">{{ item }}</view>
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
				num: [1,2,3,4,5,6,7,8,9,0],
				password: '',
				orderid: '',
				orderInfo: '',
				step: 1,
				oldPass:'',
				newPass:'',
				newPass2:'',
			};
		},
		onLoad() {},
		onReady() {},
		onShow() {},
		created() {
			// this.num = this.num.sort((a, b) => {
			// 	return Math.random() - Math.random();
			// });
		},
		methods: {
			goTo(val) {
				if(val === 'forget'){
					uni.navigateTo({
						url: '/pages/my/setting/payPassword/forget'
					})
				}
			},
			valChange(val) {
				if (this.password.length < 5) {
					this.password = this.password + (val + '');
				} else if(this.password.length == 5) {
					this.password = this.password + (val + '');
					if(this.step === 1) {
						this.step += 1
						this.oldPass = JSON.parse(JSON.stringify(this.password))
						this.password = ''
					}else if(this.step === 2) {
						this.step += 1
						this.newPass = JSON.parse(JSON.stringify(this.password))
						this.password = ''
					}else if(this.step === 3) {
						this.newPass2 = JSON.parse(JSON.stringify(this.password))
						if(this.newPass !== this.newPass2) {
							this.showError = true;
							this.infoError = '两次输入新密码不一致！';
							return
						}else {
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
				this.$api.userinfo.memberEditPayPwd.post({
					old_pay_pwd: this.oldPass,
					new_pay_pwd: this.newPass2,
				}).then(res => {
					if (res.code == 0) {
						uni.showToast({
							title: '修改成功,即将跳转首页',
						});
						setTimeout(function() {
							uni.reLaunch({
								url: '/pages/tabbar/tabbar'
							});
						}, 1000);
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
