<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    props: {{ nodeConfig  }}
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          OVERLINE 
        </div>
        <v-list-item-title class="text-h5 mb-1">
          Headline 5
        </v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn @click=" lnode.props.data.num++ "
        outlined
        rounded
        text
      >
        Button
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
 
  import { defineComponent } from 'vue'

  
  const componentDefinition = defineComponent({
		name: 'NodeCard',
    props: {
      node: {
        type: Object,
        required:true
      }
    },
		components: { 
		},
    computed: {
      nodeConfig() {
        const node = this.$props.node
        return {
          name: node.name,
          data: node.data,
          id: node.id,
          inputs: node.inputs,
          outputs: node.outputs,
        }
      }
    },
    created() {
      //
    },
		data() {
			return {

			}
		},
		methods: {
		}
	})


	export default componentDefinition

</script>



<style lang="sass">
</style>