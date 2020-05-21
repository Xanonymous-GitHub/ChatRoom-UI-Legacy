import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { MessageType, themeModes } from '~/store/types/appTypes'
import uuid from '~/utils/uuid'

@Module({ name: 'app', stateFactory: true, namespaced: true })
export default class AppStore extends VuexModule {
  private themeMode = themeModes.AUTO;

  private messages: Array<MessageType> = [
    {
      id: '123',
      sendBySelf: false,
      read: false,
      sentTime: '03:24',
      textContent: 'ccccccc'
    },
    {
      id: '456',
      sendBySelf: true,
      read: true,
      sentTime: '03:25',
      textContent: 'ssssss'
    }
  ]

  @Mutation
  SET_THEME_MODE (mode: themeModes) {
    this.themeMode = mode
  }

  @Mutation
  CREATE_MSG ({ insertPosition, insertData }: { insertPosition: number, insertData: MessageType }) {
    if (insertPosition) {
      this.messages.splice(insertPosition, 0, insertData)
    } else {
      this.messages.push(insertData)
    }
  }

  @Action({ commit: 'CREATE_MSG' })
  createMsg (insertData: MessageType, insertPosition?: (number | undefined)) {
    insertData.id = uuid()
    return { insertData, insertPosition }
  }

  get isDarkMode () {
    return this.themeMode === themeModes.DARK
  }

  get getMessage () {
    return this.messages
  }
}
