<template>
  <div class="category_content">
    <div class="title">
      <div
        :class="{active: countIndex==index}"
        v-for="(item,index) in categoryList"
        :key="index"
        @click="indexChange(index,item)"
      >{{ item.title }}</div>
    </div>
    <div class="content">
      <div v-for="(item,index) in cateContentList" :key="index">
        <!-- <a :href="item.link"> -->
        <img :src="item.image" />
        <p>{{ item.title }}</p>
        <!-- </a> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getSubCategory } from "../../../network/category.js";
export default {
  name: "CategoryContent",
  props: {
    categoryList: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      countIndex: 0,
      maitkey: 3627,
      cateContentList: [],
    };
  },
  created() {
    getSubCategory(this.maitkey).then((res) => {
      // console.log(res);
      this.cateContentList = res.data.list;
    });
  },
  methods: {
    indexChange(index, item) {
      this.countIndex = index;
      this.maitKey = item.maitKey;
      // console.log(this.maitKey);
      getSubCategory(this.maitKey).then((res) => {
        // console.log(res);
        this.cateContentList = res.data.list;
      });
    },
  },
};
</script>
<style lang="less" scoped>
.category_content {
  margin-top: 46px;
  overflow: hidden;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .title {
    background-color: #f7f7f7;
    text-align: center;
    float: left;
    overflow: auto;
    width: 30%;
    height: calc(100% - 50px);
    div {
      line-height: 2.9rem;
      font-size: 1.4rem;
    }
    div:hover {
      cursor: pointer;
    }
    .active {
      background-color: #ffffff;
      border-left: 3px solid #ff8a9d;
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    float: left;
    overflow: auto;
    width: 70%;
    height: calc(100% - 50px);
    div {
      img {
        width: 6.4rem;
        height: 6.4rem;
      }
      p {
        font-size: 1rem;
        text-align: center;
      }
    }
  }
}
</style>