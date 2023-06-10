<template>
	<!-- 协议-内链 -->
	<view class="contract-info p-15">
		<!-- <web-view src="urlString"></web-view> -->
		<text v-if="urlString" class="html-text-box" v-html="urlString"></text>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urlString: ''
			}
		},
		onLoad(options) {
			if (options.name) {
				uni.setNavigationBarTitle({
					title: options.name
				})
			} else {
				uni.setNavigationBarTitle({
					title: '条款与规则'
				})
			}
		},
		created() {
			this.getInfo()
		},
		methods: {
			getInfo() {
				this.$api.home.homeInfo.post().then(res => {
					if (res.code == 0) {
						if (res.data && res.data.home_style && res.data.home_style.login_config) {
							this.urlString = this.$tool.crypto.BASE64.decrypt(JSON.parse(res.data.home_style
								.login_config).remark)
							console.log(this.urlString)
						}
					}
				})
			},
		}
	}
</script>

<style scoped>
</style>
