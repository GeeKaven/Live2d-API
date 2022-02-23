import { readFile } from 'fs/promises'
import { getModelList, modelIdToName, getModelTexturesName } from '../tools/utils.js'

export default async function get(fastify, opts) {

	const routeOpts = {
		schema: {
			query: {
				type: 'object',
				properties: {
					id: { type: 'string' },
				}
			}
		}
	}

	fastify.get('/get', routeOpts, handler)

	async function handler(req, reply) {
		const { id } = req.query;
		let modelId = id.split('-')[0];
		let modelTexturesId =  id.split('-')[1] ? id.split('-')[1] : 0;
		
		console.log(modelId, modelTexturesId);
		let json = {}
		const modelList = await getModelList();
		let modelName = modelIdToName(modelList, modelId);
		console.log(modelName);

		if (Array.isArray(modelName)) {
			modelName = modelTexturesId > 0 && modelTexturesId <= modelName.length ? modelName[modelTexturesId - 1] : modelName[0];
			json = JSON.parse(
				await readFile(
					new URL(`../model/${modelName}/index.json`, import.meta.url),
				)
			)
		} else {
			json = JSON.parse(
				await readFile(
					new URL(`../model/${modelName}/index.json`, import.meta.url),
				)
			)
			if (modelTexturesId > 0) {
				const modelTexturesName = await getModelTexturesName(modelName, modelTexturesId);
				if (modelTexturesName) {
					json['textures'] = Array.isArray(modelTexturesName) ? modelTexturesName : [modelTexturesName];
				}
			}
		}

		json['textures'] = json['textures'].map(texture => `../model/${modelName}/${texture}`)

		json['model'] = `../model/${modelName}/${json['model']}`

		if (json['pose']) {
			json['pose'] = `../model/${modelName}/${json['pose']}`
		}

		if (json['physics']) {
			json['physics'] = `../model/${modelName}/${json['physics']}`
		}

		if (json['motions']) {
			for (const k1 in json['motions']) {
				for (const k2 in json['motions'][k1]) {
					for (const k3 in json['motions'][k1][k2]) {
						if (k3 == 'file' || k3 == 'sound') {
							json['motions'][k1][k2][k3] = `../model/${modelName}/${json['motions'][k1][k2][k3]}`
						}
					}
				}
			}
		}

		if (json['expressions']) {
			for (const k1 in json['expressions']) {
				for (const k2 in json['expressions'][k1]) {
					if (k2 == 'file') {
						json['expressions'][k1][k2] = `../model/${modelName}/${json['expressions'][k1][k2]}`
					}
				}
			}
		}
		reply.send(json);
	}
}
