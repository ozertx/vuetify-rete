<template>
<div>
  qqsqlwqlwhlhj
</div>
</template>

<script>
 
  import Vue, { defineComponent } from 'vue'
	// import Vuetify from 'vuetify/lib'
	// Vue.use(Vuetify,{})

	import VueRender from 'rete-vue-render-plugin';
  import createVuetifyApp from '../../plugins/vuetify';

	// import Socket from './CustomSocket.vue';

console.log("ssssss",VueRender.Node.mixins)
console.log("ssssss",VueRender)


  
  const coomponent = defineComponent({
		name: 'reteNode',
    props:  ['node', 'editor', 'bindSocket', 'bindControl'],
		mixins: VueRender.Node.mixins,
		components: { 
      // eslint-disable-next-line
      // vuetify
			// Socket:VueRender.Socket,
			// Socket
		},
    created() {
      // const vtf = createVuetifyApp()
      // vtf.install(this.$root, {})

      console.log("jhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",Object.keys(this), this.$root)
    },
		data() {
			return {
				state: {
					pause: false
				}
			}
		},
		methods: {
			setProgress( value ) {
				this.progress = value
			}
			// editor.trigger('process');
		}
	})


	export default coomponent

</script>

<style  lang="sass">


</style>