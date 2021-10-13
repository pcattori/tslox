import * as token from "../../token"
import * as error from "../../error"
import * as loc from "../loc"
import * as char from "../char"

// TODO readWhile
export default (
  source: string,
  index: number
): token.Number | null | error.T => {
  const err = loc.errAt(source, index)
  const read = loc.readAt(source, index)
  if (!char.isDigit(read(1))) return null

  let i = 1
  while (index + i < source.length) {
    if (!char.isDigit(read(i + 1).slice(-1))) break
    i += 1
  }
  if (read(i + 1).slice(-1) === "." && char.isDigit(read(i + 2).slice(-1))) {
    i += 2
    while (index + i < source.length) {
      if (!char.isDigit(read(i + 1).slice(-1))) break
      i += 1
    }
  }
  const lexeme = read(i)
  const literal = parseFloat(lexeme)
  if (Number.isNaN(literal))
    return err(`Could not parse number from '${lexeme}'`, i)
  return { index, lexeme: read(i), type: "NUMBER", literal }
}
