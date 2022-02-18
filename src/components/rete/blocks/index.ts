import * as Control from '../controls'
import Socket from '../ReteSockets'
import Rete from "rete";
// import node from '../components/CustomNode.vue'

// export * from './split'
// export * from './map'
// export * from './request'


class TextComponent extends Rete.Component {
	constructor() {
		super('Text');
	}

	builder(node: any) {

		let out = new Rete.Output('out1', 'Text', Socket.text);
		node.addOutput(out)
		node.addControl(new Control.TextAreaControl(this.editor, 'value', 'Text', false))
		return node
	}

	worker(node: any, inputs: any, outputs: any) {
		console.log('in-->',node.name,inputs)
		console.log(node.name,'out-->',outputs)
		console.log(node.data)
		outputs['out1'] = node.data.value
	}
}

export default {
  TextComponent
}
