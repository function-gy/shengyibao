<template>
	<view class="phoneCost p-15" :style="myStyle">
		<view class="input-box br-tl-tr-10 p-15 m-lr-10">
			<view class='cf8 f12'>
				<view v-if="operator" style="margin-bottom: 4rpx;">{{operator}}</view>
			</view>
			<view style="display: flex;">
				<view style="flex: 1;">
					<input placeholder-style="color: #F8F8F8;" class="cf8 f24" v-model='mobile2' @input="mobileInput"
						placeholder='请输入手机号码' maxlength="13"></input>
				</view>
				<view class='text-r f12 cf8 p-1' @tap='record'>充值记录</view>
			</view>
		</view>
		<view class="face-value br10 bgfff p-15" style="flex-wrap: wrap; box-sizing: border-box;">
			<view>
				<view class="face-item br10 text-c cbg"
					style="margin-bottom: 20rpx;width: 196rpx; padding-top:30rpx; padding-bottom:30rpx; box-sizing: border-box;"
					v-for="(item, index) in faceList" :class="{ active: item.cardDisable }" :key="index"
					@tap="faceClick(item,index)">
					<view class="amount f23" style="font-weight: 500; color:var(--logincolor)">
						<text> {{Number(item.amount)}}</text> <text class="f18">元</text>
					</view>
					<view class="price f11  c999 " style="width: 200rpx;">
						售价 {{item.price}} {{$tool.getMoneyUnit()}}
					</view>
				</view>
			</view>
			<view class="width100 br10 f12 m-t-10 p-lr-1 lh-3" style="background: #FFFBF1;color: #D7862D;">
				<img :src="baseUrl+'/storage/tksk_mall_img/app/fapiao1@2x.png'" class="vertical"
					style="width:48rpx;height: 48rpx;" />

				<text>代充服务，运营商不再开具发票！</text>
			</view>
		</view>

		<view class="bottom-box">
			<!-- <u-button  class='bottom-button' type="primary" text="立即兑换" @tap="goPay" :disabledValue="!operator"></u-button> -->
			<!-- <bottomButton :text="'立即兑换'" :disabledValue="!form.amount" @buttonClick="goPay"></bottomButton> -->

			<view :class="form.amount && btnStatus ? 'primybtn':'dis-btn'" @click="goPay"><text>立即兑换</text></view>
		</view>

		<u-popup :show="popupShow" :round="10" mode="bottom" @close="popupClose">
			<view class="popup-bottom">
				<view class="header">
					<view class='title' style="flex: 1;">
						确认订单
					</view>
					<view class='close'>
						<view class="icon icon-guanbi" @tap="popupClose"></view>
					</view>
				</view>
				<view class="content">
					<u--form class="form-style" :model="form" ref="uForm" labelWidth='auto'>
						<u-form-item label="充值号码" prop="mobile">
							{{form.phone}}
						</u-form-item>
						<u-form-item label="充值金额" prop="amount" v-if="form.amount">
							{{Number(form.amount)}} 元
						</u-form-item>
						<u-form-item label="需要支付" prop="price">
							<text style="color: #B11618;">{{form.amount}} {{$tool.getMoneyUnit()}}</text>
						</u-form-item>
					</u--form>

				</view>
				<view class="footer">
					<!-- <u-button class='bottom-button' type="primary" text="确认" @tap="pay"></u-button> -->
					<!-- <bottomButton text="确认" @buttonClick="pay"></bottomButton> -->
					<view class="primybtn" @click="pay"><text>确认</text></view>
				</view>
			</view>
		</u-popup>
	</view>
