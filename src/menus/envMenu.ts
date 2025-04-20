import inquirer from "inquirer";
import { updateConfig } from "../core/configService";
import { Env } from "../types/enums";

export async function envMenu() {
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
