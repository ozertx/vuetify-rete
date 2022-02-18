<template>
	<div>
		<v-expansion-panels accordion flat multiple v-model="panels">

			<v-expansion-panel>
				<v-expansion-panel-header class="pa-0" expand-icon="mdi-chevron-down">

               <v-row no-gutters align="center" >
                  <v-col cols="12" class="title" align='right'>
							REQUEST
							<v-btn small text class="pa-0" style="min-width:0px;"
							@click.stop=" click "
							><v-icon color="blue darken-3">mdi-reload</v-icon> </v-btn>

						</v-col>
                </v-row>
				</v-expansion-panel-header>
				<v-expansion-panel-content class="pa-0" style="padding: 0px 0px;">

					<v-progress-linear indeterminate color="cyan" :active=" progress "></v-progress-linear>
					<v-text-field v-model="url" label="url" filled  ></v-text-field>
					<v-textarea  label="payload" filled
						:background-color="payloadColor" v-model="payload"
						@click=" payloadColor = '' "
					></v-textarea>

					<v-btn  color="blue darken-3"
					small text v-on:click=" click "> request </v-btn>

					<v-btn 
					small text v-on:click=" click "> close </v-btn>

					</v-expansion-panel-content>
			</v-expansion-panel>
		</v-expansion-panels>
	</div>
</template>

<script>

import { requestIsobr } from '../../../utils/ipc'

export default {
	name: 'RequestIsobr',
	props: ['initial', 'readonly', 'emitter', 'ikey', 'type', 'change', 'getData', 'putData'],
	data() {
		return {
			panels: [0],
			aboutData: '',
			haveData: false,
			url: 'auth/api/user/read',
			payload: '{ "include":["profile"], "where": { }	 }', payloadColor: '',
			responce: ' no responce ',
			progress: false,

			value: {},
		}
	},
	methods: {

		click1() {
			console.log("click1")
			this.payloadColor = ''
		},

		async click() {

			console.log( '--',this.url, this.payload )
			let payload 

			try { payload = JSON.parse(this.payload) } 
			catch(err) {
				this.payloadColor = 'red lighten-3'
				return
			}

			this.progress = true

			let result = await requestIsobr({ 
				url: this.url ,
				payload
			})
			this.aboutData = this.dataStats(result)
			this.progress = false
			this.haveData = true
			// this.$set(this, 'panels', [0])


			// this.value = result
			if( this.type.dataStore ) {
				this.type.dataStore.setValue(result)
			}

			this.update(result)

			// console.log(result)

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
		update( data ) {
			if (this.ikey) {
				this.putData(this.ikey, this.value)
				this.change(this.value);
			}
			this.emitter.trigger('process');
		}
	},
	mounted() {
		this.value = this.getData(this.ikey);
	}
}
</script>



<style lang="scss"> 
.v-expansion-panel-content__wrap  {
	padding: 0px 0px !important;
}
</style>