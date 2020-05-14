<template>
  <MsgBox :is-dark-mode="isDarkMode" :text-content="textContent" :send-by-self="sendBySelf" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'
import MsgBox from './msg/MsgBox.vue'

@Component({
  components: {
    MsgBox
  }
})
export default class Msg extends Vue {
  @Prop({ required: false })
  private isDarkMode!: boolean;

  @Prop({ required: true })
  private textContent!:string;

  @Prop({ required: true })
  private sendBySelf!:boolean
}
</script>
