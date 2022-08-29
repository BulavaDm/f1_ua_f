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
                        :is-not-main="true"
                        :label="'Для обробки додаткових зображень'"
                    />
                </div>
            </div>
            <div class="news__text">
                <app-text-editor
                    @update="updateNewsContent"
                />
            </div>
            <div class="news__control">
                <div class="news__control-btn">
                    <app-control-btn
                        :text="'Очистити'"
                        @action="clearNews"
                    />
                </div>
                <div class="news__control-btn">
                    <app-control-btn
                        :text="isUpdate ? 'Зберегти' : 'Створити'"
                        @action="doActionNews"
                    />
                </div>
            </div>
        </div>
        <div class="news__content">
            <div class="news__preview">
                <div class="news__label">
                    Мобільне відображення
                </div>
                <div class="news__mobile" ref="newsMobile">
                    <div class="news__mobile-view" :style="{ 'maxHeight': maxHeight.mobile }">
                        <div v-if="isOneNewsExist" class="news__selected-news">
                            <news-mobile-view
                                :image="selectedNews.image"
                                :content="selectedNews.content"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="news__all">
                <div class="news__label">
                    Усі новини
                </div>
                <div class="news__news" ref="newsList">
                    <div v-if="!isLoaded" class="news__wrapper" :style="{ 'maxHeight': maxHeight.list }">
                        <div v-for="news in allNews" :key="news.id" class="news__card">
                            <news-card
                                :id="news.id"
                                :title="news.title"
                                :image="news.image"
                                :content="news.content"
                                @delete="deleteNews"
                                @select="selectNews"
                                @update="updateNews"
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
    import NewsMobileView from "./NewsMobileView";
    import { generateTemporaryId } from "../../helpers/common";
    import { getDatabase, child, set, get, update, ref as dRef, remove } from "firebase/database";
    import { getStorage, getDownloadURL, uploadBytes, ref as sRef, deleteObject } from "firebase/storage";

    export default {
        name: "NewsControl",

        components: {
            NewsMobileView,
            NewsCard
        },

        data() {
            return {
                news: {
                    title: '',
                    file: '',
                    content: ''
                },
                selectedNews: null,

                isLoaded: false,
                isUpdate: false,

                allNews: null,

                maxHeight: {
                    list: '',
                    mobile: ''
                }
            }
        },

        created() {
            this.getAllNews();
        },

        mounted() {
            this.calculateMaxHeight();
        },

        computed: {
            isOneNewsExist() {
                return !!this.allNews.length;
            }
        },

        methods: {
            getAllNews() {
                this.allNews = [];
                this.isLoaded = true;

                const dbRef = dRef(getDatabase());

                get(child(dbRef, 'news'))
                    .then((snapshot) => {
                        if (snapshot.exists()) {
                            const newsKeys = Object.keys(snapshot.val());

                            this.allNews = newsKeys.sort(this.sortAllNews).map((key) => {
                                const news = snapshot.val()[key];
                                news.id = key;
                                return news;
                            });

                            this.selectedNews = this.allNews[0];
                        }
                    })
                    .finally(() => {
                        this.isLoaded = false;
                    })
            },

            sortAllNews(a, b) {
                return a < b ? 1 : a > b ? -1 : 0;
            },

            calculateMaxHeight() {
                this.maxHeight.list = `${this.$refs.newsList.offsetHeight}px`;
                this.maxHeight.mobile = `${this.$refs.newsMobile.offsetHeight - 30}px`;
            },

            updateNewsTitle(title) {
                this.news.title = title;
            },

            updateNewsImage(image) {
                this.news.file = image.file;
            },

            updateNewsContent(content) {
                this.news.content = content;
            },

            doActionNews() {
                if (!this.isUpdate) {
                    this.createNews();
                } else {
                    this.changeNews();
                }
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
                                    content: this.news.content,
                                    image: url
                                })
                                .then(() => {
                                    this.getAllNews();
                                    this.clearNews();
                                });
                            })
                    });
            },

            changeNews() {
                const id = this.news.id;
                const db = getDatabase();
                const storage = getStorage();
                const storageRef = sRef(storage, `news/${id}`);

                if (this.news.file) {
                    uploadBytes(storageRef, this.news.file)
                        .then(() => {
                            getDownloadURL(storageRef)
                                .then((url) => {
                                    update(dRef(db, `news/${id}`), {
                                        title: this.news.title,
                                        content: this.news.content,
                                        image: url
                                    })
                                        .then(() => {
                                            this.getAllNews();
                                            this.clearNews();
                                        });
                                })
                        });
                } else {
                    update(dRef(db, `news/${id}`), {
                        title: this.news.title,
                        content: this.news.content,
                    })
                        .then(() => {
                            this.getAllNews();
                            this.clearNews();
                        });
                }
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
                this.news.title = '';
                this.emitter.emit('clearFields');
                this.isUpdate = false;
            },

            selectNews(id) {
                this.selectedNews = this.allNews.find((news) => news.id === id);
            },

            updateNews(id) {
                const selectedNews = this.allNews.find((news) => news.id === id);
                this.news = { ...selectedNews };
                this.emitter.emit('updateContent', this.news.content);
                this.emitter.emit('updateImage', this.news.image);
                this.isUpdate = true;
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
            display: flex;
        }

        &__mobile {
            border: 1px solid #000000;
            border-radius: 10px;
            background: #FFFFFF;
            flex-grow: 1;
            padding: 10px;
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

        &__wrapper, &__mobile-view {
            height: 100%;
            overflow-y: auto;
            scrollbar-width: none;
        }
    }
</style>