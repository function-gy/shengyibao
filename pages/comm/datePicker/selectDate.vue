<template>
	<view class="waibox">
		<view class="picker text-c f12" @click="show = true"> {{text}}
			<view class="icon icon-xiajiantou f12"></view>
		</view>
		<u-datetime-picker mode="year-month" :show="show" v-model="value1" @cancel="cancel" @confirm="confirm">
		</u-datetime-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				show: false,
				value1: Number(new Date()),
				text: '筛选'
			}
		},
		methods: {
			confirm(e) {
				const timeFormat = uni.$u.timeFormat;
				let searchDate = timeFormat(e.value, 'yyyy-mm');
				this.text = searchDate;
				// 输出结果：2022-08-25 16:25:59
				// 日期传给父组件
				this.$emit('getDate', searchDate);
				this.show = false;
			},
			cancel() {
				this.show = false;
			},
		}
	}
</script>

<style scoped lang="scss">
	.waibox {
		position: absolute;
		top: 46rpx;
		right: 30rpx;
		white-space: nowrap;
	}

	.picker {
		display: inline-block;
		// width: 176rpx;
		// padding:0 20rpx;
		padding-left:20rpx;
		padding-right: 20rpx;
		height: 48rpx;
		background: #ececec;
		border-radius: 24rpx;
		line-height: 48rpx;
	}

	.icon-xiajiantou {
		display: inline-block;
		transform: scale(0.6);
	}
</style>
