<template>
  <div class="wrap">
    <!-- 顶部 nav-bar -->
    <van-nav-bar title="购物街" :border="false" />
    <tab-control
      :title="['流行','新款','精选']"
      @titleChange="titleChange"
      ref="tabControl1"
      class="tabControl"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      :probe-type="3"
      ref="scroll"
      @scroll="contentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <van-pull-refresh
        v-model="isLoading"
        loading-text="刷新中..."
        success-text="刷新成功!"
        @refresh="onRefresh"
      >
        <!-- 轮播图 -->
        <home-swiper :banner="banner" @swiperImageLoad="swiperImageLoad"></home-swiper>
        <!-- 推荐 -->
        <recommend :recommend="recommend" />
        <!-- 推荐下面的介绍 -->
        <feature-view></feature-view>
        <!-- 导航吸顶 -->
        <!-- tabControl导航 -->
        <tab-control :title="['流行','新款','精选']" @titleChange="titleChange" ref="tabControl2"></tab-control>
        <goods-list :goods="showGoods"></goods-list>
      </van-pull-refresh>
    </scroll>
    <return-top @click.native="backTop" v-show="isShow" />
  </div>
</template>

<script>
//网络请求 js 模块
import { getHomeMultidata, getHomeGoods } from "@/network/home.js";
// 导入混入模块
import { refresh, backTopmixin } from "@/common/mixin.js";

// home 子组件
import HomeSwiper from "./childComps/HomeSwiper.vue"; //轮播图
import Recommend from "./childComps/Recommend.vue"; // 推荐
import FeatureView from "./childComps/FeatureView.vue"; //本周流行

// 公共组件
import TabControl from "components/content/TabControl.vue";
import GoodsList from "components/content/goods/GoodsList.vue";
import Scroll from "components/common/scroll/Scroll.vue";
import ReturnTop from "components/content/ReturnTop.vue";

export default {
  name: "Home",
  data() {
    return {
      banner: [],
      recommend: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShow: false,
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0,
      isLoading: true,
    };
  },
  mixins: [refresh, backTopmixin],
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
  // 保存当前滚动的y值，
  activated() {
    this.$refs.scroll.refresh();
    this.$refs.scroll.scrollTop(0, this.saveY, 0);
  },
  deactivated() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
    this.saveY = this.$refs.scroll.getScrollY();
  },
  created() {
    this.getHomeMultidata();

    //请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  methods: {
    /**
     * 网络请求相关
     */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        console.log(res);
        // 获取轮播图数据
        this.banner = res.data.banner.list;
        // 获取轮播图下面的推荐数据
        this.recommend = res.data.recommend.list;
      });
    },
    getHomeGoods(currentType) {
      var page = this.goods[currentType].page + 1;
      getHomeGoods(currentType, page).then((res) => {
        this.goods[currentType].list.push(...res.data.list);
        this.goods[currentType].page += 1;
        // console.log(this.goods[currentType].list);
        // 完成上拉加载更多
        this.$refs.scroll.finishPullUp();
      });
    },
    /**
     * 事件监听相关的方法
     */
    titleChange(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
      }
      this.$refs.tabControl1.contorlIndex = index;
      this.$refs.tabControl2.contorlIndex = index;
    },
    // 回到顶部isShow的控制
    contentScroll(position) {
      // 1 判断returntop是否显示
      this.isShow = -position.y > 1000;
      // 2 决定tabControl是否吸顶（position：fixed）
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    // 上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    onRefresh() {
      setTimeout(() => {
        this.getHomeGoods(this.currentType);
        this.isLoading = false;
      }, 1000);
    },
  },
  components: {
    HomeSwiper,
    Recommend,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    ReturnTop,
  },
};
</script>
<style lang="less" scoped>
.wrap {
  // position: relative;
  .tabControl {
    position: relative;
    z-index: 9;
  }
  .content {
    position: absolute;
    top: 44px;
    bottom: 56px;
    left: 0;
    right: 0;
  }
  .van-nav-bar {
    background-color: #ff8a9d;
    /deep/.van-nav-bar__title {
      color: #fff;
    }
  }
  .fixed {
    position: fixed;
    top: 46px;
    left: 0;
    right: 0;
  }
}
</style>