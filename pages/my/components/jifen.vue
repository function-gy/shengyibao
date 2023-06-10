<template>
	<view class="width100 flex-space-around aic" style="height: 170rpx;">
		<view class=" flex-column-center" style="width: 49%;" @tap="goTo('')">
			<view class="f24 fw500" style="text-align:center">{{foumartNum(userInfo.banalce||0)}}</view>
			<view class="f12" :style="userInfo.banalce != 0 ? 'text-align:center': 'margin-left:35%'">
				我的{{$tool.getMoneyUnit()}}
				<view @click.stop="goButton" class="goButton f11" v-if="userInfo.banalce==0">去充值</view>
			</view>
		</view>
		<!-- 分割线 -->
		<view class="bgdc" style="width: 2rpx;height: 82rpx;"></view>
		<view class=" flex-column-center aic" style="width: 49%; " @tap="goTo(2)">
			<view class="f24 fw500">{{foumartNum(userInfo.fee_total||0)}}</view>
			<view class=" f12">已消费{{$tool.getMoneyUnit()}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		props: ['userInfo'],
		data() {
			return {};
		},
		onLoad() {},
		onReady() {},
		onShow() {},
		methods: {
			foumartNum(val) {
				//0和整数
				let r = /^([0]|[1-9][0-9]*)$/;
				if (r.test(Number(val))) {
					return Number(val)
				} else {
					return Number(val).toFixed(2)
				};
			},
			goButton() {
				// #ifdef H5 
				var returnUrl = `${document.location.protocol}//${window.location.host}` +
					'/mall/mall.html#/pages/my/myIntegral/index'
				// #endif
				// #ifdef MP-WEIXIN	|| APP		
				var returnUrl = ""
				// #endif

				uni.navigateTo({
					url: '/pages/comm/payRecharge/index?oldUrl=' + encodeURIComponent(returnUrl)
				});
			},
			goTo(val) {
				uni.navigateTo({
					url: "/pages/my/myIntegral/index?mode=" + val,
				});
			}
		},
	};
</script>

<style scoped lang="scss">
	.goButton {
		display: inline-block;
		padding: 8rpx 12rpx;
		background: linear-gradient(66deg, var(--logincolor-lighten-1), var(--logincolor));
		// border-radius: 10rpx;
		border-radius: 54rpx;
		border-bottom-left-radius: 54rpx;
		color: #fff;
		opacity: 0.9;
	}
</style>
