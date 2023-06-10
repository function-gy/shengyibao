<template>
	<view class="my-message">
		<view class="br10 bgfff">
			<view class="row-box p-15 flex-row" v-for="(item,index) in list" :key="index">
				<view class="left">
					<image :src="item.icon"></image>
				</view>
				<view class="right flex-space-evenly">
					<view class="top flex-space-between">
						<view class="title f15">
							{{item.title}}
							<text v-if="item.hasTips" class="point br50"></text>
						</view>
						<view class="time f10 font999">
							{{item.createdTime}}
						</view>
					</view>
					<view class="bottom f12 font999">
						{{item.tips}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				list: []
			};
		},
		onLoad() {},
		onReady() {},
		onShow() {},
		methods: {
			
		},
	};
</script>

<style scoped lang="scss">
	.my-message {
		padding: 20rpx 30rpx;
		.row-box {
			height: 130rpx;
			border-bottom: 2rpx solid #f2f3f5;
			.left {
				width: 90rpx;
				image {
					width: 70rpx;
					height: 70rpx;
				}
			}
			.right {
				width: calc(100% - 90rpx);
				.title {
				}
				.point {
					display: inline-block;
					width: 12rpx;
					height: 12rpx;
					background: var(--logincolor-darken-1);
					margin: 10rpx;
				}
			};
		}
		.row-box:last-child{
		   border-bottom: none;
		}
	}
</style>
