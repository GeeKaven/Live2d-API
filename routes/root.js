export default async function root (fastify, opts) {
    fastify.get('/', async (request, reply) => {
        reply.send({
            message: 'Welcome to the API!'
        })
    })
}