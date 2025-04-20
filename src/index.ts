import { ensureConfigFileExists } from "./core/configService";
import { mainMenu } from "./menus/mainMenu";

/** 提供給 CLI 使用的入口函式 */
export async function mainLoop() {
  while (true) {
    const result = await mainMenu();
    if (result === "exit") break;
  }
}
