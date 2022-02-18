import * as Control from '../controls'
import Socket from '../ReteSockets'
import Rete from "rete";
import node from '../ReteCustomNode.vue'

// export * from './split'
// export * from './map'
// export * from './request'


class TextComponent extends Rete.Component {

  render: any
  component: any
  props: any

	constructor() {
		super('Text');
		// this.data = { render: 'vue', component: node, props: {
    //   vue:1
    // } }
    // this.render = 'vue', 
    // this.component = node, 
    // this.props = {} 

	}

	async builder(node: any) {

		const out = new Rete.Output('out1', 'Text', Socket.text);
		node.addOutput(out)
		node.addControl(new Control.TextAreaControl(this.editor, 'value', 'Text', false))
		return node
	}

	async worker(node: any, inputs: any, outputs: any) {
		console.log('in-->',node.name,inputs)
		console.log(node.name,'out-->',outputs)
		console.log(node.data)
		outputs['out1'] = node.data.value
	}
}

export default {
  TextComponent
}
