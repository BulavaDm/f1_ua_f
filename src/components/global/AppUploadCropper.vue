<template>
    <div class="upload-cropper">
        <div class="upload-cropper__label">
            {{ label }}
        </div>
        <div class="upload-cropper__area">
            <div v-if="!image.isUploaded" class="upload-cropper__upload upload">
                <div class="upload__upload-btn">
                    <label>
                        <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
                            <rect width="50" height="50" fill="url(#pattern0)"/>
                            <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlink:href="#image0_63_2" transform="scale(0.00195312)"/>
                                </pattern>
                                <image id="image0_63_2" width="512" height="512" xlink:href="data:image/png;base64,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"/>
                            </defs>
                        </svg>
                        <input
                            type="file"
                            @change="uploadFile"
                            hidden
                        />
                        Вибрати файл
                    </label>
                </div>
            </div>
            <div v-else class="upload-cropper__cropper cropper">
                <div class="cropper__area">
                    <cropper class="cropper__advanced" ref="cropper"
                        image-restriction="none"
                        :src="image.url"
                        :stencil-component="stencilComponent"
                        :stencil-props="{
                            previewClass: 'preview',
                            aspectRatio: 16/9
                        }"
                        @change="resizeUploadedFile"
                    />
                    <button type="button" class="cropper__btn cropper__btn--is-clear" @click="clearUploadFile">
                        <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M19.7917 6.67676L18.3229 5.20801L12.5 11.0309L6.67709 5.20801L5.20834 6.67676L11.0313 12.4997L5.20834 18.3226L6.67709 19.7913L12.5 13.9684L18.3229 19.7913L19.7917 18.3226L13.9688 12.4997L19.7917 6.67676Z" fill="black"/>
                        </svg>
                    </button>
                    <button type="button" class="cropper__btn cropper__btn--is-download" @click="downloadUploadFile">
                        <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.29289 20.7071C9.68342 21.0976 10.3166 21.0976 10.7071 20.7071L17.0711 14.3431C17.4616 13.9526 17.4616 13.3195 17.0711 12.9289C16.6805 12.5384 16.0474 12.5384 15.6569 12.9289L10 18.5858L4.34315 12.9289C3.95262 12.5384 3.31946 12.5384 2.92893 12.9289C2.53841 13.3195 2.53841 13.9526 2.92893 14.3431L9.29289 20.7071ZM9 0L9 20H11L11 0L9 0Z" fill="black"/>
                            <line y1="23" x2="20" y2="23" stroke="black" stroke-width="2"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import { Cropper, RectangleStencil } from 'vue-advanced-cropper';
    import 'vue-advanced-cropper/dist/style.css';

    export default {
        name: "AppUploadCropper",

        components: {
            Cropper,
            RectangleStencil
        },

        props: {
            label: {
                type: String,
                default: ''
            }
        },

        data() {
            return {
                image: {
                    isUploaded: false,
                    isCropped: false,
                    url: '',
                    base64: '',
                    file: '',
                    isChanged: false
                }
            }
        },

        computed: {
            stencilComponent() {
                return RectangleStencil;
            },
        },

        methods: {
            async uploadFile(event) {
                const file = event.target.files[0];

                if (file) {
                    const url = URL.createObjectURL(file);

                    await this.toBase64(file)
                        .then(convertedFile => {
                            this.image.url = url;
                            this.image.base64 = convertedFile;
                            this.image.file = file;
                            this.image.isUploaded = true;
                        })
                }
            },

            toBase64(file)  {
                return new Promise((resolve) => {
                    const reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = () => resolve(reader.result);
                });
            },

            clearUploadFile() {
                this.image.url = '';
                this.image.base64 = '';
                this.image.file = '';
                this.image.isUploaded = false;
            },

            downloadUploadFile() {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(this.image.file);
                link.download = 'image.png';
                document.body.appendChild(link);
                link.click();

                link.remove();
            },

            resizeUploadedFile() {
                const { canvas } = this.$refs.cropper.getResult();
                this.image.base64 = canvas.toDataURL();

                this.canvasToBlob(canvas)
                    .then(blob => {
                        const fileName = blob.type.split('/').join('.');

                        this.image.file = new File([ blob ], `${fileName}`, {
                            type: blob.type,
                        });

                        this.$emit('update', {
                            file: this.image.file,
                        });
                    })
            },

            canvasToBlob(canvas) {
                return new Promise((resolve) => {
                    canvas.toBlob((blob) =>{
                        resolve(blob);
                    });
                });
            },
        }
    }
</script>

<style lang="scss" scoped>
    .upload-cropper {
        display: flex;
        flex-direction: column;

        &__label {
            white-space: nowrap;
            margin-bottom: 8px;
        }

        &__area {
            height: 200px;
            padding: 10px;
            border: 1px solid #000000;
            border-radius: 10px;
            background: #FFFFFF;
        }


        &__upload {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
        }

        &__cropper {
            height: 100%;
        }
    }

    .upload {
        &__upload-btn {
            label {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                &:hover {
                    cursor: pointer;
                }
            }
        }
    }

    .cropper {
        position: relative;

        &__area {
            height: 100%;
        }

        &__btn {
            width: 25px;
            height: 25px;
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            right: 10px;

            &--is-clear {
                top: 10px;
            }

            &--is-download {
                bottom: 10px;
            }
        }
    }
</style>