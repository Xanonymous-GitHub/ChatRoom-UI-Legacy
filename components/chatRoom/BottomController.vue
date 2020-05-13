<template>
  <v-app-bar :dark="isDarkMode" app bottom>
    <MsgInput id="msg-input" />
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import MsgInput from '~/components/chatRoom/MsgInput.vue'

@Component({
  components: {
    MsgInput
  }
})
export default class BottomController extends Vue {
    @Prop({ required: false })
    private isDarkMode!: boolean;
}
</script>
