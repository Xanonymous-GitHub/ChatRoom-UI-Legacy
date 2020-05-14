<template>
  <v-app id="chat-room" class="flex-column">
    <MsgArea ref="msgArea" :is-dark-mode="isDarkMode" />
    <BottomController
      ref="bottomController"
      :is-dark-mode="isDarkMode"
      class="pa-3 bottom fixed"
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
  };
}

@Component({
  components: {
    BottomController,
    MsgArea
  }
})
export default class ChatRoom extends Vue {
    private changedMsgAreaHeight!: number;
    get isDarkMode () {
      return appStore.isDarkMode
    }

    public mounted () {
      this.setMsgAreaHeight(this.calculateMsgAreaHeight(), 'px')
      window.addEventListener('resize', () => {
        this.setMsgAreaHeight(100, '%')
        setTimeout(() => this.setMsgAreaHeight(this.calculateMsgAreaHeight(), 'px'), 1)
      })
    }

    private calculateMsgAreaHeight () {
      const [msgArea, bottomController]: Array<RefElement> = [
        this.$refs.msgArea as RefElement,
        this.$refs.bottomController as RefElement
      ]
      return (
        (msgArea.$el?.clientHeight as number) -
        (bottomController.$el?.clientHeight as number) + 1
      )
    }

    private setMsgAreaHeight (height:number, unit:string) {
      const msgArea = this.$refs.msgArea as RefElement
      // eslint-disable-next-line no-unused-expressions
      msgArea.$el?.setAttribute(
        'style',
        `height:${height}${unit}`
      )
    }
}
</script>
