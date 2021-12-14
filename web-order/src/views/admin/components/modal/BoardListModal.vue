<template>
  <transition
    name="modal"
    appear>
    <div
      class="modal modal-overlay">
      <div class="modal-window">
        <div class="modal-content">
          <h5>{{ index.food_name }}</h5>
          <p>{{ index.title }}.</p>
            <div class="user-box">
              <span>작성자 : {{ index.name }}</span>
              <span>아이디 : {{ index.id }}</span>
            </div>
            <div class="image-box">
              <img 
                :src="index.image"
                :alt="index.comments_id" />
            </div>
        </div>
        <footer class="modal-footer">
          <el-button
            type="text"
            size="small"
            @click="$emit('close')">
            Close
          </el-button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  data() {
    return {
      
    }
  },
  props: {
    index: {
      type: Object,
      default: function() { return {} }
    },
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
@import '../../../../scss/variables.scss';

.modal {
  &.modal-overlay {
    display: flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    z-index: 30;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
  }
  &-window {
    padding: 10px;
    background: $mainBg;
    border-radius: 4px;
    overflow: hidden;
  }
  &-content {
    border-radius: 4px;
    background-color: #ffffff;
    padding: 20px;
    width: 500px;
    height: 500px;
  }
  &-footer {
    background: $mainBg;
    padding: 10px;
    text-align: right;
  }
}
img {
  width: 300px;
  height:300px;
}

// 오버레이 트랜지션
.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s;

  // 오버레이에 포함되어 있는 모달 윈도의 트랜지션
  .modal-window {
    transition: opacity 0.4s, transform 0.4s;
  }
}

// 딜레이가 적용된 모달 윈도가 제거된 후에 오버레이가 사라짐
.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter, .modal-leave-to {
  opacity: 0;

  .modal-window {
    opacity: 0;
    transform: translateY(-20px);
  }
}
</style>