import fs from "fs"
import readlineSync from "readline-sync"

import * as exitCodes from "./exit-codes"
import * as error from "./error"
import * as scanner from "./scan"

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
  const err = run(text)
  if (err) {
    error.report(err)
    process.exit(exitCodes.DATAERR)
  }
}

const runPrompt = () => {
  while (true) {
    const line = readlineSync.question("tslox> ")
    if (!line) break
    const err = run(line)
    if (err) error.report(err)
  }
}

const run = (source: string): error.T | undefined => {
  console.log(source)
  return
}
