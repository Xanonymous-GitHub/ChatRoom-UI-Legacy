<template>
  <div :class="{'msg--sent-by-self':sendBySelf}" class="msg pr-2 mb-1">
    <Avatar v-if="!sendBySelf" :avatar-url="avatarBase64Path" :is-dark-mode="isDarkMode" />
    <MsgBox :sent-by-self="sendBySelf" :context="context" />
    <MsgStatus :read-able="readAble" :sent-by-self="sendBySelf" :sent-time="sentTime" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MsgBox from './msg/MsgBox.vue'
import Avatar from '~/components/chatRoom/msg/Avatar.vue'
import MsgStatus from '~/components/chatRoom/msg/MsgStatus.vue'
import { appStore } from '~/utils/store-accessor'
import { UserAvatar } from '~/store/types/appTypes'
import getBase64ImgPath from '~/utils/requestAvatar'

  @Component({
    components: {
      MsgBox,
      Avatar,
      MsgStatus
    }
  })
export default class Msg extends Vue {
    @Prop({ required: true })
    private context!: string;

    @Prop({ required: true })
    private sendBySelf!: boolean

    @Prop({ required: true })
    private sentTime!: string;

    @Prop({ required: true })
    private readAble!: boolean;

    @Prop({ required: false })
    private avatarUrl!: string

    @Prop({ required: false })
    private isDarkMode!: boolean;

    private avatarBase64Path: string = '';

    private mounted () {
      const avatar = appStore.getAvatars.find((current: UserAvatar) => {
        return current.realUrl === this.avatarUrl
      })
      if (!avatar) {
        this.requestBase64Avatar(this.avatarUrl)
      } else {
        this.setAvatarUrl(avatar.path)
      }
    }

    private setAvatarUrl (url: string) {
      this.avatarBase64Path = url
    }

    private async requestBase64Avatar (avatarUrl: string) {
      const path = await getBase64ImgPath(avatarUrl)
      if (path) {
        const newAvatar: UserAvatar = {
          path,
          realUrl: this.avatarUrl
        }
        appStore.PUSH_AVATAR(newAvatar)
        this.setAvatarUrl(path)
      }
    }
}
</script>
