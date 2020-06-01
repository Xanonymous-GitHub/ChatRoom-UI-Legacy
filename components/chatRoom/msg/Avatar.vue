<template>
  <v-avatar class="mx-2" size="24px">
    <v-icon v-if="!avatarUrl" :dark="isDarkMode">
      mdi-account-circle
    </v-icon>
    <img
      v-if="avatarUrl"
      :src="avatarUrl"
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
    private avatarUrl!: string

    @Prop({ required: false })
    private isDarkMode!: boolean;
}
</script>
