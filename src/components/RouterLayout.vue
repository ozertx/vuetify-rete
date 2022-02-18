<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="2">
        <v-img
          :src="require('../assets/logo.svg')"
          class="my-3"
          contain
          height="200"
        />
      </v-col>

      <v-col class="mb-4">
dfdfdfdfdfsdsdsd {{ appState }}
      </v-col>

    </v-row>
  </v-container>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
import { appState } from '../_app'

export default defineComponent({
  name: 'RouterLayout',

  data () {
    return {
      appState
    }
  },
})
</script>
