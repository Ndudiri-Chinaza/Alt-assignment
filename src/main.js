import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { QueryClient, VueQueryPlugin} from 'vue-query'
// import './assets/main.css'

const app = createApp(App)
app.use(router)
const queryClient = new QueryClient();
app.use(VueQueryPlugin, {queryClient})

app.mount('#app')
