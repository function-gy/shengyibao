<script>
	// #ifdef H5
	import h5PagesAnimation from './components/h5-pages-animation/';
	// #endif
	import colorTool from "@/util/color";
	export default {
		// #ifdef H5
		mixins: [h5PagesAnimation],
		// #endif
		name: "App",
		computed: {
			code() {
				return this.$store.state.code;
			},
			token() {
				return this.$store.state.token;
			},
		},                                                         
		watch: {
			code(val) {
				if (val) {
					console.log('APP code')
					// #ifdef MP-WEIXIN
					this.getInfo()					
					// #endif
					// #ifdef H5 || APP
						this.getInfoH5()	
					// #endif
				}
			},
		},
		onLoad() {
			if (this.code) {
				// #ifdef MP-WEIXIN
				this.getInfo()					
				// #endif
				// #ifdef H5 || APP
					this.getInfoH5()	
				// #endif
			}			

		},
		methods: {
			getInfoH5(){
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
				
							this.$store.commit('SET_myStyle', myStyle);
							uni.setStorageSync(this.$tool.setStorageLocKey('myStyle'), myStyle)
							uni.setStorageSync(this.$tool.setStorageLocKey('logincolor'), login_config.color)
							const colorobj = {
								'logincolor': login_config.color,
								'logincolor-lighten-1': colorTool.lighten(login_config.color, 0.3),
								'logincolor-darken-1': colorTool.darken(login_config.color, 0.2),
							}
				
				
							if (homeinfo.app_list && homeinfo.app_list.length > 0) {
								uni.setStorageSync(this.$tool.setStorageLocKey('mallAppList'), JSON.stringify(homeinfo.app_list));
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
								uni.setStorageSync(this.$tool.setStorageLocKey('homeRoleList'), JSON.stringify(diy_config.map(item => item
									.components)));
				
							} else {
								uni.setStorageSync(this.$tool.setStorageLocKey('homeRoleList'), JSON.stringify([]));
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
			getInfo() {
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
				})
			},
		},
	}
</script>

<style lang="scss">
	@import "@/uni_modules/uview-ui/index.scss";
	@import "common/demo.scss";
	@import "@/static/css/style.scss";
	@import "@/static/iconfont/iconfont.css";
	// @font-face {
	// 	font-family: my-font-pfjt;
	// 	src: url('~@/static/pfjt.ttf');
	// }
</style>
