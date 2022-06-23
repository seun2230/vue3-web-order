<template>
  <div class="reply-btn">
    {{ this.reply.id_reply }}
    <div 
      @click="show = !show">
      <i class="fas fa-ellipsis-v"></i>
    </div>
    <transition name="fade">
      <div class="btn__inner">
        <div 
          class="inner__card"
          v-if="show">
          <input 
            class="reply__input"
            v-model="textarea"
            placeholder="댓글을 수정하세요 :)" />
          <span 
            @click.self.prevent="modifyReply(this.reply.id_reply)">
            <i class="fas fa-pen"></i>
            수정하기 
          </span> 
          <span
            @click.self.prevent="deleteReply(this.reply.id_reply)">
            <i class="fas fa-trash-alt"></i>
            삭제하기
          </span>
          <span
            @click="cancleReply()">
            <i class="fas fa-window-close"></i> 
            취소하기
          </span>
        </div>   
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      hidden: '',
      textarea: ''
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
    modifyReply(reply_id) {
      console.log("click modify");
      console.log("reply_id", reply_id);
      const id = this.$route.params.id;
      const reply_text = this.textarea;

      let data = [{ 
        "comment_id": id,
        "reply_id": reply_id,
        "reply_text": reply_text }];

      this.$store.dispatch('reply/modifyReply', data);
      this.textarea='';
    },
    deleteReply(reply_id) {
      console.log("click deleteReply");
      console.log("reply_id", reply_id);
      const id = this.$route.params.id;
      const user_id = this.reply.users_user_id;
      let data = [{ 
        "comment_id": id,
        "reply_id": reply_id,
        "user_id": user_id }];

      this.$store.dispatch('reply/deleteReply', data);
    },
    cancleReply(){
      this.show = false;
    }
  }
}
</script>

<style lang="scss" scoped>
.reply-btn {
  .btn__inner {
    margin: 10px;
    position: fixed;
    width: auto;
    right: 10px;
    bottom: 90px;
    .inner__card {
      outline: none;
      border-radius: .5rem;
      box-shadow:  0px 2px 5px rgb(0,0,0, 0.1);
      background-color: #fffdfd;
      display: flex;
      flex-direction: column;
      z-index: 1;

      span {
        padding: .5rem;
        color: #333;
        text-align: center;
      }
      .reply__input { 
        border: 1px solid #ccc;
        border-radius: .5rem;
        margin: 10px 10px;
        width: auto;
        height: 50px;
        align-items: center;
      }
    }
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@for $i from 1 through 3 {
  .inner__card span:nth-child(#{$i}) {
    border-bottom: 1px solid #ccc;
  }
}
</style>
