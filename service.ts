export async function xhr(api: string, options?: RequestInit) {
  const token = Deno.env.get('TELEGRAM_BOT_TOKEN')
  console.log(
    'telegram token',
    token
      ?.split('')
      .reduce(
        (acc, curr, index, list) =>
          (acc += [0, 1, 2, list.length - 1].some((i) => i === index)
            ? curr
            : '*'),
        ''
      )
  )
  const url = `https://api.telegram.org/bot${token}/${api}`

  console.log({ url }, { options })
  const resp = await fetch(url, options)
  const json = await resp.text()
  console.log(json)
  return JSON.parse(json)
}
