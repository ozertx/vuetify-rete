<template>
  <div>
    

    <v-overlay v-if="appState.error" >
      {{ error }} <br> ошибка приложения
    </v-overlay>

    <v-app v-else>


    <div >
      layer11  333333333333333333
    </div>

    <!-- <div class="full-screen-layer">
      layer12  
    </div> -->

    <div class="app-fab-widget">
      <v-container 
      class="circle"
       @mouseenter=" onMouseEnterMenu " 
       @mouseleave=" onLeaveMenu "
      >
        {{ onFab }}
        <v-btn
        >
          <v-icon dark>
            mdi-android
          </v-icon>
        </v-btn>


      </v-container>

      <v-container 
      class="top"
       @mouseenter=" onMouseEnterMenu " 
       @mouseleave=" onLeaveMenu "
      >
        {{ onFab }}

                  <v-icon dark>
            mdi-android
          </v-icon>
      </v-container>


      <v-container 
      class="right"
       @mouseenter=" onMouseEnterMenu " 
       @mouseleave=" onLeaveMenu "
      >
        {{ onFab }}
      </v-container>
    </div>

      <v-main>
        <router-view></router-view>
      </v-main>

      <!-- DIALOG -->

      <!-- <v-dialog v-model="state.modal.isOpen" scrollable max-width="90%">
        <component 
        :is=" state.modal.component " 
        :params=" state.modal.params " 
        @close=" state.modal.isOpen = false " >
        </component>
      </v-dialog> -->

    </v-app>

  </div>
</template>


<style lang="scss"> 
  
  .app-fab-widget {
    position: absolute; 
    top:0px; 
    right:0px;
  }

  .app-fab-widget .circle {
    position: absolute; 
    top:0px; 
    right:0px;
    width:120px;
    height:120px;
    background:#22ee00 !important;
    z-index: 1001;
  }

  .app-fab-widget .top {
    position: absolute; 
    top:0px; 
    right:120px;
    height:48px;
    background:#22ee00 !important;
    z-index: 1000;
  }

  .app-fab-widget .right {
    position: absolute; 
    top:120px; 
    right:0px;
    width:48px;
    background:#22ee00 !important;
    z-index: 1000;
  }

  .full-screen-layer {
    position: absolute; 
    top:0px; 
    bottom:0px;
    right:0px;
    width: 100%;
    // background:#eeee00 !important;

  }

  // animations -----
  .blink-white-text-animation {
    animation: blink-button-text 2s ease infinite;
  }
  @keyframes blink-button {
    from, to { opacity: 1; color:red; }
    25%, 75% { opacity: 1;  color: green;}
    50% { opacity: 0.5 }
  }
  @keyframes blink-button-text {
    from, to { }
    40%, 60% { color:white  }
    50% { color: #999999; }
  }

  // fix subtable position -----
  .sub-table {
    th {
      height: 0px !important;
      overflow: hidden !important;
    }
    .v-data-table__wrapper {
      padding:0px 0px 24px 24px !important;
    }
  }
  .v-data-table__expanded__content {
    box-shadow: none !important;
    > td {
      padding:0px 0px 24px 24px !important;
    }
  }

  // fix default hover row -----
  tbody { 
    tr:hover {
      background-color: transparent !important;
    }
  }
  .hover-row {
    background:#eeeeee !important;
  }

  .card-table {
    .v-data-table__wrapper {
      max-height:calc(100% - 59px) !important;
      overflow-y:auto;
      overflow-x:auto;
    }
  }

</style>




<script lang="ts">
import { defineComponent } from 'vue'
import { appState } from './_app'

export default defineComponent({
  name: 'App',

  data () {
    return {
      onFab: 0,
      appState
    }
  },
  methods:{
    onMouseEnterMenu(e: any) {
      console.log(1)
      this.onFab = 1
    },
    onLeaveMenu(e: any ) {
      this.onFab = 0
    },
  }
})
</script>
