<template>
	<view class="">
		<view class="m-b-10 " v-for="(item,index) in tableDate" :key="index">
			<view class="img width100" @tap="goTo(item)">
				<image class="width100" style="height: 100%;" :src="item.status == 1 ? item.long_grey_icon : item.long_colour_icon" ></image>
				<view class="imtxt f11 cfff" v-if="item.getcard_time">兑换时间：{{$tool.dateFormat(item.getcard_time*1000)}}</view>
				<!-- <view class="imtxt">卡券编号：{{item.code}}</view> -->
			</view>
			<view class="conText f15 flex-space-between aic p-lr-15">
				<view>
					{{Number(item.amount) +'元'}}{{item.brand_name}}{{item.coupon_name}}
					<text v-if="item.crc || item.url_pass" class="f12">（验证码：{{item.crc||item.url_pass}}）</text>
				</view>
				<view class="icon icon-gengduo" @tap="showSheet(item)"></view>
			</view>
		</view>
		<u-action-sheet :closeOnClickOverlay="true" :closeOnClickAction="true"
			:actions="selectData.status == 1?actionsList2:actionsList" cancelText="取消" @select="bindClick($event)"
			:show="show" @close="show = false"></u-action-sheet>

	</view>
</template>

<script>
	export default {
		props: ['tableDate'],
		data() {
			return {
				actionsList: [{
					name: '删除卡券'
				}],
				actionsList2: [{
					name: '恢复卡券'
				}],
				show: false,
				selectData: {}
			}
		},
		methods: {
			goTo(item) {
				if (item.status === 0) {
					uni.navigateTo({
						url: "/pages/app/coupon/couponInfo/index?id=" + item.id + '&sn=' + item.sn,
					});
				}
			},
			showSheet(item) {
				this.show = true
				this.selectData = item
			},
			bindClick(e) {
				// e.name === "删除卡券"
				this.$api.coupon.memberCouponChange.post({
					id: this.selectData.id,
					status: e.name === "删除卡券" ? 2 : 1
				}).then(res => {
					if (res.code === 0) {
						uni.showToast({
							icon: 'success',
							title: '操作成功'
						});
					}
					this.$emit("updateList", e.name === "删除卡券" ? 1 : 2);
				}).catch((res) => {
					uni.showToast({
						title: res.msg,
						icon: "none"
					});
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.hui {
		filter: grayscale(1)
	}

	.img {
		height: 208rpx;
		position: relative;
		background-color: #f5f4f9;
	}

	.imtxt {
		position: absolute;
		bottom: 20rpx;
		right: 22rpx;
		z-index: 2;
		opacity: 0.6;
	}

	.conText {
		height: 92rpx;
		background-color: #f5f4f9;
		border-radius: 0 0 20rpx 20rpx;
		position: relative;
	}
</style>
