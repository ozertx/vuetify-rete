import { Control } from 'rete';
import * as TextArea from './TextArea.vue';
import * as Label from './Label.vue';





export class BaseCardControl extends Control {

  component: any
  props: any
  vueContext: any

  constructor(emitter: any, key: any, type: any, readonly: any) {
    super(key);
    this.component = TextArea;
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


export class TextAreaControl extends Control {

  component: any
  props: any
  vueContext: any

  constructor(emitter: any, key: any, type: any, readonly: any) {
    super(key);
    this.component = TextArea;
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

export class LabelControl extends Control {

  component: any
  props: any
  vueContext: any

  constructor(emitter: any, key: any, type: any, readonly: any) {
    super(key);
    this.component = Label;
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
