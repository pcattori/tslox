import * as token from "../../token"
import * as loc from "../loc"
import * as char from "../char"

export default (source: string, index: number): token.NoLiteral | null => {
  const read = loc.readAt(source, index)
  if (!char.isAlpha(read(1))) return null
  let i = 1
  while (index + i < source.length) {
    if (!char.isAlphaNumeric(read(i + 1).slice(-1))) break
    i += 1
  }
  const lexeme = read(i)

  return { index, lexeme, type: "IDENTIFIER" }
}
