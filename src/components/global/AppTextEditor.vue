<template>
    <div class="text-editor">
        <div class="text-editor__label">
            {{ label }}
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

        props: {
            label: {
                type: String,
                required: true
            }
        },

        data() {
            return {
                content: ''
            }
        },

        mounted() {
            this.subscribeToEvents();
        },

        unmounted() {
            this.unsubscribeFromEvents();
        },

        watch: {
            content(newContent) {
                this.$emit('update', newContent);
            }
        },

        methods: {
            subscribeToEvents() {
                this.emitter.on('clearContent', this.clearContent);
                this.emitter.on('updateContent', this.updateContent);
            },

            unsubscribeFromEvents() {
                this.emitter.off('clearContent', this.clearContent);
                this.emitter.off('updateContent', this.updateContent);
            },

            clearContent() {
                this.content = '';
            },

            updateContent(content) {
                this.content = content;
            }
        }
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