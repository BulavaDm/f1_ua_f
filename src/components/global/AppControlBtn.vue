<template>
    <button type="button" class="control-btn" @click="handlerClick">
        <span>{{ text }}</span>
    </button>
</template>

<script>
    export default {
        name: "AppControlBtn",

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
    .control-btn {
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        padding: 10px;
        border: 2px solid #000000;
        color: #000000;
        font-size: 14px;

        &:before {
            content: '';
            position: absolute;
            height: 16px;
            width: 16px;
            top: -8px;
            left: 0;
            background: #C1CFEA;
        }

        &:after {
            content: '';
            position: absolute;
            height: 16px;
            width: 16px;
            bottom: -8px;
            right: 0;
            background: #C1CFEA;
        }
    }
</style>