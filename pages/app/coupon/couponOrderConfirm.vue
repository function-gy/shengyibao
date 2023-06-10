<template>
	<view class="couponOrderConfirm">
		<view class="msg">
			<text>支付成功后，可前往“个人中心-我的卡包”使用</text>
		</view>
		<view class="card bgfff m-b-10">
			<view class="card-top flex-row">
				<view class="img">
					<image mode="heightFix" :src="imgURL">
					</image>
				</view>
				<view class="flex-item" style="flex: 1;">
					<view class="info-box flex-space-evenly">
						<view class="name">
							{{name}}
						</view>
						<view class="amount">
							面值{{Number(form.amount)}}元
						</view>
						<view class="flex-space-between">
							<view class="price">
								{{form.price}}{{$tool.getMoneyUnit()}}
							</view>
							<view class="return f9 ">
								不支持退换货
							</view>
						</view>
					</view>
				</view>
			</view>
			<view class="card-bottom flex-space-between">
				<view class="label">
					购买数量
				</view>
				<view>
					<u-number-box integer v-model="form.number" button-size="26" :min="1" @change="couponTotalMoneyLoad()"
						:max="free_num> 10 ? 10 : free_num"></u-number-box>
					<view class="errInfo f12 u-warning" v-if="form.number>=free_num || form.number>=10">
						该卡券最多购买{{free_num > 10 ? 10 : free_num}}
					</view>
				</view>
			</view>
		</view>
		<view class="total bgfff flex-space-between">
			<view class="label">
				商品合计
			</view>
			<view class="amount">
				{{total}} {{$tool.getMoneyUnit()}}
			</view>
		</view>

		<view class="btncolorwrap flex-space-between">
			<view class="total">
				共<text class="fontReds">{{form.number}}</text>件，合计<text
					class="fontReds">{{total}}{{$tool.getMoneyUnit()}}</text>
			</view>
			<view class="btn">
				<u-button type="primary" text="立即兑换" @tap="createOrder()"></u-button>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		name: 'couponOrderConfirm',
		data() {
			return {
				eventChannel: null,
				form: {
					number: 1
				},
				name: '',
				imgURL: '',
				free_num: 100,
				total: 0,

			}
		},

		computed: {
			// total: function() {
			// 	// 把this.list中所有的价格加起来
			// 	let total = 0
			// 	// total = this.form.number * 1000
			// 	total = this.form.number * this.form.price
			// 	return total
			// },
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {

		},
		onPageScroll(e) {

		},
		onLoad(option) {
			let orderData = JSON.parse(decodeURIComponent(option.order));
			this.form.coupon_id = orderData.coupon_id; //卡券id
			this.form.price = orderData.price; //价格
			this.form.amount = orderData.amount;
			this.form.number = orderData.number; //数量
			this.name = orderData.name; //卡名字
			this.imgURL = orderData.imgURL; //图片url
			this.free_num = orderData.free_num
			this.couponTotalMoneyLoad()
		},
		methods: {
			couponTotalMoneyLoad(val) {
				
				this.$api.coupon.couponTotalMoney.post({
					coupon_id: this.form.coupon_id,
					num: val?val.value:this.form.number
				}).then(res => {
					if (res.code == 0) {
						this.total = res.data.total_fee
					}
				})
			},
			createOrder() {
				uni.showLoading({
					title: "下单中",
				});
				this.$api.coupon.createCouponOrder.post({
					coupon_id: this.form.coupon_id,
					num: this.form.number
				}).then((res) => {
					if (res.code == 0) {
						uni.navigateTo({
							url: '/pages/comm/payCheckstand/index?type=coupon' +
								'&order_id=' + res.data.order_id +
								'&total_fee=' + Number(res.data.total_fee) +
								'&order_sn=' + res.data.order_sn +
								'&order_type=' + '大牌卡券' +
								'&info=' + res.data.num + '张' + res.data.coupon_amount + '元面值' + res.data
								.brand_name + res.data.coupon_name
						});
					}
				}).catch((res) => {
					uni.showToast({
						title: res.msg,
						icon: "none"
					});
				});
				setTimeout(function() {
					uni.hideLoading();
				}, 1000);
			},
		}
	}
</script>
<style scoped lang="scss">
	page {
		position: relative;
	}

	.couponOrderConfirm {
		font-size: 30rpx;

		.msg {
			background: #FFFBF1;
			height: 60rpx;
			line-height: 60rpx;
			font-size: 22rpx;
			color: #D7862D;
			padding: 0 30rpx;
		}

		.card {
			padding: 30rpx;
			// margin-bottom: 20rpx;

			.card-top {
				padding-bottom: 30rpx;
				border-bottom: 2rpx solid #F3F3F3;

				.img image {
					height: 130rpx;
				}

				.info-box {
					height: 100%;
					margin-left: 20rpx;

					.amount {
						font-size: 24rpx;
						color: #B7B6B6;
					}

					.return {
						color: #FF7544;
						background: #FFF1EC;
						border-radius: 30rpx;
						padding: 5rpx 18rpx;
					}
				}
			}


			.card-bottom {
				margin-top: 36rpx;

				.label {
					color: #B7B6B6;
				}
			}
		}

		.total {
			padding: 0 30rpx;

			font-weight: 400;
			height: 100rpx;
			line-height: 100rpx;

			.amount {
				color: #D60606;
			}
		}

		.btncolorwrap {
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background: #fff;
			padding: 24rpx 30rpx;
			border-radius: 20rpx 20rpx 0px 0px;
			border: 2rpx solid #F8F8F8;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.btn .u-button {
				width: 230rpx;
				height: 88rpx;
				background: linear-gradient(90deg, #F8CE5A, #F8AC35);
				box-shadow: 0px 10rpx 16rpx 0px rgba(248, 174, 56, 0.4);
				border-radius: 44rpx;
				border: none;
				font-size: 34rpx;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
	}
</style>
