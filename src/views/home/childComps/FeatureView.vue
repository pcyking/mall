<template>
  <div class="feature_view">
    <a href>
      <img :src="img" alt />
    </a>
  </div>
</template>

<script>
export default {
  name: "FeatureView",
  data() {
    return {
      img: require("@/assets/img/home/recommend_bg.png"),
    };
  }
};
</script>
<style lang="less" scoped>
.feature_view{
  a{
    display: block;
    width: 100vw;
    height: 17rem;
    margin-top: 1rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
</style>