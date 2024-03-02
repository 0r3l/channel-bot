import { main } from './main.ts'
import { polling } from './config.ts'

const kv = await Deno.openKv()

await kv.enqueue(true, { delay: polling.interval })

kv.listenQueue(async () => {
  console.log(`This will print every ${polling.interval} milliseconds.`)
  await main()
  await kv.enqueue(true, { delay: polling.interval })
})
