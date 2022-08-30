<template>
    <div class="races">
        <div class="races__editor">
            <div class="races__info">
                <div class="races__cropper">
                    <app-upload-cropper
                        :label="'Флаг Гран-прі'"
                        :aspect-ratio="37/30"
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
                            @update="updateStartDate"
                        />
                    </div>
                    <div class="races__date">
                        <app-date-time-picker
                            :label="'Закінчення'"
                            @update="updateEndDate"
                        />
                    </div>
                </div>
            </div>
            <div class="races__events">
                <app-text-btn
                    :text="'Додати день подій'"
                    @action="addEvent"
                />
                <div class="races__events-all" ref="raceEvents">
                    <div class="races__events-wrapper" :style="{ 'maxHeight': maxHeight.events }">
                        <div v-for="event in race.events" :key="event.id" class="races__event">
                            <race-event-day-row
                                :id="event.id"
                                :date="event.date"
                                :time-events="event.timeEvents"
                                @delete="deleteEvent"
                                @update="updateEvent"
                            />
                        </div>
                    </div>
                </div>
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
                    <div v-if="!isLoaded" class="races__wrapper" :style="{ 'maxHeight': maxHeight.list }">
                        <div v-for="race in races" :key="race.id" class="races__card">
                            <race-card
                                :id="race.id"
                                :name="race.name"
                                :date="race.formattedDate"
                                :image="race.image"
                                @delete="deleteRace"
                                @select="selectRace"
                                @update="updateRace"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import RaceEventDayRow from "./RaceEventDayRow";
    import RaceCard from "./RaceCard";
    import { generateTemporaryId } from "../../helpers/common";
    import { child, get, getDatabase, ref as dRef, remove, set } from "firebase/database";
    import { getDownloadURL, getStorage, uploadBytes, ref as sRef, deleteObject } from "firebase/storage";
    import { formatStartAndEndDate, formatStartDate, formatDateToTime } from "../../helpers/date";

    export default {
        name: "RacesControl",

        components: {
            RaceCard,
            RaceEventDayRow
        },

        data() {
            return {
                isLoaded: false,
                race: {
                    name: '',
                    file: '',
                    startDate: '',
                    endDate: '',
                    events: []
                },
                races: [],
                selectedRace: null,

                maxHeight: {
                    events: '',
                    list: '',
                    mobile: ''
                },

                isUpdate: false
            }
        },

        created() {
            this.getAllRaces();
        },

        mounted() {
            this.calculateMaxHeight();
        },

        methods: {
            getAllRaces() {
                this.races = [];
                this.isLoaded = true;

                const dbRef = dRef(getDatabase());

                get(child(dbRef, 'races'))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const racesKeys = Object.keys(snapshot.val());

                            this.races = racesKeys.sort(this.sortAllRaces).map((key) => {
                                const race = snapshot.val()[key];
                                race.id = key;
                                return race;
                            });

                            console.log(this.races);

                            this.selectedRace = this.races[0];
                        }
                    })
                    .finally(() => {
                        this.isLoaded = false;
                    })
            },

            sortAllRaces(a, b) {
                return a < b ? 1 : a > b ? -1 : 0;
            },

            calculateMaxHeight() {
                this.maxHeight.events = `${this.$refs.raceEvents.offsetHeight - 40}px `;
                this.maxHeight.list = `${this.$refs.racesList.offsetHeight}px`;
                // this.maxHeight.mobile = `${this.$refs.raceMobile.offsetHeight - 30}px`;
            },

            doActionRace() {
                if (!this.isUpdate) {
                    this.createRace();
                } else {
                    // this.changeRace();
                }
            },

            createRace() {
                this.emitter.emit('updateDateTime');
                this.emitter.emit('updateTimeEvent');
                this.emitter.emit('updateEvent');

                const id = generateTemporaryId();
                const db = getDatabase();
                const storage = getStorage();
                const storageRef = sRef(storage, `races/${id}`);

                uploadBytes(storageRef, this.race.file)
                    .then(() => {
                        getDownloadURL(storageRef)
                            .then((url) => {
                                set(dRef(db, `races/${id}`), {
                                    image: url,
                                    name: this.race.name,
                                    startDate: this.race.startDate,
                                    endDate: this.race.endDate,
                                    formattedDate: formatStartAndEndDate(this.race.startDate, this.race.endDate),
                                    events: this.mapEventsToSend(this.race.events)
                                })
                                    .then(() => {
                                        this.getAllRaces();
                                        this.clearRace();
                                    });
                            })
                    });
            },

            mapEventsToSend(events) {
                return events.map((event) => {
                    return {
                        id: event.id,
                        date: event.date,
                        formattedDate: formatStartDate(event.date),
                        timeEvents: event.timeEvents.map((timeEvent) => {
                            return {
                                id: timeEvent.id,
                                name: timeEvent.name,
                                dateTime: timeEvent.dateTime,
                                formattedTime: formatDateToTime(timeEvent.dateTime),
                            }
                        })
                    }
                })
            },

            updateRaceImage(image) {
                this.race.file = image.file;
            },

            updateStartDate(date) {
                this.race.startDate = date;
            },

            updateEndDate(date) {
                this.race.endDate = date;
            },

            updateEvent(id, event) {
                const targetEvent = this.race.events.find((event) => event.id === id);
                targetEvent.date = event.date;
                targetEvent.timeEvents = event.timeEvents;
            },

            addEvent() {
                const id = generateTemporaryId();
                const event = {
                    id: id,
                    date: '',
                    timeEvents: [],
                };

                this.race.events.push(event);
            },

            deleteEvent(id) {
                this.race.events = this.race.events.filter((event) => event.id !== id);
            },

            clearRace() {
                this.race.name = '';
                this.emitter.emit('clearImage');
                this.emitter.emit('clearDateTime');
                this.emitter.emit('clearEvent');
            },

            deleteRace(id) {
                const db = getDatabase();
                const storage = getStorage();

                remove(dRef(db, `races/${id}`))
                    .then(() => {
                        const imageRef = sRef(storage, `races/${id}`);

                        deleteObject(imageRef)
                            .then(() => {
                                this.getAllRaces();
                            })
                    });
            },

            selectRace(id) {
                this.selectedRace = this.races.find((race) => race.id === id);
            },

            updateRace(id) {
                // const selectedNews = this.allNews.find((news) => news.id === id);
                // this.news = { ...selectedNews };
                // this.emitter.emit('updateContent', this.news.content);
                // this.emitter.emit('updateImage', this.news.image);
                // this.isUpdate = true;
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

        &__events-all {
            height: 100%;
            padding: 8px 0;
        }

        &__events-wrapper {
            height: 100%;
            overflow-y: auto;
            scrollbar-width: none;
        }

        &__races {
            height: 100%;
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

        &__card {
            &:not(:last-child) {
                margin-bottom: 15px;
            }
        }

        &__wrapper, &__mobile-view {
            height: 100%;
            overflow-y: auto;
            scrollbar-width: none;
        }
    }
</style>