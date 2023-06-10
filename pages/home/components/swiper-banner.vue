<template>
	<!-- 最上面轮播 -->
	<view class="swiper-banner" v-if="allData2.bannerlists && allData2.bannerlists.length > 0">
		<view class="swiper-box">
			<swiper circular="true" autoplay="true" @change="swiperChange">
				<swiper-item v-for="swiper in allData2.bannerlists" :key="swiper.id">
					<image :src="swiper._imageurl[0]" @tap="toSwiper(swiper)" style="height: 410rpx;"></image>
				</swiper-item>
			</swiper>
			<!-- 轮播点 -->
			<view class="indicator">
				<view v-for="(swiper, index) in allData2.bannerlists"
					:class="[currentSwiper == index ? 'on dots' : 'dots']" :key="index"></view>
			</view>
		</view>
	</view>

</template>

<script>
	export default {
		props: ["allData"],
		data() {
			return {
				currentSwiper: 0,
				allData2:[]
			};
		},
		created() {
			this.allData.filter((e) => {
				if (e.components == 'banner') {
					this.allData2 = e.template
				}
			})
		},
		methods: {
			//轮播图跳转
			toSwiper(e) {
				if (e.link) {
					if (e.link.indexOf("tongkask.com/mall/mall.html") !== -1) {
						if (e.link.indexOf("/pages") !== -1) {
							let url = e.link.substring(e.link.indexOf("/pages"));
							uni.navigateTo({
								url: url,
							});
						}
					} else {
						uni.navigateTo({
							url: "/pages/home/components/webView?url=" +
								encodeURIComponent(e.link),
						});
					}
				}
			},
			//轮播图指示器
			swiperChange(event) {
				this.currentSwiper = event.detail.current;
			},
		},
	};
</script>

<style scoped lang="scss">
	// 轮播样式
	.swiper-banner {
		width: 100%;

		::v-deep.swiper-box {
			width: 100%;
			height: 410rpx;
			overflow: hidden;
			position: relative;
			z-index: 1;

			swiper {
				width: 100%;
				height: 410rpx;

				swiper-item {
					image {
						width: 100%;
						height: 410rpx;
					}
				}
			}

		
		}
	}
	.indicator {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		bottom: 72rpx;
		overflow: hidden;
		display: flex;
	
		::v-deep.dots {
			background-color: rgba(255, 255, 255, 0.8);
			width: 10rpx;
			height: 10rpx;
			border-radius: 10rpx;
			margin-left: 10rpx;
		}
	
		::v-deep.dots.on {
			width: 30rpx;
			background-color: rgba(255, 255, 255, 1);
		}
	}
</style>
