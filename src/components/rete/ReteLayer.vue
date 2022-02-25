<template>
  <div ref="rete" class="rete-repeat-bg">
  </div>
</template>

<script lang='ts'>

import { defineComponent } from 'vue'

import { NodeEditor, Engine } from "rete";
import ConnectionPlugin from 'rete-connection-plugin';
import VueRenderPlugin from 'rete-vue-render-plugin';

import { appState  } from '../../_app'

import { Components, CreateNode, register } from './components'

import ReteCustomNode from './ReteCustomNode.vue'


const ENGINE_V = "block-schema-processor@1.1.0"

export default defineComponent({
  name: 'ReteLayer',
  components: {  },
  data() {
    return {
      appState 
      }
  },
  methods:{
    async click() {
      console.log("click")
    },
  },
  watch:{
  // async "state.pause"(pause){
  //     console.log('pause',pause)
  //     if( pause ){
  //         await this.engine.abort();
  //     }
  //     else {
  //         await this.engine.abort();
  //         await this.engine.process(this.editor.toJSON());
  //     }
  // }
  },
  async mounted() {
    const container = this.$refs.rete as HTMLElement

    console.log('-------------------------- MOUNT RETE LAYER')

    let editor = new NodeEditor(ENGINE_V, container)
    let engine = new Engine(ENGINE_V);
    register(editor, engine)

    editor.use(ConnectionPlugin);
    
    editor.use(VueRenderPlugin, { component: ReteCustomNode });

    ( new Array(2).fill("") ).map( async (e: any,id: any) => {
      const newNode = await CreateNode('constant', {num: 2 + id}, {}) 
      newNode.position = [80 * id, 400 * id];
    

      editor.addNode(newNode);
      return newNode
    })



    console.log('-------------------------- RETE STARTE')


    editor.on(['process', 'noderemoved', 'connectioncreated', 'connectionremoved' ], async () => { 
      // nodecreated
      // if(!state.pause) {
      //     console.log("recalculate")
      //     await this.engine.abort();
      //     await this.engine.process(this.editor.toJSON());
      // }
      // else {
      //     console.log("paused")
      // }
    });
    // await this.editor.fromJSON(INIT_DATA);
      // editor.trigger('process');
  }
})
</script>