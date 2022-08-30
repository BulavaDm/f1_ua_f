<template>
    <div class="race-day-event">
        <div class="race-day-event__day">
            <app-date-time-picker
                :label="'Дата дня подій'"
                @update="selectDateTime"
            />
        </div>
        <div class="race-day-event__control">
            <app-text-btn
                :text="'Додати подію'"
                @action="addEventTime"
            />
            <app-text-btn
                :text="'Видалити день'"
                @action="deleteEvent"
            />
        </div>
        <div class="race-day-event__events">
            <div v-for="timeEvent in event.timeEvents" :key="timeEvent.id" class="race-day-event__event">
                <race-event-time-row
                    :id="timeEvent.id"
                    :name="timeEvent.name"
                    :date-time="timeEvent.dateTime"
                    @delete="deleteTimeEvent"
                    @update="updateTimeEvent"
                />
            </div>
        </div>
    </div>
</template>

<script>
    import { generateTemporaryId } from "../../helpers/common";
    import RaceEventTimeRow from "./RaceEventTimeRow";

    export default {
        name: "RaceEventDayRow",

        components: {
            RaceEventTimeRow
        },

        props: {
            id: {
                type: [ String, Number ],
                required: true
            },
            date: {
                type: [ String, Number ],
                required: true
            },
            timeEvents: {
                type: Array,
                required: true
            }
        },

        data() {
            return {
                event: {
                    name: '',
                    date: '',
                    timeEvents: []
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
                this.emitter.on('updateEvent', this.updateEvent);
            },

            unsubscribeFromEvents() {
                this.emitter.off('clearEvent', this.clearEvent);
                this.emitter.off('updateEvent', this.updateEvent);
            },

            selectDateTime(date) {
                this.event.date = date;
            },

            deleteEvent() {
                this.$emit('delete', this.id);
            },

            clearEvent() {
                this.event.name = '';
                this.event.dateTime = '';
            },

            updateEvent() {
                this.$emit('update', this.id, this.event);
            },

            addEventTime() {
                const id = generateTemporaryId();
                const timeEvent = {
                    id: id,
                    dateTime: '',
                    name: ''
                };

                this.event.timeEvents.push(timeEvent);
            },

            deleteTimeEvent(id) {
                this.event.timeEvents = this.event.timeEvents.filter((event) => event.id !== id);
            },

            updateTimeEvent(id, timeEvent) {
                const targetTimeEvent = this.event.timeEvents.find((event) => event.id === id);
                targetTimeEvent.name = timeEvent.name;
                targetTimeEvent.dateTime = timeEvent.dateTime;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .race-day-event {
        display: flex;
        flex-direction: column;

        &__day {
            display: flex;
            margin-bottom: 4px;
        }

        &__control {
            display: flex;
            justify-content: space-between;
        }

        &__events {
            padding: 10px 0;
        }
    }
</style>