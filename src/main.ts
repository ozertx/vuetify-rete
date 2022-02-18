import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'

import { loadApp, appState } from './_app'

async function start() {

  await loadApp()
  
  loadFonts()
  
  console.info('CREATE APP --------')
  createApp(App)
    .use(router)
    .use(vuetify)
    .mount('#app')
  
}
start()

