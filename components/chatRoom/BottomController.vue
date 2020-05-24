<template>
  <v-app-bar :dark="isDarkMode" app bottom>
    <MsgInput @scrollMsgAreaToEnd="scrollMsgAreaToEnd" />
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'nuxt-property-decorator'
import MsgInput from '~/components/chatRoom/MsgInput.vue'

@Component({
  components: {
    MsgInput
  }
})
export default class BottomController extends Vue {
    @Prop({ required: false })
    private isDarkMode!: boolean;

    @Emit('scrollMsgAreaToEnd')
    private scrollMsgAreaToEnd () {}
}
</script>
