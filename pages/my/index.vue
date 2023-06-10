<template>
	<view style="height: calc(100vh - 15vw); overflow: auto;">
		<u-loading-page v-if="pageLoading" :loading="pageLoading" loading-text="加载中" color="var(--logincolor)"
			loading-color="var(--logincolor)" loading-mode="spinner" icon-size="36">
		</u-loading-page>
		<view class="user-center" v-else>
			<!-- 头部 带背景图片 区域 -->
			<view class="has-bgc">
				<!-- 头像 -->

				<UserTop :userInfo="userInfo"></UserTop>
				<!-- 积分 -->
				<jifen :userInfo="userInfo"></jifen>
				<!-- 大牌卡券，点击跳转 -->
				<dpkq v-if="showCards"></dpkq>
				<!--  #ifdef MP-WEIXIN -->
				<view style="height: 20rpx;" v-if="showCards"></view>
				<!--  #endif -->
				<!-- 订单 -->
				<order v-if="appList && appList.length" class="order" :appList="appList"></order>
			</view>
			<!-- 更多服务 -->
			<view class="no-bgc">
				<more class="moreServe"></more>
			</view>

		</view>

	</view>
</template>
<script>
	import UserTop from './components/userTop.vue';
	import jifen from './components/jifen.vue'
	import dpkq from './components/dpkq.vue'
	import order from './components/order.vue'
	import more from './components/more.vue'
	export default {
		components: {
			UserTop,
			jifen,
			dpkq,
			order,
			more
		},
		data() {
			return {
				userInfo: {},
				appList: [],
				showCards: false,
				pageLoading: false
			};
		},
		created() {
			this.getAuthInfo()
			this.appList = JSON.parse(uni.getStorageSync('mallAppList'))
			let arr = this.appList.map((item) => item.app_module)
			if (arr.includes('coupon')) {
				this.showCards = true;
			} else {
				this.showCards = false;
			}
		},
		methods: {
			getAuthInfo() {
				console.log('my-getAuthInfo')
				this.pageLoading = true;
				var _this = this
				this.$api.common.authInfo.post().then(res => {
					if (res.code == 0) {
						_this.userInfo = res.data
						// #ifdef MP-WEIXIN || APP
						uni.setStorage({
							key: 'mall_authInfo',
							data: res.data,
							success: function() {}
						});
						// #endif
						// #ifdef H5 
						uni.setStorage({
							key: this.$tool.setStorageLocKey('mall_authInfo'),
							data: res.data,
							success: function() {}
						});
						// #endif
					}
				})
				_this.pageLoading = false;
			},
		}
	};
</script>
<style scoped lang="scss">
	page {
		position: relative;
		background-color: #fff;
	}

	.user-center {
		background-color: #f8f8f8;
		height: 100%;
	}

	.has-bgc {
		/* #ifdef MP-WEIXIN || APP */
		background-image: url('https://shengyibao.tongkask.com/storage/tksk_mall_img/user/my-bg@2x.png');
		/* #endif */
		/* #ifdef H5 */
		background-image: url('/storage/tksk_mall_img/user/my-bg@2x.png');
		/* #endif */
		background-size: 100% 700rpx;
		padding: 54rpx 30rpx 0 30rpx;
	}

	.no-bgc {
		padding: 0rpx 30rpx 0 30rpx;
	}

	/* #ifdef MP-WEIXIN || APP*/
	.no-bgc {
		padding: 20rpx 30rpx 0 30rpx;
	}

	/* #endif */
	.order {
		margin-top: 20rpx;
	}

	.moreServe {

		margin-top: 20rpx;
	}
</style>
