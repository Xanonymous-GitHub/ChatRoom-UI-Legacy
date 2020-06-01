<template>
  <v-text-field
    v-model="textContent"
    class="msg-input"
    dense
    filled
    placeholder="Put Some Messages"
    rounded
    @keyup.enter="sendMessage"
  >
    <template #prepend-inner>
      <v-icon>mdi-message-reply-text</v-icon>
    </template>
    <template #append-outer>
      <v-btn class="msg-input--up-half" fab icon small @click.prevent="sendMessage">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </template>
    <template #prepend>
      <v-btn class="msg-input--up-half" fab icon small>
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </template>
  </v-text-field>
</template>

<script lang="ts">
import { Component, Provide, Vue, Emit } from 'nuxt-property-decorator'
import { appStore } from '~/utils/store-accessor'
import time from '~/utils/getTime'
import { MessageType } from '@/store/types/appTypes'

@Component
export default class MsgInput extends Vue {
    @Provide()
    private textContent = ''

    @Emit('scrollMsgAreaToEnd')
    @Emit('sendNewMsg')
    private sendMessage () {
      const textContext = this.textContent.trim()
      this.textContent = ''
      let newMsg:MessageType
      if (textContext) {
        newMsg = {
          id: '_',
          sendBySelf: false,
          read: false, // debug
          author: '',
          sentTime: time(),
          avatarUrl: 'https://avatars1.githubusercontent.com/u/47718989?s=460&u=841507c2a6352d4d4b4febd652cb175df3c0ac04&v=4',
          textContent: textContext
        }
        appStore.createMsg(newMsg)
        return newMsg
      }
    }
}
</script>
