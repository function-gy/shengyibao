<template>
	<view class="center-cut-menu">
		<!-- 金刚区 -->
		<!-- 多行排列 -->
		<view class="scroll-view" v-if="allData2.jgqtype == '多行排列'">
			<view class="scroll-item" v-for="(row, index) in dataList" :key="index" @tap="toCategory(row, index)">
				<view class="img">
					<image v-if="row._app_icon" :src="row._app_icon[0]"></image>
				</view>
				<view class="text">{{ row.name }}</view>
			</view>
		</view>
		<!-- 单行分页展示 -->
		<uni-swiper-dot class="scroll-view" @clickItem="clickItem" :info="dataList" :current="current" mode="round"
			field="content" :dots-styles="dotsStyles" v-else>
			<swiper class="swiper-box" @change="change" :current="swiperDotIndex" style="height: 190rpx">
				<swiper-item v-for="(item, index) in dataList" :key="index">
					<view class="scroll-item" v-for="(row, index) in dataList[index]" :key="index"
						@tap="toCategory(row, index)">
						<view class="img">
							<image v-if="row._app_icon" :src="row._app_icon[0]"></image>
						</view>
						<view class="text">{{ row.name }}</view>
					</view>
				</swiper-item>
			</swiper>
		</uni-swiper-dot>
		<view class="cl"></view>
	</view>
</template>

<script>
	export default {
		props: ["allData"],
		data() {
			return {
				dataList: [], //check=true的数据
				allData2: [], //全部
				swiperDotIndex: 0,
				current: 0,
				dotsStyles: {
					backgroundColor: "#dcdcde",
					color: "#fff",
					border: "none",
					selectedBackgroundColor: "#9784FF",
					selectedBorder: "none",
				},
			};
		},
		created() {
			this.createdata();
		},
		mounted() {},
		methods: {
			// 处理数据，找到金刚区数据，展示check=true的
			createdata() {
				console.log(this.allData);
				//console.log(this.allData,'alld');
				if (this.allData && this.allData.length > 0) {
					this.allData.filter((e) => {
						if (e.components == "jgq") {
							this.allData2 = e.template;
						}
					});
				}
				if (this.allData2.datajson && this.allData2.datajson.length > 0) {
					this.dataList = this.allData2.datajson.filter((e) => {
						return e.checked;
					});
				} else {
					this.dataList = [];
				}
				//   单行分页展示,转二维数组
				if (this.allData2.jgqtype != "多行排列") {
					this.dataFilter();
				}
			},

			// []To[[],[]]
			dataFilter() {
				let objArray = this.dataList;
				let len = objArray.length;
				let n = 5; //每行显示5个
				let lineNum = len % 5 === 0 ? len / 5 : Math.floor(len / 5 + 1);
				let res = [];
				for (let i = 0; i < lineNum; i++) {
					let temp = objArray.slice(i * n, i * n + n);
					res.push(JSON.parse(JSON.stringify(temp)));
				}
				this.dataList = res;
			},
			change(e) {
				this.current = e.detail.current;
			},
			toCategory(val, index) {
				console.log(val, index)
				if (val.is_target == 2 && val.jump_url ) {
					//console.log(val);
					//内链
					uni.navigateTo({
						url: val.jump_url,
						success: function(res) {
							// //console.log(res);
						},
						fail: function(res) {
							//console.log("fail", res);
						},
					});
				} else if (val.is_target == 1) {
					// 外链，全接了，下面的判断是演示版本隐藏测试环境 (加油，商旅，海旅，视听会员)
					// console.log(val.aid);
					// if ([7,15,16,17].includes(val.aid)) {
					// 	  uni.showToast({
					// 	    title: "该模块暂未开放",
					// 	    icon: "none",
					// 	  });
					// } else {
					this.getAppUrl(val);
					// }
				} else {
					uni.showToast({
						title: "暂未开放",
						icon: "none",
					});
				}
			},
			goSupply() {
				uni.navigateTo({
					url: '/pages/tabBar/mall/index'
				});
			},
			getAppUrl(val) {
				console.log(uni.getStorageSync("user_latitude"))
				let params = {
					aid: val.aid,
					product_type: val.app_module == "mtfx" ? "mt_waimai" : "",
					latitude: val.app_module == "ddfx" ?
						uni.getStorageSync("user_latitude").toString() : "",
					longitude: val.app_module == "ddfx" ?
						uni.getStorageSync("user_longitude").toString() : "",
				};
				this.$api.thirdParty.jumpDealUrl.post(params).then((res) => {
					if (res.code == 0) {
						if (res.data.jump_url) {
							// #ifdef H5 
							window.location.href = res.data.jump_url
							// #endif
							// #ifdef MP-WEIXIN || APP
							uni.navigateTo({
								url: "/pages/home/components/webView?url=" +
									encodeURIComponent(res.data.jump_url),
							});
							// #endif
						}
					}
				});
			},
			getQueryVariable(url, variable) {
				//获取路由参数
				let query = url.split("?")[1];
				let params = query.split("&");
				for (let i = 0; i < params.length; i++) {
					let dict = params[i].split("=");
					if (dict[0] == variable) {
						return dict[1];
					}
				}
				return false;
			},
		},
	};
</script>
<style scoped lang="scss">
	.center-cut-menu {
		width: 100%;
		// height: 150rpx;
		box-sizing: border-box;
		position: relative;
		z-index: 99;

		.scroll-view {
			// height: 150rpx;
			// white-space: nowrap;

			.scroll-item {
				// height: 150rpx;
				margin-bottom: 12rpx;
				width: 20%;
				padding: 0 20rpx;
				display: inline-block;
				text-align: center;

				.img {
					width: 100%;
					display: flex;
					justify-content: center;
					z-index: 99;

					image {
						width: 94rpx;
						height: 106rpx;
					}
				}

				.text {
					width: 100%;
					display: flex;
					justify-content: center;
					font-size: 24rpx;
				}
			}
		}
	}
</style>
