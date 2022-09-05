<template>
    <div class="date-picker">
        <div class="date-picker__label">
            {{ label }}
        </div>
        <date-picker class="date-picker__picker"
            v-model="date"
            :locale="langCode"
            :mode="mode"
            :masks="masks"
            :is24hr="true"
            :popover="{
                placement: 'bottom-end'
            }"
        >
            <template v-slot="{ inputValue, togglePopover }">
                <div class="date-picker__date" @click="togglePopover" tabindex="3">
                    <input :value="inputValue"/>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.4219 1.5625H15.625V0.625C15.625 0.279844 15.3452 0 15 0C14.6548 0 14.375 0.279844 14.375 0.625V1.5625H5.625V0.625C5.625 0.279844 5.3452 0 5 0C4.6548 0 4.375 0.279844 4.375 0.625V1.5625H2.57812C1.15652 1.5625 0 2.71902 0 4.14062V17.4219C0 18.8435 1.15652 20 2.57812 20H17.4219C18.8435 20 20 18.8435 20 17.4219V4.14062C20 2.71902 18.8435 1.5625 17.4219 1.5625ZM2.57812 2.8125H4.375V3.4375C4.375 3.78266 4.6548 4.0625 5 4.0625C5.3452 4.0625 5.625 3.78266 5.625 3.4375V2.8125H14.375V3.4375C14.375 3.78266 14.6548 4.0625 15 4.0625C15.3452 4.0625 15.625 3.78266 15.625 3.4375V2.8125H17.4219C18.1542 2.8125 18.75 3.40828 18.75 4.14062V5.625H1.25V4.14062C1.25 3.40828 1.84578 2.8125 2.57812 2.8125ZM17.4219 18.75H2.57812C1.84578 18.75 1.25 18.1542 1.25 17.4219V6.875H18.75V17.4219C18.75 18.1542 18.1542 18.75 17.4219 18.75Z" fill="#3F3F3F" fill-opacity="0.7"/>
                    </svg>
                </div>
            </template>
        </date-picker>
    </div>
</template>

<script>
    import 'v-calendar/dist/style.css';
    import { DatePicker } from 'v-calendar';

    export default {
        name: "AppDateTimePicker",

        components: {
            DatePicker
        },

        props: {
            label: {
                type: String,
                required: true
            },
            mode: {
                type: String,
                default: 'date'
            },
            dateTime: {
                type: [ Number, String ],
                required: true
            }
        },

        data() {
            return {
                date: '',
                langCode: 'uk'
            }
        },

        created() {
            this.init();
        },

        mounted() {
            this.subscribeToEvents();
        },

        unmounted() {
            this.unsubscribeFromEvents();
        },

        computed: {
            masks() {
                return {
                    input: this.mode === 'date' ? 'DD.MM.YYYY' : 'HH:MM',
                }
            }
        },

        watch: {
            date() {
                const date = this.date ? this.date.getTime() : '';
                this.$emit('update', date);
            },

            dateTime() {
                this.init();
            }
        },

        methods: {
            init() {
                if (this.dateTime) {
                    this.date = new Date(this.dateTime);
                } else {
                    this.date = this.mode === 'time' ? new Date() : '';
                }
            },

            subscribeToEvents() {
                this.emitter.on('clearDateTime', this.clearDateTime);
            },

            unsubscribeFromEvents() {
                this.emitter.off('clearDateTime', this.clearDateTime);
            },

            clearDateTime() {
                this.date = '';
            }
        }
    }
</script>

<style lang="scss" scoped>
    .date-picker {
        height: 100%;
        width: 100%;

        &__date {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 12px 10px;
            border-radius: 10px;
            border: 1px solid #000000;
            transition: border 0.3s ease;
            background: #FFFFFF;
            height: 100%;

            input {
                color: #000000;
                font-size: 16px;
                line-height: 19px;
                pointer-events: none;
            }

            input:hover {
                cursor: pointer;
            }
        }

        &__date:hover {
            cursor: pointer;
        }

        &__picker {
            height: calc(100% - 30px);
        }

        &__label {
            margin-bottom: 8px;
        }
    }
</style>