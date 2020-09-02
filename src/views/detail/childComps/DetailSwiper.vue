<template>
  <div class="detail_swiper">
    <van-swipe class="my-swiper" :autoplay="2000">
      <van-swipe-item v-for="(item, index) in detailSwiper" :key="index">
        <img :src="item"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "DetailSwiper",
  props: {
    detailSwiper: {
      type: Array,
      default() {
        return [];
      },
    },
  },
};
</script>
<style lang="less" scoped>
.van-swipe{
  height: 100%
}
    .detail_swiper{
        width: 100vw;
        height: 16rem;
        margin-top: 46px;
        overflow: hidden;
        img{
            width: 100vw;
        }
    }
</style>