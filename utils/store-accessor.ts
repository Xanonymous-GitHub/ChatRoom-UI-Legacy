import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import storeModule from '~/store/modules/app'

// eslint-disable-next-line import/no-mutable-exports
let appStore: storeModule

function initialiseStores (store: Store<any>): void {
  appStore = getModule(storeModule, store)
}

export { initialiseStores, appStore }
