<template>
  <div class="detail_info" v-if="Object.keys(detailInfo).length !== 0">
    <div class="title">
      <div class="start">
        <div class="spot"></div>
        <div class="line"></div>
      </div>
      <div class="desc">{{ detailInfo.desc }}</div>
      <div class="end">
        <div class="spot"></div>
        <div class="line"></div>
      </div>
    </div>
    <div class="content" v-for="(item,index) in detailInfo.detailImage" :key="index">
      <div class="look">{{ item.key }}</div>
      <div class="img">
        <img :src="item" v-for="(item,index) in item.list" :key="index" @load="itemImgLoad" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailImageInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    // 图片加载之后会自动调用
    itemImgLoad() {
      this.$bus.$emit("itemImgLoad");
      this.$emit("item");
    },
  },
};
</script>
<style lang="less" scoped>
.detail_info {
  margin-top: 0.3rem;
  .title {
    display: flex;
    flex-direction: column;
    padding: 0.6rem;
    .start {
      .spot {
        width: 0.1rem;
        height: 0.1rem;
        border: 1px solid #000000;
        background-color: #000000;
      }
      .line {
        width: 5rem;
        height: 1px;
        background-color: #d5d5d5;
      }
    }
    .desc {
      margin: 0.6rem 0;
      font-size: 0.85rem;
    }
    .end {
      align-self: flex-end;
      display: flex;
      flex-direction: column;
      right: 0px;
      // width: 4rem;
      .spot {
        align-self: flex-end;
        width: 0.1rem;
        height: 0.1rem;
        background-color: #000000;
        border: 1px solid #000000;
      }
      .line {
        width: 5rem;
        height: 1px;
        align-self: flex-end;
        background-color: #d5d5d5;
      }
    }
  }
  .content {
    .look {
      font-size: 0.8rem;
      padding-left: 0.6rem;
      margin-bottom: 0.8rem;
      color: #333;
    }
    .img {
      img {
        width: 100vw;
        // height: 10.24rem;
      }
    }
  }
}
</style>