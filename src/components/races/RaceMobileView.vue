<template>
    <div class="race-view-m">
        <div class="race-view-m__info">
            <div class="race-view-m__image">
                <img :src="image" alt="Image"/>
            </div>
            <div class="race-view-m__details">
                <div class="race-view-m__properties">
                    <div class="race-view-m__date">
                        {{ date }}
                    </div>
                    <div class="race-view-m__name">
                        {{ name }}
                    </div>
                </div>
                <div class="race-view-m__icon">
                    <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                        <rect width="25" height="25" fill="url(#pattern5)"/>
                        <defs>
                            <pattern id="pattern5" patternContentUnits="objectBoundingBox" width="1" height="1">
                                <use xlink:href="#image0_36_99" transform="scale(0.00444444)"/>
                            </pattern>
                            <image id="image0_36_99" width="225" height="225" xlink:href="data:image/png;base64,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"/>
                        </defs>
                    </svg>
                </div>
            </div>
        </div>
        <div class="race-view-m__events">
            <div v-for="event in events" :key="event.id" class="race-view-m__event">
                <div class="race-view-m__event-date">{{ event.formattedDate }}</div>
                <div v-for="timeEvent in event.timeEvents" :key="timeEvent.id" class="race-view-m__time-event">
                    <div>{{ `${timeEvent.formattedTime} - ${timeEvent.name}` }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RaceMobileView",

        props: {
            image: {
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
            events: {
                type: Array,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>
    .race-view-m {
        border-radius: 10px;
        filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.25));

        &__info {
            background: #C1CFEA;
            border-radius: 10px 10px 0 10px;
            display: flex;
        }

        &__image {
            height: 60px;
            width: 90px;
            margin-right: 10px;

            img {
                height: 60px;
                width: 100%;
                max-width: 100%;
                object-fit: cover;
                border-radius: 10px 0 0 0;
            }
        }

        &__properties {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        &__details {
            flex-grow: 1;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        &__date {
            font-size: 24px;
            font-weight: 500;
            line-height: 20px;
            margin-bottom: 4px;
        }

        &__icon {
            margin-right: 10px;
        }

        &__events {
            background: #F4F8FF;
            border-radius: 0 0 10px 10px;
            padding: 10px;
        }

        &__event-date {
            font-size: 14px;
            font-weight: 500;
        }

        &__time-event {
            font-size: 12px;
            margin-left: 14px;
        }
    }
</style>