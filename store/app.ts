import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { MessageType, themeModes, UserAvatar } from '~/store/types/appTypes'
import uuid from '~/utils/uuid'

@Module({ name: 'app', stateFactory: true, namespaced: true })
export default class AppStore extends VuexModule {
  private themeMode = themeModes.AUTO;

  private avatars: Array<UserAvatar> = [];

  private messages: Array<MessageType> = [
    {
      _id: '123',
      author: 'Xanonymous',
      sendBySelf: false,
      avatarUrl: 'icon.png',
      read: false,
      sentTime: '03:24',
      context: 'ccccccc'
    },
    {
      _id: '456',
      author: 'Xanonymous',
      sendBySelf: true,
      read: true,
      sentTime: '03:25',
      context: 'ssssss'
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

  @Mutation
  PUSH_AVATAR (avatar: UserAvatar) {
    this.avatars.push(avatar)
  }

  @Action({ commit: 'CREATE_MSG' })
  createMsg (insertData: MessageType, insertPosition?: (number | undefined)) {
    insertData._id = uuid()
    return { insertData, insertPosition }
  }

  get isDarkMode () {
    return this.themeMode === themeModes.DARK
  }

  get getMessage () {
    return this.messages
  }

  get getAvatars () {
    return this.avatars
  }
}
