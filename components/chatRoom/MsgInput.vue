<template>
  <v-text-field
    v-model="textContent"
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
      <v-btn class="up-half" fab icon small @click.prevent="sendMessage">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </template>
    <template #prepend>
      <v-btn class="up-half" fab icon small>
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </template>
  </v-text-field>
</template>

<script lang="ts">
import { Component, Provide, Vue, Emit } from 'nuxt-property-decorator'
import { appStore } from '~/utils/store-accessor'
import time from '~/utils/getTime'
@Component
export default class MsgInput extends Vue {
  @Provide()
  private textContent=''

  @Emit('scrollMsgAreaToEnd')
  private sendMessage () {
    const textContext = this.textContent.trim()
    if (textContext) {
      appStore.createMsg({
        id: '_',
        sendBySelf: true,
        read: false,
        sentTime: time,
        textContent: textContext
      })
    }
    this.textContent = ''
  }
}
</script>
