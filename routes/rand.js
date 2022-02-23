import { getModelList } from '../tools/utils.js'

export default async function get(fastify, opts) {

  const routeOpts = {
    schema: {
      query: {
        type: 'object',
        properties: {
          id: { type: 'integer' },
        }
      }
    }
  }

  fastify.get('/rand/', routeOpts, handler)

  async function handler(req, reply) {
    const { id } = req.query;
    const modelList = await getModelList()
    let modelRandNewId = true
    let modelRandId = id
    while (modelRandNewId) {
      modelRandId = Math.floor(Math.random() * modelList['models'].length) + 1
      modelRandNewId = modelRandId === id ? true : false
    }

    reply.send(
      {
        model: {
          id: modelRandId,
          name: modelList['models'][modelRandId - 1],
          message: modelList['messages'][modelRandId - 1]
        }
      })
  }

}