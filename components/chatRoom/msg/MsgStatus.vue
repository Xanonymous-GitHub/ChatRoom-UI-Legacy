<template>
  <div class="msg-status">
    <p
      v-if="read && sentBySelf"
      class="msg-status__text px-0 py-0 mb-0 mx-2"
    >
      read
    </p>
    <p class="msg-status__text px-0 py-0 mb-0 mx-2">
      {{ getFormattedSentTime }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import formatter from '~/utils/timeFormater'

  @Component({})
export default class MsgStatus extends Vue {
    @Prop({ required: true })
    private sentTime!: number;

    @Prop({ required: true })
    private read!: boolean;

    @Prop({ required: true })
    private sentBySelf!: boolean;

    private get getFormattedSentTime () {
      return formatter(this.sentTime)
    }
}
</script>
