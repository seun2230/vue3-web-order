<template>
  <div class="container">
    <div class="inner">
      <nav
        class="nav"
        v-for="nav in navigation"
        :key="nav.name">
        <div class="nav-inner">
          <router-link 
            :to="{name : nav.name , params: {id: this.$route.params.id }}">
            {{ nav.meta }}  
          </router-link>
        </div>
      </nav>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  created() {
    const foodId = this.$route.params.id;
    console.log("foodId", foodId);
  },
  data() {
    return {
      navigation: [
        {
          name: 'menuInfo',
          meta: '상품 정보'
        },
        {
          name: 'menuReview',
          meta: '상품 리뷰'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/scss/variables.scss';
.container {
  width: 0 auto;
  height: 500px;
  background: #fff;
  .inner {
    width: 420px;
    padding-top: 15px;
    display: flex;
    border-bottom: 1px solid #bcbcbc;
    flex-direction: row;
    position: fixed;
    top: 50px;
    nav {
      width: 140px;
      height: 30px;
      text-align: center;
      .nav-inner {
        width: 100px;
        font-size: 1.2rem;
        color: $gray-800;
      }
    }
  }  
}

a {
  padding: 0;
  display: block;
  width: 140px;
}
.router-link-exact-active {
  color: black;
  font-weight: 600;
  padding-left: 0;
  padding-bottom: 8px;
  border-bottom: 1px solid black;
}
</style>