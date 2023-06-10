<template>
	<view class="hadTop">
		<view class="me">
			<view class="headImg">
				
				<img :src="baseUrl+'/storage/tksk_mall_img/user/morentx@2x.png'" style="width:120rpx">
				<view class="infoBox m-1">
					<view class="username fw500 f16">{{userInfo.nickname}}</view>
					<view class="f12" v-if="userInfo.phone">{{userInfo.phone.substr(0, 3) +
						"****" +
						userInfo.phone.substr(7)}}</view>
				</view>
				<view class="message" @tap="goTo('message')" >
					<!-- 消息列表 -->
					<i class="f18 csh icon icon-xiaoxiliebiao" ></i>
					<view class="redPoit br50 "> </view>
				</view>
				<!-- 设置图标 -->
				<view class="setting" @tap="setting">
					<i class="f18 csh icon icon-shezhi" ></i>

				</view>

			</view>
		</view>


	</view>
</template>

<script>
	export default {
		props: ['userInfo'],
		data() {
			return {
				baseUrl: this.$baseUrl,
				boxHid: false,
				phone: '',
				confirmText: '立即退出',
				cancelText: '再想想'
			};
		},
		created() {},
		methods: {

			goTo(type) {
				if (type === 'message') {
					// uni.navigateTo({
					// 	url: "/pages/tabBar/user/message/index",
					// });
					uni.showToast({
						title: "该模块暂未开放",
						icon: "none",
					});
				}
			},

			setting() {
				uni.navigateTo({
					url: "/pages/my/setting/index",
				});
			},
		},
	};
</script>

<style lang="scss" scoped>
	.hadTop {
		position: relative;

		.me {
			.headImg {
				position: relative;

				image {
					height: 120rpx;
					width: 120rpx;
					margin-right: 24rpx;
				}

				.infoBox {
					position: absolute;
					top: -6rpx;
					left: 130rpx;

					.username {
						margin-bottom: 19rpx;
					}
				}
			}

			.message {
				position: absolute;
				top: 40rpx;
				right: 60rpx;
				/* #ifdef MP-WEIXIN*/
				right: 90rpx;
				/* #endif */
				.redPoit {
					position: absolute;
					top: -4rpx;
					right: -2rpx;
					width: 16rpx;
					height: 16rpx;
					/* #ifdef H5*/
					top: 0rpx;
					/* #endif */
					background-color: #fd463c;
					border: 2rpx solid #ffffff;
				}
			}

			.setting {
				position: absolute;
				top: 40rpx;
				right: 0rpx;

			}
		}
	}
</style>
