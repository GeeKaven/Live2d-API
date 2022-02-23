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

  fastify.get('/switch', routeOpts, handler)

  async function handler(req, reply) {
    const { id } = req.query;
    const modelList = await getModelList()
    const modelSwitchId = id + 1 > modelList['models'].length ? 1 : id + 1

    reply.send(
      {
        id: modelSwitchId,
        name: modelList['models'][modelSwitchId - 1],
        message: modelList['messages'][modelSwitchId - 1]
      })
  }

}