import * as Control from '../controls'
import Socket from '../ReteSockets'
import Rete from "rete";

// export * from './split'
// export * from './map'
// export * from './request'
interface CardComponentConfig {
  name: string
  inputs: { [key: string ]: any }
  outputs: { [key: string]: any }
  controls: { [key: string]: any }

}

class CardComponent extends Rete.Component {

  render: any
  component: any
  props: any
  config: CardComponentConfig

  constructor(name: string, config: CardComponentConfig) {
    console.log("build", name, config)
    super(name);
    this.config = config
	}

	async builder(node: any) {

    for(const name in this.config.inputs) {
      const conf = this.config.inputs[name]
      node.addInput(new Rete.Input(name, conf.title, Socket.json))
    }

    for (const name in this.config.outputs) {
      const conf = this.config.outputs[name]
      node.addOutput(new Rete.Output(name, conf.title, Socket.json))
    }
    
    for (const name in this.config.controls) {
      const conf = this.config.controls[name]

      node.addControl(new Control.TextAreaControl(this.editor, name, conf.title, false))
    }
		return node
	}

	async worker(node: any, inputs: any, outputs: any) {
		console.log('in-->',node.name,inputs)
		console.log(node.name,'out-->',outputs)
		console.log(node.data)
		outputs['out1'] = node.data.value
	}
}

export default CardComponent

