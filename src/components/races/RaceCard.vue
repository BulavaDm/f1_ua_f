<template>
    <div class="race-card">
        <div class="race-card__info">
            <div class="race-card__image">
                <img :src="image" alt="Image"/>
            </div>
            <div class="race-card__details">
                <div class="race-card__date">
                    {{ date }}
                </div>
                <div class="race-card__name">
                    {{ name }}
                </div>
            </div>
        </div>
        <div class="race-card__control">
            <app-text-btn
                :text="'Переглянути'"
                @action="selectRace"
            />
            <div class="race-card__update">
                <app-text-btn
                    :text="'Редагувати'"
                    @action="updateRace"
                />
                <app-text-btn
                    :text="'Видалити'"
                    @action="deleteRace"
                />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RaceCard",

        props: {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            date: {
                type: String,
                required: true
            },
            image: {
                type: String,
                required: true
            }
        },

        methods: {
            deleteRace() {
                this.$emit('delete', this.id);
            },

            selectRace() {
                this.$emit('select', this.id);
            },

            updateRace() {
                this.$emit('update', this.id);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .race-card {
        display: flex;
        flex-direction: column;
        border: 1px solid #000000;
        border-radius: 10px;
        background: #FFFFFF;

        &__info {
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            background: #C1CFEA;
            border-radius: 10px 10px 0 0;
        }

        &__image {
            height: 50px;
            min-width: 75px;
            margin-right: 10px;

            img {
                height: 50px;
                width: 100%;
                max-width: 100%;
                object-fit: cover;
                border-radius: 10px 0 0 0 ;
            }
        }

        &__details {
            display: flex;
            flex-direction: column;
            background: #C1CFEA;
        }

        &__date {
            margin-bottom: 4px;
        }

        &__date, &__name {
            font-size: 16px;
            line-height: 16px;
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