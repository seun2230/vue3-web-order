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
</template>

<script>
export default {
  name: 'App',
  components: {
  },
  data: () => ({
    //
  }),
}
</script>


<style lang="scss" scoped>
body {
  margin: 0px;
  padding: 0px;
}

</style>