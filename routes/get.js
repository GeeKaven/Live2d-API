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
		reply.send({
			message: req.query
		})
	}
}
