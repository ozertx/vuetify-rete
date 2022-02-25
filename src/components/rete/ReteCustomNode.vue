<template>
<div>

  <template v-if="inputs().length || outputs().length">

    <div v-for="(input,id) in inputs()" :key="id" >
      <Socket style="margin-left:-24px;" v-socket:input="input" type="input" :socket="input.socket" :used="input.connections.length > 0" />
      <span class="overline">{{input.name}}</span>
    </div>
    <div v-for="(output,id) in outputs()" :key="id"> 
      <span class="overline">{{output.name}}</span>
      <Socket style="margin-right:-24px;" v-socket:output="output" type="output" :socket="output.socket" :used="output.connections.length > 0" />
    </div>
    
  </template>
 
  <div ref="vueapp"> </div>
</div>
</template>

<script lang="ts">
 
  import { createApp, defineComponent } from 'vue'

  import VueRender from 'rete-vue-render-plugin';
  import vuetify from '../../plugins/vuetify';
  import NodeCard from './NodeCard.vue';
  
  const cmpDefinition = defineComponent({
    name: 'reteNode',
    props:  ['node', 'editor', 'bindSocket', 'bindControl'],
    mixins: VueRender.Node.mixins,
    components: { 
      Socket:VueRender.Socket
    },
    mounted() {
      console.log(this.$props)
      const app = createApp(NodeCard, { node: this.$props.node })
      app
        .use(vuetify)
        .mount(this.$refs.vueapp as any) 
      
      this.$data.app = app as any
    },
    data() {
      return {
        app: null,
        value:{ a:1 },
        state: {
          pause: false
        }
      }
    },
    methods: {
    }
  })


  export default cmpDefinition

</script>



<style  lang="sass">
</style>