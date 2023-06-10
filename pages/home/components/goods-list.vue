<template>
	<!-- 大牌卡券 -->
	<view class="goods-list">

		<view class="title">
			<view class="title-left">
				<view class="title-text">

					<view class="icon icon-youhuiquan f12 m-r-5" style="display: inline-block;"></view>

					<text style="font-size: 28rpx;">大牌卡券</text>
				</view>
			</view>
			<view class="title-right c999 f12" @tap="goTo()">
				查看更多
				<text class="icon icon-jiantouyou f11"></text>
			</view>
		</view>
		<view class="product-list" v-if="allData2 && allData2.length > 0" style="position: relative;">
			<view
				style="z-index:0; position: absolute; width:100%;height:120rpx;left:0px;top:5px;	backdrop-filter: blur(40rpx);background: rgba(247, 248, 249, 0.2);">
			</view>
			<view class="product" v-for="(item, index) in allData2" :key="index" @tap="toGoods(item)">
				<image  :src="item.cover[0]"></image>
				<view class="info-box">
					<view class="name fontBlack">{{ item.brand_name }}</view>
					<view class="price font666">
						<!-- <text style="color: #D60606">
							{{Number(item.amount)}}
						</text> -->
					</view>

					<view class="price font666">
						<text style="color: #d60606; margin-right: 4rpx;  font-size: 34rpx;">
							{{ Number(item.sales_volume) }}
						</text>
						<text class="f10">已售</text>
					</view>
					<view class="btn">
						<text class="text f11">兑换
							<text class="jiantou">
								<text class="icon icon-jiantouyou f8"></text>
							</text>

						</text>

					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["allData"],
		data() {
			return {
				allData2: []
			};
		},
		created() {
			
			this.allData.filter((e) => {
				if (e.components == 'cards') {
					this.allData2 = e.template.list?e.template.list.slice(0,6):[]
				}
			})
			
		},
		mounted() {
		},
		methods: {
			//商品跳转
			toGoods(e) {
				uni.navigateTo({
					url: "/pages/app/coupon/couponDetail?id=" + e.brand_id,
				});
			},
			goTo() {
				
				uni.navigateTo({
					url: "/pages/app/coupon/couponCategory",
				});
			},
		},
	};
</script>

<style scoped lang="scss">
	.goods-list {
		position: relative;
		margin-top: 20rpx;

		.title {
			display: flex;
			justify-content: space-between;
			height: 180rpx;
			margin: 0 25rpx;
			padding: 0 20rpx;
			padding-top: 30rpx;

			background: linear-gradient(90deg, #d2e7fb, #f9faf5, #fee7c9);
			border-radius: 14rpx 14rpx 0px 0px;

			.title-left {
				font-size: 28rpx;
				font-weight: 600;
				position: relative;
				color: #569ff0;

				.title-left::before {
					content: attr(text);
					position: absolute;
					z-index: 10;
					color: #569ff0;
					-webkit-mask: linear-gradient(to right, transparent, #2e72f7);
				}

				.title-text {
					z-index: 99;
					left: 12rpx;
					position: relative;
				}
			}

			.title-right {
				color: #f7b862;

				.icon {
					font-size: 24rpx;
					margin-left: 12rpx;
				}
			}
		}

		.product-list {

			padding: 20rpx;
			margin: 0 25rpx;
			margin-top: -95rpx;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			align-items: center;
			background: rgba(255, 255, 255, 0.2);
			box-shadow: 0 0 20rpx rgba(255, 255, 255, 0.8) inset, 0 0 30rpx #dadbde;
			border-radius: 14rpx;

			.product {
				width: 228rpx;
				z-index: 99;
				padding-top: 38rpx;
				width: 31%;
				border-radius: 20rpx;
				background-color: #fff;
				margin: 0 0rpx 30rpx 0;
				text-align: center;
				display: flex;
				flex-direction: column;
				align-items: center;
				image {
					width: 168rpx;
					height: 104rpx;
				}

				.info-box {
					padding: 10rpx 40rpx 32rpx;
				}

				.name {
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					font-size: 24rpx;
				}

				.price {
					font-size: 10rpx;
					line-height: 30rpx;
					margin-bottom: 10rpx;
				}

				.btn {
					background-color: #fff7ef;
					border-radius: 22rpx;
					padding-left: 20rpx;
					line-height: 40rpx;

					.text {
						color: #fd940a;

					}

					.jiantou {
						display: inline-block;
						color: #fff;
						margin-left: 14rpx;
						margin-right: 10rpx;
						height: 24rpx;
						width: 24rpx;
						border-radius: 50%;
						background: linear-gradient(90deg, #f8ce5a, #f8ac35);
						box-shadow: 0px 2px 10px 0px rgba(248, 174, 56, 0.4);

						.icon-jiantouyou {
							display: flex;
							align-items: center;
							text-align: center;
							line-height: 24rpx;
						}
					}

				}
			}

		}
		.product-list::after {
			content: "";
			width: 228rpx;

		}
	}
</style>
