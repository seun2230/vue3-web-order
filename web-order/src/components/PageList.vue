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
      <div class="page__chef">
        <div class="inner-title">
          <span>Chef Profile</span>
        </div>
        <div class="inner-body">
          <img src="../assets/Gordon.png" class="img-chef" />
       <!-- <button @click="clickModal()">
         <i class="fas fa-question-circle fa-2x"></i>
        </button> -->
        <ModalAdd
          @close="closeModal()"
          v-if="modal" />
        </div>
      </div>
      <div class="page__today">
         <div class="inner-title">
          <span>오늘의 메뉴</span>
        </div>
        <div class="inner-body">
          <img src="../assets/Pizza.jpg" class="img-today" />
        </div>
      </div>
      <div class="page__guide">
         <div class="inner-title">
          <span>어떻게 이용할까요?</span>
        </div>
        <div class="inner-body">
          <img src="../assets/Help.jpg" class="img-guide" />
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
      this.$router.push('/user/board')
    }
  },
  components: {
    ModalAdd
  }
}
</script>

<style scoped lang="scss">
img {
  border-radius: 10px;
  // object-fit: fill;
}

.img-today, .img-guide {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.container {
  margin-top: 10px;
}

.inner {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 15vh 15vh;
  grid-gap: 0px;
}

.page__chef {
  margin: 10px;
  text-align: center;

  .inner-body {
    height: 13vh;
    border: 1px solid lightgrey;
    border-radius: 10px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  }
}

.page__guide {
  margin: 40px 10px 10px 10px;
  text-align: center;

  .inner-body {
    height: 10vh;
    border: 1px solid lightgrey;
    border-radius: 10px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  }
}

.page__today {
  margin: 10px;
  text-align: center;

  .inner-body {
    height: 29vh;
    border: 1px solid lightgrey;
    border-radius: 10px;
    box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);
  }
}

.page__notice {
  display: flex;
  margin: 10px;
  border: 1px solid lightgrey;
  border-radius: 10px;
  height: 3vh;
  text-align: center;
  font-size: 0.8rem;
  box-shadow: 2px 2px 2px 1px rgba(0, 0, 0, 0.1);

  .inner {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }
}

.inner-title {
  text-align: left;
  margin: 0px 0px 8px 5px;
  font-size: 0.85rem;
  font-weight: bold;
}
</style>