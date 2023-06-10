<template>
	<!-- 资讯滚动 -->
	<view class="swiper-banner"  v-if="allData2.tableData && allData2.tableData.length>0">
		<view class="swiper-box " >
			<img mode="widthFix" :src="baseUrl+'/storage/tksk_mall_img/home/shouye-zixun@3x.png'" 
				style="position: absolute; width: 118rpx; height: 100%;" 
			/>
			<swiper circular="true" vertical="true" autoplay="true" style="margin-left: 130rpx; height: 66rpx; ">
				<swiper-item @tap="goTo(swiper)" v-for="swiper in allData2.tableData" :key="swiper.id">
					<view class="flex-row" style="align-items: center; line-height: 66rpx;" >
						<view class=" ellipsis c333 flex-item f12">{{ swiper.title }}</view>
						<view class="f12">{{$tool.dateFormat(swiper.create_time,'MM月dd日')}}</view>
						<view class = "red_point"></view>
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
export default {
	props: ['allData'],
	data() {
		return {
			baseUrl:this.$baseUrl,
			jgq:false,
			allData2:[]
		};
	},
	created() {
		this.filterJgq(),
		this.allData.filter((e)=>{
			if(e.components == 'message') {
				this.allData2 =  e.template
			}
		})
	},
	methods: {
		filterJgq() {
			this.allData.forEach(e => {
				if(e.components == "jgq") {
					this.jgq = true;
				}
			});
		},
		//轮播图跳转
		goTo(e) {
			console.log(e);
			if (e.link && e.is_outside) {
				uni.navigateTo({
					url: '/pages/home/components/webView?url=' + encodeURIComponent(e.link)
				});
			} else if (e.is_outside === 0) {//内链
				uni.navigateTo({
					url: '/pages/home/components/information?id=' + e.id
				});
			}
		}
	}
};
</script>

<style scoped lang="scss">
.swiper-banner {
	margin-top: 10rpx;
	padding: 0 25rpx;
	height: 66rpx;
	::v-deep.swiper-box {
		background-color: #fff;
		position: relative;
		border-radius: 14rpx;
		uni-swiper {
			height: 66rpx;
			padding-right:24rpx ;
		}

		uni-swiper-item {
			height: 66rpx !important;
			line-height: 66rpx !important;
			font-size: 24rpx;
			justify-content: space-between;
			align-items: center;
		}
	}
}
.red_point {
	width: 12rpx;
	height: 12rpx;
	background: #EA3E40;
	border-radius: 50%;
	margin-left: 5rpx;
}
</style>
