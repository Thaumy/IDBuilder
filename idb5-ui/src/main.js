import {createApp} from 'vue'
import App from './App.vue'

import vuetify from './plugins/vuetify'
import router from './router'

import './assets/css/html.css'
import './assets/css/scrollbar.css'

import {loadFonts} from './plugins/webfontloader'
loadFonts()

//import '@mdi/font/scss/materialdesignicons.scss'

let app = createApp(App)

const wsUrl = 'ws://localhost:20222'

function resumeWs() {
    let isConnLost = () =>//非OPEN状态一律视为连接失败
        app.config.globalProperties.$ws.readyState !== WebSocket.OPEN

    if (isConnLost()) {
        console.log("WebSocket connection lost, trying to resume.")

        app.config.globalProperties.$ws = new WebSocket(wsUrl)

        setTimeout(() => {
            if (!isConnLost())
                console.log("connection resumed.")
            else
                console.log("resume failed.")
        }, 3000)//一段时间后检测状态
    }

    //每过一段时间检查并恢复连接
    setTimeout(() => {
        resumeWs()
    }, 5000)
}

app.config.globalProperties.$ws = new WebSocket(wsUrl)

setTimeout(() => {
    resumeWs()
}, 5000)

app.use(router)
    .use(vuetify)

app.mount('#app')
