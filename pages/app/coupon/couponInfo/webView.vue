<template>
	<view class="webView">
		<web-view ref="webview" :src="urlString"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urlString: '',
			}
		},
		onLoad(options) {
			if (options.url) {
				this.urlString = decodeURIComponent(options.url)
				// console.log(this.urlString);
			}
			// console.log(options);
			if (options.title) {
				uni.setNavigationBarTitle({
					title: options.title
				})
			}
		},
		created() {
			
		},
		mounted() {
			// console.log(this.$refs.webview);
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.webView {
	}
</style>
