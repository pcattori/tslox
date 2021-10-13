export const withoutLiterals = [
  "LEFT_PAREN",
  "RIGHT_PAREN",
  "LEFT_BRACE",
  "RIGHT_BRACE",
  "COMMA",
  "SEMICOLON",
  "IDENTIFIER",
  "WHITESPACE",
  "COMMENT",
  "EOF",

  // operators
  "DOT",
  "MINUS",
  "PLUS",
  "SLASH",
  "STAR",
  "BANG",
  "BANG_EQUAL",
  "EQUAL",
  "EQUAL_EQUAL",
  "GREATER",
  "GREATER_EQUAL",
  "LESS",
  "LESS_EQUAL",

  // keywords
  "AND",
  "CLASS",
  "ELSE",
  "FALSE",
  "FUN",
  "FOR",
  "IF",
  "NIL",
  "OR",
  "PRINT",
  "RETURN",
  "SUPER",
  "THIS",
  "TRUE",
  "VAR",
  "WHILE",
] as const
export type WithoutLiteral = typeof withoutLiterals[number]

export const withLiterals = ["STRING", "NUMBER"] as const
export type WithLiteral = typeof withLiterals[number]

const types = [...withoutLiterals, ...withLiterals]
export type T = typeof types[number]

export const is = (maybe: string): maybe is T => maybe in types
