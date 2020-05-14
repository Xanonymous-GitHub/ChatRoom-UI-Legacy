<template>
  <div class="msg-box">
    <v-card-text v-if="readAble" class="msg-box-status px-0 py-0 mb-0 mx-2">
      read
    </v-card-text>
    <v-card-text class="msg-box-status px-0 py-0 mb-0 mx-2">
      {{ sentTime }}
    </v-card-text>
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
}
</script>
