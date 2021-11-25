<template>
    <div class=form>
        <form @submit.prevent='onSubmit'>
            <input v-model = 'name' v-validate="'required|nimLen3'" />
            <p v-if='errorBag.name'>{{ errorBag.name[0] }}</p>
            <button type='submit'>submit</button>
        </form>
    </div>
</template>

<script>
import validator from '../util/Validator.js'

export default {
    data() {
        return {
            name: '',
            errorBag: { name: [] },
        }
    },
    watch: {
        name(val) {
            this.errorBag.name = validator.validate('name', val);
        },
    },
    methods: {
        onSubmit() {
            this.errorBag.name = validator.validate('name', this.name);
        },
    },
}
</script>
