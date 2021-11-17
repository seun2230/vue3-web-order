<template>
  <div class="container">
    <h2>Image File Upload</h2>
    <hr/>
    <div class="form-group">
      <!-- ref: 자식 객체에 접근하는 속성 -->
      <select v-model="category">
        <option disabled value="">Category</option>
        <option>덮밥</option>
        <option>라멘</option>
        <option>음료수</option>
        <option>기타</option>
      </select>
      <br/>
        Menu: <input type="text" name="name" ref="name" value="" placeholder="Menu Write"/>
        Info: <input type="text" name="info" ref="info" value="" />
        Price: <input type="text" name="price" ref="price" value="" />
    </div>  
     
    <div class="form-group">
      file: <input type="file" name="file" ref="file" @change="addFile()" multiple />
      <button type="submit" @click="clickFile()">Upload</button>
      <button type="button" @click="removeFile()">Remove</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      category: '',
      files: [],
    }
  },
  methods: { 
    addFile() {    
      // console.log("this.ref$",this.$refs.file.files)
      // console.log("length", this.$refs.file.files.length)
      for(let i = 0; i < this.$refs.file.files.length; i++) {
        this.files[i] = this.$refs.file.files[i];
      }
      console.log("this.files",this.files);
    },

    // upload button click -> axios로 담긴 파일을 보내야함.
    clickFile() {
      // FormData(): 페이지 전환없이 폼 데이터 제출 하는 경우
      const formData = new FormData(); 
      for(let i = 0; i < this.files.length; i++) {
        
        formData.append('file', this.files[i]);
        console.log(this.files);
      }
      
      formData.append("name", this.$refs.name.value);
      formData.append("info", this.$refs.info.value);
      formData.append("price", this.$refs.price.value);
      formData.append("category", this.category);
      // console.log("menu:", this.$refs.menu.value);
     
      //formData.append('file', document.getElementById('file').files[0]);
      const headers = {
        'Content-Type': 'multipart/form-data'
      };
      axios.post('http://localhost:3000/upload/', formData, { headers })      
      .then(() => {
        console.log("데이터 전달 성공");
        // res.send(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    },

    removeFile() {
      this.files = [];
      console.log(this.files);
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";

  .container {
    display: grid;
    background-color: lightgoldenrodyellow;
    border-radius: 10px;
    margin-top: 30px;
    border: 1px; 
  }

  .form-group {
    margin: 20px;
    font-size: 20px;
  }
  
</style>