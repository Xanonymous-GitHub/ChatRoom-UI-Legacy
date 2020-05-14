<template>
  <div
    id="MsgArea"
    :class="{ darkBackground: isDarkMode }"
    class="full-height"
  >
    <Msg :is-dark-mode="isDarkMode" :send-by-self="true" :text-content="'123123sdasdasdassfsdfsdfsdfsdsgpodkgposdkposkdpgoskpgoskdpoksdpgokspdogk123123123123123123123123123123123123123123123123123123'" />
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import Msg from '~/components/chatRoom/Msg.vue'

@Component({
  components: {
    Msg
  }
})
export default class MsgArea extends Vue {
    @Prop({ required: false })
    private isDarkMode!: boolean;
}
</script>
