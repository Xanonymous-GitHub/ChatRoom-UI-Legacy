<template>
  <v-app class="home-page">
    <div class="main-field">
      <h1 class="main-field__title">
        mr.coding
      </h1>
      <div class="main-field__login-field">
        <v-text-field
          v-model="username"
          :rules="loginRules"
          dense
          label="username"
          outlined
          required
          solo-inverted
          :disabled="loginInProgress"
        />
        <v-text-field
          v-model="password"
          :rules="loginRules"
          dense
          label="password"
          outlined
          required
          solo-inverted
          type="password"
          :disabled="loginInProgress"
        />
        <div class="main-field__buttons">
          <v-btn color="success" small :disabled="loginInProgress" @click.exact.prevent.stop="login">
            LOGIN
          </v-btn>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'nuxt-property-decorator'
import API from '~/api/api'
import { appStore } from '~/utils/store-accessor'

  @Component({})
export default class RootPage extends Vue {
    private loginRules = [
      (v: any) => !!v || 'required'
    ]

    private loginInProgress: boolean = false

    @Provide()
    private username = ''

    @Provide()
    private password = ''

    private async login () {
      this.loginInProgress = true
      const { token } = (await API.login(this.username, this.password)) as { token: string }
      this.username = ''
      this.password = ''
      if (token) {
        alert('success!') // TODO temp, to be removed.
        appStore.SET_CURRENT_USER_JWT_TOKEN(token)
        // TODO show optional chatRoom select
      } else {
        alert('invalid user name or password!') // TODO temp, to be removed.
        this.loginInProgress = false
      }
    }
}
</script>
