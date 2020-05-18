<template>
  <div
    id="MsgArea"
    :class="{ darkBackground: isDarkMode }"
    class="full-height"
  >
    <Msg
      :is-dark-mode="isDarkMode"
      :send-by-self="false"
      :text-content="'Build your next Vue.js application with confidence using NuxtJS. An open source framework making web development simple and powerful.'"
      :read-able="true"
      :sent-time="'13:43am'"
    />

    <Msg
      :is-dark-mode="isDarkMode"
      :send-by-self="true"
      :text-content="'Versatile by nature, it supports different targets (server, serverless or static) and server side rendering is switchable.'"
      :read-able="true"
      :sent-time="'13:45am'"
    />

    <Msg
      :is-dark-mode="isDarkMode"
      :send-by-self="false"
      :text-content="'Sounds great~~XD!'"
      :read-able="true"
      :sent-time="'13:49am'"
    />

    <Msg
      :is-dark-mode="isDarkMode"
      :send-by-self="true"
      :text-content="'You can say that again!'"
      :read-able="true"
      :sent-time="'13:59am'"
    />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Msg from '~/components/chatRoom/Msg.vue'

@Component({
  components: {
    Msg
  }
})
export default class MsgArea extends Vue {
    @Prop({ required: false })
    private isDarkMode!: boolean;
}
</script>
