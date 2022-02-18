<template>
  <div>
    url <input v-model="url" ><br>
    <textarea style="height:80px; width:300px;" v-model="payload" @mousedown.stop /><br>
    <button v-on:click=" click ">request</button><br>
    {{ responce }}
  </div>
</template>

<script>

import { isobrWebApi } from '../../../axios-isobr-web-api'

export default {
  name: 'apiRequest',
  props: ['initial', 'readonly', 'emitter', 'ikey', 'type', 'change', 'getData', 'putData'],
  data() {
    return {
      url: 'auth/api/location/read',
      payload: '{}',
      responce: ' no responce ',
      value: {},
    }
  },
  methods: {
    async click() {
        console.log(`request ${ this.url } payload: ${ this.payload }`)

        let payload = {}
        try { payload = JSON.parse(this.payload) }
        catch(err){ payload = {} }

        await isobrWebApi.login()
        let result = await isobrWebApi.request(this.url,payload)
        if( result ) {
          this.responce = `responce OK ${ result.data.length } items`
          this.update(result.data)
        } 
        else this.responce = 'request FAIL'
    },
    // parse(value) {
    //   return this.type === 'number' ? +value : value;
    // },
    // onChange(e){
    //   this.value = this.parse(e.target.value);
    //   this.update();
    // },
    update( data ) {
      if (this.ikey) {
        this.putData(this.ikey, data)
        this.change(data);
      }
      this.emitter.trigger('process');
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}
</script>


