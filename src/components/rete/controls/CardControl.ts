import { Control } from 'rete';
import { validate } from '../../../_app'

import * as TextArea from './TextArea.vue';
import * as Label from './Label.vue';
const controlComponents: any = { TextArea, Label }


export class CardControl extends Control {

  component: any
  props: any
  vueContext: any

  constructor(emitter: any, key: any, type: any, readonly: any) {
    super(key);

    const definition: any = controlComponents[type]

    if (!definition) {
      throw new Error(`not found component with type:${type}`)
    }

    if (!validate['control-definition-schema'](definition)) {

      console.log(`control-definition-schema`, definition)
      console.log(validate['control-definition-schema'].errors)
      const error = {
        error: `invalid control-definition-schema schema`,
        item: definition,
        errors: validate['app-config'].errors,
      }

      throw new Error(error.error)
    }

    this.component = definition;
    this.props = { emitter, ikey: key, type, readonly, change: () => this.onChange() };
  }
  setValue(value: any) {
    const ctx = this.vueContext || this.props;
    ctx.value = value;
  }
  onChange() {
    //
  }
}
