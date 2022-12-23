import {createApp} from "vue"
import "./style.css"
import App from "./App.vue"

import vuetify from '@/plugins/vuetify'
import router from '@/plugins/router'

createApp(App)
    .use(vuetify)
    .use(router)
    .mount('#app')
