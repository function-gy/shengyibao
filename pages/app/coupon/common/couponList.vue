<template>
	<view>
		<view class="m-b-10 br10 bgfff" v-for="(item,index) in couponData"  v-if="item.children&&item.children.length>0" :key="index">
			<view class="couContent">
				<view class="title">{{item.category_name}}</view>
				<view class="itemBox">
					<view class="couponItem" v-for="(children,index2) in item.children"  :key="index2"  @tap="goto('couponOne',children)">
						<image :src="children.circle_image[0]"></image>
						<view class="name">{{children.brand_name}}</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:['couponData'],
		data() {
			return{
				
			}
		},
		methods: {
			goto(type,val) {
				if(type == 'couponOne') {
					uni.navigateTo({
						url: '/pages/app/coupon/couponDetail?id=' + val.brand_id
					})
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.couContent {
		padding: 34rpx 0 0 0;

	}

	.title {
		margin-left: 31rpx;
		font-size: 30rpx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #353535;
		margin-bottom: 33rpx;
	}

	.itemBox {
		// margin-left: 45rpx;
		display: flex;
		// width: 100%;
		// grid-template-columns: repeat(auto-fill, 150rpx);
		// justify-items: center;
		// justify-content: space-between;
		flex-wrap: wrap;

	}

	.itemBox:after {
		//空余占位
		content: "";
		width: 138rpx;
		height: 0;
		visibility: hidden;
	}

	.couponItem {
		margin-bottom: 34rpx;
		width: 172rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		overflow: hidden;
		// margin-right: 16rpx;
		// margin-left: 16rpx;
	}

	.couponItem image {
		width: 85rpx;
		height: 85rpx;
		margin-bottom: 19rpx;
		border-radius: 50%;
		object-fit: cover;
	}

	.name {
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #353535;
	}
</style>
