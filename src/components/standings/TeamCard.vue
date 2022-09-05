<template>
    <div class="team-card">
        <div class="team-card__info">
            <div class="team-card__name">
                {{ name }}
            </div>
            <div class="team-card__points">
                <app-base-input
                    v-model="total"
                    :is-disabled="true"
                />
            </div>
        </div>
        <div class="team-card__control">
            <div class="team-card__update">
                <app-text-btn
                    :text="'Редагувати'"
                    @action="updateTeam"
                />
                <app-text-btn
                    :text="'Видалити'"
                    @action="deleteTeam"
                />
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "TeamCard",

        props: {
            id: {
                type: String,
                required: true
            },
            name: {
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

        methods: {
            init() {
                this.total = this.points;
            },

            deleteTeam() {
                this.$emit('delete', this.id);
            },

            updateTeam() {
                this.$emit('update', this.id);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .team-card {
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