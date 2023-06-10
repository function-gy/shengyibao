<template>
	<view style="height: calc(100vh - 15vw); overflow: auto;">
		<view v-if="smjloading" class="home bgf8" style="padding-bottom: 30rpx; position: relative;">

			<banner :allData="diy_config" v-if="showCom.includes('banner')" style="width: 100%;height: 390rpx;">
			</banner>

			<view class="backdrop-filter" v-if="showCom.includes('banner')"></view>

			<view :class="showCom.includes('banner')?'':'m-t-15'" style="z-index:9;width: 100%;">
				<view class="jgqbox clearfix" v-if="showCom.includes('jgq')">
					<jgq :allData="diy_config"></jgq>
				</view>
				<message :allData="diy_config" v-if="showCom.includes('message')"></message>
				<guanggao :allData="diy_config" v-if="showCom.includes('guanggao')"></guanggao>
				<cards :allData="diy_config" v-if="showCom.includes('cards')"></cards>
			</view>

		</view>

		<smjloading ref="smjloading" />
		<u-popup :show="xieyiview" :safe-area-inset-bottom="false" mode="center" :round="10" :customStyle="{width: '76%'}">

			<view>
				<view class="height100  flex-column f14  c333">
					<view v-if="base_config && base_config.content!=''">
						<view class="f16 p-t-10 text-c fw">隐私协议</view>
						<view class="flex-item  p-15">
							感谢您对{{base_config.title}}一直以来的信任!我们更新了<text class="link-type"
								@click="openhtml">隐私政策</text>特向您说明如下:<br />
							<view>
								<view v-html="content"></view>
							</view>
						</view>
					</view>
					<view v-else>
						<view class="f16 p-t-10 text-c fw">隐私协议</view>
						<view class="flex-item  p-15">
							感谢您对生易宝一直以来的信任!我们更新了<text class="link-type" @click="openhtml">隐私政策</text>特向您说明如下:<br />
							<view>
								1、为向您提供交易相关基本功能，我们会收集、使用必要的信息:<br />
								2、基于您的明示授权，我们可能会获取您的手机号码(为保障您的账号和使用安全),
								您有权拒绝或取消授权，取消后您将无法使用我们提供的产品服务;<br />
								3、我们会采取业界先进的安全措施保护您的信息安全;<br />
								4、未经您同意，我们不会从第三方处获取、共享或向其提供您的信息。<br />
							</view>
						</view>
					</view>
					<view class="p-10 text-c width100" >

						<!-- #ifdef MP-WEIXIN || APP -->
						<view style="   color: #fff;" class="tongyiclass" @click="tongyi">同意</view>
						<!-- #endif -->
						<!-- #ifdef H5 -->
						<view style="width: 100%;  text-align: center;   color: #03A9F4;" @click="tongyi">同意</view>
						<!-- #endif -->
						<view class="m-b-10">
							<!-- #ifdef MP-WEIXIN -->
							<navigator open-type="exit" target="miniProgram" class="c333">不同意</navigator>
							<!-- #endif -->
							<!-- #ifdef APP -->
							<view class="width100 c333 " @click="xieyicancel">不同意</view>
							<!-- #endif -->
						</view>
					</view>
				</view>
			</view>
		</u-popup>
	</view>

</template>