</template>
<script>
	// import bottomButton from '@/components/bottomButton.vue'
	export default {
		name: 'phoneCost',
		components: {
			// bottomButton
		},
		data() {
			return {
				baseUrl: this.$baseUrl,
				orderId: '',
				btnStatus: false,
				mobile: '',
				mobile2: '',
				operator: '运营商未知',
				popupShow: false,
				form: {
					phone: '',
					amount: ''
				},
				ready: {},
				faceList: []
			}
		},
		computed: {
			myStyle() {
				return this.$store.state.myStyle;
			},
		},
		created() {
			this.init()
		},
		methods: {
			init() {
				if (this.faceList && this.faceList.length > 0) {
					this.faceList.map((i) => {
						i.cardDisable = false;
					});
				}
				if (this.$tool.getStorageLocCode('mall_authInfo')) { //初始化手机号
					const data = this.$tool.getStorageLocCode('mall_authInfo')
					this.mobile = data.phone
					this.mobile2 = this.changeMobile2(this.mobile)
					this.getArea()
				}	
			},
			getCallProduct(operator) { //获取话费产品
				this.$api.phone.callProduct.post({
					operator: operator
				}).then((res) => {
					if (res.code == 0) {
						this.faceList = res.data || []
						if (this.faceList && this.faceList.length > 0) {
							this.faceList.map((i) => {
								i.cardDisable = false;
							});
						}
					}
				}).catch((res) => {

				});
			},
			faceClick(item, index) {
				if ((/^[1][0-9]{10}$/.test(this.mobile))) {
					this.faceList.map((i) => {
						i.cardDisable = false;
					});
					item.cardDisable = true;
					this.$set(this.faceList, index, item)
					this.form = item
					this.form.phone = this.mobile2
					this.btnStatus = true
				} else {
					uni.showToast({
						title: '请填写正确的手机号码',
						icon: "none"
					});
				}


			},
			mobileInput(val) {
				this.mobile2 = this.changeMobile2(val.detail.value)
				this.mobile = val.detail.value.replace(/\s*/g, "") //去除空格的手机号
				if ((/^[1][0-9]{10}$/.test(this.mobile))) {
					this.btnStatus = true;
					this.getArea()
				} else {
					this.btnStatus = false;
					return
				}
			},
			changeMobile2(obj) {
				var value = obj;
				value = value.replace(/\s*/g, "");
				var result = [];
				for (var i = 0; i < value.length; i++) {
					if (i == 3 || i == 7) {
						result.push(" " + value.charAt(i));
					} else {
						result.push(value.charAt(i));
					}
				}
				obj = result.join("");
				return obj;
			},
			record() { //充值记录
				uni.navigateTo({
					url: '/pages/tabBar/user/orderList/phoneCharge/rechargeLog',
				})
			},

			goPay() {
				if (this.btnStatus) {
					if ((/^[1][0-9]{10}$/.test(this.mobile)) && this.btnStatus) {
						this.form.phone = this.mobile2
						this.ready.phone = this.mobile
						this.ready.product_id = Number(this.form.id)
						this.callRecharge()
						this.popupShow = true
					} else {
						uni.showToast({
							title: '请填写正确的手机号码',
							icon: "none"
						});
					}
				} else {
					return
				}
			},

			popupClose() {
				this.popupShow = false
			},

			pay() {
				if (this.orderId && this.orderId != '') {
					// uni.navigateTo({
					// 	url: '/pages/common/payPassword/index?type=phone' + '&order_id=' + this.orderId + '&total_fee=' + this.form.amount
					// });
					uni.navigateTo({
						url: '/pages/comm/payCheckstand/index?type=phone' +
							'&order_id=' + this.orderId +
							'&total_fee=' + Number(this.form.amount) +
							'&order_sn=' + this.form.order_sn +
							'&order_type=' + '话费充值'
					});
					this.popupShow = false
				}
			},

			// 号码归属地
			getArea() {
				this.$api.phone.callPhone.post({
					phone: this.mobile
				}).then((res) => {
					if (res.code == 0) {
						this.operator = res.data.operator + ' ' + res.data.province + res.data.city
						this.getCallProduct(res.data.operator)
					} else {
						this.operator = res.msg
					}
				}).catch((res) => {
					this.operator = '运营商未知'
				});
			},
			// 预校验
			callRecharge() {
				this.$api.phone.callRecharge.post(this.ready).then((res) => {
					if (res.code == 0) {
						this.form.amount = Number(res.data.total_fee).toFixed(2);
						this.form.order_sn = res.data.order_sn;
						this.orderId = res.data.order_id
					}
				});
			},
		}
	}
</script>
<style scoped lang="scss">
	page {
		position: relative;
	}

	.input-box {
		/* #ifdef MP-WEIXIN || APP */
		background-image: url("https://shengyibao.tongkask.com/storage/tksk_mall_img/app/huafei-bg@2x.png");
		/* #endif */
		/* #ifdef H5 */
		background-image: url("/storage/tksk_mall_img/app/huafei-bg@2x.png");
		/* #endif */
		height: 158rpx;
		background-size: 100%;
	}

	.u-form.form-style {
		.u-form-item .u-form-item__body {
			font-size: 28rpx;
			line-height: 68rpx;

			.u-form-item__body__left {}

			.u-form-item__body__right {}
		}
	}

	.phoneCost {
		.face-value {
			box-shadow: 0rpx 0rpx 16rpx 0rpx rgba(0, 0, 0, 0.1);

			.face-item {
				margin-right: 20rpx;
				display: inline-block;
			}

			.face-item:nth-child(3n) {
				margin-right: 0;
			}

			.face-item:last-child {
				margin-right: 0;
			}

			.active.face-item {
				//点击变色，动态样式
				border: 2rpx solid var(--logincolor);

				.price {
					color: var(--logincolor);
				}
			}
		}

		.bottom-box {
			height: 88rpx;
			width: calc(100% - 60rpx);
			position: fixed;
			bottom: 30rpx;
		}
	}
</style>
