<template>
  <div class="container">
    <form enctype="multipart/form-data">
      <div class="fields">
        <label>Upload File</label>
        <input type="file" ref="file" @change="onSelct">
      </div>

      <div class="fields">
        <button type="submit">Submit</button>
      </div>

      <div class="msg">
        <h5> {{message}} </h5>
      </div>
    </form>
  </div>
</template>


<script>

import axios from 'axios'

export default {
  data() {
    return {
      file: "",
      message: ""
    }
  },

  methods: {
    onSelect() {
     const file = this.$refs.file.files[0];
     this.file = file;
    
  },
}
</script>

<style>

</style>