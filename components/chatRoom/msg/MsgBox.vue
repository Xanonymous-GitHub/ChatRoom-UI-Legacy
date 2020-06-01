<template>
  <div
    class="msg-box mt-5"
    :class="{'msg-box--from-other':!sentBySelf}"
  >
    <v-card-text class="py-2">
      {{ context.toString().trim() }}
    </v-card-text>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class MsgBox extends Vue {
  @Prop({ required: true })
  private context!:string;

  @Prop({ required: true })
  private sentBySelf!:boolean;
}
</script>
