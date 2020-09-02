<template>
    <div>
        <van-nav-bar fixed title="商品分类"/>
    </div>
</template>
<script>
export default {
    name: "CategoryTab",
    data() {
        return {};
    }
};
</script>

<style lang="less" scoped>
    .van-nav-bar{
        background-color: #FF8A9D;
    }
    /deep/.van-nav-bar__title{
        color: white;
    }
</style>