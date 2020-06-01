<template>
  <v-avatar class="mx-2" size="24px">
    <v-icon v-if="!avatar" :dark="isDarkMode">
      mdi-account-circle
    </v-icon>
    <img
      v-if="avatar"
      :src="avatar"
      alt="Avatar"
      class="avatar"
    >
  </v-avatar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

  @Component({})
export default class Avatar extends Vue {
    @Prop({ required: false })
    private avatar!: string

    @Prop({ required: false })
    private isDarkMode!: boolean;
}
</script>
