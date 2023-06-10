<template>
	<!-- 广告 -->
	<view class="swiper-banner" v-if="allData2.guanggaolists && allData2.guanggaolists.length > 0">
		<view class="swiper-box">
			<swiper circular="true" autoplay="true" @change="swiperChange">
				<swiper-item v-for="(item,index) in allData2.guanggaolists" :key="index">
					<image :src="item._imageurl[0]" @tap="toSwiper(item)"></image>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
	export default {
		props: ["allData"],
		data() {
			return {
				currentSwiper: 0,
				allData2: []
			};
		},
		created() {
			this.allData.filter((e) => {
				if (e.components == "guanggao") {
					this.allData2 = e.template;
				}
			});
		},
		methods: {
			//轮播图跳转
			toSwiper(e) {
				console.log(e)
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
	.swiper-banner {
		display: flex;
		justify-content: center;
		padding: 20rpx 0;
		padding-bottom: 0;

		::v-deep.swiper-box {
			padding: 0 25rpx;
			width: 100%;

			swiper {
				width: 100%;
				height: 140rpx;

				swiper-item {
					image {
						width: 100%;
						height: 140rpx;
					}
				}
			}
		}
	}
</style>
