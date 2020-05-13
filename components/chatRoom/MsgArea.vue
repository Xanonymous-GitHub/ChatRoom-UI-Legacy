<template>
  <div
    id="MsgArea"
    :class="{ darkBackground: isDarkMode }"
    class="full-height"
  />
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
@Component
export default class MsgArea extends Vue {
    @Prop({ required: false })
    private isDarkMode!: boolean;
}
</script>
