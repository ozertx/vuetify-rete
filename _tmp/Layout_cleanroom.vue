<template>
  <div>

    <v-overlay v-if="error" >
      Ошибка приложения<br>
      {{ error }}
    </v-overlay>

    <v-app v-else-if="state.isLoggedIn">

      <v-navigation-drawer v-model="drawer" app clipped permanent>
      <v-list dense>

        <v-list-item v-for="(route,key) in routes" link :to=" `/${moduleName}/${ key.split(':')[0] }` " :key="key">
          <v-list-item-action align='right'><v-icon>{{ route.icon }}</v-icon> </v-list-item-action>
          <v-list-item-content><v-list-item-title>{{ route.title }}</v-list-item-title></v-list-item-content>
        </v-list-item>

      </v-list>
      </v-navigation-drawer>

      <v-app-bar app color="indigo" dark clipped-left  @mouseover="topMenuHover = true" @mouseleave="topMenuHover = false" >
        <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer" /> -->
        <v-toolbar-title>ИСОБР Интеграция</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-fade-transition>
          <div v-show="topMenuHover" style="display:inline-block;">

            <v-btn icon @click.stop=" openItem(appModel, { title: 'Модель приложения' })"  >
              <v-icon  >mdi-cog</v-icon>
            </v-btn>

            <v-btn icon  @click.stop=" openItem(appModel.appInfo, { title: 'Информация о приложении' })"  >
              <v-icon  >mdi-information-variant</v-icon>
            </v-btn>

          </div>
        </v-fade-transition>

        <v-spacer></v-spacer>
        <v-toolbar-title>{{ mainTitle }}</v-toolbar-title>

      </v-app-bar>

      <v-main v-if="page == 'state'">
        <router-view></router-view>
      </v-main>

      <!-- DIALOG -->

      <v-dialog v-model="state.modal.isOpen" scrollable max-width="90%">
        <component 
        :is=" state.modal.component " 
        :params=" state.modal.params " 
        @close=" state.modal.isOpen = false " >
        </component>
      </v-dialog>

    </v-app>
    <v-app v-else>
      <Login/>
    </v-app>
  </div>
</template>



<script lang="ts">
	import Vue from 'vue';
	import { state, appModel } from './utils/state'



	export default Vue.extend({
    components:{ Jobs, Timeline, Batch, State, Login, Item, Menu }, 
		props: { source: String, },
		mixins: [baseMixin],
		data: () => {

			let { routes, mainTitle, moduleName, error } = appModel
			return {
        topMenuHover: false,
				page: 'state',
				drawer: null,
				state,
				mainTitle, moduleName, routes, error, appModel
			}
		},
	})
</script>