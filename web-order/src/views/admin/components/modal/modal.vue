<template>
  <transition
    name="modal"
    appear>
    <div
      class="modal modal-overlay">
      <div class="modal-window">
        <div class="modal-content">
          <h3>{{ index.food_name }}</h3>
          <p>음식의 정보를 수정해주세요.</p>
          <el-form>
            <el-form-item label="음식이름">
              <el-input
                v-model="modifyForm.name"
                :placeholder="index.food_name" />
            </el-form-item>
            <el-form-item label="음식가격">
              <el-input-number
                controls-position="right"
                :step="1000"
                :min="0"
                v-model="modifyForm.price"
                :placeholder="index.food_price" />
            </el-form-item>
            <el-form-item label="음식종류">
              <el-select
                v-model="modifyForm.category"
                :placeholder="index.food_category">
                <el-option
                  label="메인"
                  value="main" />
                <el-option
                  label="사이드"
                  value="side" />
                <el-option
                  label="음료"
                  value="Beverage" />
              </el-select>
            </el-form-item>
            <el-form-item label="상세설명">
              <el-input
                type="textarea"
                :rows="5"
                v-model="modifyForm.desc"
                :placeholder="index.food_info" />
            </el-form-item>
          </el-form>
        </div>
        <footer class="modal-footer">
          <el-button
            type="text"
            size="small"
            @click="$emit('close')">
            Close
          </el-button>
          <el-button
            type="text"
            size="small"
            @click="submit(this.modifyForm, index.food_id)">
            Modify
          </el-button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      modifyForm: {
        name: "",
        price: "",
        desc: "",
        category: ""
      }
    }
  },
  props: {
    index: {
      type: Object,
      default: function() { return {} }
    },
  },
  methods: {
    submit(state, index) {
      let modifyState = [state, index]
      axios.post("http://localhost:3000/admin/modify",
      JSON.stringify(modifyState),
      {
        headers: {
          "Content-Type": "application/json"
        }
      })
      .then((res) => {
        console.log("server res", res.data)
        this.$router.push('/admin/dashboard')
      })
      .catch(err => {
        console.log(err);
      })
    }
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