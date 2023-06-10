<template>

	<view :style="myStyle" v-if="loading" class="bgfff text-c"
		style="position: absolute; width: 100%; height: 100vh; top: 0; padding-top: 30vh;z-index: 9999">
		<!-- 	<u-loading-page :loading="loading" icon-size="36" loading-color="#ff0300" fontSize="16" color="#ff0300">
		</u-loading-page> -->
		<img :src="baseUrl+'/storage/tksk_mall_img/app/logo.png'" style="height: 120rpx; width: 120rpx;" />

		<view class="spinner text-c m-t-10">
			<view class="bounce1"></view>
			<view class="bounce2"></view>
			<view class="bounce3"></view>
			<view class="bounce4"></view>
		</view>
		<!-- <view class="f16  width100 text-c  m-t-10"  style="color:var(--logincolor)"></view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: this.$baseUrl,
				loading: null,
			};
		},
		computed: {
			myStyle() {
				return this.$store.state.myStyle;
			},
		},
		methods: {
			open() {
				this.loading = true
			},
			close() {
				this.loading = false
			}
		}
	};
</script>

<style scoped>
	.u-transition.u-fade-enter-to.u-fade-enter-active {
		z-index: 99 !important
	}

	.spinner {}

	.spinner>view {
		width: 25rpx;
		height: 25rpx;
		background-color: var(--logincolor);
		margin-left: 20rpx;
		border-radius: 50%;
		display: inline-block;
		-webkit-animation: bouncedelay 1.6s infinite ease-in-out;
		animation: bouncedelay 1.6s infinite ease-in-out;
		/* Prevent first frame from flickering when animation starts */
		-webkit-animation-fill-mode: both;
		animation-fill-mode: both;
	}

	.spinner .bounce1 {
		-webkit-animation-delay: -0.62s;
		animation-delay: -0.62;
	}

	.spinner .bounce2 {
		-webkit-animation-delay: -0.32s;
		animation-delay: -0.32s;
	}

	.spinner .bounce3 {
		-webkit-animation-delay: -0.16s;
		animation-delay: -0.16s;
	}

	@-webkit-keyframes bouncedelay {

		0%,
		80%,
		100% {
			-webkit-transform: scale(0.0)
		}

		40% {
			-webkit-transform: scale(1.0)
		}
	}

	@keyframes bouncedelay {

		0%,
		80%,
		100% {
			transform: scale(0.0);
			-webkit-transform: scale(0.0);
		}

		40% {
			transform: scale(1.0);
			-webkit-transform: scale(1.0);
		}
	}
</style>
