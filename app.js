import { fileURLToPath } from 'url'
import { dirname, join } from 'path'
import AutoLoad from 'fastify-autoload'
import Cors from 'fastify-cors'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default async function (fastify, opts) {
  fastify.register(Cors, {
    origin: true
  })

  fastify.register(AutoLoad, {
    dir: join(__dirname, 'routes'),
    dirNameRoutePrefix: false,
    options: Object.assign({}, opts)
  })
}