<template>
  <div class="detail_info">
    <h5 class="title">{{ goodsInfo.title }}</h5>
    <div class="price">
      <span class="new_price">{{ goodsInfo.newPrice }}</span>
      <span class="old_price">{{ goodsInfo.oldPrice }}</span>
      <span class="discount">{{ goodsInfo.discount }}</span>
    </div>
    <div class="columns">
      <span v-for="(item,index) in goodsInfo.columns" :key="index">{{item}}</span>
    </div>
    <div class="services">
      <div class="services_item" v-for="(item,index) in goodsInfo.services" :key="index">
        <img :src="item.icon" />
        <span>{{item.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailBaseInfo",
  props: {
    goodsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style lang="less" scoped>
.detail_info {
  padding: 0 .4rem;
  .title {
    font-size: 0.8rem;
    margin: .6rem 0;
  }
  .price {
    display: flex;
    align-items: center;
    margin: 0.3rem 0;
    .new_price {
      font-size: 1.8rem;
      color: #f02430;
    }
    .old_price {
      font-size: 1rem;
      color: gray;
      margin: 0 10px;
      align-self: flex-end;
      text-decoration: line-through;
    }
    .discount {
      font-size: 1rem;
      color: white;
      padding: .4rem .2rem;
      background-image: linear-gradient(to right, #f02430, #f9615e);
      border-radius: 0.3rem;
    }
  }
  .columns {
    display: flex;
    justify-content: space-between;
    span {
      line-height: 1.8rem;
      color: #999;
      font-size: .9rem;
    }
  }
  .services {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #f3f5f4;
    height: 1.8rem;
    .services_item {
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: .8rem;
        height: .8rem;
      }
      span {
        font-size: 0.7rem;
      }
    }
  }
}
</style>