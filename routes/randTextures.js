import { getModelList, modelIdToName, getModelTexturesList } from '../tools/utils.js'

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

  fastify.get('/rand_textures', routeOpts, handler)

  async function handler(req, reply) {
    const { id } = req.query;
		let modelId = id.split('-')[0];
		let modelTexturesId =  id.split('-')[1] ? id.split('-')[1] : 0;

    const modelList = await getModelList()
    let modelName = modelIdToName(modelList, modelId);

    const modelTexturesList = Array.isArray(modelName) ? modelName : await getModelTexturesList(modelName)

    let modelTexturesNewId = 1
    if (modelTexturesList.length > 1) {
      let modelTexturesGenNewId = true;
      if (modelTexturesId == 0) modelTexturesId = 1;
      while (modelTexturesGenNewId) {
        modelTexturesNewId = Math.floor(Math.random() * modelTexturesList.length) + 1
        modelTexturesGenNewId = modelTexturesNewId == modelTexturesId ? true : false;
      }
    }

    reply.send(
      {
        textures : {
          id : modelTexturesNewId,
          name: modelTexturesList[modelTexturesNewId - 1],
          model: Array.isArray(modelName) ? modelName[modelTexturesNewId - 1] : modelName
        }
      })
  }

}