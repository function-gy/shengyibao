<template>
	<view class="search-box">
		<uni-search-bar @confirm="confirm" :focus="true" radius="15" v-model="keywords" @input="input" @cancel="cancel"
			@clear="clear" placeholder="搜索">
		</uni-search-bar>
		<view class="history-box" v-if="hasHistory">
			<view class="top flex-space-between">
				<view class="title">
					搜索历史
				</view>
				<view class="icon icon-changyonggoupiaorenshanchu" @tap="clearHistory()"></view>
			</view>
			<view class="content">
				<view v-for="(item,index) in searchHistory" :key="index" class="item" @tap="selectItem(item)">{{item}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				keywords: '',
				placeholder: '搜索',
				searchHistory: [],
				hasHistory: true
			}
		},
		created() {
			if(this.hasHistory) {
				let _self = this
				uni.getStorage({
					key: 'mall_searchHistory',
					success: function(res) {
						_self.searchHistory = JSON.parse(res.data).slice(-10) //只取后10条
					},
					fail: function(res) {
						_self.searchHistory = []
					}
				});
			}
			
		},
		destroyed() {
			this.keywords = '';
		},
		methods: {
			clearHistory() {//清除历史
				uni.removeStorageSync('mall_searchHistory')
				this.searchHistory = []
			},
			confirm(val) {
				if(this.keywords) {
					if(this.hasHistory) {
						this.searchHistory = [...this.searchHistory, ...[this.keywords]]
						this.searchHistory = Array.from(new Set(this.searchHistory)) //去重
						uni.setStorage({
							key: 'mall_searchHistory',
							data: JSON.stringify(this.searchHistory),
						});
					}
				}
				
			},
			selectItem(val) {
				this.keywords = val
			},
			input(val) {
				// //console.log('input',val,this.keywords);
			},
			cancel(val) {
				// //console.log('cancel',val,this.keywords);
				this.keywords = ''
				uni.navigateBack({
					delta:1,
				})
			},
			clear(val) {
				// //console.log('clear',val,this.keywords);
				this.keywords = ''
			},
			focus(val) {
			},
			blur(val) {
			},
		},
	}
</script>

<style scoped lang="scss">
	.search-box {
		background-color: #fff;
		height: 100%;

		/deep/.uni-searchbar {
			padding: 16rpx 30rpx;

			.uni-searchbar__box {
				background: #F5F4F8;

				.uni-searchbar__box-icon-search {

					.uni-icons {
						font-size: 26rpx !important;
						color: var(--logincolor) !important;
					}

				}

				.uni-searchbar__box-search-input {
					font-size: 24rpx;
					color: var(--logincolor);
					text-align: left;
				}

				.uni-searchbar__box-icon-clear {
					.uni-icons {
						font-size: 26rpx !important;
					}

				}

			}
		}

		.history-box {
			padding: 30rpx;

			.top {
				.icon {
					font-size: 32rpx;
					color: #E4E4E4;

				}
			}

			.content {
				display: flex;
				flex-wrap: wrap;

				.item {
					background: #F5F4F8;
					border-radius: 8rpx;
					height: 60rpx;
					line-height: 60rpx;
					overflow: hidden;
					margin: 20rpx 20rpx 0rpx 0rpx;
					padding: 0 20rpx;
					font-size: 26rpx
				}
			}
		}
	}
</style>
