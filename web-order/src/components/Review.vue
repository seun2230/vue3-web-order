<template>
   <div class="container">
     <h1>{{ title }}</h1>
     <hr />
      <div class="inner">
        <div class="inner-form">
          <el-form 
            ref="form" 
            :model="form">
          <el-form-item 
            label="사용자">
            <el-input 
              v-model="form.name" />
          </el-form-item>
          <el-form-item 
            label="제목">
            <el-input 
              v-model="form.subject"/>
          </el-form-item> 
          <el-form-item 
            label="메뉴 이름">
            <el-input 
              v-model="form.menu"/>
          </el-form-item>
          <el-form-item 
            label="리뷰">
            <el-input 
              v-model="form.review" 
              type="textarea"/>
          </el-form-item>
            <input 
              type="file"
               name="file"
              ref="file"
              @change="addFile()"
              multiple />
          <el-form-item>
            <el-button 
              type="info" 
              @click="sendReview()">리뷰 제출
            </el-button>
            <el-button>취소</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
   </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      title: '리뷰 추가하기',
      files: [],
      form: {
        name: '',
        subject: '',
        menu:'',
        review: '',
      }
    }
  },
  methods: {

    addFile() {    
      for(let i = 0; i < this.$refs.file.files.length; i++) {
        this.files[i] = this.$refs.file.files[i];
      }
      console.log("this.files", this.files);
    },

    sendReview() {
      // FormData(): 페이지 전환없이 폼 데이터 제출 하는 경우
      let formData = new FormData(); 
      for(let i = 0; i < this.files.length; i++) {
        
        formData.append('file', this.files[i]);
        console.log("file" , this.files);
      }
      
      formData.append("name", this.form.name);
      formData.append("subject", this.form.subject);
      formData.append("menu", this.form.menu);
      formData.append("review", this.form.review);
    

      for (var value of formData.values()) {
        console.log("value", value);
      }
      axios.post('http://localhost:3000/review', formData, { 
        headers: {
          'Content-Type': 'multipart/form-data'
        },
  
      })      
      .then((res) => {
        console.log("데이터 전달 성공", res);
        console.log(formData);
      })
      .catch((err) => {
        console.error("오류 발생함", err);
      });
    },

    removeFile() {
      this.files = [];
      console.log(this.files);
    }
  }
};

</script>

<style lang="scss" scoped>
.container {
  border: 1px solid #ccc;
  background: rgb(239, 223, 250);
}

</style>