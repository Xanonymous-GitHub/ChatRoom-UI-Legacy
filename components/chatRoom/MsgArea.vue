<template>
  <div
    :class="{ 'msg-area--dark-background': isDarkMode }"
    class="msg-area msg-area--full-height"
  >
    <Msg
      v-for="(message, index) of messages"
      :key="index"
      :is-dark-mode="isDarkMode"
      :msg-setup="{...message}"
      :owner="msgOwner(message.author)"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, ProvideReactive } from 'nuxt-property-decorator'
import Msg from '~/components/chatRoom/Msg.vue'
import { appStore } from '~/utils/store-accessor'

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

    public mounted () {
      this.$forceUpdate()
    }

    @ProvideReactive()
    private messages () {
      return appStore.getMessage
    }

    private msgOwner (msgAuthor: string) {
      const currentUser = appStore.getCurrentUser
      if (msgAuthor === currentUser._id) {
        return currentUser
      }
      return appStore.getOtherUsers.find(user => user._id === msgAuthor)!
    }
}
</script>
