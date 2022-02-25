const definitions: { [key:string]: any } = {

  "constant": {
    "kind": "CardComponent",
    "defaultParams": {
      "value": "0"
    },
    "inputs": {},
    "outputs": {
      "const": {
        "title": "const",
        "socket": "TMP",

        calc: (inputs: any, data: any, params: any) => {
          return params.value
        }
      }

    },
    "controls": {}
  },
  "multiply": {
    "kind": "CardComponent",
    "defaultParams": {
      "value": 0
    },
    "inputs": {
      "in1": {
        "title": "in1",
        "socket": "TMP"
      },
      "in2": {
        "title": "in2",
        "socket": "TMP"
      },
    },
    "outputs": {
      "result": {
        "title": "const",
        "socket": "TMP",

        calc: async (inputs: any, data: any, params: any) => {
          return inputs.in1 * inputs.in2
        }
      }

    },
    "controls": {
      "explainInputs":{
        "kind": "text",
        "defaultParams": {
          "value": "0"
        },
        "title": "explainInputs - title"
      }
    }
  },




}

export default definitions