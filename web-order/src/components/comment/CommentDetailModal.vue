<template>
  <div>
    <div class="btn-shadow">
      <span @click="showClick()">
        <i class="fas fa-ellipsis-v"></i>
      </span>
      <div 
        v-if="!show"
        class="content">     
        <div class="btn__edit">
          <span 
            class="btn__fix" 
            @click="modifyComment()">
            수정하기
          </span>
          <span 
            class="btn__delete" 
            @click="deleteComment()">
            삭제하기
          </span>
        </div>
        <div class="btn__end">
          <span
            class="btn__cancle"
            @click="showClose()">
            취소
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  emits: ['close'],
  data() {
    return {
      show: true
    }
  },
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
    showClick() {
      this.show = false;
    },
    showClose(){
      this.show = true;
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/common.scss';
@import '@/scss/variables.scss';

.content {
  position: fixed;
  bottom: 120px;
  right: 20px;
  width: 380px;
  max-height: 110px;
  z-index: 2;
  text-align: center;
  transition: .5s;

  .btn__edit {
    background-color: $gray-200;
    box-shadow: 2px 2px 2px #2b2a2a77;
    border-radius: .5rem;
    width: 100%;
    height: 70px;
    padding: .5rem;
    margin-bottom: 10px;
  }
  .btn__end {
    border-radius: .5rem;
    background-color: $gray-200;
    box-shadow: 2px 2px 2px #2b2a2a77;
    width: 100%;
    height: 40px;
    padding: .5rem;
  }
}

@for $i from 1 through 3 {
  .btn__edit span:nth-child(1) {
    display: block;
    color: $gray-text;
    padding: .2rem;
    margin-bottom: 10px;
    border-bottom: 1px solid #cac9c9;
  }
}
</style>
