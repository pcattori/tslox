import * as token from "../../token"
import * as tokenType from "../../token/type"
import * as loc from "../loc"
import * as char from "../char"

const lexeme2Keyword = new Map<string, tokenType.WithoutLiteral>([
  ["and", "AND"],
  ["class", "CLASS"],
  ["else", "ELSE"],
  ["false", "FALSE"],
  ["for", "FOR"],
  ["fun", "FUN"],
  ["if", "IF"],
  ["nil", "NIL"],
  ["or", "OR"],
  ["print", "PRINT"],
  ["return", "RETURN"],
  ["super", "SUPER"],
  ["this", "THIS"],
  ["true", "TRUE"],
  ["var", "VAR"],
  ["while", "WHILE"],
])

export default (source: string, index: number): token.NoLiteral | null => {
  const read = loc.readAt(source, index)
  if (!char.isAlpha(read(1))) return null
  let i = 1
  while (index + i < source.length) {
    if (!char.isAlphaNumeric(read(i + 1).slice(-1))) break
    i += 1
  }
  const lexeme = read(i)

  const type = lexeme2Keyword.get(lexeme)
  if (!type) return null
  return { index, lexeme, type }
}
