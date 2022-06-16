export type ChatTypes = {
  id: number
  type: string
  text: string
  attachment: string
  timeStamp: string
}

export interface MessageProps {
  id: number
  name: string
  message: string
  avatar: string
  chats: ChatTypes
  title: string
  timeStamp: string
}
