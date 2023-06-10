<template>
	<view class="paySuccess flex-column text-c">
		<view class="result-img">
			<img v-if="resultData.result==1" :src="baseUrl+'/storage/tksk_mall_img/app/succse@2x.png'" />
			<img v-if="resultData.result==2" :src="baseUrl+'/storage/tksk_mall_img/app/warning@2x.png'" />
			<img v-if="resultData.result==3" :src="baseUrl+'/storage/tksk_mall_img/app/fale@2x.png'" />
		</view>
		<view class="info f16" style="line-height: 120rpx;">
			<text>{{resultData.msg}}</text>
		</view>
		<view class="info2 f16" v-if="resultData.info">{{resultData.info}}</view>
		<view class="btn-box flex-row">
			<u-button shape="circle" text="返回首页" @tap="goHome"></u-button>
			<u-button type="primary" shape="circle" :text="resultData.buttonText" @tap="goOrderList"></u-button>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'paySuccess',
		data() {
			return {
				baseUrl: this.$baseUrl,
				eventChannel: null,
				resultData: {
					result: 1,
					buttonText: '查看订单',
					path: '',
					msg: '恭喜你，兑换成功！',
					info: ''
				}
			}
		},
		onLoad(options) {

			this.resultData = JSON.parse(decodeURIComponent(options.info))
			// const eventChannel = this.getOpenerEventChannel();
			// this.eventChannel = eventChannel;
			// let _vm = this;

			// eventChannel.on('resultData', function(params) {
			// 	console.log(params);
			// 	_vm.resultData = params
			// })
		},
		onUnload() {
			// this.eventChannel.off('resultData');//取消监听
		},
		methods: {
			goHome() {
				this.$store.commit('SET_TabbarKey','home')
				uni.setStorageSync('tabbarKey','home')
				uni.reLaunch({
					url: '/pages/tabbar/tabbar'
				});
			},
			goOrderList() {
				uni.navigateTo({
					url: this.resultData.path
				});
			}
		},
	}
</script>

<style scoped lang="scss">
	.paySuccess {
		padding: 80rpx 120rpx 80rpx;

		.result-img {
			img {
				width: 130rpx;
				height: 130rpx;
			}
		}

		.info {
			line-height: 60px;
		}

		.info2 {
			line-height: 60rpx;
			color: #FF8B0B;
		}

		.btn-box {
			margin-top: 100rpx;

			.u-button {
				height: 72rpx;
				line-height: 72rpx;
			}

			.u-button+.u-button {
				margin-left: 36rpx;
			}

			.u-button--primary.u-button--circle {
				background: linear-gradient(90deg, #F8CE5A, #F8AC35);
				border: none;
			}
		}
	}
</style>
