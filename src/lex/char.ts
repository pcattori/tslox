import { assert } from "console"

export const isDigit = (char: string) => {
  assert(char.length === 1, `isDigit: Expected '${char}' to be one character.`)
  return char >= "0" && char <= "9"
}

export const isAlpha = (char: string): boolean => {
  assert(char.length === 1, `isAlpha: Expected '${char}' to be one character.`)
  return (
    (char >= "a" && char <= "z") || (char >= "A" && char <= "Z") || char === "_"
  )
}

export const isAlphaNumeric = (char: string): boolean => {
  assert(
    char.length === 1,
    `isAlphaNumeric: Expected '${char}' to be one character.`
  )
  return isAlpha(char) || isDigit(char)
}
