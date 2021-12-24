<template>
  <div class="title">
    <div class="arrow">
      <button @click="Backward"
        class="backwardBtn"><i class="fas fa-arrow-left" id="backward"></i>
      </button>
    </div>
    <div class="routerMeta">
      <span>{{ currentRouteMeta }}</span>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    Backward() {
      this.$router.go(-1);
    }
  },
  computed: {
    currentRouteMeta() {
      return this.$route.meta.metaName;
    },
  },
}
</script>

<style lang="scss" scoped>
#backward {
  transition: ease-out 100ms;
  transition-duration: 300ms;
}
#backward:active {
  color: rgba(255, 0, 0, 0.2);
}

.backwardBtn {
  font-size: 1.3rem;
  margin-left: 5px;
}

button {
  border: none;
  background-color: white;
}

button:hover {
  cursor: pointer;
}

.routerMeta {
  justify-content: center;
  flex-grow: 1;
  padding-right: 35px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: center;
}

.title {
  background-color: white;
  display: flex;
  justify-content: row;
  align-items: center;
  // padding: 5px;
  position: fixed;
  width: 100%;
  height: 12vw;
  border-bottom: 1px solid #bcbcbc;
  z-index: 1000;
}
</style>
