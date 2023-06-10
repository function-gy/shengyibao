<template>
	<view class="center-cut-menu">
		<!-- 金刚区 -->
		<!-- 多行排列 -->
		<view class="scroll-view" v-if="allData2.jgqtype == '多行排列'" style="padding: 0 30rpx;">
			<u-scroll-list :indicatorActiveColor="logincolor">
				<view class="scroll-list">
					<view class="scroll-list__line" v-for="(item, index) in dataList" :key="index">
						<view class="scroll-list__line__item" v-for="(item1, index1) in item" :key="index1"
							@tap="toCategory(item1, index)">
							<image class="scroll-list__line__item__image" :src="item1.url" mode="">
							</image>
							<text class="scroll-list__line__item__text">{{ item1.name }}</text>
						</view>
					</view>
				</view>
			</u-scroll-list>
		</view>
		<!-- 单行分页展示 -->
		<view v-else style="padding: 0 30rpx;">
			<u-scroll-list indicatorColor="#fff0f0" :indicatorActiveColor="logincolor">
				<view class="scroll-list" style="flex-direction: row;padding-left: 30rpx;">
					<view class="scroll-list__goods-item" v-for="(item, index) in dataList" :key="index"
						@tap="toCategory(item, index)">
						<image class="scroll-list__goods-item__image" :src="item.url"></image>
						<text class="scroll-list__goods-item__text">{{ item.name }}</text>
					</view>
				</view>
			</u-scroll-list>

		</view>
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
				logincolor: '',
			};
		},
		created() {
			this.createdata();
			this.logincolor = this.$tool.getStorageLocCode('logincolor')? this.$tool.getStorageLocCode('logincolor') : '#9784FF'
		},
		mounted() {},
		methods: {
			// 处理数据，找到金刚区数据，展示check=true的
			createdata() {

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
				//   多行,转二维数组
				if (this.allData2.jgqtype == "多行排列") {
					this.dataFilter();
				}
			},

			// []To[[],[]]
			dataFilter() {
				let objArray = this.dataList;
				let len = objArray.length;
				let n = 8; //每行显示5个
				let lineNum = len % n === 0 ? len / n : Math.floor(len / n + 1);
				let res = [];
				for (let i = 0; i < lineNum; i++) {
					let temp = objArray.slice(i * n, i * n + n);
					res.push(JSON.parse(JSON.stringify(temp)));
				}
				this.dataList = res;
			},
			toCategory(val, index) {
				if (val.is_target == 2 && val.jump_url) {
					console.log(val.jump_url);
					//内链
					uni.navigateTo({
						url: val.jump_url,
						success: function(res) {},
						fail: function(res) {},
					});
				} else if (val.is_target == 1) {
					this.getAppUrl(val);
				} else {
					uni.showToast({
						title: "暂未开放",
						icon: "none",
					});
				}
			},
			getAppUrl(val) {
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
							uni.navigateTo({
								url: "/pages/home/components/webView?url=" +
									encodeURIComponent(res.data.jump_url),
							});

						}
					}
				});
			},
		},
	};
</script>
<style scoped lang="scss">
	.center-cut-menu {
		width: 100%;
		box-sizing: border-box;
		position: relative;
		z-index: 99;
	}

	.scroll-list {
		display: flex;
		flex-direction: column;
		text-align: center;
	}

	.scroll-list__goods-item {
		margin-right: 40rpx;
	}

	.scroll-list__goods-item:last-child {
		margin-right: 0;
	}

	.scroll-list__goods-item__image {
		width: 100rpx;
		height: 110rpx;
	}

	.scroll-list__goods-item__text {
		color: #606266;
		text-align: center;
		font-size: 24rpx;
		margin-top: 10rpx;
	}

	.scroll-list__line {
		display: flex;
		flex-direction: row;
		margin-top: 20rpx;
	}

	.scroll-list__line__item {
		margin-right: 20rpx;
		display: flex;
		flex-direction: column;

	}

	.scroll-list__line__item:last-child {
		margin-right: 0;
	}

	.scroll-list__line__item__image {
		width: 100rpx;
		height: 110rpx;
	}

	.scroll-list__line__item__text {
		margin-top: 10rpx;
		color: #606266;
		font-size: 24rpx;
		text-align: center;
	}

	.mr0 {
		margin-right: 0 !important;
	}
</style>
