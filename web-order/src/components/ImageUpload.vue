<template>
  <div class="upload-from">
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
  </div>
</template>

<script>
export default {
  data() {
    return {
      files: []
    }
  },
  methods: {
    addFiles() {
      console.log("addFiles Clicked!")
      document.getElementById('multiple-image-preview').click();
    },
    handleFileUpload(event) {
      console.log("event", event)
      console.log("event.target", event.target)
      console.log("Eve", event.target.files)

      let uploadedFiles = event.target.files;
      
      if(uploadedFiles.length <= 3) {
        alert("이미지는 최대 3개 까지 등록가능합니다.")
      }

      for (let i = 0; i < uploadedFiles.length; i++) {
        this.files.push(uploadedFiles[i]);
      }
      this.getImagePreviews();
      this.$emits("child", this.files)
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
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/variables.scss';

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