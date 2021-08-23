export interface T {
  source: string
  index: number
  message: string
}

const line = (source: string, index: number): number =>
  source.slice(0, index).split("\n").length - 1

export const toString = ({ source, index, message }: T): string =>
  `[line ${line(source, index)}] Type: ${message}`

export const report = (error: T): void => console.error(toString(error))

export const is = (x: unknown): x is T => {
  if (typeof x !== "object") return false
  if (x === null) return false

  if (!hasOwnProperty(x, "source")) return false
  if (typeof x.source !== "string") return false

  if (!hasOwnProperty(x, "index")) return false
  if (typeof x.index !== "number") return false

  if (!hasOwnProperty(x, "message")) return false
  if (!(typeof x.message === "string")) return false
  return true
}

const hasOwnProperty = <X extends {}, Y extends PropertyKey>(
  obj: X,
  prop: Y
): obj is X & Record<Y, unknown> => obj.hasOwnProperty(prop)
