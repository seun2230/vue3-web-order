<template>
  <div class="product">
    <div v-for="product in products" :key="product.name" id="products">
      <img :src="product.image2" id="product-image"/>
      <img :src="require(`@/assets/${product.image1}.jpg`)" id="product-image" />
      <div id="product-name">{{ product.name }}</div>
      <div id="product-cost">{{ product.cost }}</div>
      <button v-on:click="addItemCart(product)">+</button>
      <button v-on:click="minusItemCart(product)">-</button>
    </div>
  </div>
  <p>{{ sum }}</p>
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {
      totalOrder: [],
      dateOrder:[],
      products: [
        {
          name: 'First',
          cost: 1000,
          image1: 'Testpic1',
          image2: './assets/Testpic1.jpg',
          count: 0,
          id: 1
        },
        {
          name: 'Second',
          cost: 2000,
          image1: 'Testpic2',
          image2: './assets/Testpic2.jpg',
          count: 0,
          id: 2
        },
        {
          name: 'Third',
          cost: 3000,
          image1: 'Testpic2',
          image2: './assets/Testpic2.jpg',
          count: 0,
          id: 3
        },
        {
          name: '4th',
          cost: 1000,
          image1: 'Testpic2',
          image2: './assets/Testpic2.jpg',
          count: 0,
          id: 4
        },
        {
          name: '5th',
          cost: 2000,
          image1: 'Testpic2',
          image2: './assets/Testpic2.jpg',
          count: 0,
          id: 5
        },
        {
          name: 'End',
          cost: 2000,
          image1: 'Testpic1',
          image2: './assets/Testpic1.jpg',
          count: 0,
          id: 6
        }
      ]
    }
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

<style scoped>
  .product {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
  }

  #product-image {
    width: 100px;
    height: 100px;
  }

  #products {
    width:200px;
    height: auto;
    margin: 10px;
    border: 1px solid gold
  }
</style>