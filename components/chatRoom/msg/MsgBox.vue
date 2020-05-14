<template>
  <v-card
    id="msg-box"
    class="mt-5"
    :class="{from_other_color:!sentBySelf}"
    :dark="isDarkMode"
    hover
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
  @Prop({ required: false })
  private isDarkMode!: boolean;

  @Prop({ required: true })
  private textContent!:string;

  @Prop({ required: true })
  private sentBySelf!:boolean;
}
</script>
