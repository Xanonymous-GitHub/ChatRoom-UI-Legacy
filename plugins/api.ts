import Vue from 'vue'
import axios from 'axios'
import { ChatRoomType, MessageType, UserType } from '~/store/types/appTypes'
import { ResponseErrorType } from '~/store/types/apiTypes'

axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'

class mainAPI {
  static async getSpecifyChatRoomData (identify: string): Promise<ChatRoomType | ResponseErrorType> {
    try {
      const { data } = await axios.get('/chatrooms', {
        params: {
          identify
        }
      })
      return data
    } catch (e) {
      const status = e.response.status
      return { error: status }
    }
  }

  static async getAllChatRoomsData (): Promise<Array<ChatRoomType> | ResponseErrorType> {
    try {
      const { data } = await axios.get('/chatrooms')
      return data
    } catch (e) {
      const status = e.response.status
      return { error: status }
    }
  }

  static async createNewChatRoom (identify: string, uniqueToken: string): Promise<ChatRoomType | ResponseErrorType> {
    try {
      const { data } = await axios.post('/chatrooms', {
        identify
      }, {
        headers: {
          Authorization: uniqueToken
        }
      })
      return data
    } catch (e) {
      const status = e.response.status
      if (status === 400) {
        return { error: 'duplicate room id' + status }
      }
      return { error: status }
    }
  }

  static async setChatRoomStatus (chatRoomId: string, closed: boolean, jwtToken: string): Promise<ChatRoomType | ResponseErrorType> {
    try {
      const { data } = await axios.patch(`/chatrooms/${chatRoomId}/closed`, {
        closed
      }, {
        headers: {
          authorization: 'bearer ' + jwtToken
        }
      })
      return data
    } catch (e) {
      const status = e.response.status
      if (status === 404) {
        return { error: 'chatRoom not found' + status }
      }
      return { error: status }
    }
  }

  static async getHistoryMessages (chatRoomId: string, number: number, lastTime?: number): Promise<Array<MessageType> | ResponseErrorType> {
    try {
      const { data } = await axios.get(`/chatrooms/${chatRoomId}/history`, {
        params: {
          number,
          lastTime
        }
      })
      return data
    } catch (e) {
      const status = e.response.status
      return { error: status }
    }
  }

  static async login (username: string, password: string): Promise<{ token: string } | ResponseErrorType> {
    try {
      const { data } = await axios.post('/auth', {
        username,
        password
      })
      return data
    } catch (e) {
      const status = e.response.status
      return { error: status }
    }
  }

  static async getSpecifyUserData (username: string): Promise<UserType | ResponseErrorType> {
    try {
      const { data } = await axios.get('/users', {
        params: {
          username
        }
      })
      return data
    } catch (e) {
      const status = e.response.status
      return { error: status }
    }
  }

  static async getAllAdminsData (): Promise<Array<UserType> | ResponseErrorType> {
    try {
      const { data } = await axios.get('/users')
      return data
    } catch (e) {
      const status = e.response.status
      return { error: status }
    }
  }

  static async setAdminInfo (userId: string, info: string, jwtToken: string): Promise<UserType | ResponseErrorType> {
    try {
      const { data } = await axios.patch(`/users/${userId}/info`, {
        info
      }, {
        headers: {
          authorization: 'bearer ' + jwtToken
        }
      })
      return data
    } catch (e) {
      const status = e.response.status
      if (status === 400) {
        return { error: 'cross-user-access denied.' + status }
      }
      return { error: status }
    }
  }

  static async setAdminAvatar (userId: string, avatar: string, jwtToken: string): Promise<UserType | ResponseErrorType> {
    try {
      const { data } = await axios.patch(`/users/${userId}/avatar`, {
        avatar
      }, {
        headers: {
          authorization: 'bearer ' + jwtToken
        }
      })
      return data
    } catch (e) {
      const status = e.response.status
      if (status === 400) {
        return { error: 'cross-user-access denied.' + status }
      }
      return { error: status }
    }
  }

  static async setAdminValidation (userId: string, cc: string, jwtToken: string): Promise<UserType | ResponseErrorType> {
    try {
      const { data } = await axios.patch(`/users/${userId}/cc`, {
        cc
      }, {
        headers: {
          authorization: 'bearer ' + jwtToken
        }
      })
      return data
    } catch (e) {
      const status = e.response.status
      if (status === 400) {
        return { error: 'cross-user-access denied.' + status }
      }
      return { error: status }
    }
  }
}

Vue.prototype.$API = mainAPI
