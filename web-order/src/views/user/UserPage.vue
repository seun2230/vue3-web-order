<template>
  <div>
    <button @click="Backward"
      class="backward"><i class="fas fa-arrow-left"></i>
    </button>
      <span class="routerName">&nbsp;{{ currentRouteName }}</span>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>

export default {
  components: {
  },
  methods: {
    Backward() {
      this.$router.go(-1);
    }
  },
  computed: {
    currentRouteName() {
      return this.$route.name;
    }
  }
};
</script>

<style lang="scss" scoped>
.backward {
  font-size: 1.2rem;
  margin-top: 10px;
  margin-left: 5px;
}

button {
  border: none;
  background-color: white;
}

button:hover {
  cursor: pointer;
}

.routerName {
  font-size: 1.2rem;
  font-weight: bold;
}
</style>