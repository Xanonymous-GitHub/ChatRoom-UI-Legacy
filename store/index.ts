import { getAccessorType } from 'typed-vuex'
import app from '~/store/modules/app'
export const accessorType = getAccessorType({
  modules: {
    app
  }
})
