<template>
    <div class="news">
        <div class="news__editor">
            <div class="news__title">
                <app-text-area
                    v-model="news.title"
                    @update="updateNewsTitle"
                />
            </div>
            <div class="news__croppers">
                <div class="news__cropper">
                    <app-upload-cropper
                        :label="'Головне зображення'"
                        @update="updateNewsImage"
                    />
                </div>
                <div class="news__cropper">
                    <app-upload-cropper
                        :label="'Для обробки додаткових зображень'"
                    />
                </div>
            </div>
            <div class="news__text">
                <app-text-editor

                />
            </div>
            <div class="news__control">
                <div class="news__control-btn">
                    <app-control-btn
                        :text="'Очистити'"
                    />
                </div>
                <div class="news__control-btn">
                    <app-control-btn
                        :text="'Створити'"
                        @action="createNews"
                    />
                </div>
            </div>
        </div>
        <div class="news__content">
            <div class="news__preview">
                <div class="news__label">
                    Мобільне відображення
                </div>
                <div class="news__mobile"></div>
            </div>
            <div class="news__all">
                <div class="news__label">
                    Усі новини
                </div>
                <div class="news__news" ref="newsList">
                    <div v-if="!isLoaded" class="news__wrapper" :style="{ 'maxHeight': maxHeight.list }">
                        <div v-for="(news, id) in allNews" class="news__card">
                            <news-card
                                :id="id"
                                :title="news.title"
                                :image="news.image"
                                :content="news.content"
                                @delete="deleteNews"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NewsCard from "./NewsCard";
    import { generateTemporaryId } from "../../helpers/common";
    import { getDatabase, child, set, get, ref as dRef, remove } from "firebase/database";
    import { getStorage, getDownloadURL, uploadBytes, ref as sRef, deleteObject } from "firebase/storage";

    export default {
        name: "NewsControl",

        components: {
            NewsCard
        },

        data() {
            return {
                news: {
                    title: '',
                    file: ''
                },

                isLoaded: false,

                allNews: null,

                maxHeight: {
                    list: ''
                }
            }
        },

        created() {
            this.getAllNews();
        },

        methods: {
            getAllNews() {
                this.allNews = [];
                this.isLoaded = true;

                const dbRef = dRef(getDatabase());

                get(child(dbRef, 'news'))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            this.calculateMaxHeight();
                            this.allNews = snapshot.val();
                        }
                    })
                    .finally(() => {
                        this.isLoaded = false;
                    })
            },

            calculateMaxHeight() {
                this.maxHeight.list = `${this.$refs.newsList.offsetHeight}px`;
            },

            updateNewsTitle(title) {
                this.news.title = title;
            },

            updateNewsImage(image) {
                this.news.file = image.file;
            },

            createNews() {
                const id = generateTemporaryId();
                const db = getDatabase();
                const storage = getStorage();
                const storageRef = sRef(storage, `news/${id}`);

                uploadBytes(storageRef, this.news.file)
                    .then(() => {
                        getDownloadURL(storageRef)
                            .then((url) => {
                                set(dRef(db, `news/${id}`), {
                                    title: this.news.title,
                                    image: url
                                })
                                .then(() => {
                                    this.getAllNews();
                                    this.clearNews();
                                });
                            })
                    });

            },

            deleteNews(id) {
                const db = getDatabase();
                const storage = getStorage();

                remove(dRef(db, `news/${id}`))
                    .then(() => {
                        const imageRef = sRef(storage, `news/${id}`);

                        deleteObject(imageRef)
                            .then(() => {
                                this.getAllNews();
                            })
                    });
            },

            clearNews() {
                Object.keys(this.news).forEach((key) => this.news[key] = '');
            }
        }
    }
</script>

<style lang="scss" scoped>
    .news {
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
        }

        &__mobile {
            height: 100%;
            border: 1px solid #000000;
            border-radius: 10px;
            background: #FFFFFF;
        }

        &__news {
            height: 100%;
            flex-grow: 1;
        }

        &__card {
            &:not(:last-child) {
                margin-bottom: 15px;
            }
        }

        &__text {
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

        &__croppers {
            display: flex;
        }

        &__cropper {
            width: 50%;

            &:not(:last-child) {
                padding-right: 15px;
            }

            &:last-child {
                padding-left: 15px;
            }
        }

        &__title, &__croppers {
            margin-bottom: 15px;
        }

        &__label {
            margin-bottom: 8px;
        }

        &__wrapper {
            height: 100%;
            overflow-y: auto;
            scrollbar-width: thin;
        }
    }
</style>