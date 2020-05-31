import http from 'http'
// @ts-ignore
import { Nuxt, Builder } from 'nuxt'
import express from 'express'

const port = process.env.PORT || 3000
const isProd = process.env.NODE_ENV === 'production'
const app = express()
const server = http.createServer(app)
const config = require('./nuxt.config.js')
config.dev = !isProd

async function start () {
  const nuxt = new Nuxt(config)
  await nuxt.ready()
  if (config.dev) {
    const builder = new Builder(nuxt)
    builder.build()
  }
  app.use(nuxt.render)
  server.listen(port, function () {
    console.log('Express server listening on port ' + port)
  })
}

start()
