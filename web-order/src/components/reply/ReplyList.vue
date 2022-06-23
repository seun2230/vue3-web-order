<template>
  <div class="reply-container">
    <div class="reply-content">
      <!-- {{ reply.id_reply }} -->
      <el-avatar>
        {{ reply.users_user_id }}
      </el-avatar>
      <div class="reply-item">
        <span 
          class="item__user">
          {{ reply.users_user_id }}
        </span>
        <span>{{ reply.reply_date }}</span>
        <span 
          class="item__text">
          {{ reply.reply_text }}
        </span>
      </div>
      <ReplyListButton
        :reply="reply"
        :my-comment="myComment" />
    </div>
  </div>
</template>

<script>
import ReplyListButton from './ReplyListButton.vue';

export default {
  components: {
    ReplyListButton
  },
  props: {
    reply: {
      type: Object,
      default: function() { return{} }
    },
    myComment: {
      type: Object,
      default: function() { return{} }
    }
  },  
}
</script>

<style scoped lang="scss" >
.reply-container {
  margin-top: 20px;
  border: 2px solid #f8f9fa;
  background-color: #fff; 
  box-shadow: 2px 2px 1px #0000001a;
  border-radius: .5rem;
  padding: 10px;
  .reply-content {
    display: flex;
    margin: 10px;
    .reply-item {
      padding-left: 10px;
      width: 100%;
      color: #333;
      font-size: 14px;
      span {
        display: block;
      }
      .item__user {
        color: #333;
        font-weight: bold;
      }
      .item__text {
        width: auto;
        margin-top: 10px;
        font-size: 16px;
      } 
    }
  }
}
</style>