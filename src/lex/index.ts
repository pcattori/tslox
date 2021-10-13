import * as error from "../error"
import * as token from "../token"
import * as tokenType from "../token/type"
import * as loc from "./loc"
import * as char from "./char"

import exactMatch from "./types/exact-match"
import comment from "./types/comment"
import string from "./types/string"
import number from "./types/number"
import identifier from "./types/identifier"
import keyword from "./types/keyword"

// TODO slash
const lexeme2TokenType = new Map<string, tokenType.WithoutLiteral>([
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

  // whitespace
  [" ", "WHITESPACE"],
  ["\t", "WHITESPACE"],
  ["\r", "WHITESPACE"],
  ["\n", "WHITESPACE"],
])

export function* scan(source: string): Generator<token.T | error.T> {
  let index = 0
  while (index <= source.length) {
    const result = scanToken(source, index)
    if (error.is(result)) {
      yield result
      // continue
      break
    }
    yield result
    index += result.lexeme.length
    if (result.type === "EOF") return
  }
}

const scanToken = (source: string, index: number): token.T | error.T => {
  const err = loc.errAt(source, index)
  const read = loc.readAt(source, index)
  const match = loc.matchAt(source, index)

  if (index === source.length) return { index, lexeme: read(0), type: "EOF" }

  // TODO amass all matches
  // sortby match length, priority, then errors
  // if no matches or errors, err on unexpected char
  // return top match

  for (let f of [exactMatch, comment, string, number, identifier, keyword]) {
    const y = f(source, index)
    if (y === null) continue
    return y
  }
  return err(`Unexpected character: '${read(1)}'`, 1)
}
