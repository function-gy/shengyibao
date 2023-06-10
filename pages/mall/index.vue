<template>
	<view style="height: calc(100vh - 15vw); overflow: auto;">
		<!-- <web-view ref="webview" v-if="urlString.length !== ''" :src="urlString" ></web-view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				urlString: '',
				mallAppList: [],
				a_id: '',
			}
		},

		created() {
			this.getUrl()
		},
		methods: {
			getUrl() {
				if (JSON.parse(uni.getStorageSync('mallAppList'))) {
					this.mallAppList = JSON.parse(uni.getStorageSync('mallAppList'))
					if (this.mallAppList && this.mallAppList.length > 0) {
						this.a_id = this.mallAppList.find(item => item.app_module == "supplyfx").aid || ''
						if (this.a_id) {
							this.goTo()
						} else {
							uni.showToast({
								title: "当前应用暂未开通",
								duration: 2000,
								icon: "error",
							});
						}
					}
				}
			},
			goTo() {
				// this.$api.thirdParty.jumpDealUrl.post({
				// 	aid: this.a_id
				// }).then((res) => {
				// 	if (res.code == 0) {
				// 		if (res.data.jump_url) {
				// 			uni.navigateTo({
				// 				url: "/pages/home/components/webView?url=" +
				// 					encodeURIComponent(res.data.jump_url),
				// 			});
				// 			this.$store.commit('SET_TabbarKey', 'home');

				// 		}
				// 	}
				// })
			}
		},
	}
</script>

<style>
</style>
