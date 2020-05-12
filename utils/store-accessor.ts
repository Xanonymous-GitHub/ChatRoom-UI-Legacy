import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import app from '~/store/app'

// eslint-disable-next-line import/no-mutable-exports
let appStore: app

function initialiseStores (store: Store<any>): void {
  appStore = getModule(app, store)
}

export { initialiseStores, appStore }
