<template>
  <div class="container">
    <h4 class="title">메뉴 추가하기</h4>
    <el-form
      class="el-form"
      ref="form"
      :model="form"
      label-position="top"
      label-width="100px">
      <el-form-item label="음식 이름">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item />
      <el-form-item label="음식 가격">
        <el-input-number
          controls-position="right"
          :step="1000"
          :min="0"
          v-model="form.price" />
      </el-form-item>
      <el-form-item label="카테고리">
        <el-select
          v-model="form.category"
          placeholder="카테고리를 선택해 주세요.">
          <el-option
            label="메인"
            value="main" />
          <el-option
            label="사이드"
            value="side" />
          <el-option
            label="음료"
            value="beverage" />
        </el-select>
      </el-form-item>
      <el-form-item
        id="desc"
        label="상세 설명">
        <el-input
          id="textarea"
          :rows="7"
          v-model="form.desc"
          type="textarea" />
      </el-form-item>
      <el-form-item
        label="이미지업로드">
        <ImagePreview @setData="setData"/>
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
import axios from 'axios';
import ImagePreview from '../../../components/ImagePreview.vue';

export default {
  components: { 
    ImagePreview,
  },
  data() {
    return {
      files: [],
      form: {
        name: '',
        price: '',
        desc: '',
        category: '',
      },
    }
  },
  methods: {
    setData(value) {
      this.files = value
    },
    onSubmit() {
      let formData = new FormData();

      for(let i = 0; i < this.files.length; i++ ){
        let file = this.files[i].file;
        formData.append('files', file);
      }

      formData.append('name', this.form.name)
      formData.append('price', this.form.price)
      formData.append('info', this.form.desc)
      formData.append('category', this.form.category)

      axios.post(`${process.env.VUE_APP_URL}/api/admin/post/foodUpload`,
        formData,
        {
          headers: {
            "content-Type": "multipart/form-data"
          }
        }
      ).then(res => {
        console.log("server response : ", res.data)
        this.$router.go()
      }).catch(err => {
        console.log("err", err)
      })
    },
  },
}
</script>

<style lang="scss" scoped>
@import '../../../scss/variables.scss';
.container {
  padding: 20px;
  background: #ffffff;
}
#multiple-image-input {
  display: none;
}
.title {
  text-align: center;
}
</style>