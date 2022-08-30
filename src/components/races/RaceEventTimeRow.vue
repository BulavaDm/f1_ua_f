<template>
    <div class="race-time-event">
        <div class="race-time-event__info">
            <div class="race-time-event__details">
                <app-base-input
                    v-model="timeEvent.name"
                    :label="'Назва події'"
                />
            </div>
            <div class="race-time-event__details">
                <app-date-time-picker
                    :label="'Час події'"
                    :mode="'time'"
                    @update="selectDateTime"
                />
            </div>
        </div>
        <div class="race-time-event__control">
            <app-text-btn
                :text="'Видалити подію'"
                @action="deleteTimeEvent"
            />
        </div>
    </div>
</template>

<script>

    export default {
        name: "RaceEventTimeRow",

        props: {
            id: {
                type: [ String, Number ],
                required: true
            },
            name: {
                type: String,
                required: true
            },
            dateTime: {
                type: [ String, Number ],
                required: true
            }
        },

        data() {
            return {
                timeEvent: {
                    name: '',
                    dateTime: ''
                }
            }
        },

        mounted() {
            this.subscribeToEvents();
        },

        unmounted() {
            this.unsubscribeFromEvents();
        },

        methods: {
            subscribeToEvents() {
                this.emitter.on('clearEvent', this.clearEvent);
                this.emitter.on('updateTimeEvent', this.updateTimeEvent);
            },

            unsubscribeFromEvents() {
                this.emitter.off('clearEvent', this.clearEvent);
                this.emitter.off('updateTimeEvent', this.updateTimeEvent);
            },

            clearEvent() {
                this.timeEvent.name = '';
                this.timeEvent.dateTime = '';
            },

            selectDateTime(dateTime) {
                this.timeEvent.dateTime = dateTime;
            },

            deleteTimeEvent() {
                this.$emit('delete', this.id);
            },

            updateTimeEvent() {
                this.$emit('update', this.id, this.timeEvent);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .race-time-event {
        display: flex;
        flex-direction: column;

        &__info {
            display: flex;
            margin-bottom: 4px;
        }

        &__details {
            width: 50%;

            &:not(:last-child) {
                padding-right: 15px;
            }
        }

        &__control {
            display: flex;
            justify-content: flex-end;
        }
    }
</style>