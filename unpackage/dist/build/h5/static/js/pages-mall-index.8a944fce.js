(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mall-index"],{"347f":function(t,n,i){"use strict";i("7a82"),Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0,i("7db0"),i("d3b7");var e={data:function(){return{urlString:"",mallAppList:[],a_id:""}},created:function(){this.getUrl()},methods:{getUrl:function(){JSON.parse(uni.getStorageSync("mallAppList"))&&(this.mallAppList=JSON.parse(uni.getStorageSync("mallAppList")),this.mallAppList&&this.mallAppList.length>0&&(this.a_id=this.mallAppList.find((function(t){return"supplyfx"==t.app_module})).aid||"",this.a_id?this.goTo():uni.showToast({title:"当前应用暂未开通",duration:2e3,icon:"error"})))},goTo:function(){}}};n.default=e},4180:function(t,n,i){"use strict";i.r(n);var e=i("a2ef"),a=i("b215");for(var u in a)["default"].indexOf(u)<0&&function(t){i.d(n,t,(function(){return a[t]}))}(u);var r=i("f0c5"),o=Object(r["a"])(a["default"],e["b"],e["c"],!1,null,"933ddc06",null,!1,e["a"],void 0);n["default"]=o.exports},a2ef:function(t,n,i){"use strict";i.d(n,"b",(function(){return e})),i.d(n,"c",(function(){return a})),i.d(n,"a",(function(){}));var e=function(){var t=this.$createElement,n=this._self._c||t;return n("v-uni-view",{staticStyle:{height:"calc(100vh - 15vw)",overflow:"auto"}})},a=[]},b215:function(t,n,i){"use strict";i.r(n);var e=i("347f"),a=i.n(e);for(var u in e)["default"].indexOf(u)<0&&function(t){i.d(n,t,(function(){return e[t]}))}(u);n["default"]=a.a}}]);