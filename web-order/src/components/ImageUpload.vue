<template>
  <div class="container">
    <h2>Image File Upload</h2>
    <hr/>
    <div class="form-group">
      <!-- ref: 자식 객체에 접근하는 속성 -->
      Menu <input type="text" name="menu" placeholder="Menu Write"/>
      file: <input type="file" name="file" ref="file" @change="addFile()" multiple />
      <button type="submit" @click="clickFile()">Upload</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      filename: '',
      files: '',
    }
  },
  methods: { 
    addFile() {
      this.files = this.$refs.file.files[0];
      //this.file = this.$refs.file.files[i];
      console.log(this.files);
    },
    
    // upload button click -> axios로 담긴 파일을 보내야함.
    clickFile() {
      // FormData(): 페이지 전환없이 폼 데이터 제출 하는 경우
      const formData = new FormData(); 
      
      formData.append('file', this.files);
      //formData.append('files', document.getElementById('file').files[0]);
      const headers = {
        'Content-Type': 'multipart/form-data'
      };

      axios.post('http://localhost:3000/upload/', formData, { headers })      
      .then((res, result) => {
        console.log(res);
        res.send(result);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }
}
</script>

<style>

</style>