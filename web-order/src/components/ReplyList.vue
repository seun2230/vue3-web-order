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
  border: 2px solid #f8f9fa;
  // background-color: #f4f4f5; 
  box-shadow: 2px 2px 1px #0000001a;
  border-radius: .5rem;
  padding: 15px;
  width: auto;
  .reply-content {
    display: flex;
    .reply-item {
       padding: 10px;
      .reply-text {
        width: auto;
        margin-top: 10px;
        font-size: 16px;
        // font-weight: bold;
      } 
    }
  }
}

span {
  display: block;
  font-size: 14px;
  // color: slategray;
  color: #333;
}
</style>