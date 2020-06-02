<template>
  <v-app class="home-page">
    <div class="main-field">
      <h1 class="main-field__title">
        mr.coding
      </h1>
      <div class="main-field__login-field">
        <v-text-field
          :rules="loginRules"
          dense
          solo-inverted
          outlined
          label="username"
          required
        />
        <v-text-field
          :rules="loginRules"
          dense
          solo-inverted
          outlined
          label="password"
          required
          type="password"
        />
        <div class="main-field__buttons">
          <v-btn color="success" small>
            LOGIN
          </v-btn>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

  @Component({})
export default class RootPage extends Vue {
    private loginRules = [
      (v: any) => !!v || 'required'
    ]
}
</script>
