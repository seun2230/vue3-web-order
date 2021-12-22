<template>
  <div class="container">
    <el-form>
    <h4 class="title">Null Image</h4>
      <el-form-item class="inner-item"> 
        <AdminImagePreviewOne @setData="setData"/>
      </el-form-item>
      <el-button
        type="text"
        @click="onSubmit">
        만들기
      </el-button>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import AdminImagePreviewOne from './AdminImagePreviewOne.vue'

export default {
  components: {
    AdminImagePreviewOne,
  },
  data() {
    return {
      files: []
    }
  },
  methods: {
    onSubmit() {
      let formData = new FormData();
      
      for(let i = 0; i < this.files.length; i++) {
        let file = this.files[i];
        formData.append('files', file);
      }
      axios.post(`${process.env.VUE_APP_URL}/api/admin/post/nullImageUpload`,
      formData,
      {
        headers: {
          "content-Type": "multipart/form-data"
        }
      }).then(res => {
        console.log("server res : ", res.data)
        this.$router.go()
      }).catch(err => {
        console.log("err", err)
        alert('다시 시도해주세요.')
      })
    },
    setData(value) {
      this.files = value
    },
  },
}
</script>

<style lang="scss" scoped>
.container {
  padding: 20px;
  background-color: #ffffff;
  justify-content: center;
}
.inner-item {
  justify-content: center;
}

.title {
  text-align: center;
}
</style>