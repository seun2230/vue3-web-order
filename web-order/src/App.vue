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
</template>

<script>
export default {
  name: "App",
  data: () => {
    return {
      totalOrder: [],
      products: [
        {
          name: 'First',
          cost: 1000,
          image1: 'Testpic1',
          image2: './assets/Testpic1.jpg',
          count: 0
        },
        {
          name: 'Second',
          cost: 2000,
          image1: 'Testpic2',
          image2: './assets/Testpic2.jpg',
          count: 0
        },
        {
          name: 'Third',
          cost: 3000,
          image1: 'Testpic2',
          image2: './assets/Testpic2.jpg',
          count: 0
        },
        {
          name: '4th',
          cost: 1000,
          image1: 'Testpic2',
          image2: './assets/Testpic2.jpg',
          count: 0
        },
        {
          name: '5th',
          cost: 2000,
          image1: 'Testpic2',
          image2: './assets/Testpic2.jpg',
          count: 0
        },
        {
          name: 'End',
          cost: 2000,
          image1: 'Testpic1',
          image2: './assets/Testpic1.jpg',
          count: 0
        }
      ]
    }
  },
  methods: {
    addItemCart(product) {
      this.totalOrder.push(product.cost);
      console.log(this.totalOrder)
      console.log(this.totalOrder.length);
      // let sum = 0;
      // for(let i = 0; i < this.totalOrder.length; i++){
      //   console.log(this.totalOrder[i])
      //   sum += this.totalOrder[i];
      // }
      // console.log("SUM:", sum);
      let sum = this.totalOrder.reduce((cost, curr) => {
        return curr + cost;
      }, 0);
      console.log("SUM:", sum);
    },
    minusItemCart(product) {
      this.totalOrder.splice(this.totalOrder.indexOf(product));
        let sum = this.totalOrder.reduce((cost, curr) => {
        return curr + cost;
        }, 0);
        console.log(this.totalOrder)
      console.log("SUM:", sum);
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