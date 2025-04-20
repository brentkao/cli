#!/usr/bin/env node
import { mainLoop } from "../src"; // 引用 index.ts 中的主流程
import { runHelp } from "../src/actions/help"; // 可選：顯示說明的功能

const args = process.argv.slice(2);
const command = args[0] ?? "";

async function main() {
  switch (command) {
    case "help":
      runHelp?.(); // 如果有提供
      break;
    case "":
      await mainLoop(); // 預設啟動 CLI 主選單
      break;
    default:
      console.log(`未知的指令：${command}`);
      runHelp?.();
  }
}

main();
