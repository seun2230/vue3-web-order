<template>
    <div class='history'>
        <span>{{ history.order_id }}</span>
        <p>{{ history.order_date }}</p>
        <p>{{ history.order_name }}</p>
    </div>
</template>

<script>
export default {
    name: 'History',
    props: {
        history: {
            type: Object,
            default: () => {
                return {};
            },
        },
    },
};
</script>

<style scoped>
.history {
  width: 13em;
  margin: 1em auto 1em auto;
  padding: 1em;
  border: solid 1px #2c3e50;
  cursor: pointer;
  transition: all 0.2s linear;
}
.history:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2), 0 1px 15px 0 rgba(0, 0, 0, 0.19);
}
</style>
