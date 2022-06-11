<template>
  <div>
    <div class="btn-shadow">
      <div class="btn-card">
        <div 
          class="btn__edit" 
          @click="modifyComment()">
          수정하기
        </div>
        <div 
          class="btn__delete" 
          @click="deleteComment()">
          삭제하기
        </div>
        <div 
          class="btn__cancle" ~~`
          @click="$emit('close')">
          취소
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  emits: ['close'],
  methods: {
    modifyComment() {
      const id = this.$route.params.id;
      this.$router.push('modify/' + id);
    },
    deleteComment() {
      const id = this.$route.params.id;
      axios.get(`${process.env.VUE_APP_URL}/api/post/delete/comment/` + id)
      .then(({data}) => {
        console.log("성공", data)
        this.deleteMessage = "삭제됐습니다."
        setTimeout(() => {
          this.$router.push('/user/board');
        },2000)
      })
      .catch(err => {
        console.error("delete comment", err);
      })
    },
  }
}
</script>

<style scoped>
.btn-shadow {
  opacity: 0.5;
  background-color: black;
}
.btn-card {
  position: absolute;
  
  height: auto;
 
  border-radius: 10px;
  background-color: #fff;
 
}

.fade-enter-active, 
.fade-leave-active {
  transition: opacity .5s;
}

.fade-enter-active,
.fade-leave-to {
  opacity: 0;
}
</style>
