<template>
  <div class="category">
    <category-tab></category-tab>
    <category-content :categoryList="categoryList"></category-content>
  </div>
</template>

<script>
// 网路请求js模块
import { getCategory } from "@/network/category.js";
//组件
import categoryTab from "./cateComps/CategoryTab"; //顶部标题栏
import categoryContent from "./cateComps/CategoryContent"; //分类页主要区域
export default {
  name: "Category",
  data() {
    return {
      categoryList: [],
    };
  },
  created() {
    getCategory().then((res) => {
      const { list } = res.data.category;
      // console.log(res.data);
      // console.log(list);
      this.categoryList = list;
    });
  },
  components: {
    categoryTab,
    categoryContent,
  },
};
</script>
<style scoped>
</style>