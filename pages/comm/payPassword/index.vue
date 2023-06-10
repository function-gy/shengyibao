<template>
	<view class="height100 bgfff">
	  <u-popup
		:show="show"
		@close="close"
		class="popup_show"
		:closeable="true"
		:round="10"
	  >
		<view class="fbig">
		  <view class="p-1">
			<view class="p-1 text-c f1" style="font-size: 36rpx"
			  >输入支付密码</view
			>
			<view style="margin: 20rpx auto">
			  <view class="flex-row">
				<view class="numFont" v-for="(item, index) in 6" :key="index">{{
				  (parameter.pay_pass[index] && "●") || ""
				}}</view>
			  </view>
			  <view class="tishi">
				<view class="tishileft" v-if="showError">{{ infoError }}</view>
			  </view>
			</view>
		  </view>
		  <view class="shuruban">
			<view class="viag">
			  <view
				class="fsmall br10"
				v-for="(item, index) in num"
				:key="index"
				@tap="valChange(item)"
				>{{ item }}</view
			  >
			</view>
			<view class="viagright">
			  <view class="shanchu br10" @tap="backspace()">
				<!-- <image src="../../static/images/app/shanchu-jp@2x.png" mode=""></image> -->
				<view class="icon icon-shanchu"></view>
			  </view>
			  <!-- <view class="shanchu br10" @tap="queding()">确定</view> -->
			  <view class="shanchu br10" @tap="reset()">重置</view>
			</view>
		  </view>
		</view>
	  </u-popup>
	</view>
  </template>
  
  <script>
  export default {
	components: {},
	props: ["orderInfo"],
	data() {
	  return {
		showError: false,
		infoError: "",
		num: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
		show: true,
		// password: '',
		// orderInfo: '',
		parameter: {
		  pay_pass: "",
		  order_id: Number(this.orderInfo.order_id),
		},
	  };
	},
	watch: {},
  
	onShow() {},
	created() {
	  this.num = this.num.sort((a, b) => {
		return Math.random() - Math.random();
	  });
	  // this.outLinkRequest("meituan");
	},
	mounted() {},
	methods: {
	  close() {
		this.$emit("closePay");
	  },
	  confirm() {
		uni.navigateTo({
		  url:
			"/pages/comm/payRecharge/index?oldUrl=" +
			encodeURIComponent(window.location.href),
		});
		this.show = false;
	  },
  
	  reset() {
		this.parameter.pay_pass = "";
	  },
	  queding() {
		if (this.parameter.pay_pass.length === 6) {
		  this.showError = false;
		  uni.showLoading({
			title: "支付中",
		  });
		 if (this.orderInfo.type && this.orderInfo.type == "coupon") {
			this.couponOrderPay();
		  } 
		   else if (this.orderInfo.type &&
			["meituan","ddfx","dyfx","supply","yhfx","smfx","slfx","tyfx","hlfx",'zfbhb','hffx','stfx']
			.includes(this.orderInfo.type)
		   ) {
			  this.outLinkRequest(this.orderInfo.type)
		  }
		} else {
		  this.showError = true;
		  this.infoError = "请输入6位数字密码！";
		}
	  },
	  // 外链请求
	  async outLinkRequest(type) {
		console.log(this.orderInfo.return_url,'this.orderInfo.return_url');
		let res = await this.$api.thirdParty[type].post(this.parameter);
		console.log(res, "res");
		if (res.code == 0) {
			
		  if (this.orderInfo.return_url) {
				uni.showToast({
				  title: "支付成功，即将跳转",
				});
				window.open(this.orderInfo.return_url, "_self");
			  }
		} else {
		  uni.showToast({
			  title: res.msg,
			  icon: "none",
			});
			this.parameter.pay_pass = "";
		}
	  },
	  backspace() {
		this.flag = false;
		this.parameter.pay_pass = this.parameter.pay_pass.slice(
		  0, this.parameter.pay_pass.length - 1
		);
	  },
	  valChange(val) {
		if (this.parameter.pay_pass.length < 6) {
		  this.parameter.pay_pass = this.parameter.pay_pass + (val + "");
		  if (this.parameter.pay_pass.length == 6) {
			this.queding();
		  }
		}
	  },
  
	  couponOrderPay() {
		this.$api.coupon.couponOrderPay
		  .post(this.parameter)
		  .then((res) => {
			if (res.code === 0) {
			  uni.showToast({
				icon: "success",
				title: "支付成功",
			  });
			  let _vm = this;
			  let form = {
				type: _vm.orderInfo.type,
				result: 1,
				buttonText: "查看券包",
				path: "/pages/coupon/index",
				msg: "恭喜你，兑换成功！",
				info: _vm.orderInfo.info,
			  };
			  uni.redirectTo({
				url:
				  "/pages/comm/paySuccess?info=" +
				  encodeURIComponent(JSON.stringify(form)),
				success: function (res) {},
				fail: function (res) {
				  console.log("fail", res);
				},
			  });
			} else {
			  if (res.msg === "支付密码错误") {
				this.parameter.pay_pass = "";
			  }
			}
		  })
		  .catch((res) => {
			uni.showToast({
			  title: res.msg,
			  icon: "none",
			});
		  });
		setTimeout(function () {
		  uni.hideLoading();
		}, 500);
	  },
  
	},
  };
  </script>
  
  <style scoped lang="scss">
  .numFont {
	height: 110rpx;
	width: 16%;
	border: 2rpx solid #e8e9ea;
	border-radius: 10rpx;
	margin-right: 10rpx;
	text-align: center;
	line-height: 100rpx;
	font-size: 52rpx;
  }
  
  .numFont:nth-child(6) {
	margin-right: 0;
  }
  .fbig {
	padding-bottom: 20rpx;
  }
  .shuruban {
	display: flex;
	justify-content: left;
	margin: 0 20rpx;
  }
  .viag {
	background-color: #fff;
	display: flex;
	justify-content: space-between;
	flex-wrap: wrap;
	flex: 1;
  }
  .fsmall {
	width: 32%;
	margin-right: 2%;
	height: 98rpx;
	background: rgba(255, 255, 255, 0.98);
	// border-radius: 20rpx;
	border: 1px solid #e8e9ea;
	margin-bottom: 10rpx;
	line-height: 98rpx;
	text-align: center;
	font-size: 50rpx;
	color: #353535;
  }
  .fsmall:nth-child(3n) {
	margin-right: 0;
  }
  .fsmall:nth-child(10) {
	margin: 0 auto;
  }
  .shanchu {
	width: 176rpx;
	height: 206rpx;
	background: #eaebef;
	// border-radius: 20rpx;
	line-height: 206rpx;
	text-align: center;
	margin-left: 10rpx;
  }
  .shanchu:nth-child(2) {
	margin-top: 10rpx;
  }
  .tishileft {
	font-size: 24rpx;
	margin-top: 24rpx;
	color: #d60606;
  }
  </style>
  