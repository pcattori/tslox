type Token = { index: number; lexeme: string } & (
  | { type: "symbol" }
  | { type: "whitespace" }
  | { type: "string" }
  | { type: "keyword" }
  | { type: "number" }
  | { type: "identifier" }
)

let symbols = [
  "==",
  "!=",
  ">=",
  "<=",
  ";",
  "(",
  ")",
  "{",
  "}",
  "=",
  "<",
  ">",
  "+",
  "-",
  "*",
  "/",
  "!",
]
let lex_symbol = (source: string, index: number): Token | null => {
  for (let s of symbols) {
    if (source.startsWith(s, index)) {
      return { type: "symbol", lexeme: s, index }
    }
  }
  return null
}

// TODO: add tabs
let whitespace = [" ", "\n"]
let lex_whitespace = (source: string, index: number): Token | null => {
  let start = index
  while (true) {
    let char = source[start]
    if (char != undefined && whitespace.includes(char)) {
      start += 1
      continue
    }
    break
  }
  if (start === index) return null
  return { index, type: "whitespace", lexeme: source.slice(index, start) }
}

// TODO: once we handle EOF stuff might not need `undefined` char handling
let lex_string = (source: string, index: number): Token | null => {
  if (source[index] !== '"') return null
  let current = index + 1
  while (true) {
    let char = source[current]
    if (char === undefined) return null // TODO error message
    if (char === '"') {
      return { index, type: "string", lexeme: source.slice(index, current + 1) }
    }
    current += 1
  }
}

let keywords = [
  "and",
  "class",
  "else",
  "false",
  "for",
  "fun",
  "if",
  "nil",
  "or",
  "print",
  "return",
  "super",
  "this",
  "true",
  "var",
  "while",
]
let lex_keyword = (source: string, index: number): Token | null => {
  for (let keyword of keywords) {
    if (source.startsWith(keyword, index)) {
      return { index, type: "keyword", lexeme: keyword }
    }
  }
  return null
}

let numbers_regex = /^[0-9]+(\.[0-9]+)?/
let lex_number = (source: string, index: number): Token | null => {
  let match = numbers_regex.test(source.slice(index))
  if (!match) return null
  let lexeme = numbers_regex.exec(source.slice(index))![0]
  return { index, type: "number", lexeme }
}

let identifier_regex = /^[a-zA-Z_][a-zA-Z0-9_]*/
let lex_identifier = (source: string, index: number): Token | null => {
  let match = identifier_regex.test(source.slice(index))
  if (!match) return null
  let lexeme = identifier_regex.exec(source.slice(index))![0]
  return { index, type: "identifier", lexeme }
}

let parsers = [
  lex_whitespace,
  lex_symbol,
  lex_number,
  lex_string,
  lex_keyword,
  lex_identifier,
]
let parse = (source: string): Token[] => {
  let tokens: Token[] = []
  let index = 0
  while (index < source.length) {
    for (let parser of parsers) {
      let token = parser(source, index)
      if (token) {
        tokens.push(token)
        index += token.lexeme.length
        break
      }
    }
    // throw Error(`Unexpected char at ${index}`)
  }
  return tokens
}

if (import.meta.vitest) {
  const { it, expect } = import.meta.vitest

  it("lex symbol", () => {
    expect(lex_symbol("+", 0)).toStrictEqual({
      index: 0,
      type: "symbol",
      lexeme: "+",
    })
  })

  it("lex whitespace", () => {
    expect(lex_whitespace(" ", 0)).toStrictEqual({
      index: 0,
      type: "whitespace",
      lexeme: " ",
    })
    expect(lex_whitespace("  ", 0)).toStrictEqual({
      index: 0,
      type: "whitespace",
      lexeme: "  ",
    })
  })

  it("lex string", () => {
    expect(lex_string('"hello"', 0)).toStrictEqual({
      index: 0,
      type: "string",
      lexeme: '"hello"',
    })
  })

  it("lex keyword", () => {
    expect(lex_keyword("if", 0)).toStrictEqual({
      index: 0,
      type: "keyword",
      lexeme: "if",
    })
  })

  it("lex number", () => {
    expect(lex_number("123", 0)).toStrictEqual({
      index: 0,
      type: "number",
      lexeme: "123",
    })
  })

  it("lex identifier", () => {
    expect(lex_identifier("foo", 0)).toStrictEqual({
      index: 0,
      type: "identifier",
      lexeme: "foo",
    })
  })

  it("lex", () => {
    expect(parse("foo 123")).toStrictEqual([
      { index: 0, type: "identifier", lexeme: "foo" },
      { index: 3, type: "whitespace", lexeme: " " },
      { index: 4, type: "number", lexeme: "123" },
    ])
  })
}
