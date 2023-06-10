<template>
	<view class="my-help-details">
		<view class="card-box bgfff m-b-10 br10" >
			<view class="f20 m-b-10 fw500">
				{{details.title}}
			</view> 
			<view class="f13" style="line-height: 1.6;">
				{{details.answer}}
			</view>
				
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				ishidden: true,
				details: {
					title: '忘记支付密码怎么办？',
					answer:'用户您好，忘记支付密码可以到【个人中心】-【设置】-【忘记支付密码】，通过手机号码发送验证码重新设置支付密码。如果未能解决，请您致电客服热线400-790-7999。',
				},
			};
		},
		onLoad() {},
		onReady() {},
		onShow() {},
		methods: {
			goTo(val) {
				//console.log(val);
				uni.navigateTo({
					url: '/pages/tabBar/user/help/details?id=' + val.id
				})
			}
		},
	};
</script>

<style scoped lang="scss">
	.my-help-details {
		padding: 20rpx 30rpx;
		.card-box {
			padding: 40rpx 30rpx;
		}
	}
</style>
