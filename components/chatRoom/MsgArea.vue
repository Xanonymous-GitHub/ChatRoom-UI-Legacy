<template>
  <div
    :class="{ 'msg-area--dark-background': isDarkMode }"
    class="msg-area msg-area--full-height"
  >
    <Msg
      v-for="({sendBySelf,read,sentTime,textContent,avatarUrl}, index) in messages"
      :key="index"
      :read-able="read"
      :send-by-self="sendBySelf"
      :sent-time="sentTime"
      :text-content="textContent"
      :avatar-url="avatarUrl"
      :is-dark-mode="isDarkMode"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
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

    get messages () {
      return appStore.getMessage
    }
}
</script>
