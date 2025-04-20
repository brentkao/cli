import inquirer from "inquirer";
import { serviceMenu } from "./serviceMenu";
import { updateConfig } from "../core/configService";
import { Env, MainAction } from "../types/enums";

export async function mainMenu(): Promise<"exit" | void> {
  const { action } = await inquirer.prompt([
    {
      type: "list",
      name: "action",
      message: "主選單：請選擇操作",
      choices: [
        { name: "設定環境", value: MainAction.ENV },
        { name: "進入服務選單", value: MainAction.SERVICE },
        { name: "離開 CLI", value: MainAction.EXIT },
      ],
    },
  ]);

  if (action === MainAction.ENV) {
    const { env } = await inquirer.prompt([
      {
        type: "list",
        name: "env",
        message: "選擇環境",
        choices: [
          { name: `本地開發環境 (${Env.DEV})`, value: Env.DEV },
          { name: `測試環境 (${Env.STG})`, value: Env.STG },
          { name: `正式環境 (${Env.PROD})`, value: Env.PROD },
        ],
      },
    ]);

    updateConfig({ env });
    console.log(`✅ 環境已設定為 ${env}`);
  }

  if (action === MainAction.SERVICE) {
    await serviceMenu();
  }

  return action === MainAction.EXIT ? "exit" : undefined;
}
