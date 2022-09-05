<template>
    <div class="text-area">
        <div class="text-area__label">
            {{ label }}
        </div>
        <textarea
           :value="modelValue"
           @input="handlerOnChange"
        />
    </div>
</template>

<script>
    export default {
        name: "AppTextArea",

        props: {
            modelValue: {
                type: String,
                required: true
            },
            label: {
                type: String,
                required: true
            }
        },

        emits: ['update:modelValue'],

        methods: {
            handlerOnChange(event) {
                const value = event.target.value;
                this.$emit('update:modelValue', value)
            }
        }
    }
</script>

<style lang="scss" scoped>
    .text-area {
        &__label {
            margin-bottom: 8px;
        }

        textarea {
            min-width: 100%;
            min-height: 60px;
            max-height: 200px;
            padding: 10px;
            border: 1px solid #000000;
            border-radius: 10px;
            background: #FFFFFF;
            resize: vertical;
        }
    }
</style>