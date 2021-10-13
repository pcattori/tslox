import * as tokenType from "../../token/type"
import * as loc from "../loc"
import * as token from "../../token"

const toTokenType = new Map<string, tokenType.WithoutLiteral>([
  ["(", "LEFT_PAREN"],
  [")", "RIGHT_PAREN"],
  ["{", "LEFT_BRACE"],
  ["}", "LEFT_BRACE"],
  [",", "COMMA"],
  [";", "SEMICOLON"],

  // operators
  [".", "DOT"],
  ["-", "MINUS"],
  ["+", "PLUS"],
  ["*", "STAR"],
  ["!=", "BANG_EQUAL"],
  ["!", "BANG"],
  ["==", "EQUAL_EQUAL"],
  ["=", "EQUAL"],
  ["<=", "LESS_EQUAL"],
  ["<", "LESS"],
  [">=", "GREATER_EQUAL"],
  [">", "GREATER"],
  ["/", "SLASH"],

  // whitespace
  [" ", "WHITESPACE"],
  ["\t", "WHITESPACE"],
  ["\r", "WHITESPACE"],
  ["\n", "WHITESPACE"],
])

export default (source: string, index: number): token.T | null => {
  const match = loc.matchAt(source, index)
  for (let [lexeme, type] of toTokenType.entries()) {
    if (match(lexeme)) return { index, lexeme, type }
  }
  return null
}
