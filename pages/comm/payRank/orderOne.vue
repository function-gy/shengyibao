<!-- 详情页 -->
<template>
	<view class="detailBox">
		<view class="img pcX">
			<!-- <image :src="imgsrc" class="br50"></image> -->
			<img v-if="moneyType == 'coupon'" :src="imgsrc" class="br50"
				:class="orderStatus == 4 || orderStatus == 5 || orderStatus == 6 ? 'hui':'' " />
		</view>
		<view class="deConBox br10 bgfff pcX width100 p-lr-1" style="top: 56rpx">
			<view class="hdTop text-c">
				<view class="jf f28" style="font-weight: 500">
					<text v-show="orderStatus == 1 || orderStatus == 3|| orderStatus == 2 ">
						<text>-</text> {{ Number(paydata.total_fee) }}
					</text>
				</view>
				<view class="f12">{{ $tool.orderStatusOption(orderStatus)  }}</view>
			</view>
			<view class="content f1 p-b-10" v-if="moneyType == 'coupon'">
				<p v-for="(item, key2, index) in couponData" :key="index" class="flex-space-between">
					<text class="title c999" style="width: 220rpx">{{ key2 }}</text>
					<text class="text-r text-new-line">{{ item }}</text>
				</p>
			</view>
		</view>
		<view class="bottom-box br-tl-tr-10 pcX" v-if="orderStatus == 2">
			<view class="primybtn" @click="pay"><text>立即支付</text></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				baseUrl: this.$baseUrl,
			}
		},
		onLoad(options) {
			const item = JSON.parse(decodeURIComponent(options.item));
			console.log(item);
			this.searchId = item.searchId;
			this.imgsrc = item.imgsrc;
			this.moneyType = item.moneyType;
			this.navigationBarTitleText = item.TitleText;
			//动态设置标题
			uni.setNavigationBarTitle({
				title: this.navigationBarTitleText,
			});
		},
		created() {

		},
		mounted() {
			// 发起请求
		 if (this.moneyType == "coupon") {
				this.getCouponData();
			}
		},
		onUnload() {},
		methods: {
			pay() {
				if (this.moneyType == "coupon") {
					uni.navigateTo({
						url: '/pages/comm/payCheckstand/index?type=coupon' +
							'&order_id=' + this.paydata.id +
							'&total_fee=' + Number(this.paydata.total_fee) +
							'&order_sn=' + this.paydata.order_sn +
							'&order_type=' + '大牌卡券' +
							'&info=' + this.paydata.num + '张' + this.paydata.coupon_amount + '元面值' + this.paydata
							.brand_name + this.paydata.coupon_name
					});
				} 
			},
			getCouponData() {
				uni.showLoading({
					title: "加载中",
				});
				this.$api.coupon.memberCouponOrderOne
					.post({
						id: this.searchId,
					})
					.then((res) => {
						if (res.code === 0) {
							this.paydata = res.data;

							this.pay_money = res.data.pay_money;
							this.couponData = {
								"支付方式:": this.$tool.getMoneyUnit() + "支付",
								"品牌:": res.data.brand_name,
								"卡券名称:": res.data.coupon_name,
								"卡券面值:": Number(res.data.coupon_amount) + "元",
								"数量:": res.data.num,
								"订单创建时间:": res.data.create_time,
								// '订单状态': orderStatusOption(res.data.order_status),
								"订单支付时间:": res.data.pay_time,
								"订单编号:": res.data.order_sn,
								"订单总金额:": res.data.order_status == 1 || res.data.order_status == 3 ? Number(res
									.data.total_fee) + this.$tool.getMoneyUnit() : '',
							};
							if (res.data.pay_time == '') {
								Reflect.deleteProperty(this.couponData, "订单支付时间:")
							}
							if (res.data.order_status == 2 || res.data.order_status == 4 || res.data.order_status ==
								5 || res.data.order_status == 6) {
								Reflect.deleteProperty(this.couponData, "订单总金额:")
							}
							this.orderStatus = res.data.order_status;
						}
						uni.hideLoading();
					});
			},
		},
		data() {
			return {
				pay_money: "",
				navigationBarTitleText: "",
				searchId: "",
				imgsrc: "",
				moneyType: "",
				eventChannel: null,
				orderStatus: "",
				couponData: {}, //大牌卡券数据
				paydata: {},
			};
		},
	};
</script>

<style scoped lang="scss">
	.deConBox {
		width: 690rpx;
	}

	.hui {
		filter: grayscale(1)
	}

	.detailBox {
		position: relative;
		height: 100%;
		background-color: #f8f8f8;
	}

	.img {
		z-index: 2;
		top: 24rpx;

		img {
			height: 87rpx;
			width: 87rpx;
			border: 4rpx solid #ffffff;
		}
	}

	.hdTop {
		position: relative;
		top: 76rpx;
	}

	.content {
		margin-top: 110rpx;
		line-height: 78rpx;
	}

	.bottom-box {
		position: fixed;
		bottom: 0;
		padding: 24rpx;
		width: 100%;
	}
</style>
