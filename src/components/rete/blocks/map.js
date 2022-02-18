import * as Control from './controls'
import Socket from './sockets'
import Rete from "rete";
import node from '../components/CustomNode.vue'

class ArraySplitter  extends Rete.Component {
    constructor(name) {
        super(name);
        this.data = { render: 'vue', component: node }
    }

    worker(node, inputs, outputs) {
        console.log("MapComponent",inputs, outputs)
        console.log("MapComponent--s-->",node.data)
        // var n = this.editor.nodes.find(n => n.id == node.id);
        // if(n) n.controls.get('preview').setValue(sum);
        let in1 = inputs.in1[0]
        console.log("in1-->", in1)
        
        outputs['out1'] = undefined
        var n = this.editor.nodes.find(n => n.id == node.id);
        if( !in1 ) {
            if(n) n.controls.get('labelIn').setValue( in1 );
            if(n) n.controls.get('labelOut').setValue( undefined );
        }
        else {
            if(n) n.controls.get('labelIn').setValue( in1 );

            if(node.data.funcControl.valid) {
                let func = node.data.funcControl.func
                let output = []
                for(let item of in1) {
                    output.push(func(item))
                }
                outputs['out1'] = output
                if(n) n.controls.get('labelOut').setValue( output );
            }
            else if(n) n.controls.get('labelOut').setValue( undefined );
        }

    }

}

export class ArrayMapToObjectBox extends ArraySplitter {
    constructor() {
        super('array map to object');
    }

    builder(node) {

        node.addInput( new Rete.Input('in1', 'json',  Socket.json) )
        node.addOutput( new Rete.Output('out1', 'json',  Socket.json) )
        node.addControl(new Control.DataStatsControl(this.editor, 'labelIn', 'in'))
        node.addControl(new Control.DataStatsControl(this.editor, 'labelOut', 'out'))
        node.addControl(new Control.LambdaControl(this.editor, 'funcControl', { 
            label:"map object lambda",
            mask: (str) => `(item) => ({ ${str} })`
        }))
        return node
    }
}

export class ArrayMap extends ArraySplitter {
    constructor() {
        super('array map');
    }

    builder(node) {

        node.addInput( new Rete.Input('in1', 'json',  Socket.json) )
        node.addOutput( new Rete.Output('out1', 'json',  Socket.json) )
        node.addControl(new Control.DataStatsControl(this.editor, 'labelIn', 'in'))
        node.addControl(new Control.DataStatsControl(this.editor, 'labelOut', 'out'))
        node.addControl(new Control.LambdaControl(this.editor, 'funcControl', { 
            label:"map lambda",
            mask: (str) => `(item) => ${str} `
        }))
        return node
    }
}
