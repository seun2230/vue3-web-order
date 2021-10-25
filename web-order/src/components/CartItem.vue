<template>
  <div class="count">
    {{ cart.food.name }}
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    
    computed: {
        ...mapState('food',[
            'cart'
        ])
    }
}
</script>