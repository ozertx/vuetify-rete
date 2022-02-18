import Ajv from 'ajv'
import yaml from 'ajv'
import axios from 'axios'
import moment from 'moment'

import appConfig from './app-config'

const SCHEMAS: { [keyof: string]: any } = {
	"app-config": {
		"type": "object",
		"required": ["kind", "version", "name", "title", "routes", "units"],
		"properties": {
			"kind": { "type": "string" },
      "version": { "type": "string" },
      "title": { "type": "string" },
      "name": { "type": "string" },
			"routes": {
				"type": "object"
			},
      "units": {
        "type": "object",
        "additionalProperties": { "$ref": "#/definitions/ui-unit"}
      }
		},
		"additionalProperties": false,
    "definitions": {
      "ui-unit": {
        "type": "object",
        "properties": {
          "name": { "type": "string" },
        }
      }
    }
	}
}

const ajv = new Ajv({ allErrors: true })
const validate = Object.keys(SCHEMAS).reduce( (acc: any, key) => { acc[key] = ajv.compile(SCHEMAS[key]); return acc } , {} )

const APP: any = {}
const appState: any = {
  "status": "active",
  "error": null
}

const appUnits: any = {
  "service": {

  }
}

const loadApp = async () => {

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

export {
  yaml, ajv, validate, axios, moment, loadApp, APP, appState, appUnits
}




