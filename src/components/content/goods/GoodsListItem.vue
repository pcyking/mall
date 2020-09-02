<template>
  <div class="goods_list_item" @click="itemClick">
    <img v-lazy="showImg" @load="imageLoad"/>
    <p>{{ goodsItem.title }}</p>
    <div class="price">
      <p class="price_goods">{{ goodsItem.price }}</p>
      <p>
        <van-icon name="star" />
        {{ goodsItem.cfav }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  data(){
    return{
      id:null
    }
  },
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  created() {
    this.id = this.goodsItem.iid || this.goodsItem.item_id
  },
  methods:{
    // 图片加载之后会自动调用
    imageLoad() {
      this.$bus.$emit('itemImgLoad')
    },
    // 详情页跳转
    itemClick() {
      this.$router.push("/detail/" + this.id)
    }
  },
  computed:{
    showImg() {
      // 前后位置不能颠倒，暂时还没找到原因
      return this.goodsItem.image || this.goodsItem.show.img 
    }
  }
};
</script>
<style lang="less" scoped>
.goods_list_item{
  display: flex;
  width: 46vw;
  flex-direction: column;
  padding: 0 2vw;
  img{
    width: 100%;
    border-radius: .2rem;
  }
  p{
    display: -webkit-box;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    font-size: .8rem;
    padding: 0 0.08rem;
    margin-top: .1rem;
    color: #000;
  }
  .price{
    display: flex;
    justify-content: center;
    margin: -.1rem 0rem .1rem 0rem;
    .price_goods{
      color: #ef232f;
    }
  }
}
</style>