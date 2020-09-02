<template>
  <div class="detail_footer_bar">
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
      <van-goods-action-icon icon="cart-o" text="购物车" />
      <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
      <van-goods-action-button type="warning" text="加入购物车" @click="addCart" />
      <van-goods-action-button type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
export default {
  name: "DetailFooterBar",
  methods:{
    addCart() {
      this.$emit("addCart")
    }
  }
};
</script>
<style lang="less" scoped>
.van-goods-action {
  border-top: 1px solid #fbfbfb;
}
</style>