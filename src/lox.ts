import fs from "fs"
import readlineSync from "readline-sync"

import * as exitCodes from "./exit-codes"
import { Error, report } from "./error"

export const main = () => {
  const args = process.argv.slice(2)
  switch (args.length) {
    case 0:
      return runPrompt()
    case 1:
      return runFile(args[0])
    default:
      console.log("Usage: tslox [script]")
      process.exit(exitCodes.USAGE)
  }
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
