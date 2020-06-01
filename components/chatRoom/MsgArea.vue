<template>
  <div
    :class="{ 'msg-area--dark-background': isDarkMode }"
    class="msg-area msg-area--full-height"
  >
    <Msg
      v-for="(message, index) in messages"
      :key="index"
      :msg-setup="{...message}"
      :owner="msgOwner(message.author)"
      :is-dark-mode="isDarkMode"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Msg from '~/components/chatRoom/Msg.vue'
import { appStore } from '~/utils/store-accessor'
import { UserType } from '~/store/types/appTypes'

  @Component({
    components: {
      Msg
    }
  })
export default class MsgArea extends Vue {
    @Prop({ required: false })
    private isDarkMode!: boolean;

    @Prop({ required: true })
    private currentChatRoomId!: string

    get messages () {
      return appStore.getMessage[`${this.currentChatRoomId}`]
    }

    private msgOwner (msgAuthorId: string):UserType {
      const currentUser = appStore.getCurrentUser
      if (msgAuthorId === currentUser._id) {
        return currentUser
      }
      return appStore.getOtherUsers.find(user => user._id === msgAuthorId)!
    }
}
</script>
