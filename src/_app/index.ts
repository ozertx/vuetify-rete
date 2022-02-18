import Ajv from 'ajv'
import yaml from 'ajv'
import axios from 'axios'
import moment from 'moment'

import appConfig from './app-config'

const SCHEMAS: { [keyof: string]: any } = {
	"app-config": {
		"type": "object",
		"required": ["kind", "version", "name", "title", "routes"],
		"properties": {
			"kind": { "type": "string" },
      "version": { "type": "string" },
      "title": { "type": "string" },
      "name": { "type": "string" },
			"routes": {
				"type": "object"
			}
		},
		"additionalProperties": false
	}
}

const ajv = new Ajv({ allErrors: true })
const validate = Object.keys(SCHEMAS).reduce( (acc: any, key) => { acc[key] = ajv.compile(SCHEMAS[key]); return acc } , {} )

const APP: any = {}
const appState: any = {
  "status": "active",
  "error": null
}

const loadApp = async () => {

  if(!validate['app-config'](appConfig)) {
    console.error(`app-config validation errors`,validate['app-config'].errors)
    throw new Error(`invalid App schema`)
  }

  APP.config = appConfig
  return APP
}

export {
  yaml, ajv, validate, axios, moment, loadApp, APP, appState
}




