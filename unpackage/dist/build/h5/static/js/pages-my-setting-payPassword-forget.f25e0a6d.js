(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-my-setting-payPassword-forget"],{"14b3":function(s,t,e){"use strict";e.r(t);var i=e("e04a"),a=e.n(i);for(var n in i)["default"].indexOf(n)<0&&function(s){e.d(t,s,(function(){return i[s]}))}(n);t["default"]=a.a},"39fe":function(s,t,e){var i=e("24fb");t=i(!1),t.push([s.i,'@charset "UTF-8";\n/**\n * 下方引入的为uView UI的集成样式文件，为scss预处理器，其中包含了一些"u-"开头的自定义变量\n * 使用的时候，请将下面的一行复制到您的uniapp项目根目录的uni.scss中即可\n * uView自定义的css类名和scss变量，均以"u-"开头，不会造成冲突，请放心使用 \n */uni-page-body[data-v-dc98c27a]{background-color:#fff}body.?%PAGE?%[data-v-dc98c27a]{background-color:#fff}.payPassword[data-v-dc98c27a]{position:relative;height:100vh}.payPassword .numFont[data-v-dc98c27a]{height:%?110?%;width:16.6%;border-radius:%?20?%;margin-right:%?10?%;text-align:center;line-height:%?100?%;font-size:%?68?%;background:#f5f4f8}.payPassword .numFont[data-v-dc98c27a]:nth-child(6){margin-right:0}.payPassword .fbig[data-v-dc98c27a]{padding-bottom:%?20?%}.payPassword .shuruban[data-v-dc98c27a]{margin:0 %?20?%;position:fixed;bottom:%?20?%;width:calc(100% - %?40?%)}.payPassword .viag[data-v-dc98c27a]{background-color:#fff;display:flex;justify-content:space-between;flex-wrap:wrap;flex:1}.payPassword .fsmall[data-v-dc98c27a]{width:32%;margin-right:2%;height:%?98?%;background:hsla(0,0%,100%,.98);border:1px solid #e8e9ea;margin-bottom:%?10?%;line-height:%?98?%;text-align:center;font-size:%?50?%;color:#353535}.payPassword .fsmall[data-v-dc98c27a]:nth-child(3n){margin-right:0}.payPassword .shanchu[data-v-dc98c27a]{background:#eaebef;width:66%}.payPassword .fsmall[data-v-dc98c27a]:nth-child(11){margin:0 auto}',""]),s.exports=t},"4dd2":function(s,t,e){"use strict";var i=e("9ddd"),a=e.n(i);a.a},5522:function(s,t,e){"use strict";e.d(t,"b",(function(){return i})),e.d(t,"c",(function(){return a})),e.d(t,"a",(function(){}));var i=function(){var s=this,t=s.$createElement,e=s._self._c||t;return e("v-uni-view",{staticClass:"payPassword",style:s.myStyle},[e("v-uni-view",{staticClass:"height100vh bgfff"},[e("v-uni-view",{staticClass:"fbig"},[e("v-uni-view",{staticClass:"p-1"},[1==s.step?e("v-uni-view",[e("v-uni-view",{staticClass:"p-1 f24 fw500"},[s._v("请输入验证码")]),e("v-uni-view",{staticClass:"p-1 f1"},[s._v("即将发送验证码至绑定手机"),e("v-uni-text",{staticStyle:{color:"var(--logincolor)"}},[s._v(s._s(s.userInfo.phone.substr(0,3)+"****"+s.userInfo.phone.substr(7)))])],1)],1):s._e(),2==s.step?e("v-uni-view",[e("v-uni-view",{staticClass:"p-1 f24 fw500"},[s._v("请输入新密码")]),e("v-uni-view",{staticClass:"p-1 f1"},[s._v("请设置新的支付密码，用于支付验证")])],1):s._e(),3==s.step?e("v-uni-view",[e("v-uni-view",{staticClass:"p-1 f24 fw500"},[s._v("再次输入密码")]),e("v-uni-view",{staticClass:"p-1 f1"},[s._v("请再次输入支付密码，用以确认")])],1):s._e(),e("v-uni-view",{staticStyle:{margin:"120rpx auto 0"}},[e("v-uni-view",{staticClass:"flex-row"},s._l(6,(function(t,i){return e("v-uni-view",{key:i,staticClass:"numFont",style:1===s.step?"line-height: 110rpx;":""},[1===s.step?e("v-uni-text",[s._v(s._s(s.password[i]||""))]):e("v-uni-text",[s._v(s._s(s.password[i]?"●":""))])],1)})),1),e("v-uni-view",{staticClass:"text-c m-t-a-20"},[s.showError?e("v-uni-view",{staticClass:"f12 colorReds"},[s._v(s._s(s.infoError))]):s._e()],1)],1),1===s.step?e("v-uni-view",{staticClass:"text-r f1 m-t-35"},[e("v-uni-text",{staticStyle:{color:"var(--logincolor)"},on:{click:function(t){arguments[0]=t=s.$handleEvent(t),s.getCheckNum()}}},[s._v(s._s(s.codeTime?s.codeTime+"s":"获取验证码"))])],1):s._e()],1),e("v-uni-view",{staticClass:"shuruban"},[e("v-uni-view",{staticClass:"viag"},[s._l(s.num,(function(t,i){return e("v-uni-view",{key:i,staticClass:"fsmall br10",on:{click:function(e){arguments[0]=e=s.$handleEvent(e),s.valChange(t)}}},[s._v(s._s(t))])})),e("v-uni-view",{staticClass:"fsmall shanchu br10",on:{click:function(t){arguments[0]=t=s.$handleEvent(t),s.backspace()}}},[e("v-uni-view",{staticClass:"icon icon-shanchu"})],1)],2)],1)],1)],1)],1)},a=[]},"9ddd":function(s,t,e){var i=e("39fe");i.__esModule&&(i=i.default),"string"===typeof i&&(i=[[s.i,i,""]]),i.locals&&(s.exports=i.locals);var a=e("4f06").default;a("bc1f2fb8",i,!0,{sourceMap:!1,shadowMode:!1})},a4c6:function(s,t,e){"use strict";e.r(t);var i=e("5522"),a=e("14b3");for(var n in a)["default"].indexOf(n)<0&&function(s){e.d(t,s,(function(){return a[s]}))}(n);e("4dd2");var o=e("f0c5"),r=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"dc98c27a",null,!1,i["a"],void 0);t["default"]=r.exports},e04a:function(s,t,e){"use strict";e("7a82"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,e("e9c4"),e("fb6a"),e("ac1f"),e("00b4");var i={components:{},data:function(){return{userInfo:{},showError:!1,infoError:"",num:[1,2,3,4,5,6,7,8,9,0],password:"",orderid:"",orderInfo:"",step:1,oldPass:"",newPass:"",newPass2:"",codeTime:0,timer:null,phoneKey:""}},onLoad:function(){},onReady:function(){},onShow:function(){},created:function(){this.userInfo=this.$tool.getStorageLocCode("mall_authInfo")},computed:{myStyle:function(){return this.$store.state.myStyle}},methods:{valChange:function(s){if(this.password.length<5)this.password=this.password+(s+"");else if(5==this.password.length)if(this.password=this.password+(s+""),1===this.step)this.oldPass=JSON.parse(JSON.stringify(this.password)),this.queding(1);else if(2===this.step)this.step+=1,this.newPass=JSON.parse(JSON.stringify(this.password)),this.password="";else if(3===this.step){if(this.newPass2=JSON.parse(JSON.stringify(this.password)),this.newPass!==this.newPass2)return this.showError=!0,void(this.infoError="两次输入新密码不一致！");this.showError=!1,this.infoError="",this.queding(2)}},backspace:function(){this.flag=!1,this.password=this.password.slice(0,this.password.length-1)},getCheckNum:function(){var s=this;if(!/^[1][0-9]{10}$/.test(this.userInfo.phone))return uni.showToast({title:"请填写正确手机号码",icon:"none"}),!1;this.codeTime>0?uni.showToast({title:"不能重复获取",icon:"none"}):(this.codeTime=60,this.timer=setInterval((function(){s.codeTime--,s.codeTime<1&&(clearInterval(s.timer),s.codeTime=0)}),1e3),this.$api.common.getMallSmsCode.post({phone:this.userInfo.phone,action:"mch_sms_memberSetPayPwd"}).then((function(t){0==t.code?uni.showToast({title:t.msg,icon:"success"}):(clearInterval(s.timer),s.codeTime=0)})))},queding:function(s){var t=this,e={step:1,sms_code:this.oldPass,phone:this.userInfo.phone},i={step:2,key:this.phoneKey,pay_pwd:this.newPass2};this.$api.userinfo.memberForgetPayPwd.post(1===s?e:i).then((function(e){0==e.code&&(1===s?(t.phoneKey=e.data.key,uni.showToast({title:"验证码验证成功"}),t.password="",t.step=2):2===s&&(uni.showToast({title:"修改成功,即将跳转首页"}),setTimeout((function(){uni.reLaunch({url:"/pages/tabbar/tabbar"})}),1e3)))}))}}};t.default=i}}]);