<template>
  <el-form
    class="el-form"
    ref="form"
    :model="form"
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
      id="image-upload"
      label="이미지 업로드">
      <div
        class="image-preview"
        @click="addFiles()">
        <div
          class="image-preview-item"
          v-for="(file, key) in files"
          :key="'file-' + key">
          <img
            class="image-preview-image"
            :id="'image-' + parseInt(key)" />
        </div>
      </div>
      <input
        type="file"
        id="multiple-image-input"
        accept="image/*"
        multiple
        @change="handleFileUpload($event)" />
    </el-form-item>
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
      resetBtn: true,
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
      let formData = new FormData();
      if(this.files.length >= 4) {
        alert("이미지는 3개만 올려주세요 ㅎㅎ")
        this.files = []
      } else if(this.form.name.length >= 9) {
        alert("음식이름은 최대 9글자 까지에요 ㅎㅎ")
        this.$router.go()
      } else {
        for(let i = 0; i < this.files.length; i++ ){
          let file = this.files[i];
          formData.append('files', file);
       }

        formData.append('name', this.form.name)
        formData.append('price', this.form.price)
        formData.append('info', this.form.desc)
        formData.append('category', this.form.category)

        axios.post('http://localhost:3000/api/admin/post/foodUpload',
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
      }   
    },
    addFiles() {
      console.log("addFiles Clicked!")
      document.getElementById('multiple-image-input').click();
    },
    handleFileUpload(event) {
      let uploadedFiles = event.target.files;
      
      for (let i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
      //  메서드 안에서는 메서드를 호출한 객체를 가르킨다.
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
    },
    deleteImg() {
      this.files = []
    }
  },
}
</script>

<style lang="scss" scoped>
@import '../../../scss/variables.scss';

#multiple-image-input {
  display: none;
}

.el-form {
  padding: 20px;
  background: #ffffff;
  border-radius: 2px;
  #image-upload {
    align-items: center;
    margin: 0px;
  }
  .image-preview {
    display: inline-flex;
    overflow: hidden;
    min-width: 100px;
    max-width: 300px;
    height:100px;
    border-radius: 9px;
    background: $mainBg;
    .image-preview-item {
      img {
        width: 100px;
        height: 100px;
      }
    }
  }
}
</style>