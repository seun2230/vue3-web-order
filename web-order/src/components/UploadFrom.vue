<template>
  <el-form
    class="el-form"
    ref="form"
    :model="form"
    label-width="100px">
    <el-form-item label="음식 이름">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="음식 가격">
      <el-input v-model="form.price" />
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
    <el-form-item label="상세 설명">
      <el-input
        id="desc"
        v-model="form.desc"
        type="textarea" />
    </el-form-item>
    <el-form-item label="이미지 업로드" />
    <input
      type="file"
      id="multiple-image-preview"
      accept="image/*"
      multiple
      @change="handleFileUpload($event)" />
    <div class="image-preview">
      <div
        class="image-preview-item"
        v-for="(file, key) in files"
        :key="'file-' + key">
        <img
          class="image-preview-image"
          :id="'image-' + parseInt(key)" />
      </div>
    </div>
    <div class="button">
      <el-button
        id="addFiles"
        @click="addFiles()">
        이미지 추가
      </el-button>
    </div>
    <el-form-item />
    <el-button
      type="primary"
      @click="onSubmit">
      만들기
    </el-button>
  </el-form>
</template>

<script>
import axios from 'axios';

export default {
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
    onSubmit() {
      console.log('submit!')
      let formData = new FormData();

      for(let i = 0; i < this.files.length; i++ ){
        let file = this.files[i];
        formData.append('files', file);
      }
      formData.append('name', this.form.name)
      formData.append('price', this.form.price)
      formData.append('info', this.form.desc)
      formData.append('category', this.form.category)

      axios.post('http://localhost:3000/uploads',
        formData,
        {
          headers: {
            "content-Type": "multipart/form-data"
          }
        }
      ).then(function() {
        console.log("SUCCESS!!")
      })
      .catch(function() {
        console.log("FAILURE!!")
      })
    },
    addFiles() {
      console.log("addFiles Clicked!")
      document.getElementById('multiple-image-preview').click();
    },
    handleFileUpload(event) {
      console.log("event", event)
      console.log("event.target", event.target)
      console.log("Eve", event.target.files)

      let uploadedFiles = event.target.files;
      
      for (let i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
      this.getImagePreviews();
    },
    getImagePreviews() {
      for (let i = 0; i < this.files.length; i++) {
        let reader = new FileReader();

        reader.addEventListener("load", function() {
          document.getElementById('image-' + parseInt(i)).src = reader.result;
        }.bind(this), false);

        reader.readAsDataURL(this.files[i]);
      }
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

.el-form {
  border: solid;
  width: 500px;
  padding: 5px;
}
input {
  display: none;
}
.image-preview {
  padding: 2px;
  height:108px;
  border-radius: 9px;
  border:solid;
  display: flex;
  align-items: center;
  // background-color: $subMenuBg;
}
.image-preview-item {
  display: grid;
  align-items: center;
  margin-right: 2px;
  img {
  width: 100px;
  height: 100px;
  }
}
</style>