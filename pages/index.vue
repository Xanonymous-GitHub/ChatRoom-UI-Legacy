<template>
  <div />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { appStore } from '@/store'
import { themeModes } from '~/store/types/appTypes'

@Component({})
export default class RootPage extends Vue {
  private static detectSystemTheme (): themeModes {
    if (!window.matchMedia) { return themeModes.LIGHT }
    const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
    return isDarkMode ? themeModes.DARK : themeModes.LIGHT
  }

  private static detectLocalStorageTheme (): themeModes {
    let colorSchema = `${window.localStorage.getItem('colorSchema')}` as themeModes
    if (!(colorSchema in themeModes)) { colorSchema = themeModes.AUTO }
    return colorSchema
  }

  private static detectTheme ():themeModes {
    let theme: themeModes
    const localStorageTheme = RootPage.detectLocalStorageTheme()
    if (localStorageTheme === themeModes.AUTO) {
      theme = RootPage.detectSystemTheme()
    } else {
      theme = localStorageTheme
    }
    return theme
  }

  public mounted () {
    console.log(appStore)
    console.log(RootPage.detectTheme())
  }
}
</script>
