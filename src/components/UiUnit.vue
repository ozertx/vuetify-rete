<template>
  <div>
    <div v-if=" view == 'icon60' " class="icon60 pa-0 ma-0">

      <div v-if="currentUnit"> 

        <v-btn icon x-small flat>
          <v-icon >{{ currentUnit.icon || 'mdi-blur' }}</v-icon>
        </v-btn>
      
      </div>
      <div v-else>

        <v-btn icon x-small>
          <v-icon color="red" > mdi-close </v-icon>
        </v-btn>
      
      </div>

      {{  }}

      <!-- {{ view }} -->
    </div>
    <div v-else>
      XXX
    </div>
  </div>
</template>



<style lang="scss"> 
  
  .icon60 {
    display: flex;
    justify-content: center;
    align-items: center;
    width:60px; 
    height:60px;
    min-height:60px;
  }

</style>


<script lang='ts'>
import { defineComponent } from 'vue'
import { appState, appUnits } from '../_app'

export default defineComponent({
  name: 'UiUnit',
  props: {
    unit: String,
    view: String,
    params: Object
  },
  data () {
    return {
      appState, appUnits
    }
  },
  computed: {
    currentUnit() {
      const unitName = this.$props.unit
      
      if(!unitName)  return null
      if(!appUnits[unitName] ) return null

      return appUnits[unitName]

    }
  }
})
</script>
