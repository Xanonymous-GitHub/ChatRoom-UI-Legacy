<template>
  <div
    :class="{ 'msg-area--dark-background': isDarkMode }"
    class="msg-area msg-area--full-height"
  >
    <Msg
      v-for="(message, index) in messages"
      :key="index"
      :is-dark-mode="isDarkMode"
      :msg-setup="{...message}"
      :owner="msgOwner(message.author)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Msg from '~/components/chatRoom/Msg.vue'
import { appStore } from '~/utils/store-accessor'
import { AdminType, UserType } from '~/store/types/appTypes'

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

    private msgOwner (msgAuthor: string): (AdminType | UserType) {
      const currentUser = appStore.getCurrentUser
      if (msgAuthor === currentUser._id) {
        return currentUser
      }
      return appStore.getOtherUsers.find(user => user._id === msgAuthor)!
    }
}
</script>
