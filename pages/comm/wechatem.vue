<template>
	<!-- 微信授权中间页 -->
	<view class="p-2" style="padding-top: 5vh; line-height: 50rpx;">
		<view class="m-tb-10 c999 flex-row f14">
			<image :src="baseUrl+'/storage/tksk_mall_img/app/kflogo.png'" class="m-r-10"
				style="width: 50rpx; height: 50rpx;"></image>
			<view class="flex-item">{{uni.getStorageSync('basetitle')}}申请使用</view>
		</view>
		<view class="f18 fw c333 m-tb-10">
			<text>你的账号信息（昵称、头像、地区及性）</text>
		</view>
		<view class="c999 f12 p-tb-1 border-line">个人信息登录</view>
		<!-- 	<view class="flex-row">
			<image :src="datainfo.userInfo.avatarUrl" class="br10 m-r-10" style=" width: 100rpx; height: 100rpx;">
			</image>
			<view class="flex-item lh-2">
				<view class="f12 c333">{{datainfo.userInfo.nickName}}</view>
				<view class="f12 c999">微信个人信息</view>
			</view>
		</view> -->
		<view style="margin-top: 10vh; ;">
			<view class="cfff f15 p-tb-10 text-c br10" @click="wechatLogin()"
				style="  width: 500rpx; margin: auto; background-color:#1ca71c">授
				权 登 录</view>
			<view class="c999 f15 p-tb-10 text-c br10 " @click="goblack()"
				style="  width: 500rpx; margin: 20rpx auto; background-color:#fff; background-color: #f8f8f8;">暂 不 登 录
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'wechatem',
		data() {
			return {
				baseUrl: this.$baseUrl,
				datainfo: {},
				paramesdata: {}
			}
		},
		mounted() {

		},

		methods: {
			async wechatLogin() {
				let _this = this
				
				const loginRes = await this.loginLoad()
				_this.datainfo = await this.getUserInfo()
				let parames = {
					wxcode: loginRes.code,
					encryptedData: _this.datainfo
						.encryptedData,
					iv: _this.datainfo.iv,
					signature: _this.datainfo.signature,
					rawData: _this.datainfo.rawData
				};
				console.log('loginLoad', parames)
				const relogin = await this.$api.wechat.wxappLogin.post(parames)
				if (relogin.code == 0) {
					uni.showToast({
						icon: 'success',
						title: '授权成功',
					})
					setTimeout(function() {
						uni.navigateBack({
							delta: 1
						});
					}, 1000);

				}
			},
			loginLoad() {
				return new Promise(resolve => {
					let _this = this
					wx.login({
						provider: 'weixin',
						success: (loginRes) => {
							//调用接口传递参数
							resolve(loginRes)
						},
						fail: function(err) {
							uni.showToast({
								icon: 'none',
								title: '授权失败'
							})
						}
					});
				})
			},
			getUserInfo() {
				let _this = this
				return new Promise(resolve => {
					wx.getUserInfo({
						desc: '登录后可同步数据',
						lang: 'zh_CN',
						success: (infoRes) => {
							resolve(infoRes)
						},
					});
					setTimeout(function() {
						uni.hideLoading()
					}, 500);
				});
			}
		},
	}
</script>

<style lang="scss" scoped>
</style>
