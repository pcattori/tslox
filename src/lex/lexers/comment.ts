import * as token from "../../token"
import * as loc from "../loc"

export default (source: string, index: number): token.NoLiteral | null => {
  const read = loc.readAt(source, index)
  if (read(2) !== "//") return null

  const nextNewline = source.slice(index).indexOf("\n")
  if (nextNewline === -1)
    return { index, lexeme: read(source.length - index), type: "COMMENT" }
  return { index, lexeme: read(nextNewline), type: "COMMENT" }
}
