import * as token from "../../token"
import * as error from "../../error"
import * as loc from "../loc"

export default (
  source: string,
  index: number
): token.String | null | error.T => {
  const err = loc.errAt(source, index)
  const read = loc.readAt(source, index)
  if (read(1) !== '"') return null

  const nextQuote = source.slice(index + 1).indexOf('"') + 1
  if (nextQuote === 0) return err("Unterminated string", 1)
  const lexeme = read(nextQuote)
  console.log(`lexeme: ${lexeme}`)
  return { index, lexeme, type: "STRING", literal: lexeme.slice(1, -1) }
}
