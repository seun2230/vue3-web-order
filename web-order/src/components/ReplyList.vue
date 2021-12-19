<template>
  <div>
    {{ reply }}
  </div>
</template>

<script>
export default {
  props: {
    reply: {
      type: Object,
      default: function() { return{} }
    }
  }
}
</script>

<style>

</style>