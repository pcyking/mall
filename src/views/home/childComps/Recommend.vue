<template>
   <div class="recommend">
     <div class="recommend-item" v-for="(item,index) in recommend" :key="index">
       <a :href="item.link">
         <img :src="item.image" alt="">
       </a>
     </div>
   </div>
</template>

<script>
export default {
  name: 'Recommend',
  props:{
    recommend: {
      type: Array,
      default() {
        return [];
      }
    }
  }
}

</script>
<style lang="less" scoped>
   .recommend{
     display: flex;
     justify-content: space-around;
     margin-top: .8em;
     img{
       width: 20vw;
       height: 20vw;
     }
   }
</style>