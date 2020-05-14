<template>
  <v-card
    id="msg-box"
    class="my-5 mx-3"
    :class="{sent_by_self:sendBySelf}"
    :dark="isDarkMode"
    hover
    round
  >
    <v-card-text>
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
  private sendBySelf!:boolean
}
</script>
