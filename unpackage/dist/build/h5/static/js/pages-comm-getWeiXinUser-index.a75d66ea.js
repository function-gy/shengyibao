(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-comm-getWeiXinUser-index"],{"020e":function(t,a,o){"use strict";o.d(a,"b",(function(){return n})),o.d(a,"c",(function(){return e})),o.d(a,"a",(function(){}));var n=function(){var t=this,a=t.$createElement,o=t._self._c||a;return o("v-uni-view",{style:t.myStyle},[o("v-uni-view",{staticClass:"about"},[o("v-uni-view",{staticClass:"logo"},[o("v-uni-image",{attrs:{src:t.baseUrl+"/storage/tksk_mall_img/app/logo.png"}}),o("v-uni-view",[t._v(t._s(t.uni.getStorageSync("basetitle")))])],1)],1),o("v-uni-button",{staticClass:"login",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.getuserinfo.apply(void 0,arguments)}}},[t._v("授权登录")]),o("v-uni-view",{staticClass:"zanbu",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.back.apply(void 0,arguments)}}},[t._v("返回首页")]),o("v-uni-view",{staticClass:"foot"},[o("v-uni-view",{staticClass:"copy"},[t._v(t._s(t.about.name)+"版权所有©")])],1)],1)},e=[]},"0db1":function(t,a,o){"use strict";o.r(a);var n=o("020e"),e=o("8abb");for(var i in e)["default"].indexOf(i)<0&&function(t){o.d(a,t,(function(){return e[t]}))}(i);o("4c75");var r=o("f0c5"),c=Object(r["a"])(e["default"],n["b"],n["c"],!1,null,"7a3cc66f",null,!1,n["a"],void 0);a["default"]=c.exports},"2c89":function(t,a,o){var n=o("24fb");a=n(!1),a.push([t.i,".about[data-v-7a3cc66f]{padding:%?120?% %?40?% 0}.about .logo uni-image[data-v-7a3cc66f]{display:block;width:%?160?%;height:%?160?%;margin:0 auto %?35?%;border-radius:%?30?%}.logo[data-v-7a3cc66f]{text-align:center}.about .logo uni-view[data-v-7a3cc66f]{font-size:%?36?%;color:#333}.foot[data-v-7a3cc66f]{position:fixed;left:0;right:0;text-align:center;bottom:%?40?%}.login[data-v-7a3cc66f]{width:%?600?%!important;height:%?86?%!important;line-height:%?86?%!important;background:linear-gradient(91deg,var(--logincolor-lighten-1),var(--logincolor));font-size:%?32?%;border-radius:%?10?%!important;border:none;color:#fff;margin:0 auto!important;position:fixed;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);bottom:%?514?%}.zanbu[data-v-7a3cc66f]{font-size:%?32?%;color:#999;\n\t/* margin: 45rpx 0 80rpx; */position:fixed;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);bottom:%?436?%}.copy[data-v-7a3cc66f]{font-size:%?20?%;color:#9b9b9b}",""]),t.exports=a},"4c75":function(t,a,o){"use strict";var n=o("968e"),e=o.n(n);e.a},"8abb":function(t,a,o){"use strict";o.r(a);var n=o("dd0f"),e=o.n(n);for(var i in n)["default"].indexOf(i)<0&&function(t){o.d(a,t,(function(){return n[t]}))}(i);a["default"]=e.a},"968e":function(t,a,o){var n=o("2c89");n.__esModule&&(n=n.default),"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var e=o("4f06").default;e("bbe07a1a",n,!0,{sourceMap:!1,shadowMode:!1})},dd0f:function(t,a,o){"use strict";o("7a82"),Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0,o("99af");var n={data:function(){return{baseUrl:this.$baseUrl,code:"",about:{name:"江苏通卡数字科技有限公司"},oldUrl:""}},computed:{myStyle:function(){return this.$store.state.myStyle}},onLoad:function(t){t.oldUrl?this.oldUrl=decodeURIComponent(t.oldUrl):this.oldUrl="",this.wechatOauth2Url()},methods:{wechatOauth2Url:function(){var t="";this.oldUrl?t=this.oldUrl:(this.$store.commit("SET_TabbarKey","my"),uni.setStorageSync("tabbarKey","my"),t="localhost"==window.location.hostname?"https://shengyibao.tongkask.com/mall/mall.html#/pages/tabbar/tabbar":"".concat(document.location.protocol,"//").concat(window.location.host)+"/mall/mall.html#/pages/tabbar/tabbar"),this.$api.common.wechatOauth2Url.post({url:t}).then((function(t){0==t.code&&t.data.url&&(uni.showToast({title:t.msg,icon:"none",duration:2e3}),setTimeout((function(){uni.hideLoading()}),1e3),"ios"==uni.getSystemInfoSync().platform?uni.navigateTo({url:"/pages/home/components/webView?url="+encodeURIComponent(t.data.url)}):window.open(t.data.url,"_blank"))}))},back:function(){this.$store.commit("SET_TabbarKey","home"),uni.setStorageSync("tabbarKey","home"),uni.reLaunch({url:"/pages/tabbar/tabbar"})},getuserinfo:function(){this.wechatOauth2Url()}}};a.default=n}}]);