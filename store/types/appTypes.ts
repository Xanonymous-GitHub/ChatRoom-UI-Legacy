export interface RootState {
}

export enum themeModes {
  AUTO = 'AUTO',
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export interface MessageType {
  _id: string, // mongoose id, unique
  author: string, // store the user _id
  read: boolean, // show that if this is read by someone
  context?: string, // text content of this msg, maybe will change to the container of medias
  chatroomID: string, // show that which chatRoom is it belongs to
  updateAt: number // the last time of edit or create
}

export interface UserType {
  _id: string, // unique user id
  username: string, // user self-set name
  avatar?: string, // user avatar url(at the first time) => base64 path TODO avatar = await getBase64ImgPath(avatarUrl)
  info?: string, // user profile
  verified: boolean // show that if the user is verified by us(dev team)
}

export interface MessageContainerType {
  [chatroomID: string]: Array<MessageType>
}
