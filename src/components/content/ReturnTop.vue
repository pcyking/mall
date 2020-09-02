<template>
  <div class="back-top">
    <!-- 回到顶部 -->
    <img src="@/assets/img/common/top.png" />
  </div>
</template>

<script>
export default {
  name: "ReturnTop",
};
</script>
<style lang="less" scoped>
.back-top {
  position: fixed;
  right: 10px;
  bottom: 60px;
  background-color: #fff;
  width: 43px;
  height: 43px;
  border-radius: 50%;
  img {
    width: 100%;
    height: 100%;
  }
}
</style>