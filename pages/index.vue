<template>
  <div>
    <ul class="pages">
      <li class="chat page">
        <div class="chatArea">
          <ul ref="messages" class="messages">
            <li v-for="(message, index) in messages" :key="index" class="message">
              <i :title="message.date">
                {{ message.date.split('T')[1].slice(0, -2) }}
              </i>: {{ message.text }}
            </li>
          </ul>
        </div>
        <input v-model="message" class="inputMessage" type="text" placeholder="Type here..." @keyup.enter="sendMessage">
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import io from '~/plugins/socket.io'

@Component({})
export default class RootPage extends Vue {
  private messages:Array<{
    date:string,
    text:string
  }>=[]

  private message:string=''

  private socket = io(process.env.WS_URL!, {
    path: '/456',
    autoConnect: false,
    reconnectionAttempts: 20
  })

  public asyncData () {
    // this.socket.emit('last-messages')
  }

  public async beforeMount () {
    await this.socket.open()
    this.socket.on('new-message', (message:any) => {
      this.messages.push(message)
    })
  }

  private sendMessage () {
    if (!this.message.trim()) {
      return
    }
    const message = {
      date: new Date().toJSON(),
      text: this.message.trim()
    }
    this.messages.push(message)
    this.message = ''
    this.socket.emit('send-message', message)
  }
}
</script>

<style scoped>
* {
  box-sizing: border-box;
}
html {
  font-weight: 300;
  -webkit-font-smoothing: antialiased;
}
html, input {
  font-family:
    "HelveticaNeue-Light",
    "Helvetica Neue Light",
    "Helvetica Neue",
    Helvetica,
    Arial,
    "Lucida Grande",
    sans-serif;
}
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}
ul {
  list-style: none;
  word-wrap: break-word;
}
/* Pages */
.pages {
  height: 100%;
  margin: 0;
  padding: 0;
  width: 100%;
}
.page {
  height: 100%;
  position: absolute;
  width: 100%;
}
/* Font */
.messages {
  font-size: 150%;
}
.inputMessage {
  font-size: 100%;
}
.log {
  color: gray;
  font-size: 70%;
  margin: 5px;
  text-align: center;
}
/* Messages */
.chatArea {
  height: 100%;
  padding-bottom: 60px;
}
.messages {
  height: 100%;
  margin: 0;
  overflow-y: scroll;
  padding: 10px 20px 10px 20px;
}
/* Input */
.inputMessage {
  border: 10px solid #3B8070;
  bottom: 0;
  height: 60px;
  left: 0;
  outline: none;
  padding-left: 10px;
  position: absolute;
  right: 0;
  width: 100%;
}
</style>
