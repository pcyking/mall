<template>
  <div class="params_info" v-if="Object.keys(paramsInfo).length !== 0">
    <div class="explain">{{ paramsInfo.rule.key }}</div>
    <table class="rule">
      <tr v-for="(item,index) in paramsInfo.rule.tables[0]" :key="index">
        <td v-for="(item1,index1) in item" :key="index1">{{item1}}</td>
      </tr>
    </table>
    <div class="explain">{{ paramsInfo.info.key }}</div>
    <div class="info">
      <tr v-for="(item,index) in paramsInfo.info.set" :key="index">
        <td class="left">{{ item.key }}</td>
        <td class="right">{{ item.value }}</td>
      </tr>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailParamsInfo",
  props: {
    paramsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
};
</script>
<style lang="less" scoped>
.params_info {
  color: #000;
  .explain {
    font-size: 1.2rem;
    margin: 0.8rem 0 0.8rem 0.8rem;
  }
  .rule {
    border-top: 0.06rem solid #ebebeb;
    padding: 1rem;
    width: 100vw;
    font-size: 1rem;
    display: table-cell;
    tr {
      display: flex;
      justify-content: space-between;
      // align-items: center;
      border-bottom: 1px solid #ebebeb;
      line-height: 2.8rem;
    }
  }
  .info {
    border-top: 0.2rem solid #ebebeb;
    padding: 1rem;
    width: 100vw;
    font-size: 1rem;
    box-sizing: border-box;
    tr {
      display: flex;
      border-bottom: 1px solid #ebebeb;
      line-height: 2.8rem;
      text-align: left;
      .left {
        flex: 2;
      }
      .right {
        flex: 5;
        color: red;
        font-size: 0.8rem;
      }
    }
  }
}
</style>