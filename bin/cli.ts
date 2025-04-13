#!/usr/bin/env node
import { mainMenuEntry } from "../src/index";
import { runHelp } from "../src/actions/help";

const args = process.argv.slice(2);
const command = args[0] ?? "";

async function main() {
  switch (command) {
    case "help":
      runHelp();
      break;
    case "":
      await mainMenuEntry();
      break;
    default:
      console.log(`未知的指令：${command}`);
      runHelp();
  }
}

main();
