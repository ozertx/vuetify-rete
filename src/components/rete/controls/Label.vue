<template>
  <div>
    {{ value }}
  </div>
</template>


<script>

export default {
  name: "ControlLabel",
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
}
</script>


