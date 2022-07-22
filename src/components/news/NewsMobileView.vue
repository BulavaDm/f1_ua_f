<template>
    <div class="news-view-m">
        <div class="news-view-m__image">
            <img :src="image" alt="Image"/>
        </div>
        <div v-html="content" class="news-view-m__content"/>
    </div>
</template>

<script>
    export default {
        name: "NewsMobileView",

        props: {
            image: {
                type: String,
                required: true
            },
            content: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .news-view-m {
        &__image {
            height: 220px;

            img {
                width: 100%;
                max-width: 100%;
                object-fit: cover;
                border-radius: 10px 10px 0 0;
            }
        }

        &__content {
            padding: 10px;
        }
    }
</style>

<style lang="scss">
    .news-view-m {
        &__content {
            img {
                width: 100%;
                max-width: 100%;
                object-fit: cover;
                border-radius: 10px 10px 0 0;
            }

        }
    }
</style>