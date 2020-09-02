<template>
  <div>
    <van-tabbar
      v-model="active"
      active-color="#F02430"
      inactive-color="#000000"
      route
      :border="true"
    >
      <van-tabbar-item icon="home-o" to="/home">首页</van-tabbar-item>
      <van-tabbar-item icon="qr" to="/category">分类</van-tabbar-item>
      <van-tabbar-item
        icon="cart-o"
        to="/cart"
        :badge="count"
      >购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/profile">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "TabFooter",
  data() {
    return {
      active: 0
    };
  },
  computed:{
    count(){
      return this.$store.state.cartList.length * 1 > 0 ? this.$store.state.cartList.length * 1 : ''
    }
  }
};
</script>
<style scoped>
</style>