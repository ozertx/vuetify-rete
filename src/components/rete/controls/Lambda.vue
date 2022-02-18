<template>
	<div>
		<v-expansion-panels accordion flat multiple v-model="panels">
			<!-- <v-expansion-panel :readonly="!haveData">
				<v-expansion-panel-header class="pa-0"  :hide-actions="!haveData" expand-icon="mdi-chevron-down">{{ haveData?'data':'no data'}}</v-expansion-panel-header>
				<v-expansion-panel-content  style="padding: 0px 0px;">
					{{ aboutData }}
				</v-expansion-panel-content>
			</v-expansion-panel> -->
			<v-expansion-panel>
				<v-expansion-panel-header class="pa-0" expand-icon="mdi-chevron-down">
					
					<v-row  align="center" >
						<v-col cols="12" class="title" align='right'>
							{{ label }}
							<v-icon :color=" stateColor(state.valid?'SUCCESS':'ERR') "
							>{{ state.valid?'mdi-check':'mdi-alert-circle' }}</v-icon>
						</v-col>
					</v-row>

					<!-- <template v-slot:actions>
						<v-icon :color=" stateColor(state.valid?'SUCCESS':'ERR') "
						>{{ state.valid?'mdi-check':'mdi-alert-circle' }}</v-icon>
					</template> -->


				</v-expansion-panel-header>
				<v-expansion-panel-content class="pa-0" style="padding: 0px 0px;">
						<!-- <v-text-field v-model="url" label="url" filled  ></v-text-field> -->
						<v-textarea  :label=" mask('...') " filled
							:background-color=" stateColor(state.valid?'SUCCESS':'ERR') " v-model="payload"
							@click=" payloadColor = '' "
						></v-textarea>
						<v-btn text small 
						v-on:click=" clickCheck " 
						color="blue darken-3"
						>check</v-btn>
						<v-btn text small v-on:click=" clickOk ">close</v-btn>
					</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script>

import { requestIsobr } from '../../../utils/ipc'
import { } from "safe-eval"

export default {
	name: 'LambdaControl',
	props: ['initial', 'readonly', 'emitter', 'ikey', 'type', 'change', 'getData', 'putData'],
	data() {
		let type = this.type
		let mask = this.type.mask?this.type.mask: (str) => `(item) => { ${str} }`
		let label = this.type.label?this.type.label: `LAMBDA`
		
		return {
			panels: [1],
			aboutData: '',
			haveData: false,
			payload: ' id:item.id ',
			payloadColor: '',
			mask, label,

			state: {
				valid:false,
				func: null
			},
			value:""
		}
	},
	methods: {
		stateColor(state) {
			const colors = {
				"NEW":"",
				"SUCCESS":"green lighten-3",
				"ERR":"red lighten-3"

			}
			return colors[state] ? colors[state] : ""
		},
		click1() {
			console.log("click1")
	
			// this.$set(this, 'panels', [0])
			this.update(this.state)

			console.log(this.state)
			this.payloadColor = ''
		},

		clickOk() {
			this.$set(this, 'panels', [])
		},
		clickCheck() {
			console.log("check click -->")

			let func
			try {
				func = eval(this.mask( this.payload ) )
				if (typeof(func) !== 'function') throw "invalid lambda"
				let tst = func({ id:1 })
				console.log('func ok', func)
				this.state.valid = true
				this.state.func = func
			}
			catch(err) {
				console.log('lambda ERR', err.toString())
				this.state.valid = false
				this.state.func = null
			}
			this.update()
			// this.$set(this, 'panels', [0])
			// this.update(this.state)

			// console.log(this.state)

		},
		dataStats( data ) {
			let dType = typeof(data)
			if( dType == 'object') {
				if( Array.isArray(data)) {
					return `Array, ${data.length} items`
				} else {
					return `Object, keys: ${ Object.keys(data).join(', ')}`
				}


			}
			else return dType

		},
		update() {
			if (this.ikey) {
				this.putData(this.ikey, this.state)
				this.change(this.state);
			}
			this.emitter.trigger('process');
		}
	},
	mounted() {
		this.value = this.getData(this.ikey);
		this.clickCheck()
	}
}
</script>



<style lang="scss"> 
.v-expansion-panel-content__wrap  {
	padding: 0px 0px !important;
}
</style>