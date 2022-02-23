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

  fastify.get('/switch_textures/', routeOpts, handler)

  async function handler(req, reply) {
    const { id } = req.query;
    let modelId = parseInt(id.split('-')[0])
    let modelTexturesId = parseInt(id.split('-')[1] ? id.split('-')[1] : 0);
    console.log(modelTexturesId)

    const modelList = await getModelList()
    let modelName = modelIdToName(modelList, modelId)

    const modelTexturesList = Array.isArray(modelName) ? modelName : await getModelTexturesList(modelName)
    let modelTexturesNewId = modelTexturesId == 0 ? 2 : modelTexturesId + 1
    console.log(modelTexturesNewId)
    if (modelTexturesNewId > modelTexturesList.length) {
      modelTexturesNewId = 1
    }

    reply.send(
      {
        textures: {
          id: modelTexturesNewId,
          name: modelTexturesList[modelTexturesNewId - 1],
          model: Array.isArray(modelName) ? modelName[modelTexturesNewId - 1] : modelName
        }
      })
  }

}