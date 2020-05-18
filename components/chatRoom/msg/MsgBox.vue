<template>
  <v-card
    id="msg-box"
    class="mt-5"
    :class="{from_other_color:!sentBySelf}"
    hover
    dark
    round
  >
    <v-card-text class="py-2">
      {{ textContent.toString().trim() }}
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class MsgBox extends Vue {
  @Prop({ required: true })
  private textContent!:string;

  @Prop({ required: true })
  private sentBySelf!:boolean;
}
</script>
