<template>
  <div>
    <div class="container">
      <div class="btn-group">
        <button class="btn">
          <i class="fas fa-cookie"></i>
        </button>
        <button
          class="btn"
          @click="clickModal()">
          <i class="fas fa-pizza-slice"></i>
        </button>
        <ModalAdd
          @close="closeModal()" 
          v-if="modal" />
      </div>
      <div class="btn-info">
        <div class="btn-info-text">
          <h2>패스트 오더 </h2>
          <p>
            주문에서 결제<br />
            까지 한번에 가능한 주문
          </p>
        </div>
        <div class="btn-info-icon">
          <div class="btn-info-icon-child">
            <i
              class="fas fa-clock fa-2x"
              id="icon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ModalAdd from '../../admin/components/modal/modal.vue'
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
  .btn-info-text{
    width: 100%;
    h2 {
      font-size: 20px;
      color: white;
    }
  }
  .btn-info-icon {
    width: 100%;
    display: grid;
    .btn-info-icon-child {
      display: inline-flex;
      justify-content: center;
      vertical-align: middle;
    }
    #icon {
      justify-content: center;
      vertical-align: middle;
    }
  }
}
</style>