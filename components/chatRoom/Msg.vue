<template>
  <div :class="{'msg--sent-by-self':sendBySelf}" class="msg pr-2 mb-1">
    <Avatar v-if="!sendBySelf" :avatar-url="avatarUrl" />
    <MsgBox :sent-by-self="sendBySelf" :text-content="textContent" />
    <MsgStatus :sent-by-self="sendBySelf" :read-able="readAble" :sent-time="sentTime" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MsgBox from './msg/MsgBox.vue'
import Avatar from '~/components/chatRoom/msg/Avatar.vue'
import MsgStatus from '~/components/chatRoom/msg/MsgStatus.vue'

@Component({
  components: {
    MsgBox,
    Avatar,
    MsgStatus
  }
})
export default class Msg extends Vue {
  @Prop({ required: true })
  private textContent!:string;

  @Prop({ required: true })
  private sendBySelf!:boolean

  @Prop({ required: true })
  private sentTime!: string;

  @Prop({ required: true })
  private readAble!: boolean;

  @Prop({ required: false })
  private avatarUrl!:string
}
</script>
