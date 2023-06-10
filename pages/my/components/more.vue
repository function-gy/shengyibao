<template>
	<view>
		<view class="orderBox br10 bgfff width100">
			<view class="f15 fw500 " style="margin-bottom: 28rpx;">更多服务</view>

			<view class="listBox flex-space-between aic">

				<view class="item flex-space-between aic"  @click="goTo(1)">
					<view class="bgPoint bgPointSet"></view>
					<view class="img">
							<i class="icon iconfont icon--fuwu-xianxing f20 csh" ></i>
					</view>
					<view class="c8585  f11">消费指南 </view>
				</view>
				
				<view class="item flex-space-between aic" @click="goTo(2)">
					<view class="bgPoint bgPointSet"></view>
					<view class="img">
						<i class="icon iconfont icon-kefu f20 csh" ></i>
					</view>
					<view class="c8585  f11">联系客服 </view>
				</view>
				
				<view class="item flex-space-between aic" @click="goTo(3)">
					<view class="bgPoint bgPointSet"></view>
					<view class="img">
						<i class="icon iconfont icon-bangzhu1 f20 csh" ></i>
					</view>
					<view class="c8585  f11">帮助中心 </view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {

		data() {
			return {
				baseUrl: this.$baseUrl,
				imgDate: [{
						id: 1,
						imgUrl: "/static/images/user/list-xiaofei@3x.png",
						title: "消费指南"
					},
					{
						id: 2,
						imgUrl: "/static/images/user/list-kefu@3x.png",
						title: "联系客服"
					},
					{
						id: 3,
						imgUrl: "/static/images/user/list-help@3x.png",
						title: "帮助中心"
					}
				]
			}
		},
		methods: {
			goTo(val) {
				if (val == 3) {
					uni.navigateTo({
						url: "/pages/my/help/index",
					});
					// uni.showToast({
					// 	title: "暂未开放",
					// 	icon: "none"
					// });
				}else if (val == 2){
					uni.makePhoneCall({
						phoneNumber: "952529"
					});
				} else {
					uni.showToast({
						title: "暂未开放",
						icon: "none"
					});
				}

			}
		}
	}
</script>

<style scoped lang="scss">
	view,
	text {
		padding: 0;
		margin: 0;
	}

	.bgPointSet {
		 left: 46rpx;
		 top: -6rpx;
	}

	.orderBox {
		padding-top: 32rpx;
		padding-left: 25rpx;
		padding-right: 25rpx;
		height: 203rpx;

		.listBox {
			.item {
				position: relative;
				flex-direction: column;
				width: 138rpx;
			}
		}
	}

	.listBox:after {
		//空余占位
		content: "";
		width: 138rpx;
		height: 0;
		visibility: hidden;
	}
	.img {
		z-index: 10;
	}
</style>
