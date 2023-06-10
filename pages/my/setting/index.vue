<template>
	<view style="background-color: #f8f8f8;height: 100%;">
		<view class="my-setting">
			<view class="card-box bgfff m-b-10 br10">
				<view class="card-content flex-space-between" @tap="goTo('user')">
					<view class="f15">
						会员信息
					</view>
					<view class="font999 text-r f15">
						{{ userInfo.nickname }}
						<text class="icon icon-jiantouyou f15">
						</text>
					</view>
				</view>
			</view>
			<view class="card-box bgfff m-b-10 br10 ">
				<view class="card-content flex-space-between" @tap="goTo('phone')">
					<view class="f15">
						手机号码
					</view>
					<view class="font999 text-r f15">
						{{ userInfo.phone.substr(0, 3) +
									"****" +
									userInfo.phone.substr(7)
							}}
						<text class="icon icon-jiantouyou f15">

						</text>
					</view>
				</view>
				<view class="card-content flex-space-between" @tap="goTo('addPass')" v-if="!userInfo.is_pay">
					<view class="f15">
						设置密码
					</view>
					<view class="icon icon-jiantouyou font999 text-r f15">

					</view>

				</view>
				<view class="card-content flex-space-between" @tap="goTo('editPass')">
					<view class="f15">
						修改密码
					</view>
					<view class="icon icon-jiantouyou font999 text-r f15">

					</view>

				</view>
				<view class="card-content flex-space-between" @tap="goTo('forgetPass')">
					<view class="f15">
						忘记密码
					</view>
					<view class="icon icon-jiantouyou font999 text-r f15">

					</view>

				</view>
			</view>
			<view class="card-box bgfff m-b-10 br10">
				<view class="card-content font333 text-c" @tap="logOut()">
					<text class="icon icon-tuichu  text-r f15"></text>退出登录
				</view>
			</view>
			<u-modal :show="boxHid" :confirmText="confirmText" :cancelText="cancelText" :showCancelButton="true"
				confirmColor="" @cancel="cancel" :confirmColor="logincolor" @confirm="confirm">
				<view class="text-c">
					<view>
						<view class="mimg">
							<img :src="baseUrl+'/storage/tksk_mall_img/app/tuichu@3x.png'"
								style="width: 130rpx; height: 130rpx;" />
							<view>
								是否确认退出登录？
							</view>
						</view>
					</view>
				</view>
			</u-modal>
		</view>

	</view>
</template>

<script>
	export default {
		components: {},
		data() {
			return {
				baseUrl: this.$baseUrl,
				userInfo: {},
				boxHid: false,
				confirmText: '立即退出',
				cancelText: '再想想',
				logincolor: ''
			};
		},
		onLoad() {},
		onReady() {},
		onShow() {},
		created() {
			this.userInfo = this.$tool.getStorageLocCode('mall_authInfo')
			this.logincolor = this.$tool.getStorageLocCode('logincolor') ? this.$tool.getStorageLocCode('logincolor') :
				'#9784FF'
			// //console.log(this.userInfo);
		},
		methods: {
			logOut() {
				this.boxHid = !this.boxHid;
			},
			cancel() {
				this.boxHid = false;
			},
			confirm() {
				this.boxHid = !this.boxHid;
				this.$api.common.outLogin.post({})
					.then(res => {
						this.$store.commit('SET_TabbarKey', 'home')
						uni.setStorageSync('tabbarKey', 'home')
						// #ifdef MP-WEIXIN || APP
						uni.removeStorageSync('mall_token')
						// #endif
						// #ifdef H5
						uni.removeStorageSync(uni.getStorageSync('mall_code') + '_token')
						// #endif	
						uni.reLaunch({
							url: '/pages/login/index',
						});
					})
			},
			goTo(val) {
				if (val === 'addPass') {
					uni.navigateTo({
						url: '/pages/my/setting/payPassword/add'
					})
				} else if (val === 'editPass') {
					uni.navigateTo({
						url: '/pages/my/setting/payPassword/edit'
					})
				} else if (val === 'forgetPass') {
					uni.navigateTo({
						url: '/pages/my/setting/payPassword/forget'
					})
				}
			}
		},
	};
</script>

<style scoped lang="scss">
	.my-setting {
		width: 100%;
		padding: 20rpx 30rpx;

		.card-box {}

		.card-box .card-content {
			padding: 30rpx 0;
			margin: 0rpx 30rpx;
			border-bottom: 2rpx solid #F3F3F3;
		}

		.card-box .card-content:last-child {
			border-bottom: none;
		}
	}
</style>
