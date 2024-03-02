import { main } from './main.ts'
import { polling } from './config.ts'

// Deno.cron("Bot reply",  "0/3 * * * * ? *", async() => {})
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function repeat() {    
  console.log(`This will print every ${polling.interval} milliseconds.`)
  await main()
  await delay(polling.interval)
  await repeat()
}

await repeat();
