<!-- 充值记录-->
<template>
	<view class="upstage">
		<!-- 日期选择 -->
 <view class="zhiding">
      <selectDate class="selecetdate" @getDate="searchDate"></selectDate>
    </view>
		<!-- <selectDate class="selecetdate" @getDate="searchDate"></selectDate> -->
		<view class="listCont bgf8">
			<!-- 数据为空 -->

			<!-- <view v-if="logDate.length == 0">
				<view class="m-l-15 f12">
					<text class="f24" >{{ ymoth.slice(ymoth.length-2,ymoth.length) }}</text>
					<text class="mon">月</text>
					<text class="c999" style="margin-left: 6rpx;">/ {{ ymoth.slice(0,4)}}年</text>
				</view>
			</view> -->

			<view class="emptyImg pcX" v-if="logDate.length == 0">
				<img :src="baseUrl+'/storage/tksk_mall_img/phoneCharge/none-shuju@3x.png'"/>
				<view class="text pcX f14 c9b9b">暂无数据</view>
			</view>
			<monthOrderall v-if="logDate && logDate.length>0" :logDate="logDate" :moneyType="moneyType"
				:imgsrc="imgsrc"></monthOrderall>
			<view v-if="tableList.length>0 && count == tableList.length" class="noItem noMore ">暂无更多记录</view>
			<u-loading-icon :show="ifRefresh" mode="semicircle" color="#3bd41c"></u-loading-icon>
		</view>
	</view>
</template>

<script>
	import selectDate from "@/pages/comm/datePicker/selectDate.vue";
	import monthOrderall from "@/pages/comm/payRank/monthOrderall.vue";
	export default {
		components: {
			selectDate,
			monthOrderall
		},
		data() {
			return {
				baseUrl: this.$baseUrl,
				ymoth:'',
				count: 0,
				search: {
					page: 1,
					limit: 20,
					start_time: '',
					end_time: '',
				},
				ifRefresh: false,
				imgsrc:this.$baseUrl+"/storage/tksk_mall_img/kaquan/kaquan.png",
				moneyType: "coupon",
				logDate: [],
				tableList: []
			};
		},
		onLoad(e) {},
		//下拉刷新
		onPullDownRefresh() {
			this.search.page = 1;
			this.tableList = [];
			this.DataLoad();
			setTimeout(function() {
				uni.stopPullDownRefresh();
			}, 1000);
		},
		onReachBottom: function() {
			this.ymoth = this.logDate[this.logDate.length-1].letter
			//触底开始下一页
			if (this.tableList.length >= this.count) {
				return;
			} else {
				let that = this;
				this.ifRefresh = true;
				this.search.page += 1;
				//发请求
				this.DataLoad();
				setTimeout(function() {
					uni.stopPullDownRefresh();
					that.ifRefresh = false;
				}, 1000);
			}
		},
		onShow() {

		},
		created() {
			this.DataLoad();
		this.ymoth = this.$tool.nowMonth()
			
		},
		methods: {
			onPageScroll(e) {
			if(e.scrollTop==0) {
				this.ymoth = this.logDate[0].letter
			}
		},
			// 跳转
			searchDate(e) {
				this.ymoth = e
				// 月份选择器
				this.tableList=[]
				this.search.page = 1;
				this.search.start_time = this.$tool.getMonthDate(e).start_time;
				this.search.end_time = this.$tool.getMonthDate(e).end_time;
				this.DataLoad()
			},

			 DataLoad() {
				const params = {
					limit: 15,
					page: this.search.page,
					start_time: this.search.start_time,
					end_time: this.search.end_time,
				};
				//显示加载框
				uni.showLoading({
					title: '加载中'
				})
				 this.$api.coupon.memberCouponOrderList.post(params).then((res) => {
					if (res.code === 0) {
							this.tableList = this.tableList.concat(res.data.list);
						this.tableList = this.tableList.map((item, index) => {
							return {
								...item,
								month: item.create_time.slice(0, 7),
							};
						})
						this.count = res.data.count
						this.mapList(this.tableList)
					} else {
						this.logDate = [];
						this.tableList = []
					}
					uni.hideLoading()
				});
			},
			mapList(arr) {
				this.logDate = []
				arr.map((item, index) => { // 转换成列表展示所需的格式
					let first = item.month;

					if (!this.logDate.length || (this.logDate.length && (this.logDate[this.logDate.length - 1]
							.letter !=
							first))) {
								this.ymoth = first
						this.logDate.push({
							letter: first,
							list: [],
						})
					}
					this.logDate[this.logDate.length - 1].list.push(item);
				})
			},
		},
	};
</script>

<style lang="scss" scoped>
	.upstage {
		position: relative;
		margin: 0;
		height: 100%;
	}

	.listCont {
		.emptyImg {
			top: 280rpx;

			img {
				width: 378rpx;
				height: 208rpx;
			}

			.text {
				margin-top: 30rpx;
			}
		}
	}
.zhiding {
  .selecetdate { 
	position: fixed;  
    right: 15rpx;
    
	top: -25rpx;
	/* #ifdef H5 */
	top: 20rpx;
	/* #endif */
	z-index: 1200;
  }
}
	.noItem {
		padding: 30rpx 0;
	}
</style>
