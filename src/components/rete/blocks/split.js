import * as Control from './controls'
import Socket from './sockets'
import Rete from "rete";
import node from '../components/CustomNode.vue'


export class ArraySplitterBox extends Rete.Component {
    constructor() {
        super('array splitter');
        this.data = { render: 'vue', component: node }
    }

    builder(node) {

        node.addInput( new Rete.Input('inParam', 'param', Socket.json) )
        node.addInput( new Rete.Input('inItems', 'items', Socket.json) )
        node.addOutput( new Rete.Output('valid', 'valid', Socket.json) )
        node.addOutput( new Rete.Output('invalid', 'invalid', Socket.json) )
        node.addControl(new Control.DataStatsControl(this.editor, 'labelIn', 'in'))
        node.addControl(new Control.DataStatsControl(this.editor, 'labelValid', 'valid'))
        node.addControl(new Control.DataStatsControl(this.editor, 'labelInvalid', 'invalid'))
        node.addControl(new Control.LambdaControl(this.editor, 'funcControl', { 
            label:"FILTER LAMBDA",
            mask: (str) => `(item, param) => ${str} `,
        }))
        return node
    }

    worker(node, inputs, outputs) {
        console.log("SplitComponent data---->",node.data)
        // var n = this.editor.nodes.find(n => n.id == node.id);
        // if(n) n.controls.get('preview').setValue(sum);
        let inItems = inputs.inItems[0]
        
        outputs['out1'] = undefined
        var n = this.editor.nodes.find(n => n.id == node.id);
        if( !inItems ) {
            if(n) n.controls.get('labelIn').setValue( inItems );
            if(n) n.controls.get('labelValid').setValue();
            if(n) n.controls.get('labelInvalid').setValue();
        }
        else {
            if(n) n.controls.get('labelIn').setValue( inItems );


            if(node.data.funcControl.valid) {
                let func = node.data.funcControl.func
                let valid = [], invalid = []
                for(let item of inItems) {
                    if(func(item)) valid.push(item)
                    else invalid.push(item)
                }
                outputs['valid'] = valid
                outputs['invalid'] = invalid
                if(n) n.controls.get('labelValid').setValue( valid );
                if(n) n.controls.get('labelInvalid').setValue( invalid );
            }
            else if(n){
                if(n) n.controls.get('labelValid').setValue();
                if(n) n.controls.get('labelInvalid').setValue();
            }
        }

    }

}
