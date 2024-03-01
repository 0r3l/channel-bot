import * as log from 'https://deno.land/std@0.218.2/log/mod.ts'
import { load } from 'https://deno.land/std@0.218.0/dotenv/mod.ts'
import { xhr } from './service.ts'

const env = await load()
const { result } = await xhr('getUpdates')
console.log({ result })
const chat_id = result
  .filter((m: any) => m.message.chat.id === 6490167768)
  .map((m: any) => m.message?.chat?.id)[0]

const options = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    chat_id,
    text: Deno.args[0],
  }),
}
const sendMessageResult = await xhr('sendMessage', options)
console.log({ sendMessageResult })

