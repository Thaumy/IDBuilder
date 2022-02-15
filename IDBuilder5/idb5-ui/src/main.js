import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'

loadFonts()

const ws = new WebSocket('ws://localhost:20222')

ws.onopen = () => {
    console.log("Websocket Online")
}
ws.onclose = () => {
    console.log("Websocket Offline")
}

let app = createApp(App)

app.config.globalProperties.$ws = ws

app.use(router)
    .use(vuetify)

app.mount('#app')
