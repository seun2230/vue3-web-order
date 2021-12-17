<template>
  <div class="container">
    <div class="inner">
      <div class="page__inquiry">
       <button @click="clickModal()">
         <i class="fas fa-question-circle fa-2x"></i>
        </button>
        <ModalAdd
          @close="closeModal()"
          v-if="modal" />
        <p>사이트 이용 안내</p>
      </div>

      <div class="page__order">
         <i class="fas fa-mobile-alt fa-2x"></i>
         <p>테이블 오더</p>
      </div>
      <div class="page__event">
        <i class="fas fa-calendar-check fa-2x"></i>
         <p>이벤트 확인</p>
      </div>
      <div class="page__comments"
        @click="pageReview()">
        <i class="fas fa-comments fa-2x"></i>
        <p>리뷰 모아보기</p>
      </div>
      <div class="page__notice">
        <div class="inner">
          <i class="fas fa-bullhorn"></i>
          <p>소식</p>
          <a href="javascript:void(0)">[Table Order] 스마트 오더 사용 안내</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalAdd from '../views/user/components/ModalAdd.vue'
export default {
  data() {
    return {
      modal: false
    }
  },
  methods: {
    clickModal() {
      this.modal = !this.modal; // 열기
    },
    closeModal() {
      this.modal = false;
    },
    pageReview() {
      this.$router.push('/review')
    }
  },
  components: {
    ModalAdd
  }
}
</script>

<style scoped lang="scss">

.inner {
  display: grid;
  margin-top: 5px;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 80px 80px 40px;
  grid-gap: 5px;
}

.page__inquiry {
  background-color: hsl(333, 73%, 88%);
  border-radius: 5px;
  text-align: center;
}

.page__order {
  background-color: beige;
  border-radius: 5px;
  text-align: center;
}

.page__event {
  background-color: #e6cbf7;
  border-radius: 5px;
  text-align: center;
}

.page__comments {
  background-color: #e4f7cb;
  border-radius: 5px;
  text-align: center;
}

.page__notice {
  grid-column-end: span 2;
  background-color: #ccc;
  border-radius: 5px;
  text-align: center;

  .inner {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
}
</style>