<template>
    <div class="input">
        <div class="input__label">
            {{ label }}
        </div>
        <div class="input__entry">
            <input
                :value="modelValue"
                :type="type"
                :placeholder="placeHolder"
                @input="$emit('update:modelValue', $event.target.value)"
            >
        </div>
    </div>
</template>

<script>
    export default {
        name: "AppBaseInput",

        props: {
            modelValue: {
                type: [Number, String],
                required: true
            },
            type: {
                type: String,
                default: 'text'
            },
            label: {
                type: String,
                required: true
            },
            placeHolder: {
                type: String,
                default: ''
            }
        },

        emits: ['update:modelValue']
    }
</script>

<style lang="scss" scoped>
    .input {
        &__label {
            margin-bottom: 8px;
        }

        &__entry {
            position: relative;

            input {
                width: 100%;
                padding: 12px 10px;
                font-size: 16px;
                line-height: 18px;
                border: 1px solid #000000;
                border-radius: 10px;
                background: #FFFFFF;
                transition: border 0.3s ease;
            }

            input::placeholder {
                font-size: 12px;
                font-style: italic;
                color: var(--app-base-secondary);
            }
        }
    }
</style>