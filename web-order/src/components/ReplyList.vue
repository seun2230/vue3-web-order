<template>
  <div class="reply-container">
    <div class="reply-content">
      {{ reply.id_reply }}
      <el-avatar>{{ reply.users_user_id }}</el-avatar>
      <div class="reply-item">
        <span>{{ reply.users_user_id }}</span>
        <span>{{ reply.reply_date }}</span>
        <span class="reply-text">{{ reply.reply_text }}</span>
      </div>
      <input
        v-model="textarea"
        type="textarea" />
      <button
        @click.self.prevent="modifyReply()">
        수정
      </button>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      textarea: '',
    }
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
  methods: {
    closeToggle() {
      this.toggle = false;
    },
    clickToggle() {
      this.toggle = true;
    },
    modifyReply() {
      console.log("click success");
      const id = this.$route.params.id;
      console.log("reply id", this.reply.id_reply);
      const reply_id = this.reply.id_reply;
      const reply_text = this.textarea;

      let data = [{ 
        "comment_id": id,
        "reply_id": reply_id,
        "reply_text": reply_text }];

      this.$store.dispatch('comment/modifyReply', data);
      this.textarea='';
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