<script>
	import banner from "./components/swiper-banner.vue";
	import jgq from "./components/category-list.vue";
	import cards from "./components/goods-list.vue";
	import guanggao from "./components/swiper-activity.vue";
	import message from "./components/information-list.vue";
	import colorTool from "@/util/color";
	export default {
		name: "home",
		components: {
			banner,
			jgq,
			cards,
			guanggao,
			message,
		},
		data() {
			return {
				//用户协议
				xieyiview: false,
				smjloading: false,
				ifBottomRefresh: false,
				current: 1,
				loadmore: "more",
				diy_config: [],
				goodsList: [],
				showCom: [],
				pageLoading: false,
				content: ''
			};
		},
		computed: {
			homeInfo() {
				return JSON.parse(this.$store.state.homeInfo);
			},
			code() {
				return this.$store.state.code;
			},
			base_config() {
				if (this.$store.state.homeInfo) {
					return JSON.parse(
						JSON.parse(this.$store.state.homeInfo).home_style.base_config
					);
				}

			},
		},


		watch: {
			homeInfo(val) {
				if (val) {
					this.getInfo()
				}
			}
		},
		created() {
			this.content = this.$tool.crypto.BASE64.decrypt(this.base_config.content)
		},

		mounted() {

			uni.setStorageSync('basetitle', this.base_config.title ? this.base_config.title : '生易宝')
			if (!uni.getStorageSync('xieyi') == 1 && this.base_config.open) {
				console.log('xieyi')
				this.xieyiview = true
			}
			this.DataLoad()
		},
		methods: {
			tongyi() {
				uni.setStorageSync('xieyi', 1)
				this.xieyiview = false
			},
			openhtml() {
				uni.navigateTo({
					url: "/pages/home/components/webView?url=https://shengyibao-test.tongkask.com/privacyAgreement.html",
				});
			},
			xieyicancel() {
				uni.setStorageSync('xieyi', 0)
				plus.runtime.quit();
			},
			async DataLoad() {
				this.$tool.getLocation()
				this.$refs.smjloading.open()
				if (this.code) {
					// #ifdef MP-WEIXIN || APP
					this.homeinfodata()
					// #endif
					// #ifdef H5 
					this.homeinfodataH5()
					// #endif
				}
				this.getInfo();
			},
			homeinfodataH5() {
				let _this = this
				this.$api.home.homeInfo.post().then(res => {
					if (res.code == 0) {
						//console.log(JSON.parse(res.data.HomeStyle.login_config));
						if (res.data && res.data.home_style && res.data.home_style.login_config) {
							const homeinfo = res.data
							let login_config = JSON.parse(res.data.home_style.login_config)
							if (!login_config.color) {
								login_config.color = '#9784ff'
							}
							let myStyle = `
							--logincolor:` + login_config.color + `;
							--logincolor-lighten-1:` + colorTool.lighten(login_config.color, 0.3) + `;
							--logincolor-darken-1:` + colorTool.darken(login_config.color, 0.2) + `;
							`

							// this.$store.commit('SET_myStyle', myStyle);
							uni.setStorageSync(this.$tool.setStorageLocKey('myStyle'), myStyle)
							uni.setStorageSync(this.$tool.setStorageLocKey('logincolor'), login_config.color)
							const colorobj = {
								'logincolor': login_config.color,
								'logincolor-lighten-1': colorTool.lighten(login_config.color, 0.3),
								'logincolor-darken-1': colorTool.darken(login_config.color, 0.2),
							}


							if (homeinfo.app_list && homeinfo.app_list.length > 0) {
								uni.setStorageSync(this.$tool.setStorageLocKey('mallAppList'), JSON.stringify(
									homeinfo.app_list));
							} else {
								uni.setStorageSync(this.$tool.setStorageLocKey('mallAppList'), JSON.stringify([]));
							}
							const diy_config = JSON.parse(homeinfo.home_style.diy_config).filter(
								(e) => {
									// return e.checked && e.template && JSON.stringify(e.template) !== '{}'
									return e.checked;
								}
							);
							if (diy_config && diy_config.length > 0) {
								uni.setStorageSync(this.$tool.setStorageLocKey('homeRoleList'), JSON.stringify(
									diy_config.map(item => item
										.components)));

							} else {
								uni.setStorageSync(this.$tool.setStorageLocKey('homeRoleList'), JSON.stringify(
									[]));
							}

							this.$store.commit('SET_configthemp', colorobj);
							uni.setStorageSync(this.$tool.setStorageLocKey('configthemp'), colorobj)



							this.$store.commit('SET_HOMEINFO', JSON.stringify(res.data));
							uni.setStorageSync(this.$tool.setStorageLocKey('homeInfo'), JSON.stringify(res.data))


							console.log('homneinfo', res.data)
						}
					}
				})
			},
			async homeinfodata() {
				// 
				let _this = this

				const res = await this.$api.home.homeInfo.post()
				if (res.code == 0) {
					//console.log(JSON.parse(res.data.HomeStyle.login_config));
					if (res.data && res.data.home_style && res.data.home_style.login_config) {
						const homeinfo = res.data
						let login_config = JSON.parse(res.data.home_style.login_config)
						if (!login_config.color) {
							login_config.color = '#9784ff'
						}
						let myStyle = `
						--logincolor:` + login_config.color + `;
						--logincolor-lighten-1:` + colorTool.lighten(login_config.color, 0.3) + `;
						--logincolor-darken-1:` + colorTool.darken(login_config.color, 0.2) + `;
						`

						this.$store.commit('SET_myStyle', myStyle);
						uni.setStorageSync('myStyle', myStyle)
						uni.setStorageSync('logincolor', login_config.color)
						const colorobj = {
							'logincolor': login_config.color,
							'logincolor-lighten-1': colorTool.lighten(login_config.color, 0.3),
							'logincolor-darken-1': colorTool.darken(login_config.color, 0.2),
						}


						if (homeinfo.app_list && homeinfo.app_list.length > 0) {
							uni.setStorageSync('mallAppList', JSON.stringify(homeinfo.app_list));
						} else {
							uni.setStorageSync('mallAppList', JSON.stringify([]));
						}
						const diy_config = JSON.parse(homeinfo.home_style.diy_config).filter(
							(e) => {
								// return e.checked && e.template && JSON.stringify(e.template) !== '{}'
								return e.checked;
							}
						);
						if (diy_config && diy_config.length > 0) {
							uni.setStorageSync('homeRoleList', JSON.stringify(diy_config.map(item => item
								.components)));

						} else {
							uni.setStorageSync('homeRoleList', JSON.stringify([]));
						}

						this.$store.commit('SET_configthemp', colorobj);
						uni.setStorageSync('configthemp', colorobj)

						this.$store.commit('SET_HOMEINFO', JSON.stringify(res.data));
						uni.setStorageSync('homeInfo', JSON.stringify(res.data))


						console.log('homneinfo', res.data)
					}
				}
			},
			topbar() {
				let menuButtonInfo = uni.getMenuButtonBoundingClientRect();
			},
			getList() {
				let id1 = this.diy_config.findIndex((arr) => arr.components == "cards");
				if (id1 != -1) {
					this.diy_config[id1].template = {
						list: this.goodsList,
					};
				} else {}
			},
			//首页数据
			getInfo() {
				let _this = this;
				this.pageLoading = true;
				if (
					this.homeInfo.home_style &&
					this.homeInfo.home_style.diy_config &&
					JSON.parse(this.homeInfo.home_style.diy_config).length > 0
				) {
					//console.log(JSON.parse(res.data.HomeStyle.diy_config));
					this.diy_config = JSON.parse(this.homeInfo.home_style.diy_config).filter(
						(e) => {
							// return e.checked && e.template && JSON.stringify(e.template) !== '{}'
							return e.checked;
						}
					);

					let arr = this.diy_config.filter((e) => {
						return e.components === "message";
					});
					if (
						arr &&
						arr.length > 0 &&
						arr[0].template &&
						arr[0].template.tableData
					) {
						let messageIdArr = this.$tool.filterObjArrToArr(
							"id",
							arr[0].template.tableData
						);
						if (
							Object.prototype.toString.call(messageIdArr) ===
							"[object Array]" &&
							messageIdArr.length > 0
						) {
							let messageIdStr = messageIdArr.join(",");
							this.getArticleList(messageIdStr);
						}
					} else {
						let id1 = this.diy_config.findIndex(
							(arr) => arr.components == "message"
						);

						if (id1 != -1) {
							this.diy_config[id1].template = {
								tableData: [],
							};
						} else {}
					}
				} else {
					this.diy_config = [];
				}

				if (this.homeInfo.hot_brand && this.homeInfo.hot_brand.length > 0) {
					let id1 = this.diy_config.findIndex(
						(arr) => arr.components == "cards"
					);

					if (id1 != -1) {
						this.diy_config[id1].template = {
							list: this.homeInfo.hot_brand,
						};
					} else {}
				}
				if (this.homeInfo.app_list && this.homeInfo.app_list.length > 0) {
					uni.setStorageSync('mallAppList', JSON.stringify(this.homeInfo.app_list));
				} else {
					uni.setStorageSync('mallAppList', JSON.stringify([]));
				}
				this.diy_config.forEach((e) => {
					this.showCom.push(e.components);
				});
				if (this.diy_config && this.diy_config.length > 0) {
					this.showCom = this.diy_config.map(item => item.components)
					uni.setStorageSync('homeRoleList', JSON.stringify(this.showCom));

				} else {
					this.showCom = []
					uni.setStorageSync('homeRoleList', JSON.stringify([]));
				}
				console.log('showCom', this.showCom)
				setTimeout(function() {
					_this.smjloading = true
					_this.$refs.smjloading.close()
				}, 1000);
			},

			getArticleList(ids) {
				this.$api.home.getArticleList.post({
					ids: ids
				}).then((res) => {
					if (res.code == 0) {
						let id1 = this.diy_config.findIndex(
							(arr) => arr.components == "message"
						);

						if (id1 != -1) {
							this.diy_config[id1].template = {
								tableData: res.data,
							};
						}
					}
				});
			},
		},
	};
</script>
<style scoped lang="scss">
	

	.tongyiclass {
		color: #fff;
		border-radius: 60rpx;
		background: var(--logincolor);
		padding: 15rpx;
		margin-bottom: 20rpx;
	}

	page {
		position: relative;
		background-color: #f7f8f9;
	}

	.jgqbox {}

	.backdrop-filter {
		width: 100%;
		height: 120rpx;
		z-index: 5;
		// background: rgba(247, 248, 249, 0.2);
		background: #f7f8f973;
		border-bottom: none;
		box-shadow: 0 0 20rpx rgba(255, 255, 255, 0.8) inset;
		border-radius: 20rpx 20rpx 0px 0px;
		-webkit-backdrop-filter: blur(40rpx);
		backdrop-filter: blur(40rpx);
		position: absolute;
		top: 360rpx;
	}

	.clearfix:after {
		/*伪元素是行内元素 正常浏览器清除浮动方法*/
		content: "";
		display: block;
		height: 0;
		clear: both;
		visibility: hidden;
	}

	// .clearfix{
	//     *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
	// }
</style>
