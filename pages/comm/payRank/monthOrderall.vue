<template>
	<view class="">
		<view class="list f12" v-for="(item1, index) in logDate" :key="index" style="box-sizing: border-box">
			<u-sticky>
				<view class="p-l-15 yearmonth" style="padding-top:10rpx; padding-bottom: 10rpx;">
					<text class="f24">{{
	    item1.letter.slice(item1.letter.length - 2, item1.letter.length)
		
	  }}</text>
					<text class="mon">月</text>
					<text class="colorInt" style="margin-left: 6rpx">/ {{ item1.letter.slice(0, 4) }}年</text>
				</view>
			</u-sticky>
			<view class="bgfff  p-lr-15">
				<view class="li" v-for="(item2, id) in item1.list" :key="id" @click="godetailed(item2)">

					<img v-if="moneyType == 'coupon'" :src="JSON.parse(item2.icon).circular_colour_icon"
						class="pcY m-r-10"
						:class="item2.order_status == 4 || item2.order_status == 5 || item2.order_status == 6 ? 'hui':'' "
						style="width: 71rpx; height: 71rpx" />
					<view class="left pcY" style="left: 90rpx">
						<view class="title f14 lh-2" v-if="moneyType == 'coupon'">
							{{ item2.brand_name + item2.coupon_name }}
						</view>
						<view class="colorInt f12">
							{{
                item2.create_time.slice(5, 7) +
                "月" +
                item2.create_time.slice(8, 10) +
                "日"
              }}
							{{ " " }}
							{{
                item2.create_time.slice(
                  item2.create_time.length - 8,
                  item2.create_time.length
                )
              }}
						</view>
					</view>
					<view class="money" style="top: 50%;
    transform: translateY(-50%);">
						<view class="f15">
							<text v-if="
                  item2.order_status == 1 ||
                  item2.order_status == 3 ||
				  item2.order_status == 2 
                ">
								<text>-</text> {{ Number(item2.total_fee) }}
							</text>
						</view>
						<!-- <view class="f12" :class="statusColor(item2.order_status)"> -->
						<view class="f12" :class="[item2.order_status==1?'colorGreens':'',
            item2.order_status==2?'colorBlack':'',
            item2.order_status==3?'colorWarning':'',
            item2.order_status==4?'colorReds':'',  
            item2.order_status==5?'colorInt':'',
          ]">
							{{ $tool.orderStatusOption(item2.order_status) }}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["logDate", "imgsrc", "moneyType"],
		data() {
			return {
				baseUrl: this.$baseUrl,
			}
		},
		mounted() {
			// console.log('logDate',JSON.parse(this.logDate[0].list[0].icon));
		},
		methods: {
			// 跳转
			godetailed(val) {

			 if (this.moneyType == "coupon") {
					let c = {
						searchId: val.id,
						imgsrc: JSON.parse(val.icon).circular_colour_icon,
						moneyType: this.moneyType,
						TitleText: "卡券详情",
					};
					uni.navigateTo({
						url: "/pages/comm/payRank/orderOne?item=" +
							encodeURIComponent(JSON.stringify(c)),
					});
				}
			},
		},
	};
</script>

<style scoped lang="scss">
	.hui {
		filter: grayscale(1)
	}

	.li {
		height: 130rpx;
		border-bottom: 2rpx #f3f3f3 solid;
		position: relative;
	}

	.money {
		font-weight: 500;
		position: absolute;
		top: 30rpx;
		right: 10rpx;
		text-align: right;
	}

	.li:last-child {
		border-bottom: none;
	}

	.yearmonth {
		height: 90rpx;
		background-color: #f8f8f8;
	}

	.u-sticky {
		top: 0 !important;
	}
</style>
