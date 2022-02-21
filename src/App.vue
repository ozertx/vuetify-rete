<template>
  <div>

    <div v-if="!!appState.error ">
      {{ appState.error }} 
      <br> ошибка приложения
    </div>
    <v-app v-else>

      <div class="app-fab-widget">
        <v-container 
        class="circle"
        @mouseenter=" onMouseEnterMenu " 
        @mouseleave=" onLeaveMenu "
        >
          <ui-unit view="icon60" unit="appLogo"  />

        </v-container>

        <v-container 
        class="top pa-0 ma-0"
        @mouseenter=" onMouseEnterMenu " 
        @mouseleave=" onLeaveMenu "
        >

          <ui-unit view="icon60" unit="service"  />
          <ui-unit view="icon60" unit="profile"  />

        </v-container>


        <v-container 
        class="right pa-0 ma-0"
        @mouseenter=" onMouseEnterMenu " 
        @mouseleave=" onLeaveMenu "
        >

          <ui-unit view="icon60" unit="layer001"  />
          <ui-unit view="icon60" unit="layer002"  />


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

      <rete-layer class="full-screen-layer" style="z-index:600;">
      </rete-layer>

    </v-app>

  </div>
</template>


<style lang="scss"> 

  .rete-repeat-bg {
    background-image: url("https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/SVG_logo.svg/240px-SVG_logo.svg.png");
    background-repeat: repeat-x;
    background-size: 240px 240px;
  }
  
  .app-fab-widget {
    position: absolute; 
    top:0px; 
    right:0px;
  }

  .app-fab-widget .circle {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute; 
    top:0px; 
    right:0px;
    width:120px;
    height:120px;
    // background:#22ee00 !important;
    z-index: 1001;
  }

  .app-fab-widget .top {
    position: absolute; 
    width: auto;
    top:0px; 
    right:120px;
    height:60px;
    // background:#22ee00 !important;
    z-index: 1002;
  }

  .app-fab-widget .top > * {
    display:table-cell
  }

  .app-fab-widget .right {
    position: absolute; 
    top:120px; 
    right:0px;
    width:60px;
    height:auto;
    // background:#22ee00 !important;
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
import UiUnit from './components/UiUnit.vue'
import ReteLayer from './components/rete/ReteLayer.vue'

export default defineComponent({
  name: 'App',
  components: {
    UiUnit, ReteLayer
  },
  data () {
    return {
      onFab: 0,
      appState
    }
  },
  methods:{
    onMouseEnterMenu() {
      this.onFab = 1
    },
    onLeaveMenu() {
      this.onFab = 0
    },
  }
})
</script>
