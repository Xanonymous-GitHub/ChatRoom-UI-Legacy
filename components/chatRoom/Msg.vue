<template>
  <div :class="{'msg--sent-by-self':sendBySelf}" class="msg pr-2 mb-1">
    <Avatar v-if="!sendBySelf" :avatar="owner.avatar" :is-dark-mode="isDarkMode" />
    <MsgBox :context="msgSetup.context" :sent-by-self="sendBySelf" />
    <MsgStatus :read="msgSetup.read" :sent-by-self="sendBySelf" :sent-time="msgSetup.updateAt" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MsgBox from './msg/MsgBox.vue'
import Avatar from '~/components/chatRoom/msg/Avatar.vue'
import MsgStatus from '~/components/chatRoom/msg/MsgStatus.vue'
import { appStore } from '~/utils/store-accessor'
import { MessageType, UserType } from '~/store/types/appTypes'

  @Component({
    components: {
      MsgBox,
      Avatar,
      MsgStatus
    }
  })
export default class Msg extends Vue {
    private sendBySelf: boolean = false

    @Prop({ required: true })
    private msgSetup!:MessageType

    @Prop({ required: true })
    private owner!:UserType

    @Prop({ required: false })
    private isDarkMode!:boolean

    private mounted () {
      this.sendBySelf = this.msgSetup.author === Msg.getCurrentUserId
    }

    private static get getCurrentUserId () {
      return appStore.getCurrentUser._id
    }
}
</script>
