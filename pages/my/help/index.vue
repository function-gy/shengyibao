<template>
  <view class="my-help">
    <view
      class="card-box bgfff flex-row m-b-10 br10"
      v-for="(item, index) in list"
      :key="index"
    >
      <view class="left-box">
        <view class="icon" :class="item.icon"></view>
        <view class="label f12">
          {{ item.label }}
        </view>
        <view class="show-icon" v-if="item.child && item.child.length > 2">
          <view
            v-if="ishidden"
            @tap="ishidden = false"
            class="icon icon-xiangxia1"
          ></view>
          <view
            v-else
            @tap="ishidden = true"
            class="icon icon-xiangshang1"
          ></view>
        </view>
      </view>
      <view class="right-box">
        <view
          class="right-row ellipsis"
          @tap="goTo(item2)"
          v-for="(item2, index2) in item.child.slice(
            0,
            ishidden ? 2 : item.child.length
          )"
          :key="index2"
        >
          {{ item2.title }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      ishidden: true,
      list: [
        {
          label: "常见问题",
          icon: "icon-15",
          child: [],
        },
        {
          label: "账户问题",
          icon: "icon-yonghu",
          child: [],
        },
        {
          label: "积分问题",
          icon: "icon-basesalesintegralSpecial",
          child: [],
        },
        {
          label: "商城规则",
          icon: "icon-gouwu1",
          child: [],
        },
      ],
    };
  },
  onLoad() {},
  onReady() {},
  onShow() {},
  created() {
    this.getInfo();
  },
  methods: {
    goTo(e) {
      console.log(e);
      if (e.link && e.is_outside) {
        uni.navigateTo({
          url:
            "/pages/home/components/webView?url=" + encodeURIComponent(e.link),
        });
      } else if (e.is_outside === 0) {
        //内链
        uni.navigateTo({
          url: "/pages/home/components/information?id=" + e.id,
        });
      }
    },
    getInfo() {
      this.$api.userinfo.getHomeArticleList.post().then((res) => {
        if (res.code == 0) {
          this.list[0].child = res.data.type5.type1;
          this.list[1].child = res.data.type5.type2;
          this.list[2].child = res.data.type5.type3;
          this.list[3].child = res.data.type5.type4;
        }
      });
    },
  },
};
</script>

<style scoped lang="scss">
.my-help {
  padding: 20rpx 30rpx;
  .card-box {
    // border-radius: 20rpx;
    // margin-bottom: 20rpx;
  }

  .card-box .left-box {
    width: 190rpx;
    text-align: center;
    padding: 35rpx 0 0;
    .icon {
      font-size: 42rpx;
    }
    .label {
      margin: 10rpx 0;
    }
    .show-icon .icon {
      font-size: 18rpx;
    }
  }
  .card-box .right-box {
    width: calc(100% - 190rpx);
    .right-row {
      height: 90rpx;
      border-left: 2rpx solid #f3f3f3;
      border-bottom: 2rpx solid #f3f3f3;
      line-height: 90rpx;
      box-sizing: border-box;
      font-size: 28rpx;
      padding: 0 30rpx;
    }
    .right-row:last-child {
      border-bottom: none;
    }
  }
}
</style>
