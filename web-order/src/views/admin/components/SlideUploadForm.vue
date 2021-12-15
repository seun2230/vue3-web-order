<template>
  <el-form>
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
import axios from 'axios'

export default {
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
      axios.post('http://localhost:3000/api/admin/post/slideUpload',
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
    addFiles() {
      document.getElementById("multiple-image-input").click();
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