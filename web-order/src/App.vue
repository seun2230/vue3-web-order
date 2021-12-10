<template>
  <div id="nav">
    <router-link to="/">
      Home
    </router-link>
     <router-link to="/login">
     Login
    </router-link>
    <router-link to="/menu">
     Menu
    </router-link>
    <router-link to="/review">
    Review
    </router-link>
  </div>
  <router-view />
</template>

<script>

export default {
  data() {
    return {

    }
  },
  components: {
   
  }
}
</script>
<style scoped>
 * {
   margin: 0;
   padding: 0;
}

</style>