<template>
	<!-- 卡券列表 -->
	<view class="couCon bgf8" style="height: calc(100vh - 15vw); overflow: auto;">
		<view class="header bgfff f14 width100">
			<text class="allCon" :class="search.selId == 1 ? 'seleCol' : ''" @click="upSearch(1)">全部卡券</text>
			<text class="isDel" :class="search.selId == 2 ? 'seleCol' : ''" @click="upSearch(2)">已删除</text>
			<!-- 全部卡券底线 -->
			<view class="border" v-if="search.selId == 1">
				<view class="solid"></view>
				<view class="point br50"></view>
			</view>
			<!-- 已删除底线 -->
			<view class="b2" v-if="search.selId == 2">
				<view class="solid2"></view>
				<view class="point br50"></view>
			</view>
		</view>
		<scroll-view @scrolltolower="bottomRefresh()" scroll-y="true" style="height: calc(100vh - 15vw);">
			<view class="bigConBox bgfff width100" v-if="tableDate.length != 0">
				<!-- 卡券组件 -->
				<Card :tableDate="tableDate" @updateList="upSearch"></Card>
			</view>
			
			<view class="empty pcX f14 c9b9b" v-if="tableDate.length == 0">
				<img :src="baseUrl+'/storage/tksk_mall_img/kaquan/none-kaquan@3x.png'" />
				<view class="text-c">还没有卡券哦</view>
			</view>
			<!-- <u-loading-icon :show="ifRefresh" mode="semicircle"></u-loading-icon> -->
			<view v-if="tableDate.length > 0 && count == tableDate.length" class="noMore" style="padding:40rpx 0rpx;">暂无更多记录</view>
		</scroll-view>

		
	</view>
</template>

<script>
import Card from './common/card.vue';
export default {
	components: {
		Card
	},
	data() {
		return {
				baseUrl: this.$baseUrl,
			count: 0,
			ifRefresh: false,
			tableDate: [],
			search: {
				selId: 1, //1是全部 2是已删除
				page: 1,
				limit: 10
			}
		};
	},
	computed: {
	  scrollH: function () {
	    let sys = uni.getSystemInfoSync();
	    let winWidth = sys.windowWidth;
	    let winrate = 750 / winWidth;
	    let winHeight = parseInt(sys.windowHeight * winrate) - 120; //120是tabbar高度
	    return winHeight;
	  },
	},

	//下拉刷新
	onPullDownRefresh() {
		let _this = this;

		setTimeout(function() {
			_this.search.page = 1;
			_this.DataLoad();
			uni.stopPullDownRefresh();
		}, 1000);
	},
	// 上拉加载
	// onReachBottom: function() {
	// 	//触底开始下一页
	// 	if (this.tableDate.length >= this.count) {
	// 		return;
	// 	} else {
	// 		let that = this;
	// 		this.ifRefresh = true;
	// 		this.search.page += 1;
	// 		//发请求
	// 		this.DataLoad();
	// 	}
	// },
	onShow() {
		
	},
	created(){this.DataLoad();},
	methods: {
		bottomRefresh() {
			//console.log('xxx',this.tableDate.length, this.count);
			if (this.tableDate.length >= this.count) {
				return;
			} else {
				let that = this;
				this.ifRefresh = true;
				this.search.page += 1;
				//发请求
				this.DataLoad();
			}
		},
		upSearch(e) {
			this.search.selId = e;
			this.search.page = 1;
			this.tableDate = []
			this.DataLoad();
		},
		 DataLoad() {
			const params = {
				limit: 10,
				page: this.search.page,
				status: this.search.selId
			};
			//显示加载框
			uni.showLoading({
				title: '加载中'
			});
			 this.$api.coupon.memberCouponList.post(params).then(res => {
				if (res.code === 0) {
					this.count = res.data.total;

					if (this.ifRefresh) {
						this.tableDate = this.tableDate.concat(res.data.list);
					} else {
						this.tableDate = res.data.list;
					}

					if (this.tableDate.length >= this.count) {
						this.ifRefresh = false;
					}
				} else {
					this.list = [];
				}
				uni.hideLoading();
			});
		}
	}
};
</script>

<style scoped lang="scss">
.couCon {
	position: relative;
	height: 100%;
}

//头部两个选择按钮
.header {
	height: 92rpx;
	line-height: 92rpx;
	color: var(--logincolor);
}

.allCon {
	position: absolute;
	top: 0;
	left: 172rpx;
	color: #353535;
}

.isDel {
	position: absolute;
	top: 0;
	right: 172rpx;
	color: #353535;
}
.seleCol {
	color: var(--logincolor);
}
.b2 {
	position: absolute;
	right: 175rpx;
	top: 34rpx;
}

.solid2 {
	display: inline-block;
	width: 66rpx;
	height: 8rpx;
	background: linear-gradient(91deg, var(--logincolor-lighten-1), var(--logincolor));
	border-radius: 8rpx;
	margin-right: 6rpx;
}

.border {
	position: absolute;
	left: 175rpx;
	top: 34rpx;
}

.solid {
	display: inline-block;
	width: 98rpx;
	height: 8rpx;
	background: linear-gradient(91deg, var(--logincolor-lighten-1), var(--logincolor));
	border-radius: 8rpx;
	margin-right: 6rpx;
}

.point {
	display: inline-block;
	width: 8rpx;
	height: 8rpx;

	background: var(--logincolor);
}

// 卡券列表主体内容区域
.bigConBox {
	padding: 30rpx;
	margin-top: 20rpx;
}

//卡券空
.empty {
	top: 198rpx;
}

	//卡券空
	.empty {
		top: 198rpx;
	}

	.empty img {
		width: 375rpx;
		height: 206rpx;
		margin-bottom: 30rpx;
	}
</style>
