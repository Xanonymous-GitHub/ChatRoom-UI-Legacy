<template>
  <nuxt id="app" class="font-medium" />
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import { themeModes } from '~/store/types/appTypes'
import { appStore } from '~/utils/store-accessor'
@Component
export default class DefaultLayout extends Vue {
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
    const localStorageTheme = DefaultLayout.detectLocalStorageTheme()
    if (localStorageTheme === themeModes.AUTO) {
      theme = DefaultLayout.detectSystemTheme()
    } else {
      theme = localStorageTheme
    }
    return theme
  }

  public mounted () {
    appStore.SET_THEME_MODE(DefaultLayout.detectTheme())
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        appStore.SET_THEME_MODE(DefaultLayout.detectTheme())
      })
  }
}
</script>
