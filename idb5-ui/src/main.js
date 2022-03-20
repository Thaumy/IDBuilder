import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import {loadFonts} from './plugins/webfontloader'

import './assets/css/html.css'
import './assets/css/scrollbar.css'

<<<<<<< Updated upstream
=======
import {loadFonts} from './plugins/webfontloader'

>>>>>>> Stashed changes
loadFonts()

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
                console.log("WebSocket connection resumed.")
        }, 1000)//一秒后检测状态

    }

    //每过一段时间检查并恢复连接
    setTimeout(() => {
        resumeWs()
    }, 3000)
}

app.config.globalProperties.$ws = new WebSocket(wsUrl)

setTimeout(() => {
    resumeWs()
}, 3000)

app.use(router)
    .use(vuetify)

app.mount('#app')
