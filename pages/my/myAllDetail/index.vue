<template>
	<view class="my-all-detail flex-column bgf8" v-if="newList && newList.length>0" >
		<view id="header-box1" class="header-box">

			<searchBox2 v-model="myValue" :hasHistory="false" :clearText="false" :placeholder="'输入关键词搜索'"
				@confirmEven="confirmEven"></searchBox2>
		</view>
		<view style="padding: 20rpx 30rpx;">
			<cardList :orderList="newList"></cardList>
		</view>

	</view>
	<view class="emptyImg pcX text-c" v-else>
		<img :src="baseUrl+'/storage/tksk_mall_img/phoneCharge/none-shuju@3x.png'"/>
		<view class="f14 c9b9b">暂无数据</view>
	</view>

</template>

<script>
	import cardList from './common/cardList.vue'
	import searchBox2 from '@/components/searchBox2.vue';
	export default {
		components: {
			cardList,
			searchBox2
		},
		data() {
			return {
				baseUrl: this.$baseUrl,
				myValue: '',
				orderList: [],
				newList:[]
			}
		},
		created(){
			this.getList()
		},
		methods: {
			//  e: 取消文字 0; 搜索文字 1; 清除按钮 2;  点击历史记录 3;  回车enter 4;
			confirmEven(val, e) {
				if (e == 2) {} else if (e == 4) {
					this.filterList()
				} else if (e == 0) {}
			},
			filterList() {
				if(this.myValue && this.myValue!='') {
					let arr = this.orderList.filter(item=>item.name.indexOf(this.myValue)!== -1)
					this.mapList(arr)
				}
			},
			mapList(arr) {
				this.newList = []
				arr.map((item, index) => { // 转换成列表展示所需的格式
					let first = item.category_name;
				
					if (!this.newList.length || (this.newList.length && (this.newList[this.newList.length - 1].title != first))) {
						this.newList.push({
							title: first,
							list: [],
						})
					}
					this.newList[this.newList.length - 1].list.push(item);
				})
			},
			getList() {
				this.orderList = JSON.parse(uni.getStorageSync('mallAppList')).map((item, index) => { // 转换成列表展示所需的格式
					return {
						...item,
						category_name: '生活服务',
					}
				})
				this.mapList(this.orderList)
			}
		}

	}
</script>

<style scoped lang="scss">
	.bgf8 {
		background-color: #f8f8f8; //超出屏幕背景色 
	}
	.header-box {
		padding: 30rpx;
		padding-bottom: 0;
	}
	.search {
		height: 92rpx;
		padding: 16rpx 30rpx;
	}

	.frame {
		height: 60rpx;
		border-radius: 30rpx;
		padding-left: 28rpx;
		line-height: 60rpx;
	}
	.emptyImg {
		margin-top: 280rpx;;
		img {
			width: 378rpx;
			height: 208rpx;
		}
		
		.text {
			margin-top: 30rpx;
		}
	}
</style>
