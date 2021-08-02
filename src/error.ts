export interface Error {
  line: number
  where?: string
  message: string
}

export const report = ({ line, where = "", message }: Error): void =>
  console.error(`[line ${line}] Error${where}: ${message}`)
