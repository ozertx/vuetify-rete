<template>
	<div style="padding: 6px 0px 6px 0px;">
		<v-chip :color="stateColor( state.valid?'SUCCESS':'ERR')"
			@click.stop=" open " 
			>  
				{{ label }} 
			<v-icon small right>mdi-magnify</v-icon>
		</v-chip>

		{{ type }}

	</div>
</template>


<script>
 import { openJsonViewer } from '../../../utils/global'


export default {
	name: "DataStats",
	props: ['initial', 'readonly', 'emitter', 'ikey', 'type', 'change', 'getData', 'putData'],
	data() {
		return {
			value: this.initial || "",
			label:"",
			state:{
				valid: false
			}
		}
	},
	watch:{
		value(val) {
			this.label = this.dataStats(this.value)
		}
	},
	mounted() {
		this.value = this.getData(this.ikey);
	},
	methods: {
		// updateValue(value) {
		// 	this.value = value
		// },
		open(  ) {
			openJsonViewer(this.value)
		},
		stateColor(state) {
			const colors = {
				"NEW":"",
				"SUCCESS":"green lighten-3",
				"ERR":"red lighten-3"
			}
			return colors[state] ? colors[state] : ""
		},
		dataStats( data ) {
			let dType = typeof(data)
			this.state.valid = false
			if( dType == 'object') {
				if( Array.isArray(data)) {
					this.state.valid = true
					return `Array, ${data.length} items`
				} else {
					return `Object, keys: ${ Object.keys(data).join(', ')}`
				}
			}
			else return dType
		},
		m(){


		}
	}
}
</script>


