<template>
  <div class="reply-container">
    <div class="reply-content">
      <span>{{ reply.users_user_id }}</span>
      <div class="reply-right">
        <p>{{ reply.reply_text }}</p>
      </div>
      <div class="reply-date">
        <span style="font-size: 15px; color: grey">{{ reply.reply_date }}</span>
      </div>
      <form>
        <div class="form-hidden">
          <div v-if="toggle">
            <el-input
              v-if="toggle"
              v-model="textarea"
              maxlength="100"
              placeholder="댓글 수정 ..."
              show-word-limitcd
              type="textarea" />
            <el-button 
              type="text"
              @click="modifyReply(this.reply.id_reply,this.textarea);this.textarea=``">수정
            </el-button>
            <el-button 
              type="text"
              @click="deleteReply(this.reply.id_reply)">삭제
            </el-button>
            <el-button
              type="text"
              @click="closeToggle()">닫기
            </el-button>
          </div>
          <el-button
            v-else
            type="text"
            class="btn-toggle"
            @click="clickToggle()">재등록
          </el-button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      textarea: '',
      toggle: false
    }
  },
  props: {
    reply: {
      type: Object,
      default: function() { return{} }
    },
    deleteReply : {
      type:Function
    },
    modifyReply : {
      type:Function
    }

    
  },
  methods: {
    closeToggle() {
      this.toggle = false;
    },
    clickToggle() {
      this.toggle = true;
    },
   
    
  }
}
</script>

<style lang="scss" >
.reply-container {
  padding: 10px;

}
.reply-content {
  // display: inline-block;
   span {
    font-weight: bold;
    padding-right: 10px;
  }
  .reply-right{
    position: relative;
    background: #eaf1f1;
    align-items: center;  
    display: inline-block;  
    width: auto;
    border-radius: .2em;
    box-shadow: 0 4px 2px -4px black;
    margin-bottom: 10px;
    p {
      margin: 0px;
      padding: 10px;
    }
  }

  .reply-right::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    border: 20px solid transparent;
    border-right-color: #eaf1f1;
    border-left: 10px;
    border-top: 0;
    margin-top: -10px;
    margin-left: -10px;
  }  
}

</style>