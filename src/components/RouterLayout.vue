<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="2">
 sdsdds

<rete-layer>
</rete-layer>

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
import ReteLayer from '../components/rete/ReteLayer.vue'

export default defineComponent({
  name: 'RouterLayout',
  components: { ReteLayer },
  data () {
    return {
      appState
    }
  },
})
</script>
