<template>
  <v-app-bar :dark="isDarkMode" app bottom>
    <MsgInput :current-chat-room-id="currentChatRoomId" @scrollMsgAreaToEnd="scrollMsgAreaToEnd" @sendNewMsg="sendNewMsg" />
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
    private currentChatRoomId!: string

    @Emit('scrollMsgAreaToEnd')
    private scrollMsgAreaToEnd () {
    }

    @Emit('sendNewMsg')
    private sendNewMsg (newMsg: MessageType) {
      return newMsg
    }
}
</script>
