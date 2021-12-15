<template>
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
    <li>D</li>
  </ul>
</template>

<script>
export default {

}
</script>

<style scoped>
ul {
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  z-index:100;
  border-top: 1px solid black;
  background-color: white;
}

li {
  float: left;
  width: 20%;
  height: 100%;
  text-align: center;
  padding-top: 13px;
}
</style>
