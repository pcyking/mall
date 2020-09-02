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
          <van-button size="small" @click="addCount(index)">+</van-button>
          <van-button size="small" @click="reduceCount(index)">-</van-button>
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
  data() {
    return {
      isShow: false,
    };
  },
  methods: {
    addCount(index) {
      this.cartList[index].count++;
    },
    reduceCount(index) {
      if (!(this.cartList[index].count === 1)) {
        this.cartList[index].count--;
      } else {
        this.dialog(index);
      }
    },
    dialog(index) {
      this.$dialog
        .confirm({
          title: "温馨提示！",
          message: "您确定要删除此商品吗？",
        })
        .then(() => {
          this.cartList.forEach((item, i) => {
            if (i === index) {
              this.cartList.splice(i, 1);
            }
          });
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  components: {
    Scroll,
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