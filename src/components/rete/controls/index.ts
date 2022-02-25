import { CardControl } from "./CardControl"
import { ControlDefinitions }from './ControlDefinitions'
import * as Control from '../controls'
import Socket from '../ReteSockets'
import Rete from "rete";
import { validate } from '../../../_app'


const nameIt = (name: string, cls: any) => ({ [name]: class extends cls { } })[name];



const Controls: any = {}

for (const controlName in ControlDefinitions) {
  const def: any = ControlDefinitions[controlName]

  if (!validate['control-definition-schema'](def)) {

    console.log(`control-definition-schema`, def)
    console.log(validate['control-definition-schema'].errors)
    const error = {
      error: `invalid control-definition-schema schema`,
      item: def,
      errors: validate['app-config'].errors,
    }

    throw new Error(error.error)
  }
  
  Controls[controlName] = nameIt(controlName, CardControl);
}


export { Controls }