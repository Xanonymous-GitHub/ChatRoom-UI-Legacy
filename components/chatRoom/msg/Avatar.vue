<template>
  <v-avatar class="mx-2" size="24px">
    <img
      alt="Avatar"
      :src="avatarUrl"
    >
  </v-avatar>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Avatar extends Vue {
  @Prop({ required: false })
  private avatarUrl!:string
}
</script>
