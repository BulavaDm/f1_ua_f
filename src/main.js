import './styles/app.scss';

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "./config/firebase"

import AppControlBtn from "./components/global/AppControlBtn";
import AppTextBtn from "./components/global/AppTextBtn";
import AppTextArea from "./components/global/AppTextArea";
import AppTextEditor from "./components/global/AppTextEditor";
import AppUploadCropper from "./components/global/AppUploadCropper";

const app = createApp(App)

app.component('app-control-btn', AppControlBtn);
app.component('app-text-btn', AppTextBtn);
app.component('app-text-area', AppTextArea);
app.component('app-text-editor', AppTextEditor);
app.component('app-upload-cropper', AppUploadCropper);

app
    .use(router)
    .mount('#app')
