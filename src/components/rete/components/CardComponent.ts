import { Controls } from '../controls'
import Socket from '../ReteSockets'
import Rete from "rete";


console.log("Controls", Controls)
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
    // console.log("build", name, config)
    super(name);
    this.config = config
	}

	async builder(node: any) {

    for(const name in this.config.inputs) {
      const conf = this.config.inputs[name]
      node.addInput(new Rete.Input(name, conf.title, Socket.json, conf))
    }

    for (const name in this.config.outputs) {
      const conf = this.config.outputs[name]
      node.addOutput(new Rete.Output(name, conf.title, Socket.json, conf))
    }
    
    for (const name in this.config.controls) {
      const conf = this.config.controls[name]
      const Control: any = Controls[conf.kind]

      if(!Control) {
        const msg = `Control kind ${conf.kind} not found. Use: ${Object.keys(Controls).join(', ')}`
        console.error(msg)
        throw new Error(msg)
      }



      const control: any = new Control(this.editor, name, conf.kind, false, conf)
      node.addControl(control)
    }
		return node
	}

	async worker(node: any, inputs: any, outputs: any) {

    for (const name in this.config.outputs) {
      const conf = this.config.outputs[name]

      console.log('data', name, node.data)
      console.log('inputs', name, node.inputs)
      outputs[name] = await conf.calc(inputs, node.data, conf)
    }
	}
}

export default CardComponent

