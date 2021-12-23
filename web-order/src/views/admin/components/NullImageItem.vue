<template>
  <div class="container">
    <el-form>
    <h4 class="title">현재 사용중인 Null Image</h4>
      <el-form-item class="inner-item"> 
        <div class="image-status" v-if="this.nullImage.length !== 0">
          <div class="file-close-button" @click="DeleteButton" :name="this.nullImage.null_id">
            <i class="far fa-trash-alt"></i>
          </div>
          <img 
            :src="this.nullImage.null_image" 
            :alt="this.nullImage.null_id" />
        </div>
        <div class="image-status" v-else>
          <div class="image-status-message-box">
            <span class="message">image가 없습니다.</span>
          </div>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      nullImage: ''
    }
  },
  created() {
    axios.get(`${process.env.VUE_APP_URL}/api/admin/get/nullImage`)
    .then(res => {
      console.log("null", res.data)
      this.nullImage = res.data[0]
    })
  },
  methods: {
    DeleteButton() {
      console.log("clicked!")
      axios.post(`${process.env.VUE_APP_URL}/api/admin/post/delete/nullImage`)
      .then(res => {
        console.log(res)
        this.$router.go();
      }).catch(err => {
        console.log(err);
        this.$router.go();
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  width: 540px;
  padding: 20px;
  background-color: #ffffff;
  justify-content: center;
}

.file-close-button {
  position: absolute;
  z-index: 99;
  font-size: 40px;
  right: 10px;
  top: 10px;
  cursor: pointer;
}
.inner-item {
  justify-content: center;
}
.image-status {
  width: 100%;
  height: 100%;
}
.image-status-message-box {
  width: 500px;
  height: 500px;
  text-align: center;
}
.title {
  text-align: center;
}
</style>