<template>
  <div>
    <van-swipe class="my-swiper" :autoplay="2000">
      <van-swipe-item v-for="(item, index) in banner" :key="index">
        <img :src="item.image" @load="imageLoad"/>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
  props: {
    banner: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false
    }
  },
  methods: {
    imageLoad() {
      if(!this.isLoad){
        this.isLoad = true
        this.$emit('swiperImageLoad')
      }
    }
  }
};
</script>
<style lang="less" scoped>
.my-swiper{
  font-size: 50px;
  // margin-top: 46px;
  width: 100vw;
  height: 3.9em;
  .van-swipe-item{
    width: 100%;
    height: 100%;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>