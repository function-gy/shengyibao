<template>
	<view v-if="couponInfo.brand">
		<view class="toppart">
			<image lazy-load="true" class="logo" :src="couponInfo.logo"></image>
			<view class="brand f16 font333">恭喜您</view>
			<view class="code_name f20 m-b-20">
				获得{{couponInfo.brand}}{{ couponInfo.code_name }}{{ Number(couponInfo.amount) +'元'}}</view>
			
			<view class="midpart">
				<view class="yourMaTip font999">您的卡号为:</view>
				<view class="yourMa">{{ couponInfo.code_no }}</view>
				<view class="yourMaTip font999 ">您的卡密为:</view>
				<view class="yourMa">{{ couponInfo.pass }}</view>
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
			<view class="usetip font999 m-b-20 text-center f14">{{ couponInfo.use_case }}</view>
			<view>
				<view class="useInfoTip font333 m-b-20" >使用说明：</view>
				<view class="wxparseInfo f12 font999 m-b-20" v-if="couponInfo.use_info && couponInfo.use_info.length>0">
					<view class="" v-for="(item,index) in couponInfo.use_info" :key="index">
						{{(index+1) + '、' + item.name}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'page1',
		components: {},
		props: ['couponInfo'],
		data() {
			return {
				barCode: '',//条形码
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
				let _this = this
			}
		},
	}
</script>

<style scoped lang="scss">
	@import "../couponInfo.scss";
</style>
