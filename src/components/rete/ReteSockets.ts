import Rete from "rete";

export default {
    json: new Rete.Socket('Json'),
     num: new Rete.Socket('Number value'),
    text: new Rete.Socket('Text value')
}