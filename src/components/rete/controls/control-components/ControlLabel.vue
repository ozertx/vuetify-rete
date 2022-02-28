<template>
  <div>
    control - label{{ value }}
  </div>
</template>


<script>

  import { defineComponent } from 'vue'

  export default defineComponent({
    name: "LabelControl",
    props: ['initial', 'readonly', 'emitter', 'ikey', 'type', 'change', 'getData', 'putData'],
    data() {
      return {
        value: this.initial || "",
      }
    },
    methods: {
    },
    mounted() {
      this.value = this.getData(this.ikey);
    }
  })
</script>


