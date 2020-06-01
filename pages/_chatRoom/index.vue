<template>
  <v-app class="chat-room flex-column">
    <MsgArea ref="msgArea" :is-dark-mode="isDarkMode" />
    <BottomController
      ref="bottomController"
      :is-dark-mode="isDarkMode"
      class="pa-3 chat-room--bottom chat-room--fixed"
      @scrollMsgAreaToEnd="scrollMsgAreaToEnd"
      @sendNewMsg="sendNewMsg"
    />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BottomController from '@/components/chatRoom/BottomController.vue'
import MsgArea from '@/components/chatRoom/MsgArea.vue'
import { appStore } from '@/store'
import io from '~/plugins/socket.io'
import { MessageType } from '@/store/types/appTypes'

interface RefElement extends Element {
  $el?: {
    clientHeight: number;
    setAttribute: Function;
    scrollHeight: number;
  };
}

@Component({
  components: {
    BottomController,
    MsgArea
  }
})
export default class ChatRoom extends Vue {
  private socket = io(process.env.WS_URL!, {
    // path: '/456',
    autoConnect: false,
    reconnectionAttempts: 20
  })

  get isDarkMode () {
    return appStore.isDarkMode
  }

  public asyncData () {
    // io.on('connection', (socket) => {
    // })
  }

  public async beforeMount () {
    // register the new msg event.
    await this.socket.open()
    this.socket.on('new-message', (message:MessageType) => {
      appStore.createMsg(message)
    })
  }

  public mounted () {
    this.setMsgAreaPadding()
  }

  public validate ({ params }: { params: any }) {
    // find if there is a chatroom that id is equal to the params.
    return params.chatRoom === '123'
  }

  private sendNewMsg (newMsg:MessageType) {
    this.socket.emit('send-message', newMsg)
  }

  private setMsgAreaPadding () {
    const [msgArea, bottomController]: Array<RefElement> = [
      this.$refs.msgArea as RefElement,
      this.$refs.bottomController as RefElement
    ]
    // eslint-disable-next-line no-unused-expressions
    msgArea.$el?.setAttribute(
      'style',
      `padding-bottom:${bottomController.$el?.clientHeight! + 10}px`
    )
  }

  private scrollMsgAreaToEnd () {
    if ('$el' in this.$refs.msgArea) {
      const msgArea = this.$refs.msgArea.$el as HTMLElement
      setTimeout(() => {
        msgArea.scrollIntoView(false)
      }, 100)
    }
  }
}
</script>
