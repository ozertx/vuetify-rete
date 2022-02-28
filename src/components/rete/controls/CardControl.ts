import { Control } from 'rete';
import { validate } from '../../../_app'
import { ControlDefinitions } from './ControlDefinitions'

import ControlTextArea from './control-components/ControlTextArea.vue';
import ControlLabel from './control-components/ControlLabel.vue';
const controlComponents: any = { ControlTextArea, ControlLabel }


export class CardControl extends Control {

  controlDefinition: any
  component: any
  props: any
  vueContext: any

  constructor(emitter: any, key: any, type: any, readonly: any, config: any) {
    super(key);

    const controlDefinition: any = ControlDefinitions[type]
    this.controlDefinition = controlDefinition
    // console.log("-----------------------!!!",type,this.controlDefinition)

    if (!controlDefinition) {
      // console.log("-----------------------!!!",this.controlDefinition)
      throw new Error(`not found control-definition with type:${type},  Use: ${Object.keys(ControlDefinitions).join(', ')}`)
    }

    // if (!validate['control-definition-schema'](config)) {

    //   console.info(`config control-definition-schema validation error`)
    //   console.info(`config`, config)
    //   validate['control-definition-schema'].errors.forEach( (e: any) => console.log('err',e))
    //   const error = {
    //     error: `invalid control-definition-schema schema`,
    //     item: controlDefinition,
    //     errors: validate['control-definition-schema'].errors,
    //   }

    //   throw new Error(error.error)
    // }
    const controlComponent = controlComponents[controlDefinition.component]
    if (!controlComponent) {
      throw new Error(`not found control-component with type:${type},  Use: ${Object.keys(controlComponents).join(', ')}`)
    }

    this.component = controlComponent;
    // console.log('this.component = controlComponent;', this.component)

    this.props = { emitter, ikey: key, type, readonly, change: () => this.onChange(), config };
  }
  setValue(value: any) {
    const ctx = this.vueContext || this.props;
    ctx.value = value;
  }
  onChange() {
    //
  }
}
