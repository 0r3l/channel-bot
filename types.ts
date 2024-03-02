export type TelegramMessage = {
  update_id: number
  message: {
    message_id: number
    from: {
      id: number
      is_bot: boolean
      first_name: string
      last_name: string
      username: string
      language_code: string
    }
    chat: {
      id: number
      first_name: string
      last_name: string
      username: string
      type: 'private' | 'public'
    }
    date: number
    text: string
  }
}

export type InterceptedMessage = {
  chat_id: number
  video: string | undefined
  userText: string
}
