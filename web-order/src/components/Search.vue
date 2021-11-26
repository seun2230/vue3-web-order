<template>
  <div>
    <input type="date" value="" id="startDate" /> 
    ~
    <input type="date" id="endDate"/> 
    <input type="submit" value="search" @click="searchInfo()" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      date: '',
    }
  },

  methods: {
    searchInfo() {
      let startDate = document.getElementById("startDate").value = "YYYY-MM-DD";
      console.log(startDate);
    }
  }
  
}
</script>

<style>

</style>