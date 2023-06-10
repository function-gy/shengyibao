<template>
  <view class="informationBox f18">
    <view class="f20 m-b-15">{{ title }}</view>
    <view class="f14 m-b-15">{{ createTime }}</view>
    <!-- 资讯详情(内链) -->
    <view v-html="content"  class="htmlimg width100"> </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      content: "",
      title: "",
      createTime: "",
    };
  },
  onLoad(options) {
    if (options.id) {
      //资讯id
      this.getInfo(options.id);
    }
  },
  created() {},
  methods: {
     getInfo(id) {
       this.$api.home.getArticleOne
        .post({
          id: id,
        })
        .then((res) => {
          if (res.code == 0) {
            if (res.data && res.data.content) {
              // this.content = "data:text/html;charset=utf-8;base64," + res.data.content
              this.content = this.$tool.crypto.BASE64.decrypt(
                res.data.content
              ).replaceAll("<img ","<img style='max-width: 100%;'")
              this.title = res.data.title;
              this.createTime = '创建时间： ' + this.$tool.dateFormat(
                res.data.create_time * 1000
              );
            } else {
              this.content = "";
            }
          } else {
            this.content = "";
          }
        });
         
      },
  },
};
</script>

<style scoped lang="scss">
.informationBox {
  padding: 30rpx;
  /deep/ img {
    max-width: 100%;
  }
}
</style>
