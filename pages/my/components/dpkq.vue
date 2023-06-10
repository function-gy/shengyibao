<template>
	<view>
		<view class="dpakBox">


			<view class="imgBox width100">
				<img class="img" :src="baseUrl+'/storage/tksk_mall_img/user/bg-diwen@3x.png'" />
				<view class="title f14 cfff">
					<view class="icon icon-youhuiquan f12 m-r-10" style="display: inline-block;"></view>
					<text>大牌卡券</text>
				</view>
				<view class="tcon cfff f11">
					甄选海量权益产品，体验数字福利生活
				</view>
				<view class="btn bgfff flex-space-around br10 aic">
					<text @tap="goMyCoupon" class="f11 fw500 cdefult">我的卡包</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onload() {},

		data() {
			return {
				baseUrl: this.$baseUrl,
			}
		},
		methods: {
			goMyCoupon() {
				this.$store.commit('SET_TabbarKey', 'coupon');
			}
		}
	};
</script>

<style scoped lang="scss">
	.dpakBox {
		.imgBox {

			position: relative;
			background: linear-gradient(91deg, var(--logincolor-lighten-1), var(--logincolor));
			// background: url(@/static/images/user/bg-diwen@3x.png) no-repeat;
			background-size: 100% 116rpx;
			border-radius: 22rpx;
			height: 116rpx;

			.img {
				width: 100%;
			}

			.title {
				position: absolute;
				top: 20rpx;
				left: 36rpx;
			}

			.tcon {
				position: absolute;
				bottom: 26rpx;
				left: 8rpx;
				line-height: 20rpx;
			}

			.btn {
				position: absolute;
				top: 36rpx;
				right: 36rpx;
				width: 124rpx;
				height: 44rpx;
			}
		}
	}
</style>
