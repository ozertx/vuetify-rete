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
  }



}

export default definitions