import fs from "fs"
import readlineSync from "readline-sync"

import * as exitCodes from "./exit-codes"

type Error = {
  line: number
  where?: string
  message: string
}

export const main = () => {
  const args = process.argv.slice(2)
  if (args.length > 1) {
    console.log("Usage: tslox [script]")
    process.exit(exitCodes.USAGE)
  }
  if (args.length === 1) {
    runFile(args[0])
  }
  runPrompt()
}

const runFile = (path: string) => {
  const text = fs.readFileSync(path, "utf-8")
  const error = run(text)
  if (error) {
    report(error)
    process.exit(exitCodes.DATAERR)
  }
}

const runPrompt = () => {
  while (true) {
    const line = readlineSync.question("tslox> ")
    if (!line) break
    const error = run(line)
    if (error) report(error)
  }
}

const run = (source: string): Error | undefined => {
  console.log(source)
  return
}

const report = ({ line, where = "", message }: Error) =>
  console.error(`[line ${line}] Error${where}: ${message}`)
