import CardComponent from "./CardComponent"
import definitions from "./definitions"
import { validate } from '../../../_app'



const Components: any = {}

for (const componentName in definitions) {
	const def: any = definitions[componentName]

	if (!validate['node-definition-schema'](def)) {

		console.log(`node-definition-schema`, def)
		console.log(validate['node-definition-schema'].errors)
		const error = {
			error: `invalid node-definition-schema schema`,
			item: def,
			errors: validate['app-config'].errors,
		}
		
		throw new Error(error.error)
	}

	Components[componentName] = new CardComponent(componentName, def )
}


const register = (editor: any, engine: any) => {
	for (const componentName in Components) {
		editor.register(Components[componentName])
		engine.register(Components[componentName])
	}
}


const CreateNode = async (name: string, data: any, config: any ) => {

	const compDef = Components[name]
	if (!compDef) {
		throw new Error(`not found component with name:${name}`)
	}

	const newNode = await compDef.createNode(data, config)

	return newNode

}

export { Components, CreateNode, register }