<template>
  <v-text-field dense filled placeholder="Put Some Messages" rounded>
    <template #prepend-inner>
      <v-icon>mdi-message-reply-text</v-icon>
    </template>
    <template #append-outer>
      <v-btn class="up-half" fab icon small>
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </template>
    <template #prepend>
      <v-btn class="up-half" fab icon small>
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </template>
  </v-text-field>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
@Component
export default class MsgInput extends Vue {}
</script>
