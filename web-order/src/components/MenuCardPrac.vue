<template>
  <el-card
    :body-style="{ padding: '0px' }"
    class="card">
    <div
      class="col"
      id="image-box">
      <img
        src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
        class="image" />
    </div>
    <div
      class="col"
      id="info-box">
      <span>Yummy hamburger</span>
      <div class="bottom">
        <time class="time">{{ currentDate }}</time>
        <el-button
          type="text"
          class="button">
          Operating
        </el-button>
      </div>
    </div>
  </el-card>
</template>

<script>
import { ref } from 'vue'

export default ({
  setup() {
    const currentDate = ref(new Date())
    return {
      currentDate,
    }
  }  
})
</script>>

<style lang="scss" scoped>
.card {
  display: flex;
  #info-box {
    padding: 14px;
  }
  #image-box {
    flex-grow: 1;
    height: 100px;
    overflow: hidden;
    img {
      width: 100%;
      object-fit: cover;
    }
  }
  #image-box:hover {
    height: auto;
  }
}
</style>