import { Control } from 'rete';
import component from './component.vue';

export class Component extends Control {
    constructor(emitter, key, type, readonly) {
        super(key);
        this.component = component;
        this.props = { emitter, ikey: key, type, readonly, change: () => this.onChange() };
    }

    setValue(value) {
        const ctx = this.vueContext || this.props;

        ctx.value = value;
    }

    onChange() {}
}