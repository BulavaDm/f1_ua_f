<template>
    <div class="races">
        <div class="races__editor">
            <div class="races__info">
                <div class="races__cropper">
                    <app-upload-cropper
                        :label="'Флаг Гран-прі'"
                        @update="updateRaceImage"
                    />
                </div>
                <div class="races__details">
                    <div class="races__name">
                        <app-base-input
                            v-model="race.name"
                            :label="'Назва'"
                        />
                    </div>
                    <div class="races__date">
                        <app-date-time-picker
                            :label="'Початок'"
                        />
                    </div>
                    <div class="races__date">
                        <app-date-time-picker
                            :label="'Закінчення'"
                        />
                    </div>
                </div>
            </div>
            <div class="races__events">

            </div>
            <div class="races__control">
                <div class="races__control-btn">
                    <app-control-btn
                        :text="'Очистити'"
                        @action="clearRace"
                    />
                </div>
                <div class="races__control-btn">
                    <app-control-btn
                        :text="isUpdate ? 'Зберегти' : 'Створити'"
                        @action="doActionRace"
                    />
                </div>
            </div>
        </div>
        <div class="races__content">
            <div class="races__preview">
                <div class="races__label">
                    Мобільне відображення
                </div>
                <div class="races__mobile" ref="racesMobile">
                    <!--                <div class="news__mobile-view" :style="{ 'maxHeight': maxHeight.mobile }">-->
                    <!--                    <div v-if="isOneNewsExist" class="news__selected-news">-->
                    <!--                        <news-mobile-view-->
                    <!--                                :image="selectedNews.image"-->
                    <!--                                :content="selectedNews.content"-->
                    <!--                        />-->
                    <!--                    </div>-->
                    <!--                </div>-->
                </div>
            </div>
            <div class="races__all">
                <div class="races__label">
                    Усі Гран-прі
                </div>
                <div class="races__races" ref="racesList">
                    <!--                <div v-if="!isLoaded" class="news__wrapper" :style="{ 'maxHeight': maxHeight.list }">-->
                    <!--                    <div v-for="news in allNews" :key="news.id" class="news__card">-->
                    <!--                        <news-card-->
                    <!--                                :id="news.id"-->
                    <!--                                :title="news.title"-->
                    <!--                                :image="news.image"-->
                    <!--                                :content="news.content"-->
                    <!--                                @delete="deleteNews"-->
                    <!--                                @select="selectNews"-->
                    <!--                                @update="updateNews"-->
                    <!--                        />-->
                    <!--                    </div>-->
                    <!--                </div>-->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import AppDateTimePicker from "../global/AppDateTimePicker";
    export default {
        name: "RacesControl",
        components: {AppDateTimePicker},
        data() {
            return {
                race: {
                    name: ''
                },

                isUpdate: false
            }
        },

        methods: {
            updateRaceImage() {

            },

            clearRace() {

            },

            doActionRace() {

            }
        }
    }
</script>

<style lang="scss" scoped>
    .races {
        padding: 30px;
        display: flex;
        height: 100%;

        &__editor {
            flex-basis: 50%;
            display: flex;
            flex-direction: column;
            padding-right: 30px;
        }

        &__content {
            flex-basis: 50%;
            display: flex;
        }

        &__preview, &__all {
            flex-basis: 50%;
            display: flex;
            flex-direction: column;
        }

        &__preview {
            padding-right: 30px;
            display: flex;
        }

        &__mobile {
            border: 1px solid #000000;
            border-radius: 10px;
            background: #FFFFFF;
            flex-grow: 1;
            padding: 10px;
        }

        &__events {
            height: 100%;
            flex-grow: 1;
        }

        &__card {
            &:not(:last-child) {
                margin-bottom: 15px;
            }
        }

        &__events {
            flex-grow: 1;
        }

        &__control {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            margin-top: 15px;
        }

        &__control-btn {
            width: 200px;
            padding: 15px;
            background: #C1CFEA;

            &:not(:last-child) {
                margin-right: 15px;
            }
        }

        &__info {
            display: flex;
            margin-bottom: 15px;
        }

        &__cropper {
            width: 50%;
            padding-right: 15px;
        }

        &__details {
            width: 50%;
            display: flex;
            flex-direction: column;
            height: 100%;
        }

        &__date {
            &:not(:last-child) {
                margin-bottom: 4px;
            }
        }

        &__name {
            margin-bottom: 4px;
        }

        &__label {
            margin-bottom: 8px;
        }

        &__wrapper, &__mobile-view {
            height: 100%;
            overflow-y: auto;
            scrollbar-width: none;
        }
    }
</style>