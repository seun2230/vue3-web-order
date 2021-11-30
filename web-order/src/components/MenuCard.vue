<template>
  <v-card
    class="mx-auto"
    max-width="136">
    <v-img
      :src="food.food_image1"
      :alt="food.food_name"
      height="80px" />
  
    <v-card-title>
      {{ food.food_name }}
    </v-card-title>
  
    <v-card-subtitle>
      {{ food.food_price }}
    </v-card-subtitle>
  
    <v-card-actions>
      <v-btn
        color="orange lighten-2"
        text
        @click="addCart()">
        ADD
      </v-btn>
  
      <v-spacer />
  
      <v-btn
        icon
        @click="show=!show">
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
    </v-card-actions>
  
      
    <div v-show="show">
      <v-card-text>
        {{ food.food_info }}
      </v-card-text>
    </div>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    show : false
  }),
  props: {
    food: {
      type: Object,
      default: function() { return {} }
    }
  },
  methods: {
    addCart() {
      this.$store.dispatch('food/addCart', this.food)
      console.log("go")
    }
  }
}
</script>

<style lang="scss" scoped>

.mx-auto {
  margin: 0px;
}
</style>