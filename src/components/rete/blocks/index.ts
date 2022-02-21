import * as Control from '../controls'
import Socket from '../ReteSockets'
import Rete from "rete";

// export * from './split'
// export * from './map'
// export * from './request'


class TextComponent extends Rete.Component {

  render: any
  component: any
  props: any

	constructor() {
		super('Text');
	}

	async builder(node: any) {

    node.addInput(new Rete.Input('inParam', 'Text', Socket.json))
    node.addOutput(new Rete.Output('invalid', 'Text', Socket.json))

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
