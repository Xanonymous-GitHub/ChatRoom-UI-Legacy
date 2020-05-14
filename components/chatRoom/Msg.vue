<template>
  <div id="msg" :class="{sent_by_self:sendBySelf}">
    <Avatar />
    <MsgBox :is-dark-mode="isDarkMode" :text-content="textContent" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MsgBox from './msg/MsgBox.vue'
import Avatar from '~/components/chatRoom/msg/Avatar.vue'

@Component({
  components: {
    MsgBox,
    Avatar
  }
})
export default class Msg extends Vue {
  @Prop({ required: false })
  private isDarkMode!: boolean;

  @Prop({ required: true })
  private textContent!:string;

  @Prop({ required: true })
  private sendBySelf!:boolean
}
</script>
