<template>
  <div class="reply-container">
    <div class="reply-content">
      <el-avatar>{{ reply.users_user_id }}</el-avatar>
      <div class="reply-item">
        <span>{{ reply.users_user_id }}</span>
        <span>{{ reply.reply_date }}</span>
        <span class="reply-text">{{ reply.reply_text }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      textarea: '',
      toggle: false,
    }
  },
  props: {
    reply: {
      type: Object,
      default: function() { return{} }
    }
  },
  methods: {
    closeToggle() {
      this.toggle = false;
    },
    clickToggle() {
      this.toggle = true;
    }
  },
}
</script>

<style scoped lang="scss" >
.reply-container {
  margin-top: 20px;
  .reply-content {
    // background-color: beige;
    display: flex;

    .reply-item {
      margin-left: 10px;
      width: auto;
    
      .reply-text {
        width: auto;
        background-color: #e5eaf3;
        border-radius: .5rem;
        font-size: 16px;
        // margin: 30px;
        padding: 15px;
      } 
    }
  }
}

span {
  display: block;
  font-size: 14px;
  color: slategray;
}
</style>