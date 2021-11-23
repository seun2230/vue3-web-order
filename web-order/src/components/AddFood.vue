<template>
  <div class="container">
    <h2>Multiple Images Preview</h2>
    <hr />
    <div class="large-12 medium-12 small-12 cell">
      <label>Files
        <input
          type="file"
          id="multiple-image-preview"
          accept="image/*"
          multiple
          @change="handleFilesUpload($event)" />
      </label>
      <label>name
        <input
          v-model="name"
          type="text"
          :key="name" />
      </label>
      <label>price
        <input
          type="text"
          :key="price"
          v-model="price" />
      </label>
      <label>info
        <textarea
          type="text"
          :key="info"
          v-model="info"></textarea>
      </label>
      <select
        v-model="category"
        :key="category">
        <option value="main">
          메인요리
        </option>
        <option value="side">
          사이드
        </option>
        <option value="baverage">
          음료
        </option>
      </select>
    </div>
    <div class="large-12 medium-12 small-12 cell">
      <div class="grid-x">
        <div
          v-for="(file, key) in files"
          :key="'file-' + key"
          class="large-4 medium-4 small-6 cell file-listing">
          {{ file.name }}
          <img
            class="preview"
            :id="'image-'+ parseInt(key)" />
        </div>
      </div>
    </div>
    <br />
    <div class="large-12 medium-12 small-12 cell clear">
      <button @click="addFiles()">
        Add Files
      </button>
    </div>
    <br />
    <div class="large-12 medium-12 small-12 cell">
      <button @click="submitFiles()">
        Submit
      </button>
    </div>
  </div>
</template>

<script>
	import axios from 'axios';
	
	export default {
		data(){
			return {
				files: []
			}
		},
		methods: {
			addFiles() {
        console.log("addFiles clicked!")
				document.getElementById('multiple-image-preview').click();
			},
			submitFiles() {

				let formData = new FormData();

				for( var i = 0; i < this.files.length; i++ ){
					let file = this.files[i];
					formData.append('files', file);
				}

          formData.append('name', this.name)
          formData.append('price', this.price)
          formData.append('info', this.info)
          formData.append('category', this.category)

				axios.post( 'http://localhost:3000/uploads',
					formData,
					{
						headers: {
								'Content-Type': 'multipart/form-data'
						}
					}
				).then(function(){
					console.log('SUCCESS!!');
				})
				.catch(function(){
					console.log('FAILURE!!');
				});
			},

			handleFilesUpload(event) {
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
					if (/\.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
						let reader = new FileReader();

						reader.addEventListener("load", function() {
							document.getElementById('image-' + parseInt(i)).src = reader.result;
						}.bind(this), false);

						reader.readAsDataURL(this.files[i]);
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
@import "../scss/main.scss";

.container {
  margin-top: 30px;
  input[type="file"]{
    position: absolute;
    top: -500px;
  }
  div.file-listing img{
		max-width: 90%;
	}
}
</style>