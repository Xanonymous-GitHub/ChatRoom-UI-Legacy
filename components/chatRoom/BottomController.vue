<template>
  <v-app-bar :dark="isDarkMode" app bottom>
    <MsgInput @scrollMsgAreaToEnd="scrollMsgAreaToEnd" @sendNewMsg="sendNewMsg" />
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

    @Emit('scrollMsgAreaToEnd')
    private scrollMsgAreaToEnd () {}

    @Emit('sendNewMsg')
    private sendNewMsg (newMsg:MessageType) {
      return newMsg
    }
}
</script>
