<template>
  <MenuList />
</template>

<script>
import MenuList from './components/MenuList.vue'

export default {
  components: {
    MenuList
  },
  methods: {
    addItemCart(product) {
      this.totalOrder.push(product);
      console.log(this.totalOrder)
      console.log(this.totalOrder.length);
      let sum = this.totalOrder.reduce((value, curr) => {
        console.log("add-value : ", value);
        console.log("add-curr : ", curr)
        return value + curr.cost;
      }, 0);
      console.log("SUM:", sum);
    },
    minusItemCart(product) {
      if (this.totalOrder.indexOf(product) > -1) {
        this.totalOrder.splice(this.totalOrder.indexOf(product), 1);
          let sum = this.totalOrder.reduce((value, curr) => {
            console.log("minus-value : ", value);
            console.log("minus-curr : ", curr);
            return curr.cost + value;
          }, 0);
        console.log("SUM:", sum);
      }
    }
  }
}
</script>