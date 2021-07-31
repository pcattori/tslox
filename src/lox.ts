import fs from "fs"
import readlineSync from "readline-sync"

import * as exitCodes from "./exit-codes"

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
  run(text)
}

const runPrompt = () => {
  while (true) {
    const line = readlineSync.question("tslox> ")
    if (!line) break
    run(line)
  }
}

const run = (source: string) => {
  console.log(source)
}
