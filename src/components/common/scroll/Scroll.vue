<template>
  <!-- 封装滚动组件 -->
  <div class="wrapper" ref="swiper">
    <!-- wrapper里面只能放一个元素，就是滚动的 -->
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default() {
        //默认是0， 不监听滚动
        return 0;
      },
    },
    pullDownRefresh: {
      threshold: 50,
      stop: 20,
    },
    pullUpLoad: {
      type: Boolean,
      default() {
        return false;
      },
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 1 创建BScroll 对象
    this.scroll = new BScroll(this.$refs.swiper, {
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    //2 监听滚动的位置;
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }
    // 3 监听scroll滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  methods: {
    //返回顶部
    // this.xxx && 为了防止页面还没有挂载xxx就调用而报错
    scrollTop(x, y, time = 300) {
      //给它在外面做一层封装, 给它设置一个默认的滚动时间，300毫秒;
      this.scroll && this.scroll.scrollTo(x, y, time);
    },

    //每当图片加载完成后，重新计算可滚动的区域
    refresh() {
      this.scroll && this.scroll.refresh();
      // 因为this.scroll是写在mounted中
      //怕存在 还没有值的情况就调用函数;
      //意思是只有当 this.scroll 创建完成后 才会执行 this.scroll.refresh()
    },
    //当上拉加载事件完成后，调用此方法，才可以进行下一次上拉加载;
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style lang="less" scoped>
.wrapper {
  height: calc(100vh - 96px);
  .content {
    //切记使用 calc 的时候，里面的 - 左右两边一定要有个空格，快被这个bug搞死了;
    background-color: #fff;
    // overflow: hidden;
    // margin-top: 44px;
  }
}
</style>