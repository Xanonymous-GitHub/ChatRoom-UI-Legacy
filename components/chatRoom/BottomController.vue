<template>
  <v-app-bar :dark="isDarkMode" app bottom>
    <MsgInput
      :current-chat-room-identify="currentChatRoomIdentify"
      @scrollMsgAreaToEnd="scrollMsgAreaToEnd"
      @sendNewMsg="sendNewMsg"
    />
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import MsgInput from '~/components/chatRoom/MsgInput.vue'
import { MessageType } from '@/store/types/appTypes'

  @Component({
    components: {
      MsgInput
    }
  })
export default class BottomController extends Vue {
    @Prop({ required: false })
    private isDarkMode!: boolean;

    @Prop({ required: true })
    private currentChatRoomIdentify!: string

    @Emit('scrollMsgAreaToEnd')
    private scrollMsgAreaToEnd () {
    }

    @Emit('sendNewMsg')
    private sendNewMsg (newMsg: MessageType) {
      return newMsg
    }
}
</script>
