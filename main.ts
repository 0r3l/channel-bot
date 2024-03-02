import { xhr } from './service.ts'
import { videos } from './config.ts'
import { difference } from 'https://deno.land/std@0.125.0/datetime/mod.ts'
import { TelegramMessage, InterceptedMessage } from './types.ts'
import { polling } from './config.ts'

console.debug = () => {}

export async function main() {
  const { result } = await xhr<{ result: TelegramMessage[] }>('getUpdates')
  console.debug({ result })
  const interceptedMessages = result
    .map((telegramMessage: TelegramMessage) => {
      const diff = difference(
        new Date(telegramMessage.message.date * 1_000),
        new Date(),
        {
          units: ['milliseconds'],
        }
      )

      console.debug({ diff })
      if (diff.milliseconds! > polling.interval) {
        return undefined
      }
      const userMessage = telegramMessage.message
      console.log({ userMessage })
      const userText = telegramMessage.message?.text || ''
      let video = undefined
      videos.forEach((value, key) => {
        if (key.some((k) => k.match(userText))) {
          video = value
        }
      })

      console.debug({ userText, video })

      const mapped = {
        video,
        chat_id: telegramMessage.message.chat.id,
        userText,
      } as InterceptedMessage
      console.log({ mapped })
      return mapped
    })
    .filter((x: InterceptedMessage | undefined) => x)

  console.log({ interceptedMessages })

  for (const {
    chat_id,
    video,
    userText,
  } of interceptedMessages as InterceptedMessage[]) {
    const body = video
      ? { video, supports_streaming: true }
      : { text: `Sorry, ${userText} not found!` }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id,
        ...body,
      }),
    }

    if (video) {
      const sendVideoResult = await xhr('sendVideo', options)
      console.log({ sendVideoResult })
    } else {
      const sendMessageResult = await xhr('sendMessage', options)
      console.log({ sendMessageResult })
    }
  }
}
