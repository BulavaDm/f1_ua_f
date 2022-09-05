<template>
    <div class="driver-card">
        <div class="driver-card__info">
            <div class="driver-card__details">
                <div class="driver-card__name">
                    {{ name }}
                </div>
                <div class="driver-card__team">
                    {{ team }}
                </div>
            </div>

            <div class="driver-card__points">
                <app-base-input
                    v-model="total"
                />
            </div>
        </div>
        <div class="driver-card__control">
            <div class="driver-card__update">
                <app-text-btn
                    :text="'Редагувати'"
                    @action="updateDriver"
                />
                <app-text-btn
                    :text="'Видалити'"
                    @action="deleteDriver"
                />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DriverCard",

        props: {
            id: {
                type: String,
                required: true
            },
            name: {
                type: String,
                required: true
            },
            team: {
                type: String,
                required: true
            },
            points: {
                type: Number,
                required: true
            }
        },

        data() {
            return {
                total: 0
            }
        },

        created() {
            this.init();
        },

        watch: {
            total() {
                this.$emit('updatePoints', this.id, this.total);
            }
        },

        methods: {
            init() {
                this.total = this.points;
            },

            deleteDriver() {
                this.$emit('delete', this.id);
            },

            updateDriver() {
                this.$emit('update', this.id);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .driver-card {
        display: flex;
        flex-direction: column;
        border: 1px solid #000000;
        border-radius: 10px;
        background: #FFFFFF;

        &__info {
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            margin-bottom: 10px;
            background: #C1CFEA;
            border-radius: 10px 10px 0 0;
            padding: 10px;
        }

        &__details {
            display: flex;
            flex-direction: column;
        }

        &__name {
            margin-bottom: 4px;
        }

        &__team {
            font-size: 14px;
        }

        &__points {
            max-width: 60px;
        }

        &__control {
            display: flex;
            justify-content: flex-end;
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