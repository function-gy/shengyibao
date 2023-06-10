<template>
	<view class=" text-c" style="padding-top: 200rpx;">
		<view class="">
			<img  style="width:500rpx; margin: auto; height: 320rpx;" 
			:src="baseUrl+'/storage/tksk_mall_img/app/404.png'">
		</view>
		<view class=" m-t-10 font999">
			哎呀，页面不见了~~
		</view>
	</view>
</template>

<script>
	export default {
		name: '404',
		data() {
			return {
				baseUrl: this.$baseUrl,
			}
		},
		onLoad(options) {
		},

		methods: {
			
		},
	}
</script>

<style lang="scss" scoped>
</style>
