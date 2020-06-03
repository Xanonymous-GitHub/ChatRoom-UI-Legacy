import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { MessageType, themeModes, UserType, MessageContainerType } from '~/store/types/appTypes'
import uuid from '~/utils/uuid'

@Module({ name: 'app', stateFactory: true, namespaced: true })
export default class AppStore extends VuexModule {
  private themeMode = themeModes.AUTO;

  private currentUser: UserType =
    {
      _id: 'TeuId',
      username: 'TeU',
      verified: false,
      avatar: 'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg' // should be a base64
    }

  private otherUsers: Array<UserType> = [
    {
      _id: 'XanonymousId',
      username: 'Xanonymous',
      verified: false,
      avatar: 'https://cdn.vuetifyjs.com/images/profiles/marcus.jpg' // should be a base64
    }
  ]

  private messages: MessageContainerType = {
    abc: [
      {
        _id: '123',
        author: 'XanonymousId',
        read: false,
        updateAt: 1591029484912,
        context: 'this is a test message from xanonymous in room 123',
        chatroomID: 'abc'
      },
      {
        _id: '456',
        author: 'TeuId',
        read: true,
        updateAt: 1591029503976,
        context: 'this is also a test message from Teu in room 123',
        chatroomID: 'abc'
      }
    ]
  }

  private currentChatRoomIdentify: string = ''

  @Mutation
  SET_THEME_MODE (mode: themeModes) {
    this.themeMode = mode
  }

  @Mutation
  CREATE_MSG ({ newMsg, chatroomID, insertPosition }: { newMsg: MessageType, chatroomID: string, insertPosition: number }) {
    if (insertPosition) {
      this.messages[`${chatroomID}`].splice(insertPosition, 0, newMsg)
    } else {
      this.messages[`${chatroomID}`].push(newMsg)
    }
  }

  @Mutation
  SET_CHATROOM_IDENTIFY (identify: string) {
    this.currentChatRoomIdentify = identify
  }

  @Action({ commit: 'CREATE_MSG' })
  createMsg ({ newMsg, chatroomID, insertPosition }: { newMsg: MessageType, chatroomID: string, insertPosition?: (number | undefined) }) {
    newMsg._id = uuid() // actually from TODO -> server.
    return { newMsg, chatroomID, insertPosition }
  }

  get isDarkMode () {
    return this.themeMode === themeModes.DARK
  }

  get getMessage () {
    return this.messages
  }

  get getCurrentUser () {
    return this.currentUser
  }

  get getOtherUsers () {
    return this.otherUsers
  }

  get getCurrentChatRoomIdentify () {
    return this.currentChatRoomIdentify
  }
}
