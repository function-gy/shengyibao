<template>
	<view :style="myStyle">
		<view v-if="viewshow">
			<home v-if="tabbarKey === 'home'" class="bgfff flex-item" />
			<!-- @changepage="changeTabbar({ name: 'carts' })" -->
			<mall v-if="tabbarKey === 'mall'" class="bgfff flex-item" />
			<coupon v-if="tabbarKey === 'coupon'" class="bgfff flex-item" />


			<my class="flex-item bgfff" v-else-if="tabbarKey === 'my'" />

			<view class="bgfff tabbar tabBox bgfff width100" style="height: 15vw;">
				<view class="tabbar-item" v-for="(item, index) in tabBar.list" :key="item.pagePath"
					@click="changeTabbar(item)">
					<view>
						<i :class="[item.iconPath , tabbarKey === item.name ? 'cmain' : 'cb7b6b6']"
							class="tabbarimg"></i>
					</view>

					<text :class="tabbarKey === item.name ? 'cmain' : 'cb7b6b6'">{{ item.text }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import home from '@/pages/home/home.vue';
	import mall from '@/pages/mall/index.vue';
	import coupon from '../coupon/index.vue';
	import my from '@/pages/my/index.vue';
	import bus from '@/common/EventBus';

	export default {
		components: {
			home,
			mall,
			coupon,
			my
		},
		computed: {
			myStyle() {
				return this.$store.state.myStyle;
			},
			tabbarKey() {
				return this.$store.state.tabbarKey?this.$store.state.tabbarKey:'home';
			},
			homeInfo() {
				return JSON.parse(this.$store.state.homeInfo);
			},
			base_config() {
				if (this.$store.state.homeInfo)
				  return JSON.parse(
				    JSON.parse(this.$store.state.homeInfo).home_style.base_config
				  );
			},
		},

		data() {
			return {
				viewshow: false,
				cartkey: 0,
				tabBar: {
					color: '#333333',
					borderStyle: 'black',
					backgroundColor: '#ffffff',
					list: [{
							pagePath: 'pages/home/home',
							iconPath: 'icon icon-shouye-02',
							text: '首页',
							name: 'home'
						},
						{
							pagePath: 'pages/mall/index',
							iconPath: 'icon icon-shangcheng',
							text: '商城',
							name: 'mall'
						},
						{
							pagePath: 'pages/coupon/index"',
							iconPath: 'icon icon-zhanghuguanli',
							text: '卡包',
							name: 'coupon'
						},
						{
							pagePath: 'pages/my/my',
							iconPath: 'icon icon-a-ziyuan681',
							text: '我的',
							name: 'my'
						}
					]
				}
			};
		},
		watch:{
			
		},
		
		
		mounted() {
			let that = this;
			bus.$on('demo', function(msg) {
				that.changeTabbar(msg);
			});
		},
		onLoad(option) {
			// #ifdef MP-WEIXIN || APP
			this.webChatLoad()
			// #endif
			// #ifdef H5 
			this.H5Load(option)
			// #endif
			uni.setNavigationBarTitle({
				title:this.base_config.title
			})
		},
		methods: {
			H5Load(option) {
				if (!option.spm_id && !uni.getStorageSync('mall_code')) {
					uni.reLaunch({
						url: "/pages/comm/404"
					})
					return
				}
				if (option.spm_id) {uni.setStorageSync('mall_code', option.spm_id)}
				if(option.token) {uni.setStorageSync(this.$tool.setStorageLocKey('token'), option.token)}
				this.$store.commit('SET_CODE', uni.getStorageSync('mall_code'));
				this.viewshow = true // 获取code在 实例化页面home 等组件 不然走接口 进入登录页 业务逻辑问题
			},
			webChatLoad() {
				let _this = this
				if (!uni.getStorageSync('mall_code')) {
					 uni.setStorageSync('mall_code', this.$appid)
					this.$store.commit('SET_CODE', uni.getStorageSync('mall_code'));					
				} 
				_this.viewshow = true
			},
			changeTabbar(e) {
				console.log('changeTabbar',e.name)
				this.$store.commit('SET_TabbarKey', e.name);
				// #ifdef H5 
				if(e.name == 'mall'){
					const params={
						aid:12
					}
					this.getUrl()					
				}
				// #endif
			},
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
				this.$api.thirdParty.jumpDealUrl.post({
					aid: this.a_id
				}).then((res) => {
					if (res.code == 0) {
						if (res.data.jump_url) {
							window.location.href  =res.data.jump_url
							this.$store.commit('SET_TabbarKey', 'home');
			
						}
					}
				})
			}
		}
	};
</script>

<style lang="scss" scoped>
	.tabbar {
		display: flex;
		justify-content: space-between;
		border-top: 2rpx solid #f5f5f5;

	}

	.tabbar-item {
		padding-top: 20rpx;
		line-height: 40rpx;
		width: 33.3%;
		text-align: center;
		font-size: 24rpx;
	}

	.tabbarimgred {
		font-size: 36rpx;
	}

	.tabbarimg {
		font-size: 36rpx;
		color: #333;
	}

	::v-deep .van-tabbar--fixed {
		position: fixed;
	}

	.custom-tabbar-item {
		flex: 1;
		text-align: center;
		line-height: 3;
	}

	::v-deep .van-tabbar-item {
		align-items: center;
		color: var(--tabbar-item-text-color, #646566);
		display: flex;
		flex-direction: column;
		font-size: var(--tabbar-item-font-size, 12px);
		height: 100%;
		justify-content: center;
		line-height: var(--tabbar-item-line-height, 1);
	}

	.cmain {
		color: var(--logincolor);
	}

	.cb7b6b6 {
		color: #b7b6b6;
	}
</style>
