

import { Control } from 'rete';
import Request from './Request.vue';
import Lambda from './Lambda.vue';
import TextArea from './TextArea.vue';
import Label from './Label.vue';
import DataStats from './DataStats.vue';
import DataStore from './DataStore.vue';

export class DataStoreControl extends Control {
    constructor(emitter, key, type, readonly) {
        super(key);
        this.component = DataStore;
        this.props = { emitter, ikey: key, type, readonly, change: () => this.onChange() };
    }
    setValue(value) {
        console.log("DataStoreControl setValue")
        const ctx = this.vueContext || this.props;
        ctx.value = value;
    }
    onChange() { }
}

export class RequestControl extends Control {
    constructor(emitter, key, type, readonly) {
        super(key);
        this.component = Request;
        this.props = { emitter, ikey: key, type, readonly, change: () => this.onChange() };
    }
    setValue(value) {
        const ctx = this.vueContext || this.props;
        ctx.value = value;
    }
    onChange() {}
}



export class LambdaControl extends Control {
    constructor(emitter, key, type, readonly) {
        super(key);
        this.component = Lambda;
        this.props = { emitter, ikey: key, type, readonly, change: () => this.onChange() };
    }
    setValue(value) {

        const ctx = this.vueContext || this.props;
        ctx.value = value;
    }
    onChange() { }
}

export class TextAreaControl extends Control {
    constructor(emitter, key, type, readonly) {
        super(key);
        this.component = TextArea;
        this.props = { emitter, ikey: key, type, readonly, change: () => this.onChange() };
    }
    setValue(value) {

        const ctx = this.vueContext || this.props;
        ctx.value = value;
    }
    onChange() { }
}

export class LabelControl extends Control {
    constructor(emitter, key, type, readonly) {
        super(key);
        this.component = Label;
        this.props = { emitter, ikey: key, type, readonly, change: () => this.onChange() };
    }
    setValue(value) {

        const ctx = this.vueContext || this.props;
        ctx.value = value;
    }
    onChange() { }
}

export class DataStatsControl extends Control {
    constructor(emitter, key, type, readonly) {
        super(key);
        this.component = DataStats;
        this.props = { emitter, ikey: key, type, readonly, change: () => this.onChange() };
    }
    setValue(value) {

        const ctx = this.vueContext || this.props;
        ctx.value = value;
    }
    onChange() { }
}

