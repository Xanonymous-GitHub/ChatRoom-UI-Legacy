<template>
  <v-app class="chat-room flex-column">
    <MsgArea ref="msgArea" :is-dark-mode="isDarkMode" />
    <BottomController
      ref="bottomController"
      :is-dark-mode="isDarkMode"
      class="pa-3 chat-room--bottom chat-room--fixed"
      @scrollMsgAreaToEnd="scrollMsgAreaToEnd"
    />
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import BottomController from '@/components/chatRoom/BottomController.vue'
import MsgArea from '@/components/chatRoom/MsgArea.vue'
import { appStore } from '@/store'

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
  get isDarkMode () {
    return appStore.isDarkMode
  }

  public mounted () {
    this.setMsgAreaPadding()
  }

  public validate ({ params }:{params:any}) {
    // find if there is a chatroom that id is equal to the params.
    return params.chatRoom === '3'
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
