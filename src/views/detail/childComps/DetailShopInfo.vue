<template>
  <div class="detail_shop_info">
    <div class="shop">
      <img :src="shopInfo.logo" />
      <div class="name">{{shopInfo.name}}</div>
    </div>
    <div class="describe">
      <div class="left">
        <div class="num">
          <div class="top">{{ shopInfo.sells}}</div>
          <p>总数量</p>
        </div>
        <div class="bady">
          <div class="top">{{ shopInfo.fans }}</div>
          <p>全部宝贝</p>
        </div>
      </div>
      <div class="right">
        <div class="item_info" v-for="(item,index) in shopInfo.score" :key="index">
          <span>{{ item.name }}</span>
          <span class="branch" :class="{better_color:item.isBetter}">{{ item.score }}</span>
          <span class="evaluate" :class="{better_bg:item.isBetter}">{{ item.isBetter?'高':'低' }}</span>
        </div>
      </div>
    </div>
    <div class="btn">
      <button>进店逛逛</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style lang='less' scoped>
.detail_shop_info {
  display: flex;
  flex-direction: column;
  border-top: 0.2rem solid #f5f4f7;
  .shop {
    padding: 0.8rem 0 0.4rem 0;
    display: flex;
    img {
      width: 4.5rem;
      height: 4.5rem;
      border-radius: 50%;
      border: 1px solid #f5f4f7;
    }
    .name {
      line-height: 5rem;
      margin-left: 1rem;
    }
  }
  .describe {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #000;
    .left {
      width: 48%;
      display: flex;
      justify-content: space-around;
      //  align-content: center;
      text-align: center;
      .top {
        font-size: 1.1rem;
        font-weight: bold;
      }
      p {
        margin-top: 0.3rem;
        font-size: 0.9rem;
      }
      .bady {
        padding: 0 1.8rem 0 0;
        border-right: 2px solid #f4f4f4;
      }
    }
    .right {
      width: 44%;
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      padding-right: 0.8rem;
      height: 4.6rem;
      .item_info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          font-size: 0.9rem;
          line-height: 1.2rem;
        }
        .branch {
          color: red;
        }
        .better_color {
          color: #67914b;
        }
        .better_bg {
          background-color: #67914b !important;
        }
        .evaluate {
          background-color: red;
          color: white;
          padding: 0 3px;
        }
      }
    }
  }
  .btn {
    width: 100%;
    margin-top: 1.4rem;
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 0 0 2rem 0;
    border-bottom: 0.2rem solid #f8f8f8;
    button {
      border-radius: 0.6rem;
      padding: 1rem 2.2rem;
      border: none;
      font-size: 1.2rem;
      color: #85868b;
      background-color: #f1f5fb;
    }
  }
}
</style>