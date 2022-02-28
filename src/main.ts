import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import TreeView from "vue-json-tree-view"


import { loadApp } from './_app'

async function start() {

  await loadApp()
  
  loadFonts()
  
  console.info('CREATE APP --------')
  const app = createApp(App)
  app
    .use(router)
    .use(vuetify)
    .use(TreeView)
  
  // app.component

  app.mount('#app')
  

}
start()

