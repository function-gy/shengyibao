<template>
	<view class="couponDetail bgf8" :style="myStyle" v-if="couponData.brand_name">
		<!-- 滚动部分 -->
		<view id="part1Id" class="bgfff detail m-b-10">
			<image class="detail_img" lazy-load='true' :src='couponInfo'></image>
			<view class="cardInfowrap">
				<view class="card-name">
					<!-- {{brandInfo.name}} -->
					{{couponData.brand_name }} {{ couponData.coupon_name}}
					<view class="coupon-length">
						<view>{{faceList.length}} 种面值</view>
					</view>
				</view>
				<view class="flex-row">
					<view class="midicons" v-for="(item,index) in couponData.use_rule" :key="index">
						<text class="icon icon-dui" v-if="item.support === 1"></text>
						<text class="icon icon-cuo" style="color: #FE7841;" v-else></text>
						<text>{{item.name}}</text>
					</view>
				</view>
			</view>
			<view class="faceList">
				<view style="overflow: hidden;">
					<view class="face-item" v-for="(item, index) in faceList" :class="{ active: item.cardDisable }"
						:key="index" @tap="getCouponInfo(item,index)">
						<view class="amount">
							{{Number(item.amount)}}元
						</view>
					</view>
				</view>

			</view>
		</view>
		<u-sticky offset-top="0">
			<view class="classify" id="aimId0">
				<view :class="introIndex==0 ? 'classify_item active' :'classify_item'" @tap="changeClassify_item(0)">
					<text>兑换流程</text>
					<view class="border-line" v-if="introIndex == 0">
						<view class="solid"></view>
						<view class="point"></view>
					</view>
				</view>
				<view :class="introIndex==1 ? 'classify_item active' :'classify_item'" @tap="changeClassify_item(1)">
					<text>兑换须知</text>
					<view class="border-line" v-if="introIndex == 1">
						<view class="solid"></view>
						<view class="point"></view>
					</view>
				</view>
			</view>
		</u-sticky>

		<!-- 信息主体 -->

		<view class="Infobody m-b-10">
			<view class="target-fix" id="part2Id"></view>
			<view class="infoimg bgfff m-b-10" id="imgBox">
				<image lazy-load='true' mode='widthFix' :src='brandInfo.exchange_process'></image>
				<view class="ptblank" id="aimId1"></view>
			</view>
			<view style="height:20rpx;background-color: #f8f8f8;"> </view>
			<view class="infoWrap">
				<view class="part1 bgfff m-b-10">
					<view class="smalltit" id='contentBox'>兑换须知</view>
					<view class="sayinglist flex-row" v-for="(item,index) in exchange_info" :key="index">
						<view style="width:150rpx;transform: scale(0.95);font-size: 20rpx;" class="text-l">
							<text class="dhtitle">{{item.name}}</text>
						</view>
						<view class="dhcontent  flex-item">
							<text>{{item.content}}</text>
						</view>
					</view>
				</view>
				<view style="height:20rpx;background-color: #f8f8f8;"> </view>
				<view class="bgfff part2 m-b-20">
					<view class="smalltit">核销须知</view>

					<view class="sayinglist flex-row" v-for="(item,index) in writeoff_notice" :key="index">
						<view style="width:150rpx;transform: scale(0.95);font-size: 20rpx;" class="text-l">
							<text class="dhtitle">{{item.name}}</text>
						</view>
						<view class="dhcontent  flex-item">
							<text>{{item.content}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- </scroll-view> -->
		<!-- 		<view class="btncolorwrap">

			<view class="primybtn" @click="goPay"><text>立即兑换</text></view>
		</view> -->
		<view class="bottom-box br-tl-tr-10">
			<view :class="orderId? 'primybtn':'dis-btn'" @click="goPay"><text>立即兑换</text></view>
		</view>
		<u-popup :show="popupShow" :round="10" mode="bottom" @close="popupClose" @open="popupOpen">
			<view class="popup-bottom">
				<view class="header">
					<view class='title flex-row' style="flex: 1;">
						<image class="detail_img2" mode="heightFix" lazy-load='true' :src='couponInfo'></image>

						<view style="margin-left: 20rpx;">{{form.price}}{{$tool.getMoneyUnit()}}</view>
					</view>
					<view class='close'>
						<view class="icon icon-guanbi" @tap="popupClose"></view>
					</view>
				</view>
				<view class="content">

					<view class="flex-space-between">
						<view class="label">
							数量
						</view>
						<view >
							<u-number-box
							:disabled="!form.price"
							    v-model="Ordernumber"
							    button-size="26"
							   integer
								:min="1" :max="couponData.free_num> 10 ? 10 : couponData.free_num"
							></u-number-box>
						
							<view>
								<view class="f12 u-warning" v-if="Ordernumber > couponData.free_num">
									该卡券库存不足
								</view>
								<view class="f12 u-warning" v-else-if="Ordernumber === couponData.free_num">
									该卡券当前库存{{couponData.free_num}}张
								</view>
								<view class="f12 u-warning" v-else-if="couponData.free_num>=10 && Ordernumber >= 10">
									该卡券最多购买10张
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="footer">
					<!-- <u-button class='bottom-button' type="primary" text="确认" @tap="pay"></u-button> -->
					<view v-if="couponData.free_num && Ordernumber" class="primybtn" @click="pay"><text>立即兑换</text>
					</view>
					<view v-else class="dis-btn"><text>立即兑换</text></view>

				</view>
			</view>
		</u-popup>
	</view>
</template>

<script>
	export default {
		name: 'couponDetail',
		components: {},
		data() {
			return {
				imgTop: 0, //图片距离顶部的距离
				contentTop: 0, //文本距离顶部的距离
				Ordernumber: 1, //数量
				brandInfo: [], //卡券信息
				search: {
					brand_id: 0
				},
				introIndex: 0,
				couponInfo: '',
				faceList: [], //卡券面值
				form: {},
				popupShow: false,
				exchange_info: [], //兑换须知
				writeoff_notice: [], //核销须知
				listCount: '',
				jfScoped: '',
				orderId: 0,
				orderPrice: 0,
				couponData: {}, //卡券面值详情,
			}
		},
		computed: {
			myStyle() {
				return this.$store.state.myStyle;
			},
		},
		onLoad(e) {
			this.search.brand_id = e.id
		},
		watch: {
			introIndex(val) {
				this.aimId = "aimId" + val;
			}
		},

		created() {
			this.getList()
		},
		mounted() {},
		methods: {
			// 锚点跳转
			async changeClassify_item(val) {
				// this.RectFn()
				this.introIndex = val;
				let top = 0;
				if (val == 0) {
					top = await this.topnum("#part2Id");

				} else {
					top = await this.topnum("#aimId1");
				}
				uni.pageScrollTo({
					scrollTop: top,
					duration: 200,
				})
			},
			topnum(name) {
				return new Promise((resolve, reject) => {
					const query = uni.createSelectorQuery().in(this).select(name);
					query.boundingClientRect(data => {
						resolve(data.top)
					}).exec();
				})
			},

			goPay() {
				this.popupShow = true
			},
			popupOpen() {
				this.Ordernumber = 1
			},

			popupClose() {
				this.popupShow = false;
			},

			pay() {
				if (!this.form.price) {
					return
				} else {
					// 跳转带参,{卡券id,卡券价格,卡券积分，购买数量,卡券名字,卡券图片，}
					let that = this;
					//console.log('that.couponData',that.couponData);
					let a = {
						coupon_id: that.orderId,
						price: that.orderPrice,
						amount: that.orderJF,
						number: that.Ordernumber,
						name: that.couponData.brand_name + ' ' + that.couponData.coupon_name,
						imgURL: that.couponInfo,
						free_num: that.couponData.free_num
					}
					uni.navigateTo({
						url: "/pages/app/coupon/couponOrderConfirm?order=" + encodeURIComponent(JSON.stringify(a)),
					});
				}
			},
			getList() {
				// //console.log('params', params);
				//显示加载框
				uni.showLoading({
					title: '加载中'
				})

				// //console.log(this.couponData);
				this.$api.coupon.brandDetail.post(this.search).then((res) => {
					if (res.code == 0) {
						this.couponInfo = res.data.brand_info.cover; //卡券图片
						this.brandInfo = res.data.brand_info; //卡券信息
						this.faceList = res.data.brand_coupon_list; //卡券面值
						this.exchange_info = res.data.brand_info.exchange_notice; //兑换须知
						this.writeoff_notice = res.data.brand_info.writeoff_notice; //核销须知
						this.formatting()
						this.getCouponInfo(this.faceList[0], 0) //默认选中
					} else {
						this.couponInfo = ''; //卡券图片
						this.brandInfo = []; //卡券信息
						uni.showToast({
							title: res.msg,
							icon: "none"
						});
					}
				});
				setTimeout(function() {
					uni.hideLoading()
				}, 1000);
			},
			getCouponInfo(item, index) {
				this.$api.coupon.couponDetail.post({
					coupon_id: item.coupon_id
				}).then((res) => {
					if (res.code == 0) {
						this.couponData = res.data || {}
						this.faceList.map((i) => {
							i.cardDisable = false;
						});
						item.cardDisable = true;
						this.orderId = item.coupon_id;
						this.orderPrice = item.price;
						this.orderJF = item.amount;
						this.$set(this.faceList, index, item);
						this.form.price = item.price;
					} else {
						this.couponData = {}
					}
				});
			},

			//sort数组对象排序
			compare(key) {
				return function(a, b) {
					let c = a[key];
					let d = b[key];
					if (c > d) {
						return 1
					} else {
						return -1
					}
				}
			},
			//格式化处理数据
			formatting() {
				let that = this;
				//兑换须知，核销须知排序
				this.exchange_info = this.exchange_info.sort(that.compare("sort"))
				this.writeoff_notice = this.writeoff_notice.sort(that.compare("sort"))
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "./couponDetail.scss";

	page {
		position: relative;
	}

	.bottom-box {
		width: 100%;
		position: fixed;
		bottom: 0;
		padding: 24rpx;
		background-color: #fff;
	}
</style>
