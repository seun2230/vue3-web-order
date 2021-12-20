<template>
  <div class="container">
    <div class="page__notice">
        <div class="inner">
          <i class="fas fa-calendar-check"></i> &nbsp;
          <div class="notice__desc">
          다음 주 휴무일은 월요일입니다.
          </div>
        </div>
      </div>
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
      this.$router.push('/user/board')
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
  // margin: 1px 0px 1px 0px;
  grid-template-columns: 1fr;
  grid-template-rows: 15vh 15vh;
  grid-gap: 0px;
}

.page__inquiry {
  // background-color: hsl(333, 73%, 88%);
  margin: 5px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  height: 13vh;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.page__order {
  // background-color: beige;
  margin: 5px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  height: 18vh;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.page__notice {
  display: flex;
  margin: 5px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  height: 3vh;
  text-align: center;
  font-size: 0.9rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);

  .inner {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
}
</style>