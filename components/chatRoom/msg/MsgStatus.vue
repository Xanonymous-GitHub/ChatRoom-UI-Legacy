<template>
  <div class="msg-status">
    <p
      v-if="readAble && sentBySelf"
      class="msg-status__text px-0 py-0 mb-0 mx-2"
    >
      read
    </p>
    <p class="msg-status__text px-0 py-0 mb-0 mx-2">
      {{ sentTime }}
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class MsgStatus extends Vue {
  @Prop({ required: true })
  private sentTime!: string;

  @Prop({ required: true })
  private readAble!: boolean;

  @Prop({ required: true })
  private sentBySelf!: boolean;
}
</script>
