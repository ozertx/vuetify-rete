import * as Control from './controls'
import Socket from './sockets'
import Rete from "rete";
import node from '../components/CustomNode.vue'

export class RequestIsobrComponent extends Rete.Component {
    constructor() {
        super('RequestIsobr');
        this.data = { render: 'vue', component: node }
    }

    builder(node) {

        node.addOutput( new Rete.Output('out1', 'json', Socket.json) )
        let dataStore = new Control.DataStoreControl(this.editor, 'items', {})
        node.addControl(dataStore)
        node.addControl(new Control.RequestControl(this.editor, 'jsonData', {
            dataStore
        }))
        return node
    }

    worker(node, inputs, outputs) {
        // console.log("RequestIsobrComponent",inputs, outputs)
        console.log("RequestIsobrComponent worker", node.data)
        outputs['out1'] = node.data.items
    }
}

