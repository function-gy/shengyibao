<template>
  <view class="webView">
    <!-- 外链 -->
    <iframe ref="webview" :src="urlString" class="iframe" frameborder="no"></iframe>
    <!-- <web-view ref="webview" src="https://flq-saomachongzhi-9egteu5d5ec01b-1301598066.tcloudbaseapp.com/i.html?sign=315ce4290ba272c295614fd137b25de9&t=1678928505"></web-view> -->
  </view>
</template>

<script>
export default {
  data() {
    return {
      urlString: "",
    };
  },
  onUnload() {
    uni.reLaunch({
      url: "/pages/tabbar/tabbar",
    });
  },
  onLoad(options) {
    if (options.url) {
      this.urlString = decodeURIComponent(options.url);
    }
    // //console.log(options);
    if (options.title) {
      uni.setNavigationBarTitle({
        title: options.title,
      });
    }
  },

  created() {},
  mounted() {
    // //console.log(this.$refs.webview);
  },
  methods: {},
};
</script>

<style scoped lang="scss">
.webView {
  height: 100%;
}
.iframe {
  height: 100%;
  width: 100%;
}
</style>
