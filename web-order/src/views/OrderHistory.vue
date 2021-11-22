<template>
    <div class='histories'>
        <template v-if='!isEmpty'>
            <History v-for='history in histories'
            :key='history.order_index'
            :history='history' />
        </template>
        <p v-else>
            주문 내역이 존재하지 않습니다.
        </p>
    </div>
</template>
<script>
import http from '../api/interceptor';
import History from '../components/History.vue';

export default {
    components: {
        History
    },
    data() {
    return {
        isEmpty: true,
        histories: [],
    }
    },
    created () {
        http.get('/api/users/orderHistory')
        .then((response) => {
            console.log('response on history', response.data);
            this.histories = response.data;
            console.log('histories:', this.histories);
            this.isEmpty = false;
        })
    },
}
</script>
