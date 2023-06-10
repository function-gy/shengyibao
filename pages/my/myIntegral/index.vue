<template>
	<view :style="myStyle">
		<view class="my-integral">
			<!-- <movable-area class="fixed-box">
			<movable-view class="fixed-button" direction="vertical" :inertia="true" :x="600">
				<view class="goButton">
					<text class="icon icon-tubiao_yue-chongzhi" style="font-size: 28rpx;margin-right: 4rpx;"></text>
					返回首页
				</view>
			</movable-view>
		</movable-area> -->
			<view class="bigImg width100"></view>
			<view class="residue f12" v-if="userInfo.banalce">
				当前{{ $tool.getMoneyUnit() }}
				<view class="f28 fw500 residuenum">{{ foumartNum(userInfo.banalce)}}</view>
			</view>
			<view class="btnBox">
				<view class="width100 flex-space-around aic">
					<view class="flex-column-center aic" style="width: 49%">
						<view class="f15 aic tabItem" @tap="goHome">
							<image :src="baseUrl+'/storage/tksk_mall_img/user/hui-shou-ye.png'"></image>
							<view style="display: inline-block; margin-left: 10rpx"></view>回首页
						</view>
					</view>
					<!-- 分割线 -->
					<view class="bgdc" style="width: 2rpx; height: 82rpx"></view>
					<view class="flex-column-center aic" style="width: 49%">
						<view class="f15 aic tabItem" @tap="goButton">
							<image :src="baseUrl+'/storage/tksk_mall_img/user/chognzhi.png'"></image>
							<view style="display: inline-block; margin-left: 10rpx"></view>去充值
						</view>
					</view>
				</view>
			</view>
			<view class="jfBox bgfff br10">
				<view class="datePick">
					<select-date @getDate="searchDate"></select-date>
				</view>

				<view class="f17 fw500" style="margin-bottom: 38rpx">交易明细</view>

				<view class="selBtn f15 m-b-10">
					<view class="all" @tap="getIntegral()">
						<view :class="search.mode != 1 && search.mode != 2 ? 'cmotif' : ''">
							<text>全部</text>
						</view>
						<view class="border" v-if="search.mode != 1 && search.mode != 2">
							<view class="solid"></view>
							<view class="point"></view>
						</view>
					</view>

					<view class="in" @tap="getIntegral(1)">
						<view :class="search.mode == 1 ? 'cmotif' : ''">
							<text>收入</text>
						</view>
						<view class="border" v-if="search.mode == 1">
							<view class="solid"></view>
							<view class="point"></view>
						</view>
					</view>

					<view class="out" @tap="getIntegral(2)">
						<view :class="search.mode == 2 ? 'cmotif' : ''"><text>支出</text>
						</view>
						<view class="border" v-if="search.mode == 2">
							<view class="solid"></view>
							<view class="point"></view>
						</view>
					</view>
				</view>
				<view class="jfItem flex-column-center" v-for="(item, index) in tableDate" :key="index">
					<view class="m-b-10 flex-space-between f14" style="align-items: flex-end">
						<text class="cardName">{{ item.business_name }}</text>
						<text :class="item.mode == 2 ? '' : 'cred'" class="f13" style="">
							<text v-if="item.mode == 1">+</text> {{ item.price }}
						</text>
					</view>
					<view class="f12 c999">{{ item.create_time }}</view>
				</view>
				<view class="noItem noMore" style="margin-top: 30rpx" v-if="tableDate.length >= count">
					暂无更多记录</view>
			</view>
			<u-loading-icon :show="ifRefresh" mode="semicircle" color="#3bd41c"></u-loading-icon>
			<!-- <view class="footer fixBottom">
					<u-button class='bottom-button' type="primary" text="确认" @tap="pay"></u-button> 
					<view class="primybtn"  @tap="goButton"><text>立即充值</text></view>
				</view> -->
		</view>
	</view>
</template>

