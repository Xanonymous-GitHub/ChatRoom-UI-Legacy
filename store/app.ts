import { Action, Module, Mutation, VuexModule } from 'vuex-module-decorators'
import { MessageType, themeModes, AdminType, MessageContainerType, UserType } from '~/store/types/appTypes'
import getBase64ImgPath from '~/utils/requestAvatar'
import API from '~/api/api'

@Module({ name: 'app', stateFactory: true, namespaced: true })
export default class AppStore extends VuexModule {
  private themeMode = themeModes.AUTO;

  private currentUser: AdminType | UserType = {
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
  ADD_OTHER_USER (otherUser: UserType | AdminType) {
    this.otherUsers.push(otherUser)
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
    this.messages[`${id}`] = []
  }

  @Mutation
  SET_CURRENT_USER_JWT_TOKEN (jwtToken: string) {
    this.currentUserJwtToken = jwtToken
  }

  @Mutation
  INIT_MESSAGE_CONTAINER (chatRoomId: string) {
    this.messages[`${chatRoomId}`] = []
  }

  @Action({ commit: 'INIT_MESSAGE_CONTAINER' })
  initMessageContainer (chatRoomId: string) {
    if (this.messages[`${chatRoomId}`]) {
      return chatRoomId
    }
  }

  @Action({ commit: 'CREATE_MSG' })
  async createMsg ({ newMsg, chatroomID, insertPosition }: { newMsg: MessageType, chatroomID: string, insertPosition?: (number | undefined) }) {
    if (!this.messages[`${chatroomID}`]) {
      this.messages[`${chatroomID}`] = []
    }
    const currentUser = this.getCurrentUser
    if (newMsg.author !== currentUser._id) {
      let otherUser = this.getOtherUsers.find(user => user._id === newMsg.author)!
      if (!otherUser) {
        otherUser = (await API.getSpecifyAdminDataById(newMsg.author)) as unknown as AdminType
        if (otherUser) {
          await this.addOtherUser(otherUser)
        }
      }
    }
    return { newMsg, chatroomID, insertPosition }
  }

  @Action({ commit: 'SET_CURRENT_USER' })
  async setCurrentUser (originalData: UserType | AdminType) {
    if (originalData && 'avatar' in originalData && originalData.avatar) {
      originalData.avatar = await getBase64ImgPath(originalData.avatar!)
    }
    return originalData
  }

  @Action({ commit: 'ADD_OTHER_USER' })
  async addOtherUser (originalData: UserType | AdminType) {
    if (originalData && 'avatar' in originalData && originalData.avatar) {
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
