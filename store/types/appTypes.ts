export interface RootState {
}

export enum themeModes {
  AUTO = 'AUTO',
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export interface MessageType {
  id: string, // mongoose id
  author:string, // line user id
  avatarUrl?: string,
  sendBySelf: boolean,
  read: boolean,
  sentTime: string,
  textContent?: string,
}

export interface UserAvatar {
  realUrl: string,
  path: string
}
