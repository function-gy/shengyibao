<template>

	<view :style="couponBgc" class="mainBgc">
		<view class="pagebg pickInfo"  v-if="show">
		<view class="content f16 text-c" v-if="errorInfo">
			{{errorInfo}}
		</view>
		<view v-else>
			<view class="p-15 f15 text-c" v-if="couponType == '101' || couponType == '301' || couponType == '302' || couponType == '303'">
				该卡券兑换需使用第三方链接，请点击跳转
				<view class="f18 m-tb-10 cblue" style="text-decoration: underline;" @tap="goToUrl(couponInfo.url)">
					跳转
				</view>
			</view>
			<view class="content" v-else>
				<!-- <component v-if="coupon_off_style" :is="'page'+ coupon_off_style" :couponInfo="couponInfo" /> -->
				<page1 :couponInfo="couponInfo"  v-if="coupon_off_style == 1"></page1>
				<page2 :couponInfo="couponInfo"  v-if="coupon_off_style == 2"></page2>
				<page3 :couponInfo="couponInfo"  v-if="coupon_off_style == 3"></page3>
				<page4 :couponInfo="couponInfo"  v-if="coupon_off_style == 4"></page4>
				<page5 :couponInfo="couponInfo"  v-if="coupon_off_style == 5"></page5>
				<page6 :couponInfo="couponInfo"  v-if="coupon_off_style == 6"></page6>
				<page7 :couponInfo="couponInfo"  v-if="coupon_off_style == 7"></page7>
				<page8 :couponInfo="couponInfo"  v-if="coupon_off_style == 8"></page8>
				<page9 :couponInfo="couponInfo"  v-if="coupon_off_style == 9"></page9>
				<page10 :couponInfo="couponInfo"  v-if="coupon_off_style == 10"></page10>
				<page11 :couponInfo="couponInfo"  v-if="coupon_off_style == 11"></page11>
				<page12 :couponInfo="couponInfo"  v-if="coupon_off_style == 12"></page12>
				<page13 :couponInfo="couponInfo"  v-if="coupon_off_style == 13"></page13>
			</view>
		</view>
	</view>	
	</view>

</template>

<script>
	import colorTool from "@/util/color";
	import page1 from "./coupon/page1.vue"
	import page2 from "./coupon/page2.vue"
	import page3 from "./coupon/page3.vue"
	import page4 from "./coupon/page4.vue"
	import page5 from "./coupon/page5.vue"
	import page6 from "./coupon/page6.vue"
	import page7 from "./coupon/page7.vue"
	import page8 from "./coupon/page8.vue"
	import page9 from "./coupon/page9.vue"
	import page10 from "./coupon/page10.vue"
	import page11 from "./coupon/page11.vue"
	import page12 from "./coupon/page12.vue"
	import page13 from "./coupon/page13.vue"
	export default {
		name: 'pickInfo',
		components: {
			page1,
			page2,
			page3,
			page4,
			page5,
			page6,
			page7,
			page8,
			page9,
			page10,
			page11,
			page12,
			page13,
		},
		data() {
			return {
				coupon_order_sn: '',
				couponInfo:'',
				couponType: '',
				errorInfo: '',
				barCode: '',//条形码
				qrCode: '',//二维码
				coupon_off_bg: '',
				coupon_off_style: '',
				show: false
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {

		},
		onPageScroll(e) {

		},
		onLoad(e) {
			this.coupon_order_sn = e.sn
			this.getInfo()
		},
		onReady() {},
		onShow() {},
		watch: {},
		created() {
			
		},
		mounted() {
			
		},
		beforeDestroy() {
			this.$store.commit('SET_couponBgc', '');
			uni.setStorageSync('couponBgc', '')
		},
		computed: {
			couponBgc() {
				return this.$store.state.couponBgc;
			},
		},
		
		methods: {
			getInfo() {
				this.show = false
				uni.showLoading({
					title: '加载中'
				})
				this.errorInfo = ""
				this.$api.coupon.memberCouponGetOff.post({
					sn: this.coupon_order_sn
				}).then((res) => {
					if (res.code == 0) {
						// self::COUPON_TYPE_101 => "平台自发券",暂定是链接类
						// self::COUPON_TYPE_201 => "卡号+卡密",
						// self::COUPON_TYPE_202 => "卡号或卡密",
						// self::COUPON_TYPE_203 => "卡号+卡密+校验码",
						// self::COUPON_TYPE_301 => "链接类",
						// self::COUPON_TYPE_302 => "链接+验证码",
						// self::COUPON_TYPE_303 => "链接+卡号+验证码",
						this.couponInfo = res.data;
						this.couponType = res.data.type;
						if (this.couponType == '101' || this.couponType == '301' || this.couponType == '302' || this.couponType == '303') {
							if (this.couponInfo.url) {
								// window.open(this.couponInfo.url)
								this.goToUrl(this.couponInfo.url)
							}
						}
						this.coupon_off_bg = res.data.off_bg==''? '#eeeeee': res.data.off_bg;
						this.coupon_off_style = res.data.off_style;
						let couponBgc = `
							--couponInfoBgc:` + this.coupon_off_bg + `;
							--couponInfoBgc-lighten-2:` + colorTool.lighten(this.coupon_off_bg, 0.8) + `;
							`
							
							this.$store.commit('SET_couponBgc', couponBgc);
							uni.setStorageSync('couponBgc', couponBgc)

						// 	document.documentElement.style.setProperty(
						// 	"--couponInfoBgc",
						// 	this.coupon_off_bg
						// );
						// document.documentElement.style.setProperty(
						//     "--couponInfoBgc-lighten-2",
						//     colorTool.lighten(this.coupon_off_bg, 0.8)
						// );

					} else {
						this.couponInfo = ''; //卡券信息
						this.couponType = ''; //核销类型
						this.errorInfo = res.msg;
					}
					setTimeout(function() {
						uni.hideLoading()
					}, 500);
				});
				this.show= true
			},
			goToUrl(url) {
				if (url) {
					//console.log(this.couponInfo.url);
					uni.navigateTo({
						url: '/pages/app/coupon/couponInfo/webView?url=' + encodeURIComponent(url) + '&title=' + this.couponInfo.brand + this.couponInfo.code_name
					});
				}
			},
		},
	}
</script>

<style scoped lang="scss">
	.mainBgc {
		background: var(--couponInfoBgc);
	}

	.pickInfo.pagebg {
		min-height: 100vh;
		box-sizing: border-box;
		padding: 90rpx 30rpx 100rpx;
	}
	
	.pickInfo {
		
	}

	
</style>