<script>
	import selectDate from "../../comm/datePicker/selectDate.vue";
	export default {
		components: {
			selectDate,
		},
		data() {
			return {
				baseUrl: this.$baseUrl,
				userInfo: [],
				ifRefresh: false,
				count: 0,
				search: {
					page: 1,
					limit: 20,
					start_time: "",
					end_time: "",
				},
				tableDate: [],
			};
		},
		computed: {
			myStyle() {
				return this.$store.state.myStyle;
			},
		},
		created() {
			this.getBalance();
			this.userInfo = this.$tool.getStorageLocCode('mall_authInfo')
		},
		onLoad(option) {
			option.mode == 2 ? (this.search.mode = Number(option.mode)) : "";
			uni.setNavigationBarTitle({
				title: "我的" + this.$tool.getMoneyUnit(),
			});
		},
		onReady() {},
		onShow() {},

		methods: {
			foumartNum(val) {
				//0和整数
				let r = /^([0]|[1-9][0-9]*)$/;
				if (r.test(Number(val))) {
					return Number(val);
				} else {
					return Number(val).toFixed(2);
				}
			},
			// 返回首页
			goHome() {
				this.$store.commit('SET_TabbarKey', 'home')
				uni.setStorageSync('tabbarKey', 'home')
				uni.reLaunch({
					url: '/pages/tabbar/tabbar'
				});
			},
			// 立即充值
			goButton() {
				// #ifdef H5 
				var returnUrl =
					`${document.location.protocol}//${window.location.host}` +
					"/mall/mall.html#/pages/tabBar/user/myIntegral/index";
				// #endif
				// #ifdef MP-WEIXIN	|| APP			
				var returnUrl = ""
				// #endif
				uni.navigateTo({
					url: "/pages/comm/payRecharge/index?oldUrl=" +
						encodeURIComponent(returnUrl),
				});
			},
			getAuthInfo() {
				let _this = this;
				this.$api.common.authInfo
					.post({
						code: uni.getStorageSync("mall_code") || this.$tool.getCurCode(),
					})
					.then((res) => {
						if (res.code == 0) {
							// #ifdef MP-WEIXIN || APP
							uni.setStorage({
								key: 'mall_authInfo',
								data: res.data,
								success: function() {}
							});
							// #endif
							// #ifdef H5 
							uni.setStorage({
								key: this.$tool.setStorageLocKey('mall_authInfo'),
								data: res.data,
								success: function() {}
							});

							// #endif
							this.userInfo = this.$tool.getStorageLocCode('mall_authInfo');
						}
					});
			},
			getBalance() {
				uni.showLoading({
					title: "加载中",
				});
				this.$api.userinfo.memberBalance.post(this.search).then((res) => {
					if (res.code == 0) {
						this.tableDate = this.tableDate.concat(res.data.list);
						this.count = res.data.count;
					} else {
						this.tableDate = [];
					}
					uni.hideLoading();
				});
			},

			//日期
			searchDate(e) {
				this.search.page = 1;
				this.tableDate = [];
				this.search.start_time = this.$tool.getMonthDate(e).start_time;
				this.search.end_time = this.$tool.getMonthDate(e).end_time;
				this.getBalance();
			},
			//切换收入指出
			getIntegral(e) {
				this.search.page = 1;
				this.search.mode = e;
				this.tableDate = [];
				this.getBalance();
			},
			//下拉刷新
			onPullDownRefresh() {
				this.search.page = 1;
				this.tableDate = [];
				delete this.search.mode;
				this.getBalance();
				this.getAuthInfo();
				setTimeout(function() {
					uni.stopPullDownRefresh();
				}, 1000);
			},
			//触底开始下一页
			onReachBottom: function() {
				if (this.tableDate.length >= this.count) {
					return;
				} else {
					this.ifRefresh = true;
					let that = this;
					this.search.page += 1;
					this.getBalance();
					setTimeout(function() {
						uni.stopPullDownRefresh();
						that.ifRefresh = false;
					}, 1000);
				}
			},
		},
	};
</script>

<style scoped lang="scss">
	page {
		background-color: #f8f8f8;
	}

	.my-integral {
		padding-bottom: 140rpx;
	}

	.bigImg {
		/* #ifdef MP-WEIXIN  ||APP */
		background-image: url("https://shengyibao.tongkask.com/storage/tksk_mall_img/user/jifen-bg@2x.png");
		/* #endif */
		/* #ifdef H5  */
		background-image: url("/storage/tksk_mall_img/user/jifen-bg@2x.png") no-repeat;
		/* #endif */
		height: 294rpx;
		background-size: 750rpx 294rpx;
	}

	.residue {
		position: absolute;
		top: 50rpx;
		// left: 60rpx;
		left: 50%;
		transform: translateX(-50%);
		text-align: center;
	}

	.residuenum {
		font-size: 60rpx;
		font-family: MiSans;
		font-weight: 500;
		color: #353535;
	}

	//回首页 去充值
	.btnBox {
		width: 690rpx;
		height: 119rpx;
		margin: 0 auto;
		background: #ffffff;
		box-shadow: 0rpx 0rpx 34rpx 6rpx rgba(122, 122, 122, 0.1);
		border-radius: 20rpx;
		margin-top: -110rpx;
		margin-bottom: 30rpx;
		display: flex;
	}

	.jfBox {
		width: 690rpx;
		margin: 0 auto;
		// margin-top: -116rpx;
		padding: 48rpx 30rpx 30rpx 30rpx;
	}

	.datePick {
		position: absolute;
		top: 415rpx;
		right: 60rpx;
	}

	.selBtn>view {
		display: inline-block;
		margin-right: 70rpx;
		position: relative;
		width: 68rpx;
	}

	.border {
		position: absolute;
		top: 24rpx;
		left: 0;
	}

	.solid {
		display: inline-block;
		width: 48rpx;
		height: 8rpx;
		background: linear-gradient(91deg,
				var(--logincolor-lighten-1),
				var(--logincolor));
		border-radius: 8rpx;
		margin-right: 6rpx;
	}

	.point {
		display: inline-block;
		width: 8rpx;
		height: 8rpx;
		border-radius: 50%;
		background-color: var(--logincolor);
	}

	.jfItem {
		height: 130rpx;
		border-bottom: 2rpx solid #f3f3f3;
		box-sizing: border-box;
	}

	.tabItem {
		image {
			width: 43rpx;
			height: 37rpx;
		}
	}
</style>
