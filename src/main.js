import './styles/app.scss';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./config/firebase"
import mitt from 'mitt'
const emitter = mitt()

import AppBaseInput from "./components/global/AppBaseInput";
import AppControlBtn from "./components/global/AppControlBtn";
import AppTextBtn from "./components/global/AppTextBtn";
import AppTextArea from "./components/global/AppTextArea";
import AppTextEditor from "./components/global/AppTextEditor";
import AppUploadCropper from "./components/global/AppUploadCropper";
import AppDateTimePicker from "./components/global/AppDateTimePicker";

const app = createApp(App)
app.config.globalProperties.emitter = emitter

app.component('app-base-input', AppBaseInput);
app.component('app-control-btn', AppControlBtn);
app.component('app-text-btn', AppTextBtn);
app.component('app-text-area', AppTextArea);
app.component('app-text-editor', AppTextEditor);
app.component('app-upload-cropper', AppUploadCropper);
app.component('app-date-time-picker', AppDateTimePicker);

app
    .use(router)
    .mount('#app')
