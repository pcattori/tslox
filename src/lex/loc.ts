import * as error from "../error"

export const readAt = (source: string, index: number) => (chars: number) =>
  source.slice(index, index + chars)

export const matchAt =
  (source: string, index: number) =>
  (text: string): boolean =>
    readAt(source, index)(text.length) === text

export const errAt =
  (source: string, index: number) =>
  (message: string, skipChars: number): error.T => ({
    source: source,
    index: index,
    message,
  })
