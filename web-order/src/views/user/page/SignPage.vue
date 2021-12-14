<template>
  <div class="container">
    <SignForm />
  </div>
</template>

<script>
import SignForm from '../components/SignUpForm.vue'

export default {
  components: {
    SignForm
  }  
}
</script>

<style lang="scss" scoped>
.container {
  padding: 10px;
}
</style>