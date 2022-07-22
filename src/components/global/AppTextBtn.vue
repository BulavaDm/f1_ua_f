<template>
    <button type="button" class="text-btn" @click="handlerClick">
        <span>{{ text }}</span>
    </button>
</template>

<script>
    export default {
        name: "AppTextBtn",

        props: {
            text: {
                type: String,
                required: true
            }
        },

        methods: {
            handlerClick() {
                this.$emit('action');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .text-btn {

    }
</style>