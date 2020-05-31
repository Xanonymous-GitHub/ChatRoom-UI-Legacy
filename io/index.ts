import http from 'http'
import socketIO from 'socket.io'

export default function (this: any) {
  this.nuxt.hook('render:before', (_renderer: any) => {
    const server = http.createServer(this.nuxt.renderer.app)
    const io = socketIO(server)
    this.nuxt.server.listen = (port: any, host: any) => new Promise(resolve => server.listen(port || 3000, host || 'localhost', resolve))
    this.nuxt.hook('close', () => new Promise(server.close))
    const messages : Array<{
      date:string,
      text:string
    }> = []
    io.on('connection', (socket) => {
      socket.on('last-messages', () => {
      })
      socket.on('send-message', (message) => {
        messages.push(message)
        socket.broadcast.emit('new-message', message)
      })
    })
  })
}
