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
      avatarUrl: 'https://avatars1.githubusercontent.com/u/47718989?s=460&u=841507c2a6352d4d4b4febd652cb175df3c0ac04&v=4',
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
