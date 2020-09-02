// 防抖函数的导入
import { debounce } from "common/utils.js";

import ReturnTop from "components/content/ReturnTop.vue";

export const refresh = {
  mounted() {
    // 监听item中图片加载完成  使用防抖函数
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on("itemImgLoad", this.itemImgListener);
  },
}

// 返回顶部封装
export const backTopmixin = {
  components:{
    ReturnTop
  },
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    // 回到顶部
    backTop() {
      this.$refs.scroll.scrollTop(0, 0);
    },
  }
}