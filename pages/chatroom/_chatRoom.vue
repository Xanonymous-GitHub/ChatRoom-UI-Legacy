<template>
  <v-app class="chat-room flex-column">
    <MsgArea ref="msgArea" :current-chat-room-id="currentChatRoomId" :is-dark-mode="isDarkMode" />
    <BottomController
      ref="bottomController"
      :current-chat-room-id="currentChatRoomId"
      :is-dark-mode="isDarkMode"
      class="chat-room--bottom"
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
import adminDataFetcher from '~/utils/adminDataFetcher'

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
    private socket!: typeof io

    get isDarkMode () {
      return appStore.isDarkMode
    }

    get currentChatRoomId () {
      return appStore.getCurrentChatRoomId
    }

    private static getWebSocketExtraHeaders () {
      const extraHeaders: { userID?: string, authorization?: string } = {}
      const jwtKey = appStore.getJwtKey
      if (jwtKey) {
        extraHeaders.authorization = 'bearer ' + jwtKey
      } else {
        extraHeaders.userID = appStore.getCurrentUser._id
      }
      return extraHeaders
    }

    private static webSocketException (e: any) {
      alert(e.message)
    }

    // step 2
    public async beforeMount () {
      // set the current chatroom identify
      appStore.SET_CHATROOM_ID(this.$route.params.chatRoom)
      // validate the chatroom is exist or not.
      const chatRoom = (await API.getSpecifyChatRoomData(this.$route.params.chatRoom)) as any
      if (('error' in chatRoom) || (chatRoom!._id !== this.$route.params.chatRoom)) {
        alert('LOADING ERROR! this chatroom is not exist!')
        await this.$router.push('/')
      }
    }

    // step 3
    public async mounted () {
      // modify the chatroom size to adapt the screen
      this.setMsgAreaPadding()
      // check if login
      if (!await adminDataFetcher()) {
        alert('please login!')
        await this.$router.push('/')
      } else {
        // register the new msg event.
        await this.initializeWebSocket() // TODO add reconnection methods after connection failed
      }
    }

    private async initializeWebSocket (): Promise<void> {
      this.socket = io(process.env.WS_URL!, {
        transportOptions: {
          polling: {
            extraHeaders: ChatRoom.getWebSocketExtraHeaders()
          }
        },
        extraHeaders: ChatRoom.getWebSocketExtraHeaders(),
        autoConnect: false,
        reconnectionAttempts: 20
      })
      this.socket.on('successfullyJoinedChatRoomOfMrCodingPlatformInNationalTaipeiUniversityOfTechnologyProgrammingClub', this.chatroomJoined)
      this.socket.on('message', ChatRoom.receiveNewMsg)
      this.socket.on('exception', ChatRoom.webSocketException)
      await this.socket.open() // connect to the server
      this.socket.emit('join', this.currentChatRoomId)
    }

    private chatroomJoined () {
    }

    private static async receiveNewMsg (newMsg: MessageType) {
      await appStore.createMsg({ newMsg })
    }

    private sendNewMsg (newMsg: string) {
      if (newMsg) {
        this.socket.emit('message', newMsg.trim())
      }
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
