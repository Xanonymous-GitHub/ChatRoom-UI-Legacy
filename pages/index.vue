<template>
  <v-app class="home-page">
    <div class="main-field">
      <h1 class="main-field__title">
        mr.coding
      </h1>
      <v-form ref="form" v-model="valid">
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
            @input="startInput"
            @keypress.enter.prevent="login"
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
            @input="startInput"
            @keypress.enter.prevent="login"
          />
          <p>{{ loginStatusMessages }}</p>
          <div class="main-field__buttons">
            <v-btn
              :disabled="!password||!username||loginInProgress"
              color="success"
              small
              @click.exact.prevent.stop="login"
            >
              LOGIN
            </v-btn>
          </div>
        </div>
      </v-form>
      <div v-if="logged" class="main-field__chatroom-selection-field">
        <v-text-field
          v-model="chatroomToGo"
          dense
          label="chatroom ID"
          outlined
          required
          solo-inverted
          @keypress.enter.prevent="chatroomToGo.trim()&&$router.push(getWhereToGo)"
        />
        <div class="main-field__buttons">
          <v-btn :disabled="!chatroomToGo" :to="getWhereToGo" color="primary" small>
            GO THIS ROOM
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
import adminDataFetcher from '~/utils/adminDataFetcher'
import { setJwtToLocalStorageWithExpire } from '~/utils/jwtTokenController'

  @Component({})
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

    @Provide()
    private valid = true

    get getWhereToGo () {
      return '/chatroom/' + this.chatroomToGo.trim()
    }

    public async beforeMount () {
      if (await adminDataFetcher()) {
        this.loginStatusMessages = ''
        await new Promise((resolve) => {
          this.logged = true
          resolve()
        })
      }
    }

    private startInput () {
      this.loginStatusMessages = ''
    }

    private async login () {
      (this.$refs.form as HTMLFormElement).validate()
      if (this.username.trim() && this.password.trim()) {
        this.loginInProgress = true
        this.loginStatusMessages = ''
        const { token } = (await API.login(this.username, this.password)) as { token: string }
        this.password = ''
        if (token) {
          await setJwtToLocalStorageWithExpire(token)
          appStore.setCurrentUserJwtToken(token)
          if (await adminDataFetcher(token)) {
            this.loginStatusMessages = ''
            this.logged = true
          } else {
            this.loginStatusMessages = 'jwt validation failed'
          }
        } else {
          this.loginStatusMessages = 'invalid username or password!'
        }
      }
      this.loginInProgress = false
    }
}
</script>
