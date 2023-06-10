<template>
	<view class="height100 bgf8">
		<view id="header-box1" class="header-box p-10 bgfff">

			<searchBox2 v-model="myValue" :hasHistory="false" :clearText="false" :placeholder="'搜索品牌优惠'"
				@confirmEven="confirmEven" :color="configthemp.logincolor"></searchBox2>
		</view>

		<view class="bgf8" style="padding-bottom: 30rpx; padding-top: 100rpx;">
			<view class="coupon-list m-1" v-if="couponData && couponData.length>0">
				<!-- 循环渲染的 放这里-->
				<couponList :couponData="couponData"></couponList>

			</view>
			<view v-else class="noList">
				
				<img :src="baseUrl+'/storage/tksk_mall_img/app/none-search@2x.png'" />
				<view class="font999" style="margin-top: 30rpx">
					没有搜索到结果
				</view>
			</view>

		</view>

	</view>
</template>
<script>
	import couponList from './common/couponList.vue'
	import searchBox2 from '@/components/searchBox2.vue';
	export default {
		name: 'couponCategory',
		components: {
			couponList,
			searchBox2
		},
		data() {
			return {
				baseUrl: this.$baseUrl,
				myValue: null,
				keywords: '',
				totalcount: 0,
				ifBottomRefresh: false,
				loadmore: 'more',
				current: 1,
				couponData: [],
				headerHeight: 0,
				oldList: []
			}
		},
		created() {

		},
		mounted() {
			this.getList()
		},

		computed: {
			configthemp() {
				return this.$store.state.configthemp;
			},
		},
		methods: {
			//  e: 取消文字 0; 搜索文字 1; 清除按钮 2;  点击历史记录 3;  回车enter 4;
			confirmEven(val, e) {
				this.getList()
			},
			// },

			getList() {
				const params = {
					brand_name: this.myValue
				}
				uni.showLoading({
					title: '加载中'
				})
				this.$api.coupon.couponHome.post(params).then((res) => {
					if (res.code == 0) {
						this.oldList = res.data
						this.couponData = res.data
					} else {
						this.couponData = []
					}
				});
				setTimeout(function() {
					uni.hideLoading()
				}, 1000);
			}
		}
	}
</script>
<style scoped lang="scss">
	.header-box {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 10;
	}

	.couponCategory {

		.coupon-list {
			.coupon-item {
				image {
					height: 120rpx;
				}
			}
		}
	}

	.noList {
		text-align: center;
		font-size: 28rpx;
		margin-top: 200rpx;

		img {
			width: 375rpx;
			height: 206rpx;
		}
	}
</style>
