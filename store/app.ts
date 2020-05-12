import { Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { themeModes } from '~/store/types/appTypes'

@Module({ name: 'app', stateFactory: true, namespaced: true })
export default class AppStore extends VuexModule {
  private themeMode = themeModes.AUTO;

  @Mutation
  SET_THEME_MODE (mode: themeModes) {
    this.themeMode = mode
  }

  get isDarkMode () {
    return this.themeMode === themeModes.DARK
  }
}
