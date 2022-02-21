import Ajv from 'ajv'
import yaml from 'yaml'
import axios from 'axios'
import moment from 'moment'

import appConfigSchema from './schemas/app-config-schema.json'
import reteBlocksSchema from './schemas/rete-blocks-schema.json'
import unitConfig from 'cyber-builder/cyber-builder/schemas/unit-config.json'
import buildConfig from 'cyber-builder/cyber-builder/schemas/build-config.json'

const SCHEMAS: { [keyof: string]: any } = {
  "app-config": appConfigSchema,
  "rete-blocks-schema": reteBlocksSchema,
  "unit-config": unitConfig,
  "build-config": buildConfig,
}

const ajv = new Ajv({ allErrors: true })

const validate = Object.keys(SCHEMAS).reduce( 
(acc: any, key) => {
  if (!ajv.validateSchema(SCHEMAS[key])) {
    console.error(ajv.errors)
    console.error(`schema ${key} definition ERR`, key)
    throw new Error(`schema ${key} definition ERR`)
  }
  
  try {
    acc[key] = ajv.compile(SCHEMAS[key])
    return acc 
  }
  catch(err) {
    console.error(`schema ${key} compile ERR`)
    throw err
  }
}, {} )

const APP: any = {}
const appState: any = {
  "status": "active",
  "error": null
}

  
  
import * as appConfig from './app-config.json'
import * as appUnits1 from './app-units.json'
const appUnits: any = appUnits1


let cyberBuilder
const loadApp = async () => {
  
  cyberBuilder =  require('cyber-builder')
  console.log(Object.keys(cyberBuilder))

  if(!validate['app-config'](appConfig)) {
    console.log(`app-config validation errors`,validate['app-config'].errors)
    appState.error = {
      error: `invalid App schema`,
      item: appConfig,
      errors: validate['app-config'].errors, 
    }
    return
  }
  
  APP.config = appConfig
  return APP
}
 

const saveTemplateAsFile = (filename: any, dataObjToWrite: any) => {
  const blob = new Blob([JSON.stringify(dataObjToWrite)], { type: "text/json" });
  const link = document.createElement("a");

  link.download = filename;
  link.href = window.URL.createObjectURL(blob);
  link.dataset.downloadurl = ["text/json", link.download, link.href].join(":");

  const evt = new MouseEvent("click", {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  link.dispatchEvent(evt);
  link.remove()
};

export {
  yaml, ajv, validate, axios, moment, loadApp, APP, appState, appUnits, cyberBuilder, saveTemplateAsFile
}




