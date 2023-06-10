module.exports = {
	// 配置路径别名
	configureWebpack: {
		devServer: {
			// 调试时允许内网穿透，让外网的人访问到本地调试的H5页面
			disableHostCheck: true,
			proxy: {
				'/v1': {
					"target": 'https://shengyibao-test.tongkask.com',
					"secure": true,
					"changeOrigin": true,
					"pathRewrite": {
						'^/v1': '/v1'
					}
				}
			},

		}
	}
	// productionSourceMap: false,
}
