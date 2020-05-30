const { Nuxt, Builder } = require('nuxt')
const fastify = require('fastify')({
  http2: true,
  https: {
    allowHTTP1: true
  },
  logger: true
})

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = process.env.NODE_ENV !== 'production'
async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const {
    host = process.env.HOST || '127.0.0.1',
    port = process.env.PORT || 3000
  } = nuxt.options.server

  await nuxt.ready()
  // Build only in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  fastify.use(nuxt.render)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  fastify.listen(port, host, (err: any) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
}

start()
