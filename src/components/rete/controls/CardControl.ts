import { Control } from 'rete';
import { validate } from '../../../_app'

import * as TextArea from './control-components/ControlTextArea.vue';
import * as Label from './control-components/ControlLabel.vue';
const controlComponents: any = { TextArea, Label }
const ControlsComponent: any = {
  text: TextArea,
  label: Label
}


export class CardControl extends Control {

  component: any
  props: any
  vueContext: any

  constructor(emitter: any, key: any, type: any, readonly: any, config: any) {
    super(key);

    const controlDefinition: any = ControlsComponent[type]

    console.log('card contrrol', type, controlDefinition)

    if (!controlDefinition) {
      throw new Error(`not found control-component with type:${type},  Use: ${Object.keys(controlComponents).join(', ')}`)
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

    this.component = controlDefinition;
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
