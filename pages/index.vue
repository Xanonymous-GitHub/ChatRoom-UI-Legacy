<template>
  <v-app class="home-page">
    <div class="main-field">
      <h1 class="main-field__title">
        mr.coding
      </h1>
      <div v-if="!logged" class="main-field__login-field">
        <v-text-field
          v-model="username"
          :disabled="loginInProgress"
          :rules="loginRules"
          dense
          label="username"
          outlined
          required
          solo-inverted
        />
        <v-text-field
          v-model="password"
          :disabled="loginInProgress"
          :rules="loginRules"
          dense
          label="password"
          outlined
          required
          solo-inverted
          type="password"
        />
        <p>{{ loginStatusMessages }}</p>
        <div class="main-field__buttons">
          <v-btn :disabled="loginInProgress" color="success" small @click.exact.prevent.stop="login">
            LOGIN
          </v-btn>
        </div>
      </div>
      <div v-if="logged" class="main-field__chatroom-selection-field">
        <v-text-field
          v-model="chatroomToGo"
          dense
          label="chatroom ID"
          outlined
          required
          solo-inverted
        />
        <div class="main-field__buttons">
          <nuxt-link :to="getWhereToGo">
            <v-btn color="primary" small @click.exact.prevent.stop="login">
              GO THIS ROOM
            </v-btn>
          </nuxt-link>
        </div>
      </div>
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Provide, Vue } from 'nuxt-property-decorator'
import API from '~/api/api'
import { appStore } from '~/utils/store-accessor'
import { AdminType } from '~/store/types/appTypes'
import NuxtBuildIndicator from '~/.nuxt/components/nuxt-build-indicator.vue'

  @Component({
    components: { NuxtBuildIndicator }
  })
export default class RootPage extends Vue {
    private loginRules = [
      (v: any) => !!v || 'required'
    ]

    private loginInProgress: boolean = false

    private logged: boolean = false

    @Provide()
    private username = ''

    @Provide()
    private password = ''

    @Provide()
    private loginStatusMessages = ''

    @Provide()
    private chatroomToGo = ''

    get getWhereToGo () {
      return '/chatroom/' + this.chatroomToGo
    }

    public mounted () {
      this.obtainAdminData()
    }

    private async login () {
      this.loginInProgress = true
      this.loginStatusMessages = ''
      const { token } = (await API.login(this.username, this.password)) as { token: string }
      this.username = ''
      this.password = ''
      if (token) {
        appStore.setCurrentUserJwtToken(token)
        await this.obtainAdminData(token)
      } else {
        this.loginStatusMessages = 'invalid user name or password!'
      }
      this.loginInProgress = false
    }

    private async obtainAdminData (key?: string) {
      const token = key || appStore.getJwtKey
      if (token) {
        const admin = (await API.getSpecifyAdminDataByJwtToken(token)) as unknown as AdminType
        if (!('error' in admin) && ('_id' in admin)) {
          await appStore.setCurrentUser(admin)
          this.loginStatusMessages = ''
          this.logged = true
        }
      }
    }
}
</script>
