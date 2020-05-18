<template>
  <div id="msg" :class="{sent_by_self:sendBySelf}" class="pr-2 mb-1">
    <Avatar v-if="!sendBySelf" />
    <MsgBox :sent-by-self="sendBySelf" :text-content="textContent"/>
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
  @Prop({ required: false })
  private isDarkMode!: boolean;

  @Prop({ required: true })
  private textContent!:string;

  @Prop({ required: true })
  private sendBySelf!:boolean

  @Prop({ required: true })
  private sentTime!: string;

  @Prop({ required: true })
  private readAble!: boolean;
}
</script>
