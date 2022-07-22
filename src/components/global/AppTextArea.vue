<template>
    <div class="text-area">
        <div class="text-area__label">
            Заголовок
        </div>
        <textarea
           :value="modelValue"
           @input="$emit('update:modelValue', $event.target.value)"
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
        },

        emits: ['update:modelValue']
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