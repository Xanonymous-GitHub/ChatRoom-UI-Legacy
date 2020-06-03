export interface RootState {
}

export enum themeModes {
  AUTO = 'AUTO',
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export interface MessageType {
  _id: string, // mongoose id, absolutely unique
  author: string, // user's [_id]
  read: boolean, // show that if this is read by someone (the other user in same chatRoom)
  context?: string, // text content of this msg, will change to contain not only texts but also medias
  chatroomID: string, // the chatRoom's [_id](mongoose id, absolutely unique)
  updateAt: number, // the last time of edit or create
  createAt?: number // deprecated unUseful parameter from server
}

export interface UserType {
  _id: string, // mongoose id, absolutely unique
  username: string, // admins' self-set name, or the line uuid of general users
  avatar?: string, // user avatar url(at the first time) => base64 path TODO avatar = await getBase64ImgPath(avatarUrl)
  info?: string, // user profile
  verified: boolean // show that if the user is verified by us(dev team)
}

export interface ChatRoomType {
  _id: string, // mongoose id, absolutely unique
  owner?: string, // the hashed user's line uuid => hashed[(username])
  identify: string, // a route param -> /:chatRoom, generated from 'createChatRoom' in google script
  closed: boolean // show that if this room is closed or not.
}

export interface MessageContainerType {
  [chatroomID: string]: Array<MessageType>
}
