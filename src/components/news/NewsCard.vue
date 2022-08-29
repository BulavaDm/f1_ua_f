<template>
    <div class="news-card">
        <div class="news-card__image">
            <img :src="image" alt="Image"/>
        </div>
        <h5 class="news-card__title">
            {{ title }}
        </h5>
        <div class="news-card__control">
            <app-text-btn
                :text="'Переглянути'"
                @action="selectNews"
            />
            <div class="news-card__update">
                <app-text-btn
                    :text="'Редагувати'"
                    @action="updateNews"
                />
                <app-text-btn
                    :text="'Видалити'"
                    @action="deleteNews"
                />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NewsCard",

        props: {
            id: {
                type: String,
                required: true
            },
            title: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        },

        methods: {
            deleteNews() {
                this.$emit('delete', this.id);
            },

            selectNews() {
                this.$emit('select', this.id);
            },

            updateNews() {
                this.$emit('update', this.id);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .news-card {
        display: flex;
        flex-direction: column;
        border: 1px solid #000000;
        border-radius: 10px;
        background: #FFFFFF;

        &__image {
            min-height: 235px;

            img {
                height: 235px;
                width: 100%;
                max-width: 100%;
                object-fit: cover;
                border-radius: 10px 10px 0 0;
            }
        }

        &__title {
            padding: 10px;
        }

        &__control {
            display: flex;
            justify-content: space-between;
            padding: 10px;
        }

        &__update {
            display: flex;

            button:not(:last-child) {
                margin-right: 15px;
            }
        }
    }
</style>