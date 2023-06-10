<template>
	<view>
		<view class="orderBox br10 bgfff width100">
			<view class="title f15 fw500">我的订单</view>

			<view class="listBox flex-space-between aic" v-if="appList && appList.length > 0">
				<view v-for="(item,index) in appList.slice(0,3)" :key="index" class="item flex-space-between aic"
					@click="toNav(item)">
					<view class="bgPoint bgPointSet"></view>
					<view class="img">
						<image :src="item._order_icon[0]" style="width: 44rpx; height: 44rpx" />
					</view>
					<view class="text f11 c8585 line1">{{item.app_name}}</view>
				</view>

				<view class="item flex-space-between aic" @click="toNav('more')">
					<view class="bgPoint bgPointSet"></view>
					<view class="img">
						<i class="f18 csh icon icon-detailsmore" ></i>
						</view>
					<view class="text f11 c8585">更多订单</view>
				</view>
			</view>
			<view class="emptyImg pcX text-c" v-else>
				<img :src="baseUrl+'/storage/tksk_mall_img/phoneCharge/none-shuju@3x.png'"/>
				<view class="f12 c9b9b">暂无数据</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ['appList'],
		data() {
			return {
				baseUrl: this.$baseUrl,
				homeRoleList: []
			};
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {},
		onPageScroll(e) {},
		onLoad() {},
		onReady() {},
		onShow() {},
		created() {
			this.homeRoleList = this.$tool.getStorageLocCode('homeRoleList')
		},
		methods: {
			toNav(val) {
				// console.log(val);
				if (val == 'more') {
					uni.navigateTo({
						url: "/pages/my/myAllDetail/index",
					});
				}else if (val.app_module == 'coupon') {
					uni.navigateTo({
						url: "/pages/my/orderList/coupon/orderList",
					});
				}  else if (val.is_target == 2) {
					if (val.jump_url) {
						uni.navigateTo({
							url: val.jump_url
						});
					} else{
						uni.showToast({
							title: "该模块暂未开放",
							icon: "none",
						});
					}
					
				} else if (val.is_target == 1) {
					if (val.aid) {
						this.getAppUrl(val);
					} else {
						uni.showToast({
							title: "该模块暂未开放",
							icon: "none",
						});
					}
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
					longitude: val.app_module == "moviefx" ? uni.getStorageSync('user_longitude') : '',
				}
				this.$api.thirdParty.jumpDealUrl.post(params).then((res) => {
					if (res.code == 0) {
						if (res.data.jump_url) {
							// window.open(res.data.jump_url, "_self");
							uni.navigateTo({
								url: "/pages/home/components/webView?url=" +
									encodeURIComponent(res.data.jump_url),
							});
						}
					}
				});
			},
		},
	};
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

		.title {
			margin-bottom: 28rpx;
		}

		.listBox {
			.item {
				position: relative;
				flex-direction: column;
				width: 138rpx;
			}
		}
		
		.emptyImg {
			margin-top: -20rpx;
			img {
			  width: 136rpx;
			}
		}
	}
	.img {
		z-index: 10;
	}
</style>
