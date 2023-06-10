<template>
	<view>
		<view class="couponBox bgfff br10 width100 m-b-10" v-for="(item1,index) in orderList" :key="index">
			<view class="couContent">
				<view class="title f15 fw500">{{item1.title}}</view>
				<view class="itemBox">
					<view class="couponItem" v-for="(item2,aid) in item1.list" :key="aid" @tap="goto(item2)">
							<view class="bgPoint"></view>
						<img :src="item2._order_icon[0]" style="z-index:10" />
						<view class="text f12 c8585 line1">{{item2.app_name}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['orderList'],
		data() {
			return {

			}
		},
		mounted() {
			if (!uni.getStorageSync('user_latitude')) {
				this.$tool.getLocation()
			}
		},
		methods: {
			goto(val) {
				if (val.app_module == 'coupon') { //卡券
					uni.navigateTo({
						url: "/pages/my/orderList/coupon/orderList",
					});
				}  else if (val.is_target == 2) {
					if (val.jump_url) {
						uni.navigateTo({
							url: val.jump_url
						});
					} else { 
						uni.showToast({
							title: "该模块暂未开放",
							icon: "none",
						});
					}
					
				} else if (val.is_target == 1) {
						this.getAppUrl(val);
				} else {
					uni.showToast({
						title: "暂未开放",
						icon: "none"
					});
				}
			},
			getAppUrl(val) {
				let params = {
					aid: val.aid,
					product_type: val.app_module == "mtfx" ? 'mt_waimai' : '',
					latitude: val.app_module == "ddfx" ? uni.getStorageSync('user_latitude') : '',
					longitude: val.app_module == "ddfx" ? uni.getStorageSync('user_longitude') : '',
				}
				this.$api.thirdParty.jumpDealUrl.post(params).then((res) => {
					if (res.code == 0) {
						if (res.data.jump_url) {
							uni.navigateTo({
								url: "/pages/home/components/webView?url=" +
									encodeURIComponent(res.data.jump_url),
							});
						}
					}
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.couponBox {
		// margin-bottom: 20rpx;
		width: auto;
	}

	.couContent {
		padding: 34rpx 0 0 0;
	}

	.title {
		margin-left: 31rpx;
		margin-bottom: 33rpx;
	}

	.itemBox {
		display: flex;
		flex-wrap: wrap;
	}

	.itemBox:after {
		//空余占位
		content: "";
		width: 138rpx;
		height: 0;
		visibility: hidden;
	}

	.couponItem {
		margin-bottom: 34rpx;
		width: 138rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		position: relative;
	}

	.couponItem img {
		width: 44rpx;
		height: 44rpx;
		margin-bottom: 19rpx;
	}
</style>
