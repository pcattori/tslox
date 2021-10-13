import * as tokenType from "./type"

interface Base {
  index: number
  lexeme: string
}

export interface NoLiteral extends Base {
  type: Exclude<tokenType.T, "NUMBER" | "STRING">
}

export interface Number extends Base {
  type: "NUMBER"
  literal: number
}

export interface String extends Base {
  type: "STRING"
  literal: string
}

export type T = NoLiteral | Number | String

export const toString = ({ lexeme, type }: T) => `${type} ${lexeme}`
