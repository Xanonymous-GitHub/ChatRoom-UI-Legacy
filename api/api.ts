import axios from 'axios'
// @ts-ignore
import * as tunnel from 'tunnel'
import { ChatRoomType, MessageType, AdminType } from '~/store/types/appTypes'
import { ResponseErrorType } from '~/store/types/apiTypes'

// @ts-ignore
const tunnelAgent = tunnel.httpsOverHttp({
  proxy: {
    host: 'mrcoding.org',
    port: 443
  }
})

axios.defaults.baseURL = '/api'
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8'
axios.defaults.httpsAgent = tunnelAgent

export default class API {
  static async getSpecifyChatRoomData (chatRoomId: string): Promise<ChatRoomType | ResponseErrorType> {
    try {
      const { data } = await axios.get(`/chatrooms/${chatRoomId}:443`)
      return data
    } catch (e) {
      console.log(e)
      const status = e.response
      return { error: status }
    }
  }

  static async getAllChatRoomsData (jwtToken: string): Promise<Array<ChatRoomType> | ResponseErrorType> {
    try {
      const { data } = await axios.get('/chatrooms', {
        headers: {
          authorization: 'bearer ' + jwtToken
        }
      })
      return data
    } catch (e) {
      const status = e.response
      return { error: status }
    }
  }

  static async createNewChatRoom (identify: string, uniqueToken: string): Promise<ChatRoomType | ResponseErrorType> {
    try {
      const { data } = await axios.post('/chatrooms', {
        identify
      }, {
        headers: {
          authorization: uniqueToken
        }
      })
      return data
    } catch (e) {
      const status = e.response
      if (status === 400) {
        return { error: 'duplicate room id' + status }
      }
      return { error: status }
    }
  }

  static async setChatRoomLineAccessToken (chatRoomId: string, lineAccessToken: string, lineUserId: string): Promise<ChatRoomType | ResponseErrorType> {
    try {
      const { data } = await axios.patch(`/chatrooms/${chatRoomId}/lineAccessToken`, {
        lineAccessToken
      }, {
        headers: {
          authorization: lineUserId
        }
      })
      return data
    } catch (e) {
      const status = e.response
      if (status === 404) {
        return { error: 'could not find the chatRoom' + status }
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
      const status = e.response
      if (status === 404) {
        return { error: 'chatRoom not found' + status }
      }
      return { error: status }
    }
  }

  static async getHistoryMessages (chatRoomId: string, number: number, lastTime?: number, jwtToken?: string, lineUserId?: string): Promise<Array<MessageType> | ResponseErrorType> {
    try {
      const header: { authorization?: string, userID?: string } = {}
      if (jwtToken) {
        header.authorization = 'bearer ' + jwtToken
      } else if (lineUserId) {
        header.userID = lineUserId
      }
      const param: { number?: number, lastTime?: number } = {}
      param.number = number
      if (lastTime) {
        param.lastTime = lastTime
      }
      const { data } = await axios.get(`/chatrooms/${chatRoomId}/history`, {
        params: param,
        headers: header
      })
      return data
    } catch (e) {
      const status = e.response
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
      const status = e.response
      return { error: status }
    }
  }

  static async getSpecifyAdminDataById (UserId: string): Promise<AdminType | ResponseErrorType> {
    try {
      const { data } = await axios.get(`/users/${UserId}`)
      return data
    } catch (e) {
      const status = e.response
      return { error: status }
    }
  }

  static async getSpecifyAdminDataByJwtToken (jwtToken: string): Promise<AdminType | ResponseErrorType> {
    try {
      const { data } = await axios.get('/me', {
        headers: {
          authorization: 'bearer ' + jwtToken
        }
      })
      return data
    } catch (e) {
      const status = e.response
      return { error: status }
    }
  }

  static async getAllAdminsData (jwtToken: string): Promise<Array<AdminType> | ResponseErrorType> {
    try {
      const { data } = await axios.get('/users', {
        headers: {
          authorization: 'bearer ' + jwtToken
        }
      })
      return data
    } catch (e) {
      const status = e.response
      return { error: status }
    }
  }

  static async setAdminInfo (userId: string, info: string, jwtToken: string): Promise<AdminType | ResponseErrorType> {
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
      const status = e.response
      if (status === 400) {
        return { error: 'cross-user-access denied.' + status }
      }
      return { error: status }
    }
  }

  static async setAdminAvatar (userId: string, avatar: string, jwtToken: string): Promise<AdminType | ResponseErrorType> {
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
      const status = e.response
      if (status === 400) {
        return { error: 'cross-user-access denied.' + status }
      }
      return { error: status }
    }
  }

  static async setAdminValidation (userId: string, cc: string, jwtToken: string): Promise<AdminType | ResponseErrorType> {
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
      const status = e.response
      if (status === 400) {
        return { error: 'cross-user-access denied.' + status }
      }
      return { error: status }
    }
  }
}
