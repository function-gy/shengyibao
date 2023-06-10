<!-- 传入参数
    <SearchBox2
      v-model="myValue"  双向绑定的值
      :hasHistory="true" 是否显示搜索历史记录
      :clearText="true"  显示搜索 清除
      :placeholder="'加油站名称'" 
      @confirmEven="confirmEven" 
    ></SearchBox2>
-->

<!-- 

        <uni-search-bar
        @confirm="confirm" confirm 事件
        :focus="true"  聚焦
        radius="15"  
        v-model="keywords" 
        @input="changeInput" input改变触发
        @clear="clear"     清除按钮
        :placeholder="placeholder"  
        cancelButton="none"  隐藏uni取消按钮
        class="flex-item" 
      >
 -->

<template>
	<view class="search-box ">
		<view class="seBox flex-row aic">
			<u-search v-model="text" :color="color" @custom="changeInput" @search="changeInput" shape="round"
				clearabled :show-action="hidden" input-align="left" @clear="clear"></u-search>
		</view>
		<view class="history-box" v-if="hasHistory && searchHistory && searchHistory.length > 0">
			<view class="top flex-space-between">
				<view class="title"> 搜索历史 </view>
				<view class="icon icon-changyonggoupiaorenshanchu" @tap="clearHistory()"></view>
			</view>
			<view class="content">
				<view v-for="(item, index) in searchHistory" :key="index" class="item" @tap="selectItem(item)">
					{{ item }}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				type: [Number, String],
				default: '',
			},
			color: { //yanse
				type: String,
				default: () => "#333",
			},
			placeholder: { //搜索框文本
				type: String,
				default: () => "搜索",
			},
			hasHistory: { //是否显示搜索记录
				type: Boolean,
				default: () => true,
			},
			clearText: { //右侧显示 搜索还是清除 
				type: Boolean,
				default: () => true,
			},
		},
		data() {
			return {
				text: '',
				keywords: "",
				searchHistory: [],
				hidden: true,
			};
		},
		created() {
			if (this.hasHistory) {
				let _self = this;
				uni.getStorage({
					key: "mall_searchHistory",
					success: function(res) {
						_self.searchHistory = JSON.parse(res.data).slice(-10); //只取后10条
					},
					fail: function(res) {
						_self.searchHistory = [];
					},
				});
			}
		},

		destroyed() {
			this.keywords = "";
		},
		methods: {
			changeInput(event) {
				console.log(this.text)
				this.$emit("input", this.text);
				this.$emit("confirmEven", 4, 4);
			},
			//向历史记录里添加
			addHistory() {
				if (this.hasHistory) {
					this.searchHistory = [...this.searchHistory, ...[this.keywords]];
					this.searchHistory = Array.from(new Set(this.searchHistory)); //去重
					uni.setStorage({
						key: "mall_searchHistory",
						data: JSON.stringify(this.searchHistory),
					});
				}
			},

			clearHistory() {
				//清除历史
				uni.removeStorageSync("mall_searchHistory");
				this.searchHistory = [];
			},
			//确认 enter
			confirm() {
				if (this.keywords && this.keywords != "") {
					this.$emit("confirmEven", 4, 4);
					this.addHistory()
				}
			},
			// 选择历史记录里的
			selectItem(val) {
				this.keywords = val
				this.$emit("confirmEven", val, 3);
			},
			//清除按钮 x
			clear() {
				this.keywords = "";
				this.$emit("confirmEven", 2, 2);
			},
			//点击搜素 清除
			clickText(e) {
				if (e == 1) {
					this.$emit("confirmEven", 1, 1);
					this.addHistory()
				} else {
					this.keywords = "";
					this.hidden = false;
					this.$emit("confirmEven", 0, 0);
				}
			},

			// 取消文字 0 搜索文字 1 清除按钮2  点击历史记录 3 回车enter 4 
			// 聚焦
			focus() {
				this.hidden = true
			},
			// 失去焦点
			blur() {},
		},


	};
</script>

<style scoped lang="scss">
	.searchBtn {
		margin-right: 30rpx;
	}

	.uni-searchbar {
		padding: 16rpx 30rpx;

		.uni-searchbar__box {
			background: #f5f4f8;
			height: 60rpx;

		}
	}

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

	.history-box {
		padding: 30rpx;

		.top {
			.icon {
				font-size: 32rpx;
				color: #e4e4e4;
			}
		}

		.content {
			display: flex;
			flex-wrap: wrap;

			.item {
				background: #f5f4f8;
				border-radius: 8rpx;
				height: 60rpx;
				line-height: 60rpx;
				overflow: hidden;
				margin: 20rpx 20rpx 0rpx 0rpx;
				padding: 0 20rpx;
				font-size: 26rpx;
			}
		}
	}
</style>
