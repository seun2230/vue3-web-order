<template>
   <transition name="modal" appear>
    <div class="modal modal-overlay"
       @click.self="$emit('close')">
      <div class="modal-window">
        <div class="modal-header">
            <v-slot name="header">
              이용 방법 안내
            </v-slot>
            <hr />
        </div>
        <div class="modal-content">
          <slot>
            우리 가게 이용 안내입니다.
          </slot> 
        </div>
        <div class="modal-footer">
          <slot name="footer">
            <button 
              @click="$emit('close')">Close</button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
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
    background: rgba(102, 101, 101, 0.5);
  }

  &-window {
    background: #fff;
    border-radius: 4px;
    overflow: hidden;
  }

  &-content {
    padding: 10px 20px;
  }

  &-footer {
    background: #ccc;
    padding: 10px;
    text-align: right;
  }
}

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.4s;

  .modal-window {
    transition: opacity 0.4s, transform 0.4s;
  }
}


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