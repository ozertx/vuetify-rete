<template>
	<div style="padding: 6px 0px 6px 0px;">

		<v-chip :color="stateColor( state.valid?'SUCCESS':'ERR')"
			@click.stop=" open " 
			>  
				{{ label }} 
			<v-icon v-if="state.valid" small right>mdi-magnify</v-icon>
		</v-chip>

		<v-btn small right text
		color="blue darken-3"
		@click=" resetStore "
		><v-icon>mdi-close</v-icon> </v-btn>

	</div>
</template>


<script>
 import { openJsonViewer } from '../../../utils/global'


export default {
	name: "DataStore",
	props: ['initial', 'readonly', 'emitter', 'ikey', 'type', 'change', 'getData', 'putData'],
	data() {
		return {
			value: this.initial || null,
			label:"",
			state:{
				valid: true
			}
		}
	},
	watch:{
		value(val) {
			// console.log("DataStore watch value")
			let stats = this.dataStats(this.value)
			this.label = stats.str
			if(stats.isNull || stats.isUndefined) this.state.valid = false
			else this.state.valid = true
			console.log("DataStore watch value")
			this.update()
		}
	},
	mounted() {
		this.value = this.getData(this.ikey);
	},
	methods: {
		open(  ) {
			if( this.state.valid) openJsonViewer(this.value)
		},
		resetStore(){
			this.value = undefined
			console.log("reset store")
			this.update()
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
			
			return { 
				typeof: typeof(data), 
				str: statsStr(),
				isNull: data === null,
				isUndefined: data === undefined,
			}

			function statsStr() {
				let dType = typeof(data)
				if( dType == 'object') {
					if( data === null ) {
						return `is null`
					}
					else if( Array.isArray(data)) {
						return `Array, ${data.length} items`
					} 
					else {
						return `Object, keys: ${ Object.keys(data).join(', ')}`
					}
				}
				else return dType
			}
		},
		update() {
			if (this.ikey) {
				console.log("DataStore update")
				this.putData(this.ikey, this.value)
				this.change(this.value);
			}
			this.emitter.trigger('process');
		}
	}
}
</script>


