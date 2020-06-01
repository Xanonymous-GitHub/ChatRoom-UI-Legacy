export interface RootState {
}

export enum themeModes {
  AUTO = 'AUTO',
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export interface MessageType {
  _id: string, // mongoose id
  author:string, // line user id
  avatarUrl?: string,
  sendBySelf: boolean,
  read: boolean,
  sentTime: string,
  context?: string,
  chatroomID?: string,
  createAt?: string,
  updateAt?: string
}

export interface UserAvatar {
  realUrl: string,
  path: string
}
