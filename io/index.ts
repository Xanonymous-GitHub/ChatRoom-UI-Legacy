// this is just a test server for webSocket.
import http from 'http'

export default function (this: any) {
  // inject the original nuxt server
  this.nuxt.hook('render:before', (_renderer: any) => {
    const server = http.createServer(this.nuxt.renderer.app)
    this.nuxt.server.listen = (port: any, host: any) => new Promise(resolve => server.listen(port || 8787, host || 'localhost', resolve))
    this.nuxt.hook('close', () => new Promise(server.close))
  })
}
