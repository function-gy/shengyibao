<template>
	<view :style="myStyle">
		<view class='about'>
			<view class='logo'>
				<image :src="baseUrl+'/storage/tksk_mall_img/app/logo.png'"></image>
				<view>{{uni.getStorageSync('basetitle')}}</view>
			</view>
		</view>

		<button class="login" @click="getuserinfo">授权登录</button>
		<view class="zanbu" @click="back">返回首页</view>
		<view class="foot">
			<view class='copy'>{{about.name}}版权所有©</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

				baseUrl: this.$baseUrl,
				code: '',
				about: {
					name: '江苏通卡数字科技有限公司'
				},
				oldUrl: ''
			}
		},
		computed: {
			myStyle() {
				return this.$store.state.myStyle;
			},
		},
		onLoad(option) {
			if (option.oldUrl) {
				this.oldUrl = decodeURIComponent(option.oldUrl)
			} else {
				this.oldUrl = ''
			}
			this.wechatOauth2Url()
		},
		methods: {
			wechatOauth2Url() {
				var returnUrl = ''
				if (this.oldUrl) {
					returnUrl = this.oldUrl
				} else {
					this.$store.commit('SET_TabbarKey', 'my')
					uni.setStorageSync('tabbarKey', 'my')
					if (window.location.hostname == 'localhost') {
						returnUrl = 'https://shengyibao.tongkask.com/mall/mall.html#/pages/tabbar/tabbar'
					} else {
						returnUrl = `${document.location.protocol}//${window.location.host}` +
							'/mall/mall.html#/pages/tabbar/tabbar'
					}
				}

				this.$api.common.wechatOauth2Url.post({
					url: returnUrl
				}).then(res => {
					if (res.code == 0 && res.data.url) {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							duration: 2000,
						});
						setTimeout(function() {
							uni.hideLoading()
						}, 1000);
						if (uni.getSystemInfoSync().platform == 'ios') {
							// var winRef = window.open(" ","_blank");   //先打开一个标签页
							// window.open(res.data.url,"_blank")
							uni.navigateTo({
								url: "/pages/home/components/webView?url=" +
									encodeURIComponent(res.data.url),
							});
						} else {
							window.open(res.data.url,"_blank")
							// uni.navigateTo({
							// 	url: "/pages/home/components/webView?url=" +
							// 		encodeURIComponent(res.data.url),
							// });
						}

					}
				})
			},
			back() {
				this.$store.commit('SET_TabbarKey', 'home')
				uni.setStorageSync('tabbarKey', 'home')
				uni.reLaunch({
					url: '/pages/tabbar/tabbar'
				});
			},
			getuserinfo() {
				this.wechatOauth2Url()
			}
		}
	}
</script>

<style>
	.about {
		padding: 120rpx 40rpx 0;
	}

	.about .logo image {
		display: block;
		width: 160rpx;
		height: 160rpx;
		margin: 0 auto 35rpx;
		border-radius: 30rpx;
	}

	.logo {
		text-align: center;
	}

	.about .logo view {
		font-size: 36rpx;
		color: #333;
	}

	.foot {
		position: fixed;
		left: 0;
		right: 0;
		text-align: center;
		bottom: 40rpx;
	}

	.login {
		width: 600rpx !important;
		height: 86rpx !important;
		line-height: 86rpx !important;
		background: linear-gradient(91deg, var(--logincolor-lighten-1), var(--logincolor));
		font-size: 32rpx;
		border-radius: 10rpx !important;
		border: none;
		color: #fff;
		margin: 0 auto !important;
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 514rpx;
	}

	.zanbu {
		font-size: 32rpx;
		color: #999999;
		/* margin: 45rpx 0 80rpx; */
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 436rpx;
	}

	.copy {
		font-size: 20rpx;
		color: #9b9b9b;
	}
</style>
