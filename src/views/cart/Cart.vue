<template>
  <div class="cart">
    <!-- 顶部导航 -->
    <van-nav-bar title="购物车" fixed />
    <!-- 当购物车不为空时，展示商品信息 -->
    <cart-list v-if="cartList.length > 0" :cartList="cartList"></cart-list>
    <!-- 当购物车为空时 -->
    <div v-if="cartList.length==0" class="img">
      <img :src="img" />
      <div></div>
    </div>
    <!-- 支付订单栏 -->
    <cart-pay></cart-pay>
  </div>
</template>

<script>
import CartList from "./cartComps/CartList";
import CartPay from "./cartComps/CartPay";
export default {
  name: "Cart",
  data() {
    return {
      cartList: this.$store.state.cartList,
      img: require("../../assets/img/gouwuc.jpg"),
    };
  },
  methods: {
    back() {
      this.$router.back();
    },
  },
  components: {
    CartList,
    CartPay,
  },
};
</script>
<style lang='less' scoped>
/deep/.van-nav-bar__title,
/deep/.van-icon {
  color: white;
  font-size: 16px;
}
.van-nav-bar {
  background-color: #ff8e97;
}
.cart {
  height: calc(100vh - 160px);
  background-color: #f2f2f2;
  padding: 50px 0;
}
.img {
  height: calc(100% - 96px);
  background-color: #f2f2f2;
  img {
    width: 100%;
  }
  div {
    width: 100%;
    height: 3rem;
    background-color: #f2f2f2;
  }
}
</style>