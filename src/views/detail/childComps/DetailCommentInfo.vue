<template>
   <div class="comment_info" v-if="Object.keys(commentInfo).length !==0 ">
      <div class="header">
        <span>用户评价</span>
        <span>更多</span>
      </div>
     <div class="user">
       <img :src="commentInfo.user.avatar" />
       <div class="name">{{ commentInfo.user.uname }}</div>
     </div>
     <div class="comment">
       <p>{{ commentInfo.content }}</p>
       <div class="center">
         <div class="data">{{ commentInfo.created | showDate }}</div>
         <span>{{ commentInfo.style }}</span>
       </div>
        <div class="img">
          <img :src="item" v-for="(item,index) in commentInfo.images" :key="index"/>
        </div>
     </div>
   </div>
</template>

<script>
import { dateFormat} from "@/common/utils.js"
export default {
  name: 'DetailCommentInfo',
  props: {
    commentInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  filters: {
    showDate(value) {
      // 1.将服务器返回的时间戳转化为Date对象
      let data = new Date(value*1000) // 因为服务器返回的时间是毫秒，所以乘以1000
      // 2 将date进行时间格式化
      return dateFormat("yyyy-MM-dd hh:mm",data)
    }
  }
}

</script>
<style lang="less" scoped>
   .comment_info{
     .header{
       display: flex;
       justify-content: space-between;
        border-bottom: 2px solid #eee;
       span{
         padding: .6rem .6rem;
         box-sizing: border-box;
       }
     }
     .user{
       padding: .8rem;
       display: flex;
        align-items: center;
       img{
         width: 5rem;
         height: 5rem;
         border-radius: 50%;
       }
       .name{
         padding-left: 1rem;
       }
     }
     .comment{
       padding: .2rem .8rem;
       p{
         color: #000;
         font-size: 1rem;
       }
       .center{
         padding: .6rem 0;
         display: flex;

         .data{}
         span{
           padding: 0 1rem;
         }
       }
       .img{
         img{
           width: 4rem;
           height: 4rem;
           border-radius: 1rem;
         }
       }
     }
   }
</style>