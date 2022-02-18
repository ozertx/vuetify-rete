<template>
  <div>
    <!-- url <input v-model="url" ><br>
    <textarea style="height:80px; width:300px;" v-model="payload" @mousedown.stop /><br> -->
    <!-- <button v-on:click=" click ">request</button><br> -->
            <!-- <v-card-title>Select Country</v-card-title> -->

    <v-btn small v-on:click=" click "> request </v-btn>
    <br>
    {{ responce }}11

  </div>
</template>

<script>

import { requestPdSeries } from '../../../utils/ipc'

export default {
  name: 'PandasSeries',
  props: ['initial', 'readonly', 'emitter', 'ikey', 'type', 'change', 'getData', 'putData'],
  data() {
    return {
      responce: ' no responce ',
      value: {},
    }
  },
  methods: {
    async click() {
      requestPdSeries({ 
        id: '1' 
      })
    },
    update( data ) {
      if (this.ikey) {
        this.putData(this.ikey, data)
        this.change(data);
      }
      // this.emitter.trigger('process');
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
}
</script>


