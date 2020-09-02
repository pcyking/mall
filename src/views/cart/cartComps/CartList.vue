<template>
  <scroll>
    <div class="cart_list" v-for="(item,index) of cartList" :key="index">
      <van-checkbox v-model="item.isCheck"></van-checkbox>
      <van-card
        class="van_cart"
        :num="item.count"
        :price="item.price"
        :desc="item.desc"
        :title="item.title"
        :thumb="item.image"
      >
        <template #footer>
          <van-button size="small">+</van-button>
          <van-button size="small">-</van-button>
        </template>
      </van-card>
    </div>
  </scroll>
</template>

<script>

import Scroll from "components/common/scroll/Scroll.vue";
export default {
  name: "CartList",
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  components:{
    Scroll
  },
  data() {
    return {
    };
  },
};
</script>
<style lang='less' scoped>
.wrapper {
    height: calc(100vh - 166px);
    overflow: hidden;
}
.cart_list {
  display: flex;
  background-color: #fafafa;
  margin-top: 0.6rem;
  .van-checkbox {
    padding-bottom: 32px;
  }
  .van-checkbox {
    margin-left: 0.6rem;
  }
  .van_cart {
    padding: 8px 0 8px 4px;
  }
  .van-card:not(:first-child) {
    width: 90%;
    margin-top: 0;
  }
}
</style>