<template>
  <v-app class="chat-room flex-column">
    <MsgArea ref="msgArea" :current-chat-room-id="currentChatRoomId" :is-dark-mode="isDarkMode" />
    <BottomController
      ref="bottomController"
      :current-chat-room-identify="currentChatRoomId"
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
import API from '~/api/api'

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
      autoConnect: false,
      reconnectionAttempts: 20,
      transportOptions: {
        polling: {
          extraHeaders: this.getWebSocketExtraHeaders
        }
      }
    })

    get getWebSocketExtraHeaders () {
      const extraHeaders: { userID?: string, Authorization?: string } = {}
      const jwtKey = appStore.getJwtKey
      if (jwtKey) {
        extraHeaders.Authorization = jwtKey
      } else {
        extraHeaders.userID = appStore.getCurrentUser._id
      }
      return extraHeaders
    }

    get isDarkMode () {
      return appStore.isDarkMode
    }

    get currentChatRoomId () {
      return appStore.getCurrentChatRoomId
    }

    // EntryPoint, step 1
    public async validate ({ params }: { params: any }) {
      // find if there is a chatroom that id is equal to the params.
      const chatRoom = await API.getSpecifyChatRoomData(params.chatRoom)
      return ('error' in chatRoom) || (chatRoom._id === params.chatRoom) // TODO add custom error msg
    }

    // step 2
    public beforeMount () {
      // set the current chatroom identify
      appStore.SET_CHATROOM_ID(this.$route.params.chatRoom)
    }

    // step 3
    public async mounted () {
      // modify the chatroom size to adapt the screen
      this.setMsgAreaPadding()
      // register the new msg event.
      await this.initializeWebSocket() // TODO add reconnection methods after connection failed
    }

    private async initializeWebSocket (): Promise<void> {
      this.socket.on('successfullyJoinedChatRoomOfMrCodingPlatformInNationalTaipeiUniversityOfTechnologyProgrammingClub', this.chatroomJoined)
      this.socket.on('message', this.receiveNewMsg)
      await this.socket.open() // connect to the server
      this.socket.emit('join', this.currentChatRoomId)
    }

    private chatroomJoined () {
    }

    private receiveNewMsg (newMsg: MessageType) {
      appStore.createMsg({ newMsg, chatroomID: this.currentChatRoomId })
    }

    private sendNewMsg (newMsg: MessageType) {
      this.socket.emit('message', newMsg)
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
