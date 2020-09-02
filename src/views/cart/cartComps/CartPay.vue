<template>
  <van-submit-bar :price="getPrice * 100" :button-text="goodsTotal" @submit="toPay">
    <van-checkbox v-model="isCheckedAll" @click="checkChangeAll">全选</van-checkbox>
    <!-- <template #tip>
        你的收货地址不支持同城送,
        <span>修改地址</span>
    </template>-->
  </van-submit-bar>
</template>

<script>
export default {
  name: "CartPay",
  data() {
    return {
      cartList: this.$store.state.cartList,
    };
  },
  methods: {
    checkChangeAll() {
      if (this.isCheckedAll) {
        this.cartList.forEach((item) => {
          return (item.isCheck = false);
        });
      } else {
        this.cartList.forEach((item) => {
          return (item.isCheck = true);
        });
      }
    },
    toPay() {
      if (this.postTatal == 0 && this.cartList.length > 0) {
        this.$toast.setDefaultOptions({ duration: 1000 }); //把默认的弹框时间设置为1秒;
        this.$toast("您还没有选择要支付的商品哦~");
      }
    },
  },
  computed: {
    isCheckedAll: {
      get() {
        if (this.cartList.length === 0) {
          return false;
        } else {
          return this.cartList.every((item) => {
            return item.isCheck === true;
          });
        }
      },
      set() {},
    },
    postTatal() {
      return this.cartList
        .filter((item, index) => {
          return item.isCheck;
        })
        .reduce((total, item2) => {
          return total + item2.count;
        }, 0);
    },
    goodsTotal() {
      return "提交订单" + "(" + this.postTatal + ")";
    },
    getPrice() {
      return this.cartList
        .filter((item, index) => {
          return item.isCheck;
        })
        .reduce((total, item2) => {
          return total + item2.price * item2.count;
        }, 0);
    },
  },
};
</script>
<style lang='less' scoped>
.van-submit-bar {
  bottom: 60px;
}
</style>