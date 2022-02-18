<template>
    <div ref="rete">
    </div>
</template>

<script lang='ts'>

import { defineComponent } from 'vue'

import { NodeEditor, Engine } from "rete";
import ConnectionPlugin from 'rete-connection-plugin';
import VueRenderPlugin from 'rete-vue-render-plugin';
import ContextMenuPlugin from 'rete-context-menu-plugin';
import ReteBlocks from './blocks'

import { appState  } from '../../_app'
import axios from 'axios'
import ReteCustomNode from './ReteCustomNode.vue'


// import { createVuetify } from 'vuetify'

// const VueRenderPlugin: any = import('rete-vue-render-plugin') as any
// const ContextMenuPlugin: any = import('rete-context-menu-plugin') as any

const ENGINE_V = "block-schema-processor@1.1.0"

export default defineComponent({
    name: 'ReteLayer',
    components: {  },
    data() {
      this.$attrs.editor = null
      this.$attrs.engine = null
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
        // console.log(container)
        // console.log(container.parentElement)
        console.log('--------------------------mount')

        let editor = new NodeEditor(ENGINE_V, container)
        let engine = new Engine(ENGINE_V);

        // (this as any).editor = editor as any
        // (this as any).engine = engine as any
        

        editor.use(ConnectionPlugin)
        
        console.log(ReteCustomNode)
        
        editor.use(VueRenderPlugin,{
          component: ReteCustomNode // optional
        })
        // editor.use(ContextMenuPlugin, { });

        const blocks: any = ReteBlocks

        const components: any = { }

        for( let blockName in blocks ){
          components[blockName] = new blocks[blockName]()
          editor.register(components[blockName])
          engine.register(components[blockName])

        }

        var n1 = await components['TextComponent'].createNode({num: 2});
        n1.position = [80, 200];
        n1.props = {}

        console.log(n1)

        editor.addNode(n1);



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