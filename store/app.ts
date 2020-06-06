import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { MessageType, themeModes, AdminType, MessageContainerType, UserType } from '~/store/types/appTypes'
import uuid from '~/utils/uuid'
import getBase64ImgPath from '~/utils/requestAvatar'

@Module({ name: 'app', stateFactory: true, namespaced: true })
export default class AppStore extends VuexModule {
  private themeMode = themeModes.AUTO;

  private currentUser: AdminType | UserType={
    _id: ''
  }

  private otherUsers: Array<AdminType | UserType> = [
    {
      _id: '',
      username: '',
      cc: false,
      avatar: ''
    }
  ]

  private messages: MessageContainerType = {}

  private currentChatRoomId: string = ''

  private currentUserJwtToken: string = ''

  @Mutation
  SET_THEME_MODE (mode: themeModes) {
    this.themeMode = mode
  }

  @Mutation
  SET_CURRENT_USER (originalData: UserType | AdminType) {
    this.currentUser = originalData
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
  SET_CHATROOM_ID (id: string) {
    this.currentChatRoomId = id
  }

  @Mutation
  SET_CURRENT_USER_JWT_TOKEN (jwtToken: string) {
    this.currentUserJwtToken = jwtToken
  }

  @Action({ commit: 'CREATE_MSG' })
  createMsg ({ newMsg, chatroomID, insertPosition }: { newMsg: MessageType, chatroomID: string, insertPosition?: (number | undefined) }) {
    newMsg._id = uuid() // actually from TODO -> server.
    return { newMsg, chatroomID, insertPosition }
  }

  @Action({ commit: 'SET_CURRENT_USER' })
  async setCurrentUser (originalData: UserType | AdminType) {
    if ('avatar' in originalData) {
      originalData.avatar = await getBase64ImgPath(originalData.avatar!)
    }
    return originalData
  }

  @Action({ commit: 'SET_CURRENT_USER_JWT_TOKEN' })
  setCurrentUserJwtToken (jwtToken: string) {
    return jwtToken
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

  get getCurrentChatRoomId () {
    return this.currentChatRoomId
  }

  get getJwtKey () {
    return this.currentUserJwtToken
  }
}
