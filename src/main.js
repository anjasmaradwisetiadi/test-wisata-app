import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'material-icons/iconfont/material-icons.css';
import { QuillEditor } from '@vueup/vue-quill';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import './index.css'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.component('QuillEditor', QuillEditor)
app.use(router)

app.mount('#app')
