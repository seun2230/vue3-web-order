<template>
  <div>
    <h1>TABLE PAGINATION</h1>
    <paginated-list :list-array="pageArray" />
  </div>
</template>

<script>
import axios from 'axios'
import PaginatedList from './PaginatedList.vue';
export default {
  name: 'simple-pagination',
  components: {
    PaginatedList
  },
  data () {
    // const main = this.pageArray.find(isMain)
    // console.log(main)
    // function isMain(element) {
    //   if(element.category === "main") {
    //     return true
    //   }
    // }
    return {
      pageArray: []
    }
  },
  created () {
    axios.get('http://localhost:3000/api/admin/get/comments')
    .then(response => {
      console.log("응",response);
      this.pageArray = response.data;
    })
    .catch(err => {
      console.log(err);
    });
  },
  methods: {
  }
}
</script>

<style>
h1 {
  color: #454545;
  text-align: center;
}
</style>