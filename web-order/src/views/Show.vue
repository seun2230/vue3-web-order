<template>
  <h2>Show</h2>
</template>

<script>
export default {
  created() {
    const id = this.$router.params.id;
    console.log(id)
  }
}
</script>