<template>
    <div class="text-editor">
        <div class="text-editor__label">
            Наповнення новини
        </div>
        <div class="text-editor__editor">
            <vue-editor
                v-model="content"
            >

            </vue-editor>
        </div>
    </div>
</template>

<script>
    import { VueEditor } from "vue3-editor";

    export default {
        name: "AppTextEditor",

        components: {
            VueEditor
        },

        data() {
            return {
                content: ''
            }
        },

        watch: {
            content(newContent) {
                this.$emit('update', newContent);
            }
        },
    }
</script>

<style lang="scss" scoped>
    .text-editor {
        display: flex;
        flex-direction: column;
        height: 100%;

        &__label {
            margin-bottom: 8px;
        }

        &__editor {
            background: #FFFFFF;
            height: 100%;
        }
    }
</style>