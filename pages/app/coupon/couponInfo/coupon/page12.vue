<template>
	<view v-if="couponInfo.brand">
		<view class="toppart">
			<image lazy-load="true" class="logo" :src="couponInfo.logo"></image>
			<view class="brand f16 font333">恭喜您</view>
			<view class="code_name f20 m-b-10">
				获得{{couponInfo.brand}}{{ couponInfo.code_name }}{{ Number(couponInfo.amount) +'元'}}</view>
			<view >
				<image
          :src="qrCode"
          style="width: 350rpx; height: 350rpx; margin: 0 auto"
        ></image>
				<view class="f16">
					{{couponInfo.code_no}}
				</view>
			</view>
		</view>
		<view class="dot_line">
			<view class="round-left"></view>
			<u-divider
				dashed
			    lineColor="var(--couponInfoBgc)"
			></u-divider>
			<view class="round-right"></view>
		</view>
		<view class="botpart" >
			<view class="balance f16 text-center m-b-10" >
				卡密：<text style="color: #FF9800;">{{couponInfo.pass}}</text>
			</view>
			<view class="usetip font999 m-b-20 text-center f14">{{ couponInfo.use_case }}</view>
			
		</view>
	</view>
</template>

<script>
const {  qrcode, svg2url } = require("pure-svg-code");

	export default {
		name: 'page1',
		components: {},
		props: ['couponInfo'],
		data() {
			return {
				qrCode: '',//二维码
			}
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {

		},
		onPageScroll(e) {

		},
		onLoad(e) {
		},
		onReady() {},
		onShow() {},
		watch: {},
		created() {
			//console.log('couponInfo111',this.couponInfo);
			this.init()
		},
		mounted() {
			// //console.log('couponInfo111',this.couponInfo);
		},
		methods: {
			init() {
      let _this = this;
      setTimeout(function () {
        let svgString = qrcode({
          content: _this.couponInfo.code_no,
          padding: 4,
          width: 350,
          height: 350,
          color: "#000000",
          background: "#ffffff",
          ecl: "M",
        });
        _this.qrCode = svg2url(svgString);
      }, 500);
    },
		},
	}
</script>

<style scoped lang="scss">
	@import "../couponInfo.scss";
</style>
