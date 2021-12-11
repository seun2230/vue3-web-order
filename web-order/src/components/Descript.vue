<template>
<div class="container">
  <div class="btn-group">
    <button 
      class="btn"
      @click="pageReview()">
      <i class="fas fa-cookie" >
      </i>
    </button>

    <button class="btn"
        @click="clickModal()">
      <i class="fas fa-pizza-slice"></i>
    </button>
    <ModalAdd
      @close="closeModal()" 
      v-if="modal" />
  </div>
  <div class="btn-info" 
    id="btn-order" 
    @click="pageMenu()">
    <div class="btn-info-text">
    <h2>패스트 오더 </h2>
    <p>주문에서 결제<br />
      까지 한번에 가능한 주문</p>
    </div>
    <div class="btn-info-icon">
    <i class="fas fa-clock fa-4x"></i>
    </div>
  </div>

  <div class="notice">
    <div class="inner">
      <i class="fas fa-calendar-check"></i>
      <p>소식</p>
      <a href="javascript:void(0)">[Table Order] 스마트 오더를 사용해보세요.</a>
    </div>
  </div>
</div>
</template>

<script>
import ModalAdd from '../components/ModalAdd.vue'
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
    pageMenu() {
      this.$router.push('menu')
    },
    pageReview() {
      this.$router.push('review')
    }
  },
  components: {
    ModalAdd
  }
}
</script>

<style lang="scss" scoped>
.btn-group {
  display: grid;
  grid-template-columns: repeat(2, 180px);
  justify-content: center;
  align-items: center;
 

  .btn {
    height: 240px;
    border-radius: 5px;
    text-align: center;

  }

}

.btn-info {
  background-color:rgb(110, 106, 101);
  width: 100%;
  margin-top: 5px;
  color: white;
  display: flex;

  .btn-info-text {
    padding: 5px;
    
    h2 {
      font-size: 20px;
      color: white;
    }
  }
  .btn-info-icon {
    width: 100%;
    height: 100%;
    padding-top: 20px;
    padding-right: 20px;
    text-align: right;
  }
}

.notice {
  margin-top:10px;
  position: absolute;
  width: 100%;
  border-radius: 8px;
  background-color: #f6f5ef;
}

.inner {
  display: flex;
  align-items: center;
  margin-left: 10px;

  i {
    color: white;
  }
}
</style>
