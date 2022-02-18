<template>
	<v-hover><template v-slot="{ hover }">

		<v-card style="width:300px;" :elevation="hover ? 16 : 6">
			<v-card-text class="text-center title">  
			<v-icon  left color='yellow darken-3' v-if="state.pause">mdi-pause</v-icon> 
				{{node.name}}          
			<!-- <v-btn icon> <v-icon>mdi-close</v-icon> </v-btn> -->
			</v-card-text>


			<template v-if="inputs().length || outputs().length">
				<v-divider></v-divider>

				<v-container class="grey lighten-5">
					<v-row no-gutters>
						<v-col cols="6">
							<div v-for="(input,id) in inputs()" :key="id" >
								<Socket style="margin-left:-24px;" v-socket:input="input" type="input" :socket="input.socket" :used="input.connections.length > 0" />
								<span class="overline">{{input.name}}</span>
							</div>
						</v-col>
						<v-col cols="6"  class="text-right">
							<div v-for="(output,id) in outputs()" :key="id"> 
								<span class="overline">{{output.name}}</span>
								<Socket style="margin-right:-24px;" v-socket:output="output" type="output" :socket="output.socket" :used="output.connections.length > 0" />
							</div>
						</v-col>
					</v-row>
				</v-container>
			</template>

			<v-divider></v-divider>
			<!-- <v-progress-linear indeterminate color="cyan" :active=" progress "></v-progress-linear> -->

			<v-card-text v-if="controls().length">
					<div v-for="(control,id) in controls()" :key="id" v-control="control" >
					</div>
			</v-card-text>

			<!-- <v-card-actions>
				<v-btn text>Button</v-btn>
				<v-btn text>Button</v-btn>
			</v-card-actions> -->
		</v-card>

	</template></v-hover>
</template>

<script>
 
  import { defineComponent } from 'vue'
	// import Vuetify from 'vuetify/lib'
	// Vue.use(Vuetify,{})

	import VueRender from 'rete-vue-render-plugin';

	// import Socket from './CustomSocket.vue';

	export default defineComponent({
		name: 'reteNode',
    props: {
      aaa: {
        default:10
      }
    },
		mixins: [VueRender.mixin],
		components: { 
			Socket:VueRender.Socket
			// Socket
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
		},
    setup(props) {
    // const selected = () => {
    //   return props.editor.selected.contains(props.node) ? "selected" : "";
    // };
    // const className = computed(() => {
    //   return kebab([selected(), props.node.name]);
    // });

    return { className:'asdaasas' };
  }
	})
</script>

<style  lang="sass">


</style>