export interface RootState {
}

export enum themeModes {
  AUTO = 'AUTO',
  LIGHT = 'LIGHT',
  DARK = 'DARK',
}

export interface MessageType {
  id: string,
  sendBySelf: boolean,
  read: boolean,
  sentTime:string,
  textContent?: string,
}
