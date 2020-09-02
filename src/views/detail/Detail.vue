<template>
  <div class="detail">
    <!-- 导航栏 -->
    <van-nav-bar class="detail_nav" fixed left-arrow title="标题" @click-left="onClickLeft">
      <div slot="title" class="title">
        <span
          :class="{active:currentIndex == index}"
          v-for="(item,index) of title"
          :key="index"
          @click="titleIndex(index)"
        >{{ item }}</span>
      </div>
    </van-nav-bar>
    <scroll ref="scroll" :probe-type="3" @scroll="ContentScrollY">
      <!-- 轮播图组件 -->
      <detail-swiper :detail-swiper="detailSwiper" />
      <!-- 基本信息组件 -->
      <detail-base-info :goodsInfo="goodsInfo" />
      <!-- 店铺信息 -->
      <detail-shop-info :shopInfo="shopInfo" />
      <!-- 商品图片详细信息 -->
      <detail-image-info :detailInfo="detailInfo" @item="item" />
      <!-- 商品参数信息 -->
      <detail-params-info ref="params" :paramsInfo="paramsInfo" />
      <!-- 商品评论信息 -->
      <detail-comment-info ref="comment" :commentInfo="commentInfo" />
      <!-- 商品推荐 -->
      <goods-list ref="recommend" :goods="recommend" />
      <!-- 底部商品导航 -->
    </scroll>
    <return-top @click.native="backTop" v-show="isShow" />
    <detail-footer-bar class="footer_bar" @addCart="addToCart" />
  </div>
</template>

<script>
//js网络请求模块
import { getDetail, Goods, Shop, getRecommend } from "@/network/detail.js";

// 导入混入模块
import { refresh, backTopmixin } from "@/common/mixin.js";

// 引入组件
import DetailSwiper from "./childComps/DetailSwiper.vue";
import DetailBaseInfo from "./childComps/DetailBaseInfo.vue";
import DetailShopInfo from "./childComps/DetailShopInfo.vue";
import DetailImageInfo from "./childComps/DetailImageInfo.vue";
import DetailParamsInfo from "./childComps/DetailParamsInfo.vue";
import DetailCommentInfo from "./childComps/DetailCommentInfo.vue";
import GoodsList from "@/components/content/goods/GoodsList.vue";
import DetailFooterBar from "./childComps/DetailFooterBar.vue";

import ReturnTop from "components/content/ReturnTop.vue";
// 防抖函数的导入
import { debounce } from "common/utils.js";
import Scroll from "components/common/scroll/Scroll.vue";

export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
      detailSwiper: [], // 轮播图数据
      goodsInfo: {}, // 保存基本商品信息对象
      shopInfo: {}, // 店铺信息对象
      detailInfo: {}, // 商品详情信息
      paramsInfo: {}, // 商品参数信息
      commentInfo: {}, // 商品评论信息
      recommend: [], //商品推荐数据
      themToys: [], // 导航栏对应的内容距离顶部的距离
      getThemYoys: null,
      positionY: 0, // 保存滚动的y值
    };
  },
  mixins: [refresh, backTopmixin],
  created() {
    // 获取iid
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const { result } = res;
      // 轮播图数据
      this.detailSwiper = result.itemInfo.topImages;

      //es6 语法中的创建一个实例对象 记住，一定要加new;
      //创建商品信息数据对象
      this.goodsInfo = new Goods(
        result.itemInfo,
        result.columns,
        result.shopInfo.services
      );
      // 创建店铺信息数据对象
      this.shopInfo = new Shop(result.shopInfo);

      // 取出商品详情信息
      this.detailInfo = result.detailInfo;

      // 取出参数信息
      this.paramsInfo = result.itemParams;
      // console.log(this.paramsInfo);

      // 取出商品的评论信息
      if (result.rate.cRate !== 0) {
        // 因为有的商品没有评论
        this.commentInfo = result.rate.list[0];
      }
    });

    //商品推荐接口请求
    getRecommend().then((res) => {
      const { list } = res.data;
      // this.recommend = list;
      // console.log(this.recommend)
      let temp = [];
      for (let i in list) {
        temp.push(list[i]);
      }
      this.recommend = temp;
      // console.log(this.recommend);
    });

    this.getThemYoys = debounce(() => {
      this.themToys = [];
      this.themToys.push(0);
      this.themToys.push(this.$refs.params.$el.offsetTop);
      this.themToys.push(this.$refs.comment.$el.offsetTop);
      this.themToys.push(this.$refs.recommend.$el.offsetTop);
      // console.log(this.themToys);
    });
  },
  methods: {
    titleIndex(index) {
      this.currentIndex = index;
      this.$refs.scroll.scrollTop(0, -this.themToys[index] + 46);
    },
    onClickLeft() {
      // console.log('aaa');
      this.$router.go(-1);
      // this.$router.back();
    },
    ContentScrollY(position) {
      const positionY = -position.y + 46;
      let length = this.themToys.length;
      for (let i in this.themToys) {
        if (
          (i * 1 < length - 1 &&
            positionY > this.themToys[i * 1] &&
            positionY < this.themToys[i * 1 + 1]) ||
          (i * 1 === length - 1 && positionY > this.themToys[i])
        ) {
          this.currentIndex = i * 1;
        }
      }
      // 1 判断returntop是否显示
      this.isShow = -position.y > 1000;
    },
    item() {
      this.getThemYoys();
    },
    // 加入购物车
    addToCart() {
      // 1 获取购物车需要的提示信息
      const produce = {};
      produce.image = this.detailSwiper[0];
      produce.title = this.goodsInfo.title;
      produce.desc = this.goodsInfo.desc;
      produce.price = this.goodsInfo.realPrice;
      produce.iid = this.iid;
      // 2 将商品添加到购物车
      // this.$store.commit('addCart',produce)
      this.$store.dispatch("addCart", produce).then((res) => {
        this.$toast.setDefaultOptions({ duration: 1000 }); //把默认的弹框时间设置为1秒;
        this.$toast(res);
      });
      // this.$toast.setDefaultOptions({ duration: 1000 }); //把默认的弹框时间设置为1秒;
      // this.$toast("添加商品成功");
    },
  },
  deactivated() {
    this.$bus.$off("itemImgLoad", this.itemImgListener);
  },
  components: {
    Scroll,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamsInfo,
    DetailCommentInfo,
    GoodsList,
    DetailFooterBar,
  },
};
</script>
<style lang="less" scoped>
/deep/ .van-nav-bar__title {
  min-width: 60%;
}
/deep/ .van-icon::before {
  color: gray;
}
.title:after {
}
.title {
  display: flex;
  justify-content: space-around;
  color: gray;
  font-size: 0.8rem;
  span {
    line-height: 46px;
  }
  .active {
    color: red;
  }
}
.footer_bar {
  position: relative;
  z-index: 999;
}
</style>