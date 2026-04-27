import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './presentation/components/App.vue'
import './assets/styles/main.css'

// Create Vue app instance
const app = createApp(App)

// Create and use Pinia store
const pinia = createPinia()
app.use(pinia)

// Mount the app
app.mount('#app')
