<template>
  <v-app class="error" :class="{'error--dark-background' : isDarkMode }">
    <h1 v-if="error.statusCode === 404">
      Page not found
    </h1>
    <h1 v-else>
      An error occurred
    </h1>
    <nuxt-link to="/">
      Home page
    </nuxt-link>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'nuxt-property-decorator'
import { appStore } from '~/utils/store-accessor'
@Component
export default class Error extends Vue {
  @Prop()
  private error:any

  get isDarkMode () {
    return appStore.isDarkMode
  }
}
</script>